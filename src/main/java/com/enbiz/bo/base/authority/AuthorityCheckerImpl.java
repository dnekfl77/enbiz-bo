package com.enbiz.bo.base.authority;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Component;

import com.enbiz.bo.app.dto.request.login.LoginRequest;
import com.enbiz.bo.app.service.common.AdminGroupService;
import com.enbiz.bo.base.properties.EnvironmentsConfig;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class AuthorityCheckerImpl implements AuthorityChecker {
    @Autowired
    private AdminGroupService adminGroupService;
    
    @Autowired
    private EnvironmentsConfig environmentsConfig;
    
    public boolean canAccess(LoginRequest loginRequest, String uri, String queryParam) throws Exception {
    	
    	String enableAuthorityCheck = environmentsConfig.get("enableAuthorityCheck");

        if (loginRequest.getLoginId() == null) {
            return false;
        }

        if (!Boolean.parseBoolean(enableAuthorityCheck)) {
            return true;
        }
        
        if (queryParam == null) {
        	loginRequest.setCaloUrl(uri);
        } else {
        	log.debug("queryParam {}", queryParam);
        	
        	//pageType 이라는 파라미터가 있을경우 권한체크 할때 같이 넘겨줘서 체크함.
        	int pageTypeStartIndex = queryParam.indexOf("pageType");
    		if (pageTypeStartIndex > -1) {
    			int pageTypeEndIndex= queryParam.indexOf("&", pageTypeStartIndex) == -1 ? queryParam.length() : queryParam.indexOf("&", pageTypeStartIndex);
    			loginRequest.setCaloUrl(uri+"?"+queryParam.substring(pageTypeStartIndex, pageTypeEndIndex));
    		} else {
    			loginRequest.setCaloUrl(uri);
    		}
        }
        
        int adminGroupUrlCount = getAdminGroupService().getAdminGroups(loginRequest);

        boolean canAccess = adminGroupUrlCount > 0;
        return canAccess;
    }

    public AdminGroupService getAdminGroupService() {
        return adminGroupService;
    }

    public void setAdminGroupService(AdminGroupService adminGroupService) {
        this.adminGroupService = adminGroupService;
    }
}
