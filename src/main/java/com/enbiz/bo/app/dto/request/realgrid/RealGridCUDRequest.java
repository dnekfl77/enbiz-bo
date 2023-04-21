package com.enbiz.bo.app.dto.request.realgrid;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.enbiz.bo.app.dto.login.CurrentUser;
import com.enbiz.common.base.constant.BaseConstants;
import com.enbiz.common.base.entity.BaseCommonEntity;
import com.enbiz.common.base.util.ObjectMapperUtils;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.ISO8601DateFormat;

public class RealGridCUDRequest<T> {
    public static final String NO_GIVEN_GRID_NAME = "_NO_GIVEN_GRID_NAME_";
    private final List<T> all;
    private final List<T> create;
    private final List<T> update;
    private final List<T> delete;
    
    public RealGridCUDRequest() {
        all = new ArrayList<T>();
        create = new ArrayList<T>();
        update = new ArrayList<T>();
        delete = new ArrayList<T>();
    }
    
    public void addCreate(T o){
        create.add(o);
    }
    
    public void addUpdate(T o){
        update.add(o);
    }
    
    public void addDelete(T o){
        delete.add(o);
    }

    public List<T> getCreate(){
        return create;
    }
    
    public List<T> getUpdate(){
        return update;
    }
    
    public List<T> getDelete(){
        return delete;
    }
    
    public List<T> getAll() {
        return all;
    }

    public static <T> RealGridCUDRequest<T> fromList(List<T> list, CurrentUser currentUser) {
        RealGridCUDRequest<T> r = new RealGridCUDRequest<T>();
        
        for(T t : list){
            if(t == null){
                continue;
            }
            BaseCommonEntity e = (BaseCommonEntity)t;
            if (currentUser != null) {
                e.setSysRegId(currentUser.getLoginId());
                e.setSysModId(currentUser.getLoginId());
            }

            r.all.add(t);
            String state = e.getState();
            if(state != null){
	            switch(e.getState()){
	            case "created" : 
	                r.addCreate(t);
	                break;
	            case "updated" :
	                r.addUpdate(t);
	                break;
	            case "deleted" :
	                r.addDelete(t);
	                break;
	            default :
	              //no such case
	                break;
	            }
            }
        }
        
        return r;
    }

    @Override
    public String toString() {
        StringBuilder builder = new StringBuilder();
        builder.append("RealGridCUD [create=").append(create).append(", update=").append(update).append(", delete=")
                .append(delete).append("]");
        return builder.toString();
    }

    public static <T> RealGridCUDRequest<T> fromJsonNode(String gridName, Class<T> clazz, JsonNode json,
            CurrentUser currentUser) {
        
        gridName = getGridName(gridName, json);
        JsonNode cudList = json.get(gridName);
        List<T> result = convertJsonArrayToObjectList(clazz, cudList);
        
        return fromList(result, currentUser);
        
    }

    private static String getGridName(String gridName, JsonNode json) {
        if (gridName != null && !gridName.equals(NO_GIVEN_GRID_NAME)) {
            return gridName;
        }

        Iterator<String> names = json.fieldNames();
        if (names.hasNext()) {
            return names.next();
        }

        return BaseConstants.EMPTY;
    }

    private static <T> List<T> convertJsonArrayToObjectList(Class<T> clazz, JsonNode cudList) {
        List<T> result = new ArrayList<T>();

        if (cudList == null) {
            return result;
        }

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.setDateFormat(new ISO8601DateFormat());
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        
        try{
            Iterator<JsonNode> rows = cudList.elements();
            while (rows.hasNext()) {
                JsonNode row = rows.next();
                result.add(ObjectMapperUtils.treeToValue(objectMapper, row, clazz));
            }
        }catch(Exception e){
           throw new IllegalStateException("Cannot Parse Json Message [" + e + "]");
        }
        return result;
    }
}
