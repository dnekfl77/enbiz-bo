package com.enbiz.bo.base.properties;

import java.util.Properties;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import com.enbiz.common.base.Validator;
import com.enbiz.common.base.context.ApplicationContextWrapper;

@Configuration
public class EnvironmentsConfig {
    @Autowired
    @Resource(name = "environmentConfig")
    private Properties properties;

    public EnvironmentsConfig() {

    }

    public String get(String key) {
        Validator.throwIfEmpty(key, "Config key cannot be either null or empty");

        return properties.getProperty(key);
    }

    public static String getStatically(String key){
        Validator.throwIfEmpty(key, "Config key cannot be either null or empty");

        EnvironmentsConfig config = ApplicationContextWrapper.getBean(EnvironmentsConfig.class);
        return config.get(key);
    }

    public Properties getConfigProperties(){
        return properties;
    }
}
