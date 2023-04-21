$.namespace("vendorDeliveryPolicyGrid.eventhandler");
vendorDeliveryPolicyGrid.eventhandler = {
    // [namespace]provider.js 외 사용자 정의
    settingCustomGrid : function() {
//        var layout1;
//
//        layout1 = [
//            'deliPolcNo'
//            ,'entrNo'
//            ,'dlexTypCd'
//            ,'stdAmt'
//            ,'dlexAmt'
//            ,{
//                name : 'addDeliveryAmtGroup'
//                ,direction: 'horizontal'
//                ,hideChildHeaders: false
//                , items: [
//                    'ferryRgnDlexAmt'
//                    ,'jejuDlex'
//                    ,'jejuFerryRgnDlexAmt'
//                ]
//                ,header: {
//                    text: '추가배송비'
//                }
//            }
//            ,'rtnAmt'
//            ,'useYn'
//            ,'sysModId'
//            ,'sysModDtm'
//        ];
//        var _self = this;
//
//        this.grid.header.height = 50;
////        this.grid.displayOptions.rowHeight = 50;
//        this.grid.setColumnLayout(layout1);
    }
    // 그리드 저장시 데이터 검증!!
    ,validateInVendorDeliveryPolicyGrid : function(grid) {
        //수정중인 그리드 상태 commit(즉, 강제완료)으로 한다.
        grid.commit();

        var _dataResource = grid.getDataSource();

        var checkedIndexArr = grid.getCheckedRows();
        var deletedDataArr = _dataResource.getStateRows('deleted');

        var rows = grid.getItemCount();
        var sourceData = "";
        var targetData = "";
        var boolExit = false;

        if (checkedIndexArr.length == 0) {
            alert(_msg.noSelectedDataMsg);
            return false;
        } else {
            for(var chkRow = 0; chkRow < checkedIndexArr.length; chkRow++) {
                //한 건이라도 존재하면 Exit!!
                if (boolExit) break;

                //삭제대상은 skip.
                if(deletedDataArr.includes(checkedIndexArr[chkRow]) ) continue;

                var data = grid.getDataSource().getJsonRow(checkedIndexArr[chkRow]);

                switch (data.dlexTypCd) {
                    case "10":
                    case "30":
                        sourceData = data.entrNo + data.dlexTypCd + data.stdAmt;
                        break;
                    case "20":
                        sourceData = data.entrNo + data.dlexTypCd + data.dlexAmt;
                        break;
                    default:
                        sourceData = "";
                        break;
                }

                if (sourceData == "") continue;

                targetData = "";

                for (var tgtRow=0; tgtRow < rows; tgtRow++) {
                    if (tgtRow == chkRow) continue;

                    switch (grid.getValue(tgtRow, "dlexTypCd")) {
                    case "10":
                    case "30":
                        targetData = grid.getValue(tgtRow, "entrNo") + grid.getValue(tgtRow, "dlexTypCd") + grid.getValue(tgtRow,"stdAmt");
                        break;
                    case "20":
                        targetData = grid.getValue(tgtRow, "entrNo") + grid.getValue(tgtRow, "dlexTypCd") + grid.getValue(tgtRow,"dlexAmt");
                        break;
                    default:
                        targetData = "";
                        continue;
                        break;
                    }
                    if (sourceData === targetData) {
                        alert('동일 협력사에 배송비 정책이 중복이 발생하였습니다. 내역 확인 후 다시 시도하세요.\n' +
                                ' [ ' + grid.getValue(tgtRow, "entrNm") +' ]');
                        boolExit = true;
                        break;
                    }
                }
            }
        }

        //동일 협력사에 배송비 정책이 중복 발생! 저장 불가!!
        if (boolExit) return false;

        return true;
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
    //그리드 데이터 조회
    ,onSearch : function(pageIdx, isOpenToast){
        this.grid.cancel();
        var _self = this;

        pageIdx = !pageIdx ? 0 : pageIdx;

        var pagingFunc = function(pageIdx){return _self.onSearch(pageIdx, false);};

        this.controller.doQuery(this, '', pageIdx, pagingFunc, null, isOpenToast);
    }
    //그리드 저장
    ,onSave : function() {
        var grid = this.grid;
//        var result = false;
//        var dataResource = grid.getDataSource();
//        var gridCount = dataResource.getRowCount();
//
//        grid.commit();
//
//        for(var i = 0; i < gridCount; i++){
//            if(grid.isCheckedItem(i)){
//                result = true;
//                break;
//            }
//        }
//
//        if(!result){
//            alert(_msg.noSelectedDataMsg);
//            return;
//        }
//
//        if(this.validateInVendorDeliveryPolicyGrid(grid)) {
//            if (confirm(_msg.confirmSaveMsg) != true) {
//                return;
//            }
//            this.controller.doSave(this, grid.localId);
//        }
//
        this.controller.doSave(this, grid.localId);
    }
    //그리드 추가 -- 검색 결과에서 선택하여 그리드 반영
    ,onAddPopup : function() {
        var pin = {
              argSelectType: '1'
            , argEntrGbCd: '10'
            , argTrdStatCd: ''
        };
        var POP_DATA = {
            url: _baseUrl + 'popup/enteranceMgmt.etEntrBaseListPopup.do'
            , winName: 'etEntrListPopup'
            , title: '협력사조회'
            , _title: '협력사조회'
            , left: 20
            , top: 20
            , width: 741
            , height: 700
            , scrollbars: false
            , autoresize: false
        };
        //협력사 조회 callback
        var popupEtEntrListCallback = function(e) {
            vendorDeliveryPolicyGrid.eventhandler.grid.commit();

            var resultData = JSON.parse(e.data);
            var partnerContents = resultData[0]; // 중복을 제거한 값

            //내려온 것 중에 필요없는 것 삭제!!
            delete partnerContents.entrGbCd;
            delete partnerContents.trdStatCd;

            if (partnerContents == null || partnerContents == undefined) {
                alert('적용할 데이터가 없습니다. 다시 선택후 적용해 주세요.');
                return false;
            }

//            vendorDeliveryPolicyGrid.eventhandler.grid.getDataSource().insertRow(0, partnerContents);
            this.common.RealGridEventHandler.onAdd(vendorDeliveryPolicyGrid.eventhandler.grid, partnerContents);
        };

        popCommon(pin, POP_DATA, popupEtEntrListCallback);
    }
    // 버튼 이벤트 바인딩
    ,bindButtonEvent : function(){
        var _self = this;
        
        $('#btn_search').click(function() {
            _self.onSearch(0,true);
        });

        $('#btn_init').click(function() {
            $('#vendorDeliveryPolicyGridForm')[0].reset();
        });

        $('#btn_grid_add_popup').click(function() {
            _self.onAddPopup();
        });
        
        $('#btn_grid_remove').click(function() {
            _self.grid.cancel();
            _self.onDelete();
        });

        $("#btn_grid_reset").click(function() {
            _self.onReset();
        });

        $('#btn_grid_save').click(function() {
            _self.onSave();
        });
        
        $("#vendorDeliveryPolicyGridForm").keypress(function (e){
            if (e.which == 13){
                $('#btn_search').click();
                window.event.returnValue=false;
            }
         });

    }
    // Grid 이벤트 처리
    ,gridEvent : {
        afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            openToast(data.message);
            
            if(data.succeeded){
                eventHandler.onSearch(0, false);
           }
        }
        ,onEditRowChanged: function (grid, itemIndex, dataRow, field, oldValue, newValue) {
            var sourceData = "";
            var targetData = "";

            var rows = grid.getItemCount();

            switch (grid.getValue(dataRow, "dlexTypCd")) {
                case "10":
                case "30":
                    sourceData = grid.getValue(dataRow, 'entrNo') + grid.getValue(dataRow, 'dlexTypCd')
                                + grid.getValue(dataRow, 'stdAmt');
                    break;
                case "20":
                    sourceData = grid.getValue(dataRow, 'entrNo') + grid.getValue(dataRow, 'dlexTypCd')
                                                                 + grid.getValue(dataRow, 'dlexAmt');
                    break;
                default:
                    sourceData = "";
                    break;
            }

            for (var tgtRow=0; tgtRow < rows; tgtRow++) {
                if (tgtRow == dataRow) continue;

                switch (grid.getValue(tgtRow, "dlexTypCd")) {
                case "10":
                case "30":
                    targetData = grid.getValue(tgtRow, "entrNo") + grid.getValue(tgtRow, "dlexTypCd") + grid.getValue(tgtRow,"stdAmt");
                    break;
                case "20":
                    targetData = grid.getValue(tgtRow, "entrNo") + grid.getValue(tgtRow, "dlexTypCd") + grid.getValue(tgtRow,"dlexAmt");
                    break;
                default:
                    targetData = "";
                    continue;
                    break;
                }
                if (sourceData === targetData) {
                    alert('동일 협력사 배송비 정책이 중복이 발생하였습니다. 내역 확인 후 다시 시도하세요.\n' +
                            ' [ ' + grid.getValue(tgtRow, "entrNm") +' ]');
                    grid.cancel();
                    break;
                }
            }
        }
        , onEditCommit : function (grid, index, oldValue, newValue) {
            if (index.fieldName === 'dlexTypCd') {
                grid.setValue(index.dataRow, 'stdAmt', 0);
                grid.setValue(index.dataRow, 'dlexAmt', 0);
                grid.setValue(index.dataRow, 'ferryRgnDlexAmt', 0);
                grid.setValue(index.dataRow, 'jejuDlex', 0);
                grid.setValue(index.dataRow, 'jejuFerryRgnDlexAmt', 0);
                grid.setValue(index.dataRow, 'rtnAmt', 0);
            }
        }
    }
    // 초기화
    ,initialize : function() {
        this.settingCustomGrid();
        this.bindButtonEvent();
    }

};