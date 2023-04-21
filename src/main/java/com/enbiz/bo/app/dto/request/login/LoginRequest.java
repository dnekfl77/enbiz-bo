package com.enbiz.bo.app.dto.request.login;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.constraints.NotEmpty;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.enbiz.bo.app.dto.login.CurrentUser;
import com.enbiz.bo.app.dto.response.login.LoginResponse;
import com.enbiz.bo.app.dto.response.login.PrivacyPolicyInfo;
import com.enbiz.common.base.entity.BaseCommonEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest extends BaseCommonEntity implements CurrentUser, UserDetails {
	private static final long serialVersionUID = 5506000054911384599L;
	private long seq = -1L;
    @NotEmpty(message = "login.fail")
    private String loginId;             // 사용자ID
//    @NotEmpty(message = "login.fail")
    private String password;            // 비밀번호
    private String remoteAddr;          // 접속자IP
    private long lastAccessTime;        // 마지막접속일시

    private	String userGbCd;	        //사용자구분코드(UR001)
    private	String rtGrpNo;	            //권한그룹번호
    private	String jobGrpCd;	        //업무그룹코드(UR002)
    private	String ocpCd;	            //직책코드(UR003)
    private String caloUrl;             // 호출 URL
    private String sysGbCd;             // 시스템구분코드(UR005)

    private String userId;              // 사용자ID
    private String pwd;                 // 비밀번호
    private String userNm;              // 사용자명
    private String cellSctNo;           // 휴대폰구분번호
    private String cellTxnoNo;          // 휴대폰국번번호
    private String cellEndNo;           // 휴대폰끝번호
    private String pwdIniYn;            // 초기화여부

    private String sessId;              // session id

    private String tpCd;                //로그인 타입코드
    
    private List<PrivacyPolicyInfo> privacyPolicyInfoList;     //개인정보조회권한정보

    @Override
    public long getSeq() {
        return this.seq;
    }

    @Override
    public String getLoginId() {
        return this.loginId;
    }

    @Override
    public String getName() {
        return this.userNm;
    }

    @Override
    public String getRemoteAddr() {
        return this.remoteAddr;
    }

    @Override
    public long getLastAccessTime() {
        return this.lastAccessTime;
    }

    @Override
    public Map<String, Object> getPermissionToViewPersonalInfo() {
        Map permissionMap = new HashMap<String, Object>();

        if ( this.privacyPolicyInfoList == null ) return null;

        for (PrivacyPolicyInfo stIndInfoQryRtInfo : this.privacyPolicyInfoList) {
            permissionMap.put(stIndInfoQryRtInfo.getIndInfoGbCd(), stIndInfoQryRtInfo.getUseYn());
        }

        return permissionMap;
    }

    public void copyFromPersistadminUser(LoginResponse searchedLoginUser) {
        this.userId = searchedLoginUser.getUserId();
        this.loginId = searchedLoginUser.getUserId();
        this.pwd = searchedLoginUser.getPwd();
        this.password = searchedLoginUser.getPwd();
        this.userNm = searchedLoginUser.getUserNm();
        this.cellSctNo = searchedLoginUser.getCellSctNo();
        this.cellTxnoNo = searchedLoginUser.getCellTxnoNo();
        this.cellEndNo = searchedLoginUser.getCellEndNo();
        this.pwdIniYn = searchedLoginUser.getPwdIniYn();
        this.userGbCd = searchedLoginUser.getUserGbCd();	        //사용자구분코드(UR001)
        this.rtGrpNo  = searchedLoginUser.getRtGrpNo(); 	            //권한그룹번호
        this.jobGrpCd = searchedLoginUser.getJobGrpCd();	        //업무그룹코드(UR002)
        this.ocpCd = searchedLoginUser.getOcpCd();	        //조직역할코드(UR003)
        this.sysGbCd  = searchedLoginUser.getSysGbCd();              // 시스템구분코드(UR005)

        this.privacyPolicyInfoList = searchedLoginUser.getPrivacyPolicyInfoList();
    }

    @JsonIgnore
    private List<GrantedAuthority> authorities; // spring security field

    // spring security UserDetails method
	@Override
	public String getUsername() {
		return userId;
	}

    // spring security UserDetails method
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

    // spring security UserDetails method
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

    // spring security UserDetails method
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

    // spring security UserDetails method
	@Override
	public boolean isEnabled() {
		return true;
	}

}
