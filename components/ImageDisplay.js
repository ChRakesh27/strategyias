import React from "react";
import styles from "./ImageDisplay.module.css";
import Image from "next/image";
const ImageDisplay = ({ setIsImageShowing, images }) => {
  
  return (
    <div className={styles.imageDivContainer}>
      <div
        onClick={() => {
          setIsImageShowing(false);
        }}
        className={styles.crossDiv}
      >
        <div className={styles.cross1}></div>
        <div className={styles.cross2}></div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.imageDiv}>
          {images.map((data, index) => {
            return (
              <div key={index} className={styles.image}>
                <h1>Image: {index + 1}</h1>
                <Image
                  alt="Description of the image"
                  fill
                  priority
                  objectFit="contain"
                  objectPosition="center"
                  src={`data:image/jpeg;base64,${data}`}
                ></Image>
              </div>
            );
          })}
          {!images && (
            <div className={styles.image2}>
              <h1>No image uploaded</h1>
            </div>
          )}
        </div>
        ;
      </div>
    </div>
  );
};

export default ImageDisplay;
