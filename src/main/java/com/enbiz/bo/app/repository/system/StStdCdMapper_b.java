package com.enbiz.bo.app.repository.system;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.StGrpCd;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.entity.StStdCdEx;

@Repository
@Lazy
public interface StStdCdMapper_b {


    List<StStdCdEx> getStStdCdList(StStdCdEx stStdCdEx);
    int getStStdCdListCount(StStdCdEx stStdCdEx);
	
   List<StStdCd> getStStdCd(String[] param);

    List<StGrpCd> getCodeList(StGrpCd stGrpCd);

    List<StStdCdEx> getCodeDetailList(StStdCdEx stStdCdEx);

    List<StStdCdEx> getGoodsArtcItemList(StStdCdEx stStdCdEx) throws Exception;

    int getCodeDetailListCount(StStdCdEx stStdCdEx);

    /**
     * 계좌정보 확인시 은행코드가 아니고 참조값1이므로 참고값1로 은행코드를 변경
     * @param stStdCdEx
     * @return
     * @throws Exception
     */
    String getBankCodeConvertRef1Val(StStdCdEx stStdCdEx) throws Exception;

	Integer checkCodeDetailList(String[] grpCd);

	List<StStdCdEx> getSystemIFMgmtList(StStdCdEx stStdCdEx);

    int getSystemIFMgmtListCount(StStdCdEx stStdCdEx);

    List<StStdCdEx> getSystemPayMeanGdMgmtList(StStdCdEx stStdCdEx);
    int getSystemPayMeanGdMgmtListCount(StStdCdEx stStdCdEx);
}
