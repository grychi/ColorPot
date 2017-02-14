var timer = setTimeout(clearFootText, 0);
$('document').ready(function () {
    $("#footAbout").hover(function () {
        $("#footText").html("About");
    });
    $("#footReleases").hover(function () {
        $("#footText").html("Releases");
    });
    $("#footTerms").hover(function () {
        $("#footText").html("Terms");
    });
    $("#footPrivacy").hover(function () {
        $("#footText").html("Privacy");
    });
    $(".footItem").hover(function() {
        clearTimeout(timer);
        timer = setTimeout(clearFootText, 1000);
    })
});
function clearFootText() {
    $("#footText").html("");
}