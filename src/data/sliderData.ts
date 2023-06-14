import slider1 from "../assets/slide1.jpg";
import slider2 from "../assets/slide2.jpg";
import slider3 from "../assets/slide3.jpg";
import pattern1 from "../assets/pattern1.jpg";
import pattern2 from "../assets/pattern2.jpg";
import pattern3 from "../assets/pattern3.jpg";
interface ISliderData {
  imgUrl: string;
  title: string;
  description: string;
  shopUrl: string;
  productUrl: string;
  mobileImgUrl: string;
}
const sliderData: ISliderData[] = [
  {
    imgUrl: slider1,
    title: "Rebel Against Financial Mediocrity",
    description: "Sick of the same old financial routines?",
    shopUrl: "#",
    productUrl: "#",
    mobileImgUrl: pattern1,
  },
  {
    imgUrl: slider2,
    title: "Unleash Your Financial Maverick",
    description: "Ready to challenge the status quo?",
    shopUrl: "#",
    productUrl: "#",
    mobileImgUrl: pattern2,
  },
  {
    imgUrl: slider3,
    title: "Shatter the Boundaries!",
    description: "Tired of conforming to society's financial norms?",
    shopUrl: "#",
    productUrl: "#",
    mobileImgUrl: pattern3,
  },
];

export default sliderData;
