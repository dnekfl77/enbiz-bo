package com.enbiz.bo.app.repository.marketing;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.CcAeAplyInfo;
import com.enbiz.bo.app.entity.CcAeAplyMediaInfo;
import com.enbiz.bo.app.entity.CcAeBase;
import com.enbiz.bo.app.entity.CcAeFvrInfo;

@Repository
@Lazy
public interface CcAeBaseTrxMapper {

    /**
     * 사은행사 등록 ( 사은행사 기본 )
     *
     * @param CcAeBase
     * @return
     * @throws Exception
     */
    void insertAppreciation(CcAeBase ccAeBase);

    /**
     * 사은행사 업데이트 ( 사은행사 기본 )
     * @param CcAeBase
     */
    void updateAppreciation(CcAeBase ccAeBase);

    /**
     * 사은행사 적용매체
     *
     * @param ccAeAplyMediaInfo
     * @return
     * @throws Exception
     */
    void insertAplyMediaInfo(CcAeAplyMediaInfo ccAeAplyMediaInfo);

    /**
     * 사은행사 혜택정보
     *
     * @param ccPromoUseWdayInfo
     * @return
     * @throws Exception
     */
    void insertCcAeFvrInfo(CcAeFvrInfo ccAeFvrInfo);

    /**
     * 사은행사적용정보
     *
     * @param ccPromoAplyInfo
     * @return
     * @throws Exception
     */
    void insertCcAeAplyInfo(CcAeAplyInfo ccAeAplyInfo);


    /**
     *사은행사 적용매체 삭제
     * @param ccAeAplyMediaInfo
     */
    void deleteAplyMediaInfo(CcAeAplyMediaInfo ccAeAplyMediaInfo);

    /**
     *사은행사 혜택정보 삭제
     * @param ccAeFvrInfo
     */
    void deleteCcAeFvrInfo(CcAeFvrInfo ccAeFvrInfo);


    /**
     * 사은행사적용정보 삭제
     * @param ccAeAplyInfo
     */
    void deleteCcAeAplyInfo(CcAeAplyInfo ccAeAplyInfo);

    /**
     * 쿠폰 삭제
     * @param ccAeBase
     */
    void deleteAppreciation(CcAeBase ccAeBase);

}
