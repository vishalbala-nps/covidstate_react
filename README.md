# covidstate_react
React Web UI For covidstate.in
## Setup
### Prerequisites
- Node.js v14.x
- Git
- (optional) Docker
### Installation
- Clone the repo by running: `git clone https://github.com/vishalbala-nps/covidstate_api && cd covidstate_react`
- Install the necessary modules by running: `npm install`
### Configuration
You can configure the API URL by editing `src/components/api_url.js`. By default, the API is set to the covidstate.in api
### Running the project
After installation and configuration, you can run the project by running: `npm start`
### Building for production
Run `npm run build` in order to build the respective js and html files for deploying in production. You can use Apache, Nginx etc for hosting these files
### Building Docker container
You can run this project in a docker container too. The docker container uses Nginx in order to do so.
In order to build the docker container, simply run: `npm run build-docker`
