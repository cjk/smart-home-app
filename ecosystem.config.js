module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'smthome-app',
      script: 'npm',
      args: 'run-script start',
      kill_timeout: 3000,
      env: {
        DEBUG: 'smtApp:*,error,debug',
      },
      env_production: {
        NODE_ENV: 'production',
        DEBUG: 'smtApp:*,error',
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
