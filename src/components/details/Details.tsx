import React, { Fragment, useEffect } from 'react';
import { useParams } from 'react-router';
import { fetchProducts } from 'slices/products-slice';
import { useAppDispatch, useAppSelector } from 'store';
import './details.scss';

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { productsList } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [id, dispatch]);

  return (
    <article className="details">
      {productsList
        .filter((product) => product.id === Number(id))
        .map(
          ({
            title,
            description,
            memory,
            brand,
            chipType,
            price,
            picture,
            id,
          }) => (
            <Fragment key={id}>
              <div className="details__info">
                <h1 className="details__title">{title}</h1>
                <p className="details__description">{description}</p>
                <ul className="details__list">
                  <li className="details__item">
                    <span className="details__field">Memória</span>
                    <span className="details__value">{memory}</span>
                  </li>
                  <li className="details__item">
                    <span className="details__field">Marca</span>
                    <span className="details__value">{brand}</span>
                  </li>
                  <li className="details__item">
                    <span className="details__field">Tipo de chip</span>
                    <span className="details__value">{chipType}</span>
                  </li>
                </ul>
                <div className="details__buy">
                  <span className="details__sell">
                    Á venda por <strong>R${price}</strong>
                  </span>
                  <button className="details__cart-button">Comprar</button>
                </div>
              </div>
              <div className="details__img-container">
                <img
                  src={picture}
                  onError={(e) =>
                    (e.currentTarget.src =
                      'https://i2.wp.com/cenfewc.com.br/wp-content/uploads/2018/03/imagem-nao-disponivel.jpg?fit=600%2C600&ssl=1')
                  }
                  className="details__img"
                  alt=""
                />
              </div>
            </Fragment>
          )
        )}
    </article>
  );
};
export default Details;
