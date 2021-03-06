var upColors = setTimeout(getColors, 0);
var allColors = []; //Colors Array
var currColor = 0; //Current color array index
var userInA; //User Input Array

var materialColors = [
    "#f44336",
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
    setUI(randomColor());
    window.clearTimeout(upColors);
    document.getElementById("boxPicker").addEventListener('mousedown', boxMD, false);
    document.getElementById("boxPickerBar").addEventListener('mousedown', barMD, false);
    document.getElementById("colorWheel").addEventListener('mousedown', harMD, false);
});

function loadFromCookies() {
    return;
}

function getColors(e) {
    window.clearTimeout(upColors);
    if (e == null || e.keyCode == 13) { // || e.keyCode == 8 || e.keyCode == 46) {
        var userIn = document.getElementById("colorText");
        var userInV = userIn.value;
        lastEdit = nextEdit;
        nextEdit = userInV;
        userInA = userInV.split("\n");
        allColors = [];
        userIn.value = "";
        document.getElementById("showing").innerHTML = "";
        for (var i = 0; i < userInA.length; i++) {
            if (userInA[i] != "" && w3color(userInA[i]).valid) {
                var colorTemp = w3color(userInA[i]);
                allColors.push(colorTemp);
                userInA[i] = colorTemp.toHexString().toUpperCase();
                addColor(userInA[i], i);
            }
            else {
                allColors.push(null);
            }
            userIn.value += userInA[i] + "\n";
        }
        userIn.value = userIn.value.substring(0, userIn.value.length - 1);
        sColorUpdate();
        undoable = false;
        updateUndo();
    }
    else {
        upColors = window.setTimeout(getColors, 1000);
    }
}
function setColors(a) {
    var userIn = document.getElementById("colorText");
    userIn.value = a;
    getColors();
}

function addColor(someColor, colorID) {
    var newColor = document.createElement("div");
    newColor.id = "showColor" + colorID;
    if (colorView) {
        newColor.className += "bColor";
    }
    else {
        newColor.className += "aColor";
    }
    newColor.style.backgroundColor = someColor;
    newColor.onclick = colorClick;
    document.getElementById("showing").appendChild(newColor);
}

function removeColor(colorID = currColor) {
    stopPropDel();
    if (colorID < userInA.length) {
        userInA.splice(colorID, 1);
        var userIn = document.getElementById("colorText");
        userIn.value = "";
        for (var i = 0; i < userInA.length; i++) {
            userIn.value += userInA[i] + "\n";
        }
        getColors();
        sColorUpdate();
        setUI(allColors[currColor].toHexString());
    }
    updateAdj(adjView);
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

    if (x < boxBound.left) { x = boxBound.left; }
    if (x > boxBound.right) { x = boxBound.right; }
    if (y > boxBound.bottom) { y = boxBound.bottom; }
    if (y < boxBound.top) { y = boxBound.top; }

    x -= boxBound.left + 12;
    y -= boxBound.top + 12;

    var newX = 100 * x / (box.clientWidth);
    var newY = 100 * y / (box.clientHeight);

    el.style.right = "default";
    el.style.left = newX + "%";
    el.style.top = newY + "%";
}
function barMD(e) {
    moveBar(e);
    window.addEventListener('mousemove', moveBar, true);
    window.addEventListener("mouseup", barMU, false);
}
function barMU() {
    window.removeEventListener('mousemove', moveBar, true);
    window.removeEventListener("mouseup", barMU, false);
}
function moveBar(e) {
    var x = e.clientX;
    var y = e.clientY;
    var el = document.getElementById("pickBar");
    var box = document.getElementById("boxPickerBar");
    var boxBound = box.getBoundingClientRect();

    if (y > boxBound.bottom) { y = boxBound.bottom; }
    if (y < boxBound.top) { y = boxBound.top; }

    y -= boxBound.top + 6;
    var newY = 100 * y / (box.clientHeight);

    el.style.top = newY + "%";
}

function harMD(e) {
    moveHar(e);
    window.addEventListener('mousemove', moveHar, true);
    window.addEventListener("mouseup", harMU, false);
}
function harMU() {
    window.removeEventListener('mousemove', moveHar, true);
    window.removeEventListener("mouseup", harMU, false);
}
function moveHar(e) {
    var x = e.clientX;
    var y = e.clientY;
    var el = document.getElementById("mainHarPick");
    var box = document.getElementById("colorWheel");
    var bW = box.clientWidth / 2;
    var bH = box.clientHeight / 2;
    var boxBound = box.getBoundingClientRect();
    var angle = (Math.atan((boxBound.bottom - bW - y) / (boxBound.right - bH - x))) * 180 / (Math.PI);
    if (x > boxBound.right - bW) {
        angle += 180;
    }
    el.style.transform = "translate(0, -50%) rotate(" + angle + "deg)";
}

