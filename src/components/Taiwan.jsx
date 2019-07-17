import React, { useRef, useEffect, useState, useCallback } from "react";
import * as d3 from "d3";
import "../styles/Taiwan.css";
import { useSelector, useDispatch } from "react-redux";
import { setCountyAction } from "../redux/actions";
import { TweenMax } from "gsap";
import * as topojson from "topojson";

const taiwanTopoJSON = require("../assets/taiwan.topojson");
const data = require("../assets/resources.json");

const Taiwan = React.memo(function(props) {
  const mapRef = useRef(null);

  const taiwanMapRef = useRef(null);
  const dispatch = useDispatch();
  const countySetter = useCallback(val => dispatch(setCountyAction(val)), [
    dispatch
  ]);
  const [resized, setResized] = useState(null);
  const picture = useSelector(state => state.selectedPictures);
  const selectedCounty = useSelector(state => state.selectedCounty);

  useEffect(() => {
    TweenMax.set(mapRef.current, {
      opacity: 0
    });
    TweenMax.set(mapRef.current, {
      x: 20
    });
    TweenMax.to(mapRef.current, 1.4, {
      delay: 2.2,
      css: {
        opacity: 1,
        x: 0
      }
    });
  }, [picture]);

  useEffect(() => {
    const resize = () => {
      setResized(window.innerWidth);
    };
    window.addEventListener("resize", resize);
    let width;
    let height;
    if (window.innerWidth > 480) {
      width = window.innerWidth * 0.45;
      height = window.innerHeight * 0.35;
    } else {
      width = window.innerWidth * 0.4;
      height = window.innerHeight * 0.3;
    }

    let taiwanSVG;
    if (resized || picture) {
      d3.selectAll("svg#taiwan").remove();
    }
    taiwanSVG = d3
      .select(mapRef.current)
      .append("svg")
      .attr("id", "taiwan")
      .style("width", `${width}px`)
      .style("height", `${height}px`)
      .style("margin-top", "15%")
      .style("zIndex", "25")
      .append("g");

    if (window.innerWidth > 960) {
      d3.select("svg#taiwan").style("transform", "translateX(-15%)");
    } else if (window.innerWidth <= 960 && window.innerWidth > 480) {
      d3.select("svg#taiwan")
        .style("transform", "translateX(50%)")
        .style("margin-top", "24%");
    } else if (window.innerWidth <= 480) {
      d3.select("svg#taiwan")
        .style("transform", "translateX(100%)")
        .style("margin-top", "24%");
    }
    Promise.all([d3.json(taiwanTopoJSON)])
      .then(([dat]) => {
        ready(dat);
      })
      .catch(err => console.error(err));

    function ready(dat) {
      let counties = topojson.feature(dat, dat.objects.taiwan);
      let projection = d3.geoMercator();
      let path = d3.geoPath().projection(projection);
      projection.fitSize([width, height], counties);
      taiwanSVG
        .selectAll(".county")
        .data(counties.features)
        .enter()
        .append("path")
        .attr("class", "county")
        .attr("d", path)
        .style("zIndex", "25")
        .attr("id", function(d) {
          return d.properties.C_Name;
        })

        .style("fill", function() {
          if (data.images[picture - 1].county === this.id) {
            return "#50b6bb";
          } else if (this.id === selectedCounty) {
            return "#ca3e47";
          } else {
            return "#fff";
          }
        })

        .on("click", function(d) {
          const selected = this;

          countySetter(this.id);
          if (selected.id === selectedCounty) {
            countySetter(null);
          }

          d3.selectAll(".county")
            .transition()
            .duration(2000)
            .style("fill", function() {
              //county of the selected picture
              if (data.images[picture - 1].county === this.id) {
                return "#50b6bb";
              } else if (
                this.id === selected.id &&
                this.getAttribute("fill") !== "#ca3e47"
              ) {
                return "#ca3e47";
              } else {
                return "#fff";
              }
            });

          /*if (this.getAttribute("fill") === "#ca3e47") {
              this.setAttribute("fill", "#fff");
            } else if (
              this.getAttribute("fill") !== "#ca3e47" &&
              this.getAttribute("fill") !== "#50b6bb"
            ) {
              this.setAttribute("fill", "#ca3e47");
            }*/
        });
    }

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [resized, picture, selectedCounty, countySetter]);

  return (
    <div ref={taiwanMapRef} className="taiwanMapWrapper">
      <div className="mapWrapper" ref={mapRef} />
    </div>
  );
});

export default Taiwan;
