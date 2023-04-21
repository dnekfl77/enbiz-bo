$.namespace('obBusinessRegistPopGrid.eventhandler');
obBusinessRegistPopGrid.eventhandler = {

    alertMessage : x2coMessage.getMessage( {
        fileTypeError :  "csAllocationMgmt.obBusinessRegistPop.msg.fileTypeError",
        uploadFail :  "csAllocationMgmt.obBusinessRegistPop.msg.uploadFail",
    }),

    // 초기화
    init : function () {
        this.bindButtonEvent();
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

            var grid = self.grid;
            var provider = grid.getDataSource();
            var cnt = provider.getRowCount();
            for (var i = 0; i < cnt; i++) {
                var failCont = grid.getValue(i, "failCont");
                if(failCont !== undefined){
                    alert('오류 수정후 다시 저장하세요!');
                    return;
                }
            }

            self.onSave();
        });

        // 업로드 양식 다운로드 버튼
        $('#filedown').click(function() {
            var checkedValue = $('input[name="uploadFormDoc"]:checked').val();
            if (checkedValue === 'xls') {
                location.href = _sampleFileuploadUrl + '/customerservice/XLSuploadFormOB.xls';
            }else{
                location.href = _sampleFileuploadUrl + '/customerservice/CSVuploadFormOB.csv';
            }
        });

        // 파일찾기 버튼
        $('#btn_file_search').click(function() {
            $('#obBussinessBatchFile').change(function(){
                var $file = $(this);
                self.onExcelLoad();
                $file.clearFileInput();
            });
            $('#obBussinessBatchFile').click();

            return false;
        });

        // 행삭제 버튼
        $('#btn_delete').click(function() {
            event.preventDefault();
            self.onDelete();
        });
    }
    ,onDelete : function() {
        var self = this;
        var grid = self.grid;

        var checkedRows = grid.getCheckedRows(false);
        if (checkedRows.length === 0) {
            alert(_msg.noSelectedDataMsg);
            return;
        }
        self.defaultHandler.onDelete(grid);
    },
    onExcelLoad : function() {
        var self = this;
        var gridName = "obBusinessRegistPopGrid";

        var uploadFile = $("#obBussinessBatchFile")[0].files[0];
        if (!uploadFile) {
            return false;
        }

        var fileType = ["csv", "xls"];
        var fileCheck = false;
        for(var i=0; i<fileType.length; i++){
            if(uploadFile.name.split(".")[uploadFile.name.split(".").length -1] === fileType[i]) {
                fileCheck = true;
                break;
            }
        }

        if(!fileCheck) {
            alert(this.alertMessage.fileTypeError);
            return false;
        }

        pin = {
            gridName : gridName,
            dtoClass : "com.x2commerce.backoffice.app.dto.request.customerservice.CsObCounselInfoRequest",
            dtoFields : "mbrNo,ordNo,accpCont",
            uploadFile : uploadFile,
            completeCallback : function() {
                self.validationUploadFileColumn();
            }
        };

        this.controller.doExcelLoad(
            pin
          ,"customerservice/csAllocationMgmt.getObCsCounselInfoListExcel.do?cnslTypNo=" + $("#obTypeCodeList option:checked").attr("data-cnslTypNo") + "&obTypNo=" + $("#obTypeCodeList option:checked").val()
        )
    },
    onSave : function() {

        // var grid = this.grid;
        // grid.commit();
        // var result = false;
        //
        // var dataResource = grid.getDataSource();
        //
        // if (!this.validationUploadFileColumn()) {
        //     alert(msg.checkErrMsg);
        //     return;
        // }

        this.controller.doSave(this, grid.localId);
    },
    validationUploadFileColumn: function() {
        var grid = this.grid;
        var provider = grid.getDataSource();
        var cnt = provider.getRowCount();
        $("#obBusinessRegistPopGrid-totalCount").text(cnt);


        var dataSum = {};
        for (var i = 0; i < cnt; i++) {
            var _tempOrdNo = grid.getValue(i, "ordNo");
            if (_tempOrdNo === ''|| _tempOrdNo === undefined || _tempOrdNo == null) {
                continue;
            }
            if(!dataSum[_tempOrdNo]){
                var inner = {};
                inner.totalCnt = 1;
                dataSum[_tempOrdNo] = inner;
            }else{
                dataSum[_tempOrdNo].totalCnt +=1;
            }
        }


        var boolError = true;
        for (var i = 0; i < cnt; i++) {

            var errorArray = [];

            grid.setValue(i, "failCont", undefined);

            var mbrNo = grid.getValue(i, "mbrNo");
            if (mbrNo === ''|| mbrNo === undefined || mbrNo == null) {
                errorArray.push("회원번호");
                boolError = false;
            }

            var ordNo = grid.getValue(i, "ordNo");
            if (ordNo === ''|| ordNo === undefined || ordNo == null) {
                errorArray.push("주문번호");
                boolError = false;
            }else{
                if(dataSum[ordNo].totalCnt > 1){
                    errorArray.push("주문번호 중복");
                    boolError = false;
                }
            }

            var accpCont = grid.getValue(i, "accpCont");
            if (accpCont === ''|| accpCont === undefined || accpCont == null) {
                errorArray.push("접수내용");
                boolError = false;
            }

            if(errorArray.length > 0){
                grid.setValue(i, "failCont", errorArray.toString());
                grid.setValue(i, "yn", 'Fail');
            }else{
                grid.setValue(i, "failCont", undefined);
                grid.setValue(i, "yn", 'Success');
            }
        }

        return boolError;
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
            $("#obBusinessRegistPopGrid-totalCount").text(data.totalCount);
            provider.clearRows();
            if(data.totalCount != 0) {
                alert(obBusinessRegistPopGrid.eventhandler.alertMessage.uploadFail);
                provider.addRows(data.payloads); // 중복 오류 데이터 그리드에 남아있음
            }
        }
    }

};
