import React from "react";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const DeleteSurePop = ({ handleDeleteClick, topper }) => {
  const [loading, setLoading] = useState(false);
  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = { topperId: topper._id, profileImage: topper.ProfileImage };
    try {
      const response = await axios.post("/api/admin/deleteTopper", data);

      setLoading(false);
      toast.success("Deleted the topper successfully.");
      window.location.reload();
      // router.push("/admin/toppers-page");
      handleDeleteClick(e);
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
      return;
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="Pop">
      <div className="mainDiv">
        <h2>
          Are you sure you want to delete this topper -{topper.firstname}{" "}
          {topper.lastname} ?
        </h2>
        <div className="btns">
          <button
            className="cancleBtn"
            onClick={(e) => {
              handleDeleteClick(e);
            }}
          >
            cancle
          </button>
          {!loading && (
            <button
              onClick={(e) => {
                handleDeleteSubmit(e);
              }}
              className="deleteBtn"
            >
              delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteSurePop;
