import { Todo } from '../model/todo.model';
import { TodoState } from '../interface/todo.interface';
import { TodoServiceInterface } from '../interface/todoservice.interface';


let state = false;
export class TodoService implements TodoServiceInterface {
	// state: boolean = false;
	private id: number = 0;
	private todos: Todo[] = [];

	constructor(todos: Todo[]) {
	}

	private generateId(length: number): string {
		const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHUJKLMNOPQRSTUVWXYZ';
		let ID = '';
		for (let i = 0; i < length; i += 1) {
			ID += chars.charAt(Math.floor(Math.random() * chars.length));
		}
		return 'task-' + ID;
	}
	private addTask(task: string): Todo {
		let todo: Todo = {
			id: this.generateId(4),
			name: task,
			state: false,
		};
		this.todos.push(todo);
		console.log(this.todos);
		
		return todo;
	}

	private renderTaskFilter (task: Todo) {
		let html, container;
		container = <HTMLElement>document.getElementById('bodyTasks');

		html =  `<li class="td__body-task${task.state === true ? ' td__body-task--complete' : '' }" id="${task.id}" data-id="${task.id}">
			<input class="td__body-task--toggle" type="checkbox">
			<span>${task.name}</span>
			<button class="td__body-task--destroy" data-button-id="${task.id}"><i class="mdi mdi-window-close"></i></button>
		</li>`

		container.insertAdjacentHTML("beforeend", html);
	}
	private renderTask(task: Todo): void{
		let container = <HTMLElement>document.getElementById('bodyTasks');
		let html: string, newHtml: string, htmlDom;
		html =  `<li class="td__body-task${task.state === true ? ' td__body-task--complete' : '' }" id="${task.id}" data-id="${task.id}">
					<input class="td__body-task--toggle" type="checkbox">
					<span>${task.name}</span>
					<button class="td__body-task--destroy" data-button-id="${task.id}"><i class="mdi mdi-window-close"></i></button>
				</li>`
		
		container.insertAdjacentHTML("beforeend", html);

		let findId = <HTMLElement>document.querySelector(`[data-id="${task.id}"]`)

		if (findId) {
			findId.addEventListener('click', event => {
				this.toggleState(task);
				findId.classList.toggle('td__body-task--complete');
			})
		}
	}
	
	private findId() {
		return this.todos.map(todo => todo.id);
	}

	private filterTaskType(type: boolean): Todo[] {
		return (this.todos = this.todos.slice().filter(
			todo => todo.state === type
		));
	}

	render(input: string): void{
		let newItem;
		newItem = this.addTask(input);
		console.log(newItem);

		this.renderTask(newItem);
	}

	renderFilter (tasks: Todo[]): void {
		for (let index = 0; index < tasks.length; index++) {
			let element = tasks[index];
			this.renderTaskFilter(element);
		}
	}

	deleteTask (index: string): Todo[]{
		let item, ids;

		ids = this.findId();
		item = ids.indexOf(index)

		if (item !== -1) {
			this.todos.splice(item, 1);
		}

		return this.todos;
	}

	clearCompleteTask() {
		this.todos = this.todos.filter(todo => todo.state === true);
	}

	allTask() {
		return this.todos.slice();
	}

	activeTask() {
		return this.filterTaskType(false);
	}

	completeTask() {
		return this.filterTaskType(true);
	}

	countTask(countElement: HTMLElement): string {
		if (this.todos.length > 0) {
			countElement.style.display = 'block';
		} else {
			countElement.style.display = 'none';
		}
		return String(this.todos.length);
	}

	toggleState(todo: Todo): boolean{
		todo.state = !todo.state
		return todo.state;
	}
}
