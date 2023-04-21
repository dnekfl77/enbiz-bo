$.namespace("standardCategoryGoodsGrid.eventhandler");
standardCategoryGoodsGrid.eventhandler = {
    // 초기화
    init : function ( stdCtgNo ) {
        this.stdCtgNo = stdCtgNo;
        this.onSearch(0, true);
    }

    , onSearch : function (pageNo, isOpenToast) {
        this.grid.cancel();
        this.grid.setEditOptions({ editable: false });

        var extraQueryString = '&stdCtgNo=' + this.stdCtgNo;

        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function (pageNo) { return this.onSearch(pageNo, false); };

        this.controller.doQuery(this, extraQueryString, pageNo, pageFunc, null, isOpenToast);
    }
}