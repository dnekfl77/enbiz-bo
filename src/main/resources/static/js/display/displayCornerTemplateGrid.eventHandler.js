$.namespace("displayCornerTemplateGrid.eventhandler");
displayCornerTemplateGrid.eventhandler = {

    // 초기화
    init : function () {
        if(req == null) { // 입력
            this.valueInit();
            this.imgSetting(noneImg, true);
        } else { // 수정
            this.valueSetting();
            this.onSearch(0, false);
        }
        this.bindButtonEvent();
    },

    // 초기화면 값 셋팅
    valueInit : function(){
        $('input:radio[name=useYn]').first().attr("checked",true); // 사용여부
        $('input:radio[name=setUseYn]').last().attr("checked",true); // 세트 사용여부
        this.setCntSetting();
        this.tableRowSetting(true);
    },

    // 수정 시 값 셋팅
    valueSetting : function(){
        var self = this;
        $("#conrNoText").text(req.conrNo);
        $("#conrNo").val(req.conrNo);
        $("#conrNm").val(req.conrNm);
        $('input:radio[name=useYn]:input[value='+ req.useYn +']').attr("checked",true);
        $("#aempNm").val(req.userNm);
        $("#aempId").val(req.userId);
        $("#conrDesc").val(req.conrDesc);
        $('input:radio[name=setUseYn]:input[value='+ req.setUseYn +']').attr("checked",true);

        // 대상정보
        if(req.setUseYn == "Y"){ // 세트 사용
            if ($('#setCnt > option').first().attr("value") == "1") {
                $('#setCnt > option').first().remove();
            }
            $('#setCnt').val(req.setCnt);
            $('#setCnt').attr("disabled",false);
            this.tableRowValueSetting_Y(); // 대상정보 행 셋팅 (세트인경우)
        } else if(req.setUseYn == "N"){ // 세트 사용 안함
            if ($('#setCnt > option').first().attr("value") != "1") {
                $('#setCnt').prepend(` <option value="1">${msg.selectLabel}</option> `);
            }
            $('#setCnt').val(req.setCnt);
            $('#setCnt').attr("disabled",true);
            this.tableRowValueSetting_N(); // 대상정보 행 셋팅 (세트 사용안함인 경우)
        }

        // 첨부파일 셋팅
        $("#conrImgFileNm").val(req.conrImgFileNm);
        $("#conrImgPathNm").val(req.conrImgPathNm);
        if(req.conrImgFileNm != "" && req.conrImgPathNm != "") {
            $(".input-group.file-upload").append('<ul class="file-list"></ul>');
            $(".input-group.file-upload > .file-list").append('<li id="li_file">' + req.conrImgFileNm + '<button id="btn_file_delete" class="delete" type="button">삭제</button></li>');
            $("#btn_file_delete").on("click", function(e) {
                $("#conrImgFileNm").val("");
                $("#conrImgPathNm").val("");
                $("#li_file").remove();
                self.imgSetting(noneImg, true);
            });
            self.imgSetting(req.conrImgPathNm, false);
        } else {
            this.imgSetting(noneImg, true);
        }
    },

    bindButtonEvent : function(){
        var self = this;

         // 세트 사용여부에 따른 layout 변경
         $("input:radio[name=setUseYn]").change(function(){
            var radioCheck = true; // 라디오 변경인 경우만 true
            if(self.tableRowRemove(radioCheck)){
                self.setCntSetting();
            }
            self.tableRowSetting(radioCheck);
         });

         // 세트 갯수에 따른 layout 변경
         $("#setCnt").change(function(){
            self.tableRowRemove(false);
            self.tableRowSetting(false); // 세트 사용에 따른 테이블 행추가
         });

        // 전시 담당자 > 사용자 공통팝업 호출
        $('#btn_aempPopup_call').click(function() {
            var pin = { argSelectType: "1", argWorkStatCd: "01", argUseYn: "Y" };
            var POP_DATA = {
                url: _baseUrl + 'popup/userMgmtPopup.mdListPopup.do'
                , winName: 'mdListPopup'
                , title: 'MD 조회 팝업'
                , _title: 'MD 조회 팝업'
                , left: 20
                , top: 20
                , width: 690
                , height: 600
                , scrollbars: false
                , autoresize: false
            };
            popCommon(pin, POP_DATA, self.popupMdListCallback);
        });

        // 전시담당자 지우기
        $('#btn_aempPopup_reset').click(function() {
            $('#aempId').val('');
            $('#aempNm').val('');
        });

        // 그리드 채널 추가 버튼
        $("#btn_grid_insert").click(function() {
            self.templatePopup();
        });

        // 그리드 행삭제 버튼
        $("#btn_grid_remove").click(function() {
            self.grid.cancel();
            self.onDelete();
        });

		// 파일 선택 버튼
        $("#btn_fileUpload").on("click", function(e) {
            e.preventDefault();
            if($(".input-group.file-upload > .file-list > li").length == 1) {
                alert(msg.fileLength);
                return false;
            } else {
                $(".input-group.file-upload > input[type=file]").remove();
                $(".input-group.file-upload").append('<input type="file" style="display: none" name="files" id="uploadedFile"/>');

                $("#uploadedFile").on("change", function(e) {
                    if(e.currentTarget.files.length > 0) {
                        if(e.currentTarget.files[0].size > maxUploadSizePerFile) {
                            alert(msg.fileLimitSize);
                            return false;
                        }

                        var fileType = ["image/png", "image/gif", "image/jpeg"];
                        var fileCheck = false;
                        for(var i=0; i<fileType.length; i++){
                            if(e.currentTarget.files[0].type === fileType[i]) {
                                fileCheck = true;
                                break;
                            }
                        }

                        if(!fileCheck) {
                            alert(msg.fileTypeError);
                            return false;
                        }

                        if( $(".input-group.file-upload > .file-list").length <= 0 ) {
                            $(".input-group.file-upload").append('<ul class="file-list"></ul>');
                        }

                        $(".input-group.file-upload > .file-list").append(`<li id="uploadedLi">${e.currentTarget.files[0].name} <button id="btn_file_delete" class="delete" type="button">삭제</button></li>`);

                        $("#btn_file_delete").on("click", function(e) {
                            $("#uploadedFile").remove();
                            $("#uploadedLi").remove();
                            self.imgSetting(noneImg, true);
                        });

                        // 이미지 미리보기
                        var reader = new FileReader();
                        reader.onload = function (e) {
                           self.imgSetting(e.target.result, true);
                        }
                        reader.readAsDataURL(e.currentTarget.files[0]);
                    }
                });
                $("#uploadedFile").click();
            }
        });

        // 취소 버튼
        $('#btn_popup_cancel').click(function() {
            if(confirm(msg.cancelMessage) == true) {
                window.close();
            } else {
               return;
            }
        });

        // 저장 버튼
        $('#btn_popup_save').click(function() {
            self.onSave();
        });
    },

    popupMdListCallback : function(e) {
        var data = JSON.parse(e.data);
        $('#aempNm').val(data[0].userNm);
        $('#aempId').val(data[0].userId);
    },

    // + 버튼을 누른 경우 추가되는 코너대상정보의 한 행
    targetRowInsert : function(rowIdx, targetIdx){
        var self = this;
        var tableRow = $("#conrTargetList_" + rowIdx);
        if(targetIdx != 1) {
            var text = "targetRow_" + rowIdx + "_";
            targetIdx = parseInt($("#conrTargetList_" + rowIdx + " > div").last().attr("id").replace(text, "")) + 1;
        }

        tableRow.append(`  <div id="targetRow_${rowIdx}_${targetIdx}" class="input-group block"></div> `);

        var area = $("#targetRow_" + rowIdx + "_" + targetIdx);

        area.append(`
            <input type="hidden" id="conrTgtNm_${rowIdx}_${targetIdx}" name="conrTgtNm" value="none"> <!-- 코너대상명 -->
            <input type="hidden" id="conrTgtNo_${rowIdx}_${targetIdx}" name="conrTgtNo"> <!-- 코너대상 번호 -->
            <input type="hidden" id="dpthNo_${rowIdx}_${targetIdx}" name="dpthNo" value="2"> <!-- 깊이번호 -->
            <input type="hidden" id="uprConrTgtNo_${rowIdx}_${targetIdx}" name="uprConrTgtNo"> <!--상위 코너대상 번호 -->
            <input type="text" id="dispSeq_${rowIdx}_${targetIdx}" name="dispSeq" class="input w10"  maxlength="3" onKeyup="number(this)"> <!-- 전시 순서 -->
            <select class="form-control" id="conrTgtCd_${rowIdx}_${targetIdx}" name="conrTgtCd"> <!-- 코너대상 코드 -->
                <option value="">:: 선택 ::</option>
            </select>
        `);

        codeList.forEach(function(list) {// selectBox의 옵션 추가
            $("#conrTgtCd_" + rowIdx + "_" + targetIdx).append(`
                <option value="${list.cd}">${list.cdNm}</option>
            `);
        });

        $("#conrTgtCd_" + rowIdx + "_" + targetIdx).change(function() { // 코너대상 코드의 중복 확인
            var thisVal = $(this).val();
            var thisId = $(this).attr("id");
            $("#conrTargetList_" + rowIdx + " > div > select").each(function() {
                if(thisId != $(this).attr("id")){
                    if(thisVal == $(this).val()) {
                        alert(msg.checkConrTgtCd);
                        $("#conrTgtCd_" + rowIdx + "_" + targetIdx).val('');
                        return;
                    }
                }
            });
        });

        area.append(`
            <input type="text" id="conrTgtCnt_${rowIdx}_${targetIdx}" name="conrTgtCnt" class="input w10" maxlength="3" onKeyup="number(this)"> <!-- 코너대상 수 -->
            <em>개</em>
            <a class="icon-data-plus" id="btn_plus_${rowIdx}_${targetIdx}" name="btn_plus"></a>
        `);

        if(targetIdx != 1){ // 첫행이 아닌 경우만 삭제 가능
            area.append(`
                <a class="icon-data-minus" id="btn_minus_${rowIdx}_${targetIdx}" name="btn_minus"></a>
            `);

            // - 버튼
            $("#btn_minus_" + rowIdx + "_" + targetIdx).click(function() {// btn_minus_2_3
                self.targetRowRemove(rowIdx,targetIdx);
            });
        }

        area.append(` <br/> `);

        $("#btn_plus_" + rowIdx + "_" + targetIdx).click(function() {  // btn_plus_2_3
            if($("#conrTargetList_" + rowIdx + " > div").length >= 10) {
                alert(msg.targetLengthCheck);
            } else {
                self.targetRowInsert(rowIdx,targetIdx+1);
            }
        });

    },

    targetRowRemove : function(rowIdx,targetIdx){
        // 수정화면에서 디비에 저장되어있던 행들을 지울 경우 -> 삭제 가능여부 확인 후 배열에 저장
        if(req != null) {
            var conrTgtNo = $("#conrTgtNo_" + rowIdx + "_" + targetIdx).val();

            if( $("#conrTgtNo_" + rowIdx + "_" + targetIdx).val() != null || $("#conrTgtNo_" + rowIdx + "_" + targetIdx).val() != "") {
                // 전시세트정보에 데이터가 있는지 확인
                var param = '&conrNo=' + req.conrNo + '&conrTgtNo=' + conrTgtNo;

                common.Ajax.sendRequest(
                     "POST"
                     ,_baseUrl + "display/displayCornerMgmt.checkPrConrSetInfo.do"
                     ,param
                     ,function(obj) {
                          if (obj.succeeded) {
                              // 삭제 가능한 행들을 배열에 저장
                              removeList[removeListIdx] = conrTgtNo;
                              removeListIdx++;

                              $("#targetRow_" + rowIdx + "_" + targetIdx).remove();

                          } else {
                             alert(msg.checkPrConrSetInfo);
                             return false;
                          }
                     }
                 );
            }
        } else { // 입력 창인 경우 해당 행 remove
            $("#targetRow_" + rowIdx + "_" + targetIdx).remove();
        }
    },

    setCntSetting : function() {
        if($("input[name=setUseYn]:checked").val() == "Y"){ // 세트 사용
            if ($('#setCnt > option').first().attr("value") == "1") {
                $('#setCnt > option').first().remove();
            }
            $('#setCnt').val("2");
            $('#setCnt').attr("disabled",false);
        } else if($("input[name=setUseYn]:checked").val() == "N"){ // 세트 사용 안함
            if ($('#setCnt > option').first().attr("value") != "1") {
                $('#setCnt').prepend(` <option value="1">${msg.selectLabel}</option> `);
            }
            $('#setCnt').val("1");
            $('#setCnt').attr("disabled",true);
        }
    },

    tableRowSetting : function(radioCheck){
        var tableLength = $("#conrTargetTable > tr").length;
        var setCnt = Number( $('#setCnt').val() );

        if( setCnt > tableLength - 1 ) {
            for(var i=tableLength; i<setCnt+1; i++){
                this.tableRowInsert(i); // 전시 대상 한 행
                this.targetRowInsert(i,1);
            }
        }
    },

    // 대상정보 행 셋팅 (세트 사용안함인 경우)
    tableRowValueSetting_N : function(){
        this.tableRowInsert(1); // 전시 대상 한 세트
        for(var i=0; i<reqTarget.length; i++){
            this.targetRowInsert(1,i+1); // 전세대상의 한 행
            $("input[name=conrTgtNo]:eq("+ i +")").val(reqTarget[i].conrTgtNo);
            $("input[name=conrTgtNm]:eq("+ i +")").val(reqTarget[i].conrTgtNm);
            $("input[name=dpthNo]:eq("+ i +")").val(reqTarget[i].dpthNo);
            $("input[name=uprConrTgtNo]:eq("+ i +")").val(reqTarget[i].uprConrTgtNo);
            $("input[name=dispSeq]:eq("+ i +")").val(reqTarget[i].dispSeq);
            $("select[name=conrTgtCd]:eq("+ i +")").val(reqTarget[i].conrTgtCd);
            $("input[name=conrTgtCnt]:eq("+ i +")").val(reqTarget[i].conrTgtCnt);
        }
    },

    // 대상정보 행 셋팅 (세트인 경우)
    tableRowValueSetting_Y : function(){
        // 전시 대상 한 세트당 전시대상갯수를 계산
        var dpthArr = [];
        var dpthArrIdx = -1;
        var dpthArrVal = 0;
        for(var i=0; i<reqTarget.length; i++){
            if(reqTarget[i].dpthNo == "1") {
                dpthArrIdx++;
                dpthArr[dpthArrIdx] = 0;
                dpthArrVal = 0;
            } else {
                dpthArrVal++;
                dpthArr[dpthArrIdx] = dpthArrVal;
            }
        }

        var setCnt = req.setCnt;
        for(var i=0; i<setCnt; i++){
            this.tableRowInsert(i+1); // 전시 대상 한 세트
             for(var j=1; j<dpthArr[i]+1; j++){
                this.targetRowInsert(i+1,j); // 전세대상의 한 행
             }
        }

        for(var i=0; i<reqTarget.length; i++){
            $("input[name=conrTgtNo]:eq("+ i +")").val(reqTarget[i].conrTgtNo);
            $("input[name=conrTgtNm]:eq("+ i +")").val(reqTarget[i].conrTgtNm);
            $("input[name=dpthNo]:eq("+ i +")").val(reqTarget[i].dpthNo);
            $("input[name=uprConrTgtNo]:eq("+ i +")").val(reqTarget[i].uprConrTgtNo);
            $("input[name=dispSeq]:eq("+ i +")").val(reqTarget[i].dispSeq);
            $("select[name=conrTgtCd]:eq("+ i +")").val(reqTarget[i].conrTgtCd);
            $("input[name=conrTgtCnt]:eq("+ i +")").val(reqTarget[i].conrTgtCnt);
        }

    },

    // 전시 대상 테이블 Row 추가
    tableRowInsert : function(rowIdx) {
        if($("input[name=setUseYn]:checked").val() == "Y"){
            var text = (rowIdx+9).toString(16).toUpperCase();
            $("#conrTargetTable").append(`
               <tr id="conrTargetRows_${rowIdx}">
                   <td class="label"><strong>전시 대상 ${text}</strong></td>
                   <td colspan="3">
                       <div class="input-group block" id="conrTargetList_${rowIdx}"></div>
                   </td>
               </tr>
            `);
            var area = $("#conrTargetList_" + rowIdx);
            area.append(` <input type="text" id="conrTgtNm_${rowIdx}" name="conrTgtNm" class="input w70" style="margin-bottom: 5px;"> <br/>  `); // 코너대상명
            area.append(`
                <input type="hidden" id="conrTgtNo_${rowIdx}" name="conrTgtNo"> <!-- 코너대상 번호 -->
                <input type="hidden" id="dpthNo_${rowIdx}" name="dpthNo" value="1"> <!-- 깊이번호 -->
                <input type="hidden" id="uprConrTgtNo_${rowIdx}" name="uprConrTgtNo"> <!--상위 코너대상 번호 -->
                <input type="hidden" id="dispSeq_${rowIdx}" name="dispSeq" value="none"> <!-- 전시 순서 -->
                <input type="hidden" id="conrTgtCnt_${rowIdx}" name="conrTgtCnt" value="none"> <!--대상코너수 -->
                <select class="form-control" id="conrTgtCd_${rowIdx}" name="conrTgtCd" style="display:none;"> <!-- 코너대상 코드 -->
                    <option value="none">:</option>
                </select>
            `);
        } else {
            $("#conrTargetTable").append(`
               <tr id="conrTargetRows_${rowIdx}">
                   <td class="label"><strong>전시 대상</strong></td>
                   <td colspan="3">
                       <div class="input-group block" id="conrTargetList_${rowIdx}"></div>
                   </td>
               </tr>
            `);
        }
    },

    // 전시 대상 테이블 ROW 삭제
    tableRowRemove : function(radioCheck){
        var tableLength = $("#conrTargetTable > tr").length - 1;
        var setCnt = $('#setCnt').val();
        var removeRow = tableLength - setCnt;
        var returnVal = true;

        if(radioCheck){ // 세트 사용여부 변경 -> 모두삭제
            returnVal = this.tableRowRemoveAndChecking(tableLength, radioCheck);
        } else { // 세트갯수 변경 -> 기존 세트보다 적은 세트로 이동하는 경우 하단행부터 순차적으로 삭제
            if( tableLength > 1 ) {
                 if(tableLength > setCnt) {
                    returnVal = this.tableRowRemoveAndChecking(removeRow, radioCheck);
                    if(!returnVal){ // 삭제 불가할 경우 원래 세트갯수값으로 셋팅
                        $('#setCnt').val(tableLength);
                    }
                 }
            }
        }
        return returnVal;
    },

    // 삭제 여부 확인 및 삭제시 삭제행 정보 저장
    tableRowRemoveAndChecking : function(tableRowNum, radioCheck) {
        var check = true;
        var selectRemoveList = Array();
        var selectRemoveListIdx = 0;
        var returnVal = true;

         for(var i=0; i<tableRowNum; i++) {
                // 지우려는 행이 전시세트정보에 데이터가 있는지 확인
                if(req != null) {
                    // 대상명 conrTgtNo 번호
                    var nmConrTgtNo = $("#conrTargetTable > tr:last > td:eq(1) > div > input[name=conrTgtNo]").val();

                    if( nmConrTgtNo != null || nmConrTgtNo != "") {
                        // 전시세트정보에 데이터가 있는지 확인
                        var param = '&conrNo=' + req.conrNo + '&conrTgtNo=' + nmConrTgtNo;

                        common.Ajax.sendRequestSync(
                             "POST"
                             ,_baseUrl + "display/displayCornerMgmt.checkPrConrSetInfo.do"
                             ,param
                             ,function(obj) {
                                  if (obj.succeeded) {
                                      // 삭제 가능한 행들을 배열에 저장
                                      selectRemoveList[selectRemoveListIdx] = nmConrTgtNo;
                                      selectRemoveListIdx++;
                                  } else {
                                     alert( $("#conrTargetTable > tr:last > td:eq(0) > strong").text() + " : " + msg.TrcheckPrConrSetInfo);
                                     check = false;
                                  }
                             }
                         );
                    }

                    if(!check) {
                        if(radioCheck) {
                            if($('input[name=setUseYn]:radio[value=Y]')[0].checked){
                                $('input[name=setUseYn]:radio[value=Y]')[0].checked = false;
                                $('input[name=setUseYn]:radio[value=N]')[0].checked = true;
                            } else {
                                $('input[name=setUseYn]:radio[value=Y]')[0].checked = true;
                                $('input[name=setUseYn]:radio[value=N]')[0].checked = false;
                            }
                        }
                        returnVal = false;
                        return returnVal;
                    }

                    // 대상명 행 먼저 확인 후 True 인 경우 하위 행들 확인
                    var cnt = $("#conrTargetTable > tr:last > td:eq(1) > div > div").length;
                    for(var j = 0; j < cnt; j++){
                            var conrTgtNo = $("#conrTargetTable > tr:last > td:eq(1) > div > div:eq(" + j + ") > input[name=conrTgtNo]").val();

                            if( conrTgtNo != null || conrTgtNo != "") {
                                // 전시세트정보에 데이터가 있는지 확인
                                var param = '&conrNo=' + req.conrNo + '&conrTgtNo=' + conrTgtNo;

                                common.Ajax.sendRequestSync(
                                     "POST"
                                     ,_baseUrl + "display/displayCornerMgmt.checkPrConrSetInfo.do"
                                     ,param
                                     ,function(obj) {
                                          if (obj.succeeded) {
                                              // 삭제 가능한 행들을 배열에 저장
                                              selectRemoveList[selectRemoveListIdx] = conrTgtNo;
                                              selectRemoveListIdx++;
                                          } else {
                                             alert( $("#conrTargetTable > tr:last > td:eq(0) > strong").text() + " : " + msg.TrcheckPrConrSetInfo);
                                             check = false;
                                          }
                                     }
                                 );
                            }

                        if(!check) {
                            if(radioCheck) {
                                if($('input[name=setUseYn]:radio[value=Y]')[0].checked){
                                    $('input[name=setUseYn]:radio[value=Y]')[0].checked = false;
                                    $('input[name=setUseYn]:radio[value=N]')[0].checked = true;
                                } else {
                                    $('input[name=setUseYn]:radio[value=Y]')[0].checked = true;
                                    $('input[name=setUseYn]:radio[value=N]')[0].checked = false;
                                }
                            }
                            returnVal = false;
                            return returnVal;
                        }
                    }
                    $("#conrTargetTable > tr").last().remove();  // 하단부터 삭제
                } else { // 입력 창인 경우 해당 행 remove
                    returnVal = true;
                    $("#conrTargetTable > tr").last().remove();  // 하단부터 삭제
                };

         }

         // select 박스 변경에 따른 삭제 행들의 값을 기존 삭제 리스트에 추가
         removeList.push(...selectRemoveList);
         removeListIdx = removeListIdx + selectRemoveList.length;
         return returnVal;
    },

    // 필수값 확인
    valCheck : function(){
        var tableLength = $("#conrTargetTable > tr").length;

        if($('#conrNm').val() == null || $('#conrNm').val() == '') { // 전시 코너명
            alert(msg.displayCornerNm + msg.necessaryCheckMessage);
            $('#conrNm').focus();
            return false;
        } else if($('#aempNm').val() == null || $('#aempNm').val() == '') { // 전시담당자
             alert(msg.displayManager + msg.necessaryCheckMessage);
             $('#btn_aempPopup_call').focus();
             return false;
        }

        for(var i=1; i<tableLength; i++){  // tr
            var targetLength = $("#conrTargetList_" + i + " > div").length; // 코너 대상 행의 수

            if($("input[name=setUseYn]:checked").val() == "Y") { // 세트사용인 경우
                if($("#conrTargetList_" + i + " > input[name=conrTgtNm]").val() == null || $("#conrTargetList_" + i + " > input[name=conrTgtNm]").val() == '') { // 세트 그룹명
                     alert(msg.setGroupNm + msg.necessaryCheckMessage);
                     $("#conrTargetList_" + i + " > input[name=conrTgtNm]").focus();
                     return false;
                     break;
                }
            }

            for(var j=0; j<targetLength; j++){

                if($("#conrTargetList_" + i + " > div:eq(" + j + ") > input[name=dispSeq]").val() == null ||
                        $("#conrTargetList_" + i + " > div:eq(" + j + ") > input[name=dispSeq]").val() == '') { // 전시 순서
                     alert(msg.dispSeq + msg.necessaryCheckMessage);
                     $("#conrTargetList_" + i + " > div:eq(" + j + ") > input[name=dispSeq]").focus();
                     return false;
                } else if($("#conrTargetList_" + i + " > div:eq(" + j + ") > select").val() == null ||
                        $("#conrTargetList_" + i + " > div:eq(" + j + ") > select").val() == '') { // 코너 대상
                     alert(msg.cornTarget + msg.necessaryCheckMessage);
                     $("#conrTargetList_" + i + " > div:eq(" + j + ") > select").focus();
                     return false;
                } else if($("#conrTargetList_" + i + " > div:eq(" + j + ") > input[name=conrTgtCnt]").val() == null ||
                        $("#conrTargetList_" + i + " > div:eq(" + j + ") > input[name=conrTgtCnt]").val() == '') { // 대상 갯수
                     alert(msg.cornTargetCnt + msg.necessaryCheckMessage);
                     $("#conrTargetList_" + i + " > div:eq(" + j + ") > input[name=conrTgtCnt]").focus();
                     return false;
                }

                if(!($("#conrTargetList_" + i + " > div:eq(" + j + ") > input[name=dispSeq]").val()>= 1 &&
                        $("#conrTargetList_" + i + " > div:eq(" + j + ") > input[name=dispSeq]").val() < 1000)) { // 전시 순서서 (1~999 사이의 수)
                   alert(msg.numberRange1CheckMessage);
                    $("#conrTargetList_" + i + " > div:eq(" + j + ") > input[name=dispSeq]").focus();
                    return false;
                }

            }
        }
        return true;
    },

    // 전시 템플릿 조회 팝업 호출
    templatePopup : function(){
        var pin = {
            argSelectType: 'N'
            , argTmplTypCd : ''
        };
        var POP_DATA = {
            url: _baseUrl + 'popup/templateMgmtPopup.templateListPopup.do'
            , winName: 'templatePopup'
            , title: '템플릿 조회'
            , _title: '템플릿 조회'
            , left: 20
            , top: 20
            , width: 1000
            , height: 700
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA, this.templatePopupCallback.bind(this));
    },

    // 전시 템플릿 조회 팝업 적용데이터 셋팅
    templatePopupCallback : function(e){
        this.grid.commit();
        var resultData = JSON.parse(e.data);
        var chlContents = resultData; // 중복을 제거한 값
        var rowCount = this.grid.getItemCount(); // 원래 그리드에 있던 행의 수

        // 수정인 경우만 체크
        for(var i = 0; i<rowCount; i++){
            for(var j = 0; j<resultData.length; j++) {
                if(resultData[j].tmplNo == this.grid.getValue(i , "tmplNo") ) { // 추가된 템플릿과 원래 그리드에 있던 템플릿 비교
                    chlContents.splice(j,1); // 중복 요소 삭제
                }
            }
        }

        this.grid.getDataSource().addRows(chlContents);
    },

    // 연결전시템플릿 데이터 삭제 가능여부 확인 및 삭제
    onDelete : function() {
        var checkedItems = this.grid.getCheckedItems();
        if (checkedItems.length == 0) {
            alert(msg.deleteRowCheck);
            return;
        }

        // 수정인 경우 전시 코너정보에 코너 데이터 여부 확인
        if(req != null) {
            var param = '&conrNo=' + req.conrNo;
            common.Ajax.sendRequestSync(
                 "POST"
                 ,_baseUrl + "display/displayCornerMgmt.checkPrDispConrInfo.do"
                 ,param
                 ,function(obj) {
                      if (obj.succeeded) {
                         displayCornerTemplateGrid.eventhandler.defaultHandler.onDelete(this.grid);
                      } else {
                         alert(msg.checkPrDispConrInfo);
                         return false;
                      }
                 }
             );
        } else {
            this.defaultHandler.onDelete(this.grid);
        }
    },

    // 전시 코너 대상정보의 전시 대상 데이터 저장
    targetValSetting : function() {
        var conrTgtList = new Array();  // 코너대상
        var tableLength = $("#conrTargetTable > tr").length;

        for(var i=1; i<tableLength; i++){  // tr
            var targetLength = $("#conrTargetList_" + i + " > div").length; // 코너 대상 행의 수

            if($("input[name=setUseYn]:checked").val() == "Y") { // 세트사용인 경우
                var conrTgtJson = new Object(); // 코너대상
                conrTgtJson.exConrTgtNo = i.toString();
                conrTgtJson.conrTgtNo = $("#conrTargetList_" + i + " > input[name=conrTgtNo]").val();
                conrTgtJson.dpthNo = $("#conrTargetList_" + i + " > input[name=dpthNo]").val();
                conrTgtJson.uprConrTgtNo = $("#conrTargetList_" + i + " > input[name=uprConrTgtNo]").val();
                conrTgtJson.conrTgtNm = $("#conrTargetList_" + i + " > input[name=conrTgtNm]").val();
                conrTgtJson.dispSeq = "0";
                conrTgtJson.conrTgtCd = "";
                conrTgtJson.conrTgtCnt = "0";

                conrTgtList.push(conrTgtJson);
            }

            for(var j=0; j<targetLength; j++){
                var conrTgtJson = new Object(); // 코너대상
                conrTgtJson.exConrTgtNo = $("#conrTargetList_" + i + " > div:eq(" + j + ")").attr("id").replace("targetRow_", "");
                conrTgtJson.conrTgtNo = $("#conrTargetList_" + i + " > div:eq(" + j + ") > input[name=conrTgtNo]").val();
                conrTgtJson.dpthNo = $("#conrTargetList_" + i + " > div:eq(" + j + ") > input[name=dpthNo]").val();
                conrTgtJson.uprConrTgtNo = $("#conrTargetList_" + i + " > div:eq(" + j + ") > input[name=uprConrTgtNo]").val();
                conrTgtJson.conrTgtNm = "";
                conrTgtJson.dispSeq = $("#conrTargetList_" + i + " > div:eq(" + j + ") > input[name=dispSeq]").val();
                conrTgtJson.conrTgtCd = $("#conrTargetList_" + i + " > div:eq(" + j + ") > select").val();
                conrTgtJson.conrTgtCnt = $("#conrTargetList_" + i + " > div:eq(" + j + ") > input[name=conrTgtCnt]").val();

                for(var p=0; p<conrTgtList.length; p++) {
                    var setId = conrTgtList[p].exConrTgtNo.split("_")[0];
                    var thisId = conrTgtJson.exConrTgtNo.split("_")[0];
                    if( setId == thisId && conrTgtList[p].conrTgtCd == conrTgtJson.conrTgtCd ){
                        alert(msg.checkConrTgtCd);
                        return false;
                    }
                }

                conrTgtList.push(conrTgtJson);
            }
        }

        $("#conrTgtList").val(JSON.stringify(conrTgtList));
        return true;
    },

    // 코너상세조회
    onSearch : function(pageIdx, isOpenToast){
        this.grid.cancel();
        pageIdx = !pageIdx ? 0 : pageIdx;
        var self = this;
        var pagingFunc = function(pageIdx){return self.onSearch(pageIdx, false);};
        this.controller.doQuery(this,'',pageIdx, pagingFunc, null, isOpenToast);
    },

    // 전시 코너 관리 저장
    onSave : function() {
        this.grid.commit();
        if(!this.valCheck()){ return false; }  // 값 체크
        if(!confirm(msg.saveQuestionMessage)) { return false; }

        if(!this.targetValSetting()){ return; } // 전시 코너 대상 값 리스트로 셋팅
        if(req != null) {
            $('#targetRemoveList').val(removeList);
        }

        // 템플릿 그리드 추가 데이터 셋팅
        var dataResource = this.grid.getDataSource();
        for(var i = 0; i<this.grid.getItemCount(); i++){
            if(this.grid.getDataSource().getRowState(i) == "created") {
                this.grid.checkRow(i);
            }
        }

        var formData = new FormData();
        var form = {
            conrNo   : $('#conrNo').val(),
            conrNm   : $('#conrNm').val(),
            useYn    : $("input[name=useYn]:checked").val(),
            aempId   : $('#aempId').val(),
            conrDesc : $('#conrDesc').val(),
            setUseYn : $("input[name=setUseYn]:checked").val(),
            setCnt   : $('#setCnt').val(),
            targetRemoveList : $("#targetRemoveList").val()
        }

        if($(".input-group.file-upload input[type=file]").length > 0) { // 첨부파일 저장
            var file = $(".input-group.file-upload input[type=file]")
            if(file.getFileSize() > maxUploadSizePerFile) {
                alert(msg.fileLimitSize);
                return false;
            } else {
                formData.append("file", file[0].files[0]);
            }
        } else {
            form.conrImgFileNm = $("#conrImgFileNm").val();
            form.conrImgPathNm = $("#conrImgPathNm").val();
        }
        formData.append('prConrBaseRequest', JSON.stringify(form));
        formData.append('conrTgtList', $("#conrTgtList").val());
        formData.append('displayCornerTemplateGrid', JSON.stringify(this.controller.extractGridPayloads(this.grid)));

        $.ajax({
            url : _baseUrl + "display/displayCornerMgmt.saveDetailDisplayCornerMgmt.do",
            data : formData,
            type : 'POST',
            enctype : 'multipart/form-data',
            processData : false,
            contentType : false,
            dataType : 'json',
            cache : false,
            success : function(data){
               alert(data.message);
               if(data.succeeded){
                   if(reSearchPage == "displayCornerMgmt") { // 전시 코너 관리에서 부른 경우
                       opener.displayCornerGrid.eventhandler.onSearch(0, false);
                   } else if(reSearchPage == "displayTemplateMgmt") { // 전시 템플릿 관리에서 부른 경우
                       opener.displayTemplateGrid.eventhandler.onSearch(0, false);
                   } else if(reSearchPage == "displayTemplateMgmt_corner") { // 전시 템플릿 관리(코너그리드)에서 부른 경우
                       opener.displayTemplateCornerGrid.eventhandler.onSearch(0, false);
                   }
                   window.close();
              }
            }
        });
    },

    // 이미지 미리보기
    imgSetting : function(src, defaultImg){
        $("div#imgFile > img").remove();
        var img = document.createElement("img");
        if(defaultImg) {
            img.setAttribute("src", src);
        } else {
            img.setAttribute("src", _uploadDomain + src);
        }
        img.setAttribute("alt", "uploadImage");
        img.setAttribute("flag", "none");
        img.setAttribute("langcd", "");
        img.setAttribute("class", "image");
        img.setAttribute("style", "width: 54px;height:57px;");
        document.querySelector("div#imgFile").appendChild(img);
    }

};