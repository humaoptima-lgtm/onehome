New-Item -ItemType Directory -Force -Path 'apps/web'
New-Item -ItemType Directory -Force -Path 'packages'

$itemsToMove = @(
  'app', 'components', 'lib', 'public', 'data', 'services', 'stores', 'types',
  'next.config.ts', 'postcss.config.mjs', 'eslint.config.mjs', 'tsconfig.json',
  'components.json', 'next-env.d.ts', 'package.json', 'package-lock.json', '.gitignore'
)

foreach ($item in $itemsToMove) {
  if (Test-Path $item) {
    Move-Item -Path $item -Destination 'apps/web/' -Force
  }
}
