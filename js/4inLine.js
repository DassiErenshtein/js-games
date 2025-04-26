let player = 'a'
let div = document.getElementsByTagName('div')[0];
function win(player) {
    let i1, j1;
    for (let i = 7; i >= 0; i--)
        for (let j = 0; j < 8; j++) {
            if (div.getElementsByTagName('button')[i * 8 + j].className == "b" + player) {
                for (j1 = j; j1 < j + 4 && j1 < 8 && div.getElementsByTagName('button')[i * 8 + j1].className == "b" + player; j1++);
                if (j1 == j + 4)
                    return true;
                for (i1 = i; i1 > i - 4 && i1 >= 0 && div.getElementsByTagName('button')[i1 * 8 + j].className == "b" + player; i1--);
                if (i1 == i - 4)
                    return true;
                for (j1 = 0; j1 < 4 && i - j1 >= 0 && j - j1 >= 0 && div.getElementsByTagName('button')[(i - j1) * 8 + j - j1].className == "b" + player; j1++);
                if (j1 == 4)
                    return true;
                for (j1 = 0; j1 < 4 && i - j1 >= 0 && j + j1 < 8 && div.getElementsByTagName('button')[(i - j1) * 8 + j + j1].className == "b" + player; j1++);
                if (j1 == 4)
                    return true;

            }
        }
    return false;
}


function play() {

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let b = document.createElement('button');
            b.setAttribute('data-i', i)
            b.setAttribute('data-j', j)
            b.addEventListener('click', check)
            // b.id='b_i_j'
            b.className = "b"
            div.appendChild(b)
        }
        let br = document.createElement('br')
        div.appendChild(br);
    }
    document.body.style.backgroundColor = sessionStorage.getItem('color')

}
// function b1(b){
//     setTimeout(function() {
//         b.className='b'
//       }, 1);
// }
// function walkingDown( i1, j) {
//     for (let i = 0; i < i1; i++) {
//         b = div.getElementsByTagName('button')[i * 8 + j]
//         b.className='b' + player
//         b1(b)
        
//     }
// }
function check() {

    let j = +event.currentTarget.getAttribute('data-j')
    let b, i
    let flag = false;
    for (i = 7; i >= 0 && flag == false; i--) {
        b = div.getElementsByTagName('button')[i * 8 + j]
        if (b.className == 'b') {
            flag = true;
            player = (player == 'a') ? 'b' : 'a';
            //walkingDown(i, j)            
            b.className = 'b' + player
        }
    }

    if (win(player) == false) {

        document.getElementById('player').innerText = 'player: ' + player;
        document.getElementById('player').style.color = document.getElementsByClassName('b' + player)[0].style.backgroundColor
    }
    else {

        setTimeout(() => {
            alert("שחקן " + (player =='a' ?'b':'a' )+ " ניצח!!!! wow!");
            window.location.reload();
        }, 500);
    }
}

