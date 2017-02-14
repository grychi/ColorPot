var upColors = setTimeout(getColors, 0);

var materialColors = ["#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#8bc34a",
    "#cddc39",
    "#ffeb3b",
    "#ffc107",
    "#ff9800",
    "#ff5722",
    "#795548",
    "#9e9e9e",
    "#607d8b"];

document.addEventListener("DOMContentLoaded", function () {
    loadFromCookies();
    totalResize();
    setUI(randomColor());
    window.clearTimeout(upColors);
});

function loadFromCookies() {
    return;
}

function totalResize(wait = false) {
    boxPickResize();
    boxPalResize();
    //TODO: Temporary fix here
    if (wait) {
        window.clearTimeout(upColors);
        upColors = setTimeout(totalResize, 801);
    }
}
//TODO: improve resize function
function boxPickResize() {
    var boxPick = document.getElementById("boxPicker");
    boxPick.style.height = "100%";
    var boxPickH = boxPick.clientHeight;

    var allPick = document.getElementById("pickers");
    var pickerW = allPick.clientWidth;

    if (boxPickH < pickerW) {
        boxPick.style.width = boxPickH + "px";
    }
    else {
        boxPick.style.width = pickerW + "px";
        boxPick.style.height = pickerW + "px";
    }
}
function boxPalResize() {
    var colWheel = document.getElementById("colorWheel");
    colWheel.style.height = "90%";
    var colWheelH = colWheel.clientHeight;
    var colCenter = document.getElementById("colorCenter");
    colCenter.style.height = "60%";
    var colCenterH = colCenter.clientHeight;

    var palWrap = document.getElementById("harBox");
    var palW = palWrap.clientWidth;

    if (colWheelH < palW) {
        colWheel.style.width = colWheelH + "px";
        colCenter.style.width = colCenter.clientHeight + "px";
    }
    else {
        colWheel.style.width = palW + "px";
        colWheel.style.height = palW + "px";
        colCenter.style.width = (palW * .6) + "px";
        colCenter.style.height = (palW * .6) + "px";
    }
}

function getColors(e) {
    if (e == null || e.keyCode == 13) { // || e.keyCode == 8 || e.keyCode == 46) {
        var userIn = document.getElementById("colorText");
        var userInV = userIn.value;
        var userInA = userInV.split("\n");
        userIn.value = "";
        document.getElementById("showing").innerHTML = "";
        for (var i = 0; i < userInA.length; i++) {
            if (userInA[i] != "" && w3color(userInA[i]).valid) {
                userInA[i] = w3color(userInA[i]).toHexString().toUpperCase();
                addColor(userInA[i]);
            }
            userIn.value += userInA[i] + "\n";
        }
        userIn.value = userIn.value.substring(0, userIn.value.length - 1);
    }
    else {
        window.clearTimeout(upColors);
        upColors = window.setTimeout(getColors, 1000);
    }
}

function addColor(someColor) {
    var newColor = document.createElement("div");
    newColor.className += "aColor";
    newColor.style.backgroundColor = someColor;
    newColor.onclick = colorClick;
    document.getElementById("showing").appendChild(newColor);
}

function randomColor() {
    return materialColors[Math.floor(Math.random() * materialColors.length)];
}

function setUI(theColor) {
    var colorObj = w3color(theColor);
    colorObj.darker();
    var theColorDark = colorObj.toHexString();
    var newStyle = "h1 {background-color:" + theColor +
        "; } h1:active {background-color:" + theColorDark +
        "; } #boxPicker {background-color:" + theColor + "; }";
    document.getElementById("jsAddStyle").innerHTML = newStyle;
    document.body.style.backgroundColor = theColorDark;
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        links[i].style.color = theColor;
    }
    document.getElementById("boxPicker").addEventListener('mousedown', boxMD, false);
}
function colorClick() {
    setUI(this.style.backgroundColor);
}

function boxMU() {
    window.removeEventListener('mousemove', moveCircle, true);
    window.removeEventListener("mouseup", boxMU, false);
}
function boxMD(e) {
    moveCircle(e);
    window.addEventListener('mousemove', moveCircle, true);
    window.addEventListener("mouseup", boxMU, false);
}
function moveCircle(e) {
    var x = e.clientX;
    var y = e.clientY;
    var el = document.getElementById("pickCircle");
    var box = document.getElementById("boxPicker");
    var boxBound = box.getBoundingClientRect();

    if (x < boxBound.left) {
        x = boxBound.left;
    }
    if (x > boxBound.right) {
        x = boxBound.right;
    }
    if (y > boxBound.bottom) {
        y = boxBound.bottom;
    }
    if (y < boxBound.top) {
        y = boxBound.top;
    }

    x -= boxBound.left + 12;
    y -= boxBound.top + 12;

    var newX = 100 * x / (box.clientWidth);
    var newY = 100 * y / (box.clientHeight);

    el.style.right = "default";
    el.style.left = newX + "%";
    el.style.top = newY + "%";
}