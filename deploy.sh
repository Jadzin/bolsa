#!/usr/bin/env sh

# Interrompe em caso de erros
set -e

# Constrói o projeto
npm run build

# Navega até o diretório de saída
cd dist/public

# Cria arquivo .nojekyll para evitar processamento Jekyll do GitHub Pages
touch .nojekyll

# Copia a versão HTML e os assets
mkdir -p html-version
cp -r ../../html-version/* html-version/
mkdir -p attached_assets
cp -r ../../attached_assets/* attached_assets/

# Inicia um novo repositório git no diretório de build
git init
git add -A
git commit -m 'deploy'

# Se você estiver implantando em https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# Se você estiver implantando em https://<USERNAME>.github.io/<REPO>
# Substitua <USERNAME> pelo seu nome de usuário do GitHub
# Substitua <REPO> pelo nome do seu repositório
git push -f git@github.com:<USERNAME>/<REPO>.git main:gh-pages

cd -