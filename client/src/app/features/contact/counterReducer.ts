export interface ICounterState {
    data: number,
    title: string,
}
// a reducer in redux needs some initial state
const initialState: ICounterState = {
    data: 42,
    title: 'redux counter',
}
// actions are dispatched to reducers to change the state in some way
export default function counterReducer(state = initialState, action: any) {
    return state;
}
