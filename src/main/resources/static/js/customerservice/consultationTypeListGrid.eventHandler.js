$.namespace("consultationTypeListGrid.eventhandler");
consultationTypeListGrid.eventhandler = {
    treeData     : {} ,
    uprCnslTypNo : '' ,
    treeDepth    : 0 ,
    hierarchyText: '',

    alertMessage : x2coMessage.getMessage( {
        cnslTypNm : 'counselingTypeMgmt.grid.message.cnslTypNm',
        sortSeq   : 'counselingTypeMgmt.grid.message.sortSeq',
        depth3    : 'counselingTypeMgmt.grid.message.depth3',
        custCnslGbCd    : 'counselingTypeMgmt.grid.message.custCnslGbCd',
        goodsSelMdtyYn    : 'counselingTypeMgmt.grid.message.goodsSelMdtyYn',
    }),

    // 초기화
    init : function () {
        this.bindButtonEvent();
    },

    bindButtonEvent : function(){
        var self = this;

        $('#memo-cancel').click(function(){
            layerPopClose('layerPop-memo');
        });

        $('#memo-apply').click(function(){
            self.grid.commit();
            var memoText = $('#memo-text').val().trim();

            var itemIndex = self.grid.getCurrent().dataRow;

            if(memoText.length > 0){
                self.grid.getDataSource().setValue(itemIndex, "respBaseMemo", 'Y');
            }else{
                self.grid.getDataSource().setValue(itemIndex, "respBaseMemo", 'N');
            }
            self.grid.getDataSource().setValue(itemIndex, "respBaseMemoData", memoText);
            layerPopClose('layerPop-memo');
        });


        $('#btn_grid_add').click(function(){
            if(self.treeDepth >= 3){
                alert(self.alertMessage.depth3);
                return;
            }
            self.onAdd();
        })

        $('#btn_grid_reset').click(function(){
            self.onReset();
        })

        $('#btn_grid_save').click(function(){
            if(self.treeDepth >= 3){
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
        var extraQueryString = 'uprCnslTypNo='+this.uprCnslTypNo;
        this.controller.doQuery(this,extraQueryString,pageIdx, pagingFunc);
    }
    // 행추가
    ,onAdd : function () {
        var grid = this.grid;
        grid.commit(); // 편집중인 행 편집 완료 처리

        var defaultValues = {
            useYn : 'N',
            level : this.treeDepth+1,
            uprCnslTypNo : this.treeData.cnslTypNo
        };

        //2dept 추가
        if(this.treeDepth===1){
            defaultValues.cnslLrgTypNo = this.treeData.cnslLrgTypNo
        }

        //3dept 추가
        if(this.treeDepth===2){
            defaultValues.cnslLrgTypNo = this.treeData.cnslLrgTypNo
            defaultValues.cnslMidTypNo = this.treeData.cnslMidTypNo;
            defaultValues.goodsSelMdtyYn = '';
            defaultValues.custCnslGbCd = '';
        }

        defaultValues.respBaseMemo = 'N';

        this.defaultHandler.onAdd(grid, defaultValues);
    },
    onSave : function() {
        var grid = this.grid;
        grid.commit();
        var result = false;

        var dataResource = grid.getDataSource();
        var gridCount = dataResource.getRowCount();
        for(var i = 0; i<gridCount; i++){
            var _cnslTypNm = grid.getValue(i,"cnslTypNm");
            var _sortSeq   = grid.getValue(i,"sortSeq");
            if(_cnslTypNm === undefined || _cnslTypNm === ''){
                alert(this.alertMessage.cnslTypNm);
                return;
            }else if(_sortSeq === undefined || _sortSeq === NaN){
                alert(this.alertMessage.sortSeq);
                return;
            }

            if(this.treeDepth === 2){
                var _custCnslGbCd = grid.getValue(i,"custCnslGbCd");
                var _goodsSelMdtyYn   = grid.getValue(i,"goodsSelMdtyYn");

                if(_custCnslGbCd === ''){
                    alert(this.alertMessage.custCnslGbCd);
                    return;
                }else if(_goodsSelMdtyYn  === ''){
                    alert(this.alertMessage.goodsSelMdtyYn);
                    return;
                }
            }

            if(grid.isCheckedItem(i)){
                result = true;
                break;
            }
        }
        if(!result){
            alert(_msg.noSelectedDataMsg);
            return ;
        }

        this.controller.doSave(this, grid.localId);
    },
    onReset : function() {
        this.defaultHandler.onCancel(this.grid);
    },
    gridEvent : {
        // 조회 완료 후 CallBack 함수
        afterQuerySuccess : function (grid, data) {
            //검색 결과 없을 경우
            if (data.payloads.length == 0) {
                if (localStorage.alertifyExists === 'true') {
                    localStorage.alertifyExists = 'false';
                }
            }
        },
        onCellClicked : function (grid, clickData) {
            var currentData = grid.getDataSource().getJsonRow(clickData.dataRow);
            if(clickData.column==='respBaseMemo' && currentData.level === 3){
                var subtitleArray = consultationTypeListGrid.eventhandler.hierarchyText.split('>');

                var smlCnslTypNm = currentData.cnslTypNm;
                if(smlCnslTypNm === undefined){
                    smlCnslTypNm = '';
                }else{
                    smlCnslTypNm = ' > '+currentData.cnslTypNm;
                }

                $('#sub-title').text(subtitleArray[1]+' > '+subtitleArray[2]+ smlCnslTypNm);
                $('#memo-text').val(currentData.respBaseMemoData);
                layerPopOpen('layerPop-memo');
            }
        },

        afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            openToast(data.message);
            if(data.succeeded){
                listTree.treeLoading();
            }
        },
    }
};