$.namespace('goodsListGrid.eventhandler');
goodsListGrid.eventhandler = {
    // 초기화
    init : function () {
        this.gridLoading();
        this.bindButtonEvent();
    },

    // 그리드 추가 옵션 설정
    gridLoading : function () {
        this.grid.setEditOptions({ editable: false }); // 그리드 수정불가

        //그리드 셀 체크시 색상 변경 기능 설정
        this.grid.onItemChecked = function (grid, itemIndex, checked) {
            grid.setCurrent({ itemIndex: itemIndex });
        };
        this.grid.setRowStyleCallback(function (grid, item, fixed) {
            if (item.checked) {
                return 'rg-trcol_active';
            }
        });
    },

    // 이벤트 바인딩
    bindButtonEvent : function () {
        var self = this;
        // 닫기 버튼 클릭 이벤트 처리
        $('#btn_popup_close').click(function () {
            window.close();
        });

        // 적용 버튼 클릭 이벤트 처리
        $('#btn_popup_apply').click(function () {
            event.preventDefault();
            self.onSave();
        });

        // 업로드 양식 다운로드 버튼
        $('#filedown').click(function() {
            event.preventDefault();
            if ($('#file01').is(":checked")) {
                location.href = _sampleFileuploadUrl + '/displayCategory/XLSuploadForm.xls';
            }
            if ($('#file02').is(":checked")) {
                location.href = _sampleFileuploadUrl + '/displayCategory/CSVuploadForm.csv';
            }
        });

        // 행삭제 버튼
        $('#btn_goodsListGrid_delete').click(function() {
            event.preventDefault();
            self.onDelete();
        });

        // 파일찾기 버튼
        $('#btn_file_search').click(function() {
            $('#goodsBatchFile').change(function(){
                var $file = $(this);
                self.onExcelLoad();
                $file.clearFileInput();
            });
            $('#goodsBatchFile').click();

            return false;
        });
    },

    // 적용
    apply : function () {
        var checkedRows = this.grid.getCheckedRows();
        var returnRows = [];

        if (checkedRows.length === 0) {
            alert(_msg.noSelectedDataMsg);
            return;
        }

        checkedRows.forEach( function (rowNum) {
            returnRows.push(this.grid.getDataSource().getJsonRow(rowNum))
        });

        window.postMessage(JSON.stringify(returnRows), _baseUrl);
        this.close();
    },

    onDelete : function() {
        var self = this;
        var grid = self.grid;

        var checkedRows = grid.getCheckedRows(false);
        if (checkedRows.length == 0) {
            alert(_noRowSelected);
            return;
        }

        self.defaultHandler.onDelete(grid);
        var provider = grid.getDataSource();
    },

    onExcelLoad : function() {
        var self = this;
        var gridName = "goodsListGrid";

        var uploadFile = $("#goodsBatchFile")[0].files[0];
        if (!uploadFile) {
            return false;
        }

        var fileType = ["csv", "xlsx", "xls"];
        var fileCheck = false;
        for(var i=0; i<fileType.length; i++){
            if(uploadFile.name.split(".")[uploadFile.name.split(".").length -1] === fileType[i]) {
                fileCheck = true;
                break;
            }
        }

        if(!fileCheck) {
            alert(msg.fileTypeError);
            return false;
        }

        pin = {
                gridName : gridName,
                dtoClass : "com.x2commerce.common.entity.PrDispGoodsInfo",
                dtoFields : "goodsNo,dispSeq,dispYn",
                uploadFile : uploadFile,
                completeCallback : true,
                completeCallback : function() {
                    self.valueCheck();
                }
            };
        this.controller.doExcelLoad(pin,"display/displayCategoryMgmt.saveDisplayCategoryMgmtGoodsListExcel.do?dispCtgNo=" + dispCtgNo);
    },

    onSave : function() {
        var grid = this.grid;
        grid.commit();
        var result = false;

        var dataResource = grid.getDataSource();
        var gridCount = dataResource.getRowCount();

        if (!this.valueCheck()) {
            alert(msg.checkErrMsg);
            return;
        }

        this.controller.doSave(this, grid.localId);
    },

    valueCheck : function() {
        var grid = this.grid;
        var provider = grid.getDataSource();
        var cnt = provider.getRowCount();
        $("#goodsListGrid-totalCount").text(cnt);
        var boolError = true;
        for (i = 0; i < cnt; i++) {
            grid.setValue(i, "errorMessage", undefined);
            var goodsNo = grid.getValue(i, "goodsNo");
            if (goodsNo == ''|| goodsNo === undefined || goodsNo == null) {
                grid.setValue(i, "errorMessage", "상품번호는 " + msg.necessaryCheckMessage );
                boolError = false;
            } else if (!(checkDigitOnly(goodsNo, false))) { // 숫자가 아닌경우
                grid.setValue(i, "errorMessage", "상품번호는 " + msg.numberOnlyError );
                boolError = false;
            }else if (goodsNo.length != 8) {
                grid.setValue(i, "errorMessage", msg.goodsNoError);
                boolError = false;
            }

            var dispSeq = grid.getValue(i, "dispSeq");
            if (dispSeq == ''|| dispSeq === undefined || dispSeq == null) {
                grid.setValue(i, "errorMessage", "전시순서는 " + msg.necessaryCheckMessage );
                boolError = false;
            } else if (!(checkDigitOnly(dispSeq, false))) { // 숫자가 아닌경우
                grid.setValue(i, "errorMessage", "전시순서는 " + msg.numberOnlyError );
                boolError = false;
            } else if (dispSeq.length > 3) {
                grid.setValue(i, "errorMessage", "전시순서는 " + msg.dispSeqError);
                boolError = false;
            }

            var dispYn = grid.getValue(i, "dispYn");
            var dispYnSelect = {N:"N",Y:"Y"}
            var dispYnArr = Object.keys(dispYnSelect);
            if (dispYn == ''|| dispYn === undefined || dispYn == null) {
                grid.setValue(i, "dispYn", "N");
                dispYn = "N";
            } else if($.inArray(dispYn, dispYnArr) < 0) {
                grid.setValue(i, "errorMessage", dispYnError);
                boolError = false;
            }
        }

        return boolError;
    },

    gridLoading : function(){
          var self = this;
          grid.setCellStyleCallback(function(grid, dataCell) {
              var ret = {};
              var value = dataProvider.getValue(dataCell.index.dataRow, "errorMessage");
              if(!(value === undefined || value.trim() === '')) {
                  if (dataCell.dataColumn.name === 'errorMessage') {
                      ret.editable = false;
                      ret.styleName = 'error-column';
                  }
              }
              return ret;
          });
    },

    // Grid 이벤트 처리
    gridEvent : {
        afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data) {
            var grid = com.x2commerce.common.Util.getGridView(mainGridName);
            var provider = grid.getDataSource();
            $('#total_count').text(provider.getRowCount());
            $('#error_count').text(data.totalCount);
            var cc = $('#total_count').text() - $('#error_count').text();
            $('#complate_count').text(cc);
            $("#goodsListGrid-totalCount").text(data.totalCount);
            provider.clearRows();
            if(data.totalCount != 0) {
                alert(msg.overlapError);
                provider.addRows(data.payloads); // 중복 오류 데이터 그리드에 남아있음
            }
            opener.displayGoodsGrid.eventhandler.onSearch(0, dispCtgNo, false);
        }
    }

};
