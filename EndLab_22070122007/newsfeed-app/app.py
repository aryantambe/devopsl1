from flask import Flask, render_template

app = Flask(__name__)

news_items = [
    {"title": "AI Revolutionizes Healthcare", "author": "TechTimes"},
    {"title": "Stock Markets Hit Record Highs", "author": "Finance Daily"},
    {"title": "SpaceX Launches New Mission", "author": "SpaceNews"},
    {"title": "Climate Summit 2025 Begins", "author": "Global Environment"},
    {"title": "India Launches New AI Research Mission", "author": "The Times of India"},
    {"title": "NASA’s Artemis II Mission to Orbit the Moon", "author": "NASA News"},
    {"title": "Breakthrough in Quantum Computing Achieved", "author": "MIT Tech"},
    {"title": "Electric Vehicles Dominate Global Auto Sales", "author": "AutoWorld"},
    {"title": "New Education Policy Emphasizes Skill-Based Learning", "author": "EduToday"},
    {"title": "Open Source Developers Unite for Global Hackathon", "author": "DevPost"},
    {"title": "Breakthrough Drug Offers Hope Against Alzheimer’s", "author": "Medical Journal"},
    {"title": "Major Cyberattack Targets Financial Institutions", "author": "CyberSec Weekly"},
    {"title": "Renewable Energy Investment Surges Worldwide", "author": "Green Future"},
    {"title": "Meta Unveils Advanced VR Headset for Developers", "author": "Tech Insider"},
    {"title": "Local Startups Attract Record Funding in 2025", "author": "StartupBeat"},
]

@app.route("/")
def home():
    return render_template("index.html", news_items=news_items)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
