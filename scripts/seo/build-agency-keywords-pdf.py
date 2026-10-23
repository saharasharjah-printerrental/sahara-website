"""Builds docs/seo/outreach-drafts/sahara-agency-keywords-2026-10.pdf (keyword brief for the citations/backlinks agency).
Data: GSC API pull docs/seo/gsc-snapshots/api-2026-10-23 (web, 2026-09-23..2026-10-20) and the Semrush exports of 2026-10-23.
Run: python scripts/seo/build-agency-keywords-pdf.py
"""
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether

OUT = "docs/seo/outreach-drafts/sahara-agency-keywords-2026-10.pdf"
GOLD = colors.HexColor("#b8860b")
NAVY = colors.HexColor("#0b1b33")
LIGHT = colors.HexColor("#f3f5f9")

H1 = ParagraphStyle("h1", fontName="Helvetica-Bold", fontSize=20, leading=24, textColor=NAVY, spaceAfter=2)
SUB = ParagraphStyle("sub", fontName="Helvetica", fontSize=9.5, leading=13, textColor=colors.HexColor("#555555"), spaceAfter=8)
H2 = ParagraphStyle("h2", fontName="Helvetica-Bold", fontSize=12.5, leading=16, textColor=NAVY, spaceBefore=10, spaceAfter=3)
BODY = ParagraphStyle("body", fontName="Helvetica", fontSize=9, leading=12.5, textColor=colors.HexColor("#222222"), spaceAfter=3)
NOTE = ParagraphStyle("note", parent=BODY, fontSize=8, leading=11, textColor=colors.HexColor("#555555"))
CELL = ParagraphStyle("cell", fontName="Helvetica", fontSize=8.3, leading=10.5)
CELLB = ParagraphStyle("cellb", parent=CELL, fontName="Helvetica-Bold", textColor=colors.white)
BUL = ParagraphStyle("bul", parent=BODY, leftIndent=10, bulletIndent=0)


def table(header, rows, widths):
    data = [[Paragraph(h, CELLB) for h in header]] + [[Paragraph(str(c), CELL) for c in r] for r in rows]
    t = Table(data, colWidths=[w * mm for w in widths], repeatRows=1)
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), NAVY),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, LIGHT]),
        ("GRID", (0, 0), (-1, -1), 0.25, colors.HexColor("#d0d4dc")),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("TOPPADDING", (0, 0), (-1, -1), 3), ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
        ("LEFTPADDING", (0, 0), (-1, -1), 4), ("RIGHTPADDING", (0, 0), (-1, -1), 4),
    ]))
    return t


def footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(colors.HexColor("#777777"))
    canvas.drawString(15 * mm, 9 * mm, "Sahara Office Equipments | saharaprinter.com | Keyword brief, October 2026")
    canvas.drawRightString(A4[0] - 15 * mm, 9 * mm, f"Page {doc.page}")
    canvas.restoreState()


S = []
S.append(Paragraph("Keyword brief for citations and backlinks", H1))
S.append(Paragraph("Sahara Office Equipments (saharaprinter.com) &nbsp;|&nbsp; Printer and photocopier rental, repair, AMC, toner, paper shredders and PVC card printers, UAE &nbsp;|&nbsp; October 2026", SUB))

S.append(Paragraph("How to read this brief", H2))
S.append(Paragraph(
    "<b>Impr.</b> and <b>Pos.</b> are what Sahara gets today in Google Search Console (web, 28 days to 20 Oct 2026): impressions and average position. "
    "These show where links will pay off quickest. <b>Volume</b> is monthly search volume from Semrush. "
    "<b>TV</b> = to validate (no volume in our data yet). Link each keyword to the page in the last column, not only the homepage.", BODY))

