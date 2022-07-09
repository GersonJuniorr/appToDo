import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from './models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Minhas Tarefas';

  public form: FormGroup;
  public todos: Todo[] = [ ];
  public inputTask: any;
  mode: string = 'list'

  constructor(private fb: FormBuilder) {
    
    this.form = fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.minLength(60),
        Validators.required
      ])]
    })

    this.todos.push(new Todo(1, 'ola', false))
    this.load();
  }

  add() {
    const form = (<HTMLSelectElement>document.getElementById('inputTask')).value
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, form, false));
    this.save();
    this.changedMode('list')
  }

  removerTask(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if(index !== -1) {
      this.todos.splice(index, 1);
    }

    this.save();
  }

  concluirTask(todo: Todo) {
    todo.done = false;
    this.save();
  }

  refazerTask(todo: Todo) {
    todo.done = true;
    this.save();
  }

  save() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('tasks', data);
  }

  load() {
    const data = localStorage.getItem('tasks');
    if(data) {
      this.todos = JSON.parse(data);
    } else {
      this.todos = [];
    }
  }

  changedMode(mode: any) {
    this.mode = mode;
  }
}
