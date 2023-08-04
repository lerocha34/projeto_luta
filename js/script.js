let log = new Log(document.querySelector('.log'));

let char = new knight();
let monster = new littleMonster();


const stage = new Stage(
    char,
    monster, 
    document.querySelector('#char'),
    document.querySelector('#monster'),
    log

);

stage.start();