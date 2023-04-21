$.namespace("menuListGrid.eventhandler");
menuListGrid.eventhandler = {
    init : function () {
        this.editorSetting();
        this.bindButtonEvent();
        this.treeLoading();
    },

    treeLoading : function(){
        var setting = {
            view: {
                showLine: true,
                showIcon : true
            },
            data: {
                key : {
                  name : "rtTgtNm"
                },
                simpleData: {
                    enable: true,
                    idKey: "rtTgtSeq",
                    pIdKey: "uprRtTgtSeq"
                }
            },
            callback: {
                beforeClick: function(treeId, treeNode){
                    menuListGrid.eventhandler.treeNodeClick(treeNode);
                }
            }
        };

        var zNodes = [];
        var param = {
            sysGbCd : $('#sysGbCdOpt').val()
        };

        common.Ajax.sendJSONRequest(
            "GET",
            _baseUrl + "system/menuMgmt.getMenuMgmtTreeList.do",
            param,
            function(data){
                if(data.menu.length == 0 ){ // 검색 결과가 없는 경우
                    if (localStorage.alertifyExists === 'true') {
                        var t = $.fn.zTree.init($("#tree"), setting, zNodes);
                        var zTree = $.fn.zTree.getZTreeObj("tree");
                        zTree.reAsyncChildNodes(null, "refresh"); // reload root nodes
                        alertify.dismissAll();
                        alertify.message(msg.noSearchedDataMsg, 1);
                        localStorage.alertifyExists = 'false';
                    }
                } else {
                    zNodes = data.menu;
                    this.zTree = $.fn.zTree.init($("#tree"), setting, zNodes);
                    var nodes = this.zTree.getNodes();
                    if (nodes.length>0) {
                        menuListGrid.eventhandler.expandFirstNodes(nodes);
                        this.zTree.selectNode(nodes[0]);  // 첫번째 노드 체크하기
                        menuListGrid.eventhandler.treeNodeClick(nodes[0]);
                    }
                }
            });
    },

    // 트리 펼치기
    expandFirstNodes : function ( treeNodes ) {
        var that = this;
        treeNodes.forEach( function (node, index) {
            if(node.isFirstNode == true){
                this.zTree.expandNode(node);
                if(node.isParent){
                    that.expandFirstNodes(node.children);
                }
            }
        });
    },

    editorSetting : function(){
        nhn.husky.EZCreator.createInIFrame({
            oAppRef: oEditors,
            elPlaceHolder: "userHelpCont",
            sSkinURI: _baseUrl + "static/js/libs/smartEditor/SmartEditor2Skin.html",
            fCreator: "createSEditor2"
        });
    },

    menuInfo : function(parameter) {
        common.Ajax.sendJSONRequest(
              "GET"
            , _baseUrl + "system/menuMgmt.getMenuInfo.do"
            , parameter
            , function(menus) {
                $(menus).each(function(index, menu) {
                    $("#rtTgtSeq").val(menu.rtTgtSeq);
                    $("#rtTgtNm").val(menu.rtTgtNm);
                    $("#uprRtTgtSeq").val(menu.uprRtTgtSeq);
                    $("#uprRtTgtNm").val(menu.uprRtTgtNm);
                    $("#callUrl").val(menu.callUrl);
                    $("#sortSeq").val(menu.sortSeq);
                    $("#rtTgtTypCd").val(menu.rtTgtTypCd);
                    $("#sysModId").text(menu.sysModId);
                    $("#sysModDtm").text(menu.sysModDtm);
                    $("#userHelpCont").val(menu.userHelpCont);
                    $("input:radio[name=useYn][value="+menu.useYn+"]").prop("checked",true);
                    $("input:radio[name=leafMenuYn][value="+menu.leafMenuYn+"]").prop("checked",true);
                    $("input:radio[name=popupYn][value="+menu.popupYn+"]").prop("checked",true);
                    $("input:radio[name=custInfoInclYn][value="+menu.custInfoInclYn+"]").prop("checked",true);

                    if(menu.userHelpCont === undefined){
                        $("input:radio[name=helpYn][value=N]").prop("checked",true);
                    }else{
                        $("input:radio[name=helpYn][value=Y]").prop("checked",true);
                    }
                });

            }
        );
    },

    treeNodeClick : function(treeNode){
        var pin = {
            rtTgtSeq : treeNode.rtTgtSeq
        }
        menuGridForm.rtTgtSeq.value = treeNode.rtTgtSeq;

        menuListGrid.eventhandler.menuInfo(pin);   // 메뉴상세정보 조회
        subMenuListGrid.eventhandler.onSearch(0);  // 하위메뉴리스트 조회
    },

    bindButtonEvent : function(){
        var self = this;

        $('#sysGbCdOpt').change(function(event) {
            self.treeLoading();
        });

        // 대메뉴 추가
        $('#btn_menu_top').click(function() {
            $('#menuGridForm')[0].reset();
            $('#uprRtTgtSeq').val($('#sysGbCdOpt option:selected').data('uprval'));
            $('#sysModId').html('');
            $('#sysModDtm').html('');
            oEditors.getById['userHelpCont'].exec('SET_IR', ['']);
        });

        // 대메뉴 저장
        $("#btn_menu_info_save").click(function() {
            self.menuSave();
        });

        $('input[name=helpYn]').click(function(){
            if($(this).val()==='Y'){
                layerPopOpen('layerPop-userHelp');
            }
            $('input[name=helpYn]').change(function(){
                if($(this).val()==='Y'){
                    layerPopOpen('layerPop-userHelp');
                }
            });
        });

        $('#userhelp-cancel').click(function(){
            $('.layer-popup .box .btn-close').click();
        });

        $('#userhelp-ok').click(function(){
            $('.layer-popup .box .btn-close').click();
        });
    },

    menuSave : function(){

        if(!this.valueCheck()) return false;

        if (!confirm(msg.saveQuestionMessage)) return false;

        oEditors.getById["userHelpCont"].exec("UPDATE_CONTENTS_FIELD", []); // 에디터의 내용을 textarea에 적용
        var userHelpCont = $('#userHelpCont').val();

        var param = {
            rtTgtSeq         : $("#rtTgtSeq").val(),
            rtTgtNm          : $("#rtTgtNm").val(),
            uprRtTgtSeq      : $("#uprRtTgtSeq").val() == '' ? $('#sysGbCdOpt option:selected').data('uprval') : $("#uprRtTgtSeq").val(),
            callUrl          : $("#callUrl").val(),
            btnId            : '',
            useYn            : $('input[name=useYn]:checked').val(),
            sortSeq          : $("#sortSeq").val(),
            rtTgtTypCd       : $("#rtTgtTypCd").val(),
            leafMenuYn       : $('input[name=leafMenuYn]:checked').val(),
            popupYn          : $('input[name=popupYn]:checked').val(),
            custInfoInclYn   : $('input[name=custInfoInclYn]:checked').val(),
            sysGbCd          : $("#sysGbCdOpt").val()
        };

        if($("input[name=helpYn]:checked").val() == 'Y') {
            if (!(userHelpCont == "" || userHelpCont == null || userHelpCont == '&nbsp;' || userHelpCont == '<p>&nbsp;</p>')) {
                param.userHelpCont = userHelpCont;
            } else {
                param.userHelpCont = null;
            }
        } else {
            param.userHelpCont = null;
        }

        common.Ajax.sendJSONRequest(
            "POST",
            _baseUrl + "system/menuMgmt.saveMenuDetailInfo.do",
            param,
            function(obj) {
                if (obj.succeeded == true) {
                    menuListGrid.eventhandler.treeLoading();
                }
            }, null, null, true
        );

    },

    valueCheck : function(){
        //최하위여부 체크
        if($("input[name=leafMenuYn]:checked").val() == 'Y' && ($.trim($('#rtTgtSeq').val()) != '' && $('#rtTgtSeq').val() != undefined)){
            if(subMenuListGrid.eventhandler.getRowCount() > 0){
                alert(msg.messaageChkLeafYn);
                $("input:radio[name=leafMenuYn][value=N]").prop("checked",true);
                return false;
            }
        }

        //메뉴명
        if($.trim($('#rtTgtNm').val()) == '' || $('#rtTgtNm').val() == undefined){
            alert("메뉴명은 " + msg.necessaryCheckMessage);
            $('#rtTgtNm').focus();
            return false;
        }
        if($("#rtTgtNm").val().length > 200){
            alert(msg.rtTgtNmSizeCheck);
            $('#rtTgtNm').focus();
            return false;
        }

        //상위 메뉴명
        if($('#uprRtTgtSeq').val() == '' || $('#uprRtTgtSeq').val() == undefined){
            alert(msg.topMenuUprRtTgtSeqMessage);
            return false;
        }

        //호출URL
        if($("#rtTgtTypCd").val() == '20') {  // 화면
            if ($.trim($('#callUrl').val()) == '' || $('#callUrl').val() == undefined) {
                alert("호출 URL은 " + msg.necessaryCheckMessage);
                $('#callUrl').focus();
                return false;
            } else if ($("#callUrl").val().length > 2000) {
                alert(msg.callUrlSizeCheck);
                $('#callUrl').focus();
                return false;
            }
        }

        //정렬순서
        if($.trim($('#sortSeq').val()) == '' || $('#sortSeq').val() == undefined){
            alert("정렬순서는 " + msg.necessaryCheckMessage);
            $('#sortSeq').focus();
            return false;
        } else if( $('#sortSeq').val() == 0 ){
            alert(msg.sortSeqCheck);
            $('#sortSeq').focus();
            return false;
        }

        return true;
    }

};