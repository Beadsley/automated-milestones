const { findMilestoneIds, getMilestones, getMilestoneById, updateMilestone, } = require('./milestones');
const express = require('express');
const router = express();

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
  });

  router.get('/api/milestones', async (req, res) => {
    const milestones = await getMilestones();
    res.json(milestones);
  });


  // Your code here
  app.log('Yay, the app was loaded!', ACCESSTOKEN)


  app.on('push', async context => {
    app.log.info('push open:')
    app.log.info('commit url', context.payload.commits[0].url);
    app.log.info('REPO: ', context.payload.repository.name);
    app.log.info('ID: ', context.payload.commits[0].id);
    app.log.info('Message: ', context.payload.head_commit.message);
    const repo = context.payload.repository.name;
    const commitmessage = context.payload.head_commit.message;
    const milestoneids = await findMilestoneIds(commitmessage);
    const commit_url = context.payload.commits[0].url;
    app.log.info('milestone: ', milestoneids[0]);

    const milestone = await getMilestoneById(milestoneids[0]);


    updateMilestone(milestone.id, milestone.title, `${milestone.description} commit:${commit_url}`, milestone.due_on);

    app.log.info('URL: ', milestone.url);


    const params = {
      sha: context.payload.commits[0].id,
      "target_url": `${milestone.url}`,
      context: 'milestone',
      state: 'success',
      description: `${milestone.title}`
    }
    return context.github.repos.createStatus(context.repo(params));
  })
}

module.exports.router = router;

