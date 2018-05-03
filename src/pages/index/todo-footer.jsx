import React        from 'react';
import { connect }  from './context';
import styles       from './assets/index.less.module';

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
