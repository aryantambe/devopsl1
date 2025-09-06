FROM openjdk:8-jdk-alpine

# Create working directory
WORKDIR /app

# Copy source code and libraries
COPY ./src ./src
COPY ./lib ./lib

# Compile Java files
RUN mkdir bin && javac -cp "lib/*" -d bin src/CloudSimExample.java

# Run the compiled Java program
CMD ["java", "-cp", "bin:lib/*", "CloudSimExample"]