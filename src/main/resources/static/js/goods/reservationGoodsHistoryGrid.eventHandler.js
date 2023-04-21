$.namespace("reservationGoodsHistoryGrid.eventhandler");
reservationGoodsHistoryGrid.eventhandler = {
    init : function () {
        this.gridSetting();
        this.onSearch();
        this.bindButtonEvent();
    },
    gridSetting : function(){
        this.grid.setEditOptions({ editable: false });
    },
    onSearch : function(){
        var extraQueryString = 'goodsNo=' + goodsInfo.goodsNo;
        this.controller.doQuery(this,extraQueryString,0,null, null, false);
    },
    bindButtonEvent : function(){
        $('#btn_close').click( function(){
            window.close();
        });
    }
};
