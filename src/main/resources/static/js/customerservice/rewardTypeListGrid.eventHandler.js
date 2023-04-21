$.namespace("rewardTypeListGrid.eventhandler");
rewardTypeListGrid.eventhandler = {

    // 선택된 트리 값 저장
    treeVal : {},

    // 초기화
    init : function () { // node
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

        // 보상기준설명 클릭 시 보상기준설명 레이어 팝업창 호출
        this.grid.onCellClicked = function(grid,clickData){
            var currentData = self.grid.getDataSource().getJsonRow(clickData.dataRow);
            if(clickData.cellType != "header") {
                if(clickData.column ==='cpnsStdDescYn'){
                    if(currentData.level == 2) {
                        var subtitleArray = self.treeVal.hierarchyText.split('>');
                            var smlCpnsTypNm = currentData.cpnsTypNm;
                            if(smlCpnsTypNm === undefined){
                                smlCpnsTypNm = '';
                            }
                            $('#sub-title').text('보상기준설명 : ' + subtitleArray[1] + ' > ' + smlCpnsTypNm);
                            $('#memo-text').val(currentData.cpnsStdDesc);
                            layerPopOpen('layerPop-memo');
                    }
                }
            }
        };
    },

    bindButtonEvent : function(){
        var self = this;

        $('#btn_init').click(function(){
            $('#rewardTypeGridForm')[0].reset();
        });

        $('#btn_search').click(function(){
            rewardTypeListTree.treeLoading(true);
        });

        $('#memo-cancel').click(function(){
            layerPopClose('layerPop-memo');
        });

        $('#memo-apply').click(function(){
            self.grid.commit();
            var memoText = $('#memo-text').val().trim();
            var idx = self.grid.getCurrent().dataRow;

            if( byteCheck( memoText ) > 4000 ){ // 보상기준설명을 입력한 경우 byte 검사
                alert(msg.cpnsStdDescCheck);
                return;
            }

            if(memoText.length > 0){
                self.grid.getDataSource().setValue(idx, "cpnsStdDescYn", 'Y');
            }else{
                self.grid.getDataSource().setValue(idx, "cpnsStdDescYn", 'N');
            }
            self.grid.getDataSource().setValue(idx, "cpnsStdDesc", memoText);
            layerPopClose('layerPop-memo');
        });

        $('#btn_grid_add').click(function(){
            if(self.treeVal.level >= 2){
                alert(msg.depthCheck);
                return;
            }
            self.onAdd();
        })

        $('#btn_grid_reset').click(function(){
            self.onReset();
        })

        $('#btn_grid_save').click(function(){
            if(self.treeVal.level >= 2){
                return;
            }
            self.onSave();
        })

    },

    onSearch : function(pageIdx){
        this.grid.cancel();
        pageIdx = !pageIdx ? 0 : pageIdx;
        var self = this;
        var pagingFunc = function(pageIdx){return self.onSearch(pageIdx);};
        var param =　"uprCpnsTypCd=" + self.treeVal.cpnsTypNo + "&level=" + self.treeVal.level;
        this.controller.doQuery(this, param, pageIdx, pagingFunc);
    },

    // 행추가
    onAdd : function () {
        var grid = this.grid;
        grid.commit(); // 편집중인 행 편집 완료 처리

        // 전시 순서 Max 값 구하기
        var maxDispSeq = 0;
        var thisDispSeq = 0;
        var rowCount = grid.getDataSource().getRowCount();
        for(var row = 0; row < rowCount ; row ++){
            thisDispSeq = grid.getDataSource().getValue(row, "sortSeq");
            if (maxDispSeq < thisDispSeq && thisDispSeq != 99999) { // 99999는 디폴트값
                maxDispSeq = thisDispSeq;
            }
        }
        if(maxDispSeq != 99999) { // 최대값 : 99999
            maxDispSeq = Number(maxDispSeq) + 1;
        }

        var defaultValues = {
            useYn : 'Y',
            level : this.treeVal.level + 1,
            sortSeq : maxDispSeq,
            uprCpnsTypCd : this.treeVal.cpnsTypNo,
            cpnsStdDescYn : 'N'
        };

        if(defaultValues.level == 2) {
            defaultValues.cpnsSubCd = '';
            defaultValues.cpnsStdCd = '';
        }

        this.defaultHandler.onAdd(grid, defaultValues);
    },

    onReset : function() {
        this.defaultHandler.onCancel(this.grid);
    },

    onSave : function() {
        var grid = this.grid;
        grid.commit();
        var result = false;

        var dataResource = grid.getDataSource();
        var gridCount = dataResource.getRowCount();
        for(var i = 0; i<gridCount; i++){
            if(grid.getValue(i,"cpnsTypNm") == null || grid.getValue(i,"cpnsTypNm") === ''){
                alert(msg.cpnsTypNmCheck);
                return;
            } else if( byteCheck( grid.getValue(i,"cpnsTypNm") ) > 100 ){ // 보상유형명을 입력한 경우 byte 검사
                alert(msg.cpnsTypNmCheck2);
                return;
            } else if(grid.getValue(i,"sortSeq") == null || grid.getValue(i,"sortSeq") === NaN){
                alert(msg.sortSeqCheck);
                return;
            }

            if(grid.getValue(i,"level") == 2){
                if(grid.getValue(i,"cpnsSubCd") == null || grid.getValue(i,"cpnsSubCd") === ''){ // 보상주체
                    alert(msg.cpnsSubCdCheck);
                    return;
                }else if(grid.getValue(i,"cpnsStdCd") == null || grid.getValue(i,"cpnsStdCd") === ''){ // 보상기준
                    alert(msg.cpnsStdCdCheck);
                    return;
                }else if(grid.getValue(i,"cpnsStdRate") == null || grid.getValue(i,"cpnsStdRate") === ''){ // 기준율
                    alert(msg.cpnsStdRateCheck);
                    return;
                }else if(grid.getValue(i,"maxPayLim") == null || grid.getValue(i,"maxPayLim") === ''){ // 최대지급한도
                    alert(msg.maxPayLimCheck);
                    return;
                } else if( grid.getValue(i,"maxPayLim") > 1000000 || grid.getValue(i,"maxPayLim") < 0 ){ // 최대지급한도 0 ~ 100만원까지
                    alert(msg.maxPayLimCheck2);
                    return;
                } else if( grid.getValue(i,"cpnsStdCd") != "30" ){ // 보상기준이 판매가 또는 결제가 인 경우
                    if( !isNumberVal( grid.getValue(i,"cpnsStdRate") ) ){  // 기준율은 숫자만 입력가능
                        alert(msg.cpnsStdRateCheck2);
                        return;
                    }
                } else if( byteCheck( grid.getValue(i,"cpnsStdDesc") ) > 4000 ){ // 보상기준설명을 입력한 경우 byte 검사
                    alert(msg.cpnsStdDescCheck);
                    return;
                }
            }

            if(grid.isCheckedItem(i)){
                result = true;
            }
        }
        if(!result){
            alert(msg.gridNoSelected);
            return ;
        }

        this.controller.doSave(this, grid.localId);
    },

    gridEvent : {
        // 조회 완료 후 CallBack 함수
        afterQuerySuccess : function (grid, data) {
            $('#rewardTypeListGrid_totalCount').html(grid.getDataSource().getRowCount());
            //검색 결과 없을 경우
            if (data.payloads.length == 0) {
                if (localStorage.alertifyExists === 'true') {
                    localStorage.alertifyExists = 'false';
                }
            }
        },

        // 저장 완료 후 콜백함수
        afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            alert(data.message);
            if(data.succeeded){
                rewardTypeListTree.treeLoading();
            }
        }
    }
};