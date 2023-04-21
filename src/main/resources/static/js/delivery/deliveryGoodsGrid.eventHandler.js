$.namespace("deliveryGoodsGrid.eventhandler");
deliveryGoodsGrid.eventhandler = {

    init : function () {
        this.onSearch(0);
        this.gridLoading();
        this.bindButtonEvent();
    },

    gridLoading : function(){
        this.grid.setEditOptions({ editable: false }) // 그리드 수정불가
    },

    bindButtonEvent : function(){
        $('#btn_popup_cancel').click(function() {
             window.close();
        });
    },

    onSearch : function(pageNo){
        var that = this;
        this.grid.cancel();

        var ordNo = $('#ordNo').text().split("-");
        var param = '&ordNo=' + ordNo[0] + ordNo[1] + '&deliNo=' + $('#deliNo').text();

        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function (pageNo) { return that.onSearch(pageNo); };
        this.controller.doQuery(this, param, pageNo, pageFunc);
    }
};