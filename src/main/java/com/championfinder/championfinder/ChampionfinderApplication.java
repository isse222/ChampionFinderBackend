package com.championfinder.championfinder;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackageClasses = WebConfig.class)
public class
 ChampionfinderApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChampionfinderApplication.class, args);
		System.out.println("Champion  BackEnd.");
	}
}
