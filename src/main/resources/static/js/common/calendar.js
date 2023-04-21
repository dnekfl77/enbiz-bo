/**
 * 캘린더
 */
(function ($) {

	/* Find the day of the week of the first of a month. */
	/* 0:일, 1:월, 2:화, 3:수, 4:목, 5:금, 6:토 */
	var getFirstDayOfMonth = function (year, month) {
		return new Date(year, month, 1).getDay();
	};

	var getDaysInMonth = function (year, month) {
		return 32 - new Date(year, month, 32).getDate();
	};

	var daylightSavingAdjust = function (date) {
		if (!date) return null;
		date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
		return date;
	};

	/**
	 * Date관련 Object
	 */
	var DateWidget = function (yyyy, mm, today) {
		this.today = today;
		var date = new Date(yyyy + '/' + mm + '/01');
		//mount개월 만큼 더해진 년을 구한다.
		this.getFullYear = function (mount) {
			mount = mount || 0;
			var newDate = new Date(date.getFullYear(), date.getMonth() + mount, 1);
			return newDate.getFullYear();
		};
		//mount개월 만큼 더해진 월을 구한다.
		this.getMonth = function (mount) {
			mount = mount || 0;
			var newDate = new Date(date.getFullYear(), date.getMonth() + mount, 1);
			return newDate.getMonth();
		};
	};

	/**
	 */
	$.fn.createCalendar = function (pin) {
		//초기화
		var calendarBuffer = '';
		var today = new Date();
		var pin = $.extend({
			format: 'yyyy-MM-dd',
			year_range: 10
		}, pin || {});

		//초기화
		if (typeof (pin.hour) == 'undefined' || pin.hour == '') {
			pin.hour = today.getHours();
		}
		if (typeof (pin.min) == 'undefined' || pin.min == '') {
			pin.min = ("0" + today.getMinutes()).slice(-2);
		}
		if (typeof (pin.hour1) == 'undefined' || pin.hour1 == '') {
			pin.hour1 = today.getHours();
		}
		if (typeof (pin.min1) == 'undefined' || pin.min1 == '') {
			pin.min1 = ("0" + today.getMinutes()).slice(-2);
		}
		if (typeof (pin.hour2) == 'undefined' || pin.hour2 == '') {
			pin.hour2 = today.getHours();
		}
		if (typeof (pin.min2) == 'undefined' || pin.min2 == '') {
			pin.min2 = ("0" + today.getMinutes()).slice(-2);
		}

		if (typeof (pin.startName) == 'undefined' || pin.startName == '') {
			pin.startName = '시작일';
		}

		if (typeof (pin.endName) == 'undefined' || pin.endName == '') {
			pin.endName = '종료일';
		}

		if (typeof (pin.yyyymmdd) == 'undefined' || pin.yyyymmdd == '') {
			pin.yyyymmdd = today.getFullYear() + "-" + addzero(today.getMonth() + 1) + "-" + addzero(today.getDate());	//1단
		} else if (pin.yyyymmdd.length > 10) {
			pin.yyyymmdd = pin.yyyymmdd.substring(0, 10);
		}
		if (typeof (pin.yyyymmdd1) == 'undefined' || pin.yyyymmdd1 == '') {
			if (pin.type == 'A' && typeof (pin.min_date1) != 'undefined' && pin.min_date1 != null && pin.min_date1 != "") {
				var yyyymmdd = pin.min_date1.split(/ /);
				pin.yyyymmdd1 = yyyymmdd[0];
				if (yyyymmdd.length == 2) {
					pin.hour1 = yyyymmdd[1].split(/:/)[0];
					pin.min1 = yyyymmdd[1].split(/:/)[1];
				}
			} else {
				pin.yyyymmdd1 = today.getFullYear() + "-" + addzero(today.getMonth() + 1) + "-" + addzero(today.getDate());	//2단(좌측)
			}
		} else if (pin.yyyymmdd1.length > 10) {
			pin.yyyymmdd1 = pin.yyyymmdd1.substring(0, 10);
		}
		if (typeof (pin.yyyymmdd2) == 'undefined' || pin.yyyymmdd2 == '') {
			if (pin.type == 'A' && typeof (pin.min_date1) != 'undefined' && pin.min_date1 != null && pin.min_date1 != "") {
				var yyyymmdd = pin.min_date1.split(/ /);
				pin.yyyymmdd2 = yyyymmdd[0];
				if (yyyymmdd.length == 2) {
					pin.hour2 = "23";
					pin.min2 = "59";
				}
			} else {
				pin.yyyymmdd2 = today.getFullYear() + "-" + addzero(today.getMonth() + 1) + "-" + addzero(today.getDate());	//2단(우측)
			}
		} else if (pin.yyyymmdd2.length > 10) {
			pin.yyyymmdd2 = pin.yyyymmdd2.substring(0, 10);
		};
		pin.today = pin.yyyymmdd;
		pin.today1 = pin.yyyymmdd1;
		pin.today2 = pin.yyyymmdd2;

		if (pin.format == 'yyyyMMdd') {
			calendarBuffer = pin.format;
			pin.format = 'yyyy-MM-dd';
		}
		if (pin.format == 'yyyy/MM/dd') {
			calendarBuffer = pin.format;
			pin.format = 'yyyy/MM/dd';
		}
		if (pin.format == 'yyyy-MM-dd') {
			pin.isHour = false;
			pin.isMin = false;
		};
		if (pin.format == 'yyyy-MM-dd HH') {
			pin.isHour = true;
			pin.isMin = false;
		};
		if (pin.format == 'yyyy-MM-dd HH:mm') {
			pin.isHour = true;
			pin.isMin = true;
		};

		var LAYER_ID = this.attr('id');

		//캘린더 제거
		var removeCalendar = function () {
			$('#' + LAYER_ID).remove();
		};

		var body = null;

		if (pin.type == 'A') {
			body = $('<div class="layer" style="right:0; top:0; width:' + pin.width + ';margin-top:15px;">' +
				'	<div class=\'layer_lb\' style="height:265px;">' +
				'		<div class=\'layer_rt\'>' +
				'			<div class=\'layer_rb\' style="height:265px;">' +
				'				<div class=\'header\'>' +
				'				</div>' +
				'			</div>' +
				'		</div>' +
				'	</div>' +
				'</div>');
		} else {
			body = $('<div class="layer" style="left:0; top:0; width:' + pin.width + ';margin-top:15px;margin-left:4px;">' +
				'	<div class=\'layer_lb\' >' +
				'		<div class=\'layer_rt\'>' +
				'			<div class=\'layer_rb\' >' +
				'				<div class=\'header\'>' +
				'				</div>' +
				'			</div>' +
				'		</div>' +
				'	</div>' +
				'</div>');
		}

		var header = $('.header', body).append(
			$('<span/>').append(
				$('<a/>').attr('href', '#').click(function () {
					removeCalendar();
					return false;
				}).append(
					//$('<img/>').attr('src', _imgUrl + '/layout/fav_lp_btn_close.gif').attr('alt', '창닫기')
				)
			)
		);

		//달력레이아웃
		var makeDays = function () {
			var days = $('<table class=\'calendar\' />').append('<colgroup><col span=\'6\' /></colgroup>').append(
				'<tr><th class=\'red\'>일</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th class=\'blue\'>토</th></tr>'
			);
			for (var i = 0; i < 6; i++) {
				var tr = $('<tr/>');
				for (var j = 0; j < 7; j++) {
					tr.append('<td><div class=\'note_s\'><i><a href=\'#\' onclick=\'javascript:return false;\'></a></i></div></td>');
				}
				days.append(tr);
				tr.find('>td:eq(0)').addClass('red');
				tr.find('>td:eq(6)').addClass('blue');

			};

			return days;
		};

		//A 타입(2단) 캘린더
		var calendarA = function () {

			var date1 = new DateWidget(pin.yyyymmdd1.split('-')[0], pin.yyyymmdd1.split('-')[1], pin.today1);	//좌측 기준년월일
			var date2 = new DateWidget(pin.yyyymmdd2.split('-')[0], pin.yyyymmdd2.split('-')[1], pin.today2);	//우측 기준년월일

			var str =
				'<div class=\'newCalendar\'>';
			str +=
				'				<div class=\cal_box\>' +
				'					<div class=\'month\'>' +
				'						<a href=\'#\' class=\'i-prev\' id=\'left_previous\'>이전달</a>' +
				'						<select style=\'width:60px;\' id=\'left_yyyy\'></select>' +
				'						<select style=\'width:40px;\' id=\'left_mm\'></select>' +
				'						<a href=\'#\' class=\'i-next\' id=\'left_next\'>다음달</a>' +
				'					</div>' +
				'					<div class=\'grid_calendar\' id=\'left_calendar\' input=\'left_input\' ></div>' +	//좌측 달력
				'					<div class=\'day-send\'>';
			if (pin.isHour) {
				str +=
					'					<div class=\'tCenter\'><!-- ' + pin.startName + '시 -->' +
					'						<input type=\'text\' class=\'input tLeft\' style=\'width:68px;\' id=\'left_input\' maxlength=\'10\' value=\'' + pin.yyyymmdd1 + '\' />' +
					'						<select class=\'cal_time\' id=\'left_hour\'></select>' +
					'						<select class=\'cal_time\' id=\'left_min\'></select>' + 
					'					</div>';
			} else {
				str +=
					' ' + pin.startName + '' +
					'						<input type=\'text\' class=\'input tCenter\' style=\'width:70px;\' id=\'left_input\' maxlength=\'10\' value=\'' + pin.yyyymmdd1 + '\' />';
			}
			str +=
				'					</div>' +
				'				</div>';
			str +=
				'				<div class=\cal_box\>' +
				'					<div class=\'month\'>' +
				'						<a href=\'#\' class=\'i-prev\' id=\'right_previous\'>이전달</a>' +
				'						<select style=\'width:60px;\' id=\'right_yyyy\'></select>' +
				'						<select style=\'width:40px;\' id=\'right_mm\'></select>' +
				'						<a href=\'#\' class=\'i-next\' id=\'right_next\'>다음달</a>' +
				'					</div>' +
				'					<div class=\'grid_calendar ml4\' id=\'right_calendar\' input=\'right_input\' ></div>' +	//우측 달력
				'					<div class=\'day-send\'>';
			if (pin.isHour) {
				str +=
					'					<div class=\'tCenter\'><!-- ' + pin.endName + '시 -->' +
					'						<input type=\'text\' class=\'input tLeft\' style=\'width:68px;\' id=\'right_input\' maxlength=\'10\'  value=\'' + pin.yyyymmdd2 + '\' />' +
					'						<select class=\'cal_time\' id=\'right_hour\'></select>' +
					'						<select class=\'cal_time\' id=\'right_min\'></select>' +
					'					</div>';
			} else {
				str +=
					' ' + pin.endName + ' ' +
					'						<input type=\'text\' class=\'input tCenter\' style=\'width:70px;\'id=\'right_input\' maxlength=\'10\' value=\'' + pin.yyyymmdd2 + '\' />';
			}
			str +=
				'					</div>' +
				'				</div>' +
				'</div>' +
				'<div class=\'button-group\'>' +
				'		<div id=\'confirm\'></div>' +
				'</div>';
			var calendar = $(str);

			$('#left_calendar', calendar).append(makeDays());
			$('#right_calendar', calendar).append(makeDays());

			$('#left_hour, #right_hour', calendar).each(function () {
				if (pin.hours) {
					for (var i = 0; i < pin.hours.length; i++) {
						$(this).append(
							$('<option/>').attr('value', pin.hours[i]).text(pin.hours[i])
						);
					}
				} else {
					for (var i = 0; i < 24; i++) {
						$(this).append(
							$('<option/>').attr('value', addzero(i)).text(addzero(i))
						);
					}
				}
				if (this.id == 'left_hour') {
					this.value = pin.hour1;
				} else if (this.id == 'right_hour') {
					this.value = pin.hour2;
				}
			});

			$('#left_min, #right_min', calendar).each(function () {
				if (pin.mins) {
					for (var i = 0; i < pin.mins.length; i++) {
						$(this).append(
							$('<option/>').attr('value', pin.mins[i]).text(pin.mins[i])
						);
					}
				} else {
					for (var i = 0; i < 60; i++) {
						$(this).append(
							$('<option/>').attr('value', addzero(i)).text(addzero(i))
						);
					}
				}
				if (this.id == 'left_min') {
					if (pin.min1 == undefined || pin.min1 == null) {
						this.value = "00";
					} else {
						this.value = pin.min1;
					}
				} else if (this.id == 'right_min') {
					if (pin.min2 == undefined || pin.min2 == null) {
						this.value = "00";
					} else {
						this.value = pin.min2;
					}
				}
			});

			$('#confirm', calendar).append(
				//$('<button type=\'button\' />').addClass('btn_page').text('확인 ').click(function(){
				$('<a style=\'cursor:pointer\' />').addClass('button inside').html('<span class=\'text\'>확인</span>').click(function () {
					if ($('#left_input', calendar).val() == '') {
						alert(pin.startName + '시를 입력해주십시오.');
						return false;
					}
					if ($('#right_input', calendar).val() == '') {
						alert(pin.endName + '시를 입력해주십시오.');
						return false;
					}

					if ($('#left_input', calendar).val().length == 8) {
						$('#left_input', calendar).val(getCalendarDateFormat($('#left_input', calendar).val()))
					}

					if (!dateFormatCheck($('#left_input', calendar).val())) {
						alert("날짜 형식이 올바르지 않습니다.\n\n2010-01-01형식으로 입력해 주십시요.");
						return;
					}

					if ($('#right_input', calendar).val().length == 8) {
						$('#right_input', calendar).val(getCalendarDateFormat($('#right_input', calendar).val()))
					}

					if (!dateFormatCheck($('#right_input', calendar).val())) {
						alert("날짜 형식이 올바르지 않습니다.\n\n2010-01-01형식으로 입력해 주십시요.");
						return;
					}


					pin.yyyymmdd1 = $('#left_input', calendar).val();
					pin.hour1 = $('#left_hour', calendar).val();
					pin.min1 = $('#left_min', calendar).val();
					pin.yyyymmdd2 = $('#right_input', calendar).val();
					pin.hour2 = $('#right_hour', calendar).val();
					pin.min2 = $('#right_min', calendar).val();

					var date1 = pin.yyyymmdd1;
					var date2 = pin.yyyymmdd2;
					if (pin.format == 'yyyy-MM-dd HH') {
						date1 += ' ' + pin.hour1;
						date2 += ' ' + pin.hour2;
					} else if (pin.format == 'yyyy-MM-dd HH:mm') {
						date1 += ' ' + pin.hour1 + ':' + pin.min1;
						date2 += ' ' + pin.hour2 + ':' + pin.min2;
					}
					if (date1 > date2) {
						alert(pin.endName + '시가 ' + pin.startName + '시 보다 빠릅니다.');
						return false;
					}
					if (pin.format != 'yyyy-MM-dd' || !!pin.startEndChk) {
						if (date1 == date2) {
							alert(pin.endName + '시와 ' + pin.startName + '시가 동일 합니다.');
							return false;
						}
					}

					if (pin.min_date1 && date1 < pin.min_date1) {
						alert(pin.startName + '시는 ' + pin.min_date1 + '이전으로 셋팅할 수 없습니다.');
						return false;
					}

					if (pin.max_date1 && date1 > pin.max_date1) {
						alert(pin.startName + '시는 ' + pin.max_date1 + '이후로 셋팅할 수 없습니다.');
						return false;
					}

					if (pin.min_date2 && date2 < pin.min_date2) {
						alert(pin.endName + '시는 ' + pin.min_date2 + '이전으로 셋팅할 수 없습니다.');
						return false;
					}

					if (pin.max_date2 && date2 > pin.max_date2) {
						alert(pin.endName + '시는 ' + pin.max_date2 + '이후로 셋팅할 수 없습니다.');
						return false;
					}

					if (typeof (pin.max_term) != 'undefined' && pin.max_term != '') {

						if (typeof (pin.max_term_time) != 'undefined' && pin.max_term_time == true) {

							var strt_day = new Date(pin.yyyymmdd1.substring(0, 4), parseInt(pin.yyyymmdd1.substring(5, 7), 10) - 1, pin.yyyymmdd1.substring(8, 10), pin.hour1, pin.min1);
							var end_day = new Date(pin.yyyymmdd2.substring(0, 4), parseInt(pin.yyyymmdd2.substring(5, 7), 10) - 1, pin.yyyymmdd2.substring(8, 10), pin.hour2, pin.min2);

							var end_tgt_day = strt_day;
							end_tgt_day.setDate(strt_day.getDate() + parseInt(pin.max_term, 10));

							//var strt_date = strt_day.getFullYear() + "" + addzero(strt_day.getMonth() + 1) + "" + addzero(strt_day.getDate()) + "" + addzero(strt_day.getHours()) + "" + addzero(strt_day.getMinutes())
							var end_date = end_day.getFullYear() + "" + addzero(end_day.getMonth() + 1) + "" + addzero(end_day.getDate()) + "" + addzero(end_day.getHours()) + "" + addzero(end_day.getMinutes())
							var end_tgt_date = end_tgt_day.getFullYear() + "" + addzero(end_tgt_day.getMonth() + 1) + "" + addzero(end_tgt_day.getDate()) + "" + addzero(end_tgt_day.getHours()) + "" + addzero(end_tgt_day.getMinutes())
							var tgt_date = end_tgt_day.getFullYear() + "-" + addzero(end_tgt_day.getMonth() + 1) + "-" + addzero(end_tgt_day.getDate()) + " " + addzero(end_tgt_day.getHours()) + ":" + addzero(end_tgt_day.getMinutes())

							//alert(strt_date + "\n" + end_date + "\n" + end_tgt_date);
							//var term_day = ((end_day - strt_day) / 3600000 / 24) + 1;

							if (pin.max_term_check != true) {
								if (end_date > end_tgt_date) {
									alert(pin.startName + '과 ' + pin.endName + '의 기간이 ' + pin.max_term + '일을 초과할 수 없습니다.\n(기간 ' + pin.max_term + '일의 ' + pin.endName + '은 ' + tgt_date + ' 입니다.)');
									return false;
								}
							} else {
								if (end_date != end_tgt_date) {
									alert(pin.startName + '과 ' + pin.endName + '의 기간이 ' + pin.max_term + '일과 일치하여야 합니다.\n(기간 ' + pin.max_term + '일의 ' + pin.endName + '은 ' + tgt_date + ' 입니다.)');
									return false;
								}
							}

						} else {

							var max_date = new Date(pin.yyyymmdd1.substring(0, 4), parseInt(pin.yyyymmdd1.substring(5, 7), 10) - 1, parseInt(pin.yyyymmdd1.substring(8), 10) + parseInt(pin.max_term, 10))
							if (pin.max_term_check != true) {
								if (max_date.getFullYear() + '-' + addzero(parseInt(max_date.getMonth()) + 1) + '-' + addzero(max_date.getDate()) < pin.yyyymmdd2) {
									alert(pin.startName + '과 ' + pin.endName + '의 기간이 ' + pin.max_term + '일을 초과할 수 없습니다.');
									return false;
								}
							} else {
								if (max_date.getFullYear() + '-' + addzero(parseInt(max_date.getMonth()) - 1) + '-' + addzero(max_date.getDate()) != pin.yyyymmdd2) {
									alert(pin.startName + '과 ' + pin.endName + '의 기간이 ' + pin.max_term + '일과 일치하여야 합니다.');
									return false;
								}
							}
						}
					}

					if (calendarBuffer == 'yyyyMMdd') {
						pin.yyyymmdd = pin.yyyymmdd.replace(/-/g, '');
						pin.yyyymmdd1 = pin.yyyymmdd1.replace(/-/g, '');
						pin.yyyymmdd2 = pin.yyyymmdd2.replace(/-/g, '');
					}

					if (calendarBuffer == 'yyyy/MM/dd') {
						pin.yyyymmdd = pin.yyyymmdd.replace(/-/g, '/');
						pin.yyyymmdd1 = pin.yyyymmdd1.replace(/-/g, '/');
						pin.yyyymmdd2 = pin.yyyymmdd2.replace(/-/g, '/');
					}

					pin.fn(pin);
					removeCalendar();
				})
			).append(
				//$('<button type=\'button\'/>').addClass('btn_black marL05').text('취소').click(function(){
				$('<a style=\'cursor:pointer\' />').addClass('button inside').html('<span class=\'text\'>취소</span>').click(function () {
					removeCalendar();
				})
			);

			setDays($('#left_calendar', calendar), date1, function (yyyymmdd) {
				$('#left_input', calendar).val(yyyymmdd);
			}, 0, calendar, null, $('#left_input', calendar).val());
			setDays($('#right_calendar', calendar), date2, function (yyyymmdd) {
				$('#right_input', calendar).val(yyyymmdd);
			}, 0, calendar, null, $('#right_input', calendar).val());

			$('#left_previous', calendar).click(function () {
				date1 = new DateWidget(selectYear1.val(), selectMonth1.val(), pin.today1);
				selectYear1.val(date1.getFullYear(-1));
				selectMonth1.val(addzero(date1.getMonth(-1) + 1));
				date1 = new DateWidget(selectYear1.val(), selectMonth1.val(), pin.today1);
				setDays($('#left_calendar', calendar), date1, function (yyyymmdd) {
					$('#left_input', calendar).val(yyyymmdd);
				}, 0, calendar, 'Y', $('#left_input', calendar).val());
				return false;
			});

			var selectYear1 = $('#left_yyyy', calendar);

			if (pin.max_yyyy && pin.min_yyyy) {
				var max_yyyy = pin.max_yyyy;
				var min_yyyy = pin.min_yyyy;
				for (; max_yyyy >= min_yyyy;) {
					selectYear1.append(
						$('<option></option>').attr('value', max_yyyy).append(max_yyyy)
					);
					max_yyyy--;
				}
			} else {
				var optYear1 = date1.getFullYear() + pin.year_range;
				for (var i = 0; i <= pin.year_range * 2; i++) {
					selectYear1.append(
						$('<option></option>').attr('value', optYear1).append(optYear1)
					);
					optYear1--;
				}
			}

			selectYear1.val(date1.getFullYear());

			selectYear1.change(function () {
				date1 = new DateWidget(this.value, selectMonth1.val(), pin.today1);
				setDays($('#left_calendar', calendar), date1, function (yyyymmdd) {
					$('#left_input', calendar).val(yyyymmdd);
				}, 0, calendar, 'Y', $('#left_input', calendar).val());
			});

			var selectMonth1 = $('#left_mm', calendar);
			for (var i = 0; i < 12; i++) {
				selectMonth1.append(
					$('<option></option>').attr('value', addzero(i + 1)).append(addzero(i + 1))
				);
			};
			selectMonth1.val(addzero(date1.getMonth() + 1));

			selectMonth1.change(function () {
				date1 = new DateWidget(selectYear1.val(), this.value, pin.today1);
				setDays($('#left_calendar', calendar), date1, function (yyyymmdd) {
					$('#left_input', calendar).val(yyyymmdd);
				}, 0, calendar, 'Y', $('#left_input', calendar).val());
			});

			$('#left_next', calendar).click(function () {
				date1 = new DateWidget(selectYear1.val(), selectMonth1.val(), pin.today1);
				selectYear1.val(date1.getFullYear(1));
				selectMonth1.val(addzero(date1.getMonth(1) + 1));
				date1 = new DateWidget(selectYear1.val(), selectMonth1.val(), pin.today1);
				setDays($('#left_calendar', calendar), date1, function (yyyymmdd) {
					$('#left_input', calendar).val(yyyymmdd);
				}, 0, calendar, 'Y', $('#left_input', calendar).val());
				return false;
			});

			$('#right_previous', calendar).click(function () {
				date2 = new DateWidget(selectYear2.val(), selectMonth2.val(), pin.today2);
				selectYear2.val(date2.getFullYear(-1));
				selectMonth2.val(addzero(date2.getMonth(-1) + 1));
				date2 = new DateWidget(selectYear2.val(), selectMonth2.val(), pin.today2);
				setDays($('#right_calendar', calendar), date2, function (yyyymmdd) {
					$('#right_input', calendar).val(yyyymmdd);
				}, 0, calendar, 'Y', $('#right_input', calendar).val());
				return false;
			});


			var selectYear2 = $('#right_yyyy', calendar);

			if (pin.max_yyyy && pin.min_yyyy) {
				var max_yyyy = pin.max_yyyy;
				var min_yyyy = pin.min_yyyy;
				for (; max_yyyy >= min_yyyy;) {
					selectYear2.append(
						$('<option></option>').attr('value', max_yyyy).append(max_yyyy)
					);
					max_yyyy--;
				}
			} else {
				var optYear2 = date2.getFullYear() + pin.year_range;
				for (var i = 0; i <= pin.year_range * 2; i++) {
					selectYear2.append(
						$('<option></option>').attr('value', optYear2).append(optYear2)
					);
					optYear2--;
				}
			}

			selectYear2.val(date2.getFullYear());

			$('#right_yyyy', calendar).change(function () {
				date2 = new DateWidget(this.value, selectMonth2.val(), pin.today2);
				setDays($('#right_calendar', calendar), date2, function (yyyymmdd) {
					$('#right_input', calendar).val(yyyymmdd);
				}, 0, calendar, 'Y', $('#right_input', calendar).val());
			});

			var selectMonth2 = $('#right_mm', calendar);
			for (var i = 0; i < 12; i++) {
				selectMonth2.append(
					$('<option></option>').attr('value', addzero(i + 1)).append(addzero(i + 1))
				);
			};
			selectMonth2.val(addzero(date2.getMonth() + 1));

			selectMonth2.change(function () {
				date2 = new DateWidget(selectYear2.val(), this.value, pin.today2);
				setDays($('#right_calendar', calendar), date2, function (yyyymmdd) {
					$('#right_input', calendar).val(yyyymmdd);
				}, 0, calendar, 'Y', $('#right_input', calendar).val());
			});

			$('#right_next', calendar).click(function () {
				date2 = new DateWidget(selectYear2.val(), selectMonth2.val(), pin.today2);
				selectYear2.val(date2.getFullYear(1));
				selectMonth2.val(addzero(date2.getMonth(1) + 1));
				date2 = new DateWidget(selectYear2.val(), selectMonth2.val(), pin.today2);
				setDays($('#right_calendar', calendar), date2, function (yyyymmdd) {
					$('#right_input', calendar).val(yyyymmdd);
				}, 0, calendar, 'Y', $('#right_input', calendar).val());
				return false;
			});

			header.after(calendar);
		};

		//B타입 (3단) 캘린더
		var calendarB = function () {

			var date = new DateWidget(pin.yyyymmdd.split('-')[0], pin.yyyymmdd.split('-')[1], pin.today);	//좌측 기준년월일

			var calendar = $(
				$('<div/>').addClass(pin.isHour ? '' : 'pdb10').append(
					'	<table id=\'table\' >' +
					'		<colgroup>' +
					'			<col width=\'190\' />' +
					'			<col width=\'10\' />' +
					'			<col width=\'190\' />' +
					'			<col width=\'10\' />' +
					'			<col width=\'190\' />' +
					'		</colgroup>' +
					'		<tr>' +
					'			<td>' +
					'				<div>' +
					'					<div class=\'tCenter marB08\'>' +
					'						<a href=\'#\'  class=\'i-prev\' id=\'previous\' >이전달</a>' +
					'						<strong id=\'previous_yyyy\'></strong> - <strong id=\'previous_mm\'></strong>' +
					'					</div>' +
					'					<div class=\'grid_calendar\' id=\'left_calendar\' input=\'input\' ></div>' +
					'				</div>' +
					'			</td>' +
					'			<td></td>' +
					'			<td>' +
					'				<div>' +
					'					<div class=\'tCenter marB08\'>' +
					'						<select ' + (pin.isHour ? 'style=\'width:60px;\'' : '') + ' id=\'yyyy\' ></select>' +
					'						년' +
					'						<select ' + (pin.isHour ? 'style=\'width:37px;\'' : '') + ' id=\'mm\' ></select>' +
					'						월 </div>' +
					'						<div class=\'grid_calendar\' id=\'center_calendar\' input=\'input\' ></div>' +
					'					</div>' +
					'				</div>' +
					'			</td>' +
					'			<td></td>' +
					'			<td>' +
					'				<div>' +
					'					<div class=\'tCenter marB08\'>' +
					'						<strong id=\'next_yyyy\'></strong> - <strong id=\'next_mm\'></strong>' +
					'						<a href=\'#\' class=\'i-next\' id=\'next\'>다음달</a>' +
					'					</div>' +
					'					<div class=\'grid_calendar\' id=\'right_calendar\' input=\'input\' ></div>' +
					'				</div>' +
					'			</td>' +
					'		</tr>' +
					'	</table>' +
					'<div class=\'button-group\'>' +
					' <div id=\'confirm\'></div>' +
					'</div>'
				)
			);

			$('#left_calendar', calendar).append(makeDays());
			$('#center_calendar', calendar).append(makeDays());
			$('#right_calendar', calendar).append(makeDays());
			$('#confirm', calendar).append(
				//$('<button type=\'button\'/>').addClass('btn_black marL05').addClass('ml5').text('취소').click(function(){
				$('<a style=\'cursor:pointer;margin:0 auto\' />').addClass('button inside').html('<span class=\'text\'>취소</span></a>').click(function () {
					removeCalendar();
				})
			);
			var selectYear = $('#yyyy', calendar);

			if (pin.max_yyyy && pin.min_yyyy) {
				var max_yyyy = pin.max_yyyy;
				var min_yyyy = pin.min_yyyy;
				for (; max_yyyy >= min_yyyy;) {
					selectYear.append(
						$('<option></option>').attr('value', max_yyyy).append(max_yyyy)
					);
					max_yyyy--;
				}
			} else {
				var optYear = date.getFullYear() + pin.year_range;
				for (var i = 0; i <= pin.year_range * 2; i++) {
					selectYear.append(
						$('<option></option>').attr('value', optYear).append(optYear)
					);
					optYear--;
				}
			}

			selectYear.val(date.getFullYear());

			selectYear.change(function () {
				date = new DateWidget(this.value, selectMonth.val(), pin.today);
				redraw(date);
			});

			var selectMonth = $('#mm', calendar);
			for (var i = 0; i < 12; i++) {
				selectMonth.append(
					$('<option></option>').attr('value', addzero(i + 1)).append(addzero(i + 1))
				);
			};
			selectMonth.val(addzero(date.getMonth() + 1));

			selectMonth.change(function () {
				date = new DateWidget(selectYear.val(), this.value, pin.today);
				redraw(date);
			});

			var checkMinMax = function () {
				var date = pin.yyyymmdd;
				if (pin.format == 'yyyy-MM-dd HH') {
					date += ' ' + pin.hour;
				} else if (pin.format == 'yyyy-MM-dd HH:mm') {
					date += ' ' + pin.hour + ':' + pin.min;
				}

				if (pin.min_date && date < pin.min_date) {
					alert(pin.min_date + '이전으로 셋팅할 수 없습니다.');
					return true;
				}

				if (pin.max_date && date > pin.max_date) {
					alert(pin.max_date + '이후로 셋팅할 수 없습니다.');
					return true;
				}
				return false;
			};

			var redraw = function (date) {

				$('#previous_yyyy', calendar).text(date.getFullYear(-1));
				$('#previous_mm', calendar).text(addzero(date.getMonth(-1) + 1));
				$('#next_yyyy', calendar).text(date.getFullYear(1));
				$('#next_mm', calendar).text(addzero(date.getMonth(1) + 1));

				$('#left_calendar, #center_calendar, #right_calendar', calendar).find('td.bg_blue').removeClass('bg_blue');

				setDays($('#left_calendar', calendar), date, function (yyyymmdd) {
					if ($('#input', calendar).length == 0) {
						pin.yyyymmdd = yyyymmdd;

						if (checkMinMax()) {
							return false;
						}

						if (calendarBuffer == 'yyyyMMdd') {
							pin.yyyymmdd = pin.yyyymmdd.replace(/-/g, '');
						}

						if (calendarBuffer == 'yyyy/MM/dd') {
							pin.yyyymmdd = pin.yyyymmdd.replace(/-/g, '/');
						}

						pin.fn(pin);
						removeCalendar();
					} else {
						$('#input', calendar).val(yyyymmdd);
					}
				}, -1, calendar, null, $('#input', calendar).val());
				setDays($('#center_calendar', calendar), date, function (yyyymmdd) {
					if ($('#input', calendar).length == 0) {
						pin.yyyymmdd = yyyymmdd;

						if (checkMinMax()) {
							return false;
						}

						if (calendarBuffer == 'yyyyMMdd') {
							pin.yyyymmdd = pin.yyyymmdd.replace(/-/g, '');
						}

						if (calendarBuffer == 'yyyy/MM/dd') {
							pin.yyyymmdd = pin.yyyymmdd.replace(/-/g, '/');
						}

						pin.fn(pin);
						removeCalendar();
					} else {
						$('#input', calendar).val(yyyymmdd);
					}
				}, 0, calendar, null, $('#input', calendar).val());
				setDays($('#right_calendar', calendar), date, function (yyyymmdd) {
					if ($('#input', calendar).length == 0) {
						pin.yyyymmdd = yyyymmdd;

						if (checkMinMax()) {
							return false;
						}

						if (calendarBuffer == 'yyyyMMdd') {
							pin.yyyymmdd = pin.yyyymmdd.replace(/-/g, '');
						}

						if (calendarBuffer == 'yyyy/MM/dd') {
							pin.yyyymmdd = pin.yyyymmdd.replace(/-/g, '/');
						}

						pin.fn(pin);
						removeCalendar();
					} else {
						$('#input', calendar).val(yyyymmdd);
					}
				}, 1, calendar, null, $('#input', calendar).val());
			};

			redraw(date);

			$('#previous', calendar).click(function () {
				selectYear.val(date.getFullYear(-3));
				selectMonth.val(addzero(date.getMonth(-3) + 1));
				date = new DateWidget(selectYear.val(), selectMonth.val(), pin.today);
				redraw(date);
				return false;
			});

			$('#next', calendar).click(function () {
				selectYear.val(date.getFullYear(3));
				selectMonth.val(addzero(date.getMonth(3) + 1));
				date = new DateWidget(selectYear.val(), selectMonth.val(), pin.today);
				redraw(date);
				return false;
			});

			if (pin.isHour) {
				$('#table', calendar).after(
					'	<div class=\'tCenter width_100 mb20\'>' +
					'		<table class=\'table_basic\'>' +
					'			<colgroup>' +
					'			<col/>' +
					'			</colgroup>' +
					'			<tr>' +
					'				<td class=\'tCenter\'>' +
					'					<span class=\'dot_blue\'>선택일시</span>' +
					'					<input type=\'text\' class=\'input\' style=\'width:70px;\' id=\'input\' maxlength=\'10\' />' +
					'					<select class=\'cal_time\' id=\'hour\' ></select>' +
					'					<select class=\'cal_time\' id=\'min\' ></select>' +
					'				</td>' +
					'			</tr>' +
					'		</table>' +
					'	</div>' +
					'	<div class=\'button-group\'>' +
					'		<div id=\'confirm\'></div>' +
					'	</div>'
				);
				$('#confirm', calendar).append(
					//$('<button type=\'button\' />').addClass('blue2').text('확인').click(function(){
					//$('<a href=\'#\' />').addClass('btn_page').text('확인 ').click(function(){
					$('<a style=\'cursor:pointer\' />').addClass('button inside').html('<span class=\'text\'>확인</span>').click(function () {
						if ($('#input', calendar).val() == '') {
							alert('날짜 및 시간을 입력해주십시오.');
							return false;
						}

						if (!dateFormatCheck($('#input', calendar).val())) {
							alert("날짜 형식이 올바르지 않습니다.\n\n2010-01-01형식으로 입력해 주십시요.");
							return;
						}
						pin.yyyymmdd = $('#input', calendar).val();
						pin.hour = $('#hour', calendar).val();
						pin.min = $('#min', calendar).val();

						if (checkMinMax()) {
							return false;
						}

						pin.fn(pin);
						removeCalendar();
					})
				).append(
					//$('<button type=\'button\'/>').addClass('btn_black marL05').addClass('ml5').text('취소').click(function(){
					$('<a style=\'cursor:pointer\' />').addClass('button inside').html('<span class=\'text\'>취소</span>').click(function () {
						removeCalendar();
					})
				);

				$('#input', calendar).val(pin.yyyymmdd);

				$('#hour', calendar).each(function () {
					if (pin.hours) {
						for (var i = 0; i < pin.hours.length; i++) {
							$(this).append(
								$('<option/>').attr('value', pin.hours[i]).text(pin.hours[i])
							);
						}
					} else {
						for (var i = 0; i < 24; i++) {
							$(this).append(
								$('<option/>').attr('value', addzero(i)).text(addzero(i))
							);
						}
					}
					this.value = pin.hour;
				});

				$('#min', calendar).each(function () {
					if (pin.mins) {
						for (var i = 0; i < pin.mins.length; i++) {
							$(this).append(
								$('<option/>').attr('value', pin.mins[i]).text(pin.mins[i])
							);
						}
					} else {
						for (var i = 0; i < 60; i++) {
							$(this).append(
								$('<option/>').attr('value', addzero(i)).text(addzero(i))
							);
						}
					}
					this.value = pin.min;
				});
			};

			header.after(calendar);
		};

		//C타입 (1단) 캘린더
		var calendarC = function () {

			var date = new DateWidget(pin.yyyymmdd.split('-')[0], pin.yyyymmdd.split('-')[1], pin.today);	//기준년월일

			var calendar = $(
				'<div class=\'newCalendar\'>' +
				'	<div class=\'cal_box\'>' +
				'		<div class=\'month\'>' +
				'		<a href=\'#\' class=\'i-prev\'  id=\'previous\' >이전달</a>' +
				'		<select id=\'yyyy\' style=\'width:60px;\'></select>' +
				'		<select id=\'mm\' style=\'width:37px;\'></select>' +
				'		<a href=\'#\' class=\'i-next\' id=\'next\' >다음달</a>' +
				'	</div>' +
				'	<div class=\'grid_calendar\' id=\'calendar\' input=\'input\' ></div>' +
				'		<div class=\'day-send\' id=\'input_area\'></div>' +
				'	</div>' +
				'</div>' +
				'<div class=\'button-group\'>' +
				'<div id=\'confirm\'></div>' +
				'</div>'
			);

			$('#calendar', calendar).append(makeDays());
			var selectYear = $('#yyyy', calendar);

			if (pin.max_yyyy && pin.min_yyyy) {
				var max_yyyy = pin.max_yyyy;
				var min_yyyy = pin.min_yyyy;
				for (; max_yyyy >= min_yyyy;) {
					selectYear.append(
						$('<option></option>').attr('value', max_yyyy).append(max_yyyy)
					);
					max_yyyy--;
				}
			} else {
				var optYear = date.getFullYear() + pin.year_range;
				for (var i = 0; i <= pin.year_range * 2; i++) {
					selectYear.append(
						$('<option></option>').attr('value', optYear).append(optYear)
					);
					optYear--;
				}
			}

			selectYear.val(date.getFullYear());

			selectYear.change(function () {
				date = new DateWidget(this.value, selectMonth.val(), pin.today);
				redraw(date);
			});

			var selectMonth = $('#mm', calendar);
			for (var i = 0; i < 12; i++) {
				selectMonth.append(
					$('<option></option>').attr('value', addzero(i + 1)).append(addzero(i + 1))
				);
			};
			selectMonth.val(addzero(date.getMonth() + 1));

			selectMonth.change(function () {
				date = new DateWidget(selectYear.val(), this.value, pin.today);
				redraw(date);
			});
			if (pin.yyyymmdd) {
				$('#input_area', calendar).append(
					' <input type=\'text\' class=\'input tLeft\' style=\'width:68px;\' id=\'input\' maxlength=\'10\' value=\'' + pin.yyyymmdd + '\' />'
				);
			};
			if (pin.isHour) {
				$('#input_area', calendar).append(
					'<select id=\'hour\' class=\'cal_time\' ></select>' +
					'<select id=\'min\' class=\'cal_time\' ></select>'
				);

				$('#input', calendar).val(pin.yyyymmdd);

				$('#hour', calendar).each(function () {
					if (pin.hours) {
						for (var i = 0; i < pin.hours.length; i++) {
							$(this).append(
								$('<option/>').attr('value', pin.hours[i]).text(pin.hours[i])
							);
						}
					} else {
						for (var i = 0; i < 24; i++) {
							$(this).append(
								$('<option/>').attr('value', addzero(i)).text(addzero(i))
							);
						}
					}
					this.value = pin.hour;
				});

				$('#min', calendar).each(function () {
					if (pin.mins) {
						for (var i = 0; i < pin.mins.length; i++) {
							$(this).append(
								$('<option/>').attr('value', pin.mins[i]).text(pin.mins[i])
							);
						}
					} else {
						for (var i = 0; i < 60; i++) {
							$(this).append(
								$('<option/>').attr('value', addzero(i)).text(addzero(i))
							);
						}
					}
					this.value = pin.min;
				});


			}
			//취소
			if (pin.yyyymmdd) {
				$('#confirm', calendar).append(
					$('<a style=\'cursor:pointer\' />').addClass('button inside').html('<span class=\'text\'>확인</span>').click(function () {
						if ($('#input', calendar).val() == '') {
							alert('날짜 및 시간을 입력해주십시오.');
							return false;
						}
						pin.yyyymmdd = $('#input', calendar).val();
						pin.hour = $('#hour', calendar).val();
						pin.min = $('#min', calendar).val();

						if (checkMinMax()) {
							return false;
						}

						pin.fn(pin);
						removeCalendar();
					})
				).append(
					//$('<button type=\'button\' />').addClass('btn_black marL05').addClass('ml5').text('취소').click(function(){
					$('<a style=\'cursor:pointer\' />').addClass('button inside').html('<span class=\'text\'>취소</span>').click(function () {
						removeCalendar();
					})
				);
			};
			$('#previous', calendar).click(function () {
				selectYear.val(date.getFullYear(-1));
				selectMonth.val(addzero(date.getMonth(-1) + 1));
				date = new DateWidget(selectYear.val(), selectMonth.val(), pin.today);
				redraw(date);
				return false;
			});

			$('#next', calendar).click(function () {
				selectYear.val(date.getFullYear(1));
				selectMonth.val(addzero(date.getMonth(1) + 1));
				date = new DateWidget(selectYear.val(), selectMonth.val(), pin.today);
				redraw(date);
				return false;
			});

			var checkMinMax = function () {
				var date = pin.yyyymmdd;
				if (pin.format == 'yyyy-MM-dd HH') {
					date += ' ' + pin.hour;
				} else if (pin.format == 'yyyy-MM-dd HH:mm') {
					date += ' ' + pin.hour + ':' + pin.min;
				}

				if (pin.min_date && date < pin.min_date) {
					alert(pin.min_date + '이전으로 셋팅할 수 없습니다.');
					return true;
				}

				if (pin.max_date && date > pin.max_date) {
					alert(pin.max_date + '이후로 셋팅할 수 없습니다.');
					return true;
				}
				return false;
			};

			var redraw = function (date) {
				setDays($('#calendar', calendar), date, function (yyyymmdd) {
					if ($('#input', calendar).length == 0) {
						pin.yyyymmdd = yyyymmdd;

						if (checkMinMax()) {
							return false;
						}

						if (calendarBuffer == 'yyyyMMdd') {
							pin.yyyymmdd = pin.yyyymmdd.replace(/-/g, '');
						}

						if (calendarBuffer == 'yyyy/MM/dd') {
							pin.yyyymmdd = pin.yyyymmdd.replace(/-/g, '/');
						}

						pin.fn(pin);
						removeCalendar();
					} else {
						$('#input', calendar).val(yyyymmdd);
					}
				}, 0, calendar, null, $('#input', calendar).val());
			};

			redraw(date);

			header.after(calendar);
		};

		var setDays = function (target, date, fn, mount, calendar, chg_yn, selected_day) {
			mount = mount || 0;
			var yyyy = date.getFullYear(mount);
			var mm = date.getMonth(mount);
			var firstDay = 0;	// The first day of the week, Sun = 0, Mon = 1, ...
			var leadDays = (getFirstDayOfMonth(yyyy, mm) - firstDay + 7) % 7;
			var printDate = daylightSavingAdjust(new Date(yyyy, mm, 1 - leadDays));

			if (pin.type != 'B') {
				target.find('td.bg_blue').removeClass('bg_blue');
			};

			for (var dRow = 1; dRow <= 6; dRow++) {

				var tr = target.find('tr:eq(' + dRow + ')');

				for (var dow = 0; dow < 7; dow++) {
					var otherMonth = (printDate.getMonth() != mm);
					var td = tr.find('>td:eq(' + dow + ')');
					if (!otherMonth) {
						var yyyymmdd = printDate.getFullYear() + '-' + addzero(printDate.getMonth() + 1) + '-' + addzero(printDate.getDate());
						td.find('a').attr('href', '#').attr('yyyymmdd', yyyymmdd).click(function () {	//날짜 클릭시
							if (pin.type == 'B') {
								$('#left_calendar, #center_calendar, #right_calendar', calendar).find('td.bg_blue').removeClass('bg_blue');
							} else {
								target.find('td.bg_blue').removeClass('bg_blue');
							}
							$(this).parent().parent().parent().addClass('bg_blue')

							fn($(this).attr('yyyymmdd'));

							return false;
						}).text(addzero(printDate.getDate()));

						//선택일
						if (yyyymmdd == selected_day) {
							td.addClass('bg_blue');
						}

						//선택일
						if (yyyymmdd == (today.getFullYear() + "-" + addzero(today.getMonth() + 1) + "-" + addzero(today.getDate()))) {
							//							td.addClass('bg_blue');
						}
					} else {
						td.find('a').text('');
					}
					printDate.setDate(printDate.getDate() + 1);
				}
			};

			if (chg_yn == 'Y') {
				var yyyymm = date.getFullYear() + "" + addzero(date.getMonth() + 1);
				if (target.attr('id') == 'left_calendar') {	//오른쪽 달력 년월비교
					var yyyy2 = $('#right_yyyy', calendar);
					var mm2 = $('#right_mm', calendar);
					var yyyymm2 = yyyy2.val() + "" + mm2.val();
					if (yyyymm > yyyymm2) {
						setDays($('#right_calendar', calendar), date, function (yyyymmdd) {
							$('#right_input', calendar).val(yyyymmdd);
						});
						yyyy2.val(date.getFullYear());
						mm2.val(addzero(date.getMonth() + 1));
					}
				} else if (target.attr('id') == 'right_calendar') {	//왼쪽 달력 년월비교
					var yyyy2 = $('#left_yyyy', calendar);
					var mm2 = $('#left_mm', calendar);
					var yyyymm2 = yyyy2.val() + "" + mm2.val();
					if (yyyymm < yyyymm2) {
						setDays($('#left_calendar', calendar), date, function (yyyymmdd) {
							$('#left_input', calendar).val(yyyymmdd);
						});
						yyyy2.val(date.getFullYear());
						mm2.val(addzero(date.getMonth() + 1));
					}
				}
			};
		};

		if (pin.type == 'A') {
			calendarA(pin);
		} else if (pin.type == 'B') {
			calendarB(pin);
		} else if (pin.type == 'C') {
			calendarC(pin);
		}

        // S position redraw 2021.06.14 by nhpark
        var parentTop = top.document.body.clientTop;
        var parentLeft = top.document.body.clientLeft;
        var parentWidth = top.document.body.clientWidth;
        var parentHeight = top.document.body.clientHeight;
        var calenderWidth = parseInt(pin.width.replace(/px/g, ''), 10);
        var calenderHeight = parseInt(pin.height.replace(/px/g, ''), 10);
        var rePosLeft = _pageX;
        var rePosTop = _pageY;

        if (rePosLeft + calenderWidth > parentWidth) {
            rePosLeft = (rePosLeft - ((rePosLeft + calenderWidth) - parentWidth) - 30);

            console.log('rePosLeft = ', rePosLeft);

            if ($('#'+pin.id)[0].style) {
                $('#'+pin.id)[0].style.left = rePosLeft + 'px'
            }
        }

        if (rePosTop + calenderHeight > parentHeight) {
            rePosTop = (rePosTop - ((rePosTop + calenderHeight) - parentHeight) - 50);

            console.log('rePosTop = ', rePosTop);

            if ($('#'+pin.id)[0].style) {
                $('#'+pin.id)[0].style.top = rePosTop + 'px'
            }
        }
        // E position redraw 2021.06.14 by nhpark

		this.append(body);
	};

})(jQuery);

jQuery(document).ready(function () {
	$('#left_input').click(function () {
		alert("aa");
	});

});