import React        from 'react';
import ReactDOM     from 'react-dom';
import { Provider } from './context/';
import styles       from './assets/index.less.module';
import TodoTitle    from './todo-title';
import TodoContent  from './todo-content';
import TodoFooter   from './todo-footer';

export default class TodoRoot extends React.Component {
    state = {
        todoList: [],
        addTodoItem: (itemWords) => {
            const item = { content: itemWords, isFinished: false };
            this.setState(state => ({
                todoList: [item].concat(state.todoList),
            }))
        },
        delTodoItem: (index) => this.setState(state => ({
            todoList: [].concat(state.todoList.slice(0, index), state.todoList.slice(index + 1)),
        })),
    };

    render() {
        return (
            <Provider value={this.state}>
                <div className={styles.rootWrapper}>
                    <TodoTitle />
                    <TodoContent />
                    <TodoFooter />
                </div>
            </Provider>
        );
    }
}
