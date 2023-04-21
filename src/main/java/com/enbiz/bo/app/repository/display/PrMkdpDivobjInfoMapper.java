package com.enbiz.bo.app.repository.display;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrMkdpDivobjInfo;

@Repository
@Lazy
public interface PrMkdpDivobjInfoMapper {

    /**
     * 기획전 관리 > 구분자 저장 입력 처리
     * @param prMkdpDivobjInfo
     * @return
     */
    void insertPrMkdpDivobjInfo(PrMkdpDivobjInfo prMkdpDivobjInfo);

    /**
     * 기획전 관리 > 구분자 저장 수정 처리
     * @param prMkdpDivobjInfo
     * @return
     */
    void updatePrMkdpDivobjInfo(PrMkdpDivobjInfo prMkdpDivobjInfo);

    /**
     * 기획전 관리 > 구분자 그리드 삭제
     * @param prMkdpDivobjInfo
     * @return
     */
    void deletePrMkdpDivobjInfo(PrMkdpDivobjInfo prMkdpDivobjInfo);

}
