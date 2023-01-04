const daysTag = document.querySelector(".days"),
    currentDate = document.querySelector(".current-date"),
    prevNextIcon = document.querySelectorAll(".icons span");
var bottle = 0
var hurt = 0
var book = 0
var gym = 0
// getting new date, current year and month
let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();

// storing full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];
var bottleDaysJanuary = [];
var bottleDaysFebuarly = [];

var gymDays = [];
for (var i = 0; i < 12; i++) {
    gymDays[i] = [];
}

var bottleDays = [];
for (var i = 0; i < 12; i++) {
    bottleDays[i] = [];
}

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
        lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1} </li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
            && currYear === new Date().getFullYear() ? "active" : "";
        let individualDay = "day" + parseInt(i)
        var datTag = ""
        if (gymDays[currMonth].includes(individualDay)) {
            datTag = datTag + "\&#xf44b"
        }
        if (bottleDays[currMonth].includes(individualDay)) {
            datTag = datTag + "\&#xf72f"
        }

        if (datTag == "") {
            liTag += `<li>\_<button type="button" id = ${individualDay} class = "dayButton" onClick="date_was_cliked(this.id)">${i} </button></li>`;
        } else {
            liTag += `<li>\_<button type="button" id = ${individualDay} class = "dayButton" onClick="date_was_cliked(this.id)">${datTag} </button></li>`;
        }

    }


    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;


}
renderCalendar();

prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if (currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar(); // calling renderCalendar function
    });
});
var choosenDay = ""
var bottleFlag = false;
var hurtFlag = false;
var bookFlag = false;
var gymFlag = false;

function date_was_cliked(clicked_id) {
    let formElements = document.querySelector(".popUp");
    formElements.style.display = "block";
    choosenDay = clicked_id;
    bottleFlag = true;
    hurtFlag = true;
    bookFlag = true;
    gymFlag = true;
}

function i_did_choice() {
    let formElements = document.querySelector(".popUp");
    formElements.style.display = "none";
    var archive = document.getElementsByClassName("archive");
    var i;
    for (i = 0; i < archive.length; i++) {
        archive[i].style.color = "black";
    }
    flag = true
}
var flag = true;
function archive_was_choosen(clicked_id) {
    var elemchoosenDay = document.getElementById(choosenDay)
    // elemchoosenDay.innerHTML = "\&#xf44b" + "\&#xf02d"//choosenPositions;
    // let elem = document.getElementById(clicked_id)
    //elem.style.color = "red";
    if (flag) {
        elemchoosenDay.innerHTML = ""
        flag = false
    }
    var choosenPositions = elemchoosenDay.innerHTML
    switch (clicked_id) {
        case "bottlePopUp":
            if (bottleFlag) {
                bottleFlag = false
                choosenPositions = choosenPositions + "\&#xf72f"
                bottle = bottle + 1
                document.getElementById("bottleResult").innerHTML = bottle;
                document.getElementById("bottlePopUp").style.color = "red";

                for (var j = 0; j < 12; j++) {
                    if (currMonth == j) {
                        bottleDays[j].push(choosenDay)
                    }
                }
                // document.getElementById("helper").innerHTML = bottleDaysJanuary
            }
            break;
        case "heartPopUp":
            if (hurtFlag) {
                hurtFlag = false
                choosenPositions = choosenPositions + "\&#xf08a"
                hurt = hurt + 1
                document.getElementById("HurtResult").innerHTML = hurt;
                document.getElementById("heartPopUp").style.color = "red";

            }
            break;
        case "bookPopUp":
            if (bookFlag) {
                bookFlag = false
                choosenPositions = choosenPositions + "\&#xf02d"
                book = book + 1
                document.getElementById("bookResult").innerHTML = book;
                document.getElementById("bookPopUp").style.color = "red";

            }
            break;
        default:
            if (gymFlag) {
                gymFlag = false
                gym = gym + 1
                document.getElementById("gymResult").innerHTML = gym;
                document.getElementById("gymPopUp").style.color = "red";
                choosenPositions = choosenPositions + "\&#xf44b"
                for (var j = 0; j < 12; j++) {
                    if (currMonth == j) {
                        gymDays[j].push(choosenDay)
                    }
                }
            }

    }
    if (!bottleFlag && !hurtFlag && !bookFlag && !gymFlag) {
        elemchoosenDay.innerHTML = "\&#xf006";

    } else {
        // let elemchoosenDay = document.getElementById(choosenDay)
        elemchoosenDay.innerHTML = choosenPositions;
    }
}


