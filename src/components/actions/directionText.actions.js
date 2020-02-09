import DirectionTextDispatcher from '../dispatchers/directionText.dispatcher'

class DirectionTextActions {

    
    setDirectionText(directionsRenderer) {
        DirectionTextDispatcher.dispatch({
            actionType : 'GOT_DIRECTIONS',
            value: directionsRenderer
        })
    }
}

export default new DirectionTextActions()