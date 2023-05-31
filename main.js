var firebaseConfig = {
    apiKey: "AIzaSyBAkOdT34t8gFW2rWjOpQVyav_cL4ufFos",
    authDomain: "fir-project-4c9e6.firebaseapp.com",
    databaseURL: "https://fir-project-4c9e6-default-rtdb.firebaseio.com",
    projectId: "fir-project-4c9e6",
    storageBucket: "fir-project-4c9e6.appspot.com",
    messagingSenderId: "277563586211",
    appId: "1:277563586211:web:328bf7575505598dfd7116"
};

var powersOfTen = ["k", " million", " billion", " trillion", " quadrillion", " quintillion"];

function getSelfClicks(){
    if(localStorage.getItem("clicks") == null){
        localStorage.setItem("clicks", 0);
        return 0;
    } else {
        return localStorage.getItem("clicks");
    }
}

firebase.initializeApp(firebaseConfig);
globalClicks = 0;
selfClicks = getSelfClicks()


function addClick(a){
    newClicks = Number(globalClicks) + a;
    selfClicks = Number(selfClicks) + a;
    globalClicks = newClicks;
    firebase.database().ref("/button").update({
        clicks : newClicks
    });
}

function resetClicks(n){
    firebase.database().ref("/button").update({
        clicks : n
    });
    selfClicks = n;
    localStorage.setItem("clicks", n);
}

function getData(){
    firebase.database().ref("/button").on('value', function(snapshot){
        snapshot.forEach(function(childSnapshot){
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if(childKey == "clicks"){
                globalClicks = childData;
                update()
            }
        });
    });
}

getData()

function updateStyle(){
    document.getElementById("body").style.backgroundColor = document.getElementById("backcolor").value;
    document.getElementById("button").style.backgroundColor = document.getElementById("buttoncolor").value;
    document.getElementById("settings-open").style.backgroundColor = document.getElementById("buttoncolor").value;
    document.getElementById("body").style.color = document.getElementById("textcolor").value;
    document.getElementById("select").style.color = document.getElementById("textcolor").value;
}

function selectFont() {
    document.getElementById("items").classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn') && !event.target.matches('#myInput')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
            }
        }
    }
}

function filterFunction() {
    var input, filter, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    a = document.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

Number.prototype.toFixedwithoutRounding = function(p = 1){
    factor = Math.pow(10, p);
    return Math.floor(this * factor) / factor
}

function font(id){
    document.getElementById("body").style.fontFamily = id;
    document.getElementById("button").style.fontFamily = id;
    document.getElementById("full-disp").style.fontFamily = id;
    document.getElementById("self-disp").style.fontFamily = id;
    document.getElementById("per-disp").style.fontFamily = id;
    document.getElementById("font").innerText = "Font Family: " + id;
}

function reset(){
    document.getElementById("body").style.fontFamily = "monospace";
    document.getElementById("button").style.fontFamily = "monospace";
    document.getElementById("full-disp").style.fontFamily = "monospace";
    document.getElementById("self-disp").style.fontFamily = "monospace";
    document.getElementById("per-disp").style.fontFamily = "monospace";
    document.getElementById("font").innerText = "Font Family: monospace";
    document.getElementById("backcolor").value = "#dcdcdc"
    document.getElementById("buttoncolor").value = "#cdcdcd"
    document.getElementById("textcolor").value = "#000000"
    document.getElementById("round").checked = true;
    document.getElementById("include").checked = false;
    updateStyle()
    document.getElementById("select").style.backgroundColor = "#3498DB";
    document.getElementById("reset").style.backgroundColor = "#3ecb36";
}

function numtext(num, afterlength, countks){
    tl = Math.floor(num).toString().length;
    if (tl > 3){
        if (countks = "true" || tl > 7){
            fullSegments = Math.floor(tl / 3);
            if(tl % 3 == 0){
                firstSegment = 3;
                fullSegments = fullSegments - 1;
            } else {
                firstSegment = tl % 3;
            }
            addition = powersOfTen[fullSegments - 1];
            number = (num / (10 ** (tl - firstSegment))).toFixedwithoutRounding(afterlength);
            full = number + addition;
            return full
        } else {
            return Math.floor(num).toString()
        }   
    } else {
        return Math.floor(num).toString()
    }
}

function update(){
    clicksPer = ((selfClicks / globalClicks) * 100).toFixed(2);
    if(document.getElementById("round").checked == true){
        tclicks = numtext(globalClicks, 2, false);
        sclicks = numtext(selfClicks, 2, false);
    } else {
        tclicks = globalClicks;
        sclicks = selfClicks;
    }
    document.getElementById("full-disp").innerText = "This button has been clicked " + tclicks +  " times.";
    document.getElementById("self-disp").innerText = "You have clicked this button " + sclicks + " times.";
    document.getElementById("per-disp").innerText = clicksPer + "% of the global clicks where clicked by you.";
    localStorage.setItem("clicks", selfClicks);
}

function updateCheck(){
    update();
}