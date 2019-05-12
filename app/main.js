(async () => {
    console.log('starting app');

    const states = {
        home: { tmpl: 'tmpl/home.html', title: 'Home', url: '' },
        create_quizz: { tmpl: 'tmpl/create-quizz.html', title: 'Créer un Quizz' },
        list_quizz: { tmpl: 'tmpl/list-quizz.html', title: 'Tous les Quizz' },
    };

    const baseHref = document.baseURI;
    console.log('baseHref', baseHref);

    const getInitialState = () => {
        return 'home';
    };

    const goto = async (state, isFirst) => {
        console.log('goto', state);
        const tmpl = await fetch(states[state].tmpl);
        document.querySelector('main').innerHTML = await tmpl.text();
        const url = ('url' in states[state]) ? states[state].url : state;
        console.log('url', url);
        const title = states[state].title;
        if (isFirst) {
            window.history.replaceState({ url, title, state }, title, baseHref + url);
        } else {
            window.history.pushState({ url, title, state }, title, baseHref + url);
        }
        window.document.title = title;
        console.log('history.state', history.state);
    };

    window.goto = (...args) => {
        goto(...args);
        return false;
    };

    const initialState = getInitialState();
    await goto(initialState, true);

    

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
