const dotenev = require('dotenv');

dotenev.config({ path: '.env.deploy' });

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF = 'origin/master',
} = process.env;

module.exports = {
  apps: [
    {
      name   : "app-frontend",
      script : ".src/index.js"
    },
  ],

  deploy : {
    production : {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'https://github.com/bel4enka/web-plus-pm2-deploy.git',
      path: DEPLOY_PATH,
      'post-deploy' : 'cd frontend && npm install && npm run build',
    }
  }
};
