$.namespace('holidayManyGrid.eventhandler');
holidayManyGrid.eventhandler = {
    init : function () {
        this.gridLoading();
        this.bindButtonEvent();
    },
    gridLoading : function () {
        this.grid.onItemChecked = function (grid, itemIndex, checked) {
            grid.setCurrent({ itemIndex: itemIndex });
        };
        this.grid.setRowStyleCallback(function (grid, item, fixed) {
            if (item.checked) {
                return 'rg-trcol_active';
            }
        });
        this.grid.setEditOptions({ commitLevel : 'error', commitByCell : true });
        this.grid.setDisplayOptions({ rowHeight : -1 });
    }
    ,bindButtonEvent : function () {

        var self = this;

        // 업로드 양식 다운로드
        $('#btn_file_download').on('click', function(e) {
            e.preventDefault();
            if ($('#file01').is(":checked")) {
                location.href = _sampleFileuploadUrl + '/holiday/XLSuploadForm.xlsx';
            }
            if ($('#file02').is(":checked")) {
                location.href = _sampleFileuploadUrl + '/holiday/CSVuploadForm.csv';
            }
        });

        // 일괄등록 파일선택
        $('#btn_file_search').on('click', function() {

            $('#holidayBatchFile').change(function(){
                var $file = $(this);
                self.onExcelLoad();
                $file.clearFileInput();
            });
            $('#holidayBatchFile').click();
        });

        // 행삭제
        $('#btn_grid_delete').click(function() {
            self.onDelete();
        });

        // 닫기
        $('#btn_popup_close').on('click', function () {
            window.close();
        });

        // 적용
        $('#btn_popup_apply').on('click', function () {
            self.onSave();
        });
    }
    ,onExcelLoad : function() {

        var self = this;
        var uploadFile = $("#holidayBatchFile")[0].files[0];
        if (!uploadFile) return;

        var ext = uploadFile.name.split('.').pop().toLowerCase();
        if ( $.inArray(ext, ['xls','xlsx','csv']) === -1 ) {
            alert(_wrongFileType);
            return;
        }

        this.controller.doExcelLoad({
            gridName : "holidayManyGrid",
            dtoClass : "com.enbiz.bo.app.entity.StHoliInfo",
            dtoFields : "holiDt, holiJobGbCd, holiGbCd, holiMemo, useYn",
            uploadFile : uploadFile,
            completeCallback : function () {
                self.valueCheck();
            }
        });
    }
    ,valueCheck : function () {
        var grid = this.grid;
        var provider = grid.getDataSource();

        var rowState = provider.getAllStateRows();
        return grid.validateCells(grid.getItemsOfRows(rowState.created), true);
    }
    ,onDelete : function() {
        var grid = this.grid;
        var checkedRows = grid.getCheckedRows();
        if (checkedRows.length === 0) {
            alert(alertMsg.noSelectedRowMsg);
            return;
        }

        if(!confirm(alertMsg.confirmDeleteMsg)) return;
        this.defaultHandler.onDelete(grid);
    }
    ,onSave : function() {
        var grid = this.grid;
        var provider = grid.getDataSource();
        grid.commit(true);

        var count = provider.getRowCount();
        this.totalCount = grid.getCheckedRows().length;
        for( var i = 0; i < count; i++ ){
            provider.setValue(i, "errorMessage", undefined);
        }

        grid.clearInvalidCells();
        this.controller.doSave(this, grid.localId);
    }
    ,gridEvent : {
        afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data) {

            var grid = com.x2commerce.common.Util.getGridView(mainGridName);
            var provider = grid.getDataSource();

            var tc = eventHandler.totalCount;
            var ec = data.data.length;
            var cc = tc - ec;

            $('#total_count').text(tc);
            $('#error_count').text(ec);
            $('#complate_count').text(cc);

            if( ec ) {
                data.data.forEach(function(d){
                    d.errorMessage = alertMsg.overLapHolidayMsg;
                })
                provider.addRows(data.data);
            }
            grid.checkAll(true, false, false);
            opener.holidayGrid.eventhandler.onSearch();

        }
        ,onRowCountChanged : function (provider, count) {
            $('#holiManyGridCnt').text(count);
        }
        ,onHideEditor : function (grid, index) {
            grid.commit(true);
            grid.setValue(index.itemIndex, "errorMessage", undefined);
            grid.validateCells(index.itemIndex, true);
        }
        ,onValidateColumn : function ( grid, column, inserting, value, itemIndex, dataRow ) {
            var error = {};
            var msg = grid.getValue(itemIndex,"errorMessage");
            msg = (msg === undefined || msg === '') ? '' : msg + '\n';

            if ( column.fieldName === "holiDt" ) {
                if ( value === undefined || value === '' ) {
                    error.level = "error";
                    error.message = alertMsg.requireHolidayMsg;
                    grid.setValue(itemIndex, "errorMessage", msg + error.message );
                    return error;
                }

                var pattern = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/;
                if (!pattern.test(value)) {
                    error.level = "error";
                    error.message = alertMsg.holidayWrongInputMsg;
                    grid.setValue(itemIndex, "errorMessage", msg + error.message );
                    return error;
                }
            } else if ( column.fieldName === "holiJobGbCd" ) {
                if ( value === undefined || value === '' ) {
                    error.level = "error";
                    error.message = alertMsg.requireSctCdMsg;
                    grid.setValue(itemIndex, "errorMessage", msg + error.message );
                    return error;
                }

                if ( $.inArray(value,_jobkeys) === -1 ) {
                    error.level = "error";
                    error.message = alertMsg.sctCdWrongInputMsg;
                    grid.setValue(itemIndex, "errorMessage", msg + error.message );
                    return error;
                }

            } else if ( column.fieldName === "holiGbCd" ) {

                if ( value === undefined || value === '' ) {
                    error.level = "error";
                    error.message = alertMsg.requireHolidaySctCdMsg;
                    grid.setValue(itemIndex, "errorMessage", msg + error.message );
                    return error;
                }

                if ( $.inArray(value,_gbkeys) === -1 ) {
                    error.level = "error";
                    error.message = alertMsg.jobSctCdWrongInputMsg;
                    grid.setValue(itemIndex, "errorMessage", msg + error.message );
                    return error;
                }

            } else if ( column.fieldName === "useYn" ) {
                if ( value === undefined || value === '' || $.inArray(value,["Y","N"]) === -1 ) {
                    grid.setValue(itemIndex, "useYn", "Y" );
                }
            }
        }
    }
};
