from flask import Flask
import random
import time

app = Flask(__name__)

@app.route('/')
def home():
    
    time.sleep(random.uniform(0.1, 1.0))
    return "Welcome to Social Media App! 🌐"

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
