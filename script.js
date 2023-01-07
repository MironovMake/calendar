const daysTag = document.querySelector(".days"),
    currentDate = document.querySelector(".current-date"),
    prevNextIcon = document.querySelectorAll(".icons span");
let popUpIcons = document.querySelector(".popUp");
let reportIcons = document.querySelector(".report");
let monthReportIcons = document.querySelector(".monthReport");
// getting new date, current year and month
let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();

// storing full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

class TrakedStuff {
    days = [];
    tag
    result
    name
    counter = 0;
    monthCounter = 0;
    flag = false
    constructor(name, tag) {
        this.tag = tag;
        this.name = name;
        this.popUp = name + "PopUp";
        this.result = name + "Result"
        for (var i = 0; i < 12; i++) {
            this.days[i] = [];
        }
        var locStore
        if (localStorage.getItem(this.result) === null) {
            locStore = [];
        } else {
            locStore = JSON.parse(localStorage.getItem(this.result))
            this.counter = locStore.length
            locStore.forEach(oneElem => {
                this.days[oneElem[0]].push(oneElem[1]);
            })
        }
    }
    increaseCounter(day) {
        for (var j = 0; j < 12; j++) {
            if (currMonth == j) {
                if (!this.days[j].includes(day)) {
                    this.days[j].push(day)
                    this.counter = this.counter + 1
                    document.getElementById(this.popUp).style.color = "red";
                    var locStore
                    if (localStorage.getItem(this.result) === null) {
                        locStore = [];
                    } else {
                        locStore = JSON.parse(localStorage.getItem(this.result))
                    }
                    locStore.push([currMonth, day]);
                    localStorage.setItem(this.result, JSON.stringify(locStore));
                } else {
                    var locStore
                    locStore = JSON.parse(localStorage.getItem(this.result))
                    var i = 0
                    var localFlag = true
                    locStore.forEach(oneElem => {
                        if (oneElem != [currMonth, day] && localFlag) {
                            i = i + 1;
                            localFlag = false;
                        }
                    })
                    i = i - 1
                    if (i <= locStore.length) {
                        var newLocStore = [];
                        locStore.forEach(oneElem => {
                            if (oneElem[0] != currMonth || oneElem[1] != day) {
                                //  newLocStore.push(oneElem)
                                newLocStore.push(oneElem)
                            }
                        })
                        document.getElementById(this.popUp).style.color = "black";
                        this.counter = this.counter - 1
                        localStorage.setItem(this.result, JSON.stringify(newLocStore));
                        newLocStore.forEach(oneElem => {
                            this.days[oneElem[0]].push(oneElem[1]);
                        })
                        liTag += `<li> \&#xf02d<button type="button" id = ${day} class = "dayButton" onClick="date_was_cliked(this.id)"> \&#xf02d </button></li>`;
                    }
                }
            }
        }
    }
    calculateMonthCounter() {
        return this.days[currMonth].length
    }
}
/** Declare tracked variables */
let newNames = ["ambulance", "dumbbell", "wine-bottle"]
let newTags = ["\&#xf0f9", "\&#xf44b", "\&#xf72f"]
var ine = 0;
var allTracked = [];
newNames.forEach(oneElem => {
    allTracked.push(new TrakedStuff(oneElem, newTags[ine]))
    ine = ine + 1
})


function renderPopUp(elements) {
    var i = 0
    var allmenu = ``
    elements.forEach(oneElem => {
        allmenu = allmenu + `<i class="fas fa-${oneElem.name} archive" 
        style="font-size: 24px" 
        id = "${oneElem.popUp}" 
        onClick = "archive_was_choosen(this.id)">
        </i>
        <br> `
    });
    lastElem = `<i
        class="fa-sharp fa-solid fa-square-check"
        onClick="i_did_choice()"
        style="font-size: 36px"
      ></i>`
    allmenu = allmenu + lastElem
    popUpIcons.innerHTML = allmenu
}
renderPopUp(allTracked)

function renderResult(elements) {
    var allmenu = ``
    elements.forEach(oneElem => {
        allmenu = allmenu + `total &nbsp
        <i
          class="fas fa-${oneElem.name} archive"
          id="${oneElem.name}"
          style="font-size: 24px"
          onClick="archive_was_choosen(this.id)"
        ></i>
${oneElem.counter}
        <br />`
    });
    reportIcons.innerHTML = allmenu
}
renderResult(allTracked)

