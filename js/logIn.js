//בעת טעינה הדף מציב ארועים בכפתורים- להרשמה, לבדיקת המשתמש אם הוא קיים וכיתוב שכחת אימייל לאופציית שכחה
//ישנה את האירועים שעל הכפתורים ואת הכיתובים שעליהם, ולא יעבור עמוד JSבכל פעם שעוברים מאופציה אחת לאחרת, ה
function loading1() {
    //אירוע להרשמה אם לוחץ על הרשמה
    let reg = document.getElementById('Reg');
    reg.addEventListener('click', toRegister);
    //שולח לפונקציה שבודקת האם המשתמש קיים עם הסיסמא הזו- ואם כן נכנסת בתור המשתמש הזה
    let btn = document.getElementsByClassName('btn')[0]
    btn.addEventListener('click', checkUser)
    //שולח לאופציית שכחת קוד(שליחת קוד למייל)
    let f = document.getElementById('forgot')
    f.addEventListener('click', forgotPassword)
}
//בדיקת אימייל תקין
function checkEmail(email) {
    flag = true;
    let x = email.indexOf('@'), y = email.indexOf('.', x + 1)
    //בדיקה אם קיים @ אחד ונקודה אחת
    if (email == '' || x == -1 || email.indexOf('@', x + 1) != -1 || y == -1 || email.indexOf('.', y + 1) != -1)
        flag = false;
    //אחרי ה@ ובדיקה שהכל אותיות או נקודה EMAIL מעבר על ה
    for (let i = x + 1; i < email.length && flag; i++) {
        let name1 = email.charAt(i)
        if (!((name1 >= 'a' && name1 <= 'z') || (name1 >= 'A' && name1 <= 'Z') || name1 == '.')) {
            flag = false;

        }
    }
    // אם הכל תקין מחזיר טוב ומסתיר את הודעת השגיאה
    if (flag) {
        document.getElementsByClassName('errorEmail')[0].hidden = true;
        return true;
    }
    //אחרת מחזיר לא טוב ומראה הודעת שגיאה
    else {
        document.getElementsByClassName('errorEmail')[0].hidden = false;
        document.getElementsByClassName('errorEmail')[0].innerText = 'The email is not correct';
    }
    return false;
}
//בדיקת תקינות שם
function checkName(name) {
    let flag = false;
    if (name == "") {
        //הצגת שגיאה אם השם ריק
        document.getElementsByClassName('errorUserName')[0].hidden = false;
        document.getElementsByClassName('errorUserName')[0].innerText = 'Please enter a username';
    } else {
        //אחרת, אם השם אינו אות- מציג הודעת שגיאה ויוצא מהלולאה
        for (let i = 0; i < name.length && !flag; i++) {
            let name1 = name.charAt(i);
            if (!((name1 >= 'a' && name1 <= 'z') || (name1 >= 'A' && name1 <= 'Z') || (name1 >= 'א' && name1 <= 'ת'))) {
                flag = true;
                document.getElementsByClassName('errorUserName')[0].hidden = false;
                document.getElementsByClassName('errorUserName')[0].innerText = 'The name is not correct';
            }
        }
        //FALSE אחרת יחזיר TRUE אם השם תקין מסתיר הודעת שגיאה ומחזיר
        if (flag == false) {
            document.getElementsByClassName('errorUserName')[0].hidden = true;
            return true;
        }

    }
    return false;
}
//בודק האם הקוד תקין
function checkPassword(password) {
    if (password == "") {
        // אם הקוד ריק מציג הודעת שגיאה
        document.getElementsByClassName('errorPassword')[0].hidden = false;
        document.getElementsByClassName('errorPassword')[0].innerText = 'Please enter a password';
        return false;
    }
    //TRUE אחרת מחזיר 
    else { document.getElementsByClassName('errorPassword')[0].hidden = true; }
    return true;
}
//בודקת האם המשתמש קיים (נשלחת רק כשהעמוד באופציית כניסה) אם הוא קיים עם הקוד הזה, כניסה לדף המשחקים
//אם הוא קיים עם קוד אחר, שליחה לפונקציית שכחת מייל שמכינה עמוד לשכחת מייל
//אם הוא לא קיים במאגר, שולחת להרשמה
function checkUser() {
    let name = document.getElementsByClassName('userName')[0].value;
    let password = document.getElementsByClassName('password')[0].value;
    //אם השם והקוד תקינים
    if (checkName(name) && checkPassword(password)) {
        let flag = true;
        //מערך המשתמשים
        let allU = JSON.parse(localStorage.getItem('arrUsers'))
        //אם המערך קיים והשם קיים בו- בודק האם הקוד זהה. אם זהה- מעביר לדף המשחקים. 
        //שמשנה את הלוח ושולחת קוד במקרה של שכחה. FORGOTPASSWORD אם הקוד לא זהה, מעביר לפונקציית 
        //שמשנה את הדף לאופציית הרשמה וקולטת נרשם חדש TOREGISTER אם אין מערך או שהשם אינו קיים, תשלח לפונקציית 
        if (allU != null)
            //מעבר על המערך
            for (let index = 0; index < allU.length; index++) {
                //אם השם קיים
                if (allU[index].name == name) {
                    //אם גם הקוד זהה- כניסה לעמוד המשחקים
                    if (allU[index].password == password) {
                        sessionStorage.setItem('thisUser', index)
                        document.location = '../html/menu.html'
                        return
                    }
                    else {
                        //אחרת מעבר לאופציית שכחת קוד(שליחה במייל)
                        forgotPassword();
                        return
                    }
                }

            }
        //אם האדם אינו קיים במערכת, עובר לפונקציית ההרשמה
        toRegister();
    }
}
//שינוי הדף למצב קליטת משתמש חדש
function toRegister() {
    // קבלת אלמנט ה-div של תוכן טופס הרישום
    let div = document.getElementById('loginFormContent');
    // שינוי כותרת ה-h1 ל-"הרשמה"
    div.getElementsByTagName('h1')[0].innerText = 'Register';
    // קבלת אלמנט התיבה "אני מסכים לתנאים ולמדיניות"
    let check = document.getElementsByClassName('check')[0];
    // הפיכת שדה הקלט "אני מסכים לתנאים ולמדיניות" לחובה
    check.getElementsByTagName('input')[0].required = true;
    // שינוי תוכן התיבה "אני מסכים לתנאים ולמדיניות"
    check.innerHTML = check.getElementsByTagName('input')[0].outerHTML + 'I agree to terms & conditions';
    // קבלת כפתור הכניסה
    let btn = document.getElementsByClassName('btn')[0];
    btn.innerText = 'Register';// שינוי טקסט הכפתור ל-"הרשמה"
    // הסרת אירועי הקליק הקודמים מהכפתור
    //(כדי שידע לפנות לפונקציה שבודקת את ההרשמה ולא כניסהה או שליחת מייל שהם שונים לחלוטין)
    btn.removeEventListener('click', checkUser);
    btn.removeEventListener('click', checkReEmail);
    //שתבדוק לי האם הלקוח יכול להכנס או שקיים לקוח כזה checkRegister הוספת אירוע קליק חדש לכפתור שיפעיל את פונקציית 
    btn.addEventListener('click', checkRegister);
    // הצגת תיבת הסימון "אני מסכים לתנאים ולמדיניות"
    check.hidden = false;
    // קבלת כל שדות הקלט מהטופס
    let input = div.getElementsByClassName('input-box');

    // מעבר על כל שדה קלט
    for (let i = 0; i < input.length; i++) {
        // ניקוי ערך שדה הקלט
        input[i].getElementsByTagName('input')[0].value = '';
        //הצגת שדה הקלט -בהרשמה כל שדות הקלט צריכים להקלט ולא להיות מוחבאים
        input[i].hidden = false;
    }

    // קבלת הפסקה "כבר יש לך חשבון?"
    let p = div.getElementsByTagName('p')[0];

    // ניסיון לאתר את הלייבל "הרשמה"
    let p1 = document.getElementById('Reg');

    // אם נמצא הלייבל "הרשמה"
    if (p1) {
        // הסרת אירוע הקליק הקודם מהלייבל
        p1.removeEventListener("click", toRegister);

        // הוספת אירוע קליק חדש ללייבל שיביצע ריענון הדף
        p1.addEventListener('click', () => { window.location.reload(); });
        // שינוי תוכן הלייבל ל-"כניסה"
        p1.innerText = 'Login';
        // שינוי תוכן הפסקה ל-"כבר יש לך חשבון?"
        p.innerText = 'Already have an account?'
    }
}
// פונקצייה לבדיקת הכנסת משתמש חדש והכנסתו במקרה שתקין
function checkRegister() {
    // קבלת אלמנט הטופס דרך האירוע הנוכחי
    let formR = event.currentTarget.parentNode;
    // קבלת שם המשתמש ובדיקת תקינות
    let name = formR.getElementsByClassName('userName')[0].value;
    let f1 = checkName(name); // פונקציה לבדיקת שם משתמש אם תקין, אם לא מציבה הודעת שגיאה ומחזירה שגוי
    // קבלת כתובת המייל ובדיקת תקינות
    let email = formR.getElementsByClassName('email')[0].value;
    let f2 = checkEmail(email);// פונקציה לבדיקת מייל משתמש אם תקין, אם לא מציבה הודעת שגיאה ומחזירה שגוי

    // קבלת הסיסמה ובדיקת תקינות
    let password = document.getElementsByClassName('password')[0].value;
    let f3 = checkPassword(password);// פונקציה לבדיקת קוד משתמש אם תקין, אם לא מציבה הודעת שגיאה ומחזירה שגוי

    // בדיקת סימון תנאים
    let f4 = document.getElementsByClassName('check')[0].getElementsByTagName('input')[0].checked;

    // הצגת הודעת שגיאה אם תנאים לא מסומנים
    if (!f4) {
        document.getElementsByClassName('errorLet')[0].hidden = false;
        document.getElementsByClassName('errorLet')[0].innerText = 'Please confirm terms & conditions';
    }// ביצוע רישום משתמש אם כל התנאים מתקיימים
    else if (f1 && f2 && f3 && f4) {
        document.getElementsByClassName('errorLet')[0].hidden = true;
        inputUSer();
    }
}
function user(name, email, password) {
    //בנאי להכנסת נתונים למשתמש חדש-אובייקט של משתמש  
    this.name = name,
        this.email = email,
        this.password = password
    this.maxScore = 0
    this.date = new Date()
    this.color = 'cadetblue'
    this.font = 'cursive'
}
function inputUSer() {
    // הפונקציה  מוסיפה משתמש חדש למערכת אם אינו קיים כבר במערכת.
    // בודק אם השם כבר קיים ומציג הודעת שגיאה במקרה של קיום.
    let name = document.getElementsByClassName('userName')[0].value
    let email = document.getElementsByClassName('email')[0].value
    let password = document.getElementsByClassName('password')[0].value
    //יצירת אובייקט משתמש
    let newUser = new user(name, email, password)
    //הכנסה לתוך JSON
    let uJson = JSON.stringify(newUser)
    let users;
    //מערך USERS- של כל המשתמשים עד כה
    if (localStorage.getItem('arrUsers') == null)
        users = []
    else
        users = JSON.parse(localStorage.getItem('arrUsers'))
    let i;
    //בדיקה האם המשתמש קיים- אם כן הצגת שגיאה
    for (i = 0; i < users.length; i++) {
        if (users[i].name == name) {
            document.getElementsByClassName('errorLet')[0].hidden = false;
            document.getElementsByClassName('errorLet')[0].innerText = 'User exists in the system, if you forgot your email, choose this button. else, choose another user name '
            break;
        }
    }
    //אם לא, הכנסה למערך המשתמשים והחזרה של המערך לאחסון והצבה במשתמש הנוכחי את המשתמש הזה
    if (i == users.length) {
        document.getElementsByClassName('errorLet')[0].hidden = true;
        users.push(newUser)
        localStorage.setItem('arrUsers', JSON.stringify(users))
        sessionStorage.setItem('thisUser', users.length - 1)
        //מעבר לדף התאמה אישית- צבע וגופן אהובים שישמשו בהמשך לצבע המוקשים ופונט לאורך כל האתר
        document.location = '../html/personal.html'
    }
}

