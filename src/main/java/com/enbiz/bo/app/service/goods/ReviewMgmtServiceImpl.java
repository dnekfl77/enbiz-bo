package com.enbiz.bo.app.service.goods;

import java.util.List;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.beanutils.BeanUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.goods.ReviewDetailRequest;
import com.enbiz.bo.app.dto.request.goods.ReviewMgmtRequest;
import com.enbiz.bo.app.dto.response.goods.ReviewDetailResponse;
import com.enbiz.bo.app.dto.response.goods.ReviewMgmtResponse;
import com.enbiz.bo.app.entity.PrGoodsRevAtchFile;
import com.enbiz.bo.app.entity.PrGoodsRevEvlt;
import com.enbiz.bo.app.entity.PrGoodsRevInfo;
import com.enbiz.bo.app.entity.PrGoodsRevReplyInfo;
import com.enbiz.bo.app.enums.PR022;
import com.enbiz.bo.app.enums.PR037;
import com.enbiz.bo.app.repository.goods.*;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;
import lombok.RequiredArgsConstructor;

/**
 * 리뷰관리 ServiceImpl
 */
@Service
@Lazy
@Slf4j
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@RequiredArgsConstructor
public class ReviewMgmtServiceImpl implements ReviewMgmtService{

    private final PrGoodsRevInfoMapper prGoodsRevInfoMapper;
    private final PrGoodsRevInfoTrxMapper prGoodsRevInfoTrxMapper;

    private final PrGoodsRevAtchFileMapper prGoodsRevAtchFileMapper;

    private final PrGooodRevReplyInfoMapper prGooodRevReplyInfoMapper;
    private final PrGooodRevReplyInfoTrxMapper prGooodRevReplyInfoTrxMapper;

    private final PrGoodsRevEvltMapper prGoodsRevEvltMapper;

    @Override
    public int getReviewListCount(ReviewMgmtRequest request) throws Exception{
        return prGoodsRevInfoMapper.getReviewListCount(request);
    }

