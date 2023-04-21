package com.enbiz.bo.app.repository.code;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.code.CodeReqDto;
import com.enbiz.bo.app.dto.code.CodeResDto;
import com.enbiz.bo.app.entity.StStdCd;

@Repository
@Lazy
public interface CodeMapper {

    List<StStdCd> getStStdCd(String[] params);

    /**
     * 그룹코드(단건, 다건) 으로 공통코드 테이블의 코드, 코드명 조회
     * @param params
     * @return
     * @throws Exception
     */
    List<CodeResDto> getCdCdNmFromStStdCdByArrayGrpCd(String[] params) throws Exception;

    /**
     * 그룹코드 중 참조1 필드에 해당하는 공통코드 테이블의 코드, 코드명 조회
     * @param codeReqDto
     * @return
     * @throws Exception
     */
    List<CodeResDto> getCdCdNmFromStStdCdByGrpCdRef1Val(CodeReqDto codeReqDto) throws Exception;

    /**
     * 사이트정보 테이블의 사이트번호, 사이트명칭를 코드, 코드명 형태로 조회
     * @return
     * @throws Exception
     */
    List<CodeResDto> getCdCdNmFromCcSiteBaseByEmpty() throws Exception;

}
