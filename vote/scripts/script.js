// State management variables
let id = 0;
let userEmail;
let account;
let initials;
let acc_access

let createdAccounts = []

$(document).ready(() => {
    // form validation stage
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
            userEmail = $(".login-page #email").val()
            let userName = $(".login-page #name").val()
            let initialising = $(".login-page #name").val().split("")
            let space = userName.split("")
            let first_initial = initialising.splice(0, 1); let second_initial;
            if(userName.split("").includes(" ")){
                second_initial = initialising.splice(space.indexOf(" "), 1)
                space.splice(space.indexOf(" "), 1, '-')
                accName = ("@" + space.join("")).toLowerCase()
            } else {
                accName = ("@" + userName).toLowerCase()
            }
            account = new AccountOwner(accName, userName)
            initials = (first_initial + second_initial).toUpperCase()
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
    // Home page switch and functionality
    $("#index-btn").click(() =>{
        $.get("./pages/home.html",
            function (data, textStatus, jqXHR) {
                $(".overall-container").html(data)
                homeManager()
                $("#home-base").click()
                $("#profile").click(() => {
                    if(!$(".home-header").hasClass("hidden")){
                        $(".home-header").addClass("hidden")
                    }
                })
            }
        );
    })
});

// home behavior script
function homeManager(){
    let homeIcon = $("#menu > i")
    // Light-box script
    $(".light-image").click(() => {
        $(".overlay > span").removeClass("hidden")
        $(".overlay").removeClass("overlay-shadow")
        $(".light-image").addClass("light-image-lg")
        $(".light-image-lg").removeClass(".light-image")
    })
    $(".overlay > span").click(() => {
        $(".overlay > span").toggleClass("hidden")
        $(".overlay").toggleClass("hidden")
        $(".overlay img").remove()
        $(".light-image-lg").addClass("light-image")
        $(".light-image").removeClass("light-image-lg")
    })
    
    // image click response
    setTimeout(() => {
        $("img").each((index, image) => {
            $(image).click(() => {
                let image_clone = $(image).clone()
                $(".light-image").append(image_clone)
                $(".overlay").addClass("overlay-shadow")
                $(".overlay").removeClass("hidden")
            })
        })
    }, 100)

    // Menu tab functionality
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
 
    // Various page switches i.e home, d-board, menu items, profile, notifications
    $(".foot-item").each((index, element) => {
        $(element).click(() =>{
            let id = $(element).attr("id");
            $(".foot-item").each((index, item) => {
                if($(item).hasClass("active-tab")){
                    $(item).removeClass("active-tab");
                }
                if (id != menu && $("#menu > i").hasClass("fa-close")) {
                    $("#menu").click()
                }
                // Header control for profile flash screen
                if(id != "profile"){
                    if($(".home-header").hasClass("hidden")){
                        $(".home-header").removeClass("hidden")
                    }
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
                    // header control for settings page
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
                    // Profile page set-up
                    account.profileManager()
                    $("#profile-editor").click(() => {
                        $("#menu").click()
                        $("#settings").click()
                        setTimeout(() =>{
                            $(".profile").click()
                        }, 20)
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
        this.accInfo()
    }
    accInfo(providedName){
        id++
        this.providedName = {
            accName: this.acc_name,
            userName: this.user_name,
            age: 0,
            nationality: "",
        }
        createdAccounts.push(this.providedName)
        acc_access = createdAccounts.indexOf(this.providedName)
    }
    postHandler(request){
        let images = {
            posted_images: [],
            profile_images: [],
            status_images: [],
            cover_images: []
        }
        switch (request) {
            case "post":
                if (images.posted_images.length > 0) {
                    this.providedName.postedImages = images.posted_images[images.posted_images.length-1]
                    return true
                } else {
                    return false
                }
                break;
            case "profile":
                if (images.profile_images.length > 0) {
                    this.providedName.profileImage = images.profile_images[images.profile_images.length-1]
                    return true
                } else {
                    return false
                }
                break;
            case "cover":
                if (images.cover_images.length > 0) {
                    this.providedName.coverImage = images.cover_images[images.cover_images.length-1]
                    return true
                } else {
                    return false
                }
                break
            default:
                if (images.status_images.length > 0) {
                    this.providedName.statusImages = images.status_images[images.status_images.length-1]
                    return true
                } else {
                    return false
                }
                break;
        }
    }
    profileManager(){
        $("#profile-name").html(createdAccounts[0].userName)
        $("#acc-name").html(createdAccounts[0].accName)
        if($("#profile").hasClass("active-tab")){
            let profileNameStyle = $("#profile-name").css("width").split("")
            profileNameStyle.splice(profileNameStyle.length-2, 2)
            $(".profile-main article div").css("width", `${eval(0.65 * profileNameStyle.join(""))}`)
        }
        if (account.postHandler("cover")) {
            console.log(createdAccounts)
        } else {
            $(".cover-image").css({"display":"flex","align-items":"center","font-style":"italic", "color":"red", "font-size":"medium", "justify-content":"space-evenly"})
            $(".cover-image").html("Upload Cover Photo!")
        }
        if (account.postHandler("profile")) {
            let profilePhoto = createdAccounts[acc_access].profileImage
            $(".profile-image").html(
                `<img srce=${profilePhoto} alt=${profilePhoto}>`
            )
        } else {
            $(".profile-image").css({"display":"flex","align-items":"center", "font-size":"xx-large", "justify-content":"space-evenly"})
            $(".settings-flash .profile-image").css({"border":"0.12rem solid blue", "box-shadow":"0 0 0.3rem"})
            $(".profile-screen .profile-image").html(initials)
            $(".settings-flash .profile-image").prepend(initials)
        }
            
    }
    acc_activityManagement(){

    }
}

// let n = new AccountOwner("@aine", "aine")

function error_alert(alert){
    $(alert).each((index, alert_msg) => {
        if (!$(alert_msg).hasClass("hidden")) {
            $(alert_msg).addClass("hidden")
        }
    })
}
