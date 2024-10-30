import Link from "next/link";
import React from "react";
import { ICards } from "./Cards.prods";
import CardsItem from "./CardsItem";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Cards = ({ title, items, link }: ICards): JSX.Element => {
  const sliderSettings = {
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    arrows: true,
    dots: false,
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="card bg-slate-300 py-8">
      <div className="container">
        {title && <h1 dangerouslySetInnerHTML={{ __html: title }} />}
        {items && (
          <Slider {...sliderSettings}>
            {items.map((card, index) => (
              <div key={index}>
                <CardsItem {...card} />
              </div>
            ))}
          </Slider>
        )}
        {link?.url && (
          <Link href={link.url}>
            <a>{link.text}</a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Cards;
