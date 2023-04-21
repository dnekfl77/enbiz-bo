var msg = x2coMessage.getMessage({
      maxAtchFileMsg : 'customerNoticeMgmt.message.cus.ntc.mgmt.maxAtchFileMsg'
    , maxAtchFileSizeMsg : 'customerNoticeMgmt.message.cus.ntc.mgmt.maxAtchFileSizeMsg'
    , onlyEnglishFileNameMsg : 'customerNoticeMgmt.message.cus.ntc.mgmt.onlyEnglishFileNameMsg'
    , confirmSaveMsg : 'customerNoticeMgmt.message.cus.ntc.mgmt.confirmSaveMsg'
    , noDispMediaCdMsg : 'customerNoticeMgmt.message.cus.ntc.mgmt.noDispMediaCdMsg'
    , noNtcTitleNmMsg : 'customerNoticeMgmt.message.cus.ntc.mgmt.noNtcTitleNmMsg'
    , maxNtcTitleNmMsg : 'customerNoticeMgmt.message.cus.ntc.mgmt.maxNtcTitleNmMsg'
    , noBbStrDtmMsg : 'customerNoticeMgmt.message.cus.ntc.mgmt.noBbStrDtmMsg'
    , noBbEndDtmMsg : 'customerNoticeMgmt.message.cus.ntc.mgmt.noBbEndDtmMsg'
    , noPcNtcContMsg : 'customerNoticeMgmt.message.cus.ntc.mgmt.noPcNtcContMsg'
    , noMoNtcContMsg : 'customerNoticeMgmt.message.cus.ntc.mgmt.noMoNtcContMsg'
});

