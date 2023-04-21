package com.enbiz.bo.app.service.goods;

import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.login.CurrentUser;
import com.enbiz.bo.app.dto.request.goods.BrandMgmtImageRequest;
import com.enbiz.bo.app.dto.request.goods.BrandMgmtRequest;
import com.enbiz.bo.app.dto.response.goods.BrandMgmtImageResponse;
import com.enbiz.bo.app.dto.response.goods.BrandMgmtResponse;
import com.enbiz.bo.app.entity.PrBrandImg;
import com.enbiz.bo.app.entity.PrBrandMst;
import com.enbiz.bo.app.enums.PR014;
import com.enbiz.bo.app.repository.goods.PrBrandMstMapper;
import com.enbiz.bo.app.repository.goods.PrBrandMstTrxMapper;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 브랜드관리 ServiceImpl
 */
@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class BrandMgmtServiceImpl implements BrandMgmtService {

    private final PrBrandMstMapper prBrandMstMapper;
    private final PrBrandMstTrxMapper prBrandMstTrxMapper;

    @Override
    public List<BrandMgmtResponse> getBrandList(BrandMgmtRequest request) throws Exception {
        return prBrandMstMapper.getBrandMstList(request);
    }

    @Override
    public List<BrandMgmtImageResponse> getBrandImageList(String brandNo) throws Exception {
        BrandMgmtRequest brandMgmtRequest = new BrandMgmtRequest();
        brandMgmtRequest.setBrandNo(brandNo);
        return prBrandMstMapper.getBrandImgList(brandMgmtRequest);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void saveBrand(BrandMgmtRequest request) throws Exception {
    	CurrentUser currentUser = (CurrentUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        request.setSysRegId(currentUser.getLoginId());
        request.setSysModId(currentUser.getLoginId());

        PrBrandMst prBrandMst = new PrBrandMst();
        BeanUtils.copyProperties(prBrandMst, request);

        if(StringUtils.isBlank(prBrandMst.getBrandNo())){
            Validator.throwIfEmpty(prBrandMst.getBrandNm()      , MessageResolver.getMessage("adminCommon.message.parameter.empty",new String[] {"브랜드명"}));
            Validator.throwIfEmpty(prBrandMst.getDispOptnCd()   , MessageResolver.getMessage("adminCommon.message.parameter.empty",new String[] {"전시옵션"}));
            Validator.throwIfEmpty(prBrandMst.getUseYn()        , MessageResolver.getMessage("adminCommon.message.parameter.empty",new String[] {"사용여부"}));
            Validator.throwIfEmpty(prBrandMst.getSysRegId()     , MessageResolver.getMessage("adminCommon.message.parameter.null",new String[] {"등록자 ID 확인불가"}));
            prBrandMstTrxMapper.insertBrandMst(prBrandMst);
        } else{
            Validator.throwIfEmpty(prBrandMst.getBrandNm()      , MessageResolver.getMessage("adminCommon.message.parameter.empty",new String[] {"브랜드명"}));
            Validator.throwIfEmpty(prBrandMst.getDispOptnCd()   , MessageResolver.getMessage("adminCommon.message.parameter.empty",new String[] {"전시옵션"}));
            Validator.throwIfEmpty(prBrandMst.getUseYn()        , MessageResolver.getMessage("adminCommon.message.parameter.empty",new String[] {"사용여부"}));
            Validator.throwIfEmpty(prBrandMst.getSysModId()     , MessageResolver.getMessage("adminCommon.message.parameter.null",new String[] {"수정자 ID 확인불가"}));
            prBrandMstTrxMapper.updateBrandMst(prBrandMst);
        }

        request.setBrandNo(prBrandMst.getBrandNo());
        PrBrandImg prBrandImg = null;
        if(!StringUtils.isBlank(request.getImage1())){
            insertBrandImg(request,"1",request.getImage1(),Integer.toString(request.getImage1Size()));
        }

        if(!StringUtils.isBlank(request.getImage2())){
            insertBrandImg(request,"2",request.getImage2(),Integer.toString(request.getImage2Size()));
        }

        if(!StringUtils.isBlank(request.getImage3())){
            insertBrandImg(request,"3",request.getImage3(),Integer.toString(request.getImage3Size()));
        }
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void insertBrandImg(BrandMgmtRequest request, String imgNo, String image, String imageSize){
        List<BrandMgmtImageRequest> brandMgmtImageRequestList = request.getBrandMgmtImageRequestList();

        String imgSizeCd = null;
        switch(imgNo){
            case "1": imgSizeCd = PR014.BRAND_LOGO.getCd(); break;
            case "2": imgSizeCd = PR014.MEDIUM.getCd(); break;
            case "3": imgSizeCd = PR014.SMALL.getCd(); break;
        }

        if((imgNo.equals("1") && request.getImage1Size() <= 0) ||
           (imgNo.equals("2") && request.getImage2Size() <= 0) ||
           (imgNo.equals("3") && request.getImage3Size() <= 0)){
            return;
        }

        if(brandMgmtImageRequestList.size()<=0){
            return;
        }

        for(BrandMgmtImageRequest brandImg : brandMgmtImageRequestList){
            if(brandImg.getImgSize().equals(imageSize) && brandImg.getImgFileNm().equals(image)){
                PrBrandImg prBrandImg = new PrBrandImg();
                prBrandImg.setBrandNo(request.getBrandNo());
                prBrandImg.setImgNo(imgNo);
                prBrandImg.setImgSizeCd(imgSizeCd);
                prBrandImg.setImgRouteNm(brandImg.getImgRouteNm());
                prBrandImg.setImgFileNm(brandImg.getImgFileNm());
                prBrandImg.setSysRegId(request.getSysRegId());
                prBrandImg.setSysModId(request.getSysModId());
                prBrandMstTrxMapper.deleteBrandImg(prBrandImg);
                prBrandMstTrxMapper.insertBrandImg(prBrandImg);
                break;
            }
        }
    }


}
