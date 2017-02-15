var colorView = false;
var pickerView = false;
var adjView = false;
var palView = false;
var harView = 0;

function updateAllViews() {
	updateColorView();
	updatePickerView();
	updateAdjView();
	updatePalView();
	updateHarView();
};

function updateColorView() {
	if (colorView) {
		$("#resMI").html("bubble_chart");
	}
	else {
		$("#resMI").html("view_stream");
	}
};
function updatePickerView() {
	if (pickerView) {
		$("#boxView").css("display", "none");
		$("#mapView").css("display", "block");
	}
	else {
		$("#boxView").css("display", "block");
		$("#mapView").css("display", "none");
	}
};
function updateAdjView() {
	//$("#adj").removeClass("transform-panel-active");
	if (adjView) {
		$("#adjMI").html("expand_less");
		$("#adj").addClass("transform-panel-expand")
	}
	else {
		$("#adjMI").html("expand_more");
		$("#adj").removeClass("transform-panel-expand")
	}
};
function updatePalView() {
	$("#pal").removeClass("transform-panel-active");
	if (palView) {
		$("#palMI").html("expand_less");
		$("#pal").addClass("transform-panel-expand");
	}
	else {
		$("#palMI").html("expand_more");
		$("#pal").removeClass("transform-panel-expand");
	}
};

function updateHarView() {
	return;
}

$(document).ready(function () {
	updateAllViews();
	$(".material-icons").click(function (event) {
		event.stopPropagation();
	});
	$("#adjMI").click(function () {
		adjView = !adjView;
		updateAdjView();
	});
	$("#palMI").click(function () {
		palView = !palView;
		updatePalView();
	});
	$("#resMI").click(function () {
		colorView = !colorView;
		updateColorView();
	});
	$("#pickMI").click(function () {
		pickerView = !pickerView;
		updatePickerView();
	});
	$("#harView").click(function () {
		harView += 1;
		updateHarView();
	});
	$(".rotate").click(function () {
		if (this.id == "opt") {
			$("#slideOpt").toggleClass("transform-slideIn-active");
		}
		else {
			$("#slideAbt").toggleClass("transform-slideIn-active");
		}
	});
	$(".closeSlideIn").click(function () {
		$(".slideIn").removeClass("transform-slideIn-active");
	});
	$(".transform-panel").click(function () {
		$(this).parent().closest('div').toggleClass("transform-panel-active");
	});
});

/*
var colorPicker = (function() {
	var config = {
		lightModifier: 20,
		darkModifier: 0,
		transitionDuration: 200,
		transitionDelay: 25,
		variationTotal: 10
	};
	var state = {
		activeColor: [0, 0, 0]
	};
	function init() {
		createColorPicker(function() {
			appendBaseColors();
		});
		addEventListeners();
		setFirstColorActive(function() {
			setFirstModifiedColorActive();
		});
	}
	function setActiveBaseColor(el) {
		$('.color.active').removeClass('active');
		el.addClass('active');
	}
	function setActiveColor(el) {
		$('.color-var.active').removeClass('active');
		el.addClass('active');
		state.activeColor = el.data('color').split(',');
	}
	function addEventListeners() {
		$('body').on('click', '.color', function() {
			var color = $(this).data('color').split(',');
			setActiveBaseColor($(this));
			hideVariations(function() {
				createVariations(color, function() {
					setDelays(function() {
						showVariations();
					});
				});
			});
		});
		$('body').on('click', '.color-var', function() {
			setActiveColor($(this));
			setBackgroundColor();
		});
	}
	function setFirstColorActive(callback) {
		$('.color').eq(1).trigger('click');
		callback();
	}
	function setFirstModifiedColorActive() {
		setTimeout(function() {
			$('.color-var').eq(7).trigger('click');
		}, 500);
	}
	function createColorPicker(callback) {
		$('.color-picker').append('<div class="base-colors"></div>');
		$('.color-picker').append('<div class="varied-colors"></div>');
		$('.color-picker').append('<div class="active-color"></div>');
		$('.color-picker').append('<div class="color-history"></div>');
		callback();
	}
	function appendBaseColors() {
		for (i = 0; i < config.baseColors.length; i++) {
			$('.base-colors').append('<div class="color" data-color="' + config.baseColors[i].join() + '" style="background-color: rgb(' + config.baseColors[i].join() + ');"></div>');
		}
	};
	function setBackgroundColor() {
		$('body').css({
			'background-color': 'rgb(' + state.activeColor + ')'
		});
	}
	function createVariations(color, callback) {
		$('.varied-colors').html('');
		for (var i = 0; i < config.variationTotal; i++) {
			var newColor = [];
			for (var x = 0; x < color.length; x++) {
				var modifiedColor = (Number(color[x]) - 100) + (config.lightModifier * i);
				if (modifiedColor <= 0) {
					modifiedColor = 0;
				} else if (modifiedColor >= 255) {
					modifiedColor = 255;
				}
				newColor.push(modifiedColor);
			}
			$('.varied-colors').append('<div data-color="' + newColor + '" class="color-var" style="background-color: rgb(' + newColor + ');"></div>');
		}
		callback();
	}
	function setDelays(callback) {
		$('.color-var').each(function(x) {
			$(this).css({
				'transition': 'transform ' + (config.transitionDuration / 1000) + 's ' + ((config.transitionDelay / 1000) * x) + 's'
			});
		});
		callback();
	}
	function showVariations() {
		setTimeout(function() {
			$('.color-var').addClass('visible');
		}, (config.transitionDelay * config.variationTotal));
	}
	function hideVariations(callback) {
		$('.color-var').removeClass('visible').removeClass('active');
		setTimeout(function() {
			callback();
		}, (config.transitionDelay * config.variationTotal));
	}
	return {
		init: init
	};
}());
colorPicker.init();
*/