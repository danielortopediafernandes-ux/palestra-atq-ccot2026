# HANDOFF PARA CLAUDE-DEEPSEEK · Palestra ATQ · XVI CCOT 2026

**Contexto:** créditos Max acabando; esta sessão (Claude Opus no Mini) passa o bastão. Você (Claude-DeepSeek no terminal) assume busca de artigos, edição do capítulo e apoio ao PowerPoint. **Palestra é 21/08/2026** — urgente.

> **LEIA PRIMEIRO, NESTA ORDEM:**
> 1. Este arquivo (o mapa)
> 2. `~/.claude/CLAUDE.md` (regras globais do Dr. — inclui **Regras Invioláveis 1-8**)
> 3. `~/.claude/skills/palestra-medica/SKILL.md` (protocolo obrigatório de 5 fases + gauntlet + as 13 armadilhas)
> 4. `~/.palestra-pages/CAPITULO.md` (fonte da verdade — 35 unidades, header-contrato no topo)
> 5. `Documents/Claude/PALESTRA-ATQ-CCOT2026/HANDOFF_CONTEUDO_PARA_SLIDES.md`

> ⚠️ **ATUALIZAÇÃO 16/08 (sessão de slides / Opus) — LEIA A `PARTE B` NO FIM.**
> O Dr. tomou duas decisões que **SUPERAM as seções 5 e 7** deste manual:
> • **Design final = deck ESCURO CCOT** (`deck.html`), letras grandes + **aparecer-ao-clique** + figuras reais de artigo — **não** o creme do piloto (seção 5 fica como histórico).
> • **Existe .pptx REAL com as mesmas animações** (a seção 7 dizia que não). Pipeline em `PARTE B · B6`.
> Tudo o que falta do deck (Decisões 1–9) é **100% terminal, sem API e sem navegador** — ver `PARTE B · B2`.

---

## 1 · QUEM FAZ O QUÊ (regra do Dr. Daniel, 15/08)

| Sessão | Máquina | Responsabilidade |
|---|---|---|
| **Sessão de conteúdo (você agora)** | Mini | Evidência, números, fontes, condutas, estrutura, buscas PubMed, edição do CAPITULO.md |
| **PALESTRA SULBRA NO CELULAR** | Celular (bifurcada de mim) | Montar slides A PARTIR do CAPITULO.md — sem alterar conteúdo |

**Você não decide o que entra ou sai da palestra sozinho.** O Dr. Daniel decide. Sua função é: buscar evidência com rigor, apresentar os números com fonte, apontar contradições, e executar o que ele mandar.

---

## 2 · ESTADO ATUAL (16/08/2026)

- **Capítulo:** 35 unidades, Decisões 0–9 (`~/.palestra-pages/CAPITULO.md`) · último commit `fa56933`
- **Repo git local:** `~/.palestra-pages/` · **remoto:** `github.com/danielortopediafernandes-ux/palestra-atq-ccot2026`
- **GitHub Pages (público):** `https://danielortopediafernandes-ux.github.io/palestra-atq-ccot2026/`
- **Artigos baixados:** 44 PDFs em `Documents/Claude/PALESTRA-ATQ-CCOT2026/ARTIGOS/` (nome padrão `Autor_Ano_PMID.pdf`)
- **Design aprovado:** `piloto.html` — 2 tipos (slide-decisão + slide-confronto)

### Últimas decisões do Dr. (não pergunte de novo)
1. **Descolonização nasal FICA FORA do slide** (registrada só no documento — meta do ICM G5 deu OR 0,62 P=0,17 NS)
2. **Sabonete de clorexidina (pele) VAI ao slide** (ICM G4, Moderada, 79%)
3. Estrutura B da palestra: percorrer as **decisões do planejamento na ordem em que se planeja** (Decisões 0–9)
4. **Slides feitos pela sessão do celular** — você não monta .pptx, dá o material.

---

## 3 · MAPA DE ARQUIVOS

```
~/.palestra-pages/                         ← repo git, deploy no GitHub Pages
├── CAPITULO.md                            ⭐ FONTE DA VERDADE (35 unidades)
├── RACIOCINIO.md                          ← espinha resumida (7 decisões)
├── piloto.html                            ← design aprovado (4 slides exemplo)
├── slides-precisao.html                   ← Desfecho 1 (11 slides)
├── slides-sobrevida.html                  ← Desfecho 2 (9 slides)
├── slides-luxacao.html                    ← Desfecho 3 (8 slides)
├── slides-funcao.html                     ← Desfecho 4 (6 slides)
├── slides-complicacoes.html               ← Desfecho 5 (6 slides)
├── design.html · modelos.html             ← experimentos de layout (não canônicos)
└── ICM_Istambul_Zampoli2026.pdf           ← revisão-chave sobre descolonização

/Users/danielfernandes/Documents/Claude/PALESTRA-ATQ-CCOT2026/
├── HANDOFF_CONTEUDO_PARA_SLIDES.md        ← contrato para sessão de slides
├── HANDOFF_DEEPSEEK.md                    ← este arquivo
├── CAPITULO.md → symlink ou cópia
└── ARTIGOS/
    ├── _INDICE.md                         ← 41 PDFs + 50 faltantes
    ├── ARTIGOS_PRINCIPAIS.html            ← 15 pagos para o Dr. clicar
    ├── ICM2025_G4/G5/G6_*.pdf             ← docs oficiais ICM
    ├── 00_CAPITULO_BASE_DA_PALESTRA.md    ← cópia p/ NotebookLM
    └── {Autor}_{Ano}_PMID{PMID}.pdf       ← 44 artigos verificados
```

