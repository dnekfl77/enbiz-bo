package com.enbiz.bo.app.repository.customerservice;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.customerservice.CounselingTypePopupRequest;
import com.enbiz.bo.app.dto.request.customerservice.CounselingTypeRequest;
import com.enbiz.bo.app.dto.response.customerservice.CounselingTypeResponse;

@Repository
@Lazy
public interface CsCnslTypInfoMapper {

    /**
     * 상담유형관리 LIST (tree)
     * @return
     * @throws Exception
     */
    List<CounselingTypeResponse> getConsultationTypeList(CounselingTypeRequest CounselingTypeRequest) throws Exception;

    /**
     * 상담유형관리 1dept 하위 목록 조회
     * @param CounselingTypeRequest
     * @return
     * @throws Exception
     */
    List<CounselingTypeResponse> getLowerConsultationTypeList(CounselingTypeRequest CounselingTypeRequest) throws Exception;

    /**
     *  상담유형관리 1dept 하위 목록 조회수
     * @param CounselingTypeRequest
     * @throws Exception
     */
    int getLowerConsultationTypeListCount(CounselingTypeRequest CounselingTypeRequest) throws Exception;


    String getConsultationTypeNo();

    /**
     * 상담유형 대유형/중유형/소유형 조회
     * @param depth
     * @param cnslTypNo
     * @return
     */
    List<CounselingTypeResponse> getCnslTypNoList(String cnslTypNo);

    /**
     * 상담유형조회
     * @param CounselingTypePopupRequest
     * @return
     * @throws Exception
     */
    List<CounselingTypeResponse> getConsultationTypeListPopup(CounselingTypePopupRequest CounselingTypePopupRequest) throws Exception;

    /**
     * 상담유형조회 수
     * @param CounselingTypePopupRequest
     * @return
     * @throws Exception
     */
    int getConsultationTypeListPopupCount(CounselingTypePopupRequest CounselingTypePopupRequest) throws Exception;

    /**
     * 상담유형 단일건 조회
     */
    CounselingTypeResponse getCnslTypInfoData(String cnslTypNo);
}
