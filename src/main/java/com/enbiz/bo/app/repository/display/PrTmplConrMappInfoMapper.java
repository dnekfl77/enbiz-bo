package com.enbiz.bo.app.repository.display;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.display.PrTmplConrMappInfoRequest;
import com.enbiz.bo.app.dto.response.display.PrTmplConrMappInfoResponse;

@Repository
@Lazy
public interface PrTmplConrMappInfoMapper {

    /**
     * 코너 목록
     * @param prTmplConrMappInfoRequest
     * @return
     */
    List<PrTmplConrMappInfoResponse> getDisplayCornerList(PrTmplConrMappInfoRequest prTmplConrMappInfoRequest);

    /**
     * 코너 목록 수
     * @param prTmplConrMappInfoRequest
     * @return
     */
    int getDisplayCornerListCount(PrTmplConrMappInfoRequest prTmplConrMappInfoRequest);

    /**
     * 전시 연결 관리 _ 코너 목록
     * @param prTmplConrMappInfoRequest
     * @return
     */
    List<PrTmplConrMappInfoResponse> getConnerList(PrTmplConrMappInfoRequest prTmplConrMappInfoRequest);

    /**
     * 전시 연결 관리 _ 코너 목록 수
     * @param prTmplConrMappInfoRequest
     * @return
     */
    int getConnerListCount(PrTmplConrMappInfoRequest prTmplConrMappInfoRequest);

}
