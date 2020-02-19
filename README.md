This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This project mainly focuses on "Metaheuristics for the last-mile delivery problem with crowd-shipping"

# Please follow the following steps to run the project.

### Pre-requisites

1. Ensure that you have the latest version of the Node.js downloaded. Please follow the following link for the Node.js installations 
[here](https://nodejs.org/en/download/)

2. Once node js is downloaded, please download the project from the git repository. And go into the folder using <br> `cd idp_VRP-master`

3. Move to folder src `cd src` and create a file with name `mapconfig.js` and paste in the following code in this file
```javascript
    let MapConfig = { 
        GOOGLE_MAPS_API_KEY: "<place your google maps api key here" 
    };
    export default MapConfig;
````
Ensure that **Google maps api key*** is included in the above code.

4. To install nodejs frontend dependecies, go to the parent folder, please run `npm install` in this directory.

5. To install nodejs backened dependcies, go to backend folder `cd backend` from the parent directory and run `npm install`.

6. In the same backend folder, open `.env` file and enter the **Google maps api key** here also.

6. To run the backend, go to the backend folder `cd backend` and enter the command `nodemon server.js`.

7. To run the frontend, go to the parent folder and run `npm start`. By this time, a browser should open and open the web application. If it doesn't open, please type in the following URL in the browser `http://localhost:3000/`

###About the database installation.

There is no need to install the database into the localhost. The database is already configured in the online [MongoDB Atlas Cloud](https://www.mongodb.com/cloud/atlas). 

Incase if you have any other end point for the MongoDB in your server, then you can include the endpoint uri in `mongodburi.js` file which is present in `backend\utils` folder.
