import React, { useEffect, useState } from "react";
import styles from "../../(styles)/carousel.module.css";
import Image from "next/image";

function Carousel({ ibecImgType }) {
  const CarouselImages = {
    introImgs: [
      "carousalsImages/Introductions/Aditya Srivastava Image 1.svg",
      "carousalsImages/Introductions/Aditya Srivastava Image 2.svg",
      "carousalsImages/Introductions/Aditya Srivastava Image 3.svg",
      "carousalsImages/Introductions/Animesh Pradhan image 1.svg",
      "carousalsImages/Introductions/Kunal Rastogi Image 1.svg",
      "carousalsImages/Introductions/Kunal Rastogi Image 2.svg",
      "carousalsImages/Introductions/Medha anand Image 1.svg",
      "carousalsImages/Introductions/Medha anand Image 2.svg",
      "carousalsImages/Introductions/Swati Sharma image 1.svg",
    ],

    bodyImgs: [
      "carousalsImages/Body/AIR 2 GS 2.svg",
      "carousalsImages/Body/AIR 2 GS 3-1.svg",
      "carousalsImages/Body/AIR 2 GS 3.svg",
      "carousalsImages/Body/AIR 13 GS 2-1.svg",
      "carousalsImages/Body/AIR 13 GS 2.svg",
      "carousalsImages/Body/AIR 44 GS 2.svg",
      "carousalsImages/Body/AIR 118 GS 3.svg",
    ],

    enhanImgs: [
      "carousalsImages/Enhancements/10 Sec Map.svg",
      "carousalsImages/Enhancements/Data & Example.svg",
      "carousalsImages/Enhancements/instant Connect.svg",
      "carousalsImages/Enhancements/Marks Magnification.svg",
      "carousalsImages/Enhancements/Representation.svg",
    ],

    conImgs: [
      "/carousalsImages/Conclusions/Committee as way forward.svg",
      "/carousalsImages/Conclusions/Multi-point conclusion.svg",
      "/carousalsImages/Conclusions/SDG as Conclusion.svg",
      "/carousalsImages/Conclusions/Use of Agencies, Constitutional Bodies.svg",
    ],
  };

  const images = CarouselImages[ibecImgType];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, images.length, isPaused]);

  const nextSlide = () => {
    setIsPaused(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setIsPaused(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div
      className={styles.carouselContainer}
      onMouseEnter={() => setIsPaused(true)} // Pause when mouse is over the carousel
      onMouseLeave={() => setIsPaused(false)} // Resume when mouse leaves
    >
      <button className={styles.prevButton} onClick={prevSlide}>
        &#10094;
      </button>
      <div className={styles.carouselWrapper}>
        <Image
          src={images[currentIndex]}
          width={600}
          height={500}
          alt={images[currentIndex]}
          className={styles.carouselImage}
        />
      </div>
      <button className={styles.nextButton} onClick={nextSlide}>
        &#10095;
      </button>
      <div className={styles.dotsContainer}>
        {images.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${
              currentIndex === index ? styles.active : ""
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
