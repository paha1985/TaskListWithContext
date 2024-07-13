import React, { useContext } from 'react';
import './Modal.css';
import { AppContext } from './context';
import { useDeleteTodo, useUpdateTodo } from './hooks/index';

const Modal = () => {
	const {
		active,
		isDeleting,
		curTodoTitle,
		curTodoId,
		setUpdatedTodoChange,
		setActive,
		setDeleting,
		setUpdating,
		refreshTodos,
	} = useContext(AppContext);

	const DeleteTodo = useDeleteTodo(refreshTodos, curTodoId, setActive, setDeleting);

	const UpdateTodo = useUpdateTodo(
		refreshTodos,
		curTodoId,
		curTodoTitle,
		setActive,
		setUpdating,
	);

	return (
		<div
			className={active ? 'modal active' : 'modal'}
			onClick={() => setActive(false)}
		>
			<div
				className={active ? 'modal__content active' : 'modal__content'}
				onClick={(e) => e.stopPropagation()}
			>
				{isDeleting ? (
					<div>
						<div>Удалить запись?</div>
						<button onClick={DeleteTodo}>Удалить</button>
						<button
							onClick={() => {
								setActive(false);
								setDeleting(false);
							}}
						>
							Закрыть
						</button>
					</div>
				) : (
					<div>
						{' '}
						<input
							type="text"
							value={curTodoTitle}
							onChange={setUpdatedTodoChange}
						/>
						<div>
							<button onClick={UpdateTodo}>Сохранить</button>
							<button
								onClick={() => {
									setActive(false);
									setUpdating(false);
								}}
							>
								Закрыть
							</button>
						</div>
					</div>
				)}
				{/* {children} */}
			</div>
		</div>
	);
};

export default Modal;
