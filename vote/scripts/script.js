// State management variables
let id = 0;

let createdAccounts = []

$(document).ready(() => {
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
        objectName = this.acc_name
        objectName = {
            name: this.acc_name,
            age: 0,
            nationality: "Nigerian",
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

let acc2 = new AccountOwner("Di Octopus", "@octopus")
let acc1 = new AccountOwner("Aine", "@ainedeveloper")
console.log(createdAccounts)