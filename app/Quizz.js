class Quizz {
    static create() {
        const name = document.querySelector('input[name=name]').value;
        console.log('name', name);
        Quizz.instance = new Quizz(name);
        console.log('Quizz.instance',  Quizz.instance);
    }
    constructor(name) {
        this.name = name;
        this.questions = [];
    }
}

window.Quizz = Quizz;
