$env:PATH = "C:\Users\ayush\AppData\Local\OpenAI\Codex\runtimes\cua_node\b474a88d5d105afa\bin;$env:PATH"
$projectDir = "C:\Users\ayush\.gemini\antigravity\scratch\love-flower"
$domain = "happy-birthday-pragati-$((Get-Random -Minimum 1000 -Maximum 9999)).surge.sh"

Write-Host "Deploying to Surge with domain: $domain"
npx surge $projectDir $domain --token surge_demo_token_or_login
