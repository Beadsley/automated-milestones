//!pending                #ff7043       access_time
//!overtime                 #d32f2f     alarm_off
//!done                #43a047           alarm_on        

window.addEventListener('load', async () => {
    console.log('onload');
    const res = await fetch('/api/milestones');
    const milestones = await res.json()
    console.log(milestones);
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





