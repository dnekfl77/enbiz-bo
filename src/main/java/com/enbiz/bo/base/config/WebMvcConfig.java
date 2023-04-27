package com.enbiz.bo.base.config;

import java.util.List;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.enbiz.bo.base.interceptor.ControllerInterceptor;
import com.enbiz.bo.base.resolver.BaseCommonEntityAttributeResolver;
import com.enbiz.bo.base.resolver.RealgridCUDFormDataResolver;
import com.enbiz.bo.base.resolver.RealgridCUDResolver;
import com.navercorp.lucy.security.xss.servletfilter.XssEscapeServletFilter;

@Configuration
@MapperScan(basePackages = "com.enbiz.bo.app.repository")
public class WebMvcConfig implements WebMvcConfigurer {
    /*
     * 컨트롤러 공통 Interceptor 설정
     * */
    @Bean
    public ControllerInterceptor controllerInterceptor() {
        return new ControllerInterceptor();
    }

	/**
	 * lucy Xss Filter 설정
	 * @return
	 */
	@Bean
	public FilterRegistrationBean<XssEscapeServletFilter> filterRegistrationBean() {
		FilterRegistrationBean<XssEscapeServletFilter> filterRegistration = new FilterRegistrationBean<>();
		filterRegistration.setFilter(new XssEscapeServletFilter());
		filterRegistration.setOrder(1);
		filterRegistration.addUrlPatterns("/*");

		return filterRegistration;
	}

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/**", "/webjars/**")
                .addResourceLocations("classpath:/static/", "/webjars/")
                .setCachePeriod(20)
                ;
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
        argumentResolvers.add(baseCommonEntityAttributeResolver());
        argumentResolvers.add(realgridCUDFormDataResolver());
        argumentResolvers.add(realgridCUDResolver());
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(controllerInterceptor())
                .addPathPatterns("/**/*.do");
    }

    @Bean
    public HandlerMethodArgumentResolver baseCommonEntityAttributeResolver() {
        return new BaseCommonEntityAttributeResolver();
    }
    @Bean
    public HandlerMethodArgumentResolver realgridCUDFormDataResolver() {
        return new RealgridCUDFormDataResolver();
    }
    @Bean
    public HandlerMethodArgumentResolver realgridCUDResolver() {
        return new RealgridCUDResolver();
    }

}