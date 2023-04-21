package com.enbiz.bo.app.repository.marketing;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.CcCpnIsuMbr;
import com.enbiz.bo.app.entity.CcPromBase;
import com.enbiz.bo.app.entity.CcPromoAplyInfo;
import com.enbiz.bo.app.entity.CcPromoAplyMediaInfo;
import com.enbiz.bo.app.entity.CcPromoUseWdayInfo;

@Repository
@Lazy
public interface CcPromBaseTrxMapper {

    /**
     * 쿠폰 등록 페이지 - 쿠폰 등록 ( 프로모션 기본 )
     *
     * @param ccPromBase
     * @return
     * @throws Exception
     */
    void insertCoupon(CcPromBase ccPromBase);

    /**
     * 쿠폰 상세 페이지 - 쿠폰 업데이트 ( 프로모션 기본 )
      * @param ccPromBase
     */
    void updateCoupon(CcPromBase ccPromBase);

    /**
     * 쿠폰 등록 페이지 - 쿠폰 미디어 매체  등록( 프로모션 적용 매체 )
     *
     * @param ccPromoAplyMediaInfo
     * @return
     * @throws Exception
     */
    void insertPromotionMedia(CcPromoAplyMediaInfo ccPromoAplyMediaInfo);

    /**
     * 쿠폰 등록 페이지 - 쿠폰 사용요일 등록 ( 프로모션 사용요일)
     *
     * @param ccPromoUseWdayInfo
     * @return
     * @throws Exception
     */
    void insertPromotionWdays(CcPromoUseWdayInfo ccPromoUseWdayInfo);

    /**
     * 쿠폰 등록 페이지 - 쿠폰 적용정보 등록 (프로모션 적용 정보)
     *
     * @param ccPromoAplyInfo
     * @return
     * @throws Exception
     */
    void insertPromotionAplyInfo(CcPromoAplyInfo ccPromoAplyInfo);

    /**
     *쿠폰 등록 페이지 - 쿠폰 미디어 매체 삭제 (프로모션 적용 매체)
     * @param ccPromoAplyMediaInfo
     */
    void deletePromotionMedia(CcPromoAplyMediaInfo ccPromoAplyMediaInfo);

    /**
     *쿠폰 등록 페이지 - 쿠폰 사용요일 삭제 (프로모션 사용요일)
     * @param ccPromoUseWdayInfo
     */
    void deletePromotionWdays(CcPromoUseWdayInfo ccPromoUseWdayInfo);
    

    /**
     *  쿠폰 등록 페이지 - 쿠폰 적용정보 삭제 ( 프로모션 적용 정보 )
     * @param ccPromoAplyInfo
     */
    void deletePromotionAplyInfo(CcPromoAplyInfo ccPromoAplyInfo);

    /**
     * 쿠폰 삭제
     * @param ccPromBase
     */
    void deletePromotion(CcPromBase ccPromBase);

    /**
     * 쿠폰 회원 등록
     * @param ccCpnIsuMbr
     */
    void registCouponIssuedMbr(CcCpnIsuMbr ccCpnIsuMbr);

    /**
     * 프로모션 등록 페이지 - ( 프로모션 기본 )
     *
     * @param ccPromBase
     * @return
     * @throws Exception
     */
    void insertPromotion(CcPromBase ccPromBase);

    /**
     * 프로모션 상세 페이지 -  ( 프로모션 기본 )
     * @param ccPromBase
     */
    void updatePromotion(CcPromBase ccPromBase);
}
