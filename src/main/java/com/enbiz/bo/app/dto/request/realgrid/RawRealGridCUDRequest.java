package com.enbiz.bo.app.dto.request.realgrid;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.sql.Timestamp;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;

import com.enbiz.bo.app.dto.login.CurrentUser;
import com.enbiz.bo.app.entity.StUserBaseEx;
import com.enbiz.common.base.constant.BaseConstants;
import com.enbiz.common.base.entity.BaseCommonEntity;
import com.enbiz.common.base.propertyeditor.TimestampPropertyEditorSupport;
import com.enbiz.common.base.util.DataMap;
import com.enbiz.common.base.util.ReflectionUtils;
import com.fasterxml.jackson.databind.JsonNode;

public class RawRealGridCUDRequest {
    private static final String KEY_SYS_REGR_ID = "sysRegrId";
    private static final String KEY_SYS_MODR_ID = "sysModrId";

    private final JsonNode source;
    private final CurrentUser currentUser;

    private DataMap requestMap;

    public RawRealGridCUDRequest(JsonNode jsonNode, CurrentUser currentUser) {
        this.source = jsonNode;
        this.currentUser = currentUser;
    }

    public <T> RealGridCUDRequest<T> getRequest(String gridName, Class<T> type) {
        return RealGridCUDRequest.fromJsonNode(gridName, type, source, currentUser);
    }

    public <T> RealGridCUDRequest<T> getRequest(Class<T> type) {
        return RealGridCUDRequest.fromJsonNode(RealGridCUDRequest.NO_GIVEN_GRID_NAME, type, source, currentUser);
    }

    public <T> List<T> getAllRequestRow(String gridName, Class<T> type) {
        return getRequest(gridName, type).getAll();
    }

    public <T> List<T> getAllRequestRow(Class<T> type) {
        return getRequest(type).getAll();
    }

    public void setRequestMap(DataMap requestMap) {
        this.requestMap = requestMap;
    }

    public DataMap getRequestMap(){
    	return this.requestMap;
    }

    public CurrentUser getCurrentUser() {
        return this.currentUser;
    }

    public Object get(String key) {
        return requestMap.get(key);
    }

    public String getString(String key) {
        return requestMap.getString(key);
    }

    public long getLong(String key) {
        return requestMap.getLong(key);
    }

    public int getInt(String key) {
        return requestMap.getInt(key);
    }

    public double getDouble(String key) {
        return requestMap.getDouble(key);
    }

    public <T> T extractQueryEntity(final Class<T> clazz) throws Exception {
        final T entity = clazz.newInstance();
        final Iterator<String> keys = requestMap.keySet().iterator();

        while (keys.hasNext()) {
            final String key = keys.next();
            final Object value = requestMap.get(key);
            final Field currentField = getCurrentField(entity, key);

            if (currentField != null) {
                Class<?> fieldType = currentField.getType();
                if (Date.class.isAssignableFrom(fieldType)) {
                    if (value != null && !BaseConstants.EMPTY.equals(value)) {
                        TimestampPropertyEditorSupport editorSupport = new TimestampPropertyEditorSupport();
                        editorSupport.setAsText((String) value);
                        Timestamp dateValue = (Timestamp) editorSupport.getValue();
                        BeanUtils.setProperty(entity, key, dateValue);
                    }
                } else {
                    BeanUtils.setProperty(entity, key, value);
                }
            }
        }

        setCurrentUserInfoToClass(entity, (StUserBaseEx) currentUser);

        return entity;
    }

    private <T> Field getCurrentField(T bean, String fieldName) {
        return ReflectionUtils.getDeclaredField(bean.getClass(), fieldName);
    }

    private <T> void setCurrentUserInfoToClass(final T entity, StUserBaseEx stUserBaseEx)
            throws IllegalAccessException, InvocationTargetException {

        if (BaseCommonEntity.class.isAssignableFrom(entity.getClass())) {
            BeanUtils.setProperty(entity, KEY_SYS_REGR_ID, stUserBaseEx.getLoginId());
            BeanUtils.setProperty(entity, KEY_SYS_MODR_ID, stUserBaseEx.getLoginId());
        }

    }
}
