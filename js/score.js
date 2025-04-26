function setScore() {
    let allU = JSON.parse(localStorage.getItem('arrUsers'));
    let counter = [];
    let i = 0
    for (; i < 4 && i < allU.length; i++) {
        counter[i] = allU[i];
    }
    if (i == 4) {

        for (let i1 = 0; i1 < counter.length; i1++) {
            let max = 0, imax = 0, i2;
            for (i2 = 0; i2 < counter.length - i1; i2++)
                if (counter[i2].maxScore > max) {
                    max = counter[i2].maxScore
                    imax = i2;
                }
            let temp = counter[i2 - 1]
            counter[i2 - 1] = counter[imax]
            counter[imax] = temp;
        }
        for (let i = 4; i < allU.length; i++) {
            if (allU[i].maxScore > counter[0].maxScore) {
                counter[0] = allU[i]
                for (let i1 = 1; i1 < counter.length && counter[i1].maxScore < counter[i1 - 1].maxScore; i1++) {
                    let temp = counter[i1]
                    counter[i1] = counter[i1 - 1]
                    counter[i1 - 1] = temp;
                }
            }
        }
    }
    // let div=document.createElement('div')
    // div.id='theMax'
    // let br=document.createElement('br')
    // let p=document.createElement('p')
    // p.innerText='name:'+counter[0].name +br+
    debugger
    let div = document.getElementById('divScore')
    let html = "";
    html = `<div class="score-entry">
                    <span class="name">The most champion player is: ${counter[counter.length-1].name}</span><br>
                    <span class="score">his score: ${counter[counter.length-1].maxScore}</span><br>
                    <span class="score">his record date: ${counter[counter.length-1].date.substring(0, 10)}</span>
                </div>`;
    let div1 = document.createElement('div')
    div1.innerHTML = html
    div1.className = 'highestersScore highS'
    div.appendChild(div1);
    let br = document.createElement('br')
    div.appendChild(br)
    let div2 = document.createElement('div')
    div2.id = 'seconds'
    for (let i = counter.length - 2; i >= 0; i--) {
        html = `<div class="score-entry">
                    <span class="name">The seconds is: ${counter[i].name}</span><br>
                    <span class="score">his score: ${counter[i].maxScore}</span><br>
                    <span class="score">his record date: ${counter[i].date.substring(0, 10)}</span>
                </div>`;
        div1 = document.createElement('div')
        div1.innerHTML = html
        div1.className = 'highestersScore secondS'
        div2.appendChild(div1);
    }
    div.appendChild(div2)
}
function returnSnake() {
    window.history.back()
}