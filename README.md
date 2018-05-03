# reactContextTodoList
use React 16.3 new API Context write a todoList demo

Without redux, but like redux

## Usage
```npm install && npm start```

## Code
```js
// context/index.js
const TodoContext = React.createContext({
    todoList: [],
    addTodoItem: () => {},
    delTodoItem: () => {},
});
export const Provider = TodoContext.Provider;
export const Consumer = TodoContext.Consumer;
export const connect = mapStateToProps => Component => () => <Consumer>{state => <Component {...mapStateToProps(state)} />}</Consumer>

// index.jsx
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

// todo-footer.jsx
@connect(state => ({
    addTodoItem: state.addTodoItem,
}))
export default class TodoFooter extends React.Component {
    state = {
        inputValue: '',
    }
    addTodoItem = () => {
        if (this.state.inputValue.trim()) {
            this.props.addTodoItem(this.state.inputValue)
        } else {
            alert('can not be empty');
        }
        this.setState({inputValue: ''});
    }
    onInputChange = e => this.setState({inputValue: e.target.value})
    render() {
        const { inputValue } = this.state;
        return (
            <div className={styles.todoFooter}>
                <input type="text" value={inputValue} onChange={this.onInputChange} />
                <div className={styles.btn} onClick={this.addTodoItem}>Add</div>
            </div>
        );
    }
}

```

## MIT Licenced


