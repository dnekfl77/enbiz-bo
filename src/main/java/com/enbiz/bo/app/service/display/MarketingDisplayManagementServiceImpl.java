package com.enbiz.bo.app.service.display;

import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.login.CurrentUser;
import com.enbiz.bo.app.dto.request.display.PrDispImgInfoRequest;
import com.enbiz.bo.app.dto.request.display.PrMkdpBaseRequest;
import com.enbiz.bo.app.dto.request.display.PrMkdpGoodsInfoRequest;
import com.enbiz.bo.app.dto.response.PrMkdpGoodsInfoResponse;
import com.enbiz.bo.app.dto.response.display.PrDispImgInfoResponse;
import com.enbiz.bo.app.dto.response.display.PrMkdpBaseResponse;
import com.enbiz.bo.app.dto.response.display.PrMkdpDivobjInfoResponse;
import com.enbiz.bo.app.entity.PrDispImgInfo;
import com.enbiz.bo.app.entity.PrMkdpBase;
import com.enbiz.bo.app.entity.PrMkdpDivobjInfo;
import com.enbiz.bo.app.entity.PrMkdpGoodsInfo;
import com.enbiz.bo.app.repository.display.PrMkdpBaseMapper;
import com.enbiz.bo.app.repository.display.PrMkdpDivobjInfoMapper;
import com.enbiz.bo.app.repository.display.PrMkdpGoodsInfoMapper;

import lombok.RequiredArgsConstructor;

/**
 * 기획전 관리 서비스 IMPL
 */
@Service
@Lazy
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@RequiredArgsConstructor
public class MarketingDisplayManagementServiceImpl implements MarketingDisplayManagementService {

    private static final Logger logger = LoggerFactory.getLogger(MarketingDisplayManagementServiceImpl.class);
    private final PrMkdpBaseMapper prMkdpBaseMapper;
    private final PrMkdpDivobjInfoMapper prMkdpDivobjInfoMapper;
    private final PrMkdpGoodsInfoMapper prMkdpGoodsInfoMapper;

    @Override
    public List<PrMkdpBaseResponse> getPrMkdpBaseList(PrMkdpBaseRequest prMkdpBaseRequest) throws Exception {
        return prMkdpBaseMapper.getPrMkdpBaseList(prMkdpBaseRequest);
    }

