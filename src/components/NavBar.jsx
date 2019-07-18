import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { selectPictureAction, setCountyAction } from "../redux/actions";
import "../styles/NavBar.css";

const NavBar = React.memo(function({ location }) {
  const dispatch = useDispatch();
  const setPicture = p => dispatch(selectPictureAction(p));
  const setCounty = () => dispatch(setCountyAction(null));
  const handleClick = () => {
    setPicture(null);
    setCounty(null);
  };
  const { pathname } = location;

  return (
    <div className="navBarWrapper">
      <div className="logo" onClick={handleClick}>
        <div className="taiwanWrapper">
          <svg
            className="smallTaiwan"
            width="744.09448819"
            height="1052.3622047"
          >
            <g id="layer1">
              <path
                d="m 482.71179,62.057259 c 30.30146,-53.4718904 67.74379,-45.91986 109.98835,10.91549 44.0945,-2.97649 91.0204,40.749661 17.3468,78.338461 -26.4051,49.26016 20.4201,81.62548 -2.9873,132.35584 -18.5422,55.68947 -60.04131,88.9065 -61.30116,150.79977 -10.70122,67.82672 -30.3082,104.72776 -44.81143,171.58894 -14.38987,49.15018 -26.03539,99.63324 -51.80128,143.14844 -20.72916,44.26273 -51.06911,44.35262 -76.11488,84.94885 -29.26765,58.63519 -34.65475,128.70911 -37.371,193.28745 -72.00851,33.4059 -25.94715,-89.70844 -81.69261,-112.94618 C 204.7695,855.1341 229.46303,880.02787 179.23849,839.14967 146.00566,827.52742 163.82861,744.32025 115.01319,705.46818 81.952173,652.77121 111.6552,630.03571 126.74879,582.25787 128.85762,527.10086 104.99533,489.33162 193.65978,410.25672 250.53692,272.65999 294.96784,275.43223 329.95793,185.82584 350.28354,133.89933 431.61363,62.960649 482.71179,62.057259 z"
                id="path5828"
              />
            </g>
          </svg>
        </div>
        <Link
          style={{
            marginTop: "0.15rem",
            color: "#fff",
            textDecoration: "none",
            letterSpacing: "0.04rem",
            fontWeight: "bold",
            textShadow: "-1px -1px -1px rgba(256,256,256,0.4)"
          }}
          to="/"
        >
          Travel Taiwan
        </Link>
      </div>
      <ul>
        <li className="aboutWrapper">
          <Link
            to="/about"
            style={{
              color: "#fff",
              display: pathname === "/about" ? "none" : "block",
              textDecoration: "none",
              fontWeight: "bold"
            }}
          >
            about
          </Link>
        </li>
      </ul>
    </div>
  );
});

export default NavBar;
