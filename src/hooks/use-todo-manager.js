import { useState } from 'react';
import { useAddTodo, useGetTodo } from './index';

export const useTodoManager = (refreshTodos, refreshTodosFlag) => {
	const [newTodo, setNewTodo] = useState('');
	//const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);
	const [search, setSearch] = useState('');
	const [sorted, setSorted] = useState(false);

	// const refreshTodos = () => {
	// 	setRefreshTodosFlag(!refreshTodosFlag);
	// };

	const { isCreating, AddTodo } = useAddTodo(refreshTodos, newTodo, setNewTodo);
	const { isLoading, todos } = useGetTodo(refreshTodosFlag, sorted, search);

	const onNewTodoChange = ({ target }) => {
		setNewTodo(target.value);
	};

	const onSearchChange = ({ target }) => {
		setSearch(target.value);
		refreshTodos();
	};

	const sortTodo = () => {
		setSorted(!sorted);
		refreshTodos();
	};

	return {
		newTodo,
		//refreshTodosFlag,
		//setRefreshTodosFlag,
		search,
		isCreating,
		AddTodo,
		isLoading,
		todos,
		onNewTodoChange,
		onSearchChange,
		sortTodo,
	};
};
