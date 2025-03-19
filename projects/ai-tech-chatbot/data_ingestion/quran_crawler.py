import re

import requests
from bs4 import BeautifulSoup
import json
from tqdm import tqdm
import time

BASE_URL = "https://quran.com"

HEADERS = {
    "User-Agent": "Mozilla/5.0"
}


def get_surah_info(surah_number):
    """Scrape Surah details like name, meaning, revelation type, and ayah count."""
    url = f"{BASE_URL}/surah/{surah_number}/info"
    response = requests.get(url, headers=HEADERS)

    if response.status_code != 200:
        print(f"⚠️ Failed to fetch Surah {surah_number} info")
        return {}

    soup = BeautifulSoup(response.text, "html.parser")

    basic = {}

    try:
        basic["surah_name"] = soup.find("div", class_=re.compile(r"Info_surahName__.*")).text.strip()

        detail_headers = soup.find_all("p", class_=re.compile(r"Info_detailHeader__.*"))
        for detail_header in detail_headers:
            if 'Ayahs' in detail_header:
                basic["ayah_count"] = detail_header.find_next_sibling('p').text.strip()
            elif 'Revelation Place' in detail_header:
                basic["revelation_place"] = detail_header.find_next_sibling('p').text.strip()

        basic["description"] = "".join(
            [str(content) for content in soup.find('div', class_=re.compile(r"Info_textBody__.*")).contents])

        return basic
    except Exception as ex:
        print(ex)
        return {}


def get_surah_ayahs(surah_number):
    """Scrape Ayahs from a given Surah page."""
    url = f"{BASE_URL}/{surah_number}"
    response = requests.get(url, headers=HEADERS)

    if response.status_code != 200:
        print(f"⚠️ Failed to fetch Surah {surah_number}")
        return []

    soup = BeautifulSoup(response.text, "html.parser")

    json_data = json.loads(soup.find('script', id='__NEXT_DATA__').text.strip())
    props =  json_data["props"]["pageProps"]
    # chapter = props["chapterResponse"]
    verses = props["versesResponse"]["verses"]

    ayahs_data = []
    for verse in verses:
        ayahs_data.append({
            "ayah_number": verse["verseKey"],
            "arabic_text": verse["textUthmani"],
            "en_text": "".join([translation["text"] for translation in verse["translations"]]),
        })
    return ayahs_data


def crawl_quran():
    """Crawl all 114 Surahs (info + Ayahs) and save them in JSON."""
    quran_data = []

    for surah_number in tqdm(range(1, 115), desc="Crawling Quran"):
        surah_info = get_surah_info(surah_number)
        ayahs = get_surah_ayahs(surah_number)

        if surah_info and ayahs:
            # quran_data[surah_info["surah_name"]] = {
            #     **surah_info,
            #     "ayahs": ayahs
            # }
            quran_data.append({**surah_info, "ayahs": ayahs})

    # Save to JSON
    with open("../rag_datasets/quran_data.json", "w", encoding="utf-8") as f:
        json.dump(quran_data, f, ensure_ascii=False, indent=4)

    print("✅ Quran data saved successfully!")


# Run the crawler
crawl_quran()
# get_surah_info(1)
# get_surah_ayahs(1)
