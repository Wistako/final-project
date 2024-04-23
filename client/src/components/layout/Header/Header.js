import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Header.module.scss';
import { getUser } from '../../../redux/reducers/user';

const Header = () => {
  const user = useSelector(state => getUser(state));
  return (
    <header className={styles.header}>
      <nav>
        <p>Logo</p>
        <ul>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>

          {user ? (
            <li>
              <NavLink to='/logout'>Logout</NavLink>
            </li>
          ) : (
            <>
              <li>
                <NavLink to='/login'>Sign in</NavLink>
              </li>
              <li>
                <NavLink to='/register'>Sign up</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
