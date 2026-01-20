# Script para iniciar o backend com variáveis do .env
$envFile = Join-Path $PSScriptRoot ".env"

if (Test-Path $envFile) {
    Write-Host "Carregando variáveis de ambiente de .env..." -ForegroundColor Green
    
    Get-Content $envFile | ForEach-Object {
        if ($_ -match '^\s*([^#][^=]+)=(.*)$') {
            $name = $matches[1].Trim()
            $value = $matches[2].Trim()
            Set-Item -Path "env:$name" -Value $value
            Write-Host "  $name configurado" -ForegroundColor Gray
        }
    }
    
    Write-Host "`nIniciando backend..." -ForegroundColor Cyan
    mvn spring-boot:run
} else {
    Write-Host "Erro: arquivo .env não encontrado!" -ForegroundColor Red
    Write-Host "Copie .env.example para .env e configure suas credenciais." -ForegroundColor Yellow
}
