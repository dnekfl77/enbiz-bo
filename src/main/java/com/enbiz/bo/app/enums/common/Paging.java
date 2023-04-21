package com.enbiz.bo.app.enums.common;

/**
 * 페이징 값
 * @author 이원희
 *
 */
public enum Paging {

	ROWS_PER_PAGE_2(2),
	ROWS_PER_PAGE_4(4),
	ROWS_PER_PAGE_5(5),
	ROWS_PER_PAGE_7(7),
	ROWS_PER_PAGE_DEFAULT(10),
	PAGE_INDEX(1);

	private final int value;

    Paging(int value){
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
