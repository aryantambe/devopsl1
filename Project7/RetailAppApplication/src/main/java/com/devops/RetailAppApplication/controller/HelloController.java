package com.devops.RetailAppApplication.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/")
    public String home() {
        return "Welcome to Retail App";
    }

    @GetMapping("/health")
    public String health() {
        return "OK";
    }
}
