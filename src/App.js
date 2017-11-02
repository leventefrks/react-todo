import React from 'react';

const Title = () => { return <h1 className="text-center" style={{color: '#009688'}}>React Todo built with Bootstrap 4</h1> }

const TodoInput = ({addItem}) => {
  let input;
  return (
    <form onSubmit={ (e) => {
      e.preventDefault();
        addItem(input.value);
        input.value = '';
    }}>
    <input className="form-control col-md-12" ref={ node => {input = node}}/>
    <button type="button" className="btn btn-lg btn-block btn-primary" onClick={() => addItem(input.value)}>Add Todo</button>
      </form>
  );
};

const TodoList = ({todos, removeItem}) => {
  const todoNode = todos.map((todo) => {
    return (<Todo todo={todo} key={todo.id} removeItem={removeItem}/>)
  });
  return (<ul className="list-group" style={{marginTop:'10px'}}>{todoNode}</ul>);
}

const Todo = ({todo, removeItem}) => {
  return (
  <a
  href="#" 
  className="list-group-item border border-secondary"
  style={{backgroundColor: '#eee',marginBottom: '10px'}}>
  {todo.id}. {todo.text}
  <button 
  type="button"
  className="close"
  aria-label="Close"
  onClick={() => {removeItem(todo.id)}}>
  <span
  aria-hidden="true">&times;</span>
</button></a>
  );
}

window.id = 0;
class TodoApp extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: [],
    }
  }

  addItem(val){
    if (val){
    const todo = {text: val, id: window.id++}
    this.state.data.push(todo);
    this.setState({data: this.state.data});
    val = '';
   }
  }

  removeItem(id){
    const remainder = this.state.data.filter((todo) => {
      if(todo.id !== id) return todo;
    });
    this.setState({data: remainder});
  }

  render(){
    return (
      <div className="container">
        <Title />
        <TodoInput addItem={this.addItem.bind(this)}/>

        <TodoList 
          todos={this.state.data} 
          removeItem={this.removeItem.bind(this)}
        />
      </div>
    );
  }
}

export default TodoApp;
