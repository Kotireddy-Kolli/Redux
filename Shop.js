//import redux from "redux"
const redux=require("redux")
const createStore=redux.createStore
const combineReducers=redux.combineReducers

const reduxLogger=require("redux-logger")
const logger=reduxLogger.createLogger()
const applyMiddleware=redux.applyMiddleware

const CAKE_ORDERED="CAKE_ORDERED"
const CAKE_RESTOCKED="CAKE_RESTOCKED"
const ICECREAM_ORDERED="ICECREAM_ORDERED"
const ICECREAM_RESTOKED="ICECREAM_RESTOKED"

function orderCake(){
    return {
        type: CAKE_ORDERED,
        quantity: 1,
    }
}
function cakeRestocked(qty=1){
    return {
        type: CAKE_RESTOCKED,
        quantity: qty,
    }
}
function orderIceCream(){
    return {
        type: ICECREAM_ORDERED,
        quantity: 1,
    }
}
function iceCreamRestocked(qty=1){
    return {
        type: ICECREAM_RESTOKED,
        quantity: qty,
    }
}
const InitialState={
    numOfCakes : 10,
    numOfIcecreams :10,
}

const cakeReducer=(state=InitialState,action)=>{
    switch(action.type){
        case CAKE_ORDERED:
            return {...state,numOfCakes: state.numOfCakes-1}
        case CAKE_RESTOCKED:
            return {...state,numOfCakes: state.numOfCakes+action.quantity}
        default:
            return state
    }
}
const iceCreamReducer=(state=InitialState,action)=>{
    switch(action.type){
        case ICECREAM_ORDERED:
            return {...state,numOfIcecreams: state.numOfIcecreams-1}
        case ICECREAM_RESTOKED:
            return {...state,numOfIcecreams: state.numOfIcecreams+action.quantity}
        //Let say for every cake order we are giving one free cake. We can see when action is dispatched, both reducer will receive
        case CAKE_ORDERED:
            return {...state,numOfIcecreams:state.numOfIcecreams-1}
        default:
            return state
    }
}
 //Accepts an object, each key value pair corresponds to reducer
const rootReducer=combineReducers({
    cake : cakeReducer,
    iceCream : iceCreamReducer,
})
const store=createStore(rootReducer,applyMiddleware(logger))
console.log("Initial State",store.getState())

//const unSubscribe=store.subscribe(()=>{console.log("Updated State :",store.getState())})
//As we are using middleware now
const unSubscribe=store.subscribe(()=>{})

store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(cakeRestocked(2))
store.dispatch(orderIceCream())
store.dispatch(orderIceCream())
store.dispatch(iceCreamRestocked(2))

unSubscribe()