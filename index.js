const express = require('express');
const router = express();
const fetch = require('node-fetch');

const REPO = 'Simple-Website-using-HTML-CSS-and-Javascript-';
const USER = 'Beadsley';
let ACCESSTOKEN;


/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {
  ACCESSTOKEN = process.env.TOKEN;

  router.use(express.static('client/public'))
  router.listen(8080, async () => {
    console.log('http://localhost:8080/');
    
    const result = getMilestones();
    console.log(result);
    

  });
  // Your code here
  app.log('Yay, the app was loaded!', ACCESSTOKEN)


  app.on('push', async context => {
    app.log.info('push open:')
    app.log.info(context.payload.after);
    app.log.info('REPO: ', context.payload.repository.name);
    app.log.info('ID: ', context.payload.commits[0].id);
    app.log.info('Message: ', context.payload.head_commit.message);

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
  const milestones = await fetchFromGithubAPI(`/repos/${USER}/${REPO}/milestones`);
  console.log(milestones);
}

