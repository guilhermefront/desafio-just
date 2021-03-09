import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import './market.scss';
import Product from './Product';
import { fetchProducts } from 'slices/products-slice';
import Skeleton from '@material-ui/lab/Skeleton';

const Market = () => {
  const dispatch = useAppDispatch();

  const { productsList, fetchProductsState } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <section className="market">
      <h1 className="market__title">Novos produtos</h1>
      <ul className="market__list">
        {productsList.map((product) => (
          <Product key={product.id} {...product} />
        ))}
        {fetchProductsState === 'pending' && (
          <>
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="market__product" height={316} />
            ))}
          </>
        )}
      </ul>
    </section>
  );
};

export default Market;
