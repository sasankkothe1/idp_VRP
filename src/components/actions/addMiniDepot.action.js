import AddMiniDepotDispatcher from '../dispatchers/addMiniDepot.dispatcher';
import AddMiniDepotService from '../services/addMiniDepot.service';

class AddMiniDepotAction {

    addMiniDepot(miniDepotOptions) {
        AddMiniDepotService.sendMiniDepotOptions(miniDepotOptions)
            .then(()=> {
                AddMiniDepotDispatcher.dispatch({
                    actionType : 'ADDED_MINI_DEPOT',
                    value : 200
                })
            })
    }
}

export default new AddMiniDepotAction()