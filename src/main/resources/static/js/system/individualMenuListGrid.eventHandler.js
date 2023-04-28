$.namespace("individualMenuListGrid.eventHandler");
individualMenuListGrid.eventHandler = {
    init : function () {
		var indivRtNo = "";
		var rtGrpNo = "";
		var sysGbCd = "";
        this.bindButtonEvent();
    },

    treeLoading : function(){
		var self = this;
        var setting = {
			check: {
				enable: true,
				chkboxType: { "Y": "s", "N": "s" },
			},
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
					individualButtonRightGrid.eventhandler.treeNodeClick(treeNode);
                }
            }
        };

        var zNodes = [];
        var param = {
				indivRtNo : this.indivRtNo
			,	rtGrpNo : this.rtGrpNo
        };
		
        common.Ajax.sendJSONRequest(
            "GET",
			_baseUrl + "system/individualRightMgmt.getIndividualMenuTreeList.do",
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
                        self.expandAllNodes(nodes);
                    }
                }
            });
    },

    // 트리 펼치기
    expandAllNodes : function ( treeNodes ) {
        var that = this;
        treeNodes.forEach( function (node, index) {
            this.zTree.expandNode(node);
            if(node.isParent){
                that.expandAllNodes(node.children);
            }
        });

		//사용중인 메뉴 체크처리
		treeNodes.forEach(function(node, index){
			if(node.useYn === "Y"){
				this.zTree.checkNode(node, true);
			}
		});
    },
	
    treeNodeClick : function(treeNode){
        var pin = {
            rtTgtSeq : treeNode.rtTgtSeq
        }
		
    },
	
    bindButtonEvent : function(){
		var self = this;
		$('#btn_menu_save').click(function() {
			//개별권한 그리드 편집 여부 체크
			var editRows = individualRightGrid.eventhandler.grid.getDataSource().getAllStateRows();
			if (editRows.created.length + editRows.updated.length > 0) {
				alert(col.gridEditing);
				return;
			}
			
			var treeObj = $.fn.zTree.getZTreeObj("tree");
			var checkedNodes = treeObj.getCheckedNodes(true);			
			var nonCheckedNodes = treeObj.getCheckedNodes(false);
			self.menuRightUpdate(checkedNodes, nonCheckedNodes);
		});
    },

	menuRightInsertBefore : function() {
		var self = this;
		
		var treeObj = $.fn.zTree.getZTreeObj("tree");
		var checkedNodes = treeObj.getCheckedNodes(true);			
		var nonCheckedNodes = treeObj.getCheckedNodes(false);
		
		self.menuRightInsert(checkedNodes, nonCheckedNodes);
	},

	menuRightInsert : function(checkedNodesParam, nonCheckedNodes) {
		var self = this;
		var checkedRtTgtSeqList = [];
		var nonCheckedRtTgtSeqList = [];
		
		const checkedNodesTemp = checkedNodesParam;
		checkedNodesTemp.sort((a, b) => (a.level < b.level) ? 1 : (a.level === b.level) ? ((a.rtTgtSeq > b.rtTgtSeq) ? 1 : -1) : -1);
		const checkedNodes = checkedNodesTemp.reverse();
		
		for(var i=0; i<checkedNodes.length; i++) {
			var sysGbCd = checkedNodes[i].sysGbCd;
			var rtTgtTypCd = checkedNodes[i].rtTgtTypCd;
			var rtTgtNm = checkedNodes[i].rtTgtNm;
			var sortSeq = checkedNodes[i].sortSeq;
			var custInfoInclYn = checkedNodes[i].custInfoInclYn;
			var popupYn = checkedNodes[i].popupYn;
			var leafMenuYn = checkedNodes[i].leafMenuYn;
			var rtGrpNo = checkedNodes[i].rtGrpNo;
			var rtTgtSeq = checkedNodes[i].rtTgtSeq;
			var uprRtTgtSeq = checkedNodes[i].uprRtTgtSeq;
			var level = checkedNodes[i].level;
			
			checkedRtTgtSeqList.push({
				sysGbCd : sysGbCd,
				rtTgtTypCd : rtTgtTypCd,
				rtTgtNm : rtTgtNm,
				sortSeq : sortSeq,
				custInfoInclYn : custInfoInclYn,
				popupYn : popupYn,
				leafMenuYn : leafMenuYn,
				rtGrpNo : rtGrpNo,
				rtTgtSeq : rtTgtSeq,
				uprRtTgtSeq : uprRtTgtSeq,
				level : level
			})
		}
		
		var paramList = {};
		paramList.sysGbCd = this.sysGbCd;
		paramList.rtGrpNo = this.rtGrpNo;
		
		paramList.checkedNodes = JSON.stringify(checkedRtTgtSeqList);
		
		for(var i=0; i<nonCheckedNodes.length; i++) {
			var sysGbCd = nonCheckedNodes[i].sysGbCd;
			var rtTgtTypCd = nonCheckedNodes[i].rtTgtTypCd;
			var rtTgtNm = nonCheckedNodes[i].rtTgtNm;
			var sortSeq = nonCheckedNodes[i].sortSeq;
			var custInfoInclYn = nonCheckedNodes[i].custInfoInclYn;
			var popupYn = nonCheckedNodes[i].popupYn;
			var leafMenuYn = nonCheckedNodes[i].leafMenuYn;
			var rtGrpNo = nonCheckedNodes[i].rtGrpNo;
			
			nonCheckedRtTgtSeqList.push({
				sysGbCd : sysGbCd,
				rtTgtTypCd : rtTgtTypCd,
				rtTgtNm : rtTgtNm,
				sortSeq : sortSeq,
				custInfoInclYn : custInfoInclYn,
				popupYn : popupYn,
				leafMenuYn : leafMenuYn,
				rtGrpNo : rtGrpNo
			})
		}
		
		paramList.nonCheckedNodes = JSON.stringify(nonCheckedRtTgtSeqList);
		
		common.Ajax.sendJSONRequest(
			"POST",
			_baseUrl + "system/menuMgmt.saveMenuRightIndiv.do",
			paramList,
			function(obj) {
				if (obj.succeeded == true) {
				    self.treeLoading();
					individualButtonRightGrid.eventhandler.onSearch(0);
				}
			}, null, null, true
		);
	},
	
	menuRightUpdate : function(checkedNodes, nonCheckedNodes) {
		var self = this;
		var checkedRtTgtSeqList = [];
		var nonCheckedRtTgtSeqList = [];
		
		for(var i=0; i<checkedNodes.length; i++) {
			var rtTgtSeq = checkedNodes[i].rtTgtSeq;
			var sysGbCd = this.sysGbCd;
			var rtGrpNo = this.rtGrpNo;
			
			checkedRtTgtSeqList.push({
				rtTgtSeq : rtTgtSeq,
				sysGbCd : sysGbCd,
				rtGrpNo : rtGrpNo
			})
		}
		
		var paramList = {};
		paramList.sysGbCd = this.sysGbCd;
		paramList.rtGrpNo = this.rtGrpNo;
		
		paramList.checkedNodes = JSON.stringify(checkedRtTgtSeqList);
		
		for(var i=0; i<nonCheckedNodes.length; i++) {
			var rtTgtSeq = nonCheckedNodes[i].rtTgtSeq;
			var sysGbCd = this.sysGbCd;
			var rtGrpNo = this.rtGrpNo;
			
			nonCheckedRtTgtSeqList.push({
				rtTgtSeq : rtTgtSeq,
				sysGbCd : sysGbCd,
				rtGrpNo : rtGrpNo
			})
		}
		
		paramList.nonCheckedNodes = JSON.stringify(nonCheckedRtTgtSeqList);
		
		common.Ajax.sendJSONRequest(
			"POST",
			_baseUrl + "system/menuMgmt.saveMenuRightIndiv.do",
			paramList,
			function(obj) {
				if (obj.succeeded == true) {
				    self.treeLoading();
					individualButtonRightGrid.eventhandler.onSearch(0);
				}
			}, null, null, true
		);
	}
};