package com.enbiz.bo.app.service.goods;

import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.goods.GoodsQADetailRequest;
import com.enbiz.bo.app.dto.request.goods.GoodsQAMgmtRequest;
import com.enbiz.bo.app.dto.response.goods.GoodsQADetailResponse;
import com.enbiz.bo.app.dto.response.goods.GoodsQAMgmtResponse;
import com.enbiz.bo.app.entity.PrGoodsQaAnsInfo;
import com.enbiz.bo.app.entity.PrGoodsQaAnsTmplInfo;
import com.enbiz.bo.app.entity.PrGoodsQaQuestInfo;
import com.enbiz.bo.app.enums.PR039;
import com.enbiz.bo.app.repository.goods.PrGoodsQaAnsInfoMapper;
import com.enbiz.bo.app.repository.goods.PrGoodsQaAnsInfoTrxMapper;
import com.enbiz.bo.app.repository.goods.PrGoodsQaAnsTmplInfoMapper;
import com.enbiz.bo.app.repository.goods.PrGoodsQaQuestInfoMapper;
import com.enbiz.bo.app.repository.goods.PrGoodsQaQuestInfoTrxMapper;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 상품Q&A목록 ServiceImpl
 */
@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class GoodsQAMgmtServiceImpl implements GoodsQAMgmtService{

    private final PrGoodsQaQuestInfoMapper prGoodsQaQuestInfoMapper;
    private final PrGoodsQaQuestInfoTrxMapper prGoodsQaQuestInfoTrxMapper;

    private final PrGoodsQaAnsInfoMapper prGoodsQaAnsInfoMapper;
    private final PrGoodsQaAnsInfoTrxMapper prGoodsQaAnsInfoTrxMapper;

    private final PrGoodsQaAnsTmplInfoMapper prGoodsQaAnsTmplInfoMapper;

    public int getGoodsQAListCount(GoodsQAMgmtRequest request) throws Exception{
        return prGoodsQaQuestInfoMapper.getGoodsQAListCount(request);
    }

    public List<GoodsQAMgmtResponse> getGoodsQAList(GoodsQAMgmtRequest request) throws Exception{
        return prGoodsQaQuestInfoMapper.getGoodsQAList(request);
    }

    public List<GoodsQAMgmtResponse> getUnProcessedGoodsQA(GoodsQAMgmtRequest request) throws Exception {
        return prGoodsQaQuestInfoMapper.getUnProcessedStatus(request);
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void modifyMultipleQADisplayState(GoodsQAMgmtRequest request) throws Exception{

        for(String questNo : request.getQuestNoList()){
            PrGoodsQaQuestInfo prGoodsQaQuestInfo = new PrGoodsQaQuestInfo();
            BeanUtils.copyProperties(prGoodsQaQuestInfo,request);
            prGoodsQaQuestInfo.setQuestNo(questNo);

            Validator.throwIfEmpty(prGoodsQaQuestInfo.getQuestNo()          , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"질문번호 확인불가"}));
            Validator.throwIfEmpty(prGoodsQaQuestInfo.getQuestDispStatCd()  , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"전시상태 확인불가"}));
            Validator.throwIfEmpty(prGoodsQaQuestInfo.getSysModId()         , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"수정자 ID 확인불가"}));

            prGoodsQaQuestInfoTrxMapper.updateQuestDispStatCd(prGoodsQaQuestInfo);
        }
    }

    public GoodsQADetailResponse getGoodsQuestionInfo(String questNo) throws Exception{
        return prGoodsQaQuestInfoMapper.getGoodsQAQuestInfo(questNo);
    }

    public List<PrGoodsQaAnsInfo> getGoodsAnswerList(String questNo) throws Exception{
        return prGoodsQaAnsInfoMapper.getGoodsQAAnsList(questNo);
    }

    public List<PrGoodsQaAnsTmplInfo> getGoodsAllQATemplateList() throws Exception{
        return prGoodsQaAnsTmplInfoMapper.getGoodsAllQAAnsTmplList();
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void saveGoodsAnswer(GoodsQADetailRequest request) throws Exception{

        Validator.throwIfEmpty(request.getQuestNo()  , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"질문번호 확인불가"}));
        Validator.throwIfEmpty(request.getAnsCont()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"답변내용"}));

        PrGoodsQaAnsInfo prGoodsQaAnsInfo = new PrGoodsQaAnsInfo();
        BeanUtils.copyProperties(prGoodsQaAnsInfo,request);

        // 등록
        if(StringUtils.isBlank(prGoodsQaAnsInfo.getAnsSeq())){

            Validator.throwIfEmpty(request.getSysRegId() , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"등록자 ID 확인불가"}));
            Validator.throwIfEmpty(prGoodsQaAnsInfo.getAnsDispStatCd() , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"답변전시상태"}));
            prGoodsQaAnsInfoTrxMapper.insertGoodsQaAnsInfo(prGoodsQaAnsInfo);

            // 질문 처리상태 변경
            if(!PR039.PROC_FIN.isEquals(request.getProcStatCd())){
                // 미처리, 고객센터이관 -> 처리완료
                PrGoodsQaQuestInfo prGoodsQaQuestInfo = new PrGoodsQaQuestInfo();
                BeanUtils.copyProperties(prGoodsQaQuestInfo,request);
                prGoodsQaQuestInfo.setProcStatCd(PR039.PROC_FIN.getCd());
                prGoodsQaQuestInfoTrxMapper.updateProcStatCd(prGoodsQaQuestInfo);
            }

        // 수정
        } else {
            Validator.throwIfEmpty(request.getSysModId() , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"수정자 ID 확인불가"}));
            prGoodsQaAnsInfoTrxMapper.updateGoodsQaAnsInfo(prGoodsQaAnsInfo);
        }
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void modifyQADisplayState(GoodsQADetailRequest request) throws Exception{

        PrGoodsQaQuestInfo prGoodsQaQuestInfo = new PrGoodsQaQuestInfo();
        BeanUtils.copyProperties(prGoodsQaQuestInfo,request);

        Validator.throwIfEmpty(prGoodsQaQuestInfo.getQuestNo()          , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"질문번호 확인불가"}));
        Validator.throwIfEmpty(prGoodsQaQuestInfo.getSysModId()         , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"수정자 ID 확인불가"}));
        Validator.throwIfEmpty(prGoodsQaQuestInfo.getQuestDispStatCd()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"질문전시상태"}));

        prGoodsQaQuestInfoTrxMapper.updateQuestDispStatCd(prGoodsQaQuestInfo);

    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void transferGoodsQuestion(GoodsQADetailRequest request) throws Exception{

        PrGoodsQaQuestInfo prGoodsQaQuestInfo = new PrGoodsQaQuestInfo();
        BeanUtils.copyProperties(prGoodsQaQuestInfo,request);

        Validator.throwIfEmpty(prGoodsQaQuestInfo.getQuestNo() , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"질문번호 확인불가"}));
        Validator.throwIfEmpty(prGoodsQaQuestInfo.getSysModId(), MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"수정자 ID 확인불가"}));
        Validator.throwIfEmpty(prGoodsQaQuestInfo.getMvotCaus(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"이관사유"}));

        prGoodsQaQuestInfo.setMvotYn("Y");
        prGoodsQaQuestInfo.setProcStatCd(PR039.CUST_CNTR_MVOT.getCd());

        prGoodsQaQuestInfoTrxMapper.updateMvotYn(prGoodsQaQuestInfo);

    }
}
