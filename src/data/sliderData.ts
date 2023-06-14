import slider1 from '../assets/pattern4.jpg';
import slider2 from '../assets/pattern4.jpg';
import slider3 from '../assets/pattern4.jpg';

interface ISliderData {
  imgUrl: string;
  title: string;
  description: string;
  shopUrl: string;
  productUrl: string;
}
const sliderData: ISliderData[] = [
  {
    imgUrl: slider1,
    title: 'Dare to defy?',
    description:
      "We have created an escape the shackles of what society's views as the norm now the choice is yours to break free and be you with our stylish Collections.",
    shopUrl: '#',
    productUrl: '#',
  },
  {
    imgUrl: slider2,
    title: 'Get a new fit from us',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tincidunt consectetur, nisi nunc pretium nisl, euismod.',
    shopUrl: '#',
    productUrl: '#',
  },
  {
    imgUrl: slider3,
    title: 'Fashion made simple',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tincidunt consectetur, nisi nunc pretium nisl, euismod.',
    shopUrl: '#',
    productUrl: '#',
  },
];

export default sliderData;
