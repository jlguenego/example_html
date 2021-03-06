(async () => {
    console.log('starting app');

    const states = {
        home: { tmpl: 'tmpl/home.html', title: 'Home', url: '' },
        create_quizz: { tmpl: 'tmpl/create-quizz.html', title: 'Créer un Quizz' },
        create_quizz_add_question: { tmpl: 'tmpl/create-quizz-add-question.html', title: 'Créer un Quizz - Ajouter une question' },
        create_quizz_question_form: { tmpl: 'tmpl/create-quizz-question-form.html', title: 'Créer un Quizz - Formulaire question' },
        create_quizz_save: { tmpl: 'tmpl/create-quizz-save.html', title: 'Créer un Quizz - Sauvé !' },
        list_quizz: { tmpl: 'tmpl/list-quizz.html', title: 'Tous les Quizz' },
        legal: { tmpl: 'tmpl/legal.html', title: 'Mentions Légales' },
    };

    const baseHref = document.baseURI;
    console.log('baseHref', baseHref);

    const getInitialState = () => {
        return 'home';
    };

    const goto = async (state, opts) => {
        const options = Object.assign({}, opts);
        if (!states[state]) {
            console.error('state not found:', state, states);
            state = 'home';
        }
        const tmpl = await fetch(states[state].tmpl, {
            headers: {
                'Cache-Control': 'no-cache'
            }
        });
        document.querySelector('main').innerHTML = await tmpl.text();
        document.querySelectorAll('[text]').forEach(n => {
            const myVar = n.getAttribute('text');
            n.innerHTML = eval(myVar);
        });

        const url = document.baseURI + (('url' in states[state]) ? states[state].url : state);
        const title = states[state].title;
        if (options.isFirst) {
            window.history.replaceState({ url, title, state }, title, url);
        } else if (!options.isBack) {
            window.history.pushState({ url, title, state }, title, url);
        }
        window.document.title = 'Quizz: ' + title;
    };

    window.goto = (...args) => {
        // do not call goto with await.
        goto(...args);
        // return false to avoid the navigator to load a.href
        return false;
    };

    window.addEventListener("popstate", function (e) {
        console.log('popstate', e);
        const stateObj = history.state;
        window.goto(stateObj.state, { isBack: true });
    });

    const initialState = getInitialState();
    await goto(initialState, { isFirst: true });

})();
