$.namespace("counselingTemplateGrid.eventhandler");
counselingTemplateGrid.eventhandler = {
    // 초기화
    init : function () {
        this.gridLoading();
        this.bindButtonEvent();
    },

    gridLoading : function(){
        var self = this;

        this.grid.setEditOptions({ editable: false }); // 그리드 수정 불가능
        this.grid.setHeader({ showTooltip: false }); // 해더영역 툴팁 해제

        // 선택된 그리드 배경색 넣기
		this.grid.onItemChecked = function(grid, itemIndex, checked) {
          grid.setCurrent({ itemIndex: itemIndex })
        }
        this.grid.setRowStyleCallback(function(grid, item, fixed) {
          if (item.checked) {
            return 'rg-trcol_active'
          }
        });

        // 기획전 번호, 기획전명 클릭 시 수정 팝업창 호출
        this.grid.onCellClicked = function(grid,clickData){
            var currentData = self.grid.getDataSource().getJsonRow(clickData.dataRow);
            if(clickData.cellType != "header") {
                if(clickData.column ==='tmplNm'){
                    self.onAdd("U", currentData.cnslAempId, currentData.cnslTmplNo);
                }
            }
        }
    },

    bindButtonEvent : function(){
        var self = this;

        // 검색조건 초기화 버튼
        $("#btn_init").click(function() {
            $('#counselingTemplateForm')[0].reset();
            self.valueInit();
        });

        // 검색조건 조회 버튼
        $("#btn_list").click(function() {
            self.onSearch(0,true);
        });

        // form 엔터키 입력
        $("#counselingTemplateForm").keypress(function (e){
            if (e.which == 13){
                $('#btn_list').click();
                window.event.returnValue=false;
            }
        });

        // 그리드 템플릿 추가 버튼
        $("#btn_grid_insert").click(function() {
            self.onAdd("I", null, null);
        });

        // 그리드 행삭제 버튼
        $("#btn_grid_remove").click(function() {
            self.grid.cancel();
            self.onDelete();
        });

        // 그리드 변경 취소 버튼
        $("#btn_grid_reset").click(function() {
            self.onReset();
        });

        // 그리드 저장 버튼
        $("#btn_grid_save").click(function() {
            self.onSave();
        });
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
        // 완료후 콜백함수
        afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            openToast(data.message);
            if(data.succeeded){
                eventHandler.onSearch(0);
           }
        }
    },

    onSearch : function(pageNo,isOpenToast){
        var that = this;
        this.grid.cancel();
        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function (pageNo) { return that.onSearch(pageNo); };
        this.controller.doQuery(this, '', pageNo, pageFunc,false,isOpenToast);
    },

    onAdd : function(state, cnslAempId, cnslTmplNo) {
        var self = this;
        var pin = { argInsertUpdate : state, cnslAempId : cnslAempId, cnslTmplNo : cnslTmplNo, typeCode : "alone" };
        if(state == "I"){ // 템플릿 추가
            var POP_DATA = {
                url:  _baseUrl + 'customerservice/counselingTemplateMgmt.counselingTemplateMgmtSaveView.do'
                , winName: 'getCounselingTemplatePopupInsert'
                , title: '상담 템플릿 등록'
                , _title: '상담 템플릿 등록'
                , left: 20
                , top: 20
                , width: 500
                , height: 392
                , scrollbars: true
                , autoresize: true
            };
        } else if (state == "U"){ // 템플릿 수정
            var POP_DATA = {
                url:  _baseUrl + 'customerservice/counselingTemplateMgmt.counselingTemplateMgmtSaveView.do'
                , winName: 'getCounselingTemplatePopupUpdate'
                , title: '상담 템플릿 수정'
                , _title: '상담 템플릿 수정'
                , left: 20
                , top: 20
                , width: 500
                , height: 392
                , scrollbars: true
                , autoresize: true
            };
        }
        popCommon(pin, POP_DATA, function(e){ this.onSearch(0); }  );
    },

    onDelete : function() {
        var checkedItems = this.grid.getCheckedItems();
        if (checkedItems.length == 0) {
            alert(msg.deleteRowCheck);
            return;
        }

        this.defaultHandler.onDelete(this.grid);
    },

	onReset : function() {
        alert(msg.gridInit);
        this.defaultHandler.onCancel(this.grid);
    },

    onSave : function() {
        var grid = this.grid;
        grid.commit();

        var result = false;
        var dataResource = this.grid.getDataSource();

        for(var i = 0; i<this.grid.getItemCount(); i++){
            if(this.grid.getDataSource().getRowState(i) == "created" || this.grid.getDataSource().getRowState(i) == "updated") {
                this.grid.checkRow(i);
            }
        }

        var gridCount = dataResource.getRowCount();
        for(var i = 0; i<gridCount; i++){
            if(this.grid.isCheckedItem(i)){
                result = true;
                break;
            }
        }

        if(!result){
            alert(msg.gridNoSelected);
            return ;
        }

        this.controller.doSave(this, grid.localId);
    }
};