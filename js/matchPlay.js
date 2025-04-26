let subject1 = {
    name: "הפכים",
    age: 6
}
let subject2 = {
    name: "לימוד אנגלית",
    age: 10
}
let subject3 = {
    name: "יחיד ורבים",
    age: 4
}
let subject = [subject1, subject2, subject3]
function card(firstValue, lastValue, subject) {
    this.firstValue = firstValue,
        this.lastValue = lastValue,
        this.subject = subject,
        this.FisInPlay = false
    this.LisInPlay = false
}
let c1 = ['עבה', 'דק', 'עמוק', 'רדוד', 'עצוב', 'שמח', 'קטן', 'גדול', 'לבן', 'שחור', 'טמא', 'טהור', 'נכשל', 'מנצח', 'מתוק', 'מר', 'עכור', 'צלול']
let c2 = ['black', 'שחור', 'big', 'גדול', 'bag', 'תיק', 'chocolate', 'שוקולד', 'strange', 'מוזר', 'local', 'מקומי', 'great', 'מצוין', 'red', 'אדום', 'worry', 'דואג']
let c3 = ['עט', 'עטים', 'דף', 'דפים', 'קלמר', 'קלמרים', 'פלאפון', 'פלאפונים', 'מלפפון', 'מלפפונים', 'סגור', 'סגורים', 'חמור', 'חמורים', 'ילד', 'ילדים', 'משחק', 'משחקים']
let all1 = [], all2 = [], all3 = [];
for (let i = 0; i < c1.length; i += 2) {
    let p1 = new card(c1[i], c1[i + 1], subject1.name)
    all1.push(p1, p1)
    let p2 = new card(c2[i], c2[i + 1], subject2.name)
    all2.push(p2, p2)
    let p3 = new card(c3[i], c3[i + 1], subject3.name)
    all3.push(p3, p3)
}
let all = [all1, all2, all3];
let label = document.createElement('label')
label.innerText = "נא הכנס את גילך"
label.className = "iAge"
document.body.appendChild(label)
let input = document.createElement('input')
input.addEventListener('blur', createGame)
input.className = "iAge"
document.body.appendChild(input)
function createGame() {
    // let asci=0;
    // for(let i=0;i<event.currentTarget.value.length;i++)
    // {
    //     asci+=event.currentTarget.value.charCodeAt(0)
    // }
    // ||asci<'0'.charCodeAt(0)||asci>big
    if (event.currentTarget.value == "")
        event.currentTarget.focus();
    else {
        let iAge = document.getElementsByClassName('iAge')[0]
        iAge.parentElement.removeChild(iAge)
        iAge = document.getElementsByClassName('iAge')[0]
        iAge.parentElement.removeChild(iAge)
        let a = subject.filter(x => x.age <= +event.currentTarget.value)
        for (let i = 0; i < a.length; i++) {
            let b = document.createElement('button')
            b.innerText = a[i].name
            b.addEventListener('click', game)
            document.body.appendChild(b);
        }
    }
}
function game() {
    let flag = false;
    let i1, allThis
    for (let i = 0; i < subject.length && flag == false; i++) {
        if (event.currentTarget.innerText == subject[i].name) {
            flag = true;
            let b = document.getElementsByTagName('button')
            while (b.length != 0)
                b[0].parentElement.removeChild(b[0]);
            allThis = all[i]
        }
    }
    let div = document.getElementsByTagName('div')[0]
    let text1,index=0
    while (good(allThis) == false) {
        let r = Math.floor(Math.random() * allThis.length)
        while ((r % 2 == 0 && allThis[r]["FisInPlay"] == true) || (r % 2 != 0 && allThis[r]["LisInPlay"] == true))
            r = Math.floor(Math.random() * allThis.length);

        let s = document.createElement('section')
        let p = document.createElement('p')
        if (r % 2 == 0) {
            p.innerText = allThis[r]["firstValue"]
            allThis[r]["FisInPlay"] = true
        }
        else {
            p.innerText = allThis[r]["lastValue"]
            allThis[r]["LisInPlay"] = true
        }
        p.style.color = 'black'
        p.hidden = true;
        s.appendChild(p)
        s.style.backgroundColor = 'gray'
        s.className = allThis[r]["firstValue"] + "-" + allThis[r]["lastValue"]
        
        s.id=index++;
        s.style.width = "15%"
        s.style.height = "20vh"
        s.style.margin = "5px"
        s.addEventListener('click', openCard)
        div.appendChild(s)
    }
}
function good(allThis) {
    for (let i = 0; i < allThis.length; i++)
        if (allThis[i]["FisInPlay"] == false || allThis[i]["LisInPlay"] == false)
            return false;
    return true;
}
let cardbefore = null
function openCard() {

    event.currentTarget.getElementsByTagName('p')[0].hidden = false
    if (cardbefore == null){
        idCardBefore=event.currentTarget.id
        cardbefore = event.currentTarget.className}
    else if (event.currentTarget.className != cardbefore) {

        let b = event.currentTarget.getElementsByTagName('p')[0]
        // b.hidden=true
        let c= document.getElementsByClassName(cardbefore)
        //.getElementsByTagName('p')
        //     document.getElementsByClassName(cardbefore)[1].getElementsByTagName('p')[0].hidden=true
        setTimeout(
            () => {
                b.hidden = true
                c[0].getElementsByTagName('p')[0].hidden=true
                c[1].getElementsByTagName('p')[0].hidden=true
            }, 1000)
        cardbefore = null
    }
    else if(event.currentTarget.id!=idCardBefore)
        cardbefore = null;
    if(win()==true)
    {
        alert('נצחת! כל הכבוד! אלוףףףףףףףףףףףףףףףףףףףףףףףףףףףףףףףףף')
        window.location.reload(); 
    }
}
function win()
{
    let div=document.getElementById('match').getElementsByTagName('section')
    for(let i=0;i<div.length;i++)
        if(div[i].getElementsByTagName('p')[0].hidden==true)
            return false;
    return true;
}