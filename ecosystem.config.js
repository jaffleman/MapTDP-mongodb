module.exports = {
    apps : [{
      script: 'server.js',
      watch: '.'
    },],
  
    deploy : {
      production : {
        user : 'freebox',
        host : '192.168.0.29',
        ref  : 'origin/main',
        repo : 'https://github.com/jaffleman/MapTDP-mongodb.git',
        path : '/home/jaffleman/MapTDP-mongodb',
        'pre-deploy-local': '',
        'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
        'pre-setup': ''
      }
    }
  };