S.append(Paragraph("1. Core rental, repair and AMC (already ranking, links move these fastest)", H2))
S.append(table(["Keyword", "Impr.", "Pos.", "Link to"], [
    ["printer rental dubai / printer rental in dubai", "282 / 307", "11.4 / 15.6", "/printer-rental-dubai/"],
    ["printer rental / printer rental uae", "325 / 84", "10.0 / 10.5", "/services/printer-rental/"],
    ["printer rental in abu dhabi / printer rental abu dhabi", "191 / 96", "11.1 / 10.2", "/printer-rental-abu-dhabi/"],
    ["photocopier rental in dubai", "134", "13.0", "/photocopier-rental-dubai/"],
    ["printer leasing dubai / printer lease in dubai", "83 / 82", "19.2 / 15.5", "/printer-rental-dubai/"],
    ["printer rental in sharjah", "82", "19.1", "/printer-rental-sharjah/"],
    ["printer repair dubai", "115", "25.5", "/printer-repair-dubai/"],
    ["printer repair sharjah", "82", "11.5", "/printer-repair-sharjah/"],
    ["rent printer / printers for rent / printer for rent", "102 / 94 / 59", "8.9 / 28.1 / 13.5", "/services/printer-rental/"],
    ["laser printer rental / photocopy machine rental / rent copier", "75 / 64 / 60", "18.3 / 23.7 / 17.4", "/services/printer-rental/"],
    ["photocopier rental sharjah, printer AMC dubai, copier lease uae, office equipment rental uae", "TV", "TV", "/photocopier-rental-sharjah/, /services/amc/"],
], [88, 24, 28, 40]))

S.append(Paragraph("2. Paper shredders (rental and sales)", H2))
S.append(Paragraph(
    "Semrush sizes the shredder cluster at about <b>1.0k searches/month</b> (industrial paper shredder machine), "
    "<b>590</b> for 'paper shredder' and <b>240</b> for 'paper shredder rental'. Sahara already ranks for the rental terms "
    "(position 1 to 3) and is on page 2 for the generic and Dubai machine terms, so links to the two shredder pages should lift them.", BODY))
S.append(table(["Keyword", "Impr.", "Pos.", "Link to"], [
    ["shredder rental / shredder for rent / paper shredder rental", "8 / 6 / 20", "2.9 / 1.3 / 19.6", "/services/paper-shredder-rental/"],
    ["paper shredder / paper shredders", "36 / 29", "21.3 / 17.0", "/services/paper-shredder-sales/"],
    ["paper shredder machine / shredding machine / shredder machine", "28 / 31 / 8", "15.0 / 9.7 / 20.6", "/services/paper-shredder-sales/"],
    ["industrial paper shredder machine", "Vol. 1.0k cluster", "-", "/services/paper-shredder-rental/"],
    ["paper shredder dubai / paper shredder machine dubai / shredders dubai", "20 / 20 / 18", "16.3 / 14.3 / 16.5", "/services/paper-shredder-sales/"],
    ["shredders for offices in dubai", "23", "16.2", "/services/paper-shredder-sales/"],
    ["buy paper shredder", "8", "14.9", "/services/paper-shredder-sales/"],
    ["fellowes shredders dubai / fellowes shredder", "15 / 13", "14.1 / 33.4", "/brands/fellowes/"],
    ["rexel paper shredder dubai / rexel shredders dubai", "7 / 7", "30.1 / 38.3", "/services/paper-shredder-sales/"],
    ["shredder services in sharjah", "13", "8.5", "/services/paper-shredder-rental/"],
], [88, 24, 28, 40]))
S.append(Paragraph("Confirm with Sahara before targeting: 'document shredding services', 'mobile shredding services near me', 'scrap shredder services'. These ask for a shredding service, not a machine.", NOTE))

S.append(Paragraph("3. PVC / ID card printers (sales, rental and card printing)", H2))
S.append(Paragraph(
    "Semrush: <b>110</b> searches/month for 'pvc card printer', and the Bravo card printer page is tracked at position 24 (about 90/month for the brand search). "
    "Sahara is page 1 to 2 for the brand and distributor terms and far down (position 35 to 48) for the generic machine and supplier terms. These are the best link targets here.", BODY))
