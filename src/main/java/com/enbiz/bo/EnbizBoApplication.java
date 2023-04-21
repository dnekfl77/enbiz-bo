package com.enbiz.bo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
//@SpringBootApplication(exclude= {DataSourceAutoConfiguration.class, MybatisAutoConfiguration.class})
@ComponentScan({"com.enbiz.bo","com.enbiz.common.base"})
// @EnableCaching
public class EnbizBoApplication {

	public static void main(String[] args) {
		SpringApplication.run(EnbizBoApplication.class, args);
	}

}
