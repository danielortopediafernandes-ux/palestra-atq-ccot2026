#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
lint_slide_linguagem.py — FISCAL DE LINGUAGEM dos slides do CAPITULO.md.

Nasceu em 2026-08-19, quando o Dr. Daniel cobrou: "toda hora tenho que repetir a
mesma coisa". As regras de linguagem dele existiam em memória/skill, mas eram
aplicadas de forma REATIVA (viravam memória DEPOIS do erro chegar a ele). Este
fiscal torna o portão PROATIVO: roda ANTES de entregar, como o lint_recencia.

Audita SOMENTE o que vai ao slide: os blocos `**TEXTO DO SLIDE...` e
`**CONCLUSÃO DO SLIDE...` — não o roteiro de fala nem a base de evidência.

REGRAS FISCALIZADAS (todas canonizadas pelo Dr.):
  1. Sem CAIXA-ALTA de ênfase (HASTE, TODA...) — exceto siglas consagradas.
  2. Sem coloquialismo / frase-de-efeito (lista negra).
  3. Sem 1ª pessoa (miro/faço/uso/peço...).
  4. Sem elipse-com-vírgula (calque sintático do inglês) — heurística, AVISA.
  5. CADA afirmação com número leva a SUA referência (PMID ou autor·ano) junto.

