"use client";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
function DashBoard() {
  //   const { data: session } = useSession();
  //   console.log("user", session);

  return (
    <>
      <div className="dashboard">
        <div className="cart">
          <div className="cart-body">
            <div>1 Year</div>
            <div>20Q/day</div>
          </div>
          <div className="cart-footer">
            <Link href={"/quiz"} className="btn btn-outline-primary">
              Start
            </Link>
          </div>
        </div>
        <div className="cart">
          <div className="cart-body">
            <div>Subject Wise</div>
            <div>MCQ Practice</div>
          </div>
          <div className="cart-footer">
            <Link href={"/quiz"} className="btn btn-outline-primary">
              Start
            </Link>
          </div>
        </div>
        <div className="cart">
          <div className="cart-body">
            <div>Topic Wise</div>
            <div>MCQ Practice</div>
          </div>
          <div className="cart-footer">
            <Link href={"/quiz"} className="btn btn-outline-primary">
              Start
            </Link>
          </div>
        </div>
        <div className="cart">
          <div className="cart-body">
            <div>Book Wise</div>
            <div>MCQ Practice</div>
          </div>
          <div className="cart-footer">
            <Link href={"/quiz"} className="btn btn-outline-primary">
              Start
            </Link>
          </div>
        </div>
        <div className="cart">
          <div className="cart-body">
            <div>50Q/day</div>
            <div>MCQ Practice</div>
          </div>
          <div className="cart-footer">
            <Link href={"/quiz"} className="btn btn-outline-primary">
              Start
            </Link>
          </div>
        </div>
        <div className="cart">
          <div className="cart-body">
            <div>100Q/day</div>
            <div>MCQ Practice</div>
          </div>
          <div className="cart-footer">
            <Link href={"/quiz"} className="btn btn-outline-primary">
              Start
            </Link>
          </div>
        </div>
        <div className="cart">
          <div className="cart-body">
            <div>Daily current After</div>
            <div>10Q/day</div>
          </div>
          <div className="cart-footer">
            <Link href={"/quiz"} className="btn btn-outline-primary">
              Start
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashBoard;
