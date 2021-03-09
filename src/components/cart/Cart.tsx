import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import './cart.scss';
import arrow from 'assets/arrow.svg';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';
import { setCartProducts, setQty } from 'slices/products-slice';
import useTotal from 'components/utils/total';
import removeIcon from 'assets/close.svg';

const Cart = () => {
  const dispatch = useAppDispatch();
  const { cartProductsId, productsList } = useAppSelector(
    (state) => state.products
  );

  // memoiza cartProducts para evitar cálculos custosos pra renderização
  const cartProducts = useMemo(
    () =>
      cartProductsId.map((productId) =>
        productsList.find((product) => product.id === productId.id)
      ),
    [cartProductsId, productsList]
  );

  // retorna a quantitade de itens de um produto no carrinho
  const qtyProduct = useCallback(
    (product) => {
      const cartProduct = cartProductsId.find(
        (productsId) => productsId.id === product.id
      );
      return cartProduct?.qty;
    },
    [cartProductsId]
  );

  const handleClean = () => {
    dispatch(setCartProducts({ edit: 'reset' }));
  };

  const handleQty = ({
    id,
    type,
    maxQty,
  }: {
    id: number;
    type: 'add' | 'less';
    maxQty: number;
  }) => {
    dispatch(setQty({ id, qty: type, maxQty }));
  };

  const total = useTotal();

  const handleRemove = (id: number) => {
    dispatch(setCartProducts({ edit: 'remove', id }));
  };

  return (
    <div className="cart">
      <h1 className="cart__title">Carrinho de compras</h1>

      {cartProducts.map((product, index) =>
        product ? (
          <div
            className={`cart__container ${
              index === 0 ? 'cart__container--initial' : ''
            }`}
          >
            <CartItem index={index} label="Item" type="product">
              <div className="cart__content cart__content--product">
                <div className="cart__image-container">
                  <img
                    onError={(e) =>
                      (e.currentTarget.src =
                        'https://i2.wp.com/cenfewc.com.br/wp-content/uploads/2018/03/imagem-nao-disponivel.jpg?fit=600%2C600&ssl=1')
                    }
                    className="cart__image"
                    alt=""
                    src={product.picture}
                  />
                </div>
                <p className="cart__product-title">{product.title}</p>
              </div>
            </CartItem>
            <CartItem type="price" label="Preço" index={index}>
              <div className="cart__content">R${product.price}</div>
            </CartItem>
            <CartItem label="Qty" index={index}>
              <div className="cart__content cart__content--qty">
                <div>{qtyProduct(product)}</div>
                <div className="cart__qty-buttons">
                  <button
                    onClick={() =>
                      handleQty({
                        id: product.id,
                        type: 'add',
                        maxQty: product.quantity,
                      })
                    }
                    className="cart__qty-button cart__qty-button--up"
                  >
                    <img className="cart__arrow" src={arrow} alt="add" />
                  </button>
                  <button
                    onClick={() =>
                      handleQty({
                        id: product.id,
                        type: 'less',
                        maxQty: product.quantity,
                      })
                    }
                    className="cart__qty-button cart__qty-button--down"
                  >
                    <img
                      className="cart__arrow cart__arrow--down"
                      src={arrow}
                      alt="less"
                    />
                  </button>
                  <span className="cart__max">
                    Restam {product.quantity - qtyProduct(product)!} no estoque
                  </span>
                </div>
              </div>
            </CartItem>
            <CartItem label="Subtotal" index={index}>
              <div className="cart__content">
                R$
                {qtyProduct(product)
                  ? (qtyProduct(product)! * product.price).toFixed(2)
                  : product.price.toFixed(2)}
              </div>
            </CartItem>
            <button onClick={() => handleRemove(product.id)}>
              <img src={removeIcon} alt="remove" />
            </button>
          </div>
        ) : null
      )}
      {!cartProducts[0] && (
        <div className="cart__no-products">Sem produtos</div>
      )}
      <div className="cart__buttons">
        <Link to="/">
          <button className="cart__button cart__button--continue">
            Continuar comprando
          </button>
        </Link>
        <button
          onClick={handleClean}
          className="cart__button cart__button--clean"
        >
          Limpar carrinho
        </button>
      </div>
      <div className="cart__buy">
        <h1 className="cart__buy-title">Compras</h1>
        <div className="cart__buy-container">
          <p className="cart__buy-label">Total da compra</p>
          <p className="cart__buy-total">R${total.toFixed(2)}</p>
        </div>
        <button disabled className="cart__checkout">
          Fazer o checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
