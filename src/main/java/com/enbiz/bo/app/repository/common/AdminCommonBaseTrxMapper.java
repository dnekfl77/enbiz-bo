package com.enbiz.bo.app.repository.common;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.EncryptCUD;
import com.enbiz.bo.app.dto.MaskingCUD;
import com.enbiz.bo.app.entity.SmsMsg;

@Repository
@Lazy
public interface AdminCommonBaseTrxMapper {
    /**
     * SMS 비밀번호 초기화 발송
     * @param smsMsg
     * @throws Exception
     */
    void insertInitPassWordSms(SmsMsg smsMsg) throws Exception;
	
	/**
	 * 마스킹 테스트 호출
	 * @return
	 */
	MaskingCUD getMaskingCUD();
	
	/**
	 * 암호화 테스트 호출
	 * @return
	 */
	EncryptCUD getEncryptCUD();
	
	
}
