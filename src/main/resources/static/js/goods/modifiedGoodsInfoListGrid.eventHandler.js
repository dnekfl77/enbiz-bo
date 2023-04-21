$.namespace('modifiedGoodsInfoListGrid.eventhandler');
modifiedGoodsInfoListGrid.eventhandler = {
    init : function () {
        this.gridSetting();
        this.goodsNo = '';
    }
    ,gridSetting : function () {
        this.grid.editOptions.editable = false;
    }
    ,getModGoodsInfo : function ( goodsNo ) {
        if ( goodsNo === '' ) { this.resetModGoodsInfo(); return; }
        if ( this.goodsNo === goodsNo && this.grid.getDataSource().getRowCount() > 0 ) return; // 반복 조회 방지
        this.goodsNo = goodsNo;
        this.onSearch( 0 , false);
    }
    ,resetModGoodsInfo : function () {
        this.grid.getDataSource().clearRows();
        this.goodsNo = '';
    }
    ,onSearch : function ( pageNo, isOpenToast ) {
        var that = this;
        var extraQueryString = 'goodsNo=' + this.goodsNo;

        that.grid.cancel();
        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function ( pageNo ) { return that.onSearch( pageNo, false ); };
        this.controller.doQuery( that, extraQueryString, pageNo, pageFunc, null, isOpenToast );
    }
}