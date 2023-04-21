package com.enbiz.bo.app.dto.request.payment;

import java.util.List;

import org.apache.ibatis.type.Alias;

import com.enbiz.bo.app.entity.OpPayMeanCtrlDtlInfo;
import com.enbiz.bo.app.entity.OpPayMeanCtrlInfo;
import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * ==========================
 * 결제수단 제어관리 상세화면 Request Dto
 * ==========================
 */

@Alias("OpPayMeanCtrlDtlInfoRequest")
@Setter
@Getter
public class OpPayMeanCtrlDtlInfoRequest extends BaseCommonEntity {
    private OpPayMeanCtrlInfo opPayMeanCtrlInfo                     ; // 결제수단제어정보
    private List<OpPayMeanCtrlDtlInfo> opPayMeanCtrlDtlInfo     ; // 결제수단제어상세정보 리스트
}
