import React from "react";
import Description from "../components/Description";
import Carousel from "../components/Carousel";
import { useSelector } from "react-redux";

import "../styles/Home.css";
const PICTURES = require("../assets/resources.json");

const Home = () => {
  const picture = useSelector(state => state.selectedPictures);

  const { images } = PICTURES;

  return (
    <div className="homeWrapper">
      <Carousel />
      {picture && (
        <Description len={images.length} imageToDisplay={images[picture - 1]} />
      )}
    </div>
  );
};

export default Home;
