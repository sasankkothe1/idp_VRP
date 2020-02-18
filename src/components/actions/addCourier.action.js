import AddCourierDispatcher from '../dispatchers/addCourier.dispatcher';
import AddCourierService from '../services/addCourier.service';

class AddCourierAction {

    addCourier(courierOption) {
        AddCourierService.sendCourierOptions(courierOption)
            .then(()=> {
                AddCourierDispatcher.dispatch({
                    actionType : 'ADDED_COURIER',
                    value : 200
                })
            })
    }
}

export default new AddCourierAction()