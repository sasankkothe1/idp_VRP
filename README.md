This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This project mainly focuses on "Metaheuristics for the last-mile delivery problem with crowd-shipping"

# Please follow the following steps to run the project.

### Pre-requisites

1. Ensure that you have the latest version of the Node.js downloaded. Please follow the following link for the Node.js installations
   [here](https://nodejs.org/en/download/)

2. Once node js is downloaded, please download the project from the git repository. And go into the folder using <br> `cd idp_VRP-master`

3. Run `sh mapconfig.sh` and follow the prompts.

4. To install both frontend and backend dependencies, run `npm run depInstall` from the parent folder.

   > To install all the dependencies properly, it is suggested to run the above command twice or thrice.

5. To run the project, run the command `npm run startProject` from the parent folder. This command starts both frontend and backend.

6. By this time, a browser should open and open the web application. If it doesn't open, please type in the following URL in the browser `http://localhost:3000/`

### About the database installation

There is no need to install the database into the localhost. The database is already configured in the online [MongoDB Atlas Cloud](https://www.mongodb.com/cloud/atlas).

Incase if you have any other end point for the MongoDB in your server, then you can include the endpoint uri in `mongodburi.js` file which is present in `backend\utils` folder.
