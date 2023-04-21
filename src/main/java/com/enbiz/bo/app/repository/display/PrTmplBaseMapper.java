package com.enbiz.bo.app.repository.display;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.display.PrTmplBaseRequest;
import com.enbiz.bo.app.dto.request.display.PrTmplConrMappInfoRequest;
import com.enbiz.bo.app.dto.response.display.PrTmplBaseResponse;
import com.enbiz.bo.app.entity.PrTmplBase;
import com.enbiz.bo.app.entity.PrTmplConrMappInfo;

@Repository
@Lazy
public interface PrTmplBaseMapper {

    /**
     * 템플릿 목록
     * @param prTmplBaseRequest
     * @return
     */
    List<PrTmplBaseResponse> getTemplateList(PrTmplBaseRequest prTmplBaseRequest);

    /**
     * 템플릿 목록 수
     * @param prTmplBaseRequest
     * @return
     */
    int getTemplateListCount(PrTmplBaseRequest prTmplBaseRequest);

    /**
     * 전시 템플릿 관리 목록
     * @param prTmplBaseRequest
     * @return
     */
    List<PrTmplBaseResponse> getDisplayTemplateList(PrTmplBaseRequest prTmplBaseRequest);

    /**
     * 전시 템플릿 관리 목록 수
     * @param prTmplBaseRequest
     * @return
     */
    int getDisplayTemplateListCount(PrTmplBaseRequest prTmplBaseRequest);

    /**
     * 템플릿코너매핑정보에 해당 템플릿과 연결된 코너 데이터 여부 확인
     * @param prTmplBaseRequest
     * @return
     */
    int checkPrTmplConrMappInfo(PrTmplBaseRequest prTmplBaseRequest);

    /**
     * 코너 삭제시 전시코너정보에 해당 코너 데이터 여부 확인
     * @param prTmplConrMappInfoRequest
     * @return
     */
    int checkPrDispConrInfo(PrTmplConrMappInfoRequest prTmplConrMappInfoRequest);
}
