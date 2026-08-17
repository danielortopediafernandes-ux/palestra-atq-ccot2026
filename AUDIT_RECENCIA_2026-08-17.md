# AUDITORIA DE RECÊNCIA E FIDELIDADE — CAPITULO.md · 2026-08-17

Disparada pela regra do Dr. Daniel (17/08): *"NÃO trabalhamos com artigos velhos, exceto se forem clássicos da literatura médica e exceto se não houver literatura mais recente... SEMPRE buscar a literatura dos últimos 5 anos e com ALTO FATOR DE IMPACTO. Sempre que houver fraqueza metodológica precisamos deixar claro."*

**Método:** fiscal em código (`lint_recencia_capitulo.py`) → 148 linhas de evidência, **36 anteriores a 2021 sem justificativa**. Depois, 5 auditores buscaram sucessores 2021–2026 no PubMed, um por bloco de decisões, com leitura do abstract real de cada artigo.

**Limite honesto de toda esta auditoria:** foi feita sobre **abstracts do PubMed**, não sobre textos completos. Onde a afirmação depende de tabela ou subgrupo interno, está marcado como ⚠️ NÃO VERIFICADO. Nenhum fator de impacto foi conferido numericamente — a classificação de "alto impacto" é reputacional.

---

## TIER 1 — ERROS FACTUAIS (correção obrigatória, não é decisão editorial)

### 1.1 · [0.1] Kalmeijer 2002 — dois números não batem com a fonte
Conferido diretamente por mim no PubMed (PMID **12145715** — o capítulo nem trazia o PMID):
- O abstract diz **erradicação da colonização 83,5% × 27,8%**. O capítulo escreve "colonização 16,5% × 78,2%". O complemento de 27,8% é **72,2%**, não 78,2%. **Número errado.**
- O capítulo escreve "infecção MSSA **1,6% × 2,7%**". O abstract diz **infecções endógenas por *S. aureus* 0,3% × 1,7%, RR 0,19 (IC 0,02–1,62)**. Os valores 1,6%/2,7% ⚠️ **NÃO EXISTEM no abstract**.
- Frase literal dos autores: a mupirocina *"did not reduce the SSI rate (by S. aureus) or the duration of hospital stay"*.

### 1.2 · [3.2] Tezuka & Dorr 2019 — o preditor está trocado
O capítulo afirma: *"Melhor preditor de instabilidade: mobilidade femoral e espinopélvica — não o ângulo da taça"*, e a RESPOSTA da unidade diz *"o preditor é a mobilidade espinopélvica"*.
O abstract diz o contrário: o melhor preditor é a **mobilidade FEMORAL** (r = 0,632), acima da mobilidade espinopélvica diminuída (r = 0,455) e da incidência pélvica (r = 0,400). **A hierarquia está invertida na RESPOSTA do slide.**

### 1.3 · [0.2] Shohat 2019 (Insall Award) é de JOELHO
O Insall Award 2019 é **exclusivamente TKA**. Numa palestra de ATQ, é a referência errada. Existe a versão de **quadril**, do mesmo grupo:
**Shohat 2021 · Sci Rep · prospectivo multicêntrico · 1.212 ATQ primárias · PMID 33500515** — frutosamina > 293 µmol/L → IPP **6,7×** (P = 0,002); readmissão 16,7% × 4,4%; **OR ajustado 6,37 (IC 1,98–20,49)**.

### 1.5 · [5.4] Olsen 2014 — o intervalo "5-7%" não existe na fonte
O capítulo escreve *"grave (2-3) **5-7%**"*. O abstract diz **grau 1 = 21% · grau 2 = 5,1% · grau 3 = 1,7%**. O "5-7%" é uma soma feita pelo capítulo (5,1 + 1,7 = 6,8), apresentada como se fosse número publicado. Trocar pelos dois valores literais. Além disso, Olsen 2014 é de **hemiartroplastia por fratura**, não ATQ eletiva — para ATQ o número certo é o do Rassir 2021, já citado: **24% (165/677)**.

