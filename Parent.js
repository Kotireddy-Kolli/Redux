//import redux from "redux"
const redux=require("redux")

const createStore=redux.createStore
const CAKE_ORDERED="CAKE_ORDERED"
const CAKE_RESTOCKED="CAKE_RESTOCKED"

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
const InitialState={
    numOfCakes : 10,
}

const reducer=(state=InitialState,action)=>{
    switch(action.type){
        case CAKE_ORDERED:
            return {...state,numOfCakes: state.numOfCakes-1}
        case CAKE_RESTOCKED:
            return {...state,numOfCakes: state.numOfCakes+action.quantity}
        default:
            return state
    }
}

const store=createStore(reducer)
console.log("Initial State",store.getState())

const unSubscribe=store.subscribe(()=>{console.log("Updated State :",store.getState())})

store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(cakeRestocked(2))

unSubscribe()