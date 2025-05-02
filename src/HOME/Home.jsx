import { Routes, Route, NavLink } from 'react-router-dom';

import styles from './Home.module.css';

export const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.quote}>
        <span className={styles.boldPart}>
          ТЫ МОЖЕШЬ ДОБИТЬСЯ
          <span className={styles.color}> ЛЮБОЙ ЦЕЛИ!</span>
        </span>
        <span className={styles.regularPart}>
          ЕСЛИ КАЖДОЕ УТРО В 6:00 ХОЧЕШЬ ДОБИТЬСЯ ЕЕ БОЛЬШЕ, ЧЕМ СПАТЬ!
        </span>
      </h1>
      <h2 className={styles.author}>Александр Герасименко</h2>
      <nav className={styles.menu}>
        <ul>
          <li className={styles.menuItem}>
            <NavLink className={styles.menuLink} to="todo-list">
              Задачи, которые стоят того, чтобы встать в 6:00
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
