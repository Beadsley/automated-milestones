window.addEventListener('load', () => {
    console.log('onload');
    fetch('/api/milestones')
        .then(res => res.json())
        .then(json => console.log(json));

});

const infoButtons = document.querySelectorAll('#info');
infoButtons.forEach(info => {
    info.addEventListener('click', () => {
        console.log('clicked');

    });

    info.addEventListener('mouseover', () => {
        console.log('hover no');
        document.body.style.cursor = 'pointer';

    });

    info.addEventListener('mouseleave', () => {
        console.log('hover');
        document.body.style.cursor = 'default';

    });
});





