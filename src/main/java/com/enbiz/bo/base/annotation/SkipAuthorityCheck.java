package com.enbiz.bo.base.annotation;


import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Controller에서 공통페이지인 경우 페이지권한 체크를 하지 않는데
 * ex) 메인페이지, 메뉴페이지
 * @author sys4u
 *
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface SkipAuthorityCheck {

}
