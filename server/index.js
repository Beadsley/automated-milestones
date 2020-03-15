const { findMilestoneIds, getMilestones, getMilestoneById, updateMilestone } = require('./milestones')
const express = require('express')
const router = express()

/**
 * The Probot app listeners to the Github webhook event, push.
 * Triggered on a push to a repository branch. when triggered
 * the commit message is evaluated. an express server is set up
 * to visually represent the milestone information of a specified
 * guthub repo.
 *
 * @param {import('probot').Application} app
 */
module.exports = app => {
  app.log('app successfully loaded!')

  router.use(express.static('client/public'))
  router.listen(8080, async () => {
    app.log('Miletsones: http://localhost:8080/')
  })

  router.get('/api/milestones', async (req, res) => {
    const milestones = await getMilestones()
    res.json(milestones)
  })

  app.on('push', async context => {
    const repo = context.payload.repository.name
    const commitmessage = context.payload.head_commit.message
    const commit_url = context.payload.commits[0].url

    const milestoneids = await findMilestoneIds(commitmessage)
    const id = milestoneids[0]
    app.log.info('milestone: ', id)

    if (id !== undefined) {
      const milestone = await getMilestoneById(id)
      updateMilestone(milestone.id, milestone.title, `${milestone.description} commit:${commit_url}`, milestone.due_on)

      const params = {
        sha: context.payload.commits[0].id,
        target_url: `${milestone.url}`,
        context: 'milestone',
        state: 'success',
        description: `${milestone.title}`
      }
      return context.github.repos.createStatus(context.repo(params))
    }
  })
}

module.exports.router = router
