#!/usr/bin/env pwsh
# API Testing Script - Test all backend endpoints

Write-Host "
╔════════════════════════════════════════════════════════════╗
║         🧪 TAPROBANE API ENDPOINT TEST SUITE              ║
╚════════════════════════════════════════════════════════════╝
" -ForegroundColor Cyan

$baseUrl = "http://localhost:5000/api"
$endpoints = @(
    @{ method = "GET"; path = "/health"; name = "Health Check" },
    @{ method = "GET"; path = "/attractions"; name = "Get Attractions" },
    @{ method = "GET"; path = "/guides"; name = "Get Guides" },
    @{ method = "GET"; path = "/accommodations"; name = "Get Accommodations" }
)

$passedCount = 0
$failedCount = 0

foreach ($endpoint in $endpoints) {
    $url = $baseUrl + $endpoint.path
    Write-Host ""
    Write-Host "Testing: $($endpoint.name)" -ForegroundColor Yellow
    Write-Host "Endpoint: $($endpoint.method) $url" -ForegroundColor Gray
    
    try {
        $response = Invoke-WebRequest -Uri $url -Method $endpoint.method -UseBasicParsing -TimeoutSec 5
        $statusCode = $response.StatusCode
        $body = $response.Content | ConvertFrom-Json
        
        if ($statusCode -eq 200) {
            Write-Host "✅ PASS - Status: $statusCode" -ForegroundColor Green
            
            # Show response details
            if ($body.data) {
                $itemCount = @($body.data).Count
                Write-Host "   Items returned: $itemCount" -ForegroundColor Gray
            } elseif ($body.status) {
                Write-Host "   Response: $($body.message)" -ForegroundColor Gray
            }
            
            $passedCount++
        } else {
            Write-Host "⚠️  WARNING - Unexpected status: $statusCode" -ForegroundColor Yellow
            $failedCount++
        }
    }
    catch {
        Write-Host "❌ FAIL - $($_.Exception.Message)" -ForegroundColor Red
        $failedCount++
    }
}

Write-Host ""
Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "📊 TEST RESULTS" -ForegroundColor Cyan
Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "✅ Passed: $passedCount" -ForegroundColor Green
Write-Host "❌ Failed: $failedCount" -ForegroundColor Red
Write-Host ""

if ($failedCount -eq 0) {
    Write-Host "🎉 ALL TESTS PASSED! API is working correctly." -ForegroundColor Green
} else {
    Write-Host "⚠️  Some tests failed. Check backend logs and troubleshooting guide." -ForegroundColor Yellow
}

Write-Host ""
