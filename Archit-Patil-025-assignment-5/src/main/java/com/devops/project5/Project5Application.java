package com.devops.project5;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
@RestController
public class Project5Application {

    public static void main(String[] args) {
        SpringApplication.run(Project5Application.class, args);
    }

    @GetMapping("/")
    public String home() {
        return "Retail Web App 1 - Running in Docker!";
    }
}
