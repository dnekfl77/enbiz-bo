package com.enbiz.bo.app.service.customerservice;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.customerservice.InquireTypeRequest;
import com.enbiz.bo.app.dto.response.customerservice.InquireTypeResponse;
import com.enbiz.bo.app.entity.CsCustInqTypCd;
import com.enbiz.bo.app.repository.customerservice.CsCustInqTypCdMapper;
import com.enbiz.bo.app.repository.customerservice.CsCustInqTypCdTrxMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Lazy
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class InquiryTypeMgmtServiceImpl implements InquiryTypeMgmtService{
	
	private final CsCustInqTypCdMapper csCustInqTypCdMapper;
	private final CsCustInqTypCdTrxMapper csCustInqTypCdTrxMapper;

	@Override
	public List<InquireTypeResponse> getInquiryTypeLarge(InquireTypeRequest inquireTypeRequest) throws Exception {
		return csCustInqTypCdMapper.getInquiryTypeLarge(inquireTypeRequest);
	}

	@Override
	public int getInquiryTypeLCount(InquireTypeRequest inquireTypeRequest) throws Exception {
		return csCustInqTypCdMapper.getInquiryTypeLargeCount(inquireTypeRequest);
	}

	@Override
	public List<InquireTypeResponse> getInquiryTypeSmall(InquireTypeRequest inquireTypeRequest) throws Exception {
		return csCustInqTypCdMapper.getInquiryTypeSmall(inquireTypeRequest);
	}

	@Override
	public int getInquiryTypeSmallCount(InquireTypeRequest inquireTypeRequest) throws Exception {
		return csCustInqTypCdMapper.getInquiryTypeSmallCount(inquireTypeRequest);
	}

	@Override
	public List<InquireTypeResponse> getInquiryTypeSmallNoPaging(InquireTypeRequest inquireTypeRequest) throws Exception {
		return csCustInqTypCdMapper.getInquiryTypeSmallNoPaging(inquireTypeRequest);
	}

	@Override
	public void saveInquiryType(List<CsCustInqTypCd> createList, List<CsCustInqTypCd> updateList) throws Exception {
		for(CsCustInqTypCd csCustInqTypCd : createList){
			csCustInqTypCdTrxMapper.insertInquiryType(csCustInqTypCd);
        }

        for(CsCustInqTypCd csCustInqTypCd : updateList){
        	csCustInqTypCdTrxMapper.updateInquiryType(csCustInqTypCd);
        }
	}
}
