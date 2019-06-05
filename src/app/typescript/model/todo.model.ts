import { TodoState } from '../interface/todo.interface';

export class Todo {
	id: number;
	name: string;
	state: boolean;

	constructor(id: number, name: string, state: boolean) {
		this.id = id;
		this.name = name;
		this.state = state;
	}
}
