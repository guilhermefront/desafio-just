import { ReactNode } from 'react';
import './cart.scss';
interface Props {
  index: number;
  children: ReactNode;
}
const Label = ({ index, children }: Props) =>
  index === 0 ? <p className="cart__label">{children}</p> : null;

export default Label;
