# automated-milestones

> A GitHub App built with [Probot](https://github.com/probot/probot) that allows milestones (created in gitub) to be closed automatically via a git commit message.

## How
Writing `completes m_id`  (id being the milestone number) within a commit message, will automatically close a milestone and add a reference to that commit within the milestone description. The status of the commit will be modified, creating a direct link to the milestone under `Details`. 

![alt text](https://github.com/Beadsley/automated-milestones/blob/refactor/commit-message.png)

## Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## License

[ISC](LICENSE) © 2020 beadsley <danbeadleson@gmail.com>
