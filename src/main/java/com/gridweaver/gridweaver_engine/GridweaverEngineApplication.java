package com.gridweaver.gridweaver_engine;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.TimeZone;
@SpringBootApplication
public class GridweaverEngineApplication {



	public static void main(String[] args) {


		TimeZone.setDefault(TimeZone.getTimeZone("Asia/Kolkata"));

		System.out.println("=================================");
		System.out.println("JVM TIMEZONE = " + TimeZone.getDefault().getID());
		System.out.println("=================================");

		SpringApplication.run(GridweaverEngineApplication.class, args);
	}

}