function renderMonthResult(elements) {
    var allmenu = ``
    elements.forEach(oneElem => {
        allmenu = allmenu + `this month &nbsp
        <i
          class="fas fa-${oneElem.name} archive"
          style="font-size: 24px"
        ></i>
        ${oneElem.calculateMonthCounter()}
        <br />`
    });
    monthReportIcons.innerHTML = allmenu
}
renderMonthResult(allTracked)

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay() + 6, // getting first day of month
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
        lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";
    let currentDay = new Date().getDay(); // getting first day of month

    if (firstDayofMonth > 6) {
        firstDayofMonth = firstDayofMonth - 7
    }

    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1} </li>`;
    }
    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
            && currYear === new Date().getFullYear() ? "active" : "";
        let individualDay = "day" + parseInt(i)
        var datTag = ""
        allTracked.forEach(element => {
            if (element.days[currMonth].includes(individualDay)) {
                datTag = datTag + element.tag
            }
        });
        var todayClass = ""
        if (currentDay + 1 == i && currMonth === new Date().getMonth()) {
            todayClass = " currentDay"
        }
        if (datTag == "") {
            liTag += `<li>&nbsp<button type="button" id = ${individualDay}  class = "dayButton${todayClass}" onClick="date_was_cliked(this.id)">${i} </button></li>`;
        } else {
            liTag += `<li>&nbsp<button type="button" id = ${individualDay} class = "dayButton${todayClass}" onClick="date_was_cliked(this.id)">${datTag} </button></li>`;
        }
    }
    if (lastDayofMonth != 0) {
        for (let i = lastDayofMonth; i < 7; i++) { // creating li of next month first days
            liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
        }
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;
}
renderCalendar();

prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
        generateNexPreviousMonth(currMonth)
    });
});
var choosenDay = ""
function date_was_cliked(clicked_id) {
    let formElements = document.querySelector(".popUp");


    let element = document.getElementById(clicked_id).getBoundingClientRect();
    let elementwrapper = document.querySelector(".wrapper").getBoundingClientRect();
    // if (element.right + 10 < elementwrapper.right)
    Object.assign(formElements.style, {
        left: `${element.right + 10}px`,
        top: `${(element.top + element.bottom) / 2 - 22}px`,
    });


    formElements.style.display = "block";

    if (formElements.getBoundingClientRect().right > elementwrapper.right) {
        Object.assign(formElements.style, {
            left: `${element.right - 130}px`,
        });

    }

    choosenDay = clicked_id;
    allTracked.forEach(element => element.flag = true);
    allTracked.forEach(element => {
        if (element.days[currMonth].includes(choosenDay)) {
            document.getElementById(element.popUp).style.color = "red";
        }
    });

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
    if (flag) {
        elemchoosenDay.innerHTML = ""
        flag = false
    }
    var choosenPositions = elemchoosenDay.innerHTML

    allTracked.forEach(oneElem => {
        if (oneElem.flag && clicked_id == oneElem.popUp) {
            oneElem.flag = false
            choosenPositions = choosenPositions + oneElem.tag
            oneElem.increaseCounter(choosenDay)
            renderResult(allTracked)
            renderMonthResult(allTracked)

        }
    });

    var allFlags = allTracked.every(oneElem => {
        return !oneElem.flag
    })
    if (allFlags) {
        elemchoosenDay.innerHTML = "\&#xf006";
    } else {
        elemchoosenDay.innerHTML = choosenPositions;
    }
}

var starX, moveX, moveYfunction
function touchStrat(evt) {
    starX = evt.touches[0].clientX;
}
function touchMove(evt) {
    moveX = evt.touches[0].clientX;
}
function generateNexPreviousMonth(month) {
    if (currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
        // creating a new date of current year & month and pass it as date value
        date = new Date(currYear, currMonth);
        currYear = date.getFullYear(); // updating current year with new date year
        currMonth = date.getMonth(); // updating current month with new date month
    } else {
        date = new Date(); // pass the current date as date value
    }
    renderCalendar(); // calling renderCalendar function
    renderMonthResult(allTracked)
}
function touchEnd() {
    if (starX + 100 < moveX) {
        currMonth = currMonth + 1;
        generateNexPreviousMonth(currMonth)
    } else if (starX - 100 > moveX) { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = currMonth - 1;
        generateNexPreviousMonth(currMonth)
    }
}