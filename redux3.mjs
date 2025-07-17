import { legacy_createStore as createStore, applyMiddleware, compose } from "redux";
function counterReducer(state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;

    case "DECREMENT":
      return state - 1;

    default:
      return state;
  }
}

const logger=(store)=>(next)=>(action)=>{
  console.log("Middleware dispacthing ",action)
  next(action)
  console.log("Middleware next state ",store.getState())
}
const timestamp=(store)=>(next)=>action=>{
  console.log("Time dispatched at "+new Date().toLocaleTimeString())
  next(action)
  console.log("this prints after it gone through reducer and backtracks ")
}

const store = createStore(counterReducer,applyMiddleware(timestamp,logger));

console.log("initial state "+store.getState())
store.dispatch({type:"INCREMENT"})
// store.dispatch({type:"INCREMENT"})
// console.log("next state "+store.getState())
// store.dispatch({type:"DECREMENT"})
// console.log("final state "+store.getState())
