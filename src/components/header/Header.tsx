import cartIcon from 'assets/cart-icon.svg';
import picture from 'assets/picture.jpeg';
import useTotal from 'components/utils/total';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'store';
import './header.scss';

const Header = () => {
  const { cartProductsId } = useAppSelector((state) => state.products);

  const total = useTotal();

  return (
    <header className="header">
      <span className="header__total">R${total.toFixed(2)}</span>
      <Link to="/cart">
        <div className="header__cart">
          <img className="header__cart-icon" alt="cart" src={cartIcon} />
          <div className="header__qty">{cartProductsId.length}</div>
        </div>
      </Link>
      <img className="header__profile" alt="profile" src={picture} />
    </header>
  );
};

export default Header;
