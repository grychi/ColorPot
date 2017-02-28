var colorView = false;
var pickerView = false;
var adjView = false;
var palView = false;
var harView = false;

function updateAllViews() {
	updateColorView();
	updatePickerView();
	updateAdjView();
	updatePalView();
	updateHarView();
	optViewReset();
};

function updateColorView() {
	if (colorView) {
		$("#resMI").html("bubble_chart");
		$(".aColor").addClass("bColor");
		$(".bColor").removeClass("aColor");
	}
	else {
		$("#resMI").html("view_stream");
		$(".bColor").addClass("aColor");
		$(".aColor").removeClass("bColor");
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
	//$("#pal").removeClass("transform-panel-active");
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
	if (harView) {
		$("#harMI").html("lock_open");
	}
	else {
		$("#harMI").html("lock_outline");
	}
}

function optViewReset() {
	$("#headGen").removeClass("headActive");
	$("#headAdv").removeClass("headActive");
	$("#headAcc").removeClass("headActive");
	$("#optGen").css("display", "none");
	$("#optAdv").css("display", "none");
	$("#optAcc").css("display", "none");
}

$(document).ready(function () {
	updateAllViews();

	$("#headGen").addClass("headActive");
	$("#optGen").css("display", "block");

	$(".material-icons").click(function (event) {
		event.stopPropagation();
	});
	$("#adjMI").click(function () {
		adjView = !adjView;
		//updateAdj(adjView);
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
	$("#resUn").click(function () {
		
	});
	$("#pickMI").click(function () {
		pickerView = !pickerView;
		updatePickerView();
	});
	$("#harMI").click(function () {
		harView = !harView;
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
	$(".optHeadClick").click(function () {
		optViewReset();
		$(this).addClass("headActive");
		if (this.id == "headGen") {
			$("#optGen").css("display", "block");
		}
		else if (this.id == "headAdv") {
			$("#optAdv").css("display", "block");
		}
		else {
			$("#optAcc").css("display", "block");
		}
	});
});

function colorClick() {
	setUI(this.style.backgroundColor);
	var prevColor = document.getElementById("showColor" + currColor);
	if (prevColor != null) {
		prevColor.innerHTML = "";
	}
	currColor = parseInt(this.id.substring(9, this.id.length));
	sColorUpdate();
	updateAdj(adjView);
}

function stopProp() {
	$("#rColor").click(function (event) {
		event.stopPropagation();
	});
}

function sColorUpdate() {
	$(".sColor").removeClass("sColor");
	var cColor = document.getElementById("showColor" + currColor);
	$("#showColor" + currColor).addClass("sColor");
	cColor.innerHTML = '<div id="rColor"><i onClick="removeColor()" class="material-icons">delete</i></div>';
}