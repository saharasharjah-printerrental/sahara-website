// Sahara AI Agent - VS Code Extension
const vscode = require('vscode');
const { exec, spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

let workerProcess = null;

function getWorkspacePath() {
    const config = vscode.workspace.getConfiguration('saharaAi');
    return config.get('workerPath') || vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
}

function runPython(command, cwd) {
    return new Promise((resolve, reject) => {
        exec("python " + command, { cwd }, (err, stdout, stderr) => {
            if (err) reject(err);
            else resolve(stdout);
        });
    });
}

async function submitJob(topic, type = 'keyword_research') {
    const workspacePath = getWorkspacePath();
    if (!workspacePath) {
        vscode.window.showErrorMessage('No workspace folder found');
        return;
    }
    
    vscode.window.showInformationMessage(Submitting job: );
    
    try {
        const result = await runPython(submit_job.py  "", workspacePath);
        vscode.window.showInformationMessage('Job submitted: ' + result.trim());
        
        // Open results folder
        vscode.commands.executeCommand('revealFileInExplorer', 
            vscode.Uri.file(path.join(workspacePath, 'data', 'ai_jobs')));
    } catch (err) {
        vscode.window.showErrorMessage('Error: ' + err.message);
    }
}

async function viewResults() {
    const workspacePath = getWorkspacePath();
    if (!workspacePath) return;
    
    const resultsPath = path.join(workspacePath, 'data', 'ai_output');
    
    if (!fs.existsSync(resultsPath)) {
        vscode.window.showInformationMessage('No results yet. Run a job first!');
        return;
    }
    
    const files = fs.readdirSync(resultsPath).filter(f => f.endsWith('.json'));
    
    if (files.length === 0) {
        vscode.window.showInformationMessage('No results yet');
        return;
    }
    
    // Show latest result
    files.sort((a, b) => fs.statSync(path.join(resultsPath, b)).mtime - fs.statSync(path.join(resultsPath, a)).mtime);
    const latestFile = files[0];
    
    const doc = await vscode.workspace.openTextDocument(path.join(resultsPath, latestFile));
    await vscode.window.showTextDocument(doc);
}

function startWorker() {
    const workspacePath = getWorkspacePath();
    if (!workspacePath) return;
    
    if (workerProcess) {
        vscode.window.showInformationMessage('Worker already running!');
        return;
    }
    
    workerProcess = spawn('python', ['worker.py'], { 
        cwd: workspacePath,
        shell: true 
    });
    
    workerProcess.stdout.on('data', (data) => {
        console.log('Worker: ' + data);
    });
    
    workerProcess.on('exit', () => {
        workerProcess = null;
    });
    
    vscode.window.showInformationMessage('Worker started!');
}

function activate(context) {
    // Research Keywords command
    context.subscriptions.push(
        vscode.commands.registerCommand('sahara-ai.researchKeywords', async () => {
            const editor = vscode.window.activeTextEditor;
            const selectedText = editor?.document.getText(editor.selection) || '';
            
            const topic = await vscode.window.showInputBox({
                prompt: 'Enter topic for keyword research',
                value: selectedText || 'printer rental dubai'
            });
            
            if (topic) submitJob(topic, 'research');
        })
    );
    
    // Generate Content command
    context.subscriptions.push(
        vscode.commands.registerCommand('sahara-ai.generateContent', async () => {
            const editor = vscode.window.activeTextEditor;
            const selectedText = editor?.document.getText(editor.selection) || '';
            
            const topic = await vscode.window.showInputBox({
                prompt: 'Enter topic for content generation',
                value: selectedText || 'printer services UAE'
            });
            
            const keywords = await vscode.window.showInputBox({
                prompt: 'Enter keywords (comma separated)',
                value: 'printer,dubai,rental'
            });
            
            if (topic) {
                const workspacePath = getWorkspacePath();
                vscode.window.showInformationMessage(Generating content for: );
                
                try {
                    // Submit content job
                    const result = await runPython(
                        submit_job.py content "" "", 
                        workspacePath
                    );
                    vscode.window.showInformationMessage('Job submitted!');
                } catch (err) {
                    vscode.window.showErrorMessage('Error: ' + err.message);
                }
            }
        })
    );
    
    // View Results command
    context.subscriptions.push(
        vscode.commands.registerCommand('sahara-ai.viewResults', viewResults)
    );
    
    // Start Worker command
    context.subscriptions.push(
        vscode.commands.registerCommand('sahara-ai.startWorker', startWorker)
    );
}

function deactivate() {
    if (workerProcess) {
        workerProcess.kill();
    }
}

module.exports = { activate, deactivate };