    @Override
    public int getPrMkdpBaseListCount(PrMkdpBaseRequest prMkdpBaseRequest) throws Exception {
        return prMkdpBaseMapper.getPrMkdpBaseListCount(prMkdpBaseRequest);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void savePrMkdpBase(PrMkdpBaseRequest prMkdpBaseRequest) throws Exception {
    	CurrentUser currentUser = (CurrentUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        prMkdpBaseRequest.setSysRegId(currentUser.getLoginId());
        prMkdpBaseRequest.setSysModId(currentUser.getLoginId());

        PrMkdpBase prMkdpBase = new PrMkdpBase();
        BeanUtils.copyProperties(prMkdpBase, prMkdpBaseRequest);

        if(StringUtils.isBlank(prMkdpBase.getMkdpNo())){
            prMkdpBaseMapper.insertPrMkdpBase(prMkdpBase);
        } else {
            prMkdpBaseMapper.updatePrMkdpBase(prMkdpBase);
        }
        prMkdpBaseRequest.setMkdpNo(prMkdpBase.getMkdpNo());


        if(prMkdpBaseRequest.getImgList().size() == 2){ // 이미지가 모두 존재하는 경우
            settingPrDispImgInfo(prMkdpBaseRequest);
        } else if(prMkdpBaseRequest.getImgList().size() == 1) { // 이미지가 하나만 존재하는 경우(없는 파일 삭제)

            List<PrDispImgInfoRequest> prDispImgInfoList = prMkdpBaseRequest.getImgList();
            String imgTypCd = prDispImgInfoList.get(0).getImgTypCd();

            PrDispImgInfo prDispImgInfo = new PrDispImgInfo();
            prDispImgInfo.setDispShopGbCd("01");
            prDispImgInfo.setShopCtgNo(prMkdpBaseRequest.getMkdpNo());

            if(imgTypCd.equals("01")) {
                prDispImgInfo.setImgTypCd("02");
            } else if(imgTypCd.equals("02")) {
                prDispImgInfo.setImgTypCd("01");
            }

            prMkdpBaseMapper.deletePrDispImgInfo(prDispImgInfo);
            settingPrDispImgInfo(prMkdpBaseRequest);

        } else if(prMkdpBaseRequest.getImgList().size() == 0){ // 이미지가 존재하지 않는 경우 모두 삭제
            for(int i=1; i<3; i++){
                PrDispImgInfo prDispImgInfo = new PrDispImgInfo();
                prDispImgInfo.setDispShopGbCd("01");
                prDispImgInfo.setShopCtgNo(prMkdpBaseRequest.getMkdpNo());
                prDispImgInfo.setImgTypCd("0" + i);
                prMkdpBaseMapper.deletePrDispImgInfo(prDispImgInfo);
            }
        }
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void settingPrDispImgInfo(PrMkdpBaseRequest prMkdpBaseRequest){
        List<PrDispImgInfoRequest> prDispImgInfoList = prMkdpBaseRequest.getImgList();

        for(PrDispImgInfoRequest req : prDispImgInfoList){
            PrDispImgInfo prDispImgInfo = new PrDispImgInfo();
            prDispImgInfo.setDispShopGbCd("01");
            prDispImgInfo.setShopCtgNo(prMkdpBaseRequest.getMkdpNo());
            prDispImgInfo.setImgTypCd(req.getImgTypCd());
            prDispImgInfo.setBnrImgFileNm(req.getBnrImgFileNm());
            prDispImgInfo.setBnrImgPathNm(req.getBnrImgPathNm());
            prDispImgInfo.setSysRegId(prMkdpBaseRequest.getSysRegId());
            prDispImgInfo.setSysModId(prMkdpBaseRequest.getSysModId());

            prMkdpBaseMapper.deletePrDispImgInfo(prDispImgInfo);
            if( !req.getBnrImgFileNm().equals("") && req.getBnrImgFileNm() != null) {
                prMkdpBaseMapper.insertPrDispImgInfo(prDispImgInfo);
            }
        }

    }

    @Override
    public void registCUDPrMkdpBase(List<PrMkdpBase> updateList, List<PrMkdpBase> deleteList) throws Exception {
        updatePrMkdpBaseList(updateList);
        deletePrMkdpBaseList(deleteList);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void updatePrMkdpBaseList(List<PrMkdpBase> updateList) {
        for (PrMkdpBase prMkdpBase : updateList) {
            prMkdpBaseMapper.updatePrMkdpBaseList(prMkdpBase);
        }
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void deletePrMkdpBaseList(List<PrMkdpBase> deleteList) {
        for (PrMkdpBase prMkdpBase : deleteList) {
            prMkdpBaseMapper.deletePrMkdpBase(prMkdpBase); // 기획전 기본 테이블 삭제
            prMkdpBaseMapper.deletePrMkdpDivobjInfoForPrMkdpBase(prMkdpBase); // 기획전 구분자 정보 테이블 삭제
            prMkdpBaseMapper.deletePrMkdpGoodsInfoForPrMkdpBase(prMkdpBase); // 기획전 상품 정보 삭제
            prMkdpBaseMapper.deletePrDispGrpMappInfoForPrMkdpBase(prMkdpBase); // 전시그룹매핑 정보 삭제
            prMkdpBaseMapper.deletePrDispImgInfoForPrMkdpBase(prMkdpBase); // 전시 이미지 정보 삭제
        }
    }

    @Override
    public PrMkdpBaseResponse getPrMkdpBaseDetail(PrMkdpBaseRequest prMkdpBaseRequest) throws Exception {
        return prMkdpBaseMapper.getPrMkdpBaseDetail(prMkdpBaseRequest);
    }

    @Override
    public List<PrDispImgInfoResponse> getPrDispImgInfoDetail(PrMkdpBaseRequest prMkdpBaseRequest) throws Exception {
        return prMkdpBaseMapper.getPrDispImgInfoDetail(prMkdpBaseRequest);
    }

    @Override
    public List<PrMkdpDivobjInfoResponse> getPrMkdpDivObjInfoList(PrMkdpBaseRequest prMkdpBaseRequest) throws Exception {
        return prMkdpBaseMapper.getPrMkdpDivObjInfoList(prMkdpBaseRequest);
    }

    @Override
    public int getPrMkdpDivObjInfoListCount(PrMkdpBaseRequest prMkdpBaseRequest) throws Exception {
        return prMkdpBaseMapper.getPrMkdpDivObjInfoListCount(prMkdpBaseRequest);
    }

    @Override
    public List<PrMkdpDivobjInfoResponse> getPrTmplBase() throws Exception {
        return prMkdpBaseMapper.getPrTmplBase();
    }

    @Override
    public void registCUDPrMkdpDivobjInfo(List<PrMkdpDivobjInfo> createList, List<PrMkdpDivobjInfo> updateList, List<PrMkdpDivobjInfo> deleteList) throws Exception {
        insertPrMkdpDivobjInfo(createList);
        updatePrMkdpDivobjInfo(updateList);
        deletePrMkdpDivobjInfo(deleteList);
    }

    @Override
    public void insertPrMkdpDivobjInfo(List<PrMkdpDivobjInfo> createList) throws Exception {
        for (PrMkdpDivobjInfo prMkdpDivobjInfo : createList) {
            prMkdpDivobjInfoMapper.insertPrMkdpDivobjInfo(prMkdpDivobjInfo);
        }
    }

    @Override
    public void updatePrMkdpDivobjInfo(List<PrMkdpDivobjInfo> updateList) throws Exception {
        for (PrMkdpDivobjInfo prMkdpDivobjInfo : updateList) {
            prMkdpDivobjInfoMapper.updatePrMkdpDivobjInfo(prMkdpDivobjInfo);
        }
    }

    @Override
    public void deletePrMkdpDivobjInfo(List<PrMkdpDivobjInfo> deleteList) throws Exception {
        for (PrMkdpDivobjInfo prMkdpDivobjInfo : deleteList) {
            prMkdpDivobjInfoMapper.deletePrMkdpDivobjInfo(prMkdpDivobjInfo);
            prMkdpGoodsInfoMapper.deletePrMkdpGoodsInfoListOfDivobj(prMkdpDivobjInfo);
        }
    }

    @Override
    public List<PrMkdpGoodsInfoResponse> getPrMkdpGoodsInfoList(PrMkdpGoodsInfoRequest prMkdpGoodsInfoRequest) throws Exception {
        return prMkdpGoodsInfoMapper.getPrMkdpGoodsInfoList(prMkdpGoodsInfoRequest);
    }

    @Override
    public int getPrMkdpGoodsInfoListCount(PrMkdpGoodsInfoRequest prMkdpGoodsInfoRequest) throws Exception {
        return prMkdpGoodsInfoMapper.getPrMkdpGoodsInfoListCount(prMkdpGoodsInfoRequest);
    }

    @Override
    public void registCUDPrMkdpGoodsInfo(List<PrMkdpGoodsInfo> createList, List<PrMkdpGoodsInfo> updateList, List<PrMkdpGoodsInfo> deleteList) throws Exception {
        insertPrMkdpGoodsInfoList(createList);
        updatePrMkdpGoodsInfoList(updateList);
        deletePrMkdpGoodsInfoList(deleteList);
    }

    @Override
    public void insertPrMkdpGoodsInfoList(List<PrMkdpGoodsInfo> createList) throws Exception {
        for (PrMkdpGoodsInfo prMkdpGoodsInfo : createList) {
            prMkdpGoodsInfoMapper.insertPrMkdpGoodsInfoList(prMkdpGoodsInfo);
        }
    }

    @Override
    public void updatePrMkdpGoodsInfoList(List<PrMkdpGoodsInfo> updateList) throws Exception {
        for (PrMkdpGoodsInfo prMkdpGoodsInfo : updateList) {
            prMkdpGoodsInfoMapper.updatePrMkdpGoodsInfoList(prMkdpGoodsInfo);
        }
    }

    @Override
    public void deletePrMkdpGoodsInfoList(List<PrMkdpGoodsInfo> deleteList) throws Exception {
        for (PrMkdpGoodsInfo prMkdpGoodsInfo : deleteList) {
            prMkdpGoodsInfoMapper.deletePrMkdpGoodsInfoList(prMkdpGoodsInfo);
        }
    }

    @Override
    public int getSoldOutCount(PrMkdpGoodsInfoRequest prMkdpGoodsInfoRequest) throws Exception {
        return prMkdpGoodsInfoMapper.getSoldOutCount(prMkdpGoodsInfoRequest);
    }
}
