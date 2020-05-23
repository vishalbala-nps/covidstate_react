
# covidstate_react

React Web UI for covidstate.in.

## Prerequisites
- Node.js and NPM Installed
- Docker (for building production Docker image)
## Installation
- Begin by cloning this repo by running: `git clone http://github.com/vishalbala-nps/covidstate_react`
-   Change your working dir:  `cd covidstate_react`
- Install all the required dependencies and start the server by running: `npm install && npm start`
## Building production Docker image
- Run the command: `npm run build-docker`. This will build the production Docker Image
- Start the Container by running `docker run -p 81:80 covidstate_react`. The web server will be accessible on the port 81
