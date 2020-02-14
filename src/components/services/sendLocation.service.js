import config from "../../config";
import axios from "axios";

export default class SendLocationService {
    constructor() {

    }

    static baseURL(){
        return `http://${config.BACKEND_URL}:${config.BACKEND_PORT}/getDirections`
    }

    static async sendUserOptions(userOptions){
        let getDirection = await axios.post(SendLocationService.baseURL() + "/", userOptions);
        if (getDirection.status===200){
            console.log(getDirection.data)
            return getDirection.data
        } else {
            console.log(getDirection.message);
        }
    }
}
