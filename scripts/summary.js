
async function initSummary() {
    await updateAllTaskCounts();
    displayCounts();
    getGreeting();
    getAndDisplayName();
}


async function updateAllTaskCounts() {
    await updateToDoTaskCount()
    await updateAwaitFeedbackTaskCount()
    await updateDoneTaskCount()
    await updateInProgressTaskCount()
    await getUrgentAmount()
}

function displayCounts() {
    renderToDo()
    renderDone()
    renderUrgent()
    renderAllTasks()
    renderInProgress()
    renderAwaitFeedback()
    renderClosestDate()
}

async function getUrgentAmount() {
    urgentAmount = 0;
    await checkToDo()
    await checkAwait()
    await checkInProgress()
}

function getAndDisplayName() {
    document.getElementById("userNameSummary").innerHTML = `${currentUserName}`
}

function getGreeting() {
    const now = new Date();
    const hour = now.getHours();
    const greetingElement = document.getElementById('greeting');
    let comma = "";
    // Überprüfen, ob das Element existiert
    if (currentUserName != "") {
        comma = ","
    }
    if (greetingElement) {
        if (hour >= 6 && hour < 12) {
            greetingElement.innerHTML = `Good morning${comma}`;
        } else if (hour >= 12 && hour < 18) {
            greetingElement.innerHTML = `Good afternoon${comma}`;
        } else if (hour >= 12 && hour < 18) {
            greetingElement.innerHTML = `Good evening${comma}`;
        } else {
            greetingElement.innerHTML = `Good night${comma}`;
        }
    }

}

async function checkToDo() {
    let response = await fetch(BASE_URL + `Tasks/ToDo.json`);
    let responseToJson = await response.json();
    if (responseToJson != null) {
        let urgentAmountDeadlines = [];

        for (let indexIterate1Task = 1; indexIterate1Task < responseToJson.length; indexIterate1Task++) {
            if (responseToJson.indexIterate1Task != null) {
                if (responseToJson[indexIterate1Task].priority == "high") {
                    urgentAmount++
                    urgentAmountDeadlines.push(responseToJson[indexIterate1Task].date);
                }    
            }
        }
        urgentAmountDeadlines.sort((a, b) => {
            return new Date(a) - new Date(b);
        });

        if (urgentAmountDeadlines.length > 0) {
            nextDeadline = urgentAmountDeadlines[0];
        }
    }
}

async function checkAwait() {
    let response = await fetch(BASE_URL + `Tasks/AwaitFeedback.json`);
    let responseToJson = await response.json();
    if (responseToJson != null) {
        let urgentAmountDeadlines = [];

        for (let indexIterate1Task = 1; indexIterate1Task < responseToJson.length; indexIterate1Task++) {
            if (responseToJson[indexIterate1Task].priority == "high") {
                urgentAmount++
                urgentAmountDeadlines.push(responseToJson[indexIterate1Task].date);
            }
        }
        urgentAmountDeadlines.sort((a, b) => {
            return new Date(a) - new Date(b);
        });
    }
}

async function checkInProgress() {
    let response = await fetch(BASE_URL + `Tasks/InProgress.json`);
    responseToJson = await response.json();
    if (responseToJson != null) {
        for (let indexIterate1Task = 1; indexIterate1Task < responseToJson.length; indexIterate1Task++) {
            if (responseToJson[indexIterate1Task].priority == "high") {
                urgentAmount++
                urgentAmountDeadlines.push(responseToJson[indexIterate1Task].date)

            }
        }
        urgentAmountDeadlines.sort((a, b) => {
            return new Date(a) - new Date(b);
        });
    }
}