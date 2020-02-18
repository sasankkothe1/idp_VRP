import {EventEmitter} from 'events';
import AddMiniDepotDispatcher from '../dispatchers/addMiniDepot.dispatcher';

let _store = {
    successMessage: null
}

class AddMiniDepotStore extends EventEmitter {
    constructor(){
        super();
        this.dispatchToken = AddMiniDepotDispatcher.register(this.dispatcherCallback.bind(this))
    }
    emitChange(eventName){
        this.emit(eventName)
    }

    async dispatcherCallback(action) {
        switch(action.actionType) {
            case 'ADDED_MINI_DEPOT':
                this.setSuccessMessage(action.value);
                break;
            default: break;
        }
        this.emitChange(action.actionType);

        return true;

    }

    setSuccessMessage(successMessage) {
        _store.successMessage = successMessage;
    }

    getSuccessMessage() {
       return _store.successMessage;
    }

    addChangeListener(eventName, callback) {
        this.on(eventName, callback);
    }

    removeChangeListener(eventName, callback) {
        this.removeListener(eventName, callback);
    }


}
export default new AddMiniDepotStore()