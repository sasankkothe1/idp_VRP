import MapDispatcher from '../dispatchers/map.dispatcher'

class ShowRouteActions {

    showroute(userOptions) {
        MapDispatcher.dispatch({
            actionType: 'SHOW_ROUTE',
            value: userOptions
        })
    }
    
    setDirectionText(directionsRenderer) {
        MapDispatcher.dispatch({
            actionType : 'GOT_DIRECTIONS',
            value: directionsRenderer
        })
    }
}

export default new ShowRouteActions()