### 1.4 · [1.1] Petretta 2015 — precisão do p e do desenho
O `p < 0,001` vale **só para a haste** (75% × 60%). Para a **taça**, 77% × 70% teve **p = 0,050** (limítrofe). E o desenho não é "filme × digital": é **acetato sobre imagem digital calibrada × software de templating** — e o acetato venceu (é o título do artigo).

---

## TIER 2 — REVERSÕES DE CONDUTA (exigem decisão do Dr., não aplico sozinho)

### 2.1 · [0.3] ANEMIA — a manchete "24% → 4%" está sob ataque de nível 1 ⚠️
- **O que sustenta hoje:** Pinilla-Gracia 2020 — **retrospectivo antes-e-depois**, 75 controles × 70 intervenção, instituição única, controle 2015–16 × intervenção 2017–18 (**confundimento temporal integral**), e o ferro veio **junto com epoetina** (impossível separar). O PubMed rotula "Clinical Trial", mas o próprio texto diz *"This retrospective cohort study"*.
- **O sucessor de nível 1 que o contradiz:** **Liu 2025 · EClinicalMedicine · metanálise EM REDE de 22 ECRs, 3.026 pacientes · PMID 40727015** — ferro intravenoso **PRÉ-operatório NÃO reduziu transfusão: RR 0,91 (IC 0,72–1,15; I² = 0%)**. Só o **pós-operatório** reduziu (RR 0,80; 0,68–0,94).
- **Ressalva ao sucessor:** Liu 2025 é de **cirurgia em geral**, não específico de ATQ, e **excluiu** estudos que combinavam ferro com outros agentes — ou seja, não testa exatamente o esquema ferro+epoetina do Pinilla-Gracia. Não existe ECR de ferro IV pré-op específico de ATQ em 2021–2026.
- **O que segue de pé:** a anemia pré-operatória **importa** (Zhang 2024, 369.101 pac: prevalência 22%, associada a infecção, transfusão, TVP, mortalidade; Peng 2025, 424.158 pac: transfusão OR 1,82).
- **DECISÃO DO DR.:** manter o "24% → 4%" com a fraqueza declarada? Rebaixar a unidade para "detectar e investigar a anemia" sem prometer o desfecho? Ou apresentar o conflito explicitamente (é a opção mais à prova de debatedor)?

### 2.2 · [4.3] CABEÇA FEMORAL — a conduta "32 mm como padrão" está superada
- **O que sustenta hoje:** Tsikandylakis 2018 (NARA, 186.231) — 36 × 32 mm sem redução adicional de luxação (HR 0,85; ns) e **mais** revisão global (HR 1,14).
- **Quatro registros posteriores reverteram a segunda metade:**
  - **Bender 2025 · J Arthroplasty · AJRR · 319.531 ATQs · PMID 40015384** — revisão por luxação **32 mm 0,68% × 36 mm 0,46% (p < 0,001)**; **≥ 40 mm 0,51% não reduz mais** e **piora** revisão total (2,78%) e infecção (0,82% × 0,43%).
  - van Steenbergen 2023 · LROI · 269.280 — 1,4% (22–28 mm) → 0,9% (32) → **0,6% (36)**.
  - Hoskins 2022 · JBJS · AOANJRR · 188.591 — 36 mm melhor que 32 mm (HR 0,44; IC 0,22–0,88). ⚠️ o PubMed devolve só a **errata**; números são os corrigidos, subgrupo de taça < 51 mm.
  - English 2023 · NZJR · 60.051 — subir de 32 para 36 mm **não** aumenta revisão (fora de metal-metal), derrubando o "custo" atribuído ao 36.
- **DECISÃO DO DR.:** mudar a conduta para **36 mm como padrão quando a taça comporta, com teto em 36** (≥ 40 mm não ganha e piora)?