function updateAdj(expanded = false) {
    var tint = document.getElementById("adjTint");
    var shade = document.getElementById("adjShade");
    var sat = document.getElementById("adjSat");
    var tone = document.getElementById("adjTone");
    tint.innerHTML = "";
    shade.innerHTML = "";
    sat.innerHTML = "";
    tone.innerHTML = "";
    var cTint = w3color(allColors[currColor].toHexString());
    var cShade = w3color(allColors[currColor].toHexString());
    var cSat = w3color(allColors[currColor].toHexString());
    var cTone = w3color(allColors[currColor].toHexString());
    var adjClass = "adjC";
    if (!expanded) {
        cTint.toLight(.5);
        cShade.toLight(.5);
        cSat.toSat(.5);
        cTone.toSat(.5);
        for (var i = 0; i < 5; i++) {
            cTint.lighter();
            var newAdjTint = document.createElement('div');
            newAdjTint.className += adjClass;
            newAdjTint.style.backgroundColor = cTint.toHexString();
            tint.appendChild(newAdjTint);

            cShade.darker();
            var newAdjShade = document.createElement('div');
            newAdjShade.className += adjClass;
            newAdjShade.style.backgroundColor = cShade.toHexString();
            shade.appendChild(newAdjShade);

            cSat.upSat();
            var newAdjSat = document.createElement('div');
            newAdjSat.className += adjClass;
            newAdjSat.style.backgroundColor = cSat.toHexString();
            sat.appendChild(newAdjSat);

            cTone.downSat();
            var newAdjTone = document.createElement('div');
            newAdjTone.className += adjClass;
            newAdjTone.style.backgroundColor = cTone.toHexString();
            tone.appendChild(newAdjTone);
        }
    }
    else {
        //Add animation, fix null
        do {
            var newAdjTint = document.createElement('div');
            newAdjTint.className += adjClass;
            newAdjTint.style.backgroundColor = cTint.toHexString();
            tint.appendChild(newAdjTint);
            cTint.lighter();
        }
        while (cTint.lightness < 1);
        do {
            var newAdjShade = document.createElement('div');
            newAdjShade.className += adjClass;
            newAdjShade.style.backgroundColor = cShade.toHexString();
            shade.appendChild(newAdjShade);
            cShade.darker();
        }
        while (cShade.lightness > 0);
        do {
            var newAdjSat = document.createElement('div');
            newAdjSat.className += adjClass;
            newAdjSat.style.backgroundColor = cSat.toHexString();
            sat.appendChild(newAdjSat);
            cSat.upSat();
        }
        while (cSat.sat < 1);
        do {
            var newAdjTone = document.createElement('div');
            newAdjTone.className += adjClass;
            newAdjTone.style.backgroundColor = cTone.toHexString();
            tone.appendChild(newAdjTone);
            cTone.downSat();
        }
        while (cTone.sat > 0);
    }
}

function showFeedb() {
    document.getElementById("feedback").style.display = "block";
}
function closeFeedb() {
    document.getElementById("feedback").style.display = "none";
}

function getFormData() {
    var elements = document.getElementById("fbForm").elements;
    var fields = Object.keys(elements).map(function (k) {
        if (elements[k].name !== undefined) {
            return elements[k].name;
        }
    }).filter(function (item, pos, self) {
        return self.indexOf(item) == pos && item;
    });
    var data = {};
    fields.forEach(function (k) {
        data[k] = elements[k].value;
    });
    console.log(data);
    return data;
}
function handleFormSubmit(event) {
    event.preventDefault();
    var data = getFormData();
    var url = event.target.action;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        document.getElementById('fbForm').style.display = 'none';
        document.getElementById('fbSent').style.display = 'block';
        return;
    };
    var encoded = Object.keys(data).map(function (k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    }).join('&')
    xhr.send(encoded);
}
function loaded() {
    var form = document.getElementById('fbForm');
    form.addEventListener("submit", handleFormSubmit, false);
};
document.addEventListener('DOMContentLoaded', loaded, false);