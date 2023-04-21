$.namespace("obTypeGrid.eventhandler");
obTypeGrid.eventhandler = {

    // 초기화
    init : function () {
        this.gridLoading();
        this.bindButtonEvent();
    },

    gridLoading : function(){
        var self = this;

        // 선택된 그리드 배경색 넣기
		this.grid.onItemChecked = function(grid, itemIndex, checked) {
          grid.setCurrent({ itemIndex: itemIndex })
        }
        this.grid.setRowStyleCallback(function(grid, item, fixed) {
          if (item.checked) {
            return 'rg-trcol_active'
          }
        });

        // 그리드 셀 내의 버튼 클릭 시
        self.grid.onCellButtonClicked = function (grid, itemIndex, column) {
            grid.commit();
            self.popupZipNoList(grid, itemIndex, column);
        };
    },

    bindButtonEvent : function(){
        var self = this;

        $('#btn_init').click(function(){
            $('#obTypeGridForm')[0].reset();
        });

        $('#btn_search').click(function(){
            self.onSearch(0,true);
        });

        $('#btn_grid_add').click(function(){
            self.onAdd();
        });

        $('#btn_grid_reset').click(function(){
            self.onReset();
        });

        $('#btn_grid_save').click(function(){
            self.onSave();
        });

    },

    popupZipNoList : function(grid, itemIndex, column){
        var pin = {
            custCnslGbCd : '20' // 상담구분 : OB
        };
        var POP_DATA = {
            url: '/customerservice/counselingTypeMgmt.counselingTypeListPopup.do'
            , winName: 'popupCnslTypeListPopup'
            , title: '상담유형조회 팝업'
            , _title: '상담유형조회 팝업'
            , left: 20
            , top: 20
            , width: 800
            , height: 670
            , scrollbars: false
            , autoresize: false
        };
        var callback = function(e) {
            var obj = [];
            obj = JSON.parse(e.data);
            grid.getDataSource().setValue(grid.getCurrent().dataRow, "cnslTypNm", obj[0].cnslLrgTypNm + " > " + obj[0].cnslMidTypNm + " > " + obj[0].cnslSmlTypNm );
            grid.getDataSource().setValue(grid.getCurrent().dataRow, "cnslTypNo", obj[0].cnslTypNo);
        };
        popCommon(pin, POP_DATA, callback);
    },

    onSearch : function(pageIdx,isOpenToast){
        this.grid.cancel();
        pageIdx = !pageIdx ? 0 : pageIdx;
        var self = this;
        var pagingFunc = function(pageIdx){return self.onSearch(pageIdx);};
        this.controller.doQuery(this, "", pageIdx, pagingFunc,false,isOpenToast);
    },

    // 행추가
    onAdd : function () {
        var grid = this.grid;
        grid.commit(); // 편집중인 행 편집 완료 처리
        var defaultValues = { useYn : 'Y' };
        this.defaultHandler.onAdd(grid, defaultValues);
    },

    onReset : function() {
        this.defaultHandler.onCancel(this.grid);
    },

    onSave : function() {
        var grid = this.grid;
        grid.commit();
        var result = false;

        // OB유형명 중복확인
        var overlap = false;
        var overlapList = [];
        var overlapListIdx = [];

        var dataResource = grid.getDataSource();
        for(var i = 0; i<grid.getItemCount(); i++){
            if(grid.getDataSource().getRowState(i) == "created") {
                overlapList.push(grid.getValue(i,"obTypNm"));
                overlapListIdx.push(i);
                grid.checkRow(i);
            } else if(grid.getDataSource().getRowState(i) == "updated") {
                grid.checkRow(i);
            }
        }

        for(var i = 0; i<grid.getItemCount(); i++){
            if(!overlap) { // 중복확인
                if(grid.getValue(i,"obTypNm") == null || grid.getValue(i,"obTypNm") === ''){ // OB유형명
                    alert(msg.obTypNmCheck);
                    return;
                } else if( byteCheck( grid.getValue(i,"obTypNm") ) > 100 ){ // OB유형명을 입력한 경우 byte 검사
                    alert(msg.obTypNmCheck2);
                    return;
                } else if(grid.getValue(i,"obTypDesc") != null && grid.getValue(i,"obTypDesc") != ''){ // OB유형설명을 입력한 경우 byte 검사
                    if( byteCheck( grid.getValue(i,"obTypDesc") ) > 200 ){
                        alert(msg.obTypDescCheck);
                        return;
                    }
                } else if(grid.getValue(i,"cnslTypNo") == null || grid.getValue(i,"cnslTypNo") === ''){ // 상담유형번호
                    alert(msg.cnslTypNo);
                    return;
                }

                if(grid.getDataSource().getProvider().getRowState(i) == "created") {
                    // OB유형명의 중복여부 확인

                    // create 행들의 OB유형명과 중복검사
                    for(var j=0; j<overlapList.length; j++) {
                       if( overlapListIdx[j] != i && overlapList[j] == grid.getValue(i,"obTypNm")) {
                            alert(msg.obTypNmCheck3);
                            overlap = true;
                            return;
                       }
                    }

                    // 현재 디비에 있는 OB유형명과 중복검사
                    var param = '&obTypNm=' + grid.getValue(i,"obTypNm");
                    common.Ajax.sendRequestSync(
                         "POST"
                         ,_baseUrl + "customerservice/obTypeMgmt.checkObTypeName.do"
                         ,param
                         ,function(obj) {
                              if (!obj.succeeded) { // 중복인 경우
                                    alert(msg.obTypNmCheck3);
                                    overlap = true;
                                    return;
                              }
                         }
                    );
                }

                if(grid.isCheckedItem(i)){
                    result = true;
                }

            }
        }

        if(!overlap) { // 중복이 아닌 경우
            if(!result){
                alert(msg.gridNoSelected);
                return ;
            }

            this.controller.doSave(this, grid.localId);
        }
    },

    gridEvent : {
        // 조회 완료 후 CallBack 함수
        afterQuerySuccess : function (grid, data) {
            //검색 결과 없을 경우
            if (data.payloads.length == 0) {
                alert(msg.searchEmpty);
                if (localStorage.alertifyExists === 'true') {
                    localStorage.alertifyExists = 'false';
                }
            }
        },

        // 저장 완료 후 콜백함수
        afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            openToast(data.message);
            if(data.succeeded){
                eventHandler.onSearch(0);
            }
        }
    }
};