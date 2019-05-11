(async () => {
    console.log('starting appxxx');
    const states = {
        home: { tmpl: 'tmpl/home.html', title: 'Home' },
        create_quizz: { tmpl: 'tmpl/create-quizz.html', title: 'Créer un Quizz' },
        list_quizz: { tmpl: 'tmpl/list-quizz.html', title: 'Tous les Quizz' },
    };
    const initialState = 'home';
    const tmpl = await fetch(states[initialState].tmpl);
    document.querySelector('main').innerHTML = await tmpl.text();
    const url = '/app/';
    const title = 'Quizzz ???';
    const state = initialState;
    history.replaceState({ url, title, state }, title, url);
    window.goto = async (state) => {
        console.log('goto', state);
        const tmpl = await fetch(states[state].tmpl);
        document.querySelector('main').innerHTML = await tmpl.text();
        const url = `./${state}`;
        const title = states[state].title;
        window.history.pushState({ url, title, state }, title, url);
        window.document.title = title;
        const stateObj = history.state;
        console.log('stateObj', stateObj);
        return false;
    };

    window.addEventListener("popstate", function (e) {
        console.log('popstate', e);
        const stateObj = history.state;
        console.log('state', stateObj);
        if (stateObj === null) {
            // it is a pushstate ?
            console.log('pushstate ?');
            return;
        }
        window.goto(stateObj.state);


    }, false);
})();
