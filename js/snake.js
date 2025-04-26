//הפונט של כל המשחק יהיה הפונט שנבחר בהגדרות אישיות
let font = JSON.parse(localStorage.getItem('arrUsers'))[sessionStorage.getItem('thisUser')].font
document.body.style.fontFamily = font
//timer-מעלה את הנקודות לפי מהירות הזמן שהגיעו ליהלום האדום, ומציג טיימר
let timer=document.getElementById('timer')
//לוח המשחק הוגדר חיצונית, כדי שלא יצטרכו כל פעם לגשת אליו
let table
//בכל פעם הכיוון יהיה משתנה סטטי שישתנה ע"פי הלחיצות וכך הנחש ידע לאיפה לזוז 
let direction = 3;
//TRUE פונקציית הזזת הנחש תפעל כל עוד זה יהיה 
let intervalId;
let intervalId1;
//COUNT*20 הנקודות יצברו לפי 
let count = 0;
let flag = false;
//האם זהו הצעד הראשון במשחק
let start=false;
let speed = 0;
//השלב יושפע מכמה השחקן הצליח, ועל איזה כפתור לחץ בהתחלה. לפי זה יבנה הלוח
let level
//כי עלו שלב, ההרצה של הנחש תיעצר ותמשיך רק כשילחץ על מקש FALSE  ברגע שהמשתנה הבא יהיה 
let isIntervalRunning = true;
//לא צריך להיות מוגדר יותר מפעם אחת USERS המערך של ה
let allU = JSON.parse(localStorage.getItem('arrUsers'))
//-הנוכחי- נשתמש בו כדי לקחת ממנו שיא, פונט אהוב וצבע אהוב USERה
let indexThis = sessionStorage.getItem('thisUser')
//הפונקציה מקבלת את שם הקלאס של הגול הנוכחי, ומגרילה מיקום לגול-יהלום אדום או רגיל או כתר 
function randomGoal(classN) {
    let r = Math.floor(Math.random() * 10)
    let r1 = Math.floor(Math.random() * 14)
    //אם המיקום תפוס ע"י משהו שהוא לא לוח רגיל, הוא יגריל מיקום עד שיהיה מיקום אפשרי לגול
    while (table.getElementsByTagName('tr')[r].getElementsByTagName('td')[r1].className != "base") {
        r = Math.floor(Math.random() * 10)
        r1 = Math.floor(Math.random() * 14)
    }
    table.getElementsByTagName('tr')[r].getElementsByTagName('td')[r1].className = classN
}
//מכין את השלבים על הלוח ושולח את האינדקס של השלב המתאים
// לפונקציה שיוצרת את הלוח כדי שתיצור אותו כולל המוקשים
function checkLevel() {
    let div = document.createElement('div')
    div.className = 'divLevels'
    let h2 = document.createElement('h2')
    h2.innerText = 'CHOOSE YOUR LEVEL'
    h2.style.textAlign = 'center'
    div.appendChild(h2)
    for (let i = 1; i < 4; i++) {
        let b = document.createElement('div')
        b.innerText = 'stage ' + i;
        b.className = 'levels'
        start=false;
        b.addEventListener('click', function () {
            createTable(i);
        });
        div.appendChild(b)

    }
    document.body.appendChild(div)

}
//פונקציה שיוצרת את לוח המשחק
function createTable(num) {
    if (table)
        table.remove()
    //המידע אודות המשחק
    let text1 = document.getElementById('text1')
    text1.hidden = false;
    //CHECK LEVEL השלב הוא המספר שנשלח בפונקציה קודמת 
    level = num;
    //מחיקת השלבים
    if (document.getElementsByClassName('divLevels')[0] != undefined)
        document.getElementsByClassName('divLevels')[0].remove()
    //SCRIPT-והכנסתו בסוף העמוד לפני ה TABLE- יצירת לוח המשחק
    table = document.createElement('table')
    let script1 = document.getElementsByTagName('script')[0]
    document.body.insertBefore(table, script1.nextSibling)
    //(משתנה סטטי) כדי שיוכלו להשתמש בו בעתיד TABLE שנוצר לתוך המשתנה  TABLE הכנסת ה
    table = document.getElementsByTagName('table')[0]
    //יצירת המטריצה שעליה הסנייק עובד
    for (let i = 0; i < 10; i++) {
        let tr = document.createElement('tr')
        for (let j = 0; j < 14; j++) {
            let td = document.createElement('td');
            td.setAttribute('data-i', i)
            td.setAttribute('data-j', j)
            td.className = "base"
            tr.appendChild(td)
        }
        table.appendChild(tr);
    }
    //יצירת לוח התחלתי של משחק
    table.getElementsByTagName('tr')[1].getElementsByTagName('td')[0].className = "tail"
    document.getElementsByClassName('tail')[0].setAttribute('data-d', 3)
    table.getElementsByTagName('tr')[1].getElementsByTagName('td')[1].className = "snake"
    table.getElementsByTagName('tr')[1].getElementsByTagName('td')[1].setAttribute('data-d',3)
    table.getElementsByTagName('tr')[1].getElementsByTagName('td')[2].className = "head"
    document.getElementsByClassName('head')[0].setAttribute('data-d', 3)
    //אם השלב הוא 2, אז הוא יוצר מוקשים בצורה אחת,
    // ואם השלב הוא 3 הוא יוצר מוקשים בצורה אחרת ומסביר על המשחק בהתאמה
    if (num == 2) {
        for (let j = 4; j < 11; j++) {

            table.getElementsByTagName('tr')[2].getElementsByTagName('td')[j].className = "bomp"
            table.getElementsByTagName('tr')[7].getElementsByTagName('td')[j].className = "bomp"
        }
        text1.innerHTML = `<label>Stage 2:</label>
                   Obstacle Odyssey The diamond hunt intensifies! Navigate through a maze of obstacles, avoiding collisions with both them and your own tail. Gather a treasure trove of diamonds while dodging tricky challenges. Your agility and strategic thinking will be put to the test! Remember, you've got this! Keep slithering and shining, and you'll emerge victorious!`
   
    }
    else if (num == 3) {
        text1.innerHTML = `<label>Stage 3:</label> Ultimate Diamond Challenge Prepare for the ultimate diamond challenge! This stage is packed with formidable obstacles and hidden gems, testing your skills like never before. Stay focused, strategize brilliantly, and unleash your inner diamond hunter to conquer this exhilarating level. Remember, you've got this! Keep slithering and shining, and you'll emerge victorious!`
        for (let i = 0; i < 8; i++) {

            table.getElementsByTagName('tr')[i].getElementsByTagName('td')[8].className = "bomp"
            table.getElementsByTagName('tr')[9 - i].getElementsByTagName('td')[5].className = "bomp"
        }
        for (let i = 0; i < 3; i++) {

            table.getElementsByTagName('tr')[2].getElementsByTagName('td')[i].className = "bomp"
            table.getElementsByTagName('tr')[7].getElementsByTagName('td')[13 - i].className = "bomp"
        }
    }
    //המוקשים בצבע שהאדם בחר
    let bomp = document.getElementsByClassName('bomp')
    for (let i = 0; i < bomp.length; i++)
        bomp[i].style.backgroundColor = allU[indexThis].color
    //מגריל גול רגיל של יהלום
    randomGoal("goal")
}
//פונקציה שישלחו אליה מתי שהשחקן נכשל
function gameOver() {
    //קול של פיצוץ
    let a = document.createElement('audio')
    a.src = "../סאונד/snake.mp3"
    a.autoplay = true;
    flag = true;
    // GAME OVERיוצרת על המסך את הכיתוב 
    table.remove()
    let div = document.createElement('div')
    div.className = "background"
    document.body.appendChild(div)
    div = document.createElement('div')
    div.id = 'gameOverDiv'
    let h1 = document.createElement('h1')
    h1.className = "title"
    h1.innerText = "GAME OVER"
    let p = document.createElement('p')
    //סופרת כמה נקודות יש אם מספר הנקודות הנוכחי גבוה מהשיא הקודם,
    // מציגה אותו בשיא הגבוה ומראה את השיא שלו, ואת השיא הגבוה ביותר עד כה    
    let score = count * 20;
    if (+localStorage.getItem('highScore') < score) { localStorage.setItem('highScore', score) }
    p.innerText = 'MAX SCORE:' + localStorage.getItem('highScore');
    p.id = 'maxScore'
    let b = document.createElement('button')
    b.addEventListener('click', () => { window.location.reload(); })
    b.innerText = 'PLAY AGAIN'
    b.className = 'playAgain playAgain1'
    div.appendChild(h1)
    div.appendChild(p)
    p = document.createElement('p')
    p.innerText = 'YOUR SCORE: ' + score;
    p.id = 'your_score'
    div.appendChild(p)
    div.appendChild(b)
    b = document.createElement('button')
    b.addEventListener('click', () => { window.location = '../html/score.html'; })
    b.innerText = 'TO SCORE'
    b.className = 'playAgain playAgain2'
    div.appendChild(b)
    document.body.appendChild(div)
    //(כדי שבדף השיאים השיא שלו יהיה השיא הגבוה ביותר)אם השיא הנוכחי שלו גבוה מהשיא הקודם שלו, 
    //אז מכניס בשיא הגבוה שלו את השיא הנוכחי
    if (score > allU[indexThis].maxScore) {
        allU[indexThis].maxScore = score;
        allU[indexThis].date = new Date();
        localStorage.setItem('arrUsers', JSON.stringify(allU))
    }
    //מוחק את הציון והאודות
    score = document.getElementById('score')
    score.remove()
    document.getElementById('text1').remove()
}
//SETINTERVALפונקציה שאליה קורא ה
//משתנה שהוגדר בהתחלה ומשתנה לפי הלחיצות-DIRECTIONבכל פעם מזיזה את הנחש צעד אחד קדימה לכיוון שנשמר ב
function move1() {
    if (!flag) {
        //את מיקומו העכשווי FIRSTPLACE מוצאת את ראש הנחש ואת מיקומו במטריצה ושומרת בתוך משתנה 
        let h = document.getElementsByClassName('head')[0]
        let i = +h.getAttribute('data-i')
        let j = +h.getAttribute('data-j')
        let firstPlace = table.getElementsByTagName('tr')[i].getElementsByTagName('td')[j];
        //מזיזה את האינדקסים של המיקום במטריצה לפי הכיוון הנוכחי
        if (direction == 3)
            j++;
        else if (direction == 4)
            i++;
        else if (direction == 1)
            j--;
        else
            i--;
        //גורמת שמסוף השורה מגיעים לתחילת השורה ואפשר לעבור מצד לצד
        i = (i + 10) % 10;
        j = (j + 14) % 14;
        let nextPlace = table.getElementsByTagName('tr')[i].getElementsByTagName('td')[j];
        //ותגמור את המשחק GAME OVERאם המיקום הבא לפי השינויים הוא נחש או מוקש, הפונקציה תקרא ל
        if (nextPlace.className == "snake" || nextPlace.className == "tail" || nextPlace.className == "bomp")
            gameOver()
        else {
            //המיקום הקודם של הראש נהפך לנחש רגיל, 
            // והכיוון שלו הוא הכיוון הנוכחי שאליו זז הנחש
            // כדי שבעתיד נוכל לדעת איפה המיקום הבא של הזנב בשביל למחוק אותו            
            firstPlace.className = 'snake'
            firstPlace.setAttribute('data-d', direction)
            nextPlace.setAttribute('data-d', direction)
            if (nextPlace.className == "goal") {
                //אם המיקום הבא הוא יהלום, אז תעלה לי את הנקודות ותשמיע קול אכילת יהלום
                count++;
                let a = document.createElement('audio')
                a.src = "../סאונד/dimond.mp3"
                a.autoplay = true;
                nextPlace.className = 'head'
                document.getElementById('score').innerText = "score: " + (count * 20);
                //אם הגיע למספר 1000 של נקודות, מגיע לכתר- מעבר שלב
                //עובר שלב בעקרון כשאוכל 40 יהלומים (או כשאוכל יהלומים אדומים ששוים שתיים או שלוש יהלומים)
                if (count > 0 && count % 50 == 0) { randomGoal("crown") }
                else {//אם לא מגריל יהלום רגיל
                    randomGoal("goal");
                    //וכל 5 יהלומים הוא מקבל יהלום אדום שנגמר לאחר 5 שניות
                    //אחרי 10 יהלומים רגילים שם יהלום אחד מיוחד
                    if (count % 5 == 0) {
                        randomGoal("goalTemporary")
                        timer.hidden=false
                        timer.innerText="10"
                        intervalId1=setInterval(timerForRedDimond, 500)
                        setTimeout(() => {
                            if(document.getElementsByClassName('goalTemporary')[0])
                            document.getElementsByClassName('goalTemporary')[0].className = 'base';
                            timer.hidden=true
                        }, 5000);                   

                    }
                }
            }
            //אם המיקום הבא הוא יהלום אדום, מקבל פי 2 נקודות ומשמיע קול אכילת יהלום.
            else if (nextPlace.className == "goalTemporary") {
                clearInterval(intervalId1)
                timer.hidden=true
                let a = document.createElement('audio')
                a.src = "../סאונד/redDimond.WAV"
                a.autoplay = true;
                nextPlace.className = 'head'
                count += (+timer.innerText)>5 ? 3: 2
                document.getElementById('score').innerText = "score: " + (count * 20);
            }
            //(הפונקציה תמחוק קודם את הטבלה הנוכחית... )אם המיקום הבא הוא כתר, אז עולים שלב
            // וקוראים לפונקציית יצירת הטבלה עם השלב הבא  
            else if (nextPlace.className == "crown") {
                let a = document.createElement('audio')
                a.src = "../סאונד/כתר.WAV"
                a.autoplay = true;
                isIntervalRunning = false;
                table.remove();
                start=false;
                if (level == 3) {
                    speed += 50;                    
                    createTable(1)
                }
                else
                    createTable(level + 1)
            }
            //(קלאס זנב משמעותי רק להתקדמות ולא נראה אחרת במסך)והתא הבא לכיוון ששמרו אצלו במשתנה כיוון נהיה קלאס זנב 'BASE'אם לא, המקום הבא נהיה ראש והזנב נהיה רגיל
            else {
                nextPlace.className = 'head'
                let tail = table.getElementsByClassName('tail')[0]
                let i2 = +tail.getAttribute('data-i'), j2 = +tail.getAttribute('data-j')
                tail.className = 'base'
                if (+tail.getAttribute('data-d') == 3)
                    j2++;
                else if (+tail.getAttribute('data-d') == 4)
                    i2++;
                else if (+tail.getAttribute('data-d') == 1)
                    j2--;
                else if (+tail.getAttribute('data-d') == 2)
                    i2--;
                //כולל גם מעבר מצד לצד
                i2 = (i2 + 10) % (10);
                j2 = (j2 + (14)) % (14)
                table.getElementsByTagName('tr')[i2].getElementsByTagName('td')[j2].className = 'tail'
            }
        }
    }
    //משתנה זה נהפך כשעולים שלב, כדי שהנחש לא ימשיך להתקדם FALSEשווה ל isIntervalRunning אם משתנה 
    if (!isIntervalRunning) {
        clearInterval(intervalId);
        isIntervalRunning = true;
    }

}
//מתבצעת בעת לחיצה על מקש חיצים בודקת איזה כיוון החץ ומשנה את הכיוון על פיו. 
//אם הפונקציה כבר פועלת, מכבה אותה ומדליקה שוב כדי שלא תפעל פעמיים בו זמנית
//שמזיז את הנחש צעד אחד MOVE1 כל פעם הפונקציה קוראת ל
function moveSnake() {
    if (!flag&&event.keyCode >= 37 && event.keyCode <= 40) {
      let newDirection = event.keyCode - 36; // 37-36=1, 38-36=2, etc.
      let oppositeDirection=newDirection!=2?(newDirection+2)%4:4;
      let lastDirection=+document.getElementsByClassName('head')[0].getAttribute('data-d')
      if(!start &&oppositeDirection!=lastDirection){
        intervalId = setInterval(move1, (250 - speed)); 
        start=true;
        direction=newDirection;}
      else if ( newDirection != lastDirection && oppositeDirection != lastDirection) {
        clearInterval(intervalId);
        direction = newDirection;        
        intervalId = setInterval(move1, (250 - speed));
      }
    }
  }
//בכל פעם שמוגרל יהלום אדום הוא קורא לפונקציה הזו שמקדמת את הטיימר ומורידה נקודות
function timerForRedDimond() {
    if((+timer.innerText)==0)
    clearInterval(intervalId1);
else
    timer.innerText=(+timer.innerText)-1;
}