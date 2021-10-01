import { createStore, combineReducers, applyMiddleware } from 'redux';
import { connectRouter } from 'connected-react-router';
import {history, middlewares} from '../store/store';

const getMockTodoReducer = jest.fn(
    initialState => (state = initialState, action)=>{
        return state;
    }
);

export const getMockStore = (initialState) =>{
    const mockTodoReducer = getMockTodoReducer(initialState);
    const rootReducer = combineReducers({
        td:mockTodoReducer,
        router:connectRouter(history),
    });
    return createStore(rootReducer, applyMiddleware(...middlewares));
}