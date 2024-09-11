"use client";
import { useEffect, useState } from "react";

const Modal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const curDate = new Date().toISOString();

  useEffect(() => {
    const modalClosedDate = localStorage.getItem("modalClosedDate");
    if (!modalClosedDate || isNewDay(new Date(modalClosedDate))) {
      setTimeout(() => {
        setIsVisible(true);
      }, 30000);
    }
  }, []);

  const isNewDay = (storedDate) => {
    const today = new Date();
    return (
      today.getDate() !== storedDate.getDate() ||
      today.getMonth() !== storedDate.getMonth() ||
      today.getFullYear() !== storedDate.getFullYear() ||
      (today.getHours() !== storedDate.getHours() &&
        today.getMinutes() >= storedDate.getMinutes())
    );
  };

  const closeModal = () => {
    setIsVisible(false);
    localStorage.setItem("modalClosedDate", new Date().toISOString());
  };

  return (
    <>
      {isVisible && (
        <div className="modal">
          <div className="modalBody">
            <div className="modalBtn">
              <button className="btnClose" onClick={closeModal}>
                &#x2715;
              </button>
            </div>
            <div className="admsg">
              <a href="https://t.me/strategy_ias" target="_blank">
                Get GS Wise Toppers answer copy compilation of UPSC 2023 Toppers
                at Rs. 199/GS Paper.
              </a>
              <div className="modal-footer">
                <a
                  className="btn-click-here"
                  href="https://t.me/strategy_ias"
                  target="_blank"
                >
                  Click Here
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Modal;
