$(document).ready(() => {
    $("#index-btn").click(() =>{
        $.get("./pages/home.html",
            function (data, textStatus, jqXHR) {
                $(".overall-container").html(data)
            },
        );
    })
});
