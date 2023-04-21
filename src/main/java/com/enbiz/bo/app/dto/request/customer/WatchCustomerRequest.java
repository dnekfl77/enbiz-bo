package com.enbiz.bo.app.dto.request.customer;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("WatchCustomerRequest")
@Getter
@Setter
public class WatchCustomerRequest extends BaseCommonEntity {
    private	String mgrMbrNo;	            //관리회원번호
    private String mgrMbrRvcId;             //관리회원해제자ID
    private String[] mgrMbrNoArray;         //관리회원번호배열
}
