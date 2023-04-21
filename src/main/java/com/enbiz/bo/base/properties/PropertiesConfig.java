package com.enbiz.bo.base.properties;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.PropertiesFactoryBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ClassPathResource;

import lombok.extern.slf4j.Slf4j;

@Configuration
@Slf4j
public class PropertiesConfig {
    @Autowired
    private Environment environment;

	@Bean
	public PropertiesFactoryBean environmentConfig() throws IOException {
		return create("config/" + getCurrentProfile() + "/environment-" + getCurrentProfile() + ".properties");
	}
	
	@Bean
	public PropertiesFactoryBean domainConfig() throws IOException {
		return create("config/" + getCurrentProfile() + "/domain-" + getCurrentProfile() + ".properties");
	}

	@Bean
	public PropertiesFactoryBean interfaceConfig() throws IOException {
		return create("config/" + getCurrentProfile() + "/interface-" + getCurrentProfile() + ".properties");
	}

	private String getCurrentProfile() {
		String[] activeProfiles = environment.getActiveProfiles();
		String[] defaultProfiles = environment.getDefaultProfiles();

		return activeProfiles == null || activeProfiles.length == 0 ? defaultProfiles[0] : activeProfiles[0];
	}

	private static PropertiesFactoryBean create(String path) throws IOException {
		PropertiesFactoryBean bean = new PropertiesFactoryBean();
		bean.setLocation(new ClassPathResource(path));
		bean.afterPropertiesSet();

		log.debug(":::: PropertiesConfig == create ==> {}", path);

		return bean;
	}

}
