$.namespace("cnslTypeListPopupGrid.eventhandler");
cnslTypeListPopupGrid.eventhandler = {
    // 초기화
    init : function () {
        this.gridLoading();
        this.cnslTypNoSetting(1,csCnslTypRoot);
        this.bindButtonEvent();
        this.onSearch(0);
    },
    cnslTypNoSetting : function(depth,cnslTypNo){
        common.Ajax.sendRequest(
            "get",
            _baseUrl + "customerservice/counselingTypeMgmt.getCounselingTypeNoList.do",
            'cnslTypNo=' + cnslTypNo,
            function ( list ) {

                var targetEl = '#cnslLrgTypNo';

                if(depth === 1){
                    $('#cnslLrgTypNo option').not("[value='']").remove();
                    targetEl = $('#cnslLrgTypNo');
                }

                if(depth === 2){
                    $('#cnslMidTypNo option').not("[value='']").remove();
                    targetEl = $('#cnslMidTypNo');
                }

                if(depth === 3){
                    $('#cnslSmlTypNo option').not("[value='']").remove();
                    targetEl = $('#cnslSmlTypNo');
                }

                list.forEach(function(data){
                    $(targetEl).append($("<option value='"+data.cnslTypNo+"'>"+data.cnslTypNm+"</option>"));
                })
            });

    },
    bindButtonEvent : function(){
        var self = this;

        $('#cnslLrgTypNo').change(function(){
            self.cnslTypNoSetting(2,$(this).val());
        })

        $('#cnslMidTypNo').change(function(){
            self.cnslTypNoSetting(3,$(this).val());
        })

        $('#btn_popup_list').click(function() {
            self.onSearch(0,true);
        })

        $('#btn_popup_init').click(function() {
            $('#cnslTypeListPopupGridForm')[0].reset();
            $('.cnslSelect option').not("[value='']").remove();
        })

        $("#cnslTypeListPopupGridForm").keypress(function (e){
            if (e.which == 13){
                $('#btn_popup_list').click();
                window.event.returnValue=false;
            }
        })

        $('#btn_popup_apply').click(function(){
            var datProvider = self.grid.getDataSource();
            var returnData = [];
            var rowIndex = self.grid.getCurrent().dataRow;

            if(rowIndex === -1){
                alert(_msg.noSelectedDataMsg);
                return;
            }

            returnData.push(datProvider.getJsonRow(rowIndex));

            window.postMessage(JSON.stringify(returnData), _baseUrl);
            window.close();
        })

        $("#btn_popup_close").click(function() {
            window.close();
        })
    },
    gridLoading : function(){
        // 그리드 셀 수정 불가 설정
        grid.setEditOptions({ editable: false })

        //그리드 셀 체크시 색상 변경 기능 설정
        grid.onItemChecked = function(grid, itemIndex, checked) {
            grid.setCurrent({ itemIndex: itemIndex })
        }
        grid.setRowStyleCallback(function(grid, item, fixed) {
            if (item.checked) {
                return 'rg-trcol_active'
            }
        })
    },
    onSearch : function(pageIdx,isOpenToast){
        this.grid.cancel();
        pageIdx = !pageIdx ? 0 : pageIdx;
        var self = this;
        var pagingFunc = function(pageIdx){return self.onSearch(pageIdx);};
        this.controller.doQuery(this,"",pageIdx, pagingFunc,false,isOpenToast);
    },
    gridEvent : {
        // 조회 완료 후 CallBack 함수
        afterQuerySuccess : function (grid, data) {
        }
        ,onCellDblClicked : function(grid, clickData) {
            if ( clickData.cellType === 'gridEmpty' ) return;
            var currentData = grid.getDataSource().getJsonRow(clickData.dataRow);
            var returnData = [];
            returnData.push(currentData)
            window.postMessage(JSON.stringify(returnData), _baseUrl);
            window.close();
        }
    },

};