import React    from 'react';
import ReactDOM from 'react-dom';

// todoList: [{content, isFinished}, ...rest]
const TodoContext = React.createContext({
    todoList: [],
    addTodoItem: () => {},
    delTodoItem: () => {},
});

export const Provider = TodoContext.Provider;
export const Consumer = TodoContext.Consumer;

export const connect = mapStateToProps => Component => () => <Consumer>{state => <Component {...mapStateToProps(state)} />}</Consumer>
