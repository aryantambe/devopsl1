# Stage 1: Build the app using Maven
FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package

# Stage 2: Run the app using a lightweight Java image
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY --from=build /app/target/maven-demo-1.0-SNAPSHOT.jar app.jar
CMD ["java", "-jar", "app.jar"]
