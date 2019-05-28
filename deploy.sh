#!/usr/bin/env bash

# abort on errors
set -e

rm -rf .site

mkdir -p .site

cd packages/gridy-core-doc
npm run docs:build
cd -
mv packages/gridy-core-doc/.vuepress/dist .site/core

cd packages/gridy-core
npm run doc
cd -
mv packages/gridy-core/doc/ .site/core-api

cd .site

# echo 'www.example.com' > CNAME
git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/darosh/gridys.git master:gh-pages

cd -
