FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]


# Build
# docker build -t social-media:latest .

# Test locally
# docker run -d -p 8000:8000 social-media:latest 

# DockerHub
# docker tag social-media:v1 abhi25022004/social-media:v1
# docker push abhi25022004/social-media:v1
