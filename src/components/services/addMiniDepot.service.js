import config from "../../config";
import axios from "axios";

export default class AddMiniDepotService {
    constructor() {

    }

    static baseURL(){
        return `http://${config.BACKEND_URL}:${config.BACKEND_PORT}/addMiniDepot`
    }

    static async sendMiniDepotOptions(miniDepotOptions){
        let sentMiniDepot = await axios.post(AddMiniDepotService.baseURL() + "/", miniDepotOptions);
        if (sentMiniDepot.status===200){
            console.log(sentMiniDepot.data)
            return sentMiniDepot.data
        } else {
            console.log(sentMiniDepot.message);
        }
    }
}
