"use client";
import React, { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({});

  function onSubmitHandler(e) {
    e.preventDefault();
    console.log("🚀 ~ Register ~ formData:", formData);
  }

  return (
    <div>
      <h1>Register for the Course</h1>
      <form onSubmit={onSubmitHandler}>
        <div>
          <div>Name</div>
          <input
            type="text"
            onChange={(e) =>
              setFormData((val) => {
                return { ...val, name: e.target.value };
              })
            }
          />
        </div>
        <div>
          <div>Email</div>
          <input
            type="email"
            onChange={(e) =>
              setFormData((val) => {
                return { ...val, email: e.target.value };
              })
            }
          ></input>
        </div>
        <div>
          <div>Phone Number</div>
          <input
            type="number"
            onChange={(e) =>
              setFormData((val) => {
                return { ...val, phone: e.target.value };
              })
            }
          ></input>
        </div>
        <div>
          <div>Target Year</div>
          <select
            onChange={(e) =>
              setFormData((val) => {
                return { ...val, targetYear: e.target.value };
              })
            }
            defaultValue={""}
          >
            <option disabled value={""}>
              Select Target Year
            </option>
            <option value={2024}>2024</option>
            <option value={2023}>2023</option>
          </select>
        </div>
        <div>
          <div>Issues that you are facing currently</div>
          <textarea
            onChange={(e) =>
              setFormData((val) => {
                return { ...val, issues: e.target.value };
              })
            }
          ></textarea>
        </div>
        <div>
          <div>Course interested</div>
          <select
            onChange={(e) =>
              setFormData((val) => {
                return { ...val, course: e.target.value };
              })
            }
            defaultValue={""}
          >
            <option disabled value={""}>
              Select Course
            </option>
            <option value={"c1"}>c1</option>
            <option value={"c2"}>c2</option>
          </select>
        </div>
        <div>
          <div>Upload Payment Screenshot</div>
          <input type="file"></input>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Register;
