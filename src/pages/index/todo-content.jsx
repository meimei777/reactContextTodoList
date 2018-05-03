import React        from 'react';
import { connect }  from './context';
import styles       from './assets/index.less.module';

@connect(state => ({
    todoList    : state.todoList,
    delTodoItem : state.delTodoItem,
}))
export default class TodoContent extends React.Component {
    render() {
        const { todoList, delTodoItem } = this.props;
        return (
            <ul className={styles.todoContent}>
            {
                todoList.map((item, index) => (
                    <li key={index} className={styles.todoItem + (item.isFinished ? ` ${styles.finished}` : '')}>
                        <div className={styles.todoItemContent}>{item.content}</div>
                        <div className={styles.btn + ' ' + styles.delTodoItem} onClick={() => delTodoItem(index)}>Del</div>
                    </li>
                ))
            }
            </ul>
        );
    }
}
