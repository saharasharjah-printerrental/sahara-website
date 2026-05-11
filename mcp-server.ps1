param([string]$Action = "start")
$ErrorActionPreference = "Stop"

$Root = "C:\Users\SAHARA\Downloads\stitch_sahara_printer_website\sahara-website"
$ServerMjs = "$Root\mcp-server.mjs"
$LogFile = "$Root\mcp-server.log"
$PidFile = "$Root\mcp-server.pid"

if ($Action -eq "start") {
    Write-Host "Starting agent-browser MCP server..."
    $proc = Start-Process -FilePath "node" -ArgumentList $ServerMjs -PassThru -NoNewWindow -RedirectStandardOutput "$LogFile.stdout" -RedirectStandardError "$LogFile.stderr"
    $proc.Id | Out-File -FilePath $PidFile
    Write-Host "Started with PID: $($proc.Id)"
    Write-Host "Log: $LogFile.stdout / $LogFile.stderr"
    exit 0
}
elseif ($Action -eq "stop") {
    $pid = Get-Content $PidFile -ErrorAction SilentlyContinue
    if ($pid) {
        Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
        Remove-Item $PidFile -Force -ErrorAction SilentlyContinue
        Write-Host "Stopped MCP server (PID: $pid)"
    }
    exit 0
}
elseif ($Action -eq "status") {
    $pid = Get-Content $PidFile -ErrorAction SilentlyContinue
    if ($pid -and (Get-Process -Id $pid -ErrorAction SilentlyContinue)) {
        Write-Host "MCP server running (PID: $pid)"
        if (Test-Path $LogFile) { Get-Content "$LogFile.stdout" -Tail 5 -ErrorAction SilentlyContinue }
    } else {
        Write-Host "MCP server not running"
        if (Test-Path $LogFile) { Get-Content "$LogFile.stderr" -Tail 5 -ErrorAction SilentlyContinue }
    }
    exit 0
}
elseif ($Action -eq "test") {
    Write-Host "Testing MCP server module..."
    try {
        $output = node -e "import('@agent-browser-io/browser').then(m => { console.log('OK: version', m.VERSION); process.exit(0); }).catch(e => { console.error('FAIL:', e.message); process.exit(1); })" 2>&1
        Write-Host $output
    }
    catch {
        Write-Host "Module import failed"
    }
    exit 0
}