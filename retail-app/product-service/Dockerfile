# Use OpenJDK 21 base image
FROM eclipse-temurin:21-jdk-alpine

# Set working directory
WORKDIR /app

# Copy Maven wrapper & project files
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Copy source code
COPY src ./src

# Package the Spring Boot app (skip tests for speed)
RUN ./mvnw clean package -DskipTests

# Copy the built jar (update name if needed)
COPY target/product-service-0.0.1-SNAPSHOT.jar app.jar

# Expose service port
EXPOSE 8082

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]