# Build the Spring Boot application
./mvnw clean package -DskipTests

# Build and run the containers
# (from the springbootapp_docker_a5 directory)
docker-compose up --build
