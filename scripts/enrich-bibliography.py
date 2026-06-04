# -*- coding: utf-8 -*-
"""Enrich Lovecraft chronology data with publication, title aliases, links and relationships."""
from __future__ import annotations

import html
import json
import re
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "data" / "works.json"
PUBLISH_URL = "https://www.hplovecraft.com/writings/fiction/publish.aspx"
TEXT_BASE = "https://www.hplovecraft.com/writings/texts/fiction/"
FICTION_BASE = "https://www.hplovecraft.com/writings/fiction/"

ALIASES = {
    "the-alchemist": {"zh": ["炼金术士", "炼金师"], "en": ["The Alchemist"]},
    "the-tomb": {"zh": ["墓地", "古墓", "墓穴"], "en": ["The Tomb"]},
    "dagon": {"zh": ["达贡", "大衮"], "en": ["Dagon"]},
    "polaris": {"zh": ["北极星"], "en": ["Polaris"]},
    "beyond-the-wall-of-sleep": {"zh": ["睡墙之外", "睡眠之墙外"], "en": ["Beyond the Wall of Sleep"]},
    "the-white-ship": {"zh": ["白船", "白色之船"], "en": ["The White Ship"]},
    "the-statement-of-randolph-carter": {"zh": ["伦道夫·卡特的陈述", "兰道夫·卡特的证词"], "en": ["The Statement of Randolph Carter"]},
    "the-doom-that-came-to-sarnath": {"zh": ["降临萨尔纳斯的厄运", "萨尔纳斯的毁灭"], "en": ["The Doom That Came to Sarnath"]},
    "the-cats-of-ulthar": {"zh": ["乌撒的猫", "乌尔塔尔的猫"], "en": ["The Cats of Ulthar"]},
    "the-temple": {"zh": ["神殿", "神庙"], "en": ["The Temple"]},
    "celephais": {"zh": ["塞勒菲斯", "塞勒菲斯城"], "en": ["Celephaïs", "Celephais"]},
    "the-nameless-city": {"zh": ["无名之城", "无名城市"], "en": ["The Nameless City"]},
    "the-outsider": {"zh": ["外来者", "局外人"], "en": ["The Outsider"]},
    "the-music-of-erich-zann": {"zh": ["埃里希·赞恩的音乐", "艾瑞克·赞恩的音乐"], "en": ["The Music of Erich Zann"]},
    "herbert-west-reanimator": {"zh": ["赫伯特·韦斯特，复活者", "赫伯特·韦斯特，起死回生者"], "en": ["Herbert West—Reanimator", "Herbert West: Reanimator"]},
    "the-hound": {"zh": ["猎犬", "猎狗"], "en": ["The Hound"]},
    "the-lurking-fear": {"zh": ["潜伏的恐惧", "潜藏的恐惧"], "en": ["The Lurking Fear"]},
    "the-festival": {"zh": ["节日", "庆典"], "en": ["The Festival"]},
    "under-the-pyramids": {"zh": ["金字塔下", "与法老同囚", "法老囚笼"], "en": ["Under the Pyramids", "Imprisoned with the Pharaohs"]},
    "the-shunned-house": {"zh": ["被弃之屋", "避讳之屋"], "en": ["The Shunned House"]},
    "the-horror-at-red-hook": {"zh": ["红钩区的恐怖", "红钩怪谈"], "en": ["The Horror at Red Hook"]},
    "pickmans-model": {"zh": ["皮克曼的模特", "皮克曼的画模"], "en": ["Pickman's Model", "Pickman’s Model"]},
    "the-call-of-cthulhu": {"zh": ["克苏鲁的呼唤", "克苏鲁之召唤"], "en": ["The Call of Cthulhu"]},
    "the-silver-key": {"zh": ["银钥匙"], "en": ["The Silver Key"]},
    "the-dream-quest-of-unknown-kadath": {"zh": ["梦寻未知卡达斯", "梦寻秘境卡达斯"], "en": ["The Dream-Quest of Unknown Kadath"]},
    "the-colour-out-of-space": {"zh": ["异星之彩", "外太空来的颜色"], "en": ["The Colour Out of Space", "The Color Out of Space"]},
    "the-dunwich-horror": {"zh": ["敦威治恐怖事件", "敦威治恐怖"], "en": ["The Dunwich Horror"]},
    "the-whisperer-in-darkness": {"zh": ["黑暗中的低语", "暗夜呢喃"], "en": ["The Whisperer in Darkness"]},
    "at-the-mountains-of-madness": {"zh": ["疯狂山脉", "在疯狂山脉"], "en": ["At the Mountains of Madness"]},
    "the-shadow-over-innsmouth": {"zh": ["印斯茅斯疑云", "印斯茅斯的阴霾"], "en": ["The Shadow over Innsmouth"]},
    "the-dreams-in-the-witch-house": {"zh": ["女巫屋中之梦", "女巫屋的梦"], "en": ["The Dreams in the Witch House"]},
    "through-the-gates-of-the-silver-key": {"zh": ["穿越银钥匙之门", "银钥匙之门"], "en": ["Through the Gates of the Silver Key"]},
    "the-thing-on-the-doorstep": {"zh": ["门阶上的东西", "门口的怪物"], "en": ["The Thing on the Doorstep"]},
    "the-shadow-out-of-time": {"zh": ["超越时间之影", "时间之外的阴影"], "en": ["The Shadow Out of Time"]},
    "the-haunter-of-the-dark": {"zh": ["黑暗中的猎手", "暗夜幽灵"], "en": ["The Haunter of the Dark"]},
}