### 2.0 · [5.4] CIMENTO E MORTALIDADE — o HR 1,9 está indefensável em 2026 ⚠️ (a mais grave)
- **O que está no capítulo:** *"o cimento foi fator independente de mortalidade em 1 ano (HR 1,9; IC 1,3–2,7)"* — Olsen 2020 · Acta Orthop · retrospectivo, **986 cimentados × 109 não cimentados** (controle minúsculo e desbalanceado), confundimento por indicação óbvio (cimenta-se justamente o osso pior e o paciente mais frágil).
- **Quatro fontes 2021+ de nível superior apontam na direção OPOSTA:**
  - **Lewis 2022 · Cochrane · 58 estudos, 10.654 pac · PMID 35156194** — hemiartroplastia cimentada **REDUZ** mortalidade em 12 meses: **RR 0,86 (IC 0,78–0,96)**, certeza **MODERADA**. Menos fratura periprotética intra-op (RR 0,20) e pós-op (RR 0,29). **Mas: mais embolia pulmonar (RR 3,56; IC 1,26–10,11).**
  - **Viberg 2022 · Bone Joint J · registros dinamarqueses, 17.671 · PMID 34969285** — explica o paradoxo: o excesso de mortalidade do cimento existe **só no dia 0–1** (HR 1,70; diferença absoluta **0,4%**); após 7 dias **HR 1,07**; em 5 anos **HR 1,01**. Reoperação em 5 anos **6,1% × 10,2%** a favor do cimento.
  - **Righolt 2025 · CORR · análise secundária do RCT HIP ATTACK, 966 artroplastias · PMID 40828989** — desfecho composto (morte + eventos cardiopulmonares) **OR 1,0 (0,7–1,4)** em 90 dias e em 1 ano.
  - **Malki 2026 · 16 RCTs, 3.776 pac** (já no capítulo) — cimentado **reduz** mortalidade OR 0,83.
- **DECISÃO DO DR.:** retirar o HR 1,9 e substituir pela leitura moderna — **o risco do cimento é agudo (dia 0–1) e pequeno em termos absolutos (0,4%), não uma mortalidade tardia**; e o desfecho que realmente sobe com o cimento é a **embolia pulmonar (RR 3,56)**, não a morte?

### 2.4 · [7.1] ÁCIDO TRANEXÂMICO — o RR 0,26 superestima o efeito em quase o dobro
- **O que está no capítulo:** RR 0,26 (Chen 2016). É de **via tópica**, e a metanálise incluiu **ECRs *e* coortes** (o próprio abstract admite), o que infla o efeito.
- **A convergência atual é ≈ 0,48**, em quatro fontes independentes com populações diferentes:
  - Tantavisut 2025 · EFORT Open Rev · **80 ECRs, 13.969 pac** · PMID 40591647 — tópico × placebo **RR 0,480 (0,386–0,597)**
  - Gibbs 2023 · **Cochrane** · PMID 37272509 — IV × placebo **RR 0,48 (0,34–0,69)**, certeza BAIXA, população de **fratura**
  - Augustinus 2022 · 13 estudos, **54.843 pac** · PMID 36512031 — **RR 0,48 (0,40–0,58)**, sem aumento de TVP/TEP, com **redução de mortalidade em 30 dias**
  - Thapaliya 2024 · TriNetX, **144.344 ATQs pareadas** · PMID 39201061 — **RR 0,41 (0,37–0,45)** em 30 dias
- **⚠️ Achado metodológico importante sobre o Boucher 2025 (já citado no capítulo):** o capítulo o resume como *"IV = tópica"*, mas o abstract diz que **no QUADRIL a via sistêmica saiu melhor que a tópica** (o inverso do joelho), com **I² = 82,4%**. O resumo atual **apaga o subgrupo do quadril** — que é justamente a nossa população.
- **Não existe metanálise 2021–2026 de TXA intravenoso × placebo em ATQ eletiva** — 6 estratégias de busca, zero resultados. É o **cenário (1) da sua regra**: a pergunta está encerrada, ninguém mais randomiza contra placebo. Isso deve ser dito, não escondido.
- **DECISÃO DO DR.:** trocar o RR 0,26 pela convergência ≈ 0,48 e corrigir a leitura do Boucher?