S.append(table(["Keyword", "Impr.", "Pos.", "Link to"], [
    ["pvc card printer / pvc printer", "36 / 8", "13.0 / 10.3", "/services/pvc-card-printing-services/"],
    ["pvc card printing machine", "54", "47.7", "/services/pvc-card-printing-services/"],
    ["id card printer uae / id card printer supplier uae", "4 / 5", "14.0 / 36.4", "/services/pvc-card-printing-services/"],
    ["id card printing machine suppliers in uae / in dubai", "7 / 4", "34.7 / 36.3", "/services/pvc-card-printing-services/"],
    ["card printer supplier uae / card printer supplier middle east", "6 / 3", "28.3 / 36.3", "/services/pvc-card-printing-services/"],
    ["plastic card printers / retransfer card printer technology", "4 / 6", "39.0 / 11.2", "/services/pvc-card-printing-services/"],
    ["pvc card printing dubai / custom plastic card manufacturing dubai", "5 / 5", "36.2 / 34.2", "/services/pvc-card-printing-services/"],
    ["bravo authorized distributor / authorized bravo distributors in dubai", "11 / 12", "10.5 / 7.9", "/bravo-card-printers-uae/"],
    ["bravo id card printers / bravo printer / uae bravo", "13 / 11 / Vol. 90", "18.0 / 17.6 / 24", "/bravo-card-printers-uae/"],
    ["zebra printer rental / zebra card printer rental / rent zebra printer", "28 / 25 / 23", "28.8 / 22.3 / 40.7", "/services/pvc-card-printer-rental/"],
    ["badge printer rental", "25", "14.8", "/services/pvc-card-printer-rental/"],
], [88, 24, 28, 40]))

S.append(Paragraph("4. Printer brands, toner and service (lower difficulty gaps)", H2))
S.append(table(["Keyword", "Volume", "Difficulty", "Link to"], [
    ["toner cartridge / printer toner", "590 / 260", "12 / 19", "/services/printer-spare-parts/"],
    ["canon printer repair near me / canon service center dubai", "560 cluster / 140", "-", "/services/repair/, /canon-printer-repair/"],
    ["fax machine service near me", "460 cluster", "-", "/printer-repair-dubai/"],
    ["hp service center (near me) / hp printer service center", "320 / 170", "19-22 / 20", "/hp-printer-repair/"],
    ["plotter", "480", "26", "/services/plotter-maintenance/"],
    ["ricoh printer", "210", "26", "/brands/ricoh/"],
    ["printer repair", "140", "12", "/services/repair/"],
    ["color laser printer all in one", "390", "24", "/products/"],
], [88, 30, 22, 40]))

S.append(Paragraph("5. Branded citations (name, address, phone listings)", H2))
S.append(Paragraph("Business name: <b>Sahara Office Equipments</b>. Brand search: 'Sahara Printer'. Use exactly the same name, address and phone (+971) on every listing, matching our Google Business Profile.", BODY))

S.append(Paragraph("6. Do not target", H2))
S.append(Paragraph("print shop near me, t-shirt or shirt printing, stamp maker, computer repair, digital agency, gift printing, photocopy shop near me. Sahara does not offer these.", BODY))

S.append(Paragraph("7. Rules for the agency", H2))
for b in [
    "Most anchors should be the brand name or the bare URL. Exact-match keyword anchors stay under 15%.",
    "Use UAE-relevant directories, chambers of commerce, supplier and industry listings first. No private blog networks, comment spam or bulk directory submissions.",
    "Link to the deep page named in the tables, not only the homepage. Use natural variations of the keywords.",
    "Do not use competitor names as anchors.",
    "Send a weekly list of live links: URL, anchor text, date, and the page it points to.",
]:
    S.append(Paragraph(b, BUL, bulletText="•"))

S.append(Spacer(1, 6))
S.append(Paragraph("Sources: Google Search Console API (property saharaprinter.com, web search, 23 Sep to 20 Oct 2026); Semrush exports dated 23 Oct 2026. Impressions are Sahara's current visibility, not total market demand.", NOTE))

doc = SimpleDocTemplate(OUT, pagesize=A4, leftMargin=15 * mm, rightMargin=15 * mm, topMargin=14 * mm, bottomMargin=16 * mm,
                        title="Sahara keyword brief - October 2026", author="Sahara Office Equipments")
doc.build(S, onFirstPage=footer, onLaterPages=footer)
print("wrote", OUT)
