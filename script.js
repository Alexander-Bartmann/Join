const BASE_URL = "https://join-7cb80-default-rtdb.europe-west1.firebasedatabase.app/";

let UsersAmountViaId = 0;
let currentTime = new Date()

let currentDraggedId;

let toDoTaskCount = 0;
let awaitFeedbackTaskCount = 0;
let doneTaskCount = 0;
let inProgressTaskCount = 0;
let urgentAmount = 0;
let urgentAmountDeadlines = [];
let nextDeadline = "";

let mailIsUsed = false;

let isGuestAccount = false;

accountExists = false;

let newAssigned = "";
let newAssignedBgColor = "";
let newPrio = "";
let newCategory = "";
let newTaskData = {};

/**
 * Initializes the task creation process by clearing the input fields.
 * @function stopEventBubbling
 * 
 */
function stopEventBubbling(event) {
    event.stopPropagation()
}

async function openAccount(indexAcconts, userName) {
    sessionStorage.setItem('loggedInUserId', indexAcconts);
    sessionStorage.setItem('isGuestAccount', 'false');
    if (window.innerWidth < 1101) {
        document.body.innerHTML = `<div class="greetingPopUp"><div class="greeting" id="greeting"></div> <div class="userNamePopUp" id="userNamePopUp">${userName}</div>`;
        getGreeting(userName)
        await new Promise(r => setTimeout(r, 2000));


    }
    window.location.href = "startseite.html"; 1100
}

async function openGuestAccount() {
    isGuestAccount = true;
    sessionStorage.setItem('isGuestAccount', 'true');
    if (window.innerWidth < 1101) {
        document.body.innerHTML = `<div class="greetingPopUp">Du Hund, mach dir nen Account<div class="greeting" id="greeting"></div></div>`;
        getGreetingGuest()
        await new Promise(r => setTimeout(r, 2000));


    }
    window.location.href = "startseite.html";
}



async function updateToDoTaskCount() {
    let response = await fetch(BASE_URL + `Tasks/ToDo.json`);
    responseToJson = await response.json();
    let localTaskCount = 0;
    if (responseToJson != null) {
        for (let indexUserCount = 1; indexUserCount < responseToJson.length; indexUserCount++) {
            localTaskCount++;
        }
    }
    toDoTaskCount = localTaskCount;
}
async function updateAwaitFeedbackTaskCount() {
    let response = await fetch(BASE_URL + `Tasks/AwaitFeedback.json`);
    responseToJson = await response.json();
    let localTaskCount = 0;
    if (responseToJson != null) {
        for (let indexUserCount = 1; indexUserCount < responseToJson.length; indexUserCount++) {
            localTaskCount++;
        }
    }
    awaitFeedbackTaskCount = localTaskCount;
}
async function updateDoneTaskCount() {
    let response = await fetch(BASE_URL + `Tasks/Done.json`);
    responseToJson = await response.json();
    let localTaskCount = 0;
    if (responseToJson != null) {
        for (let indexUserCount = 1; indexUserCount < responseToJson.length; indexUserCount++) {
            localTaskCount++;
        }
    }
    doneTaskCount = localTaskCount;
}
async function updateInProgressTaskCount() {
    let response = await fetch(BASE_URL + `Tasks/InProgress.json`);
    responseToJson = await response.json();
    let localTaskCount = 0;
    if (responseToJson != null) {
        for (let indexUserCount = 1; indexUserCount < responseToJson.length; indexUserCount++) {
            localTaskCount++;
        }
    }
    inProgressTaskCount = localTaskCount;
}

async function checkForPage() {
    if (document.getElementById("main-content") != undefined) {
        loadPage('summary')
    } else {
        history.back()
    }
}


