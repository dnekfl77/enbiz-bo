$.namespace("individualRightGrid.eventhandler");
individualRightGrid.eventhandler = {
    // 초기화
    init : function () {
        this.gridLoading();
        this.bindButtonEvent();
		this.fileUpload();
    },

    gridLoading : function(){
        var self = this;

        // 선택된 그리드 배경색 넣기
		this.grid.onItemChecked = function(grid, itemIndex, checked) {
          grid.setCurrent({ itemIndex: itemIndex })
        }
        this.grid.setRowStyleCallback(function(grid, item, fixed) {
          if (item.checked) {
            return 'rg-trcol_active'
          }
        });
		this.grid.registerCustomRenderer("renderer_imgBtn", {
            initContent : function (parent) {
                parent.appendChild(this._button1 = document.createElement("span"));
				parent.appendChild(this._button2 = document.createElement("a"));
            },
            canClick : function() {
                return true;
            },
            render : function(grid, model, width, height, info) {
				/*var jdx = model.item.index;
				this._button2.className = "fkUpload_" + jdx;

                this._button1.className = "rg_in_btn fileUpload_" + jdx;
				this._button1.id = "fileUpload_" + jdx;
                this._button1.textContent = "파일첨";*/
            },
            click : function(e) {

				if (e.target == this._button1) {
					let el = e.target.id;
					var idx = el.split("_")[1];
					console.log("idx : " + idx);
					e.preventDefault();
					if ($(`.fkUpload_${idx} > .file-list > li`).length == 1) {
						alert(userEventMessage.fileCount);
						return false;
					} else {
						$(`.fkUpload_${idx} > input[type=file]`).remove();
						$(`.fkUpload_${idx}`).append(`<input type="file" style="display: none" name="files" id="uploadedFile_${idx}"/>`);

						$(`#uploadedFile_${idx}`).on("change", function (e) {
							if (e.currentTarget.files.length > 0) {
								if (e.currentTarget.files[0].size > maxUploadSizePerFile) {
									alert(userEventMessage.fileLimitSize);
									return false;
								}
								var fileType = ["image/png", "image/gif", "image/jpeg", "application/pdf"];
								var fileCheck = false;
								for (var i = 0; i < fileType.length; i++) {
									if (e.currentTarget.files[0].type === fileType[i]) {
										fileCheck = true;
										break;
									}
								}

								if (!fileCheck) {
									alert(userEventMessage.fileTypeError);
									return false;
								}

								if ($(`.fkUpload_${idx} > .file-list`).length <= 0) {
									$(`fkUpload_${idx}`).append('<ul class="file-list"></ul>');
								}

								$(`.fkUpload_${idx} > .file-list`).append(`<li id="uploadedLi_${idx}"><span>${e.currentTarget.files[0].name}</span> <button id="btn_file_delete${idx}" class="delete" type="button">삭제</button></li>`);

								$(`#btn_file_delete${idx}`).on("click", function (e) {
									$(`#uploadedFile_${idx}`).remove();
									$(`#uploadedLi_${idx}`).remove();
								});
							}
						});
						$("#uploadedFile_" + idx).click();
					}
				}
			}
        });
    },

    bindButtonEvent : function(){
       var self = this;

		$('#btn_search').click(function() {
			self.onSearch(true);
		});
		
		$('#btn_init').click(function() {
			$('#userId').val('');
			$('#individualRightGridForm')[0].reset();
		});
		
		this.grid.onCellDblClicked = function(grid, clickData, column){
			var currentData = self.grid.getDataSource().getJsonRow(clickData.dataRow);
			
			if(clickData.column==='userId'|| clickData.column==='userNm'){
				if(typeof currentData.userId !=='undefined'){
					self.popupStIndInfo(grid, clickData);
				} else {
					self.popupUserListGridAddCell(grid);
				}
			}
		}

        $('#btnUserSearch').on('click', function() {
            var pin = { argSelectType: "1", argWorkStatCd: "01", argUseYn: "Y" };
            var POP_DATA = {
                url: _baseUrl + 'popup/userMgmtPopup.userListPopup.do'
                , winName: 'userListPopup'
                , title: '사용자 조회'
                , _title: '사용자 조회'
                , left: 20
                , top: 20
                , width: 800
                , height: 600
                , scrollbars: false
                , autoresize: false
            };
            popCommon(pin, POP_DATA, self.popupUserListCallback);
        });

		$('#btnUserReset').on('click', function() {
			$('#userIdNm').val('');
			$('#userId').val('');
		});

        // 행추가
        $("#btn_grid_add").click(function() {
            self.onAdd();
        });

		//행삭제
		$('#btn_grid_remove').on('click', function() {
			self.removeIndividualRight();
		});
		
		//저장
		$('#btn_grid_save').click(function() {
			self.onSave();
		});

		//엑셀 다운로드
		$('#btn_excel_down1').on('click', function(){
			var title = $(this).parent().siblings('.title').text();
			self.defaultHandler.onExcelDownload(self.grid, title);
		});
    },
	fileUpload : function(){
		$(`.rg_in_btn`).on("click", function(e) {
			let el = e.target.id;
			var idx = el.split("_")[1];
			console.log("Wfwef" + idx);
			e.preventDefault();

			if($(`.fkUpload_${idx} > .file-list > li`).length == 1) {
				alert(userEventMessage.fileCount);
				return false;
			} else {
				$(`.fkUpload_${idx} > input[type=file]`).remove();
				$(`.fkUpload_${idx}`).append(`<input type="file" style="display: none" name="files" class="files" id="uploadedFile_${idx}"/>`);

				$(`#uploadedFile_${idx}`).on("change", function(e) {
					if(e.currentTarget.files.length > 0) {
						if(e.currentTarget.files[0].size > maxUploadSizePerFile) {
							alert(userEventMessage.fileLimitSize);
							return false;
						}
						var fileType = ["image/png", "image/gif", "image/jpeg", "application/pdf"];
						var fileCheck = false;
						for(var i=0; i<fileType.length; i++){
							if(e.currentTarget.files[0].type === fileType[i]) {
								fileCheck = true;
								break;
							}
						}

						if(!fileCheck) {
							alert(userEventMessage.fileTypeError);
							return false;
						}

						if( $(`.file-upload_${idx} > .file-list`).length <= 0 ) {
							$(`.file-upload_${idx}`).append('<ul class="file-list"></ul>');
						}

						$(`.file-upload_${idx} > .file-list`).append(`<li id="uploadedLi_${idx}"><span>${e.currentTarget.files[0].name}</span> <button id="btn_file_delete${idx}" class="delete" type="button">삭제</button></li>`);

						$(`#btn_file_delete${idx}`).on("click", function(e) {
							$(`#uploadedFile_${idx}`).remove();
							$(`#uploadedLi_${idx}`).remove();
						});
					}
				});
				console.log("idx2 : " + idx);
				alert('wefwqfwf : ' + idx);
				$("#uploadedFile_"+idx).click();

				//$("#uploadedFile_"+idx).click();
				// $('#fileUpload_'+idx).on("click", function(e) {
				// });
			}

		});

		//
		// $('#fileUpload_0').on("click", function(e) {
		// 	console.log("trestset");
		// 	let el = e.target.id;
		// 	var idx = el.split("_")[1];
		// 	$("#uploadedFile_"+idx).click();
		// });
	},

    popupUserListCallback : function(e) {
        if (e.data != null && e.data != '') {
			var data = JSON.parse(e.data);
			$('#userIdNm').val(data[0].userId + " / " + data[0].userNm);
		    $('#userId').val(data[0].userId);
		}
    },
	popupUserListGridAddCell : function(grid) {
		var self = this;
		grid.commit();
		var pin = { argSelectType: "1", argWorkStatCd: "01", argUseYn: "Y" };
        var POP_DATA = {
            url: _baseUrl + 'popup/userMgmtPopup.userListPopup.do'
            , winName: 'userListPopup'
            , title: '사용자 조회'
            , _title: '사용자 조회'
            , left: 20
            , top: 20
            , width: 800
            , height: 600
            , scrollbars: false
            , autoresize: false
        };

		var callback = function(e) {
			var obj = [];
			obj = JSON.parse(e.data);
			grid.getDataSource().setValue(grid.getCurrent().dataRow, "userId", obj[0].userId);
			grid.getDataSource().setValue(grid.getCurrent().dataRow, "sysGbCd", obj[0].sysGbCd);
			grid.getDataSource().setValue(grid.getCurrent().dataRow, "rtGrpNm", obj[0].rtGrpNm);
			self.gridEvent.onCurrentRowChanged(grid);
		}
		
        popCommon(pin, POP_DATA, callback);
	},

    gridEvent : {
        // 저장 완료후 콜백함수
        afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            openToast(data.message);
            if(data.succeeded){
                eventHandler.onSearch(0, false);
           }
        },
		onCurrentRowChanged: function(grid, oldRow, newRow) {
			var itemIndex = grid.getCurrent().dataRow;
			var rowState = itemIndex > -1 ? grid.getDataSource().getRowState(itemIndex) : "";
			if(rowState === "created"){
				return;
			}
			grid.commit();
			var indivRtNo = grid.getValue(grid.getCurrent().itemIndex, "indivRtNo");
			var sysGbCd = grid.getValue(grid.getCurrent().itemIndex, "sysGbCd");
			var rtGrpNo = grid.getValue(grid.getCurrent().itemIndex, "userId");//개별권한인 경우 권한그룹번호에 userId가 들어간다.
			
			individualMenuListGrid.eventHandler.indivRtNo = indivRtNo;
			individualMenuListGrid.eventHandler.sysGbCd = sysGbCd;
			individualMenuListGrid.eventHandler.rtGrpNo = rtGrpNo;
			
			individualButtonRightGrid.eventhandler.sysGbCd = sysGbCd;
			individualButtonRightGrid.eventhandler.rtGrpNo = rtGrpNo;
			
			individualMenuListGrid.eventHandler.treeLoading();
		}
    },

    onSearch : function(isOpenToast) {
		this.grid.cancel();
		this.controller.doQuery(this,null,null,null,false,isOpenToast);
	},

	onAdd : function() {
        this.grid.commit();
        var defaultValues = { rightGrp : "", attachFile : "파일첨부" };
        this.defaultHandler.onAdd(this.grid, defaultValues);
    },
	
    removeIndividualRight : function() {
		var grid = this.grid;
		var checkedRows = grid.getCheckedRows();
		if (checkedRows.length == 0) {
			alert(col.noCheckedIndivRightMsg);
            return;
        }

		this.defaultHandler.onDelete(grid);
	},

    onSave : function() {
        grid.commit();
        var result = false;

        var dataResource = this.grid.getDataSource();
        var gridCount = dataResource.getRowCount();
		var checkedItems = this.grid.getCheckedItems();

		for(var item in checkedItems){

			var aplyStrDt = new Date(this.grid.getValue(item,"aplyStrDt"));
			var aplyEndDt = new Date(this.grid.getValue(item,"aplyEndDt"));

			if(aplyStrDt > aplyEndDt){
				alert(col.aplyStrEndDtCheck);
				this.grid.setCurrent({itemIndex: item});
				return;
			}
		}

        for(var i=0; i<gridCount; i++){
            if(this.grid.isCheckedItem(i)){
                result = true;
                break;
            }
        }

        if(!result){
			alert(col.checkItem);
            return ;
        }
        this.controller.doSave(this, this.grid.localId);
    },

	popupStIndInfo : function(grid, clickData) {
		var pin = { callUrl: "indiv.callUrl.do", returnUrl: "indiv.returnUrl.do" };
		var POP_DATA = {
			url: '/popup/memberInfoConfirmReason.memberInfoConfirmReasonPopup.do'
			, winName: 'memberInfoConfirmReasonPopup'
			, title: '고객정보확인사유 팝업'
			, _title: '고객정보확인사유 팝업'
			, left: 20
			, top: 20
			, width: 790
			, height: 300
			, scrollbars: false
			, autoresize: false
			};
		popCommon(pin, POP_DATA , function(e){
			if(e.data.code == "000"){
				individualRightGrid.eventhandler.popupUserView(grid,clickData);
			}
		});

	},

	popupUserView : function(grid, clickData) {
		var pin = {
			userId: grid.getValue(clickData.itemIndex, "userId")
		};
		var POP_DATA = {
			url: _baseUrl + 'system/userMgmt.saveUserView.do'
			, winName: 'userMgmtCrudPopup'
			, title: '회원 상세정보 팝업'
			, _title: '회원 상세정보 팝업'
			, left: 20
			, top: 20
			, width: 1020
			, height: 700
			, scrollbars: false
			, autoresize: false
		};
		popCommon(pin, POP_DATA);
	},

	onExcelExport: function() {
		var self = this;
		
		var userId = $('#userId').val();
		var rtGrpNm = $('#rtGrpNm').val();
		var excelHeader = self.defaultHandler.onExcelHeader(this.grid); // 그리드 해더 추출
		var param = 'userId=' + userId + '&rtGrpNm=' + rtGrpNm;
		param += '&rowsPerPage=' + $('#individualRightGrid-select-rowsPerPage option:selected').val();
		param += '&pageIdx=' + $('#individualRightGrid-select-page option:selected').val();
		param += '&' + $('#individualRightGrid').serialize() + '&excelHeader=' + encodeURIComponent(JSON.stringify(excelHeader));
		
		window.location.href = _baseUrl + "system/individualRightList.individualRightListExcelDownload.do?" + param;
	}
};