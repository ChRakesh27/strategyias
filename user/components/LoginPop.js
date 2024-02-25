import React from "react";
import Link from "next/link";
const LoginPop = ({ handleLoginPop }) => {
  return (
    <div className="Pop">
      <div className="mainDiv">
        <h2>Please log in before using this function!</h2>
        <div className="btns">
          <button
            className="cancleBtn"
            onClick={(e) => {
              handleLoginPop(e);
            }}
          >
            cancle
          </button>
          <Link href={"/api/auth/signin"}>
            <button className="signinBtn">Log in</button>
          </Link>
          {/* <Link href={"/signup"}>
            <button className="signinBtn">Sign up</button>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default LoginPop;
