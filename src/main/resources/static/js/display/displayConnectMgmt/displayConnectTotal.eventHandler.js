$.namespace("displayConnectTotal.eventhandler");
displayConnectTotal.eventhandler = {

    init : function () {
        this.bindTreeButtonEvent();
    },

    bindTreeButtonEvent : function(){
        var self = this;

        // 트리 상단 조회 조건 (사이트)
        $("#tree_siteNo").change(function() {
            connectCategoryTree.eventhandler.init();
        });

        // 트리 상단 조회 조건 (매장)
        $("#tree_shopTypCd").change(function() {
            connectCategoryTree.eventhandler.init();
        });

        // 트리 상단 조회 조건 (사용/전시 타입)
        $("#tree_type").change(function() {
            connectCategoryTree.eventhandler.init();
        });

    }

};