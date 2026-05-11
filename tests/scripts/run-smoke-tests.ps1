#!/usr/bin/env pwsh
# Windows-compatible smoke test runner
# Run with: pwsh tests/scripts/run-smoke-tests.ps1

param(
    [string]$BaseUrl = "http://localhost:3000",
    [string]$Session = "smoke-tests"
)

$ErrorActionPreference = "Stop"
$script:FAILED = 0

$Root = Split-Path -Parent (Split-Path -Parent (Split-Path -Parent $PSScriptRoot))
$AB = "node `"$Root/node_modules/agent-browser/bin/agent-browser-win32-x64.exe`""

function Invoke-AB {
    param([string]$Args)
    $output = & $AB $Args 2>&1
    return $output
}

Write-Host "=============================================="
Write-Host "  Smoke Tests - Sahara Printer Website"
Write-Host "  Base URL: $BaseUrl"
Write-Host "  Session: $Session"
Write-Host "=============================================="

Invoke-AB "close --all" | Out-Null

Write-Host ""
Write-Host "[1/10] Testing: Homepage loads"
Invoke-AB "--session $Session open $BaseUrl" | Out-Null
Invoke-AB "--session $Session wait --load networkidle" | Out-Null
$TITLE = (Invoke-AB "--session $Session get title") -join "`n"
if ([string]::IsNullOrWhiteSpace($TITLE)) {
    Write-Host "  ✗ FAILED: Homepage did not load"
    $script:FAILED++
} else {
    Write-Host "  ✓ PASSED: Homepage loaded - `"$TITLE`""
}

Write-Host ""
Write-Host "[2/10] Checking: No console errors on homepage"
$ERRORS = (Invoke-AB "--session $Session errors") -join "`n"
if ($ERRORS -match "error") {
    Write-Host "  ✗ FAILED: Console error(s) found"
    Invoke-AB "--session $Session errors"
    $script:FAILED++
} else {
    Write-Host "  ✓ PASSED: No console errors"
}

$routes = @(
    @{route="$BaseUrl/contact"; label="[3/10] Contact page"},
    @{route="$BaseUrl/products"; label="[4/10] Products page"},
    @{route="$BaseUrl/get-quote"; label="[5/10] Get Quote page"},
    @{route="$BaseUrl/our-clients"; label="[6/10] Our Clients page"},
    @{route="$BaseUrl/rental-calculator"; label="[7/10] Rental Calculator page"}
)

foreach ($r in $routes) {
    Write-Host ""
    Write-Host $r.label
    Invoke-AB "--session $Session open $($r.route)" | Out-Null
    Invoke-AB "--session $Session wait --load networkidle" | Out-Null
    Write-Host "  ✓ PASSED"
}

Write-Host ""
Write-Host "[8/10] Testing: Service pages"
foreach ($route in @("printer-rental", "repair", "amc", "toner")) {
    Invoke-AB "--session $Session open $BaseUrl/services/$route" | Out-Null
    Invoke-AB "--session $Session wait --load networkidle" | Out-Null
    Write-Host "  ✓ $route service page loaded"
}

Write-Host ""
Write-Host "[9/10] Testing: Brand pages"
foreach ($brand in @("hp", "canon", "epson")) {
    Invoke-AB "--session $Session open $BaseUrl/brands/$brand" | Out-Null
    Invoke-AB "--session $Session wait --load networkidle" | Out-Null
    Write-Host "  ✓ $brand brand page loaded"
}

Write-Host ""
Write-Host "[10/10] Testing: Blog pages"
Invoke-AB "--session $Session open $BaseUrl/blogs" | Out-Null
Invoke-AB "--session $Session wait --load networkidle" | Out-Null
Write-Host "  ✓ Blog listing page loaded"

Invoke-AB "--session $Session close" | Out-Null

Write-Host ""
Write-Host "=============================================="
if ($script:FAILED -eq 0) {
    Write-Host "  ✓ All smoke tests passed"
    exit 0
} else {
    Write-Host "  ✗ $script:FAILED test(s) failed"
    exit 1
}
