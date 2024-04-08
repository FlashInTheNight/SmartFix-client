import { CustomArrowProps } from 'react-slick'

export interface IBrandsSliderArrow extends CustomArrowProps {
  modeClass: string;
  positionClass?: string;
  // ref?: React.RefObject<HTMLButtonElement>
  onClick?: () => void;
}
