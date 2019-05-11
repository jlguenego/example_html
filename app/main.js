(async () => {
    console.log('starting app');
    const home = await fetch('tmpl/home.html');
    document.querySelector('main').innerHTML = await home.text();
})();
