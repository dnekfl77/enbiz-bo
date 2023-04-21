$.namespace("transferTypeGrid.eventhandler");
transferTypeGrid.eventhandler = {

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

        // 이관유형템플릿 클릭 시 이관유형템플릿 레이어 팝업창 호출
        this.grid.onCellClicked = function(grid,clickData){
            var currentData = self.grid.getDataSource().getJsonRow(clickData.dataRow);
            if(clickData.cellType != "header") {
                if(clickData.column ==='tmplMemoYn'){
                    var csMvotTypNm = currentData.csMvotTypNm;
                    if(csMvotTypNm === undefined){
                        csMvotTypNm = '';
                    }
                    $('#sub-title').text(csMvotTypNm);
                    $('#memo-text').val(currentData.tmplMemo);
                    layerPopOpen('layerPop-memo');
                }
            }
        };
    },

    bindButtonEvent : function(){
        var self = this;

        $('#btn_init').click(function(){
            $('#transferTypeGridForm')[0].reset();
        });

        $('#btn_search').click(function(){
            self.onSearch(0,true);
        });

        $('#memo-cancel').click(function(){
            layerPopClose('layerPop-memo');
        });

        $('#memo-apply').click(function(){
            self.grid.commit();
            var memoText = $('#memo-text').val().trim();
            var idx = self.grid.getCurrent().dataRow;

            if( byteCheck( memoText ) > 4000 ){ // 이관유형템플릿을 입력한 경우 byte 검사
                alert(msg.tmplMemoCheck);
                return;
            }

            if(memoText.length > 0){
                self.grid.getDataSource().setValue(idx, "tmplMemoYn", 'Y');
            }else{
                self.grid.getDataSource().setValue(idx, "tmplMemoYn", 'N');
            }
            self.grid.getDataSource().setValue(idx, "tmplMemo", memoText);
            layerPopClose('layerPop-memo');
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
        var defaultValues = { useYn : 'Y', tmplMemoYn : 'N' };
        this.defaultHandler.onAdd(grid, defaultValues);
    },

    onReset : function() {
        this.defaultHandler.onCancel(this.grid);
    },

    onSave : function() {
        var grid = this.grid;
        grid.commit();
        var result = false;

        // 이관유형명 중복확인
        var overlap = false;
        var overlapList = [];
        var overlapListIdx = [];

        var dataResource = grid.getDataSource();
        for(var i = 0; i<grid.getItemCount(); i++){
            if(grid.getDataSource().getRowState(i) == "created") {
                overlapList.push(grid.getValue(i,"csMvotTypNm"));
                overlapListIdx.push(i);
                grid.checkRow(i);
            } else if(grid.getDataSource().getRowState(i) == "updated") {
                grid.checkRow(i);
            }
        }

        for(var i = 0; i<grid.getItemCount(); i++){
            if(!overlap) { // 중복확인
                if(grid.getValue(i,"csMvotTypNm") == null || grid.getValue(i,"csMvotTypNm") === ''){ // 이관유형명
                    alert(msg.csMvotTypNmCheck);
                    return;
                } else if( byteCheck( grid.getValue(i,"csMvotTypNm") ) > 100 ){ // 이관유형명을 입력한 경우 byte 검사
                    alert(msg.csMvotTypNmCheck2);
                    return;
                } else if(grid.getValue(i,"csTypDesc") != null && grid.getValue(i,"csTypDesc") != ''){ // 이관유형설명을 입력한 경우 byte 검사
                    if( byteCheck( grid.getValue(i,"csTypDesc") ) > 200 ){
                        alert(msg.csTypDescCheck);
                        return;
                    }
                }

                if(grid.getDataSource().getProvider().getRowState(i) == "created") {
                    // 이관유형명의 중복여부 확인

                    // create 행들의 업무이관 유형명과 중복검사
                    for(var j=0; j<overlapList.length; j++) {
                       if( overlapListIdx[j] != i && overlapList[j] == grid.getValue(i,"csMvotTypNm")) {
                            alert(msg.csMvotTypNmCheck3);
                            overlap = true;
                            return;
                       }
                    }

                    // 현재 디비에 있는 업무이관 유형명과 중복검사
                    var param = '&csMvotTypNm=' + grid.getValue(i,"csMvotTypNm");
                    common.Ajax.sendRequestSync(
                         "POST"
                         ,_baseUrl + "customerservice/transferTypeMgmt.checkCsMvotTypeName.do"
                         ,param
                         ,function(obj) {
                              if (!obj.succeeded) { // 중복인 경우
                                    alert(msg.csMvotTypNmCheck3);
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