**Regra de ouro:** sempre partir do commit MAIS RECENTE do CAPITULO.md. `git pull` antes de editar.

---

## 4 · O SISTEMA DE UNIDADES (mapeamento 1:1 para slides)

Cada unidade do CAPITULO.md tem 5 campos:
```
## [X.Y] PERGUNTA (título do slide)
**RESPOSTA · <destaque em uma frase>**
| Evidência | Número | Fonte |
|---|---|---|
| ... com número exato + PMID clicável |
**CONDUTA:** <barra de fechamento>
**Discussão.** <texto didático — NÃO vai ao slide>
```

**PERGUNTA→título · RESPOSTA→painel escuro/faixa-veredito · EVIDÊNCIAS→linhas com fonte · CONDUTA→barra · Discussão fica no documento.**

---

## 5 · DESIGN DOS SLIDES (aprovado pelo Dr.)

### Tokens (usar exatos)
```
--paper:#f4f1e9 · --ink:#1f2e2b · --verde:#0f6b60 · --clay:#a9765a
--mut:#736f63 · --line:#d9d3c4 · --tec:#a9765a
Fontes: Fraunces (serif, títulos/números) + Inter (corpo), base64 embutidas
```

### Formato de página
```css
@page{ size: 297mm 167mm; margin: 0 }  /* 16:9 print */
.s { width:100vw; height:100vh; background:var(--paper); padding:46px 64px 40px }
```

### Dois tipos de slide
1. **Slide-decisão** (painel escuro à esquerda com PERGUNTA + RESPOSTA gigante; painel claro à direita com evidências linha a linha + barra CONDUTA) — para toda decisão do planejamento
2. **Slide-confronto** (2 colunas: acurácia ✓ × desfecho clínico ✗, cada uma com sua fonte; faixa-veredito colorida com a resposta) — para quando a tecnologia vai contra o desfecho

Modelo funcionando: `~/.palestra-pages/piloto.html` (4 slides) — copie a estrutura HTML/CSS de lá.

### Invariantes (regras invioláveis)
- Resposta em destaque · número ou não entra · referência (autor+ano+PMID) na própria linha · linguagem científica · português nativo (nada de calque do inglês) · sem letra `<small>` menor que 15 px · slide autossuficiente para quem não leu o artigo · **conteúdo maior = mais um slide, NUNCA condensar**.

---

## 6 · COMO RENDERIZAR HTML → PDF → PNG (para conferir slide)

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=/tmp/out.pdf "file://$PWD/piloto.html" 2>/dev/null
pdftoppm -png -r 96 /tmp/out.pdf /tmp/PIL       # gera /tmp/PIL-1.png, PIL-2.png...
# Depois: Read /tmp/PIL-1.png para conferir visualmente
```

---

## 7 · POWERPOINT (.pptx) — leia com atenção

**HONESTIDADE:** eu **não** fiz .pptx nesta sessão. Fizemos **HTML + Chrome headless → PDF**, e o PDF é a entrega funcional. Se o Dr. exigir .pptx real, três opções:

### Opção A · python-pptx (Python nativo, sem GUI)
```bash
pip3 install python-pptx
```
Bom para gerar slides do zero programaticamente. Não converte HTML.

### Opção B · LibreOffice headless (converte)
```bash
brew install --cask libreoffice
soffice --headless --convert-to pptx piloto.pdf  # PDF → PPTX (limitado)
# OU melhor: gerar via HTML editando template .pptx aberto
```

### Opção C · Automatizar Keynote/PowerPoint via AppleScript
⛔ **VETADO pela Regra Inviolável #7** (não roubar foco) — só se o Dr. autorizar explicitamente e não estiver usando o Mac.

**Recomendação:** entregar o **PDF renderizado do HTML** ao Dr. e à sessão do celular. É o que temos aprovado.

---

## 8 · GIT / GITHUB PAGES (fluxo de publicação)

```bash
cd ~/.palestra-pages
git pull                                # sempre antes de editar
# ...editar CAPITULO.md ou HTMLs...
git add -A
git commit -q -m "<mensagem clara do que mudou>"
git push -q origin main
# Deploy no GitHub Pages: ~30 segundos
# URL pública: https://danielortopediafernandes-ux.github.io/palestra-atq-ccot2026/
```

**Convenção de commit** (mantenha): `<ARQUIVO> [seção]: <resumo do que mudou e por quê>`
Ex: `CAPITULO [0.2]: corrigir HbA1c 7% não prevê (Shohat Insall) — o que decide é glicemia pós <137 (Kheir JBJS)`

---

## 9 · BUSCAS PUBMED (ferramenta principal)

### Se você TEM os MCP tools de PubMed
```
mcp__claude_ai_PubMed__search_articles       ← busca por query
mcp__claude_ai_PubMed__get_article_metadata  ← detalhes por PMID
mcp__claude_ai_PubMed__lookup_article_by_citation  ← achar PMID por citação
mcp__claude_ai_PubMed__find_related_articles ← sucessores
mcp__claude_ai_PubMed__get_full_text_article ← só PMCs abertos
```

### Se NÃO tem — fallback via eutils (curl, sem chave)
```bash
# Buscar:
curl -s 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=YOUR+QUERY&retmode=json&retmax=20' | jq

