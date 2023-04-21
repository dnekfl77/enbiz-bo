package com.enbiz.bo.base.properties;

import javax.annotation.Resource;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import com.enbiz.bo.base.properties.DomainsConfig;

import lombok.extern.slf4j.Slf4j;

@SpringBootTest
@Slf4j
@TestPropertySource(properties = {
	    "spring.profiles.active=local"
	})
class DomainsConfigTest {
	@Resource(name="domainsConfig")
	private DomainsConfig domainsConfig;

	@Test
	void get() {
		String result = domainsConfig.get("domain.baseUrl");
		log.debug("result: {}", result);
	}

}
