$.namespace("pscTree.eventhandler");
pscTree.eventhandler = {
    // 초기화
    init : function () {
        this.treeLoading();
        this.bindButtonEvent();
    },
    treeLoading : function(){

        var that = this;
        var setting = {
            view : {
                dblClickExpand : false
            },
            data: {
                key : {
                  name : "stdCtgNm"
                },
                simpleData: {
                    enable: true,
                    idKey: "stdCtgNo",
                    pIdKey: "uprStdCtgNo"
                }
            },
            callback: {
                onDblClick : function (event, treeId, treeNode) {
                    //최하위 노드만 선택 가능
                    if (treeNode.leafCtgYn === 'N') return;
                    that.apply(treeNode);
                }
            }
        };

        this.zTreeObj = $.fn.zTree.init($("#pscTree"), setting, _zNodes);
        that.expandFirstNodes(this.zTreeObj.getNodes());

    },
    bindButtonEvent : function(){

        var that = this;

        // 닫기 버튼 클릭 이벤트 처리
        $("#btn_popup_bottom_close").click(function() {
            that.close();
        });
    },
    // 닫기
    close : function(){
        window.close();
    },
    // 적용
    apply : function(treeNode){
        var returnValues = { stdCtgNo           : treeNode.stdCtgNo
                            ,stdCtgNm           : treeNode.stdCtgNm
                            ,useYn              : treeNode.useYn
                            ,hierarchyText      : treeNode.hierarchyText
                            ,mdId               : treeNode.mdId
                            ,goodsNotiLisartCd  : treeNode.goodsNotiLisartCd
                            ,safeCertiNeedYn    : treeNode.safeCertiNeedYn
                           };
        window.postMessage(JSON.stringify(returnValues), _baseUrl);
        this.close();
    },
    // 트리 기본 세팅 - 첫번째 노드 펼치기
    expandFirstNodes : function(treeNodes){
        var that = this;
        treeNodes.forEach(function(node, index){
            if(node.isFirstNode == true){
                that.zTreeObj.expandNode(node);
                if(node.isParent){
                    that.expandFirstNodes(node.children);
                }
            }
        });
    }

};