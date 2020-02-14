//this store variable is responsible for holding whatever data changes occur in map component

import {EventEmitter} from 'events';
import MapDispatcher from '../dispatchers/map.dispatcher';

let _store = {
    finalRoute : null,
    directionsRenderer : null
}

class MapStore extends EventEmitter {
    constructor(){
        super();
        this.dispatchToken = MapDispatcher.register(this.dispatcherCallback.bind(this))
    }
    emitChange(eventName){
        this.emit(eventName)
    }

    async dispatcherCallback(action) {
        switch(action.actionType) {
            case 'SHOW_ROUTE':
                this.setFinalRoute(action.value);
                break;
            case 'GOT_DIRECTIONS':
                this.setDirecitonRenderer(action.value);
                break;
            default: break;
        }
        this.emitChange(action.actionType);

        return true;

    }

    setFinalRoute(finalRoute){
        _store.finalRoute = finalRoute;
    }

    getFinalRoute(){
        return _store.finalRoute;
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
export default new MapStore()