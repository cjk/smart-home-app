module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'SMTHOME-APP',
      script: 'npm --name "next" -- start',
      kill_timeout: 3000,
      env: {
        PORT: 3000,
        BACKEND_ADDR: 'localhost',
        DEBUG: 'smt:*,error,debug',
      },
      env_production: {
        NODE_ENV: 'production',
        BACKEND_ADDR: '192.168.1.28',
        DEBUG: 'smt:*,error',
      },
    },
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: 'cjk',
      host: '192.168.1.28',
      ref: 'origin/master',
      repo: 'git@github.com:cjk/smart-home-app.git',
      path: '/home/cjk/apps/smarthome-app',
      'post-deploy':
        'yarn install && yarn run build && pm2 reload ecosystem.config.js --env production',
    },
  },
};