//פונקציה שבונית אפשרות לשכחת קוד- בתצוגה יש רק תיבת קליטת אימייל(שאליו נשלח הקוד בתאוריה)
//CHECKREEMIL()וכפתור השליחה מביא לפונקציית בדיקת אתחול הקוד
function forgotPassword() {
    //אופציית שכחת קוד- אם המשתמש קיים אך אינו לוחץ על קוד תקין- שולח לפונקציה זו
    let div = document.getElementById('loginFormContent');
    //משנה את הכותרת
    div.getElementsByTagName('h1')[0].innerText = 'Reset your password';
    //מסתירה את תגית ההסכמה וזכרון באופציות האחרות
    let check = document.getElementsByClassName('check')[0].hidden = true;
    let btn = document.getElementsByClassName('btn')[0];
    //משנה את הטקסט בכפתור השליחה, מוחקת את האירועים שלו ומוסיפה לו אירוע שליחת האימייל ובדיקת הקוד
    btn.innerText = 'Send Request';
    btn.removeEventListener('click', checkRegister)
    btn.removeEventListener('click', checkUser);
    btn.addEventListener('click', checkReEmail)
    //הקימות נכנסות לתוך מערך זה (שם, מייל, סיסמא) INPUTכל תיבות ה
    let input = div.getElementsByClassName('input-box');
    input[0].hidden = false;//שם לא מוחבא
    input[1].hidden = false;//מייל קיים
    input[2].hidden = true;//סיסמא מוחבאת
    //תגית המעבר לשכחת קוד מוחבאת כמובן
    let p = div.getElementsByTagName('p')[0];
    document.getElementById('forgot').hidden = true;
}
//בודקת את המשתמש- אם הוא קיים שולחת לו למייל. אחרת, שולחת להרשמה
function checkReEmail() {
    let email = document.getElementsByClassName('email')[0].value
    let name = document.getElementsByClassName('userName')[0].value
    //מערך המשתמשים
    let allU = JSON.parse(localStorage.getItem('arrUsers'))
    if (checkEmail(email) && checkName(name)) {//אם המייל תקין (אם לא יציג הודעת שגיאה בפונקציה )
        //מעבר על המערך של המשתמשים, אם אחד המשתמשים זהה במייל ובשם משתמש, תציג הודעת שליחה וירענן את העמוד 
        //(LOGIN יעבור חזרה לאופציית )
        for (let index = 0; index < allU.length; index++) {
            if (name == allU[index].name && allU[index].email == email) {
                alert('the password has been sent, press the code')
                document.location.reload()
                return;
            }

        }
        //אחרת יציג הודעה שהמייל לא נמצא ויעבור לפונקציית הרשמה (הופך את העמוד לדף הרשמה)
        alert('the mail is not definde, please register')
        toRegister()
    }
}
//שמירה לצבע האהוב
function keepColor() {
    //בעת שינוי צבע, שומר את הצבע שהשתנה באובייקט של המשתמש הנוכחי בתוך מערך המשתמשים
    let c = event.currentTarget.value;
    let allU = JSON.parse(localStorage.getItem('arrUsers'))
    allU[sessionStorage.getItem('thisUser')].color = c
    localStorage.setItem('arrUsers', JSON.stringify(allU))
}
function keepFont() {
    //בעת שינוי צבע, שומר את הפונט שהשתנה באובייקט של המשתמש הנוכחי בתוך מערך המשתמשים
    //הוא השם של הפונט שנבחר SELECTהערך של כל בחירה ב
    let f = event.currentTarget.value;
    let allU = JSON.parse(localStorage.getItem('arrUsers'))
    allU[sessionStorage.getItem('thisUser')].font = f
    localStorage.setItem('arrUsers', JSON.stringify(allU))
    //תצוגה מקדימה של הפונט כדי שהמשתמש יראה את צורת הפונט
    document.getElementById('seeFont').style.fontFamily = f
}
function toComeIn() {
    //מעבר לדף המשחקים
    document.location = './menu.html'
}
//בעת לחיצה על מקש בודק האם הוא אנטר. אם כן, מבצע את פעולתו של אותו מקש
function checkEnter() {
    if (event.keyCode == 13) {
        let btn = document.getElementsByClassName('btn')[0]
        //אם הלחצן הוא כניסה- אז קורא לפונקציית בדיקת משתמש וסיסמא קיימים
        if (btn && btn.innerText == 'Login')
            checkUser();
        //אם הלחצן הוא הרשמה, בודק האם הכל תקין ואין לקוח כזה במאגר
        else if (btn && btn.innerText == 'Register')
            checkRegister();
        //אם הפונקציה היא שליחת קוד למייל, קורא לפונקציית שליחת קוד ובדיקה האם שם המשתמש והמייל מקבילים ואם כן שולח
        else if (btn && btn.innerText == 'Send Request')
            checkReEmail();
        // הלחצן הוא שליחת העדפות, אז הוא נכנס לעמוד הבית (אין חובה לשנות העדפות)
        else if (btn.innerText == 'save') {
            toComeIn();
        }
    }
}
