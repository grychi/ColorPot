$('document').ready(function () {
    $("#footAbout").hover(function () {
        $("#footText").html("About");
    },
        function () {
            clearFootText();
        });
    $("#footReleases").hover(function () {
        $("#footText").html("Releases");
    },
        function () {
            clearFootText();
        });
    $("#footTerms").hover(function () {
        $("#footText").html("Terms");
    },
        function () {
            clearFootText();
        });
    $("#footPrivacy").hover(function () {
        $("#footText").html("Privacy");
    },
        function () {
            clearFootText();
        });
});
function clearFootText() {
    $("#footText").html("");
}