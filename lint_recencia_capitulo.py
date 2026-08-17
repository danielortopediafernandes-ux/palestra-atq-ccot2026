#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
lint_recencia_capitulo.py — FISCAL DE RECÊNCIA do CAPITULO.md da palestra.

REGRA DO DR. DANIEL (reforçada em 2026-08-17):
  "NÃO trabalhamos com artigos velhos, EXCETO se forem clássicos da literatura
   médica e EXCETO se não houver literatura mais recente. Se algo não é publicado
   há 5 anos: ou já está totalmente estabelecido, ou a questão é insignificante.
   SEMPRE buscar a literatura dos últimos 5 anos e com ALTO FATOR DE IMPACTO.
   Sempre que houver fraqueza metodológica, deixar claro."

Irmão do lint_recencia_fontes.py (marketing, 16/06/2026), adaptado ao formato do
capítulo: cada linha de tabela de EVIDÊNCIAS tem a fonte na última coluna.

POLÍTICA (fail-closed):
  • Fonte com ano >= ANO_ATUAL-5  ................................ PASSA
  • Fonte antiga COM justificativa explícita ..................... PASSA
        formato: `clássico: <razão>`  ou  `sem sucessor: <razão>`
        (a razão precisa ter >= MIN_JUST caracteres — a palavra sozinha NÃO basta,
         era a porta dos fundos do linter antigo)
  • Fonte antiga SEM justificativa ............................... BLOQUEIA
  • Fonte sem ano nenhum ......................................... AVISA

USO:
  python3 lint_recencia_capitulo.py [caminho/CAPITULO.md]
  exit 0 = OK · exit 1 = BLOQUEADO · exit 2 = uso/arquivo
"""
import sys, os, re, datetime

ANO_ATUAL = datetime.datetime.now().year          # REGRA #0 — ano real do sistema
JANELA = 5
LIMIAR = ANO_ATUAL - JANELA                       # 2026-5 = 2021 → >= 2021 é recente
MIN_JUST = 15                                     # mín. de chars da razão

RE_ANO = re.compile(r"\b(19\d{2}|20\d{2})\b")
RE_JUST = re.compile(r"(cl[áa]ssico|sem sucessor)\s*[:·—-]\s*(.{%d,})" % MIN_JUST, re.I)
# linhas de separador de tabela: |---|---|---|
RE_SEP = re.compile(r"^\|[\s:|-]+\|$")
# coortes que o capítulo cita POR DENTRO do consenso ICM 2025 (fonte secundária de 2025)
RE_VIA_ICM = re.compile(r"citado em G\d", re.I)


def unidades(linhas):
    """Mapeia cada índice de linha para a unidade ([0.1], [3.4]...) em que ela está."""
    atual = "(preâmbulo)"
    mapa = []
    for ln in linhas:
        m = re.match(r"^##+\s*(\[[\d.]+\][^\n]*)", ln)
        if m:
            atual = m.group(1).strip()
        mapa.append(atual)
    return mapa


def main():
    caminho = sys.argv[1] if len(sys.argv) > 1 else os.path.join(
        os.path.dirname(os.path.abspath(__file__)), "CAPITULO.md")
    if not os.path.exists(caminho):
        print(f"ERRO: não achei {caminho}")
        return 2

    linhas = open(caminho, encoding="utf-8").read().split("\n")
    mapa = unidades(linhas)

    bloqueios, avisos, justificados, via_icm, ok = [], [], [], [], 0

    for i, ln in enumerate(linhas):
        s = ln.strip()
        # a tabela SÍNTESE final não é tabela de evidências (não tem coluna Fonte)
        if s.startswith("# SÍNTESE"):
            break
        if not s.startswith("|") or RE_SEP.match(s):
            continue
        cols = [c.strip() for c in s.strip("|").split("|")]
        if len(cols) < 3:
            continue
        if cols[0].lower().startswith("evidência") or cols[0].lower().startswith("decisão"):
            continue  # cabeçalho
        fonte = cols[-1]
        # A justificativa é prosa livre e costuma citar anos ("busca 2021-2026 não
        # achou..."). Se extrairmos o ano dela, o fiscal se engana com o próprio
        # texto que está julgando. Então: ano SÓ da parte anterior à justificativa.
        m_just = RE_JUST.search(fonte)
        fonte_citacao = fonte[:m_just.start()] if m_just else fonte
        anos = [int(a) for a in RE_ANO.findall(fonte_citacao)]
        # PMIDs são números de 8 dígitos — RE_ANO não os pega, mas anos dentro de
        # URLs de PMID não existem, então a extração é segura.
        item = {
            "linha": i + 1,
            "unidade": mapa[i],
            "evidencia": cols[0][:70],
            "fonte": fonte[:110],
            "ano": max(anos) if anos else None,
        }
        if RE_VIA_ICM.search(fonte):
            via_icm.append(item)          # coorte citada dentro do consenso ICM 2025
        elif not anos:
            avisos.append(item)
        elif max(anos) >= LIMIAR:
            ok += 1
        elif m_just:
            justificados.append(item)
        else:
            bloqueios.append(item)

    total = ok + len(bloqueios) + len(justificados) + len(avisos) + len(via_icm)
    print(f"FISCAL DE RECÊNCIA — {os.path.basename(caminho)}")
    print(f"Janela: >= {LIMIAR} (ano atual {ANO_ATUAL} - {JANELA})")
    print(f"Linhas de evidência analisadas: {total}")
    print(f"  recentes (>= {LIMIAR}) ........ {ok}")
    print(f"  via consenso ICM 2025 ........ {len(via_icm)}")
    print(f"  antigas JUSTIFICADAS ......... {len(justificados)}")
    print(f"  antigas SEM justificativa .... {len(bloqueios)}   <-- BLOQUEIA")
    print(f"  sem ano identificável ........ {len(avisos)}   <-- avisa")

    if justificados:
        print("\n--- ANTIGAS JUSTIFICADAS (passam) ---")
        for b in justificados:
            print(f"  L{b['linha']:>4} {b['unidade'][:22]:<22} {b['ano']}  {b['evidencia']}")

    if bloqueios:
        print("\n--- BLOQUEIO: fonte anterior a %d sem justificativa ---" % LIMIAR)
        print("    Corrija com sucessor recente OU anote na coluna Fonte:")
        print("      `· clássico: <por que é fundacional e nada recente o supera>`")
        print("      `· sem sucessor: <o que foi buscado e não existe>`")
        for b in sorted(bloqueios, key=lambda x: x["ano"]):
            print(f"  L{b['linha']:>4} {b['unidade'][:22]:<22} {b['ano']}  {b['evidencia']}")
            print(f"        fonte: {b['fonte']}")

    if avisos:
        print("\n--- AVISO: sem ano identificável na fonte ---")
        for b in avisos:
            print(f"  L{b['linha']:>4} {b['unidade'][:22]:<22} {b['evidencia']}  |  {b['fonte']}")

    return 1 if bloqueios else 0


if __name__ == "__main__":
    sys.exit(main())
