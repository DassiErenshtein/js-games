function loadHaman() {
    let b = document.createElement('button')
    let b1 = document.createElement('button')
    b.innerText = "עברית"
    b1.innerText = "אנגלית"
    b.addEventListener('click', hebrew)
    b1.addEventListener('click', hebrew)
    b.id = 'hebrew'
    b1.id = 'english'
    document.body.appendChild(b)
    document.body.appendChild(b1)
    // document.body.style.backgroundColor = sessionStorage.getItem('color')
}
let alef, taf;
function hebrew() {
    let s;
    if (event.currentTarget.id == 'hebrew') {
        s = ['בית לחם', 'אנציקלופדיה', 'שוקולד חלבי', 'ארצות הברית', 'מלך העולם', 'בוקר טוב עולם', 'ילד טוב ירושלים', 'כל הכבוד', 'כמה טוב שנפגשנו', 'מי יודע למה זה קרה', 'סוס עבודה', 'לחם וחלב', 'בית הלורדים']
        alef = 'א'.charCodeAt(0)
        taf = 'ת'.charCodeAt(0)
    }
    else {
        s = ['one time', 'lets see you', 'nice to meet you', 'another day', 'i can be great']
        alef = 'a'.charCodeAt(0)
        taf = 'z'.charCodeAt(0)
        document.getElementById('alphabet').style.direction = 'ltr'
        document.getElementById('gameH').style.direction = 'ltr'
    }
    event.currentTarget.remove()
    document.getElementsByTagName('button')[1].remove()
    let r = Math.floor(Math.random() * s.length)
    let word = s[r];
    let div1 = document.getElementById('gameH')
    div1.style.display = "flex";
    for (let i = 0; i < word.length; i++) {

        let p = document.createElement('p')
        p.innerText = word.charAt(i)
        p.style.color = "black"
        p.hidden = true;
        let p1 = document.createElement('p')
        p1.style.color = "black"
        p1.style.fontSize = "50px"
        if (word.charAt(i) != ' ') {
            p1.innerText = '_'
        }
        else
            p1.innerText = ' ';
        let d = document.createElement('div')
        d.className = "divHidden"
        d.appendChild(p);
        d.appendChild(p1);
        div1.appendChild(d);

    }
    let d = document.createElement('div')
    d.id = "gameHPhoto";
    d.style.display = "flex";
    d.style.flexWrap = "wrap;"
    document.body.appendChild(d)
    let divGame = document.getElementById('gameHPhoto')
    for (let i = 0; i < 9; i++) {
        d1 = document.createElement('div')
        d1.style.backgroundColor = "black";
        // sessionStorage.getItem('color')
        d1.style.border = "black,solid,2px;"
        d1.style.height = "135px";
        d1.style.width = "33.333333333333333333333333333333333333%";
        d1.className = "failure";
        divGame.appendChild(d1);
    }
    let alphabet = document.getElementById('alphabet')
    for (let i = alef; i <= taf; i++) {
        let div = document.createElement('button');
        div.id = 'a' + i;
        div.innerText = String.fromCharCode(i);
        div.addEventListener('click',checkWord)
        div.style.backgroundColor = "gray";
        //div.style.width = "11%";
        div.className ="alphabet";
        alphabet.appendChild(div);
    }
    return true;
}
let index = 0;
function checkWordInSentece(a) {
    a=String.fromCharCode(a);
    let div = document.getElementById('gameH').getElementsByTagName('div')
    let b = false;
    for (let i = 0; i < div.length; i++)
        if (div[i].getElementsByTagName('p')[0].innerText == a) {
            b = true;
            div[i].getElementsByTagName('p')[0].hidden = false;
            div[i].getElementsByTagName('p')[1].hidden = true;
        }
    let d = document.getElementsByClassName('failure');
    if (index >= d.length && b == false) {

        alert("מספר הניחושים שלך גבוה מדי, נסה שנית, אולי הפעם תצליח...!!!");
        window.location.reload();
    }
    if (b == false) {

        d[index++].hidden = true;
    }
}
function finishEveryThing(){
    let div = document.getElementById('gameH').getElementsByTagName('div');
    for(let i=0;i<div.length;i++)
    {
        if(div[i].getElementsByTagName('p')[0].hidden==true && div[i].getElementsByTagName('p')[0].innerText!=' ')
            return false;
    }
    return true;
}
function checkWord() {
    let keyCode = event.keyCode;
    if (keyCode != undefined) {
        a = String.fromCharCode(keyCode);
        a=a.charCodeAt(0)
        if (a < alef || a > taf) {
            if (a < alef || a > taf) {
                alert("האות אינה בשפה הנכונה, אנא שנה את שפת המקלדת!")
                return;
            }
        }
    }
    //String.fromCharCode()
    else {
        a = event.currentTarget.id.substring(1);
        a = String.fromCharCode(a);
        a=a.charCodeAt(0)
    }
    if(document.getElementById('a' + a).disabled!=true)
        document.getElementById('a' + a).disabled = true;
    else
    return;
    checkWordInSentece(a);
    if(finishEveryThing()==true)
        {
            setTimeout(() => {
                alert("you win!!!");
                window.location.reload();
            }, 500);
        }
}