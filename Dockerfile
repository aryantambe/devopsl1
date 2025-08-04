# Use a lightweight OpenJDK image
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy compiled jar into container
COPY target/demo-1.0-SNAPSHOT.jar app.jar

# Run the app
CMD ["java", "-jar", "app.jar"]

