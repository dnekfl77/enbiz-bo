package com.enbiz.bo.app.repository.system;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.popup.StZipNoPopupRequest;
import com.enbiz.bo.app.dto.request.system.ZipNoMgmtRequest;
import com.enbiz.bo.app.dto.response.popup.StZipNoPopupResponse;
import com.enbiz.bo.app.dto.response.system.ZipNoMgmtResponse;

@Repository
@Lazy
public interface StZipNoMapper {

    /**
     * 우편번호 목록 총 건수 조회
     * @param ZipNoMgmtRequest
     * @return int
     */
    int getZipNoListTotalCnt(ZipNoMgmtRequest ZipNoMgmtRequest);

    /**
     * 우편번호 목록조회
     * @param ZipNoMgmtRequest
     * @return List<ZipNoMgmtResponse>
     */
    List<ZipNoMgmtResponse> getZipNoList(ZipNoMgmtRequest ZipNoMgmtRequest);

    /**
     * 시도명 목록 조회
     * @return List<String>
     */
    List<String> getCtpNmList();

    /**
     * 시군구명 목록 조회
     * @param ctpNm
     * @return List<String>
     */
    List<String> getSigNmList(@Param("ctpNm") String ctpNm);


    /**
     * 우편번호 팝업 목록 조회
     * @param req
     * @return
     * @throws Exception
     */
    List<StZipNoPopupResponse> getZipNoPopupList(StZipNoPopupRequest req);

    /**
     * 우편번호 팝업 목록 조회 건수
     * @param req
     * @return
     * @throws Exception
     */
    int getZipNoPopupListCount(StZipNoPopupRequest req);
    
}
