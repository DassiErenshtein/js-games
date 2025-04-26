//הפונט של המשתמש הנוכחי (האהוב עליו)
let font1 = JSON.parse(localStorage.getItem('arrUsers'))[sessionStorage.getItem('thisUser')].font
//כל עמוד שמשתמש בדף הזה, הפונט הדפולטיבי שלו יהיה הפונט שהמשתמש אוהב
document.body.style.fontFamily=font1;
function loading() {
    //בעת רענון עמוד המשחקים- נוצרים הכפתורים של המשחקים עם תמונות מתאימות ופונט אהוב
    let b = document.getElementsByTagName('button')
    b[0].style.backgroundImage = "url('../pic/pic1.png')"
    b[0].style.fontFamily=font1
    b[1].style.backgroundImage = "url('../pic/pic2.png')"
    b[1].style.fontFamily=font1
    for(let i=2;i<b.length;i++){
        b[i].style.backgroundImage = "url('../pic/pic"+(i+1)+".jpg')"
        b[i].style.fontFamily=font1
}
}
function load1() {//הצגה בכל דף משחקים את שם השחקן בפונט האהוב עליו
    let p = document.getElementById('userName')
    let allU = JSON.parse(localStorage.getItem('arrUsers'))
    let name = allU[sessionStorage.getItem('thisUser')].name
    p.innerText = 'hi ' + name
    p.style.fontFamily=allU[sessionStorage.getItem('thisUser')].font
}
function open1(gameName) {
    //פתיחת המשחק שהשחקן רוצה, שאלה האם הוא בטוח, ואם כן- כניסה.
    let ans;
    if (gameName == 'HtmlPage2')
        ans = confirm('Do you want to start your game?')
    ans = confirm('Do you want to start ' + gameName + '?');
    if (ans == true)
        window.location = './' + gameName + '.html';
}
function close1() {
    //יציאה ממשחק עם אזהרה שהניקוד ימחק.
    let ans = confirm('Your score may be deleted, are you sure you want to exit?')
    if (ans == true)
        window.location = './menu.html'
}
