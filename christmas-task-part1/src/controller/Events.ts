class Event {
    listeners: genericFunc[];
    constructor() {
        this.listeners = [];
    }

    addListener(listener: <T>(attr?: T) => void) {
        this.listeners.push(listener);
    }

    trigger<T>(params?: T) {
        this.listeners.forEach((listener) => {
            listener(params);
        });
    }
}

type genericFunc = <T>(attr?: T) => void;

export default Event;
