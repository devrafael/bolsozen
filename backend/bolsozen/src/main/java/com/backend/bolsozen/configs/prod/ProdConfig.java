package com.backend.bolsozen.configs.prod;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.*;

@Configuration
@Profile("prod")
public class ProdConfig {
    @Bean
    public CommandLineRunner prodRunner() {
        return args -> System.out.println("Running enviroment production");
    }
}