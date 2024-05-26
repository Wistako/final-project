import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Header.module.scss';
import { getUser } from '../../../redux/reducers/user';
import Container from '../../common/Container/Container';
import ToggleBar from '../../common/ToggleBar/ToggleBar';

const Header = () => {
  const user = useSelector(state => getUser(state));
  return (
    <header className={styles.header}>
      <Container>
        <nav className={styles.navigation}>
          <NavLink to='/' className={styles.logo}>
            Clothing store
          </NavLink>
          <ToggleBar>
            <ul className={styles.list}>
              <li>
                <NavLink to='/'>Home</NavLink>
              </li>
              {user && user.role === 'ADMIN' && (
                <li>
                  <NavLink to='/admin'>Admin</NavLink>
                </li>
              )}
              {user ? (
                <>
                  <li>
                    <NavLink to='/orders'>Orders</NavLink>
                  </li>
                  <li>
                    <NavLink to='/logout'>Logout</NavLink>
                  </li>
                </>
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
              <li>
                <NavLink to='/cart' className={styles.icon}>
                  <img src={`${process.env.PUBLIC_URL}/images/shopping-cart.svg`} alt='Cart' />
                </NavLink>
              </li>
            </ul>
          </ToggleBar>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
