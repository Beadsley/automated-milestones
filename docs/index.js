const milestoneExample =
  [
    {
      url: 'https://github.com/Beadsley/automated-milestones/milestone/1',
      title: 'Database',
      description: 'Set up data storage. commit:https://github.com/Beadsley/automated-milestones/commit/d30227f7ad99a61dbc43c5d02ba4ccd82f877d24',
      state: 'closed',
      due: 'Mar 2nd'
    },
    {
      url: 'https://github.com/Beadsley/automated-milestones/milestone/2',
      title: 'Build API',
      description: 'Create a Restful API.',
      state: 'over',
      due: 'Mar 9th'
    },
    {
      url: 'https://github.com/Beadsley/automated-milestones/milestone/3',
      title: 'UX',
      description: 'Make it look pretty.',
      state: 'open',
      due: 'Mar 18th'
    },
    {
      url: 'https://github.com/Beadsley/automated-milestones/milestone/6',
      title: 'Ready to release',
      description: 'Ready to deploy',
      state: 'open',
      due: 'Mar 27th'
    },
    {
      url: 'https://github.com/Beadsley/automated-milestones/milestone/5',
      title: 'UI',
      description: 'Make it useable commit.',
      state: 'open',
      due: 'Mar 30th'
    },
    {
      url: 'https://github.com/Beadsley/automated-milestones/milestone/4',
      title: 'Interactive app',
      description: 'Basic functionality implemented.',
      state: 'open',
      due: 'Apr 6th'
    },
    {
      url: 'https://github.com/Beadsley/automated-milestones/milestone/7',
      title: 'Feature complete',
      description: 'Ready for final testing.',
      state: 'open',
      due: 'Apr 20th'
    }
  ]

window.addEventListener('load', async () => {
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
