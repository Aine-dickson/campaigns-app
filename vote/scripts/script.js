$(document).ready(() => {
    $("#index-btn").click(() =>{
        $.get("./pages/home.html",
            function (data, textStatus, jqXHR) {
                $(".overall-container").html(data)
                homeManager()
            }
        );
    })
});

function homeManager(){
    let homeIcon = $("#menu > i")
    $("#menu").click(() => {
        $(homeIcon).toggleClass("fa-close", "fa-bars");
        $(".basic-nav").toggleClass("hidden", "flex")
    })
    $(".basic-nav > span").each((index, icon) => {
        $(icon).click(() => {
            $(homeIcon).toggleClass("fa-close", "fa-bars");
            $(".basic-nav").toggleClass("hidden", "flex")
        })
    })
    $(".foot-item").each((index, element) => {
        $(element).click(() =>{
            let id = $(element).attr("id");
            $.get(`../pages/${id}.html`,
                (data, responseState, xhr) => {
                    $(".home-main").html(data)
                }
            )
        })
    })
}