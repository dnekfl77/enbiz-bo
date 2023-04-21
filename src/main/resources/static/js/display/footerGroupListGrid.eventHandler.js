$.namespace("footerGroupListGrid.eventhandler");
footerGroupListGrid.eventhandler = {
	// 초기화
	init : function () {
	    this.editorInit();
		this.gridLoading();
		this.bindButtonEvent();
	}

	, editorInit : function(){
        nhn.husky.EZCreator.createInIFrame({
            oAppRef: oEditors,
            elPlaceHolder: "fotrCont",
            sSkinURI: _baseUrl + "static/js/libs/smartEditor/SmartEditor2Skin.html",
            fCreator: "createSEditor2"
        });

        $('#fotrCont').height($('#divEditor').height()-53);
        $("#fotrCont").css("width",$("#divEditor").width()+"px");
	}

	, gridLoading : function(){
        // 선택된 그리드 배경색 넣기
		this.grid.onItemChecked = function(grid, itemIndex, checked) {
            grid.setCurrent({ itemIndex: itemIndex })
        }
        this.grid.setRowStyleCallback(function(grid, item, fixed) {
            if (item.checked) {
                return 'rg-trcol_active'
            }
        });
	}

	, bindButtonEvent : function(){
		var self = this;
		
		//초기화
		$('#btn_init').click(function() {
			$('#footerListForm')[0].reset();
		});

		//조회
		$('#btn_search').click(function() {
			self.onSearch(0, true);
		});

		//자동조회
		$('#siteNo').change(function() {
			self.onSearch(0, true);
		});

		//행추가
		$("#btn_grid_insert").click(function() {
			self.onAdd();
		});

		//행삭제
		$("#btn_grid_delete").click(function() {
			self.grid.cancel();
			self.onDelete();
		});

		//변경취소
		$("#btn_grid_reset").click(function() {
			self.onReset();
		});

		//저장
		$("#btn_grid_save").click(function() {
			self.onSave();
		});

		//푸터 컨텐츠 저장
		$("#btn_editor_save").click(function() {
			self.onSaveEditor();
		});
	}

	, onSearch : function(pageIdx, isOpenToast){
	    if( $("#siteNo").val() != "") {
            this.grid.cancel();
            pageIdx = !pageIdx ? 0 : pageIdx;
            var pagingFunc = function(pageIdx){return this.onSearch(pageIdx, false);};
            this.controller.doQuery(this,"",pageIdx, pagingFunc, null, isOpenToast);
	    } else {
	        alert(msg.searchCheckMsg);
	    }
	}

	, onAdd : function() {
		this.grid.commit();
		var defaultValues = { siteNo: $("#siteNo").val(), useYn : "Y" };
		this.defaultHandler.onAdd(this.grid, defaultValues);
	}

	, onDelete : function() {
		this.grid.commit();
		var checkedItems = this.grid.getCheckedItems();
		if (checkedItems.length == 0) {
			alert(msg.gridNoSelected);
			return;
		}

        var result = true;
	    // 푸터메뉴 그룹 삭제 시 하위 메뉴가 없는 경우 삭제 가능
        for(var i=0; i<checkedItems.length; i++) {
            var param = {
                  siteNo : this.grid.getValue(checkedItems[i], "siteNo")
                , uprFotrNo : this.grid.getValue(checkedItems[i], "fortNo")
            }
            common.Ajax.sendRequestSync(
                 "POST"
                 ,_baseUrl + "display/footerMgmt.checkFooterMgmtDelete.do"
                 ,param
                 ,function(obj) {
                      if (obj.data != 0) {
                         alert(msg.deleteCheckMsg);
                         result = false;
                      }
                 }
            );

            if(!result) {
               return false;
            }
        }

		this.defaultHandler.onDelete(this.grid);
	}

	, onReset : function() {
		alert(msg.gridInit);
		footerMenuListGrid.eventhandler.grid.commit();
		this.defaultHandler.onCancel(this.grid);
	}

	, onSave : function() {
		this.grid.commit();

		//필수 항목 체크
		var log = this.grid.validateCells(null,false);
		if(log != null) {
			alert(log[0].message);
			this.grid.cancel();
			return;
		}

		var result = false;
		var dataResource = this.grid.getDataSource();
		var gridCount = dataResource.getRowCount();
		for(var i = 0; i<gridCount; i++){
			if(this.grid.isCheckedItem(i)){
				result = true;
				break;
			}
		}
		if(!result){
			alert(msg.gridNoSelected);
			return ;
		}

		this.controller.doSave(this, this.grid.localId);
	}

	, onSaveEditor : function() {
		//푸터 메뉴 그룹 편집중..
		var editRows = this.grid.getDataSource().getAllStateRows();//그리드 상태값(등록: created, 수정:updated, 삭제:deleted, 추가/삭제:createAndDeleted)
		if(editRows.created.length+editRows.updated.length+editRows.deleted.length+editRows.createAndDeleted.length>0){
			alert(msg.editorSaveCheckMsg);
			return;
		}

		oEditors.getById['fotrCont'].exec('UPDATE_CONTENTS_FIELD', []);
		var param = { fortNo : this.grid.getValue(this.grid.getCurrent().dataRow, "fortNo"), fotrCont: $('#fotrCont').val()};
		common.Ajax.sendRequest(
			"POST"
			, _baseUrl + "display/footerMgmt.saveFooterMgmtFotrCont.do"
			, param
			, function(obj) {
                if (obj.succeeded == true) {
	                footerGroupListGrid.eventhandler.editorInit();
                }
            }
		);
	}

	//이벤트 핸들러
	, gridEvent : {
		// 삭제 완료후 콜백함수
		afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
			openToast(data.message);
			if(data.succeeded){
				eventHandler.onSearch(0, false);
		   }
		}

		//무결성 체크
		, onValidateColumn : function(grid, column, inserting, value) {
        	grid.editOptions.commitLevel = "error";
			var error = {};
			if (column.fieldName === "sysGbCd") {
				if (value === undefined || value === null || value === '') {
					error.level = "error";
					error.message = msg.sysGbCd + msg.requiredCheckMessage;
				}
			} else if(column.fieldName === 'fotrContGbCd'){
				if (value === undefined || value === null || value === '') {
					error.level = "error";
					error.message = msg.fotrContGbCd + msg.requiredCheckMessage;
				}
			} else if(column.fieldName === 'dispSeq'){
				if (value === undefined || value === null || value === '') {
					error.level = "error";
					error.message = msg.dispSeq + msg.requiredCheckMessage;
				}
			}
			return error;
		}

		//Row 선택
		, onCurrentRowChanged : function (grid, oldRow, newRow) {
            var itemIndex = grid.getCurrent().dataRow;
            var rowState = itemIndex > -1 ?grid.getDataSource().getRowState(itemIndex) : '';
            if(rowState === "created" || rowState === '' ){
                $("#menuDiv").show();
                $("#editorDiv").hide();
                footerMenuListGrid.eventhandler.grid.getDataSource().clearRows(); // 하위 그리드 초기화
            } else {
                $("#uprFotrNo").val( grid.getValue(newRow, "fortNo") ); // 상위푸터번호
                // 시스템구분(메뉴:10, HTML:20)
                var fotrContGbCd = grid.getValue(newRow, "fotrContGbCd");

                if(fotrContGbCd == '10'){ // 푸터 메뉴
//                    footerMenuListGrid.eventhandler.grid.getDataSource().clearRows(); // 하위 그리드 초기화
//                    footerMenuListGrid.eventhandler.grid.commit();
                    footerMenuListGrid.eventhandler.onSearch(0,false);//푸터 메뉴 그리드 리로딩
                    $("#menuDiv").show();
                    $("#editorDiv").hide();
                } else if(fotrContGbCd == '20'){ // HTML
                    var param = { fortNo : grid.getValue(newRow, "fortNo")};
                    common.Ajax.sendRequest(
                        "POST"
                        ,_baseUrl + "display/footerMgmt.getFooterMgmtCont.do"
                        ,param
                        ,function(obj) {
                            $('iframe').each(function(){
                                $(this).css("width",$("#divEditor").width());
                                $(this).css("height","100%");
                                $(this).contents().find(".se2_to_html").click();
                                $(this).contents().find(".se2_to_editor").click();
                            });
                            $("#fotrCont").val(obj.data.fotrCont);
                            oEditors.getById['fotrCont'].exec('LOAD_CONTENTS_FIELD');
                        }
                    );
                    $("#menuDiv").hide();
                    $("#editorDiv").show();
                }
            }
		}
	}
};