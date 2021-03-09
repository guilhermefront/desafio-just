import { ReactNode } from 'react';
import './cart.scss';
import Label from './Label';

interface Props {
  index: number;
  label: string;
  children: ReactNode;
  type?: string;
}

const CartItem = ({ index, label, children, type }: Props) => (
  <div
    className={`cart__item ${type ? `cart__item--${type}` : ''} ${
      index === 0 ? 'cart__item--initial' : ''
    }`}
  >
    <Label index={index}>{label}</Label>
    {children}
  </div>
);

export default CartItem;
