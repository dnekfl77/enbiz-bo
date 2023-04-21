$.namespace("customerDeliveryGrid.eventhandler");
customerDeliveryGrid.eventhandler = {
    loadingData : function() {
        //그리드 데이터 세팅
        this.controller.callbackForCommonSuccess(this.grid, _etMbrDlvpInfoList);
    }
    ,onSearch : function(pageIdx) {
        this.grid.cancel();

        pageIdx = !pageIdx ? 0 : pageIdx;

        var _self = this;
        var pagingFunc = function(pageIdx) {
            return _self.onSearch(pageIdx);
        };

        var entrNo = $('#argEntrNo').val();
        var entrNm = $('#argEntrNm').val();

        var extraQueryString;

        extraQueryString = 'entrNo='+ entrNo + '&entrNm='+ entrNm;
        this.controller.doQuery(this, extraQueryString, pageIdx, pagingFunc);
    }
    //그리드 행추가
    ,onAdd : function() {
        var _self = this;
        var _grid = _self.grid;

        _grid.commit();

        var _defaultValues = { useYn:'Y' };

        _self.defaultHandler.onAdd(_grid, _defaultValues);
    }
    //그리드 행삭제
    ,onDelete : function() {
        var _self = this;
        var _grid = _self.grid;

        var _checkedItems = _grid.getCheckedItems();
        if (_checkedItems.length == 0) {
            alert(_msg.noSelectedDataMsg);
            return;
        }

        _self.defaultHandler.onDelete(_grid);
    }
    //그리드 적용취소
    ,onReset : function() {
        var _self = this;
        var _grid = _self.grid;

        _self.defaultHandler.onCancel(_grid);
    }
    // [namespace]provider.js 외 사용자 정의
    ,settingCustomGrid : function() {
        var _self = this;

        _self.grid.setColumnProperty("zipNo", "buttonVisibility", "always");
    }
    ,popupZipNoList : function(grid, itemIndex, column){
        var pin = {
            // argSelectType: $("#zipNoListForm [name='argSelectType']:checked").val()
            argSelectType: 1
        };
        var POP_DATA = {
            url: _baseUrl + 'popup/zipCodeMgmtPopup.zipNoListPopup.do'
            , winName: 'zipNoListPopup'
            , title: '우편번호 조회'
            , _title: '우편번호 조회'
            , left: 20
            , top: 20
            , width: 660
            , height: 800
            , scrollbars: false
            , autoresize: false
        };
        var callback = function(e) {
            var zipObj = [];
            zipObj = JSON.parse(e.data);

            grid.getDataSource().setValue(grid.getCurrent().itemIndex, "zipNoSeq", zipObj[0].zipNoSeq);
            grid.getDataSource().setValue(grid.getCurrent().itemIndex, "zipNo", zipObj[0].zipNo);
            grid.getDataSource().setValue(grid.getCurrent().itemIndex, "zipAddr", zipObj[0].address);
        };
        popCommon(pin, POP_DATA, callback);
    }

    ,bindButtonEvent: function () {
        var _self = this;

        $('#btn_customerDeliveryGrid_add').click(function() {
            _self.onAdd();
        });

        $('#btn_customerDeliveryGrid_remove').click(function() {
            _self.grid.cancel();
            _self.onDelete();
        });
        $("#btn_customerDeliveryGrid_reset").click(function() {
            _self.onReset();
        });

        _self.grid.onCellButtonClicked = function (grid, itemIndex, column) {
            grid.commit();
            _self.popupZipNoList(grid, itemIndex, column);
        };
    }

    // 초기화
    ,initialize : function() {
        this.settingCustomGrid();
        this.loadingData();
        this.bindButtonEvent();
    }

    ,gridEvent : {
        onEditRowChanged: function (grid, itemIndex, dataRow, field, oldValue, newValue) {
            //baseDlvpYn
            if (field === 5) {
                if (newValue === 'Y') {
                    for(var row=itemIndex+1; row < grid.getItemCount(); row++) {
                        if (grid.getValue(row, field) === 'Y') {
                            alert('이미 기본 배송지가 있습니다.' +
                                    '\n현재 배송지를 기본배송지로 하고 기존 배송지는 추가배송지로 설정하겠습니다.');
                            grid.commit();
                            grid.checkRow(row);
                            grid.setValue(row, field, 'N');
                        }
                    }
                }
            }
        }
    }
};