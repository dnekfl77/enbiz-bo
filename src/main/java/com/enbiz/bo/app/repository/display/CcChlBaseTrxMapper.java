package com.enbiz.bo.app.repository.display;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.popup.CcChlBaseRequest;
import com.enbiz.bo.app.dto.response.popup.CcChlBaseResponse;
import com.enbiz.bo.app.entity.CcChlBase;
import com.enbiz.bo.app.entity.CcChlDtlInfo;

@Repository
@Lazy
public interface CcChlBaseTrxMapper {

    void insertCcChlBase(CcChlBase ccChlBase);

    void updateCcChlBase(CcChlBase ccChlBase);

    void deleteCcChlBase(CcChlBase ccChlBase);

    void insertCcChlDtlInfo(CcChlDtlInfo ccChlDtlInfo);

    void updateCcChlDtlInfo(CcChlDtlInfo ccChlDtlInfo);

    void deleteCcChlDtlInfo(CcChlDtlInfo ccChlDtlInfo);
}
