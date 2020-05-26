
# covidstate_react
![Build and Test Docker Image](https://github.com/vishalbala-nps/covidstate_react/workflows/Build%20and%20Test%20Docker%20Image/badge.svg)

React Web UI for covidstate.in (http://covidstate.in)

## Prerequisites
- Node.js and NPM Installed
- Docker (for building production Docker image)
## Installation
- Begin by cloning this repo by running: `git clone http://github.com/vishalbala-nps/covidstate_react`
-   Change your working dir:  `cd covidstate_react`
- Install all the required dependencies and start the server by running: `npm install && npm start`
## Building production Docker image
- Run the command: `npm run build-docker`. This will build the production Docker Image
- Start the Container by running `docker run -p 8081:8081 covidstate_react`. The web server will be accessible on the port 8081
