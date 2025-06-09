import { NavLink } from 'react-router-dom';
import styles from './NavigationMenu.module.css';
import { BackButton } from '../BACK_BUTTON/BackButton';

export const NavigationMenu = () => {
  return (
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
  );
};
