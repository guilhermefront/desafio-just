import { useCallback, useEffect, useMemo } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { fetchProducts, setCartProducts } from 'slices/products-slice';
import { useAppDispatch, useAppSelector } from 'store';
import './details.scss';

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { productsList, fetchProductsState, cartProductsId } = useAppSelector(
    (state) => state.products
  );

  const currentProduct = useMemo(
    () => productsList.find((product) => product.id === Number(id)),
    [id, productsList]
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [id, dispatch]);

  const qtyProduct = useCallback(() => {
    const cartProduct = cartProductsId.find(
      (productsId) => productsId.id === Number(id)
    );
    return cartProduct?.qty;
  }, [cartProductsId, id]);

  const handleClick = ({ maxQty }: { maxQty: number }) => {
    dispatch(
      setCartProducts({
        edit: 'add',
        id: Number(id),
        qty: qtyProduct(),
        maxQty,
      })
    );
  };

  return currentProduct ? (
    <article className="details">
      <div className="details__info">
        <h1 className="details__title">{currentProduct.title}</h1>
        <p className="details__description">{currentProduct.description}</p>
        <img
          src={currentProduct.picture}
          onError={(e) =>
            (e.currentTarget.src =
              'https://i2.wp.com/cenfewc.com.br/wp-content/uploads/2018/03/imagem-nao-disponivel.jpg?fit=600%2C600&ssl=1')
          }
          className="details__img details__img--mobile"
          alt=""
        />
        <ul className="details__list">
          <li className="details__item">
            <span className="details__field">Memória</span>
            <span className="details__value">{currentProduct.memory}</span>
          </li>
          <li className="details__item">
            <span className="details__field">Marca</span>
            <span className="details__value">{currentProduct.brand}</span>
          </li>
          <li className="details__item">
            <span className="details__field">Tipo de chip</span>
            <span className="details__value">{currentProduct.chipType}</span>
          </li>
        </ul>
        <div className="details__buy">
          <span className="details__sell">
            Á venda por <strong>R${currentProduct.price}</strong>
          </span>
          <Link to="/cart">
            <button
              className="details__cart-button"
              onClick={() => handleClick({ maxQty: currentProduct.quantity })}
            >
              Comprar
            </button>
          </Link>
        </div>
      </div>
      <div className="details__img-container">
        <img
          src={currentProduct.picture}
          onError={(e) =>
            (e.currentTarget.src =
              'https://i2.wp.com/cenfewc.com.br/wp-content/uploads/2018/03/imagem-nao-disponivel.jpg?fit=600%2C600&ssl=1')
          }
          className="details__img"
          alt=""
        />
      </div>
    </article>
  ) : fetchProductsState === 'fulfilled' ? (
    <span className="details__notfind">Produto não encontrado</span>
  ) : null;
};

export default Details;
