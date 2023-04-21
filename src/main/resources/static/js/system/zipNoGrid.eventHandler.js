$.namespace("zipNoGrid.eventhandler");
zipNoGrid.eventhandler = {

    init: function () {
        this.gridSetting();
        this.bindButtonEvent();
    }

    ,gridSetting : function () {
        this.grid.onItemChecked = function ( grid, itemIndex, checked ) {
            grid.setCurrent({ itemIndex: itemIndex });
        };
        this.grid.setRowStyleCallback(function ( grid, item, fixed ) {
            if (item.checked) return 'rg-trcol_active';
        });
        this.grid.setEditOptions({ editable : false });
    }

    ,bindButtonEvent: function() {
        const _self = this;

        // 시도명 변경 => 시군구명 조회
        $("#ctpNmParam").on("change", function(e) {
            _self.getSigNmList(e.currentTarget.value);
        });

        // 초기화
        $("#btn_zipNoList_init").on("click", function() {
            _self.resetEl("zipNoGridForm");
        });

        // Enter 조회
        $("#param1").on("keypress", function(e) {
            if( e.keyCode === 13 ) {
                e.preventDefault();
                $("#btn_zipNoList_search").click();
            }
        });

        // 조회
        $("#btn_zipNoList_search").on("click", function(e) {

            // 필수 입력값 체크
            if($("#ctpNmParam").val().isEmpty()) {
                alert(msg._searchInvalidCtpNm);
                $("#ctpNmParam").focus();

                return false;
            }

            if($("#sigNmParam").val().isEmpty()) {
                alert(msg._searchInvalidSigNm);
                $("#sigNmParam").focus();

                return false;
            }

            if($("#param1").val().isEmpty()) {
                alert(msg._searchInvalidInput);
                $("#param1").focus();

                return false;
            }

            _self.onSearch(0,true);
        });

        // 변경취소
        $("#btn_grid_reset").on("click", function() {
            var grid = _self.grid;
            _self.defaultHandler.onCancel( grid );
        });

        // 행삭제
        $("#btn_grid_remove").on("click", function() {
            self.grid.cancel();
            _self.onDelete();
        });

        // 저장
        $("#btn_grid_save").on("click", function() {
            _self.onSave();
        });
    },

    getSigNmList: function( ctpNm ) {
        const successCallBack = (data) => {
            $("#sigNmParam").children().remove();
            $("#sigNmParam").append(`<option value="">${msg._selectAllText}</option>`)

            if(data !== null && Array.isArray(data)) {
                data.forEach((sigNm) => {
                    $("#sigNmParam").append(`<option value="${sigNm}">${sigNm}</option>`)
                });
            }
        }

        common.Ajax.sendRequest(
            "get",
            _baseUrl + "system/zipNoMgmt.getSiGunGuNameList.do",
            { ctpNm: ctpNm },
            successCallBack)
    },

    gridEvent: {
        afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            openToast(data.message);
            if(data.succeeded){
                eventHandler.onSearch(0,false);
            }
        }
    },

    onSearch : function(pageIdx, isOpenToast){
        this.grid.cancel();
        pageIdx = !pageIdx ? 0 : pageIdx;
        var self = this;
        var pagingFunc = function(pageIdx){return self.onSearch(pageIdx);};

        this.controller.doQuery(this, "", pageIdx, pagingFunc, false, isOpenToast);
    },

    onSave: function() {
        const _self = this;
        const _grid = _self.grid;

        _grid.commit(true);
        _self.controller.doSave(_self, _grid.localId);
    },

    onDelete: function() {
        const _self = this;
        const grid = _self.grid;
        const checkedRows = grid.getCheckedRows();

        if ( !checkedRows.length) {
            alert(msg._rowCheckMsg);
            return;
        }

        _self.defaultHandler.onDelete( grid );
    },

    resetEl: function(formId) {
        const _form = document.getElementById(formId);
        const resetEl = _form.querySelectorAll("input, select");

        if(resetEl && resetEl.length > 0) {
            resetEl.forEach(el => {
                if(el.tagName.toLowerCase() === 'input') {
                    if(el.type === "text") {
                        el.value = "";
                    } else if(el.type === "checkbox") {
                        el.checked = false;
                    }
                } else if(el.tagName.toLowerCase() === 'select') {
                    el.value = "";

                    if(el.getAttributeNames().findIndex(i => i === 'option-init') > -1 && el.children && el.children.length > 0) {
                        const firstChildren = el.firstElementChild;

                        while(el.hasChildNodes()) {
                            el.removeChild(el.firstChild);
                        }

                        if( el.getAttribute("option-init") ) {
                            el.append(firstChildren);
                        }
                    }
                }
            });
        }
    }
};