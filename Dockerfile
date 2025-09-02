# Use OpenJDK as base image
FROM eclipse-temurin:17-jre-jammy

# Update system packages to reduce vulnerabilities
RUN apt-get update && apt-get upgrade -y && apt-get clean

# Add JAR file from target directory
COPY target/springboot-app-1.0.0.jar app.jar

# Expose application port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
