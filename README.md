# trackerdashboar

## Dashboard

- Open command prompt in root folder.
- Go to dashboard folder.
- run <i>npm install</i> command to install node modules.
- Then run <i>npm run dev</i> command to start.

## Server

- Open command prompt in root folder.
- Go to dashboard folder.
- run <i>npm install</i> command to install node modules.
- To add database
  - create a service on timescaleDB. Download the credentials file.
  - paste the connection string in .env file
  - update the credentials in config/config.json folder
  - then run command <i>npx sequelize db:migrate</i> from root of server folder.
- To install fusion auth run
  - <i>. { iwr -useb https://raw.githubusercontent.com/FusionAuth/fusionauth-install/master/install.ps1 } | iex; install</i>
- To run fusion auth type below command
  - ./fusionauth/bin/startup.ps1
  - To begin, access FusionAuth by opening a browser to http://localhost:9011
  - open fusion auth. Add the credentials for database. And create account
  - Then register new application in it and create an API key.
  - Paste the application id and api key in .env file
- Then run <i>npm run server</i> command to start server.
