# HANDOFF PARA CLAUDE-DEEPSEEK · Palestra ATQ · XVI CCOT 2026

**Contexto:** créditos Max acabando; esta sessão (Claude Opus no Mini) passa o bastão. Você (Claude-DeepSeek no terminal) assume busca de artigos, edição do capítulo e apoio ao PowerPoint. **Palestra é 21/08/2026** — urgente.

> **LEIA PRIMEIRO, NESTA ORDEM:**
> 1. Este arquivo (o mapa)
> 2. `~/.claude/CLAUDE.md` (regras globais do Dr. — inclui **Regras Invioláveis 1-8**)
> 3. `~/.claude/skills/palestra-medica/SKILL.md` (protocolo obrigatório de 5 fases + gauntlet + as 13 armadilhas)
> 4. `~/.palestra-pages/CAPITULO.md` (fonte da verdade — 35 unidades, header-contrato no topo)
> 5. `Documents/Claude/PALESTRA-ATQ-CCOT2026/HANDOFF_CONTEUDO_PARA_SLIDES.md`

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

**Fim do handoff. Boa sorte — o Dr. precisa da palestra pronta até 21/08.**
Se travar em algo, pergunte AO DR., não tente resolver adivinhando (Regra #3). E toda edição no capítulo → commit + push imediatamente, para não ter merge conflict com uma eventual segunda sessão.
