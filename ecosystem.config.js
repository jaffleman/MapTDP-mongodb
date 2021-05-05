module.exports = {
    apps : [{
      script: 'server.js',
      watch: '.',
      ignore_watch: ['log.txt',"node_modules"]
    },],
  
    deploy : {
      production : {
        user : 'freebox',
        host : '192.168.0.29',
        ref  : 'origin/main',
        repo : 'https://github.com/jaffleman/MapTDP-mongodb.git',
        path : '/home/freebox/MapTDP-mongodb',
        'pre-deploy-local': '',
        'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
        'pre-setup': ''
      }
    }
  };