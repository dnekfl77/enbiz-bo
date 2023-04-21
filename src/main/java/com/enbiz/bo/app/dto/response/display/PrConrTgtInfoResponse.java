package com.enbiz.bo.app.dto.response.display;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PrConrTgtInfoResponse")
@Getter
@Setter
public class PrConrTgtInfoResponse extends BaseCommonEntity {

    private String conrNo                   ; // 전시코너번호
    private String conrTgtNo                ; // 코너대상번호
    private String conrTgtNm                ; // 코너대상명
    private String conrTgtCd                ; // 코너대상 코드
    private Integer conrTgtCnt              ; // 코너대상 갯수
    private Integer dispSeq                 ; // 전시순서
    private String dpthNo                   ; // 깊이번호
    private String uprConrTgtNo             ; // 상위 코너대상 번호
    private String exConrTgtNo              ; // 임시코너대상번호
    private String conrTgtName              ; // 코너대상 코드 명칭
    private String conrContNo               ; // 코너 컨텐츠 번호

}
