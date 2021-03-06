import React, { useRef, useEffect, useCallback } from "react";

import _ from "lodash";
import { TweenMax, TimelineMax } from "gsap";
import "../styles/Picture.css";
import { loadImageAction } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const Picture = React.memo(({ lastOne, ...props }) => {
  const pictureWrapperRef = useRef(null);
  const placeNameRef = useRef(null);
  const imgRef = useRef(null);
  const dispatch = useDispatch();
  const imageLoaded = useCallback(val => dispatch(loadImageAction(val)), [
    dispatch
  ]);
  const progress = useSelector(state => state.percentage);

  const getMargin = () => {
    const { inx } = props;
    if (inx === 1) {
      return "0";
    } else {
      return "0 0 0 15px";
    }
  };
  const { setPicture, picture, inx, imageLink, title } = props;
  const handleClick = e => {
    setPicture(inx);
  };

  useEffect(() => {
    if (progress !== 0 && Math.round(progress * 100) % 100 === 0) {
      const animate = () => {
        const et = new TimelineMax();
        et.set(imgRef.current, {
          opacity: 1
        });
        et.from(pictureWrapperRef.current, _.random(0.8, 1.4), {
          opacity: -2,
          y: _.random(-140, -165)
        }).to(pictureWrapperRef.current, 0.6, {
          delay: 1,
          opacity: 1,
          y: 0
        });
      };
      window.requestAnimationFrame(animate);
    } else {
      const et = new TimelineMax();
      et.set(imgRef.current, {
        opacity: 0
      });
    }
  }, [progress]);

  useEffect(() => {
    const currentObject = pictureWrapperRef.current;
    if (picture) {
      const objectDimension = currentObject.getBoundingClientRect();
      if (picture) {
        TweenMax.to(currentObject, _.random(0.6, 1), {
          delay: 1,
          y: -objectDimension.y - objectDimension.height,
          opacity: 0
        });
      }
    } else {
      TweenMax.to(currentObject, _.random(0.6, 1), {
        y: 0,
        opacity: 1
      });
    }
  }, [picture, inx]);
  return (
    <div
      style={{
        margin: getMargin(),
        height: "250px"
      }}
      onClick={handleClick}
      className="pictureWrapper"
      ref={pictureWrapperRef}
    >
      <img
        onLoad={() => {
          imageLoaded(1 / lastOne);
        }}
        ref={imgRef}
        style={{ opacity: 0 }}
        src={imageLink}
        alt="place"
      />
      <div className="selector">
        <p ref={placeNameRef} className="placeName">
          {title || "unknown"}
        </p>
      </div>
    </div>
  );
});

export default Picture;
