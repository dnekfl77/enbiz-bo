$.namespace("watchCustomerGrid.eventhandler");
watchCustomerGrid.eventhandler = {
    //그리드 데이터 조회
    onSearch : function(){
        this.grid.cancel();
        this.controller.doQuery(this);
    }
    // 그리드 세팅
    ,gridLoading : function () {
        var that = this;

        this.onSearch();

        //그리드 셀 체크시 색상 변경 기능 설정
        this.grid.onItemChecked = function (grid, itemIndex, checked) {
            grid.setCurrent({ itemIndex: itemIndex });
        };
        this.grid.setRowStyleCallback(function (grid, item, fixed) {
            if (item.checked) {
                return 'rg-trcol_active';
            }
        });
    }
    // 팝업 종료
    ,close : function () {
        window.close();
    }
    // 이벤트 바인딩
    ,bindButtonEvent : function () {
        var that = this;

        // 닫기 버튼 클릭 이벤트 처리
        $('#btn_popup_bottom_close').click(function () {
            that.close();
        });

        $('#btnWatchCustomerRemove').click(function () {
            var rows = that.grid.getItemCount();
            var mgrMbrNoArr = [];

            if (rows <= 0) {
                alert(_msg.noSelectedDataMsg);
                return false;
            }

            for(var row=0; row < rows; row++) {
                if (that.grid.getValue(row, "rvcDtm") === undefined ||
                        that.grid.getValue(row, "rvcDtm") === '' ||
                        that.grid.getValue(row, "rvcDtm") === null) {
                    mgrMbrNoArr.push(that.grid.getValue(row, "mgrMbrNo"));
                }
            }

            if( confirm(_msg.confirmSaveMsg) ) {
                let parameter = {
                    mgrMbrNoArray: mgrMbrNoArr
                };

                common.Ajax.sendJSONRequest(
                    "PUT",
                    _baseUrl + "customer/watchCustomerMgmt.unlockWatchCustomer.do",
                    parameter,
                    function(obj) {
                        if (obj.succeeded == true) {
                            that.close();
                        }else{
                        }
                    }
                );
            }
        });

    }
    // 초기화
    ,initialize : function () {
        this.gridLoading();
        this.bindButtonEvent();
    }
};