import { useAppSelector } from 'store';

const useTotal = () => {
  const { productsList, cartProductsId } = useAppSelector(
    (state) => state.products
  );
  // encontra todos os produtos no carrinho e acrescenta a propriedade qty para ter a quantidade de itens daquele produto
  const products = cartProductsId.map((productsId) => {
    return {
      ...productsList.find((product) => product.id === productsId.id),
      qty: productsId.qty,
    };
  });

  // acumula todos os valores de product.qty, resultando no total de todas as compras
  const total = products.reduce((acc, product) => {
    if (product.price) {
      return acc + product.price * product.qty;
    }
    return acc;
  }, 0);
  return total;
};

export default useTotal;
