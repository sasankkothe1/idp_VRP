#!/bin/bash

echo "paste the google maps api key here: "
read api_key

echo "--> creating mapconfig.js file in src folder" 
cat << EOF > src/mapconfig.js
let MapConfig = { 
        GOOGLE_MAPS_API_KEY: "$api_key"
    };
    export default MapConfig;
EOF

echo "--> creating .env file in backend folder"
cat << EOF > src/.env
GOOGLE_MAPS_API_KEY=$api_key
EOF


echo "**********************************************************"
echo "||||||||||||||||||||||||||||||||||||||||||||||||||||||||||"
echo "paste --> npm run startProject <-- in terminal"
echo "||||||||||||||||||||||||||||||||||||||||||||||||||||||||||"
echo "**********************************************************"