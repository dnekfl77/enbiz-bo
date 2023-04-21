package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 회원자산집계
 */
@Alias("MeMbrAstSum")
@Getter
@Setter
public class MeMbrAstSum extends BaseCommonEntity{
  private String mbrNo;
  private String astGbCd;
  private Integer totAmt;
  private Integer useAmt;
  private Integer posnAmt;
}
