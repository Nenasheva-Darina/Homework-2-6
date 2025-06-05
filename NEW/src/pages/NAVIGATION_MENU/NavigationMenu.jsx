import { Routes, Route, NavLink } from 'react-router-dom';
import styles from './NavigationMenu.module.css';
import { BackButton, Home, ToDoList, Error404, SelectedTask } from '../index';

export const NavigationMenu = () => {
	return (
		<div className={styles.app}>
			  <div className={styles.appMenu}>
				<nav className={styles.mainMenu}>
				  <ul>
					<li>
					  <BackButton />
					</li>
					<li>
					  <NavLink to="/" className={styles.menuLink}>
						Главная страница
					  </NavLink>
					</li>
					<li>
					  <NavLink to="/todo-list" className={styles.menuLink}>
						Список ваших дел
					  </NavLink>
					</li>
				  </ul>
				</nav>
			  </div>
			  <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo-list" element={<ToDoList/>} />
		<Route path="/todo-list/task/:id" element={<SelectedTask />} />	
		<Route path="/404" element={<Error404 />} /> 
        <Route path="*" element={<Error404 />} />
      </Routes>
		</div>
	)
}
