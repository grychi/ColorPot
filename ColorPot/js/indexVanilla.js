var upColors = setTimeout(getColors, 0);

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
});

function loadFromCookies() {
    return;
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