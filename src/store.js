const redux = require('redux')

const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'

 const fetchUserSuccess = data => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: data
    }
    
}
const initialState = {
    loading: false,
    data: [],
    error: ''
}
console.log("hk",initialState.data);
const reducer = (state = initialState, action) => {

    switch (action.type) {

        // case FETCH_USERS_REQUEST:
        //     return {
        //         ...state,
        //         loading: true
        //     }
        case FETCH_USERS_SUCCESS:

            return {
                loading: false,
                data: action.payload,
                error: ''
            }
            // case FETCH_USERS_FAILURE:
            //     return {
                //         loading: false,
                //         data: [],
                //         error: action.payload
                //     }
                default:
                    
                }
            }

             const store = createStore(reducer, applyMiddleware(thunkMiddleware))
        export default store;