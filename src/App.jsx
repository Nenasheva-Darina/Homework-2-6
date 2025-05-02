import { Routes, Route, NavLink, Outlet } from 'react-router-dom';
import styles from './App.module.css';
import { Home } from './HOME/Home.jsx';
import { ToDoListik } from './TODOLISTIK/ToDoListik.jsx';
import { ToDos } from './ToDos/ToDos.jsx';
import { NotFound } from './Error404/NotFound.jsx';
import { BackButton } from './BackButton/BackButton.jsx';
export const App = () => {
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
        <Route path="/todo-list" element={<ToDoListik />} />
        <Route path="/todo-list/task/:id" element={<ToDos />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

// json-server --watch db.json --port 3004
