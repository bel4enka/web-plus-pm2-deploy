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
      script : './build/index.html',
    },
  ],

  deploy : {
    production : {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'https://github.com/bel4enka/web-plus-pm2-deploy.git',
      path: DEPLOY_PATH,
      'post-deploy' : `export PATH="/home/oxana/.nvm/versions/node/v14.21.1/bin:$PATH" cd ${DEPLOY_PATH}/source/frontend && npm i && npm run build`,
    }
  }
};
