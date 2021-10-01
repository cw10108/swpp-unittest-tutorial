import * as actionCreators from './todo';
import store from '../store';
import axios from 'axios';

describe('ActionCreators',()=>{
    const stubTodoList = [{
        id:0,
        title:'title 1',
        content:'content 1'
    },];
    it(`'getTodo' should fetch todos correctly`, async ()=>{
        axios.get = jest.fn(url=>{
            return new Promise((resolve, reject)=>{
                const result = {
                    status:200,
                    data:stubTodoList
                };
                resolve(result);
            })
        })

        await store.dispatch(actionCreators.getTodos())
        const newState = store.getState();
        expect(newState.td.todos).toBe(stubTodoList);
        expect(axios.get).toHaveBeenCalledTimes(1);
    })
})