import { Routes, Route } from 'react-router-dom';
import styles from './App.module.css';
import { NavigationMenu } from './components/NAVIGATION_MENU/NavigationMenu';
import { Home, ToDoList, SelectedTask, Error404 } from './pages';

export const App = () => {
  return (
    <div className={styles.app}>
      <div className={styles.appMenu}>
        <NavigationMenu />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo-list" element={<ToDoList />} />
        <Route path="/todo-list/task/:id" element={<SelectedTask />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
};
