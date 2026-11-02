#!/usr/bin/env python3
"""
render_diagrams.py — Tự động quét Markdown và render Mermaid thành visual diagram HTML/SVG
theo chuẩn phong cách Diagram Design (https://diagramdesign.dev).
"""

import os
import sys
import json
import re
import subprocess
import html
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
SKILL_DIR = REPO_ROOT / "skills" / "diagram-design"
if not SKILL_DIR.exists():
    for fallback in [Path.home() / ".claude" / "skills" / "diagram-design", Path.home() / ".hermes" / "skills" / "diagram-design"]:
        if fallback.exists():
            SKILL_DIR = fallback
            break
MERMAID_EXTRACT = SKILL_DIR / "scripts" / "mermaid_extract.py"
EXPORT_SVG = SKILL_DIR / "scripts" / "export_svg.py"

def escape(text):
    return html.escape(str(text or ''))

def clean_label(text):
    if not text:
        return ""
    # strip quotes, <br/> to newline or space, html entities
    text = re.sub(r'<br\s*/?>', ' ', text)
    text = text.replace('\\"', '"').replace('\\n', ' ')
    return text.strip()

def render_sequence_svg(data, title="Sequence Diagram"):
    """
    Render sequenceDiagram IR thành SVG chuẩn phong cách Diagram Design
    """
    nodes = data.get("nodes", [])
    edges = data.get("edges", [])
    fragments = data.get("fragments", [])
    notes = data.get("notes", [])
    
    if not nodes:
        return None
        
    num_nodes = len(nodes)
    width = max(960, num_nodes * 200 + 100)
    top_y = 120#!/usr/bin/env python3
"""
render_diagrams.py — Tự động quét Markdown và render Mermaid thành visual diagram HTML/SVG
theo chuẩn phong cách Diagram Design (https://diagramdesign.dev).
"""

import os
import sys
import json
import re
import subprocess
import html
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
SKILL_DIR = REPO_ROOT / "skills" / "diagram-design"
if not SKILL_DIR.exists():
    for fallback in [Path.home() / ".claude" / "skills" / "diagram-design", Path.home() / ".hermes" / "skills" / "diagram-design"]:
        if fallback.exists():
            SKILL_DIR = fallback
            break
MERMAID_EXTRACT = SKILL_DIR / "scripts" / "mermaid_extract.py"
EXPORT_SVG = SKILL_DIR / "scripts" / "export_svg.py"

def escape(text):
    return html.escape(str(text or ''))

def clean_label(text):
    if not text:
        return ""