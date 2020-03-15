
window.addEventListener('load', async () => {
  const response = await fetch('/api/milestones')
  const milestones = await response.json()
  renderMilestones(milestones)
  buttons(milestones)
})

const buttons = (milestones) => {
  const infoButtons = document.querySelectorAll('#info')

  infoButtons.forEach((info, index) => {
    info.addEventListener('click', () => {
      renderMilestoneInfo(milestones[index], index)
    })

    info.addEventListener('mouseover', () => {
      document.body.style.cursor = 'pointer'
    })

    info.addEventListener('mouseleave', () => {
      document.body.style.cursor = 'default'
    })
  })
}

const renderMilestoneInfo = (milestone, index) => {
  let milestoneDescription
  const regex = /^(.+?)(?=commit)/gm
  const description = regex.exec(milestone.description)

  if (description !== null) {
    milestoneDescription = description[0]
    console.log('description: ', description[0])
  } else {
    milestoneDescription = milestone.description
  }

  const html =
        `
        <h3> ${milestoneDescription}</h3>       
        <a href="${milestone.url}">  <img class="github" src="./github.png" width="80" height="32" > <a> 
        `
  const container = document.querySelector(`.info-container-${index}`)
  container.innerHTML = html
}

const renderMilestones = (milestones) => {
  const html = milestones
    .map((x, index) => {
      let colour
      let icon

      if (x.state === 'open') {
        colour = '#ff7043'
        icon = 'alarm_time'
      } else if (x.state === 'closed') {
        colour = '#43a047'
        icon = 'alarm_on'
      } else {
        colour = '#d32f2f'
        icon = 'alarm_off'
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
                 `
    })

  const container = document.querySelector('.milestones-container')
  container.innerHTML = html.join('<i class="material-icons md-48">keyboard_arrow_right</i>')
}
