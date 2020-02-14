import MapDispatcher from '../dispatchers/map.dispatcher';
import SendLocationService from '../services/sendLocation.service';

class ShowRouteActions {

    showroute(userOptions) {
        SendLocationService.sendUserOptions(userOptions)
            .then((finalRoute)=> {
                MapDispatcher.dispatch({
                    actionType : 'SHOW_ROUTE',
                    value : finalRoute
                })
            })
    }
}

export default new ShowRouteActions()