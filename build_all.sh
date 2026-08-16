#!/bin/bash
# UM COMANDO para: gerar HTML + .pptx (com animação) a partir do CONTEUDO em build_deck.py,
# e publicar o HTML no GitHub Pages. Rode isto depois de editar build_deck.py.
set -e
cd "$(dirname "$0")"

echo "== 1/4 gerando deck.html + deck_data.json (fonte única) =="
python3 build_deck.py

echo "== 2/4 gerando deck.pptx a partir do MESMO deck_data.json =="
node build_pptx.js

echo "== 3/4 injetando animação 'aparecer ao clique' no deck.pptx =="
python3 inject_anim.py deck.pptx

echo "== 4/4 publicando deck.html no GitHub Pages (link do celular) =="
cp deck.html build_deck.py deck_data.json build_pptx.js inject_anim.py "$HOME/.palestra-pages/"
cd "$HOME/.palestra-pages"
git pull --no-edit -q
git add deck.html build_deck.py deck_data.json build_pptx.js inject_anim.py
if git diff --cached --quiet; then
  echo "(nada mudou no HTML/scripts — nada para commitar)"
else
  git commit -q -m "Deck: atualização de conteúdo/estrutura ($(TZ=America/Sao_Paulo date '+%Y-%m-%d %H:%M'))

Co-Authored-By: Claude DeepSeek <noreply@deepseek.com>"
  git push -q origin main
  echo "publicado: https://danielortopediafernandes-ux.github.io/palestra-atq-ccot2026/deck.html"
fi

echo ""
echo "OK. O .pptx ficou em: $(cd "$(dirname "$0")" && pwd)/deck.pptx (entregar ao Dr. direto — não vai pro GitHub público)"
