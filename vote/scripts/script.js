// State management variables
let id = 0;
let userName;
let userEmail;

let createdAccounts = []

$(document).ready(() => {
    $(".login-page form").submit((e) => {
        e.preventDefault()
        error_alert(".login-page fieldset > span")
        if ($(".login-page #name").val() == "") {
            $(".login-page #name").focus()
            $("#name-msg").toggleClass("hidden")
        } else if($(".login-page #email").val() == ""){
            $(".login-page #email").focus()
            $("#email-msg").toggleClass("hidden")
        } else if($(".login-page #password").val() == ""){
            $(".login-page #password").focus()
            $("#pass-msg").toggleClass("hidden")
        } else {
            error_alert(".login-page fieldset > span")
            userName = $(".login-page #name").val()
            userEmail = $(".login-page #email").val()
            let accName = "@" + userName
            new AccountOwner(accName, userName)
            $(".login-page input").each((index, field) => {
                $(field).val("")
            })
            $(".login-page").toggleClass("hidden")
            $(".index-screen > section").toggleClass("hidden")
            $(".index-screen > section > article").prepend(
                '<p><marquee behavior="alternate" direction="">Your Vote Your Voice</marquee></p>'
            );
            return true
        }
    })
    $("#index-btn").click(() =>{
        $.get("./pages/home.html",
            function (data, textStatus, jqXHR) {
                $(".overall-container").html(data)
                homeManager()
                $("#home-base").click()
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
            $(".foot-item").each((index, item) => {
                if($(item).hasClass("active-tab")){
                    $(item).removeClass("active-tab");
                }
            })
            $(element).addClass("active-tab");
            $.get(`../pages/${id}.html`,
                (data, responseState, xhr) => {
                    $(".home-main").html(data)
                    $(".love").each((index, reaction) =>{
                        $(reaction).click(() => {
                            $(reaction).toggleClass("clicked")
                        })
                    })
                    $(".profile").click(() => {
                        $(".settings-flash").toggleClass("hidden")
                        $(".home-header").toggleClass("hidden")
                        $(".home-footer").toggleClass("hidden")
                    })
                    $(".settings-flash .fa-chevron-left").click(() => {
                        $(".settings-flash").toggleClass("hidden")
                        $(".home-header").toggleClass("hidden")
                        $(".home-footer").toggleClass("hidden")
                    })
                }
            )
        })
    })
}

class AccountOwner{
    constructor(acc_name, user_name){
        this.id = id;
        this.acc_name = acc_name;
        this.user_name = user_name;
        this.accCreator()
    }
    accCreator(objectName){
        objectName = this.user_name
        objectName = {
            name: this.acc_name,
            age: 0,
            nationality: "",
        }
        createdAccounts.push(objectName)
    }
    postHandler(){
        let images = {
            posted_images: [],
            profile_images: [],
            status_images: []
        }
    }
    logingManager(){

    }
    profileManager(){

    }
    acc_activityManagement(){

    }
}

function error_alert(alert){
    $(alert).each((index, alert_msg) => {
        if (!$(alert_msg).hasClass("hidden")) {
            $(alert_msg).addClass("hidden")
        }
    })
}
