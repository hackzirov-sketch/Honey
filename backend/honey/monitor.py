from flask import Flask, render_template_string
import os
from datetime import datetime

app = Flask(__name__)

# Chiroyli HTML shabloni
HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="uz">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Honey | Service Monitor</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #FFB300;
            --dark: #1A1A1A;
            --bg: #0F0F10;
        }
        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: var(--bg);
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            overflow: hidden;
        }
        .card {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 3rem;
            border-radius: 24px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.4);
            max-width: 400px;
            width: 90%;
            position: relative;
        }
        .logo {
            font-size: 4rem;
            margin-bottom: 1rem;
        }
        h1 {
            color: var(--primary);
            margin: 0;
            font-size: 2.2rem;
            letter-spacing: -1px;
        }
        p {
            color: #888;
            margin-top: 0.5rem;
        }
        .status {
            display: inline-flex;
            align-items: center;
            background: rgba(0, 255, 127, 0.1);
            color: #00FF7F;
            padding: 8px 16px;
            border-radius: 100px;
            font-size: 0.9rem;
            font-weight: bold;
            margin-top: 1.5rem;
        }
        .dot {
            width: 8px;
            height: 8px;
            background: #00FF7F;
            border-radius: 50%;
            margin-right: 8px;
            box-shadow: 0 0 10px #00FF7F;
            animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.5); opacity: 0.5; }
            100% { transform: scale(1); opacity: 1; }
        }
        .time {
            font-size: 0.8rem;
            color: #444;
            margin-top: 2rem;
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="logo">🍯</div>
        <h1>Honey Full</h1>
        <p>Advanced Ecosystem API</p>
        <div class="status">
            <div class="dot"></div>
            Online & Active
        </div>
        <div class="time">Server Time: {{ time }}</div>
    </div>
</body>
</html>
"""

@app.route('/')
def home():
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    return render_template_string(HTML_TEMPLATE, time=now)

@app.route('/ping')
def ping():
    return {"status": "success", "message": "Pong!"}

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