### 2.5 · [6.1] OFFSET — a fonte principal não tem número, e o limiar de 5 mm não vale para PROM
- **Mahmood 2016:** o abstract **não dá magnitude nenhuma** (sem N, sem %, sem IC) — só o sinal ("evitar redução > 5 mm"). Pela sua regra *NÚMERO ou não entra*, ele sozinho não sustenta slide quantitativo.
- **Bullen 2023 · J Arthroplasty · n = 414 · PMID 36096271** — só redução **> 20 mm** piorou WOMAC dor (P = 0,005) e movimento (P = 0,015); **até 20 mm não se associou a PROM** (P entre 0,102 e 0,995). Ou seja: **os 5 mm valem para força abdutora medida, não para o que o paciente relata.**
- **Vorimore 2024 traz uma mensagem nova que o capítulo ainda não usa:** apenas **10%** dos casos atingiram a reconstrução de ± 2,5 mm; e **compensar offset acetabular perdido aumentando o femoral PIORA** o resultado (ΔOHS 22 ± 11 × 24 ± 10; P = 0,040).
- **DECISÃO DO DR.:** distinguir explicitamente no slide "força abdutora (5 mm)" de "desfecho relatado (20 mm)"?

### 2.3 · [0.4] TABAGISMO — no QUADRIL, a infecção não se sustenta
- **Bongers 2024 · Acta Orthopaedica · registro holandês LROI · 272.640 pacientes · PMID 38353549** — fumantes: revisão **ATQ aHR 1,3** e mortalidade **aHR 1,4**; mas **revisão POR INFECÇÃO no quadril: aHR 1,0 (IC 0,8–1,2) — NÃO significativo** (no joelho, 1,3).
- Reforço discordante: Gonzalez-Parreño 2024 · OTSR · 4.591 pac — tabagismo **não** foi preditor de infecção periprotética na multivariada (OR 1,1; IC 0,6–1,5). Complicação de ferida, sim (1,9% × 0,7%).
- **Fraqueza do que está no capítulo:** Bedard 2018 **agrupa quadril e joelho** e não separa. Levar o OR 2,16 para um slide de ATQ é extrapolação.
- **DECISÃO DO DR.:** reposicionar a unidade para o que sobrevive no quadril — **complicação de ferida, revisão global e mortalidade** — em vez de infecção?

---

## TIER 3 — TROCAS DE FONTE (melhoram a unidade sem mudar a mensagem)

| Unidade | Sai (velho) | Entra (2021+) | Ganho |
|---|---|---|---|
| [0.1] pele | Ribau 2020 (RR ± 0,16, reporte atípico) | **Henkelmann 2026 · Antimicrob Resist Infect Control · 19 estudos, n = 64.796 · PMID 41652612** | pele **OR 0,43 (0,29–0,64)** · combinada 0,48 · **nasal 0,65 (0,34–1,22) NÃO significativa** |
| [0.1] nasal | — | **Zhou 2026 · Int J Infect Dis · 17 ECRs, 15.533 · PMID 41862082** | mupirocina: SA-SSI RR 0,67 · colonização RR 0,22 · SSI global só em ortopedia RR 0,80 |
| [1.3] impressão 3D | Tu 2020 (n = 12, sem controle) | **Zhao 2025 · J Arthroplasty · 106 quadris · PMID 40368076** | centro de rotação vertical 14,5 → 3,8 mm · horizontal 11,4 → 2,0 mm |
| [3.1] Lewinnek | Abdel 2016 (fica, é clássico) | **+ Hernández 2021 · 2.489 ATQs · PMID 34434695** | confirma: **55,8%** das luxações dentro da zona |
| [3.2] alvo funcional | Tezuka & Dorr 2019 | **Vigdorchik 2021 · BJJ · Otto Aufranc · 2.081 ATQs · PMID 34192913** (já citado em 3.3) | leva o conceito de descritivo a prospectivo validado |
| [3.5] fusão lombar | Perfetti 2017 (7,19×, base administrativa, 12 meses) | **Soler 2024 · Eur Spine J · 17 estudos, 1.789.356 pac · PMID 38267733** | luxação **OR 2,50 (1,78–3,52)** — magnitude muito menor · **+ Yang 2022** (gradiente: 2,2% → 4,2% → 4,7% → 7,8% com fixação espinopélvica) |
| [4.1] dupla mobilidade | Levin & Mont 2018 (9 estudos) | **Sephton 2025 · J Arthroplasty · 13 estudos, 5.004 quadris · PMID 39128780** | re-revisão por luxação **OR 0,38**; ⚠️ **contra cabeça > 36 mm não há vantagem (OR 0,69; P = 0,11)** |
| [4.2] liner | Wyatt 2020 + Hemmilä 2019 | **Davis 2021 · BJJ · NJR · 213.146 ATQs · PMID 34465151** | liner assimétrico reduz revisão na via posterior |
| [4.3] cabeça | Allepuz 2014 (n = 14.372, 45–64 anos, 5 anos) | **Bender 2025 · AJRR · 319.531 · PMID 40015384** | ver Tier 2.2 |

---

## MANTER — clássicos e ausências justificadas

| Referência | Veredito | Justificativa a escrever na coluna Fonte |
|---|---|---|
| **Møller 2002 · Lancet** | MANTER-CLÁSSICO | Único nível 1 ligando cessação de tabagismo a complicação em artroplastia; busca 2021–2026 não achou ECR nem metanálise que o substitua. ⚠️ n analisado foi **108, não 120**; a intervenção aceitava **cessação OU redução de 50%**; taxa basal de 52% é de outra era cirúrgica. **Deve entrar junto:** Xu 2021 · EClinicalMedicine · 417.767 pac — cessação ≥ 4 semanas: infecção de ferida **OR 0,37 (0,16–0,89)**. |
| **Kwon 2006 · CORR** | MANTER-CLÁSSICO | Única fonte com efeito agrupado para reparo capsular; 20 anos depois ainda não há ECR. ⚠️ **IC 4,05–16,67** — apresentar como "cerca de 8×, IC 4–17", nunca o 8,21 nu. Controles majoritariamente históricos inflam o efeito. Díaz-Ponte 2025 é **scoping review sem número agrupado** — serve como direção, não como fonte numérica. Mecanismo: Cherry 2025 (cadavérico) torque 9,12 × 2,73 Nm. |
| **Phillips 2014** | MANTER-SEM-SUCESSOR | Único ECR agente × agente; Zhou 2026 confirma que dados head-to-head seguem escassos. ⚠️ é **ITT modificado**, aberto, os dois braços receberam clorexidina, e o único P significativo é per-protocol. |
| **Varady 2019** | MANTER-SEM-SUCESSOR | Busca por monitorização contínua de glicose em artroplastia 2021+: zero. ⚠️ os **65%** são com limiar ≥ 126 mg/dL (com 137 são 56,4%); sem desfecho clínico — mostra *quando* sobe, não que medir reduz infecção. |
| **Kheir 2018** | MANTER-SEM-SUCESSOR | Nenhum estudo 2021+ refaz o limiar glicêmico × infecção em artroplastia primária. ⚠️ **os 24.857 não são a base da análise** (13.196 tinham seguimento ≥ 1 ano) e **não houve associação dentro do subgrupo diabético (p = 0,276)** — o sinal é sobretudo do não-diabético hiperglicêmico. |
| **Seagrave 2017** | MANTER-SEM-SUCESSOR | Nenhuma revisão sistemática 2021+ refez a pergunta. ⚠️ é síntese **narrativa**, sem pooling nem risco de viés. Redundante com Abdel — considerar fundir. |
| **Tsikandylakis 2020** | MANTER-SEM-SUCESSOR | A ausência de ECR de liner com rebordo **é o achado**, e está mais forte hoje (5 anos a mais sem ECR — busca 2021+ retornou zero). ⚠️ é revisão narrativa; dizer "não localizamos ECR até 2026". |

---

## ACHADOS NOVOS que a busca revelou (não estavam no capítulo)

1. **Javidmehr 2026 · J Arthroplasty · 15 estudos, 318.487 pac · PMID 42520992** — **mesmo com descolonização**, colonização por MRSA segue associada a infecção periprotética **OR 2,42 (1,35–3,49)**. Mensagem nova: descolonizar não normaliza o risco. ⚠️ I² = 75%, base observacional.
2. **Kagan 2023 · J Arthroplasty · 246.617 ATQs · PMID 36889529** — confundidor da fusão lombar: **opioide** na ATQ com fusão prévia aOR 2,29; **fusão sem opioide aOR só 1,38**. Título dos autores: são os opioides, não o cirurgião de coluna.
3. **Karasavvidis 2024 · J Arthroplasty · 281 pacientes Hip-Spine 2B · PMID 38642849** — luxação caiu de **6,8% para 1,5% (p = 0,03)** após planejar no plano **em pé** e subir cabeças ≥ 40 mm. ⚠️ três mudanças simultâneas, impossível isolar a causa.
4. **Diretriz ESCMID/EUCIC 2024 (Righi · PMID 39154859)** — GRADE; mantém **mupirocina como agente de diretriz**. Contraponto a qualquer slide que sugira que a povidona já a substituiu.
5. **Tarabichi 2025 · J Arthroplasty · 1.020 pac · PMID 40339933** — só a **albumina glicada ≥ 17,1%** previu complicação em 90 dias (OR 4,8; 1,4–15,7); **frutosamina (OR 0,63) e HbA1c (OR 1,18) não**. ⚠️ usou corte de frutosamina 270, não 293 — pode ser discordância de limiar.

---

## ⚠️ O QUE NÃO FOI VERIFICADO (declarar sempre)

1. **Nenhum texto completo foi lido** — toda a auditoria é de abstract do PubMed.
2. **Nenhum fator de impacto foi conferido numericamente.**
3. **Mononen 2020** — não é possível provar pelo abstract que os HRs 0,70–0,71 são do **subgrupo com fusão lombar** (podem ser da coorte inteira). Afirmar isso hoje é ⚠️ NÃO VERIFICADO. Detalhe omitido que enfraquece o slide: **38 mm não foi significativo** (HR 0,808; p = 0,140) e **38 e 40 mm tiveram MAIOR revisão** que 28 mm.
4. **Soler 2024** — o abstract tem **inconsistência interna**: descreve "fusões mais longas = maior risco" com **OR 0,62 (< 1)**. Não usar esse número específico sem o full-text.
5. **Davis 2021** — o IC publicado (HR 1,122; IC 1,108–1,346) é tipograficamente incoerente. Reproduzido como publicado; conferir antes de projetar.
6. **Hoskins 2022** — o PubMed devolve só a errata; n por braço e IC das taças ≥ 51 mm indisponíveis.
7. **Torres 2016** — o capítulo descreve o comparador como "mupirocina seletiva"; o abstract diz **"rastreamento de MRSA"**, sem mencionar mupirocina. Não confirmado.
8. **Rezapoor 2017** — o capítulo diz "429 pac", mas a análise de eficácia foi feita nos **95 (22,1%) com cultura positiva** para *S. aureus*. O n efetivo é 95.
9. **Zheng 2024** — único ECR de guia personalizado com IA em displasia (n = 60), mas o abstract **não publica um único número**. Inutilizável sem full-text.
10. **Bases não consultadas:** Embase, Cochrane não indexada, relatórios anuais em PDF dos registros (AOANJRR/NJR/AJRR).

---

*Auditoria conduzida por 5 agentes em paralelo + verificação direta dos achados críticos. Fonte de todos os dados: PubMed.*
