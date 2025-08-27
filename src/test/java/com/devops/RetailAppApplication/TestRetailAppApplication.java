package com.devops.RetailAppApplication;

import org.springframework.boot.SpringApplication;

public class TestRetailAppApplication {

	public static void main(String[] args) {
		SpringApplication.from(RetailAppApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
