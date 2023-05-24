import '../styles/globals.scss'
import "../styles/Home.module.scss";
// import color from "../pages/color/color.json"
// import band from "../pages/bands/bands.json"

import React, { useState, useEffect, useRef, useLayoutEffect, useContext } from "react";

function MyApp({ Component, pageProps }) {
  // console.log("color", color.colorcombo)
  // console.log("band", band.band)

  // const scale = (fromRange, toRange) => {
  //   const d = (toRange[1] - toRange[0]) / (fromRange[1] - fromRange[0]);
  //   return from => (from - fromRange[0]) * d + toRange[0];
  // };


  useEffect(() => {

   
    var currentPosition = 0;
    var updatePosition = function () {
      currentPosition = window.pageYOffset / (document.body.offsetHeight - window.innerHeight)
     

      // console.log("neuer Wert", scale([-300, 300], [0, 1])(currentPosition));
      console.log("currentPosition", currentPosition, "window.pageYOffset", window.pageYOffset)
      // document.getElementById('indicator').textContent = currentPosition;
      //--scroll ist immer was zwischen 0 und 1
      document.body.style.setProperty(
        "--scroll", currentPosition
      );
    };

    document.addEventListener('scroll', updatePosition);


  }, []);




  return (
    <Component
      {...pageProps}
    />

  )
}

export default MyApp
