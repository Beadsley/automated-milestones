const milestoneExample =[
  {
      "url": "https://github.com/Beadsley/Extra-Salty/milestone/1",
      "title": "Database",
      "description": "Set up data storage commit:https://github.com/Beadsley/Extra-Salty/commit/06514bb4165058ae168f2b73203db6b93cd494ca commit:https://github.com/Beadsley/Extra-Salty/commit/06514bb4165058ae168f2b73203db6b93cd494ca",
      "state": "closed",
      "due": "Feb 10th"
  },
  {
      "url": "https://github.com/Beadsley/Extra-Salty/milestone/2",
      "title": "Build API",
      "description": "Create a Restful API commit:https://github.com/Beadsley/Extra-Salty/commit/c6532d125c890359f985d6a62f6e49753a8d263e",
      "state": "over",
      "due": "Feb 24th"
  },
  {
      "url": "https://github.com/Beadsley/Extra-Salty/milestone/3",
      "title": "UX",
      "description": "Make it look pretty commit:https://github.com/Beadsley/Extra-Salty/commit/1e3c159c00a7b8e368dc046301b6093cad35c5f7",
      "state": "open",
      "due": "Mar 16th"
  },
  {
      "url": "https://github.com/Beadsley/Extra-Salty/milestone/4",
      "title": "UI",
      "description": "Make it useable commit:https://github.com/Beadsley/Extra-Salty/commit/dd37adc74fe2bb09321e212e79fa62020439fb1f",
      "state": "open",
      "due": "Mar 30th"
  },
  {
      "url": "https://github.com/Beadsley/Extra-Salty/milestone/5",
      "title": "Interactive app",
      "description": "Basic functionality implemented  commit:https://github.com/Beadsley/Extra-Salty/commit/fa7fabbbcb21790ac6c140dca744b35a5005161a",
      "state": "open",
      "due": "Apr 6th"
  },
  {
      "url": "https://github.com/Beadsley/Extra-Salty/milestone/6",
      "title": "Feature complete",
      "description": "Ready for final testing",
      "state": "open",
      "due": "Apr 20th"
  },
  {
      "url": "https://github.com/Beadsley/Extra-Salty/milestone/7",
      "title": "Ready to release",
      "description": "Ready to deploy",
      "state": "open",
      "due": "Apr 27th"
  }
]


window.addEventListener('load', async () => {
  renderMilestones(milestoneExample)
  buttons(milestoneExample)
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
