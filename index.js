const express = require('express');
const router = express();
const fetch = require('node-fetch');
var moment = require('moment');

const REPO = 'Simple-Website-using-HTML-CSS-and-Javascript-';
const USER = 'Beadsley';
let ACCESSTOKEN;


/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {
  ACCESSTOKEN = process.env.TOKEN;
  commitMessages();
  router.use(express.static('client/public'))
  router.listen(8080, async () => {
    console.log('http://localhost:8080/');
  });

  router.get('/api/milestones', async (req, res) => {
    const milestones = await getMilestones();
    res.json(milestones);
  });


  // Your code here
  app.log('Yay, the app was loaded!', ACCESSTOKEN)


  app.on('push', async context => {
    app.log.info('push open:')
    app.log.info(context.payload.after);
    app.log.info('REPO: ', context.payload.repository.name);
    app.log.info('ID: ', context.payload.commits[0].id);
    app.log.info('Message: ', context.payload.head_commit.message);
    const repo=context.payload.repository.name;
    const commitmessage=context.payload.head_commit.message;

    const params = {
      sha: context.payload.commits[0].id,
      "target_url": `https://github.com/Beadsley/Simple-Website-using-HTML-CSS-and-Javascript-/milestone/5`,
      context: 'milestone',
      state: 'success',
      description: `wubba dub dub`
    }
    return context.github.repos.createStatus(context.repo(params));
    // const issueComment = context.issue({ body: 'Thanks for opening this issue!' })
    // return context.github.issues.createComment(issueComment)
  })

  app.on('issues.opened', async context => {
    const issueComment = context.issue({ body: 'Thanks for opening this issue!' })
    return context.github.issues.createComment(issueComment)
  })

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}


/** 
 * makes a request to a specified github api endpoint
 * @param {*} endpoint 
 */

const fetchFromGithubAPI = async (endpoint) => {
  const api_call = await fetch(`https://api.github.com${endpoint}`, {
    method: 'get',
    headers: {
      "Authorization": `token ${ACCESSTOKEN}`
    }
  });
  const data = await api_call.json();
  return { data };
}

/**
* List all milestones
* GET /repos/:owner/:repo/milestones
* @param {*} id 
*/
const getMilestones = async () => {
  const response = await fetchFromGithubAPI(`/repos/${USER}/${REPO}/milestones?state=all`);
  const currentDate = new Date();
  console.log(response);
  
  const milestones = response.data.map(milestone => {
    const dueDate = Date.parse(milestone.due_on);
    const formattedDate = moment(dueDate).format("MMM Do");

    if (currentDate > dueDate && milestone.state === "open") { milestone.state = "over" }
    return {
      url: milestone.html_url,
      title: milestone.title,
      description: milestone.description,
      state: milestone.state,
      due: formattedDate
    }
  });

  return milestones;
}

const commitMessages = async () => {
  const commit = "completes #4  completes #5"
  const regex = /completes\s*\#\d+/ig;
  
      let m;
      while ((m = regex.exec(commit)) !== null) {
          // This is necessary to avoid infinite loops with zero-width matches
          if (m.index === regex.lastIndex) {
              regex.lastIndex++;
          }
          // The result can be accessed through the `m`-variable.
          m.forEach(async (match, groupIndex) => {
              console.log(`Found match, group ${groupIndex}: ${match}`);
              const id = /\d+/.exec(match)[0];
              console.log(`Milestone number: ${id}`);
              const milestone = await getMilestone(id);
              updateMilestone(milestone.id, milestone.title, milestone.description, milestone.due_on);
          });
      }
}
const getMilestone = async (id) => {
  const github = await fetchFromGithubAPI(`/repos/${USER}/${REPO}/milestones/${id}`);
  return milestone = {
      "id": github.data.number,
      "title": github.data.title,
      "description": github.data.description,
      "due_on": github.data.due_on
  }
}

const updateMilestone = (id, title, description, due) => {
  fetch(`https://api.github.com/repos/${USER}/${REPO}/milestones/${id}`, {
      method: 'patch',
      headers: {
          "Content-Type": "application/json",
          "Authorization": `token ${ACCESSTOKEN}`
      },
      body: JSON.stringify({
          "title": title,
          "state": "closed",
          "description": description,
          "due_on": due
      })
  }).then(response => response.json()).then(json => console.log(json));
}

module.exports.router = router;

