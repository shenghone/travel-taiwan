import React, { useRef, useState, useEffect } from "react";
import { TweenMax, TimelineMax, Expo } from "gsap";
import { useWidth } from "../utils/useWidth";
import "../styles/About.css";

const About = React.memo(() => {
  const tRef = useRef(null);
  const tSpanRef = useRef(null);
  const pRef = useRef(null);
  const pSpanRef = useRef(null);
  const mRef = useRef(null);
  const mSpanRef = useRef(null);
  const ulRef = useRef(null);
  const desRef = useRef(null);
  const aboutTaiwanRef = useRef(null);
  const nameRef = useRef(null);
  const developerRef = useRef(null);
  const [width] = useWidth();
  const blkRef = useRef(null);
  //pictures ref
  const roadRef = useRef(null);
  const cliffRef = useRef(null);
  const trackRef = useRef(null);

  //picture wrapper ref
  const pictureWrapperRef = useRef(null);
  const [selectedTopic, setTopic] = useState("taiwan");
  const handleHover = (e, passedRef, passedSpanRef) => {
    const currentText = passedRef.current;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx.font = "1rem Roboto";
    if (width < 960) {
      ctx.font = "0.8rem Roboto";
    }

    const textWidth = ctx.measureText(currentText.innerText).width;
    TweenMax.to(passedSpanRef.current, 0.3, {
      css: {
        width: width > 960 ? textWidth * 1.28 : textWidth * 1.3
      }
    });
  };

  const handleLeave = (e, passedRef, passedSpanRef) => {
    TweenMax.to(passedSpanRef.current, 0.3, {
      css: {
        width: 0
      }
    });
  };

  const handleClick = topic => {
    desRef.current.style.opacity = 0;
    setTopic(topic);
  };

  const getContent = () => {
    if (selectedTopic === "taiwan") {
      return (
        <>
          <p style={{ opacity: 0, letterSpacing: "0.1rem" }}>
            Taiwan was ruled by Japan for 5 decades (1895 - 1945). Since that,
            Taiwan has many cities and infrastructures were designed by Japanese
            and many are still in use. As for Taiwanese people, most of their
            ancestors were immigrants from sounthern China, mainly from Fujian
            between 17-19 century and 1945-1949. Because of those two factors,
            above its chinese root, Taiwan is covered by a thin layer of
            Japanese veil.
          </p>
          <br />
          <p style={{ opacity: 0 }}>
            Taiwan is known for night markets and Taipei 101 among foreigners.
            To me, as a Taiwanese, the most facinating thing to experience is
            the street vendor and the litte stores around corner. Not about food
            though, I'm talking about the people who boil noodles, the people
            who fry stinky tofu. As the last picture on the carousel shows.
            There must be at least one vendor in every Taiwanese' memory. For
            example, every time I go back to Taiwan, I always go to this
            breakfast store. The owner would casually put an extra poached egg
            or extra chicken fillet on my plate. At that time, it's not about
            the food. It's about the memories and the people. No matter the last
            time I went was two or three years ago. It always touched my heart
            as if the owner was saying - "welcome home".
          </p>
        </>
      );
    } else if (selectedTopic === "project") {
      return (
        <p
          style={{
            opacity: 0,
            letterSpacing: "0.2rem",
            lineHeight: "1.5rem",
            textAlign: "justify"
          }}
        >
          This project is an experiment on HTML5 drag API, D3 map, React hooks
          in Redux and GSAP animation. All the pictures come from{" "}
          <a
            style={{
              textDecoration: "underline",
              display: "inline",
              color: "#fff"
            }}
            href="https://unsplash.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Unsplash
          </a>
          . Thanks for all the unselfish photagraphers, I see you.
        </p>
      );
    } else if (selectedTopic === "me") {
      TweenMax.to(trackRef.current, 1.4, {
        zIndex: 1,
        opacity: 1
      });
      return (
        <section
          style={{
            display: "grid",
            justifySelf: "center",
            justifyItems: "center",
            opacity: 0
          }}
        >
          <h4
            ref={nameRef}
            style={{
              color: "f8f8f8",
              fontSize: "1.5rem",
              letterSpacing: "0.2rem",
              margin: "1rem 0",
              textAlign: "center"
            }}
          >
            Sheng Hung Tsai
          </h4>
          <h5
            ref={developerRef}
            style={{
              color: "#83142c",
              fontSize: "1.2rem",
              letterSpacing: "0.25rem",
              textAlign: "center"
            }}
          >
            Toronto based web developer
          </h5>
          <ul
            ref={ulRef}
            style={{ display: "flex", listStyle: "none", marginTop: "1rem" }}
          >
            <li style={{ margin: "0 1rem", transform: "scale(0.55)" }}>
              <a
                href="https://www.instagram.com/shenghone/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  viewBox="0 0 26 26"
                  version="1.1"
                  width="26px"
                  height="26px"
                >
                  <g id="surface1">
                    <path
                      fill="#fff"
                      d="M 7.546875 0 C 3.390625 0 0 3.390625 0 7.546875 L 0 18.453125 C 0 22.609375 3.390625 26 7.546875 26 L 18.453125 26 C 22.609375 26 26 22.609375 26 18.453125 L 26 7.546875 C 26 3.390625 22.609375 0 18.453125 0 Z M 7.546875 2 L 18.453125 2 C 21.527344 2 24 4.46875 24 7.546875 L 24 18.453125 C 24 21.527344 21.53125 24 18.453125 24 L 7.546875 24 C 4.472656 24 2 21.53125 2 18.453125 L 2 7.546875 C 2 4.472656 4.46875 2 7.546875 2 Z M 20.5 4 C 19.671875 4 19 4.671875 19 5.5 C 19 6.328125 19.671875 7 20.5 7 C 21.328125 7 22 6.328125 22 5.5 C 22 4.671875 21.328125 4 20.5 4 Z M 13 6 C 9.144531 6 6 9.144531 6 13 C 6 16.855469 9.144531 20 13 20 C 16.855469 20 20 16.855469 20 13 C 20 9.144531 16.855469 6 13 6 Z M 13 8 C 15.773438 8 18 10.226563 18 13 C 18 15.773438 15.773438 18 13 18 C 10.226563 18 8 15.773438 8 13 C 8 10.226563 10.226563 8 13 8 Z "
                    />
                  </g>
                </svg>
              </a>
            </li>
            <li style={{ margin: "0 1rem", transform: "scale(0.55)" }}>
              <a
                href="https://github.com/shenghone"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  viewBox="0 0 26 26"
                  version="1.1"
                  width="26px"
                  height="26px"
                >
                  <g id="surface1">
                    <path
                      fill="#fff"
                      d="M 13 0.1875 C 5.925781 0.1875 0.1875 5.925781 0.1875 13 C 0.1875 20.074219 5.925781 25.8125 13 25.8125 C 20.074219 25.8125 25.8125 20.074219 25.8125 13 C 25.8125 5.925781 20.074219 0.1875 13 0.1875 Z M 13 2.1875 C 18.960938 2.1875 23.8125 7.039063 23.8125 13 C 23.8125 13.46875 23.777344 13.921875 23.71875 14.375 C 23.519531 14.324219 22.894531 14.164063 22.21875 14.15625 C 21.613281 14.148438 20.886719 14.25 20.5 14.3125 C 20.601563 13.898438 20.6875 13.457031 20.6875 13 C 20.6875 11.859375 20.257813 10.75 19.5 9.8125 C 19.78125 8.929688 20.171875 6.921875 19.40625 6.15625 C 17.53125 6.15625 16.476563 7.347656 16.28125 7.59375 C 15.421875 7.28125 14.492188 7.125 13.5 7.125 C 12.53125 7.125 11.59375 7.265625 10.75 7.5625 C 10.488281 7.246094 9.453125 6.15625 7.65625 6.15625 C 6.90625 6.90625 7.28125 8.839844 7.5625 9.75 C 6.769531 10.703125 6.3125 11.832031 6.3125 13 C 6.3125 13.429688 6.347656 13.859375 6.4375 14.25 C 6.109375 14.222656 4.777344 14.125 4.25 14.125 C 3.722656 14.125 2.855469 14.238281 2.28125 14.375 C 2.222656 13.921875 2.1875 13.46875 2.1875 13 C 2.1875 7.039063 7.039063 2.1875 13 2.1875 Z M 4.25 14.375 C 4.769531 14.375 6.371094 14.519531 6.53125 14.53125 C 6.558594 14.625 6.589844 14.71875 6.625 14.8125 C 6.097656 14.769531 4.96875 14.695313 4.25 14.78125 C 3.371094 14.886719 2.722656 15.234375 2.46875 15.375 C 2.414063 15.128906 2.351563 14.875 2.3125 14.625 C 2.863281 14.496094 3.761719 14.375 4.25 14.375 Z M 22.21875 14.40625 C 22.875 14.414063 23.519531 14.554688 23.6875 14.59375 C 23.671875 14.707031 23.644531 14.824219 23.625 14.9375 C 23.539063 14.914063 22.757813 14.675781 21.9375 14.65625 C 21.535156 14.644531 20.898438 14.710938 20.40625 14.75 C 20.429688 14.6875 20.449219 14.625 20.46875 14.5625 C 20.808594 14.515625 21.617188 14.398438 22.21875 14.40625 Z M 21.90625 14.90625 C 22.703125 14.925781 23.546875 15.175781 23.59375 15.1875 C 22.855469 18.777344 20.335938 21.699219 17 23.03125 L 17 21.3125 C 17 20.230469 16.355469 18.824219 15.4375 18.125 C 18.023438 17.753906 19.632813 16.609375 20.3125 15 C 20.777344 14.960938 21.488281 14.894531 21.90625 14.90625 Z M 5.0625 15 C 5.777344 15.003906 6.417969 15.039063 6.71875 15.0625 C 7.414063 16.636719 9.011719 17.757813 11.5625 18.125 C 11.273438 18.347656 11.003906 18.636719 10.78125 18.96875 C 10.773438 18.980469 10.757813 18.988281 10.75 19 C 10.25 19.601563 9.3125 19.5625 8.4375 19.5625 C 7.542969 19.5625 7.007813 18.847656 6.53125 18.21875 C 6.050781 17.59375 5.425781 17.539063 5.09375 17.5 C 4.761719 17.464844 4.671875 17.632813 4.84375 17.75 C 5.816406 18.433594 6.199219 19.269531 6.59375 20 C 6.949219 20.65625 7.679688 21 8.5 21 L 10.03125 21 C 10.019531 21.101563 10 21.214844 10 21.3125 L 10 23.375 C 6.316406 22.3125 3.464844 19.359375 2.53125 15.625 C 2.726563 15.515625 3.414063 15.132813 4.28125 15.03125 C 4.488281 15.007813 4.765625 15 5.0625 15 Z M 13.5 21 C 13.777344 21 14 21.222656 14 21.5 L 14 23.75 C 13.667969 23.78125 13.339844 23.8125 13 23.8125 L 13 21.5 C 13 21.222656 13.222656 21 13.5 21 Z M 11.5 21.59375 C 11.777344 21.59375 12 21.816406 12 22.09375 L 12 23.75 C 11.667969 23.71875 11.324219 23.683594 11 23.625 L 11 22.09375 C 11 21.816406 11.222656 21.59375 11.5 21.59375 Z M 15.5 21.59375 C 15.777344 21.59375 16 21.816406 16 22.09375 L 16 23.375 C 15.671875 23.46875 15.339844 23.5625 15 23.625 L 15 22.09375 C 15 21.816406 15.222656 21.59375 15.5 21.59375 Z "
                    />
                  </g>
                </svg>
              </a>
            </li>
            <li
              style={{ margin: "-3px 1rem 0 1rem", transform: "scale(0.55)" }}
            >
              <a
                href="mailto://shenghone@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  viewBox="0 0 29 29"
                  version="1.1"
                  width="29px"
                  height="29px"
                >
                  <g id="surface1">
                    <path
                      fill="#fff"
                      d="M 6 7.03125 C 5.691406 7.03125 5.402344 7.089844 5.125 7.175781 L 8.039063 9.03125 L 23.960938 9.03125 L 26.875 7.175781 C 26.597656 7.089844 26.308594 7.03125 26 7.03125 Z M 4.113281 7.71875 C 3.4375 8.269531 3 9.097656 3 10.03125 L 3 23.03125 C 3 24.683594 4.347656 26.03125 6 26.03125 L 26 26.03125 C 27.652344 26.03125 29 24.683594 29 23.03125 L 29 10.03125 C 29 9.097656 28.5625 8.269531 27.886719 7.71875 L 16 15.28125 Z M 6 12.445313 L 16 18.8125 L 26 12.445313 L 26 24.03125 L 6 24.03125 Z "
                    />
                  </g>
                </svg>
              </a>
            </li>
          </ul>
        </section>
      );
    }
  };

  useEffect(() => {
    TweenMax.set([desRef.current, desRef.current.children], {
      opacity: 0,
      y: -30
    });
    const et = new TimelineMax();
    et.to([roadRef.current, cliffRef.current, trackRef.current], 0.8, {
      zIndex: -1,
      opacity: 0
    });
    const animate = () => {
      TweenMax.to([desRef.current, desRef.current.children], 1.5, {
        delay: 1.4,
        opacity: 1,
        y: 0
      });
      const et = new TimelineMax();
      et.set(blkRef.current, {
        width: 0,
        left: 0,
        ease: Expo.ease
      })
        .to(blkRef.current, 1, {
          width: "100%",
          right: 0,
          ease: Expo.ease
        })
        .to(blkRef.current, 1, {
          width: "0%",
          left: "100%",
          ease: Expo.ease
        });
      TweenMax.set([mRef.current, pRef.current, tRef.current], {
        color: "#fff"
      });
      if (selectedTopic === "taiwan") {
        TweenMax.to(tRef.current, 1, {
          color: "#83142c"
        });
        et.to(roadRef.current, 1, {
          zIndex: 1,
          opacity: 1
        });
      } else if (selectedTopic === "project") {
        et.to(cliffRef.current, 1, {
          zIndex: 1,
          opacity: 1
        });
        TweenMax.to(pRef.current, 1, {
          color: "#83142c"
        });
      } else if (selectedTopic === "me") {
        et.to(trackRef.current, 1, {
          zIndex: 1,
          opacity: 1
        });
        TweenMax.to(mRef.current, 1, {
          color: "#83142c"
        });
      }
    };

    window.requestAnimationFrame(animate);
  }, [selectedTopic]);

  useEffect(() => {
    const w = window.innerWidth;
    if (selectedTopic === "me" && w <= 960) {
      nameRef.current.style.fontSize = "0.9rem";
      developerRef.current.style.fontSize = "0.7rem";
    } else if (selectedTopic === "me" && w > 960) {
      nameRef.current.style.fontSize = "1.5rem";
      developerRef.current.style.fontSize = "1.2rem";
    }
  }, [width, selectedTopic]);

  return (
    <div className="aboutOutterWrapper">
      <div className="des" ref={desRef}>
        {getContent()}
      </div>
      <div className="aboutContentWrapper">
        <div className="aboutInnerWrapper" ref={aboutTaiwanRef}>
          <div className="aboutTaiwan">
            <h1
              className="aboutLink"
              onMouseEnter={e => handleHover(e, tRef, tSpanRef)}
              onMouseLeave={e => handleLeave(e, tRef, tSpanRef)}
              ref={tRef}
              onClick={() => handleClick("taiwan")}
            >
              <span ref={tSpanRef} className="aboutSpan" />
              taiwan
            </h1>
          </div>
          <div className="aboutTheProject">
            <h1
              ref={pRef}
              className="aboutLink"
              onMouseEnter={e => handleHover(e, pRef, pSpanRef)}
              onMouseLeave={e => handleLeave(e, pRef, pSpanRef)}
              onClick={() => handleClick("project")}
            >
              <span ref={pSpanRef} className="aboutSpan" />
              project
            </h1>
          </div>
          <div className="aboutTheAuthor">
            <h1
              ref={mRef}
              className="aboutLink"
              onMouseEnter={e => handleHover(e, mRef, mSpanRef)}
              onMouseLeave={e => handleLeave(e, mRef, mSpanRef)}
              onClick={() => handleClick("me")}
            >
              <span ref={mSpanRef} className="aboutSpan" />
              me
            </h1>
          </div>
        </div>
        <div ref={blkRef} className="blk" />
      </div>
      <div ref={pictureWrapperRef} className="aboutPictureWrapper">
        <img
          ref={roadRef}
          src="https://images.unsplash.com/photo-1547996273-ef34cecf9b3f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
          alt=""
        />
        <img
          ref={cliffRef}
          src="https://images.unsplash.com/photo-1507777957713-84018c1e1f41?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80"
          alt=""
        />
        <img
          ref={trackRef}
          src="https://images.unsplash.com/photo-1558382950-d9c6c9977c0f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
          alt=""
        />
      </div>
    </div>
  );
});

export default About;
