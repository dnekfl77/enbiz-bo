package com.enbiz.bo.base.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.firewall.DefaultHttpFirewall;
import org.springframework.security.web.firewall.HttpFirewall;

import com.enbiz.bo.app.constant.Constants;
import com.enbiz.bo.app.service.login.LoginService;
import com.enbiz.bo.base.properties.DomainsConfig;
import com.enbiz.bo.base.security.AdminAuthenticationProvider;
import com.enbiz.bo.base.security.AdminLogoutSuccessHandler;
import com.enbiz.bo.base.security.AjaxAwareAuthenticationEntryPoint;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
    private LoginService loginService;
	
	@Autowired
	private DomainsConfig domainsConfig;
	
    @Autowired
    private AuthenticationSuccessHandler adminAuthenticationSuccessHandler;

    @Autowired
    private AdminLogoutSuccessHandler adminLogoutSuccessHandler;
    
    @Autowired
    private AuthenticationFailureHandler adminAuthenticationFailureHandler;

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.authenticationProvider(authenticationProvider());
	}
	
	@Bean
    public AuthenticationProvider authenticationProvider() {
        return new AdminAuthenticationProvider(loginService,domainsConfig);
    }
	
	/**인증되지 않은 요청중 AJAX요청일 경우 401으로 응답
     * @param url
     * @return
     */
    private AjaxAwareAuthenticationEntryPoint ajaxAwareAuthenticationEntryPoint(String url) {
    	return new AjaxAwareAuthenticationEntryPoint(url);
    }

//	@Bean(name = BeanIds.AUTHENTICATION_MANAGER)
//	@Override
//	public AuthenticationManager authenticationManagerBean() throws Exception {
//		return super.authenticationManagerBean();
//	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable()
			.headers()
				.frameOptions().disable()
			.and()
			.authorizeRequests()
            	.antMatchers(Constants.GUEST_URIS).permitAll()
            	.anyRequest().authenticated()
			.and()
			.formLogin()
				.loginPage("/loginForm.do")
				.loginProcessingUrl("/login.do")
				.usernameParameter("loginId")
				.passwordParameter("password")
				.successHandler(adminAuthenticationSuccessHandler)
				.failureHandler(adminAuthenticationFailureHandler)
				//.defaultSuccessUrl("/main.do", true)
                .permitAll()
            .and()
            .logout()
            	.logoutUrl("/logout.do")
            	.logoutSuccessUrl("/index.do")
            	.logoutSuccessHandler(adminLogoutSuccessHandler)
            	.permitAll()
            .and().exceptionHandling().authenticationEntryPoint(ajaxAwareAuthenticationEntryPoint("/loginForm.do"))
            	;
//          .and()
//			.requestCache()
//				.disable();
//            .and()
            	
	}

	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring().antMatchers("/static/css/**", "/static/js/**", "/static/img/**")
			.and()
			.httpFirewall(defaultHttpFirewall());
	}

	@Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
	
    @Bean
    public HttpFirewall defaultHttpFirewall() {
        return new DefaultHttpFirewall();
    }
        
}
