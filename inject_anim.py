#!/usr/bin/env python3
# Injeta animacao "Aparecer ao clique" em TODO shape marcado por build_pptx.js
# (objectName = "anim_N", em ordem de clique). Generico: funciona pra qualquer numero de slides.
# Manipulacao de STRING no XML (nao re-serializa) -> nao corrompe namespaces do OOXML.
import re, sys, zipfile, shutil, os, tempfile

PPTX = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), "deck.pptx")

def spids_em_ordem(xml):
    """Acha o cNvPr id de todo elemento (texto/forma <p:sp> OU imagem <p:pic>) marcado com
    name="anim_N" pelo gerador, e devolve na ordem N=1,2,3... (a ordem dos cliques), nao a
    ordem em que aparecem no XML."""
    out = [(int(n.split("_")[1]), i) for i, n in re.findall(r'<p:cNvPr id="(\d+)" name="(anim_\d+)"', xml)]
    out.sort(key=lambda t: t[0])
    return [spid for _, spid in out]

def click_par(a, b, c, d, grp, spid):
    return (f'<p:par><p:cTn id="{a}" fill="hold"><p:stCondLst><p:cond delay="indefinite"/></p:stCondLst>'
            f'<p:childTnLst><p:par><p:cTn id="{b}" fill="hold"><p:stCondLst><p:cond delay="0"/></p:stCondLst>'
            f'<p:childTnLst><p:par><p:cTn id="{c}" presetID="1" presetClass="entr" presetSubtype="0" fill="hold" '
            f'grpId="{grp}" nodeType="clickEffect"><p:stCondLst><p:cond delay="0"/></p:stCondLst>'
            f'<p:childTnLst><p:set><p:cBhvr><p:cTn id="{d}" dur="1" fill="hold"/><p:tgtEl><p:spTgt spid="{spid}"/></p:tgtEl>'
            f'<p:attrNameLst><p:attrName>style.visibility</p:attrName></p:attrNameLst></p:cBhvr>'
            f'<p:to><p:strVal val="visible"/></p:to></p:set></p:childTnLst></p:cTn></p:par></p:childTnLst></p:cTn>'
            f'</p:par></p:childTnLst></p:cTn></p:par>')

def build_timing(spids):
    seq, cid = [], 3
    for k, spid in enumerate(spids):
        seq.append(click_par(cid, cid+1, cid+2, cid+3, k, spid))
        cid += 4
    body = "".join(seq)
    return ('<p:timing><p:tnLst><p:par><p:cTn id="1" dur="indefinite" restart="never" nodeType="tmRoot">'
            '<p:childTnLst><p:seq concurrent="1" nextAc="seek"><p:cTn id="2" dur="indefinite" nodeType="mainSeq">'
            f'<p:childTnLst>{body}</p:childTnLst></p:cTn>'
            '<p:prevCondLst><p:cond evt="onPrev" delay="0"><p:tgtEl><p:sldTgt/></p:tgtEl></p:cond></p:prevCondLst>'
            '<p:nextCondLst><p:cond evt="onNext" delay="0"><p:tgtEl><p:sldTgt/></p:tgtEl></p:cond></p:nextCondLst>'
            '</p:seq></p:childTnLst></p:cTn></p:par></p:tnLst></p:timing>')

tmp = tempfile.mkdtemp()
with zipfile.ZipFile(PPTX) as z:
    names = z.namelist()
    z.extractall(tmp)

slide_files = sorted(
    (n for n in names if re.match(r"ppt/slides/slide\d+\.xml$", n)),
    key=lambda n: int(re.search(r"slide(\d+)\.xml", n).group(1))
)

total_animados = 0
for slide in slide_files:
    fp = os.path.join(tmp, slide)
    xml = open(fp, encoding="utf-8").read()
    if "<p:timing>" in xml:
        continue
    spids = spids_em_ordem(xml)
    if not spids:
        continue
    xml = xml.replace("</p:sld>", build_timing(spids) + "</p:sld>")
    open(fp, "w", encoding="utf-8").write(xml)
    total_animados += len(spids)
    print(f"[ok] {slide}: {len(spids)} cliques")

out = PPTX
if os.path.exists(out):
    os.remove(out)
with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
    for name in names:
        z.write(os.path.join(tmp, name), name)
shutil.rmtree(tmp)
print(f"PPTX regravado com animação: {out} ({total_animados} blocos no total)")
