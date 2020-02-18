import config from "../../config";
import axios from "axios";

export default class AddCourierService {
    constructor() {

    }

    static baseURL(){
        return `http://${config.BACKEND_URL}:${config.BACKEND_PORT}/addCourier`
    }

    static async sendCourierOptions(courierOption){
        let sentCourier = await axios.post(AddCourierService.baseURL() + "/", courierOption);
        if (sentCourier.status===200){
            console.log(sentCourier.data)
            return sentCourier.data
        } else {
            console.log(sentCourier.message);
        }
    }
}
