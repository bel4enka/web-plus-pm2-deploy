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
      'pre-setup': 'rm -rf web-plus-pm2-deploy',
      'pre-deploy-local': `scp ./.env.deploy ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'pre-deploy': 'cd backend && rm -rf node_modules dist',
      'post-deploy': "cd backend && echo -e 'NODE_ENV=production' >> .env && echo -e 'JWT_SECRET=JWT_SECRET' >> .env && npm install && npm run build && pm2 start",
    },
  },
};
