package com.enbiz.bo.app.entity;

import java.io.Serializable;

import com.enbiz.common.base.entity.AbstractEntity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BaseCommonDto extends AbstractEntity implements Serializable {

    private String sysRegDtm;
    private String sysRegId;
    private String sysModDtm;
    private String sysModId;

    private int rowsPerPage;
    private int pageIdx;
    private	boolean	endPage;	//마지막페이지 여부

}