$.namespace('cusNtcInfoPopup.eventhandler');
cusNtcInfoPopup.eventhandler = {
    init : function () {
        this.editorSetting();
        this.dataSetting();
        this.bindButtonEvent();

        this.maxFileSize = 2097152; // 2MB
        this.deleteFiles = [];
    }
    ,editorSetting : function () {

        nhn.husky.EZCreator.createInIFrame({
            oAppRef: oEditorsPc,
            elPlaceHolder: "pcNtcContEditor",
            sSkinURI: "/static/js/libs/smartEditor/SmartEditor2Skin.html",
            fCreator: "createSEditor2"
        });

        nhn.husky.EZCreator.createInIFrame({
            oAppRef: oEditorsMo,
            elPlaceHolder: "moNtcContEditor",
            sSkinURI: "/static/js/libs/smartEditor/SmartEditor2Skin.html",
            fCreator: "createSEditor2"
        });
    }
    ,dataSetting : function () {

        var that = this;

        // 웹에디터 세팅
        if (_cusNtcInfo) {
            $("#pcNtcContEditor").val(_cusNtcInfo.pcNtcCont);
            $("#moNtcContEditor").val(_cusNtcInfo.moNtcCont);
        }

        // 첨부파일 세팅
        if (_ntcAtchFileList) {

            _ntcAtchFileList.forEach( function (file) {

                // 파일다운로드
                $(".input-group.file-upload > .file-list").append(`<li id="selected_file_${file.fileSeq}"><span class="download" onclick="com.x2commerce.common.Util.downloadfile('${file.atchFileRouteNm}','${file.atchFileNm}')">${file.atchFileNm}</span><button id="btn_sel_file_delete_${file.fileSeq}" class="delete" type="button"></button></li>`);

                $(`#btn_sel_file_delete_${file.fileSeq}`).on( 'click', function() {
                    that.deleteFiles.push(_ntcAtchFileList.find(f => f.fileSeq === file.fileSeq));
                    $(`#selected_file_${file.fileSeq}`).remove();
                });
            });
        }
    }
    ,bindButtonEvent : function () {

        var that = this;

        $('#btn_call_calender').on( 'click', function () {
            that.callCalender();
        });

        $('#btn_upload_file').on('click', function (e) {
            e.preventDefault();

            // 최대 등록 가능 개수 제한 = 2개
            if ( $(".input-group.file-upload > .file-list > li").length >= 2 ) {
                alert(msg.maxAtchFileMsg);
                return;
            }

            // 이미 등록된 파일이 있는 경우
            var fileIdx = 1;
            if ( $(".input-group.file-upload input[type=file]").length > 0 ) {
                fileIdx = parseInt($(".input-group.file-upload input[type=file]").last().attr("id").replace("new_file_", "")) + 1;
            }

            $(".input-group.file-upload").append(
                `<input type="file" style="display: none" name="files" id="new_file_${fileIdx}"/>`
            );

            $(`#new_file_${fileIdx}`).on( 'change', function(e) {

                if ( e.currentTarget.files.length > 0 ) {

                    // 파일개수제한 - 2개
                    if (e.currentTarget.files[0].size > that.maxFileSize) {
                        alert(msg.maxAtchFileSizeMsg);
                        $(`#new_file_${fileIdx}`).remove();
                        return;
                    }

                    // 파일명제한 - 영어,숫자
                    var pattern=/^([a-zA-Z]+)$/;
                    if (!pattern.test((e.currentTarget.files[0].name).split('.')[0])){
                        $(`#new_file_${fileIdx}`).remove();
                        alert(msg.onlyEnglishFileNameMsg);
                        return;
                    }

                    // 파일확장자제한 - jpg,jpeg,png,gif,csv,xls,xlsx
                    if( !getFileFormatCheck(`new_file_${fileIdx}`,_allowExtension) ) return;

                    $(".input-group.file-upload > .file-list").append(
                        `<li id="uploaded_file_${fileIdx}">${e.currentTarget.files[0].name} <button id="btn_up_file_delete_${fileIdx}" class="delete" type="button"></button></li>`
                    );

                    $(`#btn_up_file_delete_${fileIdx}`).on('click', function() {
                        $(`#new_file_${fileIdx}`).remove();
                        $(`#uploaded_file_${fileIdx}`).remove()
                    });
                }
            });
            $(`#new_file_${fileIdx}`).click();

        });

        $('#btn_popup_close').on('click', function () {
            that.close();
        });

        $('#btn_popup_apply').on('click', function () {
            that.apply();
        });
    }
    ,callCalender : function () {
        showCalendar({
            type : 'A',
            format : 'yyyy-MM-dd',
            yyyymmdd1 : $('#bbStrDtm').val(),
            yyyymmdd2 : $('#bbEndDtm').val(),
            fn:function(pin) {
                $('#bbStrDtm').val(pin.yyyymmdd1);
                $('#bbEndDtm').val(pin.yyyymmdd2);
            }
        });
    }
    ,close : function () {
        window.close();
    }
    ,apply : function () {

        oEditorsPc.getById["pcNtcContEditor"].exec("UPDATE_CONTENTS_FIELD", []);
        oEditorsMo.getById["moNtcContEditor"].exec("UPDATE_CONTENTS_FIELD", []);

        if( !this.validate() ) return;
        if( !confirm(msg.confirmSaveMsg) ) return;

        var thisForm = $('#cusNtcInfoForm');
        var disabled = thisForm.find(':input:disabled',':select:disabled').removeAttr('disabled');
        var thisFormObject = thisForm.serializeObject();
        disabled.attr('disabled','disabled');

        thisFormObject.ntcClssCd = '10';
        thisFormObject.uprFixYn = $("#uprFixYn").is(":checked") ? "Y" : "N";
        thisFormObject.pcNtcCont = (thisFormObject.dispMediaCd === '10')? $("#pcNtcContEditor").val() : '';
        thisFormObject.moNtcCont = (thisFormObject.dispMediaCd === '20')? $("#moNtcContEditor").val() : '';

        var uploadFile = new FormData();
        if ( $(".file-upload input[type=file]").length > 0 ) {
            $(".file-upload input[type=file]").each((idx, file) => {
                if(file && file.files && file.files.length > 0) {
                    uploadFile.append("files", file.files[0]);
                }
            });
        }

        var deleteFileList = [];
        this.deleteFiles.forEach( function ( file ) {
            var deleted = {};
            deleted.fileSeq = file.fileSeq;
            deleteFileList.push(deleted);
        });
        thisFormObject.deleteFileList = deleteFileList;
        uploadFile.append('formData',JSON.stringify(thisFormObject));

        common.Ajax.sendMultiPartRequest(
            _baseUrl + "system/customerNoticeMgmt.saveCustomerNotice.do",
            uploadFile,
            function(obj) {
                if ( obj.succeeded ) {
                    opener.cusNtcListGrid.eventhandler.onSearch();
                    window.close();
                }
            },
            false, false
        );

    }
    ,validate : function () {

        if ( !$('#dispMediaCd').val() ) {
            alert(msg.noDispMediaCdMsg);
            $('#dispMediaCd').focus();
            return false;
        }

        if (!$('#ntcTitleNm').val()) {
            alert(msg.noNtcTitleNmMsg);
            $('#ntcTitleNm').focus();
            return false;
        }

        if ( $('#ntcTitleNm').val().length > 200 ) {
            alert(msg.maxNtcTitleNmMsg);
            $('#ntcTitleNm').focus();
            return false;
        }

        if (!$('#bbStrDtm').val()) {
            alert(msg.noBbStrDtmMsg);
            $('#bbStrDtm').focus();
            return false;
        }

        if (!$('#bbEndDtm').val()) {
            alert(msg.noBbEndDtmMsg);
            $('#bbEndDtm').focus();
            return false;
        }

        var pcNtcCont = $('#pcNtcContEditor').val();
        var moNtcCont = $('#moNtcContEditor').val();

        if ( $('#dispMediaCd').val() !== '20') {
            if( pcNtcCont == ""  || pcNtcCont == null || pcNtcCont == '&nbsp;' || pcNtcCont == '<p>&nbsp;</p>')  {
                alert(msg.noPcNtcContMsg);
                oEditorsPc.getById["pcNtcContEditor"].exec("FOCUS");
                return false;
            }
        }

        if ( $('#dispMediaCd').val() !== '10') {
            if( moNtcCont == ""  || moNtcCont == null || moNtcCont == '&nbsp;' || moNtcCont == '<p>&nbsp;</p>')  {
                alert(msg.noMoNtcContMsg);
                oEditorsMo.getById["moNtcContEditor"].exec("FOCUS");
                return false;
            }
        }

        return true;
    }
}