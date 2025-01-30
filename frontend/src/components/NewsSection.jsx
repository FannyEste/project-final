import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./NewsSection.css"; 
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const newsData = [
  { title: "Hormonal Imbalance: Symptoms, Causes, and Treatment", date: "Published: 8 months ago", image: "/news1.webp", link: "https://www.medicalnewstoday.com/articles/321486" },
  { title: "Can Food Really Change Your Hormones?", date: "Published: 6 months ago", image: "/news2.webp", link: "https://time.com/7000236/can-food-change-your-hormones/" },
  { title: "Extra Moody, Struggling to Sleep or Can't Stop Overthinking? Your Hormones May Be Out of Whack - How to Spot the Signs", date: "Published: 6 months ago", image: "/news3.webp", link: "https://www.thescottishsun.co.uk/health/13236885/stop-overthinking-hormones-signs-anxious-moody-sleep/" },
  { title: "What Is the Luteal Phase? An Ob-Gyn Breaks It Down", date: "Published: 4 months ago", image: "/news4.webp", link: "https://www.popsugar.com/fitness/what-is-luteal-phase-49304990" },
  { title: "Cycle Syncing: How to Attune to Each Menstrual Phase", date: "Published: 3 months ago", image: "/news5.webp", link: "https://www.verywellhealth.com/cycle-syncing-8719265" },
  { title: "Is Contraception Under Attack?", date: "Published: last month", image: "/news6.webp", link: "https://www.newyorker.com/news/the-lede/is-contraception-under-attack" }
];

// 🔹 Custom Left Arrow Component
const CustomPrevArrow = ({ onClick }) => {
  return (
    <button className="custom-arrow custom-prev" onClick={onClick}>
      <FaChevronLeft />
    </button>
  );
};

// 🔹 Custom Right Arrow Component
const CustomNextArrow = ({ onClick }) => {
  return (
    <button className="custom-arrow custom-next" onClick={onClick}>
      <FaChevronRight />
    </button>
  );
};

const NewsSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false, 
    centerMode: true,
    centerPadding: "20px",
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerPadding: "10px"
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "5px"
        }
      }
    ]
  };

  return (
    <div className="news-section" id="news-section">
      {/* News Header with Scrolling Effect */}
      <div className="news-ticker">
        <h2>WHERE THE VIBES MEET SCIENCE</h2>
      </div>

      {/* News Carousel */}
      <Slider {...settings} className="news-carousel">
        {newsData.map((news, index) => (
          <div key={index} className="news-card">
            <a href={news.link} target="_blank" rel="noopener noreferrer">
              <img src={news.image} alt={news.title} className="news-image" />
              <div className="news-content">
                <h3>{news.title}</h3>
                <p>{news.date}</p>
              </div>
            </a>
          </div>
        ))}
      </Slider>

    </div>
  );
};

export default NewsSection;
