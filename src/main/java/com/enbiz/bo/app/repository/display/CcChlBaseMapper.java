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
public interface CcChlBaseMapper {

    /**
     * 채널 목록
     * @param ccChlBaseRequest
     * @return
     */
    List<CcChlBaseResponse> getChannelList(CcChlBaseRequest ccChlBaseRequest);

    /**
     * 채널 목록 수
     * @param ccChlBaseRequest
     * @return
     */
    int getChannelListCount(CcChlBaseRequest ccChlBaseRequest);

    int getCcChlBaseByEntrNoCount(String entrNo);

    List<CcChlBase> getCcChlBaseByEntrNoList(String entrNo);

    int getCcChlDtlInfoByChlNoCount(String chlNo);

    List<CcChlDtlInfo> getCcChlDtlInfoByChlNoList(String chlNo);
}
