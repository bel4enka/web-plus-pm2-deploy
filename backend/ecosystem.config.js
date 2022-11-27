const dotenev = require('dotenv');

dotenev.config({ path: '.env.deploy' });
const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF = 'origin/master',
} = process.env;

module.exports = {
  apps: [{
    name: 'api-service',
    script: './dist/app.js',
  }],

  // Настройка деплоя
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'https://github.com/bel4enka/web-plus-pm2-deploy.git',
      path: DEPLOY_PATH,
      //'pre-deploy': `scp ./*.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      //'post-deploy': 'npm i && npm run build',
      'post-deploy': 'export PATH="/home/oxana/.nvm/versions/node/v14.21.1/bin:$PATH" && npm i && npm run build',
    },
  },
};
