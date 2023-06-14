import slider1 from "../assets/slide1.jpg";
import slider2 from "../assets/slide2.jpg";
import slider3 from "../assets/slide3.jpg";

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
    title: "Rebel Against Financial Mediocrity",
    description: "Sick of the same old financial routines?",
    shopUrl: "#",
    productUrl: "#",
  },
  {
    imgUrl: slider2,
    title: "Unleash Your Financial Maverick",
    description: "Ready to challenge the status quo?",
    shopUrl: "#",
    productUrl: "#",
  },
  {
    imgUrl: slider3,
    title: "Shatter the Boundaries!",
    description: "Tired of conforming to society's financial norms?",
    shopUrl: "#",
    productUrl: "#",
  },
];

export default sliderData;
