package com.enbiz.bo.app.dto;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.encrypt.Encrypt;
import com.enbiz.common.base.encrypt.EncryptType;

import lombok.Getter;
import lombok.Setter;

@Alias("EncryptCUD")
@Getter
@Setter
public class EncryptCUD {
	@Encrypt
    private String userNmKr;		// 성명_한글 암호화
	@Encrypt
    private String userNmEn;		// 성명_영문 복암호화
	@Encrypt(type = EncryptType.CRYPTO)
    private String userPw;		// 단방향 암호화
}
