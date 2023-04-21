$.namespace("ntcGrid.eventhandler");
ntcGrid.eventhandler = {
    bindButtonEvent : function(){

        var self = this;

        $('#btn_search').click(function() {
            self.onSearch(0,true);
        });	

        $('#btn_init').click(function() {
            $('#ntcGridForm')[0].reset();
        });

        $('#btn_grid_add_pop').click(function() {
            //self.onAdd();
            var pin = {callback_fn : "popupNotiMsgCallback", scrId : '401039'};
            var POP_DATA = {
                  url: '/system/noticeMessageMgmt.noticeMessageSaveView.do'
                , winName: 'notiMsgPopup'
                , title: '알림 메시지 등록/수정'
                , _title: '알림 메시지 등록/수정'
                , left: 20
                , top: 20
                , width: 700
                , height: 450
                , scrollbars: false
                , autoresize: false
            }
            popCommon(pin, POP_DATA, this.popupNotiMsgCallback);
        });

        $("#ntcGridForm").keypress(function (e){
            if (e.which == 13){
                $('#btn_search').click();
                window.event.returnValue=false;
            }
         });

        function popupNotiMsgCallback(e) {
            console.log("popupNotiMsgCallback", e);
        }
    },

    gridEvent : {
        afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            alert(data.message);

            if(data.succeeded){
                eventHandler.onSearch(0);
           }
        },
        onCellDblClicked(grid, clickData){
            var seq = grid.getValue(clickData.itemIndex, "notiMsgSeq");
            var pin = {notiMsgSeq : seq, callback_fn : "this.popupNotiMsgCallback", scrId : ''};
            var POP_DATA = {
                  url: '/system/noticeMessageMgmt.noticeMessageSaveView.do'
                , winName: 'notiMsgPopup'
                , title: ''
                , _title: ''
                , left: 20
                , top: 20
                , width: 700
                , height: 500
                , scrollbars: false
                , autoresize: false
            }
            popCommon(pin, POP_DATA, this.popupNotiMsgCallback);
        },
        popupNotiMsgCallback : function(e) {
            console.log("callback :: ", e.data);
        }
    },

    onAdd : function() {
        var self = this;
        var grid = self.grid;

        grid.commit();

        var defaultValues = { useYn : "Y" };

        self.defaultHandler.onAdd(grid, defaultValues);
    },

    onSearch : function(pageIdx,isOpenToast){
        this.grid.cancel();
        pageIdx = !pageIdx ? 0 : pageIdx;
        var self = this;
        var pagingFunc = function(pageIdx){return self.onSearch(pageIdx);};
        this.controller.doQuery(this, "", pageIdx, pagingFunc, false, isOpenToast);
    },

    onSave : function() {
        var grid = this.grid;
        grid.commit();
        var result = false;

        var dataResource = grid.getDataSource();
        var gridCount = dataResource.getRowCount();
        for(var i = 0; i<gridCount; i++){
            if(grid.isCheckedItem(i)){
                result = true;
                break;
            }
        }
        if(!result){
            alert(_messageNotCheckedData);
            return ;
        }
        this.controller.doSave(this, grid.localId);
    },


};