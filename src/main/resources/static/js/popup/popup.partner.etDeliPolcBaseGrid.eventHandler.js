$.namespace('etDeliPolcBaseGrid.eventhandler');
etDeliPolcBaseGrid.eventhandler = {
    // 초기화
    initialize : function() {
        this.parametersCheck();
        this.settingCustomGrid();
        this.loadingData();
        this.bindButtonEvent();
    }
    // argMode : 선택구분 ( C : 등록, RU : 상세조회 및 수정 )
    ,parametersCheck : function() {
        if (typeof _parameterMode == 'undefined' || _parameterMode == null || _parameterMode == '') {
            alert(_modeCheckMessage);
            return false;
        }
    }
    // [namespace]provider.js 외 사용자 정의
    ,settingCustomGrid : function() {
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
    ,loadingData : function() {
        if (_parameterMode === 'U') {
            //그리드 데이터 세팅
            this.controller.callbackForCommonSuccess(this.grid, _etDeliPolcBaseList);
        }
    }
    // 버튼 이벤트 바인딩
    ,bindButtonEvent : function(){
        var _self = this;

        $('#btn_etdelipolcbase_grid_add').click(function() {
            _self.onAdd();
        });
        
        $('#btn_etdelipolcbase_grid_remove').click(function() {
            _self.grid.cancel();
            _self.onDelete();
        });

        $('#btn_etdelipolcbase_grid_reset').click(function() {
            _self.onReset();
        });
    },
    // Grid 이벤트 처리
    gridEvent : {
        afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            console.log(data);
            if(data.succeeded){
                window.close();
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
/*
                //그리드의 기준금액 부터 제주도(도서산간)까지 반복해서 설정
                var colData = ['stdAmt','dlexAmt','ferryRgnDlexAmt','jejuDlex','jejuFerryRgnDlexAmt'];
                for (var i=0; i < colData.length; i++) {
                    switch (colData[i]) {
                    case 'stdAmt':
                        grid.setColumnProperty(colData[i], 'styleCallback', function(grid, dataCell) {
                            if (index.dataRow != grid.getCurrent().itemIndex) return;
                            switch (newValue) {
                            //전체 입력불가
                            case '10':
                                return {editable: false}
                                break;
                            case '20':
                                return {editable: false}
                                break;
                            case '30':
                                return {editable: true}
                                break;
                            default:
                                return {editable: true}
                                break;
                            }
                        });
                        break;
                    default:
                        grid.setColumnProperty(colData[i], 'styleCallback', function(grid, dataCell) {
                            if (index.dataRow != grid.getCurrent().itemIndex) return;
                            switch (newValue) {
                            //전체 입력불가
                            case '10':
                                return {editable: false}
                                break;
                            case '20':
                                return {editable: true}
                                break;
                            case '30':
                                return {editable: true}
                                break;
                            default:
                                return {editable: true}
                                break;
                            }
                        });
                        break;
                    }
                }
*/
            }
        }
    },
    //그리드 행추가
    onAdd : function() {
        var _self = this;
        var _grid = _self.grid;
        
        _grid.commit();
        
        var _defaultValues = { useYn : 'Y' };
        
        _self.defaultHandler.onAdd(_grid, _defaultValues);
    }, 
    //그리드 행삭제
    onDelete : function() {
        var _self = this;
        var _grid = _self.grid;
        
        var _checkedItems = _grid.getCheckedItems();
        if (_checkedItems.length == 0) {
            alert(_removeRowValidMessage);
            return; 
        }
        
        _self.defaultHandler.onDelete(_grid);
    }, 
    //그리드 적용취소
    onReset : function() {
        var _self = this;
        var _grid = _self.grid;

        _self.defaultHandler.onCancel(_grid);
    },
    //그리드 데이터 조회
    onSearch : function(pageIdx){
        this.grid.cancel();
        var _self = this;

        pageIdx = !pageIdx ? 0 : pageIdx;

        var pagingFunc = function(pageIdx){return _self.onSearch(pageIdx);};

        this.controller.doQuery(this, '', pageIdx, pagingFunc);
    }
};