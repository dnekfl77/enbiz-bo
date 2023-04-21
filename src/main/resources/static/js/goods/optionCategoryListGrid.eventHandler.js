$.namespace("optionCategoryListGrid.eventhandler");
optionCategoryListGrid.eventhandler = {
    init : function () {
        this.gridSetting();
        this.bindButtonEvent();
    }
    ,gridSetting: function() {
        var _self = this;

        _self.grid.onItemChecked = function ( grid, itemIndex, checked ) {
            grid.setCurrent({ itemIndex: itemIndex });
        };
        _self.grid.setRowStyleCallback(function ( grid, item, fixed ) {
            if (item.checked) return 'rg-trcol_active';
        });
        _self.grid.setEditOptions({ commitLevel : 'error' });

        _self.grid.registerCustomRenderer('renderer_imgBtn', {
            initContent: function (parent) {
                var span = this._span = document.createElement("span");
                span.className = "custom_render_span"
                parent.appendChild(span);

                parent.appendChild(this._button1 = document.createElement("span"));
            }
            , canClick: function () {
                return true;
            }
            , clearContent: function (parent) {
                parent.innerHTML = "";
            }
            , render: function (grid, model, width, height, info) {
                var span = this._span;
                span.textContent = model.value;

                this._button1.className = "";
                if (grid.getValue(grid.getItemIndex(model.item.dataRow), 'optnCatRegGbCd') === '02') {
                    this._button1.className = "custom_search_cop";
                }
            }
            , click: function (event) {
                event.preventDefault();
                if (event.target === this._button1) {
                    _self.onPopupPartner(_self, _self.grid.getCurrent().itemIndex);
                }
            }
        });
    }
    ,bindButtonEvent: function () {
        var _self = this;

        $('#btn_init').click(function() {
            $('#optionCategoryListGridForm')[0].reset();
        });

        $('#btn_search').click(function() {
            _self.onSearch(0,true);
        });

        $('#btn_optn_ctg_add').on('click', function() {
            _self.onAdd(_self);
        });

        $('#btn_optn_ctg_cancel').on('click', function() {
            _self.onReset(_self);
        });

        $('#btn_optn_ctg_save').on('click', function() {
            _self.onSave(_self);
        });
    }
    ,onSearch : function(pageIdx, isOpenToast){
        var _self = this;
        _self.grid.cancel();

        pageIdx = !pageIdx ? 0 : pageIdx;
        var pagingFunc = function(pageIdx){return _self.onSearch(pageIdx, false);};

        _self.controller.doQuery(_self, "", pageIdx, pagingFunc, null, isOpenToast);
    }
    ,onAdd : function(that) {
        var grid = that.grid;
        grid.commit(true);
        var defaultValues = { useYn : "Y" };
        that.defaultHandler.onAdd(grid, defaultValues);
    }
    ,onReset : function(that) {
        var grid = that.grid;
        that.defaultHandler.onCancel(grid);
    }
	,onSave : function(that) {
        that.grid.commit(true);
        that.controller.doSave(that, that.grid.localId);
    }
    ,onPopupPartner : function(that, itemIndex) {
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
        var popupPartnerCallback = function(e) {
            var resultData = JSON.parse(e.data);
            var partnerContents = resultData[0];

            if (partnerContents == null || partnerContents == undefined) {
                return;
            }

            delete partnerContents.entrGbCd;
            delete partnerContents.trdStatCd;

            that.grid.setValue(itemIndex, 'entrNo', partnerContents.entrNo);
            that.grid.setValue(itemIndex, 'entrNm', partnerContents.entrNm);
            that.grid.validateCells(itemIndex,false);
        };

        popCommon(pin, POP_DATA, popupPartnerCallback);
    }
    ,gridEvent : {
        onValidateColumn : function ( grid, column, inserting, value, itemIndex, dataRow ) {
            var error = {};
            if ( column.fieldName === "optnCatRegGbCd" ) {
                if ( value === undefined || value === null || value === '' ) {
                    error.level = "error";
                    error.message = '등록구분' + _msg.requiredCheckMessage;
                    return error;
                }
            } else if ( column.fieldName === 'entrNo' || column.fieldName === 'entrNm' ) {
                if ( grid.getValue(itemIndex,'optnCatRegGbCd') == '02' && (value === undefined || value === null || value === '') ) {
                    error.level = "error";
                    error.message = '협력사명' + _msg.requiredCheckMessage;
                    return error;
                }
            } else if ( column.fieldName === 'optnCatTypCd' ) {
                if ( value === undefined || value === null || value === '' ) {
                    error.level = "error";
                    error.message = '옵션분류유형' + _msg.requiredCheckMessage;
                    return error;
                }
            } else if ( column.fieldName === 'optnCatNm' ) {
                if ( value === undefined || value === null || value === '' ) {
                    error.level = "error";
                    error.message = '옵션분류명' + _msg.requiredCheckMessage;
                    return error;
                }
            } else if ( column.fieldName === 'sortSeq' ) {
                if ( value === undefined || value === null || value === '' ) {
                    error.level = "error";
                    error.message = '정렬순서' + _msg.requiredCheckMessage;
                    return error;
                }
            }
        }
        ,afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            if(data.succeeded){
                openToast(data.message);
                eventHandler.onSearch(0,false);
           }else{
                alert(data.message);
            }
        }
        ,onEditRowChanged: function (grid, itemIndex, dataRow, field, oldValue, newValue) {
            var fieldName = grid.getDataSource().getOrgFieldName(field);
            if ( fieldName === 'optnCatRegGbCd') {
                if(newValue === '01'){
                    grid.setValue(itemIndex, 'entrNo', undefined);
                    grid.setValue(itemIndex, 'entrNm', undefined);
                    grid.commit(true);
                }
            }
        }
        ,onCurrentRowChanged: function(grid, oldRow, newRow) {
            var targetHandler = optionListGrid.eventhandler;
            var optnCatNo = grid.getValue(newRow, 'optnCatNo');

            if (optnCatNo === undefined || optnCatNo === NaN) {
                targetHandler.onToggleBindEvent(targetHandler, 'off');
                targetHandler.clearGrid(targetHandler);
            } else {
                targetHandler.onToggleBindEvent(targetHandler, 'on');
                targetHandler.onSearch(targetHandler, optnCatNo);
            }
        }
    }
}