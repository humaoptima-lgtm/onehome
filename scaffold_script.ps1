# 1. Rename inspiration to design
if (Test-Path 'apps/web/app/inspiration') {
    Rename-Item -Path 'apps/web/app/inspiration' -NewName 'design'
}

# 2. Scaffold inspector and surveyor
New-Item -ItemType Directory -Force -Path 'apps/web/app/inspector/dashboard'
New-Item -ItemType Directory -Force -Path 'apps/web/app/surveyor/dashboard'

# 3. Clean up admin routes
$keepAdminRoutes = @('users', 'vendors', 'properties', 'projects', 'audit', 'page.tsx', 'layout.tsx')
$allAdminItems = Get-ChildItem -Path 'apps/web/app/admin'
foreach ($item in $allAdminItems) {
    if ($keepAdminRoutes -notcontains $item.Name) {
        Remove-Item -Path $item.FullName -Recurse -Force
    }
}
