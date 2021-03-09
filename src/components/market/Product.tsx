import { useEffect, useState } from 'react';
import { ProductType } from 'types';

const Product = ({ picture, quantity, price, title }: ProductType) => {
  const [stockImg, setStockImg] = useState('');

  useEffect(() => {
    import(
      `assets/${quantity ? 'available' : 'not-available'}.svg`
    ).then((img) => setStockImg(img.default));
  }, [quantity, stockImg]);

  return (
    <li className="market__product">
      <div className="market__stock">
        <img alt="" src={stockImg} />
        <span
          style={{ color: quantity ? '#78A962' : '#C94D3F' }}
          className="market__availability"
        >
          {quantity ? 'Em estoque' : 'Não disponível'}
        </span>
      </div>
      <div className="market__img-container">
        <img
          onError={(e) =>
            (e.currentTarget.src =
              'https://i2.wp.com/cenfewc.com.br/wp-content/uploads/2018/03/imagem-nao-disponivel.jpg?fit=600%2C600&ssl=1')
          }
          className="market__image"
          alt=""
          src={picture}
        />
      </div>
      <p className="market__description">{title}</p>
      <p className="market__price">R${price}</p>
    </li>
  );
};

export default Product;
