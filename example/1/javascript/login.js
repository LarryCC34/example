var saveUser = function (arr) {
    localStorage.user = JSON.stringify(arr);
}
var saveCurrentUser = function (arr) {
    localStorage.current_user = JSON.stringify(arr);
}
var loadUser = function () {
    var arr = JSON.parse(localStorage.user);
    return arr;
}
var loadCurrentUser = function () {
    var arr = JSON.parse(localStorage.current_user);
    return arr;
}


function register() {
    let user = [];
    let usernameStr = document.getElementById("username1").value;
    let passwordStr = document.getElementById("pwd1").value;
    if (localStorage.user != null) {
        user = loadUser();
    }
    if (usernameStr == "") {
        
        msg1.style.display = "block";
        msg1.innerText = "Username can't be empty!";
        return;
    }
    if (passwordStr == "") {
        
        msg1.style.display = "block";
        msg1.innerText = "Password can't be empty!";
        return;
    }
    for (let i = 0; i < user.length; i++) {
        if (user[i].username == usernameStr) {

            
            msg1.style.display = "block";
            msg1.innerText = "That username has been registered!";
            return;
        }
    }
    
    msg1.style.display = "block";
    msg1.style.color = "green";
    msg1.innerText = "Successfuly register!";
    let this_user = {
        username: usernameStr,
        password: passwordStr,
        comment: [

        ],
        question: {
            history: [

            ],
            basic_question: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            basic_question_ac: 0,
            program_question: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            program_question_ac: 0,
            achievement:{
                have_mistake:0,
                replay_num:0,
            }
        }
    };
    user.push(this_user);
    saveUser(user);
    setTimeout(function () {
        
        window.location.href = "./login.html?username=" + usernameStr + "&pws=" + passwordStr + "";
    }, 1000);
    return;
}

function login() {
    let user = [];
    let usernameStr = document.getElementById("username").value;
    let passwordStr = document.getElementById("pwd").value;
    if (localStorage.user != null) {
        user = loadUser();
    }
    
    if (usernameStr == "") {
        msg.style.display = "block";
        msg.innerText = "Username can't be empty!";
        return;
    }
    if (passwordStr == "") {
        msg.style.display = "block";
        msg.innerText = "Password can't be empty!";
        return;
    }
    for (let i = 0; i < user.length; i++) {
        if (usernameStr == user[i].username && passwordStr == user[i].password) {
           
            msg.style.display = "block";
            msg.style.color = "green";
            msg.innerText = "Login successfuly!";
            saveCurrentUser(usernameStr);
            setTimeout(function () {
                
                window.location.href = "../index.html";
            }, 1000);
            return;
        }
    }
    msg.style.display = "block";
    msg.innerText = "Username or password is wrong!"
    return;
}

function quit() {
    localStorage.removeItem("current_user");
    alert("Successfully quit!");
    location.reload();
    return;
}

function showUserName() {
    if (localStorage.current_user != null) {
        let current_user = loadCurrentUser();
        un.innerText = current_user;
        wel.style.display = "block";
    }
    else {
        wel.style.display = "none";
    }
}


function showGreeting() {
    if (localStorage.current_user != null) {
        let time = new Date().format("yyyy.MM.dd");
        let greet;
        let h = new Date().getHours();
        // console.log(h);
        if (h <= 4 || h == 23) {
            greet = "Have a good dream";
        }
        else if (h >= 5 && h <= 9) {
            greet = "Good morning";
        }
        else if (h == 12) {
            greet = "Good noon";
        }
        else if (h == 10 || h == 11 || (h >= 13 && h <= 17)) {
            greet = "Good good study, day day up";
        }
        else if (h >= 18 && h <= 20) {
            greet = "Good evening";
        }
        else if (h == 21 || h == 22) {
            greet = "Good night";
        }
        greeting.innerText = "Today is" + " " + time + ". " + greet + "";
        wel.style.display = "block";
    }
    else {
        wel.style.display = "none";
    }
}

Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                
        "d+": this.getDate(),                    
        "h+": this.getHours(),                   
        "m+": this.getMinutes(),                 
        "s+": this.getSeconds(),                
        "q+": Math.floor((this.getMonth() + 3) / 3), 
        "S": this.getMilliseconds()             
    };

    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }

    return fmt;
}