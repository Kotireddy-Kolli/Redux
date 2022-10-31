const redux=require("redux")
const createStore=redux.createStore
//import produce from the immer library
const produce=require("immer").produce

const UPDATE_STREET="UPDATE_STREET"
const Initialstate={
    name:"Hi",
    address:{
        street:"123 Street",
        city:"123 city",
        postalcode:"123",
    }
}

const updateStreet=(street)=>{
    return {
        type: UPDATE_STREET,
        payload: street,
    }
}

//As we can see updating the state becomming complex, As we have to constently keep track of nested state just to update single property.
//we can make use of immer to solve this problem..
const reducer=(state=Initialstate,action)=>{
    switch(action.type){
        case UPDATE_STREET:
            // return {
            //     ...state,
            //     address : {...state.address,
            //         street:action.payload
            //     },
            // }
            // First arugument is the state and 2nd is a function whcih receives the draft version of the state.
            //It allows us to update the state as if state is mutable
            return produce(state,(draft)=>{
                draft.address.street=action.payload
            })
        default:
            return state
    }
}
const store=createStore(reducer)
console.log("Initial State",store.getState())

const unSubscribe=store.subscribe(()=>{
    console.log("Updated State:",store.getState())
})

store.dispatch(updateStreet("456 Street"))

unSubscribe()