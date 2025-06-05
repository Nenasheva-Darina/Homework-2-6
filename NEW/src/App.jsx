import { Routes, Route, NavLink, Outlet } from 'react-router-dom';
import styles from './App.module.css';
import { BackButton, Home, NavigationMenu } from './pages/index.js';

export const App = () => {
  return (
    <>
      <NavigationMenu />
    </>
  );
};

// json-server --watch db.json --port 3004
