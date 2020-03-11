/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {
  // Your code here
  app.log('Yay, the app was loaded!')
  const ACCESSTOKEN=process.env.TOKEN;

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
      state: 'success' ,
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
