package com.enbiz.bo.base.properties;

import java.util.Iterator;
import java.util.Properties;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.enbiz.common.base.Validator;
import com.enbiz.common.base.constant.BaseConstants;

@Configuration
public class DomainsConfig {

    @Autowired
    @Resource(name = "domainConfig")
    private Properties domainConfigProperties;

    public Properties getDomainConfigProperties(){
        return domainConfigProperties;
    }

    public String get(String key) {
        Validator.throwIfEmpty(key, "Config key cannot be either null or empty");
        return domainConfigProperties.getProperty(key);
    }
    
    public String getDomainPrefix(String configKey) {
        if(configKey == null || configKey.isEmpty()){
            return BaseConstants.EMPTY;
        }
        
        String serverName = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest().getServerName();
        Iterator<Object> keys = domainConfigProperties.keySet().iterator();

        String domainPrefix = null;
        
        while (keys.hasNext()) {
            String key = (String) keys.next();
            String value = domainConfigProperties.getProperty(key);
            
            if (value.contains(serverName)) {
                domainPrefix = extractDomainPrefix(key);
                break;
            }
        }
        
        return domainPrefix == null ? BaseConstants.EMPTY : domainPrefix;
    }
    
    private String extractDomainPrefix(String key){
        String domainPrefix = BaseConstants.EMPTY;
        
        int index = key.indexOf(BaseConstants.PERIOD);
        if (index != -1) {
            domainPrefix = key.substring(0, index + 1);
        }
        
        return domainPrefix;
    }
    
}
