$.namespace("tree.eventhandler");
tree.eventhandler = {
    // 초기화
    init : function () {
        if(req != null && req != '' ) {
            $("#siteNo").val(req);
            $('#siteNo').attr("disabled",true);
        }

        this.bindButtonEvent();
        this.treeLoading();
    },

    treeLoading : function(){
       var self = this,zTree;
       var onlyOneNode = 0;
       var setting = {
            view: {
                showLine: true,
                showIcon : true
            },
            data: {
                key : {
                  name : "dispCtgNm"
                },
                simpleData: {
                    enable: true,
                    idKey: "dispCtgNo",
                    pIdKey: "uprDispCtgNo"
                }
            },
            callback: {
                beforeClick: function(treeId, treeNode){
                    if(treeNode.isParent == false) { // 최하위 노드
                        if(treeNode.level == "0"){ // 노드가 하나인 경우
                            if(onlyOneNode == 0){
                                onlyOneNode++;
                                return;
                            }else{
                                const selectDataList = [];
                                var dataList = {};
                                dataList.dispCtgNo = treeNode.dispCtgNo;
                                dataList.dispCtgNm = treeNode.dispCtgNm;
                                dataList.hierarchyNm = treeNode.hierarchyNm;
                                dataList.siteNm = treeNode.siteNm;
                                selectDataList.push(dataList);
                                window.postMessage(JSON.stringify(selectDataList), _baseUrl);
                                window.close();
                            }
                        }
                        else {
                                const selectDataList = [];
                                var dataList = {};
                                dataList.dispCtgNo = treeNode.dispCtgNo;
                                dataList.dispCtgNm = treeNode.dispCtgNm;
                                dataList.hierarchyNm = treeNode.hierarchyNm;
                                dataList.siteNm = treeNode.siteNm;
                                selectDataList.push(dataList);
                                window.postMessage(JSON.stringify(selectDataList), _baseUrl);
                                window.close();
                        }
                    }
                    return;
                }
            }
       };
       var zNodes = [];
       var param = {
            siteNo : $("#siteNo").val()
       };
       common.Ajax.sendJSONRequest(
           "GET",
           _baseUrl +"popup/displayCategoryMgmtPopup.displayCategoryTreeList.do",
           param,
           function(data){
            if(data.category.length == 0 ){ // 검색 결과가 없는 경우
                if (localStorage.alertifyExists === 'true') {
                    var t = $.fn.zTree.init($("#tree"), setting, zNodes);
                    var zTree = $.fn.zTree.getZTreeObj("tree");
                    zTree.reAsyncChildNodes(null, "refresh"); // reload root nodes
                    alert(_msg.noSearchedDataMsg);
                    localStorage.alertifyExists = 'false';
                }
            } else {
                zNodes = data.category;
                var t = $.fn.zTree.init($("#tree"), setting, zNodes);
                var zTree = $.fn.zTree.getZTreeObj("tree");
                zTree.reAsyncChildNodes(null, "refresh"); // reload root nodes
                var nodes = zTree.getNodes();
                if (nodes.length>0) {
                    zTree.expandAll("true");
                }
            }
       });
    },

    bindButtonEvent : function(){
        $("#btn_popup_bottom_close").click(function() {
            window.close();
        });

        $("#siteNo").change(function() {
            tree.eventhandler.treeLoading();
        });
    }

};