import React from 'react';
import styles from './app.module.css';
import { useState } from 'react';
import Modal from './modal.js';
import { useTodoManager } from './hooks/index.js';
import { AppContext } from './context.js';

export const App = () => {
	const [isUpdating, setIsUpdating] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);
	const [modalActive, setModalActive] = useState(false);
	const [curTodoId, setCurTodoId] = useState('');
	const [curTodoTitle, setCurTodoTitle] = useState('');

	const refreshTodos = () => {
		setRefreshTodosFlag(!refreshTodosFlag);
		console.log(refreshTodosFlag);
	};

	const {
		newTodo,
		search,
		isCreating,
		AddTodo,
		isLoading,
		todos,
		onNewTodoChange,
		onSearchChange,
		sortTodo,
	} = useTodoManager(refreshTodos, refreshTodosFlag);

	const setUpdatedTodoChange = ({ target }) => {
		setCurTodoTitle(target.value);
	};

	return (
		<AppContext.Provider
			value={{
				active: modalActive,
				isDeleting: isDeleting,
				curTodoTitle: curTodoTitle,
				curTodoId: curTodoId,
				setUpdatedTodoChange: setUpdatedTodoChange,
				setActive: setModalActive,
				setDeleting: setIsDeleting,
				setUpdating: setIsUpdating,
				refreshTodos: refreshTodos,
			}}
		>
			<div className={styles.dashboard}>
				<div className={styles.header}>
					<input
						type="text"
						placeholder="Поиск..."
						value={search}
						onChange={onSearchChange}
					/>
					<button onClick={sortTodo}>Сортировка</button>
					<div>
						<input
							type="text"
							placeholder="Добавить новое дело"
							value={newTodo}
							onChange={onNewTodoChange}
						/>
						<button disabled={isCreating || !newTodo} onClick={AddTodo}>
							Добавить
						</button>
					</div>
				</div>
				<div className={styles.todos}>
					{isLoading ? (
						<div className={styles.loader}></div>
					) : (
						todos.map(({ id, title }) => (
							<div key={id}>
								{title}
								<button
									onClick={() => {
										setIsUpdating(true);
										setModalActive(true);
										setCurTodoId(id);
										setCurTodoTitle(title);
									}}
								>
									Редактировать
								</button>
								<button
									onClick={() => {
										setIsDeleting(true);
										setModalActive(true);
										setCurTodoId(id);
									}}
								>
									Удалить
								</button>
							</div>
						))
					)}
				</div>
				<Modal />
			</div>
		</AppContext.Provider>
	);
};
