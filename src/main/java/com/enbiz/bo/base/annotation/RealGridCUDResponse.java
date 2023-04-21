package com.enbiz.bo.base.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Controller에서 @ResponseBody 로 리턴하는 메소드의 리턴 값이 JSON Message인 경우 사용한다.
 * @author sys4u
 *
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface RealGridCUDResponse {

}
