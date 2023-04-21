$.namespace("rewardTypeListTree");
rewardTypeListTree = {

    init : function(){
        this.treeLoading();
    },

    treeLoading : function(isOpenToast){
        var self = this;
        var setting = {
             view: {
                 showLine: true,
                 showIcon : true
             },
             data: {
                 key : {
                   name : "cpnsTypNm"
                 },
                 simpleData: {
                     enable: true,
                     idKey: "cpnsTypNo",
                     pIdKey: "uprCpnsTypCd"
                 }
             },
             callback: {
                 beforeClick: function(treeId, treeNode){
                     self.gridSetting(treeNode);
                 }
             }
        };

        common.Ajax.sendJSONRequest(
            "GET",
            _baseUrl + "customerservice/rewardTypeMgmt.getRewardTypeList.do",
            $("#rewardTypeGridForm").serialize(),
            function(data){
                 if(data.length == 0 ){ // 검색 결과가 없는 경우
                     if (localStorage.alertifyExists === 'true') {
                         var t = $.fn.zTree.init($("#rewardTypeListTree"), setting, []);
                         var zTree = $.fn.zTree.getZTreeObj("rewardTypeListTree");
                         zTree.reAsyncChildNodes(null, "refresh"); // reload root nodes
                         alert(msg.noSearchedDataMsg);
                         localStorage.alertifyExists = 'false';
                     }
                 } else {
                     var t = $.fn.zTree.init($("#rewardTypeListTree"), setting, data);
                     var zTree = $.fn.zTree.getZTreeObj("rewardTypeListTree");
                     zTree.reAsyncChildNodes(null, "refresh"); // reload root nodes
                     var nodes = zTree.getNodes();
                     if (nodes.length>0) {
                         zTree.expandAll("true");
                         zTree.selectNode(nodes[0]);  // 첫번째 노드 체크하기
                         self.gridSetting(nodes[0]);
                     }
                 }
                 if (isOpenToast) {
					openToast("조회되었습니다.");
				 }
            }
        );
    },

    gridSetting : function(node) {
         rewardTypeListGrid.eventhandler.treeVal = node;
         rewardTypeListGrid.eventhandler.onSearch(0);  // 하위보상 정보 조회
    }

}