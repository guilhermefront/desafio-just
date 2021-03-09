import cartIcon from 'assets/cart-icon.svg';
import picture from 'assets/picture.jpeg';
import { Link } from 'react-router-dom';
import './header.scss';

const Header = () => {
  return (
    <header className="header">
      <Link to="/buy" className="header__cart">
        <img className="header__cart-icon" alt="cart" src={cartIcon} />
      </Link>
      <img className="header__profile" alt="profile" src={picture} />
    </header>
  );
};

export default Header;
