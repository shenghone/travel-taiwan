import React, { useRef, useEffect } from "react";
import Taiwan from "./Taiwan";
import { TweenMax, TimelineMax } from "gsap";
import { useWidth } from "../utils/useWidth";
import { useSelector } from "react-redux";
import "../styles/Description.css";

const Description = ({ len, ...props }) => {
  const blockerRef = useRef(null);
  const countyRef = useRef(null);
  const unsplashRef = useRef(null);
  const titleRef = useRef(null);
  const imageInnerWrapperRef = useRef(null);
  const imgWrapperRef = useRef(null);
  const authorNameRef = useRef(null);
  const [width] = useWidth();
  const imgRef = useRef(null);
  const wRef = useRef(null);
  const selectedCounty = useSelector(state => state.selectedCounty);

  const {
    index,
    link,
    title,
    chinese,
    county,
    photagrapher
  } = props.imageToDisplay;

  //animate the selecteded picture
  const handleHover = e => {
    imgWrapperRef.current.style.zIndex = "100";
    const animate = () => {
      TweenMax.to(imageInnerWrapperRef.current, 1, {
        scale: 0.95
      });
      TweenMax.to(imgRef.current, 1, {
        scale: 1.4
      });
      TweenMax.set(authorNameRef.current, {
        x: 0,
        opacity: 1
      });
      TweenMax.to(authorNameRef.current, 1, {
        x: -20,
        opacity: 0
      });
      if (width > 960) {
        TweenMax.to(unsplashRef.current, 0.8, {
          opacity: 1,
          x: 40
        });
      } else if (width < 960 && width > 480) {
        TweenMax.to(unsplashRef.current, 0.8, {
          opacity: 1,
          x: -35
        });
      } else if (width <= 480) {
        TweenMax.to(unsplashRef.current, 0.8, {
          opacity: 1,
          x: -15
        });
      }
    };
    window.requestAnimationFrame(animate);
  };

  const handleLeave = () => {
    imgWrapperRef.current.style.zIndex = "14";
    TweenMax.to(imageInnerWrapperRef.current, 1, {
      scale: 1
    });
    TweenMax.to(imgRef.current, 1, {
      scale: 1
    });
    TweenMax.to(authorNameRef.current, 1, {
      x: 0,
      opacity: 1
    });
    TweenMax.to(unsplashRef.current, 1, {
      opacity: 0,
      x: 0
    });
  };

  useEffect(() => {
    const et = new TimelineMax();

    et.from(wRef.current, 3, {
      opacity: -10
    })
      .from(countyRef.current, 1.1, {
        y: -20,
        delay: -0.9
      })
      .from(titleRef.current, 1.2, {
        delay: -1.1,
        x: -30
      });
    const dimension = imgRef.current.getBoundingClientRect();
    if (dimension.height > dimension.width) {
      TweenMax.set(imgWrapperRef.current, {
        css: {
          gridColumn: "6 / span 5"
        }
      });

      TweenMax.set(imageInnerWrapperRef.current, {
        css: {
          height: "100%"
        }
      });
      TweenMax.set(imgRef.current, {
        css: {
          height: "100%"
        }
      });
    } else {
      TweenMax.set(imageInnerWrapperRef.current, {
        css: {
          width: "100%"
        }
      });
      TweenMax.set(imgRef.current, {
        width: "100%"
      });
    }
  }, []);

  useEffect(() => {
    const dimension = imgRef.current.getBoundingClientRect();
    if (dimension.height > dimension.width) {
      if (width > 960) {
        TweenMax.set(imgWrapperRef.current, {
          css: {
            gridColumn: "6 / span 5"
          }
        });
      } else if (width && width <= 960 && width > 480) {
        TweenMax.set(imgWrapperRef.current, {
          css: {
            gridColumn: "2 / span 3",
            justifyItems: "center"
          }
        });
      } else if (width && width <= 480) {
        TweenMax.set(imgWrapperRef.current, {
          css: {
            gridColumn: "2 / span 6",
            justifyItems: "center"
          }
        });
      }
    }
    if (dimension.height < dimension.width) {
      if (width <= 480) {
        TweenMax.set(imgWrapperRef.current, {
          css: {
            gridColumn: "1 / span 7",
            justifyItems: "center"
          }
        });
      } else if (width > 480 && width <= 960) {
        TweenMax.set(imgWrapperRef.current, {
          css: {
            gridColumn: "2 / span 3",
            justifyItems: "center"
          }
        });
      } else if (width > 960) {
        TweenMax.set(imgWrapperRef.current, {
          css: {
            gridColumn: "5 / span 5",
            justifyItems: "center"
          }
        });
      }
    }
  }, [width]);

  const getIndex = index => {
    if (index < 10) {
      return `0${index}`;
    } else {
      return `${index}`;
    }
  };

  return (
    <div ref={wRef} className="descriptionWrapper">
      <h4 className="num">{`${getIndex(index)}/${len}`}</h4>
      <div className="detailedDescriptionWrapper">
        <div className="descriptionArea">
          <h4 ref={countyRef}>{county}</h4>
          <div ref={titleRef} className="titleWrapper">
            <h3>{title}</h3>
            <h4 className="chinese">{chinese}</h4>
          </div>
          <p />
        </div>
        <Taiwan />
        {selectedCounty && (
          <div className="selectedCounty">
            <h4>{selectedCounty}</h4>
          </div>
        )}
      </div>
      <div ref={imgWrapperRef} className="imgWrapper">
        <div ref={imageInnerWrapperRef} className="imageInnerWrapper">
          <div ref={blockerRef} className="blocker" />
          <img
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            ref={imgRef}
            src={link}
            alt="pic"
          />
        </div>
      </div>
      <h3 id="unsplash" ref={unsplashRef} className="authorName">
        On Unsplash
      </h3>
      <h3 ref={authorNameRef} className="authorName">
        By {photagrapher}
      </h3>
    </div>
  );
};

export default Description;
