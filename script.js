// Current Time

setInterval(() => {
    let d = new Date()
    let h = d.getHours()
    let m = d.getMinutes()
    let s = d.getSeconds()
    if (h < 10) {
        h = "0" + h
    }
    if (m < 10) {
        m = "0" + m
    }
    if (s < 10) {
        s = "0" + s
    }
    if (d.getHours() > 12) {
        h = h - 12
        time.innerHTML = h + ":" + m + ":" + s + " PM"
    } else {
        time.innerHTML = h + ":" + m + ":" + s + " AM"
    }
}, 1000)

// Hours for input

for (let i = 0; i <= 12; i++) {
    if (i < 10) {
        i = "0" + i
    }
    const child = document.createElement("option");
    const newChild = document.createTextNode(`${i}`)
    child.appendChild(newChild)
    const element = document.getElementById("hour");
    element.appendChild(child);
}

// Minutes for input

for (let i = 0; i < 60; i++) {
    if (i < 10) {
        i = "0" + i
    }
    const child = document.createElement("option");
    const newChild = document.createTextNode(`${i}`)
    child.appendChild(newChild)
    const element = document.getElementById("minute");
    element.appendChild(child);
}

//Seconds for input

for (let i = 0; i < 60; i++) {
    if (i < 10) {
        i = "0" + i
    }
    const child = document.createElement("option");
    const newChild = document.createTextNode(`${i}`)
    child.appendChild(newChild)
    const element = document.getElementById("second");
    element.appendChild(child);
}

// Display Alarm time with delete button

let newAlarm = () => {
    if (hour.value == "Hour" || minute.value == "Minute" || second.value == "Second" || AMPM.value == "AM/PM") {
        return
    }
    document.getElementById("setAlarm2").innerHTML="You set the Alarm for:"
    const child = document.createElement("li");
    const newChild = document.createTextNode(`${hour.value}:${minute.value}:${second.value} ${AMPM.value}`)
    child.appendChild(newChild)
    const element = document.getElementById("alarmTime");
    const delbtn = document.createElement("button");
    child.setAttribute("class", hour.value + minute.value + second.value + AMPM.value);
    delbtn.setAttribute("class", hour.value + minute.value + second.value + AMPM.value);
    delbtn.innerHTML = "Delete";
    element.appendChild(child).appendChild(delbtn);
    interval(`${hour.value}`, `${minute.value}`, `${second.value}`, `${AMPM.value}`)
}

// Set the Interval for Alarm based on user input and call the play function to play alarm bell

function interval(h, m, s, AP) {
    let d = new Date()
    let h1 = d.getHours()
    let m1 = d.getMinutes()
    let s1 = d.getSeconds()
    let timeout = 0;
    h = Number.parseInt(h);
    m = Number.parseInt(m)
    s = Number.parseInt(s)
    if (AP == "AM") {
        if (d.getHours() > 12) {
            h1 = h1 - 12
            timeout = ((12 - h1) + h) * 3600 + (m - m1) * 60 + (s - s1);
            checkDel(timeout)
        } else {
            h1 = 12 - h1
            timeout = ((12 + h1) + h) * 3600 + (m - m1) * 60 + (s - s1);
            if (timeout >= 24 * 3600) {
                timeout = timeout - 24 * 3600;
            }
            checkDel(timeout)
        }
    } else {
        if (d.getHours() > 12) {
            h1 = h1 - 12
            timeout = ((12 - h1) + 12 + h) * 3600 + (m - m1) * 60 + (s - s1);
            if (timeout >= 24 * 3600) {
                timeout = timeout - 24 * 3600;
            }
            checkDel(timeout)
        } else {
            h1 = 12 - h1
            timeout = (h1 + h) * 3600 + (m - m1) * 60 + (s - s1);
            checkDel(timeout)
        }
    }
    return
}

let isdelbtnpressed = false;
let ringtone = new Audio("https://www.fesliyanstudios.com/play-mp3/4391");
// Delete the alarm when Delete button gets clicked

alarmTime.onclick = function (e) {
    let element = document.getElementsByClassName(e.srcElement.className)
    element[0].remove();
    isdelbtnpressed = true;
    return;
}

// A function to check whether delete button is pressed or not

function checkDel(timeout){
    setTimeout(() => {
        if(isdelbtnpressed){
            
        }else{
            ring();
        }
    }, timeout * 1000)
}
// Play the Alarm when the actual time become equal to Alarm time

function ring() {
        ringtone.play();
        ringtone.loop = true;
}

// Stop the Alarm when Stop Alarm button is pressed

function stopRinging(){
    ringtone.pause();
}

// Create an alarm when Set Alarm button gets clicked

document.getElementById("setAlarm").addEventListener("click", newAlarm);
document.getElementById("removeAlarm").addEventListener("click", stopRinging);
