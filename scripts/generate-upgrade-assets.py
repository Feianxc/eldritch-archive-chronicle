from __future__ import annotations

import json
import math
import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
ASSET_DIR = ROOT / "assets"
THUMB_DIR = ASSET_DIR / "work-thumbs"
THUMB_DIR.mkdir(parents=True, exist_ok=True)

SOURCES = [
    ASSET_DIR / "hero-cinematic.png",
    ASSET_DIR / "atlas-wall.png",
    ASSET_DIR / "reading-desk.png",
    ASSET_DIR / "eldritch-bg.png",
]
BASES = [Image.open(src).convert("RGB") for src in SOURCES if src.exists()]
if not BASES:
    raise RuntimeError("No source images available for thumbnail generation")

works = json.loads((ROOT / "data" / "works.json").read_text(encoding="utf-8"))["works"]
W, H = 720, 460
PALETTES = [
    ((12, 46, 45), (213, 166, 91), (44, 205, 188)),
    ((10, 29, 39), (194, 156, 96), (124, 201, 221)),
    ((17, 37, 30), (218, 183, 118), (90, 174, 133)),
    ((24, 25, 33), (205, 154, 81), (167, 129, 216)),
    ((8, 36, 39), (231, 191, 111), (71, 138, 160)),
]


def cover_crop(img: Image.Image, rng: random.Random) -> Image.Image:
    iw, ih = img.size
    scale = max(W / iw, H / ih) * rng.uniform(1.0, 1.22)
    nw, nh = int(iw * scale), int(ih * scale)
    resized = img.resize((nw, nh), Image.Resampling.LANCZOS)
    max_x = max(0, nw - W)
    max_y = max(0, nh - H)
    x = int(max_x * rng.random())
    y = int(max_y * rng.random())
    return resized.crop((x, y, x + W, y + H))


def vignette(size: tuple[int, int], strength: float = 0.82) -> Image.Image:
    vw, vh = size
    mask = Image.new("L", size, 0)
    draw = ImageDraw.Draw(mask)
    for i in range(140):
        alpha = int(255 * (i / 139) ** 1.8)
        inset_x = int(vw * 0.52 * (1 - i / 139))
        inset_y = int(vh * 0.62 * (1 - i / 139))
        draw.ellipse((inset_x, inset_y, vw - inset_x, vh - inset_y), fill=alpha)
    inv = Image.eval(mask, lambda p: int((255 - p) * strength))
    dark = Image.new("RGB", size, (0, 0, 0))
    return Image.composite(dark, Image.new("RGB", size, (0, 0, 0)), inv)


def add_lines(draw: ImageDraw.ImageDraw, rng: random.Random, brass, teal):
    cx, cy = rng.randint(260, 520), rng.randint(145, 300)
    for radius in [70, 118, 165, 218, 282]:
        alpha = rng.randint(42, 92)
        color = (*brass, alpha)
        box = (cx - radius, cy - radius, cx + radius, cy + radius)
        draw.arc(box, start=rng.randint(0, 80), end=rng.randint(190, 355), fill=color, width=1)
    for _ in range(13):
        angle = rng.random() * math.tau
        length = rng.randint(120, 360)
        x1 = cx + math.cos(angle) * rng.randint(16, 80)
        y1 = cy + math.sin(angle) * rng.randint(16, 80)
        x2 = x1 + math.cos(angle + rng.uniform(-0.18, 0.18)) * length
        y2 = y1 + math.sin(angle + rng.uniform(-0.18, 0.18)) * length
        draw.line((x1, y1, x2, y2), fill=(*brass, rng.randint(35, 85)), width=1)
        if rng.random() > 0.45:
            r = rng.randint(3, 7)
            draw.ellipse((x2 - r, y2 - r, x2 + r, y2 + r), outline=(*teal, 115), width=1)


def add_sigil(draw: ImageDraw.ImageDraw, rng: random.Random, brass, accent):
    cx = rng.randint(96, 620)
    cy = rng.randint(84, 360)
    radius = rng.randint(34, 62)
    draw.ellipse((cx-radius, cy-radius, cx+radius, cy+radius), outline=(*brass, 180), width=2)
    draw.ellipse((cx-radius+10, cy-radius+10, cx+radius-10, cy+radius-10), outline=(*brass, 90), width=1)
    for i in range(6):
        a = i * math.tau / 6 + rng.uniform(-0.08, 0.08)
        x = cx + math.cos(a) * radius * .86
        y = cy + math.sin(a) * radius * .86
        draw.line((cx, cy, x, y), fill=(*brass, 95), width=1)
        draw.ellipse((x-4, y-4, x+4, y+4), fill=(*accent, 135))
    # abstract tentacle glyph, intentionally not text
    for i in range(5):
        start = -math.pi/2 + (i-2)*0.22
        pts = []
        for t in range(28):
            k = t / 27
            a = start + math.sin(k*math.pi)*0.7*(i-2)/3
            rr = radius * (0.18 + k*.52)
            pts.append((cx + math.cos(a)*rr, cy + math.sin(a)*rr))
        draw.line(pts, fill=(*brass, 125), width=2)


for idx, work in enumerate(works):
    rng = random.Random(f"eldritch-{work['id']}")
    base = cover_crop(BASES[idx % len(BASES)], rng).convert("RGBA")
    palette = PALETTES[idx % len(PALETTES)]
    bg, brass, teal = palette
    grade = Image.new("RGBA", (W, H), (*bg, 120 + idx % 3 * 18))
    im = Image.alpha_composite(base, grade)
    im = im.filter(ImageFilter.UnsharpMask(radius=1.2, percent=116, threshold=3))

    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay, "RGBA")
    # dark lower panel so code-rendered captions remain readable over images
    draw.rectangle((0, H*0.56, W, H), fill=(0, 0, 0, 92))
    draw.rectangle((0, 0, W, H), outline=(*brass, 110), width=2)
    add_lines(draw, rng, brass, teal)
    add_sigil(draw, rng, brass, teal)
    for _ in range(70):
        x = rng.randint(0, W-1)
        y = rng.randint(0, H-1)
        r = rng.choice([1, 1, 1, 2])
        color = brass if rng.random() > .35 else teal
        draw.ellipse((x-r, y-r, x+r, y+r), fill=(*color, rng.randint(45, 145)))
    # slanted parchment shard
    if rng.random() > .2:
        px, py = rng.randint(40, 520), rng.randint(38, 270)
        shard = [(px, py), (px+rng.randint(80, 150), py+rng.randint(-12, 16)), (px+rng.randint(96, 165), py+rng.randint(34, 75)), (px-rng.randint(12, 28), py+rng.randint(38, 80))]
        draw.polygon(shard, fill=(202, 176, 124, 62), outline=(*brass, 92))
        for line in range(4):
            ly = py + 14 + line*10 + rng.randint(-2, 2)
            draw.line((px+12, ly, px+rng.randint(72, 132), ly+rng.randint(-4, 4)), fill=(43, 30, 20, 92), width=1)

    im = Image.alpha_composite(im, overlay)
    # apply vignette by compositing transparent black gradient manually
    v = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    vd = ImageDraw.Draw(v)
    for s in range(90):
        alpha = int(135 * (s / 90) ** 2)
        vd.rectangle((s, s, W-s, H-s), outline=(0, 0, 0, max(0, 135-alpha)), width=1)
    im = Image.alpha_composite(im, v)
    im.save(THUMB_DIR / f"{work['id']}.png", optimize=True)

print(f"generated {len(works)} thumbnails in {THUMB_DIR}")