COLLABORATORS = {
    "under-the-pyramids": [
        {"name": "Harry Houdini", "role": "commissioned persona", "note": "HPL Archive lists the text as by Lovecraft for Harry Houdini."}
    ],
    "through-the-gates-of-the-silver-key": [
        {"name": "E. Hoffmann Price", "role": "co-author", "note": "HPL Archive lists both authors for this Carter cycle sequel."}
    ],
}

RELATION_TYPES = {
    "dream-cycle": {"label": "梦境循环", "color": "jade"},
    "deep-sea": {"label": "深海神话", "color": "teal"},
    "forbidden-book": {"label": "禁书与档案", "color": "brass"},
    "ancient-city": {"label": "远古城市", "color": "amber"},
    "miskatonic": {"label": "米斯卡塔尼克线索", "color": "blue"},
    "lineage": {"label": "血统与身份", "color": "red"},
    "cosmic-science": {"label": "科学与宇宙深时", "color": "violet"},
    "collaboration": {"label": "合作与署名", "color": "paper"},
    "publication": {"label": "期刊发表脉络", "color": "green"},
}

EDGES = [
    {"source": "the-tomb", "target": "the-statement-of-randolph-carter", "type": "lineage", "label": "墓穴叙事与身份失稳"},
    {"source": "dagon", "target": "the-call-of-cthulhu", "type": "deep-sea", "label": "深海证词通向旧日支配者"},
    {"source": "dagon", "target": "the-shadow-over-innsmouth", "type": "deep-sea", "label": "达贡崇拜与海岸共同体"},
    {"source": "polaris", "target": "the-dream-quest-of-unknown-kadath", "type": "dream-cycle", "label": "梦境地理的早期坐标"},
    {"source": "the-white-ship", "target": "the-dream-quest-of-unknown-kadath", "type": "dream-cycle", "label": "梦境航海扩展为完整国度"},
    {"source": "the-doom-that-came-to-sarnath", "target": "the-cats-of-ulthar", "type": "dream-cycle", "label": "梦境城镇与寓言法则"},
    {"source": "celephais", "target": "the-dream-quest-of-unknown-kadath", "type": "dream-cycle", "label": "梦境城市与卡达斯远行"},
    {"source": "the-nameless-city", "target": "at-the-mountains-of-madness", "type": "ancient-city", "label": "非人城市与深时建筑"},
    {"source": "the-nameless-city", "target": "the-call-of-cthulhu", "type": "ancient-city", "label": "人类之前的文明痕迹"},
    {"source": "the-outsider", "target": "pickmans-model", "type": "lineage", "label": "自我认知转向怪物凝视"},
    {"source": "the-music-of-erich-zann", "target": "the-colour-out-of-space", "type": "cosmic-science", "label": "感官异常成为宇宙入侵证据"},
    {"source": "herbert-west-reanimator", "target": "the-thing-on-the-doorstep", "type": "cosmic-science", "label": "身体与意识可被技术化处理"},
    {"source": "the-hound", "target": "the-festival", "type": "forbidden-book", "label": "禁书收藏与地下仪式"},
    {"source": "the-festival", "target": "the-shadow-over-innsmouth", "type": "lineage", "label": "海岸宗族与非人血统"},
    {"source": "under-the-pyramids", "target": "the-nameless-city", "type": "ancient-city", "label": "地下遗迹与古代尺度"},
    {"source": "under-the-pyramids", "target": "through-the-gates-of-the-silver-key", "type": "collaboration", "label": "特殊署名与合作文本"},
    {"source": "the-shunned-house", "target": "the-dunwich-horror", "type": "lineage", "label": "新英格兰家宅中的遗传恐惧"},
    {"source": "the-horror-at-red-hook", "target": "the-call-of-cthulhu", "type": "forbidden-book", "label": "都市档案与集体证词"},
    {"source": "the-call-of-cthulhu", "target": "the-dunwich-horror", "type": "forbidden-book", "label": "禁书、仪式和旧神姓名"},
    {"source": "the-silver-key", "target": "through-the-gates-of-the-silver-key", "type": "dream-cycle", "label": "银钥匙叙事的直接续篇"},
    {"source": "the-dream-quest-of-unknown-kadath", "target": "the-silver-key", "type": "dream-cycle", "label": "伦道夫·卡特的梦境谱系"},
    {"source": "the-colour-out-of-space", "target": "the-dunwich-horror", "type": "cosmic-science", "label": "乡野空间中的非人力量"},
    {"source": "the-colour-out-of-space", "target": "the-whisperer-in-darkness", "type": "cosmic-science", "label": "乡村调查转向星际证据"},
    {"source": "the-whisperer-in-darkness", "target": "at-the-mountains-of-madness", "type": "cosmic-science", "label": "非人文明从传闻变成考察"},
    {"source": "the-whisperer-in-darkness", "target": "the-shadow-out-of-time", "type": "cosmic-science", "label": "意识、记录与外星文明"},
    {"source": "at-the-mountains-of-madness", "target": "the-shadow-out-of-time", "type": "ancient-city", "label": "深时文明与史前档案"},
    {"source": "the-dreams-in-the-witch-house", "target": "the-dunwich-horror", "type": "miskatonic", "label": "阿卡姆学术圈与仪式数学"},
    {"source": "the-dreams-in-the-witch-house", "target": "the-shadow-out-of-time", "type": "cosmic-science", "label": "数学、梦境和意识转移"},
    {"source": "the-thing-on-the-doorstep", "target": "the-dreams-in-the-witch-house", "type": "miskatonic", "label": "阿卡姆周边的身份侵入"},
    {"source": "the-haunter-of-the-dark", "target": "the-call-of-cthulhu", "type": "forbidden-book", "label": "城市调查中的旧日神秘物"},
    {"source": "the-temple", "target": "at-the-mountains-of-madness", "type": "ancient-city", "label": "非人遗迹由海底延伸至南极"},
    {"source": "the-lurking-fear", "target": "the-shunned-house", "type": "lineage", "label": "家族退化与房屋档案"},
    {"source": "pickmans-model", "target": "the-haunter-of-the-dark", "type": "publication", "label": "Weird Tales 后期视觉恐怖链"},
]


def strip_tags(value: str) -> str:
    value = re.sub(r"<[^>]+>", "", value)
    value = html.unescape(value).replace("\xa0", " ")
    value = re.sub(r"\s+", " ", value)
    return value.strip()


def norm(value: str) -> str:
    value = html.unescape(value)
    value = re.sub(r"<[^>]+>", "", value)
    value = value.replace("—", "-").replace("–", "-").replace("“", '"').replace("”", '"').replace("’", "'").replace("‘", "'")
    return re.sub(r"\s+", " ", value).strip().lower()


def fetch_publication_entries() -> dict[str, dict[str, str]]:
    body = urllib.request.urlopen(PUBLISH_URL, timeout=20).read().decode("utf-8", "replace")
    chunks = re.findall(r"<li>(.*?)(?=<li>|</ul>)", body, flags=re.S | re.I)
    entries = {}
    for chunk in chunks:
        match = re.search(r'^(.*?):\s*<a href="([^"]+)">(.*?)</a>\s*(\(.*?\))?', chunk, flags=re.S)
        if not match:
            continue
        date = strip_tags(match.group(1))
        href = match.group(2)
        title = strip_tags(match.group(3))
        venue_raw = strip_tags(match.group(4) or "")
        venue = venue_raw.strip("()")
        entries[norm(title)] = {"firstPublished": date, "href": href, "venue": venue, "sourceTitle": title}
    return entries


def parse_publication(entry: dict[str, str], publication_year: int) -> dict[str, object]:
    venue = entry.get("venue") or "Publication data pending"
    parts = [part.strip() for part in venue.split(",") if part.strip()]
    venue_name = parts[0] if parts else venue
    issue = ", ".join(parts[1:]) if len(parts) > 1 else ""
    lower = venue_name.lower()
    publication_type = "book" if any(key in lower for key in ["arkham house", "recluse press", "visionary publishing"]) else "periodical"
    return {
        "firstPublished": entry.get("firstPublished", str(publication_year)),
        "publicationYear": publication_year,
        "venue": venue_name,
        "issue": issue,
        "type": publication_type,
        "source": "The H. P. Lovecraft Archive publication order",
    }


def main() -> None:
    data = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    entries = fetch_publication_entries()
    id_to_work = {work["id"]: work for work in data["works"]}

    sources = data.setdefault("meta", {}).setdefault("sources", [])
    source_ids = {source.get("id") for source in sources}
    extra_sources = [
        {
            "id": "hpl-publish",
            "label": "The H. P. Lovecraft Archive: Publication Order",
            "url": PUBLISH_URL,
            "role": "首次发表日期、期刊/书籍与卷期校核",
        },
        {
            "id": "hpl-texts",
            "label": "The H. P. Lovecraft Archive: Electronic Texts",
            "url": "https://www.hplovecraft.com/writings/texts/",
            "role": "逐篇英文全文外链入口",
        },
        {
            "id": "wikisource",
            "label": "Wikisource: H. P. Lovecraft",
            "url": "https://en.wikisource.org/wiki/Author:H._P._Lovecraft",
            "role": "公共领域文本交叉入口，按该站实际收录为准",
        },
    ]
    for source in extra_sources:
        if source["id"] not in source_ids:
            sources.append(source)

    for work in data["works"]:
        entry = entries.get(norm(work["titleEn"]))
        if entry:
            work["publication"] = parse_publication(entry, int(work["publicationYear"]))
            code = entry["href"]
            work["links"] = {
                **work.get("links", {}),
                "hplText": TEXT_BASE + code,
                "hplPublication": FICTION_BASE + code,
            }
            work["fullTextLinks"] = [
                {"label": "H. P. Lovecraft Archive", "url": TEXT_BASE + code, "language": "en"}
            ]
        work["titleAliases"] = ALIASES.get(work["id"], {"zh": [work["titleZh"]], "en": [work["titleEn"]]})
        work["collaborators"] = COLLABORATORS.get(work["id"], [])
        refs = set(work.get("sourceRefs") or [])
        refs.update(["hpl-publish", "hpl-texts"])
        work["sourceRefs"] = [source["id"] for source in sources if source["id"] in refs]
        work["relationships"] = []

    for edge in EDGES:
        if edge["source"] not in id_to_work or edge["target"] not in id_to_work:
            raise SystemExit(f"Invalid edge: {edge}")
        source = id_to_work[edge["source"]]
        target = id_to_work[edge["target"]]
        source["relationships"].append({
            "target": edge["target"], "type": edge["type"], "label": edge["label"], "direction": "out"
        })
        target["relationships"].append({
            "target": edge["source"], "type": edge["type"], "label": edge["label"], "direction": "in"
        })

    data["meta"]["schemaVersion"] = "2026.06.relationship-network"
    data["meta"]["updatedAt"] = "2026-06-04"
    data["network"] = {
        "relationTypes": RELATION_TYPES,
        "edges": EDGES,
        "note": "Curated first-degree network for literary motifs, publication channels and collaboration/credit context."
    }

    DATA_PATH.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({
        "works": len(data["works"]),
        "sources": len(data["meta"]["sources"]),
        "edges": len(EDGES),
        "withPublication": sum(1 for work in data["works"] if "publication" in work),
        "withFullTextLinks": sum(1 for work in data["works"] if work.get("fullTextLinks")),
        "withCollaborators": sum(1 for work in data["works"] if work.get("collaborators")),
    }, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
