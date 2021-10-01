import React from 'react';
import {getMockStore} from '../../test-utils/mocks';

import {Provider} from 'react-redux';
import {Route, Redirect, Switch} from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import {history} from '../../store/store'
import TodoList from './TodoList';
import * as actionCreators from '../../store/actions/todo';
import {mount} from 'enzyme';

jest.mock('../../components/Todo/Todo', ()=>{
    return jest.fn(props=>{
        return(
            <div className = "spyTodo">
                <div className="title" onClick={props.clickDetail}>
                    {props.title}
                </div>
                <button className="doneButton" onClick={props.clickDone} />
                <button className="deleteButton" onClick={props.clickDelete} />
            </div>
        );
    });
});

const stubInitialState = {
    todos:[
        {id: 1, title: 'TODO_TEST_TITLE_1', done:false},
        {id: 2, title: 'TODO_TEST_TITLE_2', done:false},
        {id: 3, title: 'TODO_TEST_TITLE_3', done:false},
    ],
    selectedTodo:null,
};

const mockStore = getMockStore(stubInitialState);

describe('<TodoList />', ()=>{
    let todoList;
    let spyGetTodos;

    beforeEach(()=>{
        todoList = (
            <Provider store = {mockStore}>
                <ConnectedRouter history = {history}>
                    <Switch>
                        <Route path='/' exact
                            render={()=><TodoList title='TODOLIST_TEST_TITLE' />}/>
                    </Switch>
                </ConnectedRouter>
            </Provider>
        )
        spyGetTodos = jest.spyOn(actionCreators, 'getTodos')
            .mockImplementation(()=>{return dispatch => {}; });
    })

    it('should render Todos', ()=>{
        const component = mount(todoList);
        const wrapper = component.find('.spyTodo');

        expect(wrapper.length).toBe(3);
        expect(wrapper.at(0).text()).toBe('TODO_TEST_TITLE_1');
        expect(wrapper.at(1).text()).toBe('TODO_TEST_TITLE_2');
        expect(wrapper.at(2).text()).toBe('TODO_TEST_TITLE_3');
        expect(spyGetTodos).toBeCalledTimes(1);
    })
})