USO:  python3 lint_slide_linguagem.py [CAPITULO.md]
exit 0 = OK · 1 = BLOQUEIO · 2 = uso/arquivo
"""
import sys, os, re

# siglas/tokens que PODEM aparecer em maiúsculas sem ser ênfase de rascunho
SIGLAS_OK = {
    "ATQ","ATJ","TC","IA","RX","PROM","PROMS","MCID","CSI","DM","HR","OR","RR",
    "IC","SMD","PSI","BCIS","PACS","HHS","OHS","HOOS","ICC","NARA","AJRR","NJR",
    "LROI","AOANJRR","NZJR","EOS","ARMD","TXA","XLPE","PI","LL","SS","CORR",
    "JBJS","ICM","PMID","DOI","3D","2D","AAOS","OKU","PENG","CCOT","IMC","NARA",
    "AP","JJG","BMI","ASA","AGL","DL","DAA","PA","LFIT","PPO","NRS","GRADE",
    "RCT","RCTS","JR","AUC","NJR","LROI","MITCH","V40","CT","MRI",
}
# numeral romano (XVI congresso, nível III, Crowe IV...) não é ênfase
RE_ROMANO = re.compile(r"^[IVXLCDM]+$")
# coloquialismos e frases-de-efeito proibidos no slide (Regra #9)
BLACKLIST = [
    "não basta","vale a pena","tá aí","olha só","muda o jogo","virada de chave",
    "na mosca","quem melhora é","por incrível","de longe","a ilusão","a alavanca",
    "contrapartida honesta","meia diária","dá pra","dá para","né?","enfim",
    "no fim das contas","fecha com","com impacto",
]
# 1ª pessoa (verbo do cirurgião na voz pessoal) — só formas inequívocas.
# Excluídos: "uso"/"cimento" (substantivos), "indico" (pode ser conduta impessoal).
RE_1P = re.compile(r"\b(miro|faço|peço|acho|vejo|quero|prefiro|escolho|decido)\b", re.I)
# PALAVRAS DE FORÇA — universalização/intensificação. Não é erro por si só, mas
# OBRIGA confronto com a frase exata do abstract (regra 10 · #1 proibido inferir).
# Nasceu em 19/08, depois de eu escrever "dupla escala em TODA radiografia" quando
# a fonte (Ries 2022) diz só "could be used / consistent in all subgroups".
RE_FORCA = re.compile(r"\b(tod[oa]s?|sempre|nunca|obrigatóri[oa]|mandatóri[oa]|essencial|indispensáve(?:l|is)|padrão-ouro|garant[ae]|elimina|impede|cura|previne)\b", re.I)
# heurística de elipse-com-vírgula: "…; <palavra(s)>, <preposição>…" sem verbo no 2º membro
RE_ELIPSE = re.compile(r";\s+[a-zãáâéêíóôõúç ]+,\s+(à|ao|às|aos|de|da|do|das|dos|pela|pelo|em)\b", re.I)
RE_ANO   = re.compile(r"\b(19|20)\d{2}\b")
RE_PMID  = re.compile(r"PMID\s*\d{6,9}", re.I)
RE_NUM   = re.compile(r"\d")          # tem número → é afirmação quantitativa
RE_CAPS  = re.compile(r"\b[A-ZÁÂÃÉÊÍÓÔÕÚÇ]{2,}\b")


def blocos(linhas):
    """Retorna [(nlinha, slide, tipo, [linhas_do_bloco])] p/ TEXTO e CONCLUSÃO.
    Analisa SÓ o conteúdo que vai ao slide — nunca as meta-instruções entre
    parênteses do cabeçalho (ex.: 'destaque GRANDE — é a ÚLTIMA informação')."""
    out, slide = [], "?"
    i = 0
    while i < len(linhas):
        s = linhas[i]
        m = re.match(r"^##+\s*SLIDE(?:-RESERVA)?\s+(\S+)",s)
        if m:
            slide = m.group(1)
        if s.lstrip().startswith("**TEXTO DO SLIDE"):
            j = i + 1; buf = []
            while j < len(linhas) and not linhas[j].lstrip().startswith(("**CONCLUSÃO","**ROTEIRO","**BASE","## ","# ")):
                # só bullets de conteúdo; ignora linhas em branco e cabeçalho
                if linhas[j].lstrip().startswith(("-", "*")):
                    buf.append((j + 1, linhas[j]))
                j += 1
            out.append((i + 1, slide, "TEXTO", buf)); i = j; continue
        if s.lstrip().startswith("**CONCLUSÃO DO SLIDE"):
            # a conclusão REAL é o texto após o fecho da instrução '):**'
            real = s.split("):**", 1)[1] if "):**" in s else ""
            out.append((i + 1, slide, "CONCLUSÃO", [(i + 1, real)]))
        i += 1
    return out


def eh_fonte(txt):
    return bool(RE_PMID.search(txt) or RE_ANO.search(txt))


RE_PMID_NUM = re.compile(r"PMID\s*(\d{6,9})", re.I)


def pmids_por_slide(linhas):
    """Mapa slide -> conjunto de PMIDs presentes na BASE DE EVIDÊNCIA do slide.
    Serve para checar CASAMENTO: um PMID colado no tópico do slide TEM de existir
    na base daquele mesmo slide (senão o casamento número→fonte é suspeito)."""
    base, texto, slide, em_base = {}, {}, None, False
    for ln in linhas:
        m = re.match(r"^##+\s*SLIDE(?:-RESERVA)?\s+(\S+)",ln)
        if m:
            slide = m.group(1); base.setdefault(slide, set()); texto.setdefault(slide, set()); em_base = False
            continue
        if re.match(r"^#\s|^# (ATO|APÊNDICE|ABERTURA|SLIDES-RESERVA|NOTAS)", ln):
            slide = None
        if slide is None:
            continue
        if ln.lstrip().startswith("**BASE DE EVIDÊNCIA"):
            em_base = True
        for pm in RE_PMID_NUM.findall(ln):
            (base[slide] if em_base else texto[slide]).add(pm)
    return base, texto


def main():
    caminho = sys.argv[1] if len(sys.argv) > 1 else os.path.join(
        os.path.dirname(os.path.abspath(__file__)), "CAPITULO.md")
    if not os.path.exists(caminho):
        print("ERRO: não achei", caminho); return 2
    linhas = open(caminho, encoding="utf-8").read().split("\n")

    erros, avisos = [], []
    for _, slide, tipo, buf in blocos(linhas):
        # regra 5: afirmação com número precisa de fonte junto (própria linha ou a seguinte)
        for k, (nl, ln) in enumerate(buf):
            t = ln.strip()
            if not t.startswith("-"):
                continue
            if RE_NUM.search(t) and not eh_fonte(t):
                prox = buf[k + 1][1] if k + 1 < len(buf) else ""
                if not (eh_fonte(prox) and not prox.strip().startswith("-")):
                    erros.append((nl, slide, "AFIRMAÇÃO C/ NÚMERO SEM REFERÊNCIA", t[:90]))
        # regras 1–4 em todo o texto do bloco
        for nl, ln in buf:
            raw = ln.strip()
            # linha de CITAÇÃO (*Autor · Revista · ano · PMID*) é metadado de fonte,
            # não prosa do slide — nome de revista (CORR, NEJM) não é ênfase.
            if raw.startswith("*") and (RE_PMID.search(raw) or RE_ANO.search(raw)):
                continue
            t = raw.lstrip("-* ").strip()
            low = t.lower()
            for cap in RE_CAPS.findall(t):
                base = cap.rstrip("S")  # plural de sigla (PROMs, RCTs)
                if cap in SIGLAS_OK or base in SIGLAS_OK or RE_ROMANO.match(cap):
                    continue
                erros.append((nl, slide, "CAIXA-ALTA DE ÊNFASE", cap))
            for termo in BLACKLIST:
                if termo in low:
                    erros.append((nl, slide, "COLOQUIALISMO/EFEITO", f'«{termo}»'))
            if RE_1P.search(low):
                erros.append((nl, slide, "1ª PESSOA", RE_1P.search(low).group()))
            if RE_ELIPSE.search(t):
                avisos.append((nl, slide, "POSSÍVEL ELIPSE-COM-VÍRGULA (calque)", t[:90]))
            mf = RE_FORCA.search(t)
            if mf and not raw.startswith("*"):
                avisos.append((nl, slide, "PALAVRA DE FORÇA — confrontar com a frase exata do abstract", f'«{mf.group()}» — {t[:70]}'))

    # CASAMENTO: todo PMID citado no TEXTO DO SLIDE tem de existir na BASE do mesmo slide
    base_pm, texto_pm = pmids_por_slide(linhas)
    for slide, pms in texto_pm.items():
        for pm in pms:
            if pm not in base_pm.get(slide, set()):
                erros.append((0, slide, "PMID DO TÓPICO NÃO ESTÁ NA BASE DO SLIDE (casamento suspeito)", f"PMID {pm}"))

    print("FISCAL DE LINGUAGEM —", os.path.basename(caminho))
    print(f"  bloqueios .... {len(erros)}")
    print(f"  avisos ....... {len(avisos)}")
    for nl, sl, tp, tx in erros:
        print(f"  ⛔ L{nl:>4} [{sl}] {tp}: {tx}")
    for nl, sl, tp, tx in avisos:
        print(f"  ⚠️  L{nl:>4} [{sl}] {tp}: {tx}")
    return 1 if erros else 0


if __name__ == "__main__":
    sys.exit(main())
