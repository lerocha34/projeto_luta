//knight ou sorcerer
//littleMonster ou BigMonster

class character{

    _life = 1;
    maxLife = 1;
    attack = 0;
    defense = 0;

    constructor(name){
        this.name = name;
    }

    get life(){
        return this._life;
    }
    set life(newLife){
        this._life = newLife < 0 ? 0: newLife;

    }

}

class knight extends character{
    constructor(name){
        super('Knight');
        this.life = 100;
        this.attack = 10;
        this.defense = 8;
        this.maxLife = this.life;
    }
}

class sorcerer extends character{
    constructor(name){
        super('Sorcerer');
        this.life = 80;
        this.attack = 15;
        this.defense = 3;
        this.maxLife = this.life;
    
    }
    
}

class littleMonster extends character{
    constructor(name){
        super('Kobold');
        this.life = 40;
        
        this.attack = 4;
        this.defense = 4;
        this.maxlife = this.life;

    }
}

class bigMonster extends character{
    constructor(name){
        super('Hobgoblin');
        this.life = 120;
        this.attack = 16;
        this.defense = 6;
        this.maxlife = this.life;
    }
}

class Stage {
    constructor(hero, monster, heroEl, monsterEl, logObject){
        this.hero = hero;
        this.monster = monster;
        this.heroEl = heroEl;
        this.monsterEl = monsterEl;
        this.log = logObject;
    }

    start(){
        this.update()

        this.heroEl.querySelector('.attackbutom').addEventListener('click', () => this.doAttack(this.hero, this.monster) );
        this.monsterEl.querySelector('.attackbutom').addEventListener('click', () => this.doAttack(this.monster, this.hero));
    }

    update(){
        //Hero
        this.heroEl.querySelector('.name').innerHTML = `${this.hero.name} - ${this.hero.life.toFixed(1)} HP`;
        let hpct = (this.hero.life / this.hero.maxLife) * 100;
        this.heroEl.querySelector('.bar').style.width = `${hpct}%`;

        //Monster
        this.monsterEl.querySelector('.name').innerHTML = `${this.monster.name} - ${this.monster.life.toFixed(1)} HP`;
        let mpct = (this.monster.life / this.monster.maxLife) * 100;
        this.monsterEl.querySelector('.bar').style.width = `${mpct}%`;
    }

    doAttack(attacking, attacked){
        if(attacking.life <= 0 || attacked.life <= 0){
            this.log.addMessage('Atacando cachorro morto');
            return;

        }

        let attackFactor = (Math.random() * 2).toFixed(2);
        let defenseFactor = (Math.random() * 2).toFixed(2);


        let actualAttack = attacking.attack * attackFactor;
        let actualDefense = attacked.defense * defenseFactor;

        if (actualAttack > actualDefense){

            attacked.life -= actualAttack;
            this.log.addMessage(`${attacking.name} causou ${actualAttack.toFixed(1)} de dano em ${attacked.name}`)

        } else {
            this.log.addMessage(`${attacked.name} se defendeu`)
        }
        this.update();
    }
}

class Log {
    list = [];

    constructor(listEl){
        this.listEl = listEl;
        
    }

    addMessage(msg){
        this.list.push(msg)
        this.render();
    }
    render(){
        this.listEl.innerHTML = ''

        for (let i in this.list){
            this.listEl.innerHTML += `<li> ${this.list[i]}</li>`
        }
    }

    
}
