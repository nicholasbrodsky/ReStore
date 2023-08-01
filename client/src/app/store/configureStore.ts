import { createStore } from "redux"
import counterReducer from "../features/contact/counterReducer"

export {}
// each redux app has single store containing all of our states
export function configureStore() {
    return createStore(counterReducer);
}

