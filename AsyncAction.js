const redux=require("redux")
const applyMiddleware=redux.applyMiddleware
const redux_thunk=require("redux-thunk").default
const axios=require("axios")

const FETCH_USERS_REQUESTED="FETCH_USERS_REQUESTED"
const FETCH_USERS_SUCCEEDED="FETCH_USERS_SUCCEEDED"
const FETCH_USERS_FAILED="FETCH_USERS_FAILED"

const Initialstate={
    loading:false,
    users:[],
    errorMessage:"",
}
const fetchUsersRequested=()=>{
    return {
        type:FETCH_USERS_REQUESTED,
    }
}
const fetchUsersSucceded=(users)=>{
    return {
        type:FETCH_USERS_SUCCEEDED,
        payload:users
    }
}
const fetchUsersFailed=(error)=>{
    return {
        type:FETCH_USERS_FAILED,
        payload:error
    }
}
const reducer=(state=Initialstate,action)=>{
    switch(action.type){
        case FETCH_USERS_REQUESTED:
            return {...state,loading:true}
        case FETCH_USERS_SUCCEEDED:
            return {...state,loading:false,users:action.payload,errorMessage:""}
        case FETCH_USERS_FAILED:
            return {...state,loading:false,users:[],errorMessage:action.payload}
        default:
            return state
    }
}
const store=redux.createStore(reducer,applyMiddleware(redux_thunk))


// Async action creator
const fetchUsers=()=>{
    return function(dispatch){
        dispatch(fetchUsersRequested())
        //Before making an api call lets dispatch users requested.
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then(response=>{
            const users=response.data.map(user=>user.id)
            dispatch(fetchUsersSucceded(users))
        })
        .catch(error=>{
            dispatch(fetchUsersFailed(error.message))
        })
    }
}

const unsubcribe=store.subscribe(()=>console.log("Updated State:",store.getState()))

store.dispatch(fetchUsers())

