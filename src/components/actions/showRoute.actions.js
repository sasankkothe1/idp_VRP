import MapDispatcher from '../dispatchers/map.dispatcher';
import SendLocationService from '../services/sendLocation.service';

class ShowRouteActions {

    // showroute(userOptions) {
    //     MapDispatcher.dispatch({
    //         actionType: 'SHOW_ROUTE',
    //         value: userOptions
    //     })
    // }

    // showroute(userOptions) {
    //     SendLocationService.sendUserOptions(userOptions)
    //         .then((directions) => {
    //             MapDispatcher.dispatch({
    //                 actionType: 'SHOW_ROUTE',
    //                 value: directions
    //             });
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //             MapDispatcher.dispatch({
    //                 actionType : 'GOT_SHOW_ROUTE',
    //                 value: error
    //             });
    //         })
    // }

    showroute(userOptions) {
        SendLocationService.sendUserOptions(userOptions);
    }
    
    setDirectionText(directionsRenderer) {
        MapDispatcher.dispatch({
            actionType : 'GOT_DIRECTIONS',
            value: directionsRenderer
        })
    }
}

export default new ShowRouteActions()