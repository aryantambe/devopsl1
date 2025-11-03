# Use Python image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy project files
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

# Expose port
EXPOSE 5000

# Run the app
CMD ["python", "app.py"]
