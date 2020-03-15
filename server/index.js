const { findMilestoneIds, getMilestones, getMilestoneById, updateMilestone, } = require('./milestones');
const express = require('express');
const router = express();

/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {

  app.log('app successfully loaded!')

  router.use(express.static('client/public'))
  router.listen(8080, async () => {

    app.log(`Miletsones: http://localhost:8080/`);

  });

  router.get('/api/milestones', async (req, res) => {

    const milestones = await getMilestones();
    res.json(milestones);

  });

  app.on('push', async context => {

    app.log.info('push open:')
    app.log.info('commit url', context.payload.commits[0].url);
    app.log.info('REPO: ', context.payload.repository.name);
    app.log.info('ID: ', context.payload.commits[0].id);
    app.log.info('Message: ', context.payload.head_commit.message);
    
    const repo = context.payload.repository.name;
    const commitmessage = context.payload.head_commit.message;
    const commit_url = context.payload.commits[0].url;


    const milestoneids = await findMilestoneIds(commitmessage);
    const id = milestoneids[0];
    app.log.info('milestone: ', id);

    if (id !== undefined) {

      const milestone = await getMilestoneById(id);
      updateMilestone(milestone.id, milestone.title, `${milestone.description} commit:${commit_url}`, milestone.due_on);

      const params = {
        sha: context.payload.commits[0].id,
        "target_url": `${milestone.url}`,
        context: 'milestone',
        state: 'success',
        description: `${milestone.title}`
      }
      return context.github.repos.createStatus(context.repo(params));
    }
  })
}

module.exports.router = router;

