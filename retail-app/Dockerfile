FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

# Copy the JAR built outside Docker
COPY target/retail-app-0.0.1-SNAPSHOT.jar app.jar

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]
