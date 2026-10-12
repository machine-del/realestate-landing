$ErrorActionPreference = 'Stop'

$projects = @(
    @{
        Name = 'Frontend'
        Path = $PSScriptRoot
        Command = 'npm run dev'
    },
    @{
        Name = 'Backend'
        Path = Join-Path $PSScriptRoot 'backend'
        Command = 'yarn start:dev'
    },
    @{
        Name = 'Sanity Studio'
        Path = Join-Path $PSScriptRoot 'sanity-studio'
        Command = 'npm run dev'
    }
)

foreach ($project in $projects) {
    if (-not (Test-Path -LiteralPath (Join-Path $project.Path 'package.json'))) {
        throw "Cannot start $($project.Name): package.json was not found in $($project.Path)"
    }
}

foreach ($project in $projects) {
    Start-Process `
        -FilePath (Join-Path $PSHOME 'powershell.exe') `
        -WorkingDirectory $project.Path `
        -ArgumentList @('-NoExit', '-Command', $project.Command) | Out-Null

    Write-Host "Started $($project.Name): $($project.Command)"
}

Write-Host 'Frontend:    http://localhost:5173'
Write-Host 'Backend API: http://localhost:3000'
Write-Host 'Sanity Studio URL will be shown in its window.'
