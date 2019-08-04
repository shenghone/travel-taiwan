import React, { useRef, useState, useEffect } from "react";
import { TweenMax, TimelineMax } from "gsap";
import Draggable from "react-draggable";
import Picture from "./Picture";
import "../styles/Carousal.css";
import { selectPictureAction, setOffsetValueAction } from "../redux/actions";
import { useWidth } from "../utils/useWidth";
import { useSelector, useDispatch } from "react-redux";

const PICTURES = require("../assets/resources.json");

const Carousel = props => {
  const sectionRef = useRef(null);
  const barRef = useRef(null);
  const windowRef = useRef(null);
  const instructionRef = useRef(null);
  const loadingRef = useRef(null);
  const loaderRef = useRef(null);
  const [draggerWidth, setDraggerWidth] = useState(0);
  const [pictures, setPictures] = useState(null);
  const w = useWidth();

  const [startX, setStartX] = useState(null);
  //let redux handle the current offset value
  const dispatch = useDispatch();
  const offset = useSelector(state => state.offset);

  //the progress of loading pictures
  const progress = useSelector(state => state.percentage);

  const setOffsetValue = val => dispatch(setOffsetValueAction(val));
  //let redux handle the current selected picture
  const picture = useSelector(state => state.selectedPictures);

  const setPicture = p => dispatch(selectPictureAction(p));

  const handleDragStarts = e => {
    setStartX(e.pageX || e.targetTouches[0].pageX);
    TweenMax.to(windowRef.current.children, 1, {
      scale: 0.85
    });
    TweenMax.set(instructionRef.current, {
      css: {
        zIndex: 20
      }
    });
    TweenMax.to(instructionRef.current, 0.8, {
      css: {
        opacity: 0.7
      }
    });
  };

  const handleDragOver = e => {
    TweenMax.to(windowRef.current, 0.8, {
      x: offset + (e.pageX || e.targetTouches[0].pageX) - startX
    });
  };

  const handleDragEnds = e => {
    //bound is the total draggable distance
    const bound =
      windowRef.current.getBoundingClientRect().width - window.innerWidth;
    //totalOffset is the dragged distance
    let totalOffset = offset + (e.pageX || e.changedTouches[0].pageX) - startX;
    //the image inside the imageWrapper
    const imgs = Object.values(windowRef.current.children);
    //if out of bound, apply the closest end point relative to the current carousel status
    if (totalOffset > 0) {
      totalOffset = 0;
    } else if (totalOffset + bound <= 0) {
      totalOffset = -bound;
    }
    const animate = () => {
      TweenMax.to(windowRef.current, 0.8, {
        x: totalOffset
      });
      TweenMax.to(windowRef.current.children, 0.9, {
        css: {
          opacity: 1,
          scale: 1
        }
      });

      TweenMax.to(instructionRef.current, 1, {
        css: {
          opacity: 0,
          zIndex: -1
        }
      });

      imgs.forEach(i => {
        TweenMax.to(i.children, 0.5, {
          css: {
            scale: 1
          }
        });
      });
      instructionRef.current.style.zIndex = -1;
      windowRef.current.style.zIndex = 11;
    };
    setOffsetValue(totalOffset);

    window.requestAnimationFrame(animate);
  };

  //load the images for the carousel
  useEffect(() => {
    const { images } = PICTURES;
    setPictures(images);
  }, []);

  //set the draggable distance
  useEffect(() => {
    setDraggerWidth(windowRef.current.getBoundingClientRect().width * 4);
  }, [w]);

  useEffect(() => {
    if (picture) {
      instructionRef.current.style.zIndex = 25;
      TweenMax.set(windowRef.current.children, {
        scale: 0.9
      });
      TweenMax.to(windowRef.current.children, 0.6, {
        css: {
          scale: 0.8,
          zIndex: 24
        }
      });
      TweenMax.to(windowRef.current.children, 0.4, {
        css: {
          opacity: 0.4
        }
      });

      const et = new TimelineMax();
      et.to(instructionRef.current, 1.8, {
        opacity: 0.88
      }).to(instructionRef.current, 0.5, {
        css: {
          opacity: 0,
          zIndex: -1
        }
      });
    } else {
      TweenMax.set(windowRef.current.children, {
        scale: 0.6
      });
      TweenMax.to(windowRef.current.children, 0.6, {
        css: {
          scale: 1,
          zIndex: 25
        }
      });
      if (progress !== 0 && Math.round(progress * 100) % 100 === 0) {
        const et = new TimelineMax();
        et.to(instructionRef.current, 1.6, {
          delay: 0.35,
          css: {
            opacity: 0.75,
            zIndex: 25
          }
        }).to(instructionRef.current, 0.5, {
          css: {
            opacity: 0,
            zIndex: 2
          }
        });
      }
    }
  }, [picture, progress]);

  //loader animation, which only display when first loaded
  useEffect(() => {
    if (progress !== 0 && Math.round(progress * 100) / 100 === 1) {
      const et = new TimelineMax();
      et.to(barRef.current, 0.6, {
        width: `${Math.round(progress * 100)}%`
      })
        .to(barRef.current, 0.5, {
          opacity: 0
        })
        .to(barRef.current, 0.2, {
          display: "none"
        })
        .to(loaderRef.current, 0.1, {
          zIndex: -1
        });
      TweenMax.to(loadingRef.current, 0.1, {
        display: "none"
      });
    }
  }, [progress]);

  return (
    <section ref={sectionRef} className="carouselWrapper">
      {!picture && (
        <Draggable
          axis="x"
          handle=".dragger"
          defaultPosition={{ x: 0, y: 0 }}
          position={null}
          scale={1}
          allowAnyClick={true}
          onStart={handleDragStarts}
          onDrag={handleDragOver}
          onStop={handleDragEnds}
          bounds={{ right: 0, left: -draggerWidth }}
        >
          <div style={{ width: draggerWidth }} className="dragger" />
        </Draggable>
      )}
      <section className="window" ref={windowRef}>
        {!pictures ? (
          <h2>loading</h2>
        ) : (
          pictures.map((p, index, self) => {
            return (
              <Picture
                picture={picture}
                setPicture={setPicture}
                key={index}
                title={p.title}
                inx={p.index}
                imageLink={p.link}
                lastOne={self.length}
                constant={1}
              />
            );
          })
        )}
      </section>
      <section className="instruction" ref={instructionRef}>
        <div className="textBox">
          <h3>Travel</h3>
          {!picture && <p>Drag right/left to start the journey</p>}
          {picture && <p>{PICTURES.images[picture - 1].title}</p>}
        </div>
      </section>
      <section className="loader" ref={loaderRef}>
        <h4 ref={loadingRef}>LOADING</h4>
        <section className="bar" ref={barRef} />
      </section>
    </section>
  );
};

export default Carousel;
