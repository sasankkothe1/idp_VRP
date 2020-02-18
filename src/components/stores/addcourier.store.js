import {EventEmitter} from 'events';
import AddCourierDispatcher from '../dispatchers/addCourier.dispatcher';

let _store = {
    successMessage: null
}

class AddCourierStore extends EventEmitter {
    constructor(){
        super();
        this.dispatchToken = AddMiniDepotDispatcher.register(this.dispatcherCallback.bind(this))
    }
    emitChange(eventName){
        this.emit(eventName)
    }

    async dispatcherCallback(action) {
        switch(action.actionType) {
            case 'ADDED_COURIER':
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
export default new AddCourierStore()