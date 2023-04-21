package com.enbiz.bo.app.dto.response.realgrid;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.ISO8601DateFormat;

public class RealGridListResponse implements Serializable {
    private static final Logger LOGGER = LoggerFactory.getLogger(RealGridListResponse.class);

    private static final long serialVersionUID = 7766960169483530770L;
    
    private int totalCount;
    private List<?> payloads;

    public RealGridListResponse(){
        this(new ArrayList<Object>(), 0);
    }
    
    public RealGridListResponse(List<?> payloads, int totalCount){
        this.payloads = payloads;
        this.totalCount = totalCount;
    }

    public int getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
    }

    public List<?> getPayloads() {
        return payloads;
    }

    public void setPayloads(List<?> payloads) {
        this.payloads = payloads;
    }
    
    public String toJsonString(){
        ObjectMapper mapper = new ObjectMapper();
        mapper.setDateFormat(new ISO8601DateFormat());
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        
        String result = "{'totalCount':'0', 'payloads':[]}";
        try{
            result = mapper.writeValueAsString(this);
        }catch(Exception e){
            LOGGER.trace(e.getMessage(), e);
        }
        return result;
    }
    
    public static RealGridListResponse build(){
        return new RealGridListResponse();
    }
    
    public RealGridListResponse totalCount(int totalCount){
        this.totalCount = totalCount;
        return this;
    }
    
    public RealGridListResponse payloads(List<?> payloads){
        this.payloads = payloads;
        return this;
    }
}