    @Override
    public List<ReviewMgmtResponse> getReviewList(ReviewMgmtRequest request) throws Exception{
        return prGoodsRevInfoMapper.getReviewList(request);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void modifyMultipleReviewsDisplayState(ReviewMgmtRequest request) throws Exception{

        for(String revNo : request.getRevNoList()){
            PrGoodsRevInfo prGoodsRevInfo = new PrGoodsRevInfo();
            BeanUtils.copyProperties(prGoodsRevInfo,request);
            prGoodsRevInfo.setRevNo(revNo);
            prGoodsRevInfoTrxMapper.updateRevDispStatCd(validateRevInfo(prGoodsRevInfo));
        }
    }

    private PrGoodsRevInfo validateRevInfo(PrGoodsRevInfo prGoodsRevInfo) throws Exception{

        Validator.throwIfEmpty(prGoodsRevInfo.getRevNo()        , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"리뷰번호 확인불가"}));
        Validator.throwIfEmpty(prGoodsRevInfo.getRevDispStatCd(), MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"변경할 전시상태 확인불가"}));
        Validator.throwIfEmpty(prGoodsRevInfo.getSysModId()     , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"수정자ID 확인불가"}));

        return prGoodsRevInfo;
    }

    @Override
    public ReviewDetailResponse getReviewInfo(String revNo) throws Exception{
        return prGoodsRevInfoMapper.getReviewInfo(revNo);
    }

    @Override
    public List<PrGoodsRevAtchFile> getReviewAttachedFileList(String revNo) throws Exception{
        return prGoodsRevAtchFileMapper.getReviewAttachedFileList(revNo);
    }

    @Override
    public List<PrGoodsRevEvlt> getReviewEvaluationList(String revNo) throws Exception{
        return prGoodsRevEvltMapper.getReviewEvaluationList(revNo);
    }

    @Override
    public int getReviewReplyListCount(ReviewDetailRequest request) throws Exception{
        return prGooodRevReplyInfoMapper.getReviewReplyListCount(request);
    }

    @Override
    public List<ReviewDetailResponse> getReviewReplyList(ReviewDetailRequest request) throws Exception{
        return prGooodRevReplyInfoMapper.getReviewReplyList(request);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void modifyReviewDisplayState(ReviewDetailRequest request) throws Exception{

            PrGoodsRevInfo prGoodsRevInfo = new PrGoodsRevInfo();
            BeanUtils.copyProperties(prGoodsRevInfo,request);

            Validator.throwIfEmpty(prGoodsRevInfo.getRevNo()        , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"리뷰번호 확인불가"}));
            Validator.throwIfEmpty(prGoodsRevInfo.getRevDispStatCd(), MessageResolver.getMessage("reviewMgmt.reviewDetail.alert.msg.noSelectedRevDispStatMsg"));
            Validator.throwIfEmpty(prGoodsRevInfo.getSysModId()     , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"수정자ID 확인불가"}));

            prGoodsRevInfoTrxMapper.updateRevDispStatCd(prGoodsRevInfo);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void modifyReviewPhotoDisplayState(ReviewDetailRequest request) throws Exception{

        PrGoodsRevInfo prGoodsRevInfo = new PrGoodsRevInfo();
        BeanUtils.copyProperties(prGoodsRevInfo,request);

        Validator.throwIfEmpty(prGoodsRevInfo.getPhotoDispStatCd() , MessageResolver.getMessage("reviewMgmt.reviewDetail.alert.msg.noSelectedPhotoDispStatMsg"));
        Validator.throwIfEmpty(prGoodsRevInfo.getRevNo()           , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"리뷰번호 확인불가"}));
        Validator.throwIfEmpty(prGoodsRevInfo.getSysModId()        , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"수정자ID 확인불가"}));

        prGoodsRevInfoTrxMapper.updatePhotoDispStatCd(prGoodsRevInfo);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void modifyRepliesDisplayState(ReviewDetailRequest request) throws Exception{

        for ( String replySeq : request.getReplySeqList() ) {
            PrGoodsRevReplyInfo reply = new PrGoodsRevReplyInfo();
            BeanUtils.copyProperties(reply,request);
            reply.setReplySeq(Integer.valueOf(replySeq));

            Validator.throwIfEmpty(reply.getRevNo()             , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"리뷰번호 확인불가"}));
            Validator.throwIfEmpty(reply.getReplySeq()          , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"답글순번 확인불가"}));
            Validator.throwIfEmpty(reply.getReplySeqDispStatCd(), MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"변경할 답글전시상태코드 확인불가"}));
            Validator.throwIfEmpty(reply.getSysModId()          , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"수정자ID 확인불가"}));

            prGooodRevReplyInfoTrxMapper.updateReplySeqDispStatCd(reply);
        }
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void registReviewReply(ReviewDetailRequest request) throws Exception{

        PrGoodsRevReplyInfo reply = new PrGoodsRevReplyInfo();
        BeanUtils.copyProperties(reply,request);

        reply.setWrtmnId(request.getSysRegId());
        reply.setWrtmnGbCd(PR037.AEMP.getCd());
        reply.setReplySeqDispStatCd(PR022.DISPLAY.getCd());

        Validator.throwIfEmpty(reply.getReplyCont()         , MessageResolver.getMessage("reviewMgmt.reviewReplyRegist.alert.msg.noReplyContMsg"));
        Validator.throwIfLongerThan(reply.getReplyCont(),4000, MessageResolver.getMessage("reviewMgmt.reviewReplyRegist.alert.msg.maxReplyContMsg"));

        Validator.throwIfEmpty(reply.getRevNo()             , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"리뷰번호 확인불가"}));
        Validator.throwIfEmpty(reply.getWrtmnGbCd()         , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"작성자구분코드 확인불가"}));
        Validator.throwIfEmpty(reply.getWrtmnId()           , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"작성자아이디 확인불가"}));
        Validator.throwIfEmpty(reply.getReplySeqDispStatCd(), MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"답글전시상태코드 확인불가"}));
        Validator.throwIfEmpty(reply.getSysRegId()          , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"등록자ID 확인불가"}));

        prGooodRevReplyInfoTrxMapper.insertReviewReply(reply);

    }
}
