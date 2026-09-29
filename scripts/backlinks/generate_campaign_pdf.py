from __future__ import annotations

import re
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import cm
from reportlab.platypus import (
    PageBreak,
    Paragraph,
    Preformatted,
    SimpleDocTemplate,
    Spacer,
)


ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "docs" / "seo" / "sahara-backlink-campaign-2026-09.pdf"

SOURCES = [
    ("30-Day Backlink Campaign", ROOT / "docs/seo/backlink-campaign-30-day-2026-09.md"),
    ("Relationship Outreach Drafts", ROOT / "docs/seo/outreach-drafts/relationship-link-requests.md"),
    ("Free Listing Copy Pack", ROOT / "docs/seo/listing-copy-free-citations-2026-09.md"),
    ("Publisher Pitches", ROOT / "docs/seo/outreach-drafts/publisher-pitches-cost-guide.md"),
    ("Printer Rental vs Buying Cost Guide", ROOT / "docs/seo/blog-drafts/printer-rental-vs-buying-uae-2026-cost-breakdown.md"),
    ("Bravo Dealer Listing Request", ROOT / "docs/seo/bravo-dealer-link-request.md"),
]


def escape(text: str) -> str:
    return (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )


def inline_markdown(text: str) -> str:
    text = escape(text)
    text = re.sub(r"\*\*(.*?)\*\*", r"<b>\1</b>", text)
    text = re.sub(r"`([^`]+)`", r"<font name='Courier'>\1</font>", text)
    text = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r"\1 (\2)", text)
    return text


def add_markdown(story: list, text: str, styles: dict) -> None:
    in_code = False
    code_lines: list[str] = []
    list_lines: list[str] = []
    table_lines: list[str] = []

    def flush_list() -> None:
        nonlocal list_lines
        for item in list_lines:
            story.append(Paragraph(inline_markdown(item), styles["Bulletish"]))
        if list_lines:
            story.append(Spacer(1, 0.12 * cm))
        list_lines = []

    def flush_table() -> None:
        nonlocal table_lines
        if table_lines:
            story.append(Preformatted("\n".join(table_lines), styles["Code"]))
            story.append(Spacer(1, 0.18 * cm))
        table_lines = []

    for raw_line in text.splitlines():
        line = raw_line.rstrip()

        if line.startswith("```"):
            if in_code:
                story.append(Preformatted("\n".join(code_lines), styles["Code"]))
                story.append(Spacer(1, 0.18 * cm))
                code_lines = []
                in_code = False
            else:
                flush_list()
                flush_table()
                in_code = True
            continue

        if in_code:
            code_lines.append(line)
            continue

        if not line:
            flush_list()
            flush_table()
            continue

        if line.startswith("|"):
            flush_list()
            table_lines.append(line)
            continue

        flush_table()

        if line.startswith("# "):
            flush_list()
            story.append(Paragraph(inline_markdown(line[2:]), styles["Heading1"]))
            story.append(Spacer(1, 0.16 * cm))
        elif line.startswith("## "):
            flush_list()
            story.append(Paragraph(inline_markdown(line[3:]), styles["Heading2"]))
            story.append(Spacer(1, 0.12 * cm))
        elif line.startswith("### "):
            flush_list()
            story.append(Paragraph(inline_markdown(line[4:]), styles["Heading3"]))
            story.append(Spacer(1, 0.08 * cm))
        elif line.startswith("- "):
            list_lines.append(f"• {line[2:]}")
        elif re.match(r"^\d+\.\s+", line):
            list_lines.append(line)
        elif line == "---":
            flush_list()
            story.append(Spacer(1, 0.25 * cm))
        else:
            flush_list()
            story.append(Paragraph(inline_markdown(line), styles["Body"]))
            story.append(Spacer(1, 0.08 * cm))

    flush_list()
    flush_table()
    if in_code and code_lines:
        story.append(Preformatted("\n".join(code_lines), styles["Code"]))


def footer(canvas, doc) -> None:
    canvas.saveState()
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(colors.HexColor("#666666"))
    canvas.drawString(1.6 * cm, 1.05 * cm, "Sahara Office Equipments - Backlink Campaign Pack")
    canvas.drawRightString(19.4 * cm, 1.05 * cm, f"Page {doc.page}")
    canvas.restoreState()


def build() -> None:
    base = getSampleStyleSheet()
    styles = {
        "Title": ParagraphStyle(
            "Title",
            parent=base["Title"],
            fontName="Helvetica-Bold",
            fontSize=24,
            leading=30,
            alignment=TA_CENTER,
            textColor=colors.HexColor("#17324D"),
            spaceAfter=18,
        ),
        "Subtitle": ParagraphStyle(
            "Subtitle",
            parent=base["BodyText"],
            fontSize=11,
            leading=16,
            alignment=TA_CENTER,
            textColor=colors.HexColor("#555555"),
        ),
        "Heading1": ParagraphStyle(
            "Heading1",
            parent=base["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=18,
            leading=23,
            textColor=colors.HexColor("#17324D"),
            spaceBefore=8,
        ),
        "Heading2": ParagraphStyle(
            "Heading2",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=14,
            leading=18,
            textColor=colors.HexColor("#1F5E7A"),
            spaceBefore=6,
        ),
        "Heading3": ParagraphStyle(
            "Heading3",
            parent=base["Heading3"],
            fontName="Helvetica-Bold",
            fontSize=11,
            leading=15,
            textColor=colors.HexColor("#17324D"),
        ),
        "Body": ParagraphStyle(
            "Body",
            parent=base["BodyText"],
            fontSize=9.5,
            leading=13,
        ),
        "Bulletish": ParagraphStyle(
            "Bulletish",
            parent=base["BodyText"],
            leftIndent=0.4 * cm,
            firstLineIndent=-0.25 * cm,
            fontSize=9.3,
            leading=13,
        ),
        "Code": ParagraphStyle(
            "Code",
            parent=base["Code"],
            fontName="Courier",
            fontSize=6.6,
            leading=8,
            backColor=colors.HexColor("#F5F7FA"),
            borderPadding=4,
        ),
    }

    story: list = [
        Spacer(1, 3.2 * cm),
        Paragraph("Sahara Backlink Campaign Pack", styles["Title"]),
        Paragraph("30-day free inbound-link execution pack, outreach drafts, listing copy, and resource guide", styles["Subtitle"]),
        Spacer(1, 0.8 * cm),
        Paragraph("Prepared for Sahara Office Equipments", styles["Subtitle"]),
        Paragraph("September 2026", styles["Subtitle"]),
        PageBreak(),
    ]

    for idx, (title, path) in enumerate(SOURCES):
        story.append(Paragraph(title, styles["Heading1"]))
        story.append(Spacer(1, 0.2 * cm))
        add_markdown(story, path.read_text(encoding="utf-8"), styles)
        if idx != len(SOURCES) - 1:
            story.append(PageBreak())

    doc = SimpleDocTemplate(
        str(OUT),
        pagesize=A4,
        rightMargin=1.5 * cm,
        leftMargin=1.5 * cm,
        topMargin=1.6 * cm,
        bottomMargin=1.6 * cm,
        title="Sahara Backlink Campaign Pack",
        author="Sahara Office Equipments",
    )
    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    print(OUT)


if __name__ == "__main__":
    build()
