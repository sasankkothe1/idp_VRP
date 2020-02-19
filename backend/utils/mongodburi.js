//import MapConfig from '../../src/mapconfig';

const dburi = "mongodb+srv://idp123:idp123@idp-n6nj8.mongodb.net/IDP?retryWrites=true&w=majority"

const getURI = () => {
    return dburi;
}

module.exports = { getURI }