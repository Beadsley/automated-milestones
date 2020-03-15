const fetch = require('node-fetch')
var moment = require('moment')
const REPO = 'Extra-Salty'
const USER = 'Beadsley'
const ACCESSTOKEN = process.env.TOKEN

/**
 * makes a request to a specified github api endpoint
 * @param {endpoint} endpoint
 */

const fetchFromGithubAPI = async (endpoint) => {
  const api_call = await fetch(`https://api.github.com${endpoint}`, {
    method: 'get',
    headers: {
      Authorization: `token ${ACCESSTOKEN}`
    }
  })
  const data = await api_call.json()
  return { data }
}
/**
 * searches a specified commit message for
 * 'completes m_id' and returns the id if
 * found
 * @param {*} commit
 */
const findMilestoneIds = async (commit) => {
  const regex = /completes\s*m\_\d+/ig
  let result
  const ids = []
  while ((result = regex.exec(commit)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (result.index === regex.lastIndex) {
      regex.lastIndex++
    }
    // The result can be accessed through the `m`-variable.
    result.forEach(async (match, groupIndex) => {
      const milestone_id = /\d+/.exec(match)[0]
      ids.push(milestone_id)
      console.log(`Milestone number: ${milestone_id}`)
    })
  }
  return ids
}

/**
 * gets all milestones from a specified
 * repo and returns necessary milestone
 * information
 * GET /repos/:owner/:repo/milestones
 */
const getMilestones = async () => {
  const response = await fetchFromGithubAPI(`/repos/${USER}/${REPO}/milestones?state=all`)
  const currentDate = new Date()

  const milestones = response.data.map(milestone => {
    const dueDate = Date.parse(milestone.due_on)
    const formattedDate = moment(dueDate).format('MMM Do')

    if (currentDate > dueDate && milestone.state === 'open') { milestone.state = 'over' }
    return {
      url: milestone.html_url,
      title: milestone.title,
      description: milestone.description,
      state: milestone.state,
      due: formattedDate
    }
  })

  return milestones
}
/**
 * gets a milestone by milestone number
 *
 * GET /repos/:owner/:repo/milestones/:milestone_number
 *
 * @param {id} milestone_number
 */
const getMilestoneById = async (id) => {
  const github = await fetchFromGithubAPI(`/repos/${USER}/${REPO}/milestones/${id}`)
  return milestone = {
    id: github.data.number,
    title: github.data.title,
    description: github.data.description,
    due_on: github.data.due_on,
    url: github.data.html_url
  }
}
/**
 * Updates a milestone when an id
 * and necessary milestone info
 * is specified
 *
 * PATCH /repos/:owner/:repo/milestones/:milestone_number
 *
 * @param {id} milestone_number
 * @param {title} title
 * @param {description} description
 * @param {due} due_date
 */
const updateMilestone = (id, title, description, due) => {
  fetch(`https://api.github.com/repos/${USER}/${REPO}/milestones/${id}`, {
    method: 'patch',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token ${ACCESSTOKEN}`
    },
    body: JSON.stringify({
      title: title,
      state: 'closed',
      description: description,
      due_on: due
    })
  }).then(response => response.json()).then(json => console.log(json))
}

module.exports = {
  findMilestoneIds,
  getMilestones,
  getMilestoneById,
  updateMilestone
}