# Metadados por PMID:
curl -s 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=25910779,29605149&retmode=json' | jq
```

### Regras da skill (leia SKILL.md, seção FASE 2)
- **Nunca aceite a versão 1** — sempre pergunte "há sucessor mais recente?"
- **Cruzar fontes** — nunca fonte única para afirmação de slide
- **Rótulo honesto de TIER:** Tier 1 (só abstract PubMed) / Tier 2 (abstract estruturado do journal) / Tier 3 (corpo conferido). Slide exige Tier 2+ para número principal, Tier 3 para subgrupo.
- **Armadilha #1:** patrocínio do fabricante = penalidade. Sempre verificar conflict of interest.
- **Armadilha #12:** IC que cruza 1 é *nulo não-significativo*, NÃO evidência de ausência.

---

## 10 · DOWNLOAD DE PDFs DE ARTIGOS

### Fluxo (o que funciona)
1. **Europe PMC** (para PMCs abertos):
   ```bash
   curl -sL -A "Mozilla/5.0" "https://europepmc.org/articles/PMC7319380?pdf=render" -o out.pdf
   ```
2. **NCBI OA service** (fallback):
   ```bash
   curl -s "https://www.ncbi.nlm.nih.gov/pmc/utils/oa/oa.fcgi?id=PMC7319380&format=pdf"
   # → extrai <link href="..."> do XML
   ```
3. **Paywall (Elsevier/JBJS/BJJ):** requer sessão real de navegador com acesso institucional. Estratégia: gerar `ARTIGOS_PRINCIPAIS.html` (uma tabela com botões DOI) → Dr. clica no Chrome do Air (com VPN UFSC) → PDFs caem em ~/Downloads → você recolhe e renomeia.

### Nome do arquivo (padrão sagrado)
```
{FirstAuthor}_{Year}_PMID{PMID}.pdf
Ex: Fontalis_2024_PMID38555946.pdf
```

### Recolher do ~/Downloads (script)
```bash
ls -lat ~/Downloads/*.pdf | head        # ver o que caiu
# → identificar pelo conteúdo (grep 'DOI', 'PMID' no PDF)
# → renomear no padrão → mover para ARTIGOS/
```

---

## 11 · CONTROLE DE NAVEGADOR — as camadas

**Regra Inviolável #7:** trabalhar em SEGUNDO PLANO. Nunca roubar foco (nada de `osascript ... to activate`, `keystroke`, cliques por coordenada de tela). Se o Dr. está no Mac, você não aparece na tela dele.

### 5 camadas em ordem de preferência
1. **curl -sL** — 90% dos casos, invisível, rápido
2. **WebFetch** — quando precisa do modelo entender o HTML (páginas bloqueiam robôs comuns)
3. **Playwright headless no Air** — quando precisa de JS renderizado / clicar em botões que geram PDFs. Chrome headless instalado em `~/Library/Caches/ms-playwright/`:
   ```python
   from playwright.sync_api import sync_playwright
   with sync_playwright() as pw:
       b = pw.chromium.launch(headless=True)  # SEMPRE headless
       ctx = b.new_context(user_agent="Mozilla/5.0 ...", accept_downloads=True)
       page = ctx.new_page()
       page.goto(url, wait_until='load', timeout=60000)
       # extrair, clicar, baixar...
   ```
4. **screencapture -x /tmp/tela.png** — inspeção autônoma. `Claude.app` tem permissão de Screen Recording. **NÃO** use `-i` (interativo) nem AppleScript pré-comando (rouba foco).
5. **Chrome real via MCP** — se o Control_Chrome MCP estiver disponível, use `execute_javascript` no `deviceId` do Mini (`6bc77228`), **nunca ativar janela**.

### AppleScript ao Chrome REMOTO — BLOQUEADO
Testei: TCC (macOS) bloqueia comando externo. Não perca tempo com `osascript -e 'tell application "Google Chrome" ...'` — dá timeout ou pede permissão que o Dr. teria que clicar.

---

## 12 · ACESSO SSH (Mini · Air)

```bash
ssh macmini '<comando>'                       # Mini (esta máquina, mas útil se estiver rodando de fora)
ssh air '<comando>'                           # MacBook Air
# Air tem a VPN UFSC ligada → acesso a paywall (150.162.77.234)
# Rota automática: LAN em casa, Tailscale fora
```

- **Cair no Air para baixar artigos pagos:**
   ```bash
   ssh air 'python3 /tmp/download_articles.py'
   rsync -q -e ssh air:'~/Downloads/*.pdf' /Users/danielfernandes/Documents/Claude/PALESTRA-ATQ-CCOT2026/ARTIGOS/
   ```
- Air pode estar offline (fora de casa) — sempre `ssh -o ConnectTimeout=8 air 'echo ok'` antes.

---

## 13 · REGRAS INVIOLÁVEIS (respeitar sempre)

1. **Zero palavrões** — linguagem profissional sempre. Ele é médico.
2. **Alertas WhatsApp só urgência crítica** — não notificar milestone/rotina. `~/mac-telegram-bot/alertar_daniel.sh --tipo <tipo>`.
3. **Nunca adivinhar** — verificar tudo antes de afirmar. Se não consegue provar, dizer "⚠️ NÃO VERIFIQUEI".
4. **Link clicável em toda opção/conteúdo** — `file:///Users/...` com espaços em `%20`; https:// direto.
5. **Conferir tudo antes de agir** — ler docs, ver mtime, confirmar antes de publicar/deletar/sobrescrever.
6. **Nada vive só no chat** — toda evolução vira arquivo.
7. **Trabalhar em segundo plano** — nunca roubar foco.
8. **Evidência-primeiro** — nenhuma afirmação sem prova; comando "PROVA?" do Dr. deve ser respondível na hora.

Ver `~/.claude/CLAUDE.md` para versão completa.

---

## 14 · SKILL PALESTRA-MEDICA (protocolo obrigatório)

Ao mexer em qualquer conteúdo de palestra, siga:
- **Fase 0** — critério de busca (rubrica de evidência 0-100)
- **Fase 1** — busca ampla por dimensão
- **Fase 2** — questionar CADA afirmação (6 perguntas + 13 armadilhas)
- **Fase 3** — verificar full-text por TIER correto
- **Fase 4** — GAUNTLET de 6 juízes cegos (rigor · fonte · priorização · sequência · limpeza · separação)
- **Fase 5** — entregar em 2 camadas: slide limpo + documento anexo

Skill completa: `~/.claude/skills/palestra-medica/SKILL.md` (o Dr. investiu tempo pesado nesta skill — respeite).

### As 13 armadilhas — memorize
1. Patrocínio industrial 2. Substituto vestido de clínico 3. Sample piloto 4. Dose/via/composição diferente 5. Nicho geográfico 6. IC estreito perto do nulo 7. "P<0.05" isolado 8. Paper superado por sucessor 9. Metadados errados 10. Narrativa viral 11. Slide↔documento divergem 12. Nulo NS vendido como negativo provado 13. Manchete contradiz evidência de maior tier

---

## 15 · MEMÓRIA (~/.claude/projects/-Users-.../memory/)

- `MEMORY.md` — índice de tudo que sei sobre o Dr. e o projeto (sempre carregado no contexto). NÃO escrever conteúdo direto ali; adicionar pointer para arquivo.
- Cada memória em arquivo próprio, tipo `feedback_*`, `project_*`, `reference_*`, `user_*`.
- Ao aprender algo novo do Dr., salvar como memória.

---

## 16 · O QUE FALTA FAZER (estado 15/08 fim do dia)

1. **Dr. clicar em ARTIGOS_PRINCIPAIS.html** (15 PDFs pagos que faltam — WHiTE 5, Fontalis, Møller, Kheir, Shohat, de Steiger, etc)
2. **Continuar revisão fina do CAPITULO.md** com o Dr., unidade a unidade
3. **Aplicar gauntlet** (Fase 4 da skill) em cada unidade antes de fechar
4. **Sessão do celular monta os slides** a partir das unidades aprovadas
5. **Renderizar HTMLs finais → PDF** para consolidar em um deck só

**Não faça nada sozinho fora dessa lista** sem o Dr. aprovar.

---

## 17 · UM COMANDO PRA COMEÇAR

```bash
cd ~/.palestra-pages && git pull && \
echo "=== CAPITULO.md, últimas 40 linhas ===" && tail -40 CAPITULO.md && \
echo "=== último commit ===" && git log --oneline -3 && \
echo "=== artigos ===" && ls /Users/danielfernandes/Documents/Claude/PALESTRA-ATQ-CCOT2026/ARTIGOS/*.pdf | wc -l
```

---

## 18 · ORIENTAÇÕES DA SESSÃO DE SLIDES (PALESTRA SULBRA NO CELULAR)

**Papel:** montar os slides a partir do `CAPITULO.md` — transcrição **1:1**, sem alterar, resumir ou "melhorar" conteúdo. Números, fontes e condutas são 100% da sessão de conteúdo; se algo parecer errado ou faltando, devolve a questão (via Dr. ou arquivo), nunca corrige por conta.

**Fonte da verdade — sempre o commit MAIS RECENTE:** `~/.palestra-pages/CAPITULO.md` (`git pull` antes de montar). A revisão da literatura é contínua (busca do que tem evidência de mudar desfecho) — por isso a versão mais nova é a mais fiel à verdade: não existe "escolher versão", usa-se sempre a mais recente.

**Builder:** `build_deck.py` (cópia idêntica em `Documents/Claude/PALESTRA-ATQ-CCOT2026/` e `~/.palestra-pages/`). Gera o `deck.html` (escuro CCOT, escalonamento 100% via `cqw`, aparecer-ao-clique). O conteúdo é transcrito DENTRO do arquivo (lista `DIVISORES_E_UNIDADES`), unidade por unidade, 1:1 do CAPITULO.md.

**Padrão de cada unidade (slide-decisão):**
1. **eyebrow** — `DECISÃO X · TEMA`
2. **pergunta** — título do slide (a PERGUNTA da unidade)
3. **resposta** — barra-veredito (a RESPOSTA da unidade)
4. **linhas de evidência** — uma por clique; cada uma com rótulo + número + fonte `autor · desenho · N · PMID`
5. **barra Conduta**
- A **Discussão** NÃO entra no slide.
- `MAXROWS = 4`: unidade com mais de 4 linhas vira **mais um slide** (regra "letras grandes sempre", nunca espremer).

**Estado atual (16/08):**
- **Decisão 0 montada** — 8 slides (capa + divisor D0 + 0.1 + 0.2 [2] + 0.3 [2] + 0.4). ⚠️ a fonte avançou depois: `0.1` e `1.1` foram atualizadas no CAPITULO.md — esses slides vão precisar de re-montagem quando o Dr. pedir.
- **Próximo:** Decisão 1 (divisor + 1.1 [2 — tem 5 linhas] + 1.2 + 1.3 + 1.4 = 6 slides).

**Deploy (link do celular):**
```bash
cd ~/.palestra-pages
python3 build_deck.py                # regenera deck.html
git add deck.html build_deck.py
git commit -q -m "Deck ATQ: <resumo>"
git push -q origin main              # GitHub Pages ~30-60s
```
- URL: https://danielortopediafernandes-ux.github.io/palestra-atq-ccot2026/deck.html
- ⚠️ O `_republish-pages.sh` citado no contrato **não existe** — o deploy é o commit/push acima.

> ⚠️ **ATUALIZAÇÃO 16/08 tarde (sessão de slides / Opus):** o deploy manual acima (`python3 build_deck.py` + commit) ainda funciona, mas **agora existe `build_all.sh`** que faz isso + gera o `.pptx` animado num passo só — ver **PARTE B · B2**. As **figuras** que vocês já implementaram em `build_deck.py` (`"figs":[...]`, `MAXROWS_FIG`) foram estendidas também para o `.pptx` (`build_pptx.js` + `sharp`, rasteriza SVG→PNG) — nenhuma mudança de conteúdo, só a ferramenta acompanhou. Deck já em **10 slides** (Decisão 0 com figuras). Ver **B6**.

---

# ═══════════════════════════════════════════════════════════
# PARTE B · MÓDULO DE SLIDES + POWERPOINT (sessão de slides / Opus · 16/08/2026)
# ═══════════════════════════════════════════════════════════
> Esta PARTE B **atualiza as seções 5 (design) e 7 (PowerPoint)**. Onde divergir, **PARTE B prevalece** — é a decisão mais recente do Dr.
> **Atualizada 16/08 tarde** para refletir o trabalho da sessão de conteúdo (Seção 18: figuras já em `build_deck.py`) — ver B1/B2/B6 abaixo.

## B0 · Decisão do Dr. (16/08) — o design final
O Dr. viu e aprovou ("ficou bom demais") um deck DIFERENTE do piloto creme:
- **Design ESCURO CCOT** (slate `#33414B`), **letras GRANDES**, número-chave gigante, **efeito de aparecer-ao-clique** (um bloco por clique), **figuras reais de artigo** onde ajudam.
- Vale para o **HTML (link)** E para o **.pptx (congresso)**. O piloto creme (seção 5) fica como alternativa histórica — **NÃO montar creme** sem o Dr. pedir.
- Regra que ele reforçou: **letras grandes SEMPRE**; se não cabe, **divide em mais slides** — nunca reduzir a fonte (memória `feedback_palestra_letras_grandes_sempre_15ago`).

## B1 · O que já existe (deck)
- **Pasta de trabalho (a "sala de máquinas"):** `/Users/danielfernandes/Documents/Claude/PALESTRA-ATQ-CCOT2026/` — é AQUI que ficam `node_modules` (pptxgenjs + sharp já instalados via `npm install`) e é daqui que se roda tudo. Cópias espelhadas em `~/.palestra-pages/` (sem `node_modules` — está no `.gitignore`, não sobe pro repo público).
- **Fonte única de dados:** `build_deck.py` (edite SÓ `CAPA` e `DIVISORES_E_UNIDADES` — o resto é motor). Ele já exporta `deck_data.json`, que `build_pptx.js` lê para gerar o `.pptx` com o MESMO conteúdo — **um só lugar para editar, dois formatos de saída.**
- **Publicado (HTML, link do celular):** `https://danielortopediafernandes-ux.github.io/palestra-atq-ccot2026/deck.html`
- **Pronto e conferido:** Capa + **Decisão 0 completa com figuras reais** (10 slides — a sessão de conteúdo já implementou `"figs":[...]` em `build_deck.py`, com crédito e licença por figura). **Falta: Decisões 1–9.**

## B2 · Como CONTINUAR o deck (a MAIOR tarefa restante — SEM navegador, SEM API)
1. `cd ~/.palestra-pages && git pull` (pegar o CAPITULO.md mais recente — é a fonte da verdade, mapeamento 1:1).
2. Editar **`/Users/danielfernandes/Documents/Claude/PALESTRA-ATQ-CCOT2026/build_deck.py`** (a cópia com `node_modules`): a lista `DIVISORES_E_UNIDADES` já tem a Decisão 0. **Acrescentar Decisões 1–9** transcrevendo CADA unidade do CAPITULO.md neste formato:
   ```python
   {"tipo":"divisor","num":"DECISÃO 1","titulo":"Planejamento de imagem — que exame...","linha":"<frase de moldura da decisão>"},
   {"tipo":"decisao","eyebrow":"DECISÃO 1 · IMAGEM","tag":"1.1",
    "pergunta":"<a PERGUNTA do CAPITULO — vira o título>",
    "resposta":"<a RESPOSTA do CAPITULO — vira a barra-veredito teal>",
    "rows":[("<rótulo curto>","<achado COM o número exato>","<Autor Ano · desenho · N · PMID xxxxx>"), ...],
    "conduta":"<a CONDUTA do CAPITULO>",
    "figs":[{"arquivo":"_figuras/1.1_algumnome.png","credito":"Adaptado de Autor Ano · licença"}, ...]},  # opcional, ver B5
   ```
   **Regra 1:1 (inviolável):** copiar número, autor e PMID EXATOS do CAPITULO. **Não resumir, não inventar, não "melhorar".** A **Discussão NÃO entra** no slide. Se algo parecer errado/faltando → **devolver ao Dr.**, não corrigir por conta.
   **Splitting automático:** o gerador já divide sozinho unidades com **>4 linhas** (ou **>3 linhas se tiver figura**, `MAXROWS_FIG=3`) em mais slides, e põe "(continuação)". Não precisa dividir à mão.
3. **UM COMANDO** faz o resto (gera HTML + `.pptx` com animação + publica no GitHub Pages):
   ```bash
   /Users/danielfernandes/Documents/Claude/PALESTRA-ATQ-CCOT2026/build_all.sh
   ```
   Por baixo, ele roda `python3 build_deck.py` → `node build_pptx.js` → `python3 inject_anim.py deck.pptx` → `cp` + `git commit` + `git push` para `~/.palestra-pages/`. (Os passos manuais antigos — seção 18, e os passos 3-5 originais aqui — ainda funcionam separados se precisar debugar um por vez.)
4. Conferir: abrir `https://danielortopediafernandes-ux.github.io/palestra-atq-ccot2026/deck.html?v=N` (**mude o N** para furar o cache do navegador/CDN). O `.pptx` fica em `.../PALESTRA-ATQ-CCOT2026/deck.pptx` (local — não vai pro GitHub público; entregar direto ao Dr.).

## B3 · Tokens do deck escuro (usar EXATOS — já no build_deck.py)
```
--bg:#33414B (slate CCOT) · --card:#3E4E5A · --teal:#107368 (veredito/preenchimento) · --tealb:#35B3A3 (destaque de texto)
--ink:#FFFFFF · --body:#D6DEE4 · --mut:#A6B2BC
Títulos: serif system (Georgia,'Times New Roman')  ·  Corpo: sans system (-apple-system,Arial)  — SEM webfont
Escala 100% via container units (cqw): palco 1280×720, aspect-ratio:16/9, SEM JavaScript de escala (robusto no GitHub Pages).
Tamanhos: título 37–48px · veredito 23px · linha de evidência 21px · fonte da linha ≥15px · número gigante 54–72px.
```

## B4 · O efeito "aparecer ao clique"
- **HTML:** cada bloco tem classe `.frag` (começa `opacity:0`); um contador revela um `.frag` por clique/seta; `data-frags="N"` no `<section>` diz quantos cliques o slide tem. Botões ‹ ›, setas do teclado e clique — tudo já no build_deck.py.
- **.pptx:** o pptxgenjs NÃO anima; a animação é **injetada no XML depois** (ver B6).

## B5 · Figuras reais de artigo
- Artigos em `.../ARTIGOS/` (`Autor_Ano_PMIDxxxx.pdf`). Preferir **open-access / Creative Commons** (uso público com **crédito no slide**: autor · ano · licença). Figura de artigo pago = só ao vivo/PDF, não publicar na web.
- **Comprimir PDF grande (>10 MB) com filtro nativo do macOS — sem instalar nada:**
  ```python
  import Quartz; from Foundation import NSURL
  qf=Quartz.QuartzFilter.quartzFilterWithURL_(NSURL.fileURLWithPath_("/System/Library/Filters/Reduce File Size.qfilter"))
  pdf=Quartz.CGPDFDocumentCreateWithURL(NSURL.fileURLWithPath_(SRC))
  ctx=Quartz.CGPDFContextCreateWithURL(NSURL.fileURLWithPath_(DST),None,None); qf.applyToContext_(ctx)
  for i in range(1,Quartz.CGPDFDocumentGetNumberOfPages(pdf)+1):
      p=Quartz.CGPDFDocumentGetPage(pdf,i); r=Quartz.CGPDFPageGetBoxRect(p,Quartz.kCGPDFMediaBox)
      Quartz.CGPDFContextBeginPage(ctx,{Quartz.kCGPDFContextMediaBox:r}); Quartz.CGContextDrawPDFPage(ctx,p); Quartz.CGPDFContextEndPage(ctx)
  Quartz.CGPDFContextClose(ctx)   # 12MB → ~2MB, texto preservado
  ```
- **Extrair uma figura:** `pdftoppm -png -f <pág> -l <pág> -r 200 art.pdf fig` e recortar; ou usar figura já aberta (Wikimedia Commons CC/CC0, PMC open-access). SVG (gráfico feito a partir dos números, ex. "137 mg/dL" em destaque) também é aceito — ver B6.
- **Embutir no HTML:** `build_deck.py` já converte para **data URI base64** automaticamente (`fig_data_uri()`) → o deck fica autossuficiente (o GitHub Pages serve tudo inline). Só apontar o campo `"figs"` na unidade (ver B2) — não precisa mexer no motor.
- Exemplos já em produção: forest-plot do Henkelmann 2026 (CC BY 4.0, unidade 0.1), gráfico SVG "137 mg/dL" gerado dos números do Kheir 2018 (unidade 0.2) — cada um com crédito/licença visível no slide.

## B6 · PowerPoint (.pptx) REAL com as mesmas animações — ATUALIZA a seção 7
**Sim, há .pptx funcional, unificado com o HTML.** Pipeline em `/Users/danielfernandes/Documents/Claude/PALESTRA-ATQ-CCOT2026/` (a pasta de trabalho, com `node_modules`):
- `build_pptx.js` — lê **o mesmo `deck_data.json`** que `build_deck.py` gera (fonte única — não duplica conteúdo). Gera o `.pptx` com **pptxgenjs**, paleta CCOT idêntica ao HTML, cada bloco (texto/tarja/cartão/imagem) marcado com um `objectName: "anim_N"` sequencial (para a animação depois). Se a unidade tem `"figs"`, renderiza a figura em coluna à direita com o crédito — SVG é **rasterizado para PNG com `sharp`** antes de embutir (cache em `_figuras/_png_cache/`, PowerPoint não confia em SVG embutido).
  ```bash
  cd /Users/danielfernandes/Documents/Claude/PALESTRA-ATQ-CCOT2026 && node build_pptx.js   # gera deck.pptx
  ```
- `inject_anim.py` — injeta `<p:timing>` (entrada **"Aparecer ao clique"**) direto no XML do .pptx, por **manipulação de string** (não re-serializa → não corrompe namespaces). Acha QUALQUER elemento marcado `name="anim_N"` — texto (`<p:sp>`) **ou imagem** (`<p:pic>`) — na ordem 1,2,3...:
  ```bash
  python3 inject_anim.py deck.pptx
  ```
  ⚠️ **Bug já corrigido nesta sessão:** a 1ª versão só procurava `<p:sp>` e deixava imagens sem clique. Se copiar uma versão antiga deste script, cheque se `spids_em_ordem()` busca `<p:cNvPr ... name="anim_N">` em **qualquer** elemento (não só dentro de `<p:sp>...</p:sp>`).
- **Um comando faz tudo:** `build_all.sh` roda `build_deck.py` → `build_pptx.js` → `inject_anim.py` → publica o HTML. Ver B2.
- **QA do .pptx:** `soffice --headless --convert-to pdf x.pptx && pdftoppm -jpeg -r 130 x.pdf slide` → conferir os JPGs (`Read` neles). (`soffice` já instalado: `/opt/homebrew/bin/soffice`.) Depois `validate.py` da skill `pptx` (schema/relações/charts). ⚠️ O LibreOffice **achata** a animação no PDF (mostra tudo); o clique-a-clique só se testa abrindo no PowerPoint de verdade.
- **Gotchas do pptxgenjs (importantes):** cores SEM `#` (`"33414B"`, nunca `"#33414B"` nem 8 dígitos); `pres.layout="LAYOUT_WIDE"` ANTES de add_slide; um objeto de opções NOVO por shape (a lib muta em lugar — por isso `markAnim()` clona com `Object.assign({}, ...)`); `shadow.offset ≥ 0`.
- **Deps já instaladas** (`npm install` rodado nesta pasta): `pptxgenjs`, `sharp`. Se clonar/mover a pasta, rodar `npm install pptxgenjs sharp` de novo aqui.
- Pipeline antigo de teste (`.../Geral/Palestras/2026_congresso-sul-brasileiro_atq-planejamento/_teste_pptx/`) fica só como referência histórica — **o canônico agora é este** (dados unificados com o HTML).

## B7 · Controle de navegador — o que EU usei (honestidade)
- Eu dirigi o Chrome pela **extensão MCP do Claude** (`mcp__claude-in-chrome__*`) — isso é **específico do Claude Code**; **o DeepSeek NÃO terá esses tools.** Para tarefas de navegador (NotebookLM, QA visual), o DeepSeek deve usar **Playwright headless** (seção 11) ou o Dr. faz o passo no Chrome.
- **QA do deck é fácil:** como está no GitHub Pages, basta **abrir a URL em qualquer navegador** (nada de MCP) — inclusive Playwright headless + screenshot.
- ⛔ **NÃO usar Artifact (claude.ai) para o deck:** testei e o host do Artifact **colapsa** slideshow full-bleed (o iframe zera a altura ao navegar). **Use GitHub Pages.**

## B8 · NotebookLM — 3 áudios (como eu fiz)
- Notebook (conta `danielortopediafernandes@gmail.com`): **"Artroplastia de Quadril: Decisões Pré-operatórias e Desfechos Clínicos"** — `https://notebook.google.com/notebook/4aaa2aed-dc21-43ba-bb15-128993d13bd0` — **41 fontes** (40 artigos + o capítulo).
- 3 áudios "Resumo em Áudio" (formato **Análise detalhada**, PT-BR) com os prompts de `ARTIGOS/PROMPTS_NOTEBOOKLM.md` (1 aula de congresso · 2 análise crítica · 3 panorama de evidência). O Gemini Notebook salva **múltiplos** áudios (geram em paralelo).
- Técnica de upload (era via MCP; para replicar com Playwright): criar `<input type=file>` oculto → setar os files → **interceptar o `.click()` do input real** do botão "Enviar arquivos" e copiar os files → disparar `change`. Lotes ≤ ~8 MB (comprimir os PDFs >10 MB com o Quartz de B5). Nomes ASCII (sem acento) evitam erro de codificação.

## B9 · Estado atual (16/08 tarde) — o que falta no deck
- ✅ Capa + **Decisão 0 com figuras reais** (deck.html, **10 slides**, publicado e conferido).
- ✅ **`.pptx` unificado e funcional** — mesmo conteúdo, mesmas figuras, mesma animação de clique do HTML (`deck.pptx`, validado, 32 blocos animados incl. imagens).
- ✅ **`build_all.sh`** — 1 comando gera tudo e publica.
- ⏳ **Decisões 1–9** no deck.html/deck.pptx (via `build_deck.py` — B2). **Maior tarefa restante; 100% terminal.**
- ⏳ Figuras das Decisões 1–9 (mesmo padrão de `"figs"` da Decisão 0 — B5).
- ⚠️ **Pendência de conteúdo devolvida ao Dr.:** nome do evento — o CAPITULO diz **"XVI Congresso Catarinense de Ortopedia e Traumatologia" (CCOT)**; a pasta/sessão dizia "Sul-Brasileiro". **Confirmar com o Dr.** (não corrigir por conta).
- ⚠️ **Aviso da Seção 18 (sessão de conteúdo) ainda vale:** as unidades `0.1` e `1.1` foram atualizadas no CAPITULO.md depois de montadas — re-conferir contra o commit mais recente antes de fechar a Decisão 0/1.

---

**Fim do handoff. Boa sorte — o Dr. precisa da palestra pronta até 21/08.**
Se travar em algo, pergunte AO DR., não tente resolver adivinhando (Regra #3). E toda edição no capítulo → commit + push imediatamente, para não ter merge conflict com uma eventual segunda sessão.
