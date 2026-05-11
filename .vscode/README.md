# Sahara AI Agent - VS Code Extension

## Installation

1. Copy `.vscode` folder to: `%USERPROFILE%\.vscode\extensions\sahara-ai-agent`
2. Restart VS Code
3. Or use "Extension Development Host" mode from VS Code

## Commands

| Command | Description |
|---------|-------------|
| `Sahara: Research Keywords` | Research SEO keywords for any topic |
| `Sahara: Generate SEO Content` | Generate content with keywords |
| `Sahara: View Results` | Open latest AI result |
| `Sahara: Start Worker` | Start background worker |

## Keybindings

Add to your VS Code `keybindings.json`:

```json
[
  { "command": "sahara-ai.researchKeywords", "key": "ctrl+shift+k" },
  { "command": "sahara-ai.generateContent", "key": "ctrl+shift+g" },
  { "command": "sahara-ai.viewResults", "key": "ctrl+shift+r" }
]
```

## Usage

1. Press `Ctrl+Shift+P` to open Command Palette
2. Type `Sahara` to see available commands
3. Or use keyboard shortcuts after adding keybindings
