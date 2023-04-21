package com.enbiz.bo.base.config;

import org.apache.ibatis.plugin.Interceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.enbiz.bo.base.masking.MybatisMaskingInterceptor;

@Configuration
public class MyBatisConfig {
//	@Bean
//	public Interceptor mybatisLogInterceptor() {
//		return new MybatisLogInterceptor();
//	}
	
	/**
	  * Desensitization blocker
	*
	 * @return {@link Interceptor}
	 */
	@Bean
	public Interceptor resultInterceptor() {
		 return new MybatisMaskingInterceptor();
	}
	
//	/**
//	 * 암호화
//	 * @return
//	 */
//	@Bean
//	public Interceptor encryptInterceptor() {
//		 return new MybatisEncryptInterceptor();
//	}

}
