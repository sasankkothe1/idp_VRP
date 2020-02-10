//this store variable is responsible for holding whatever data changes occur in map component

import {EventEmitter} from 'events';
import DirectionTextDispatcher from '../dispatchers/directionText.dispatcher'

let _store = {
    directionsRenderer : null
}

class DirectionTextStore extends EventEmitter {
    constructor(){
        super();
        this.dispatchToken = DirectionTextDispatcher.register(this.dispatcherCallback.bind(this))
    }
    emitChange(eventName){
        this.emit(eventName)
    }

    async dispatcherCallback(action) {
        switch(action.actionType) {
            case 'GOT_DIRECTIONS':
                this.setDirecitonRenderer(action.value);
                break;
            default: break;
        }
        this.emitChange(action.actionType);

        return true;

    }


    setDirecitonRenderer(directionsRenderer) {
        _store.directionsRenderer = directionsRenderer;
    }

    getDirecitonRenderer() {
        return _store.directionsRenderer;
    }

    addChangeListener(eventName, callback) {
        this.on(eventName, callback);
    }

    removeChangeListener(eventName, callback) {
        this.removeListener(eventName, callback);
    }


}
export default new DirectionTextStore()