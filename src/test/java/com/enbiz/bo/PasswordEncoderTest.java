package com.enbiz.bo;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@SpringBootTest()
@TestPropertySource(properties = {
	    "spring.profiles.active=local"
	})
class PasswordEncoderTest {
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Test
	void test() {
		String passwd = "admin";
		
		String encPassword = passwordEncoder.encode(passwd);
		
		log.info("encPassword: {}", encPassword);
	}

}
