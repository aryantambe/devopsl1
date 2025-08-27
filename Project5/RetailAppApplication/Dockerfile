# ---- build stage ----
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app
COPY pom.xml .
COPY src src
# if you generate wrapper later, you can use it; for now we use system Maven inside the image:
RUN apk add --no-cache maven
RUN mvn -B -q -DskipTests dependency:go-offline
RUN mvn -B -q package -DskipTests

# ---- run stage ----
FROM eclipse-temurin:21-jre-alpine
ENV JAVA_OPTS="-XX:MaxRAMPercentage=75.0 -XX:+UseSerialGC"
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
USER 1000
ENTRYPOINT ["sh","-c","java $JAVA_OPTS -jar /app/app.jar"]
