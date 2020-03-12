//!pending                #ff7043       access_time
//!overtime                 #d32f2f     alarm_off
//!done                #43a047           alarm_on        

window.addEventListener('load', async () => {
    console.log('onload');
    const res = await fetch('/api/milestones');
    const milestones = await res.json()
    console.log(milestones);
    renderMilestones(milestones);
    buttons(milestones);
});

const buttons = (milestones) => {
    const infoButtons = document.querySelectorAll('#info');
    infoButtons.forEach((info, index) => {
        console.log('here');

        info.addEventListener('click', () => {
            console.log('clicked', index);
            renderMilestoneInfo(milestones[index], index);
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
}

const renderMilestoneInfo = (milestone, index) => {
    console.log(milestone);
    html= `
        <p> ${milestone.description}</p>
        <p> ${milestone.state}</p>
        <a href="${milestone.url}"> Click <a> 
    `
    console.log(html);
    const container = document.querySelector(`.info-container-${index}`);
    container.innerHTML = html;
}


const renderMilestones = (milestones) => {
    const html = milestones
        .map((x, index) => {
            let colour;
            let icon;
            if (x.state === "open") {
                colour = "#ff7043";
                icon = "alarm_time";
            }
            else if (x.state === "closed") {
                colour = "#43a047";
                icon = "alarm_on";
            }
            else {
                colour = "#d32f2f";
                icon = "alarm_off";
            }
            return `
        <div class="milstone-container">
        <h2>${x.due}</h1>
        <div class="milestone arrow" style="background-color: ${colour};">
            <div class="info-container-${index}">
                <h3> ${x.title} </h1>
                <i class="material-icons info-btn md-48">${icon}</i></span>
            </div>

        </div>
        <div class="circle-container" ">
            <span class="info-circle" id="info" style="background-color: ${colour};"><i class="material-icons info-btn md-36">info</i></span>
            <span class="first-circle"></span>
            <span class="second-circle"></span>
            <span class="third-circle"></span>
            <span class="fourth-circle"></span>
        </div>

    </div>

    <i class="material-icons md-48">keyboard_arrow_right</i>


                        `});

    const container = document.querySelector('.milestones-container');
    container.innerHTML = html.join('');
}





