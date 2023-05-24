import Head from "next/head"
import React, { Component, useEffect } from 'react'
import styles from "../styles/Home.module.scss";
import home from "../content/home.json"
import ReactPlayer from "react-player"

import ReactDOM from "react-dom";


export default function Home(props) {

    console.log("home", home);

    var space = -300;			// offset between neighboring items on Y and Z axis
    var angle = 3;

    // console.log(home.galery.length);
    var pageSize = home.galery.length;			// number of items each page

    var MAX_SIZE = pageSize;
    var data = [];				// position of each item


    var current_index = 1;		// the sequence number of current item
    var max_index = pageSize;

    var page;

    useEffect(() => {
        // const collection = document.getElementsByClassName('my-text');
        // the sequence number of the last item
        page = document.getElementById('page');	// the DOM element where the items are placed

        data.push(new Item(0, 0, 0));     //fill the first element data[0], so that the index == DOM li sequence

        function Item(translate_y, translate_z, rotate_z) {	// data structure for storing the positions
            this.translate_y = translate_y;
            this.translate_z = translate_z;
            this.rotate_z = rotate_z;
        }
        for (var n = 1; n < pageSize + 1; n++) {			// put 10 items initially
            data.push(new Item(n * space, n * space, (n - 1) * angle));
            // add(n);
        }
        for (var n = 1; n < pageSize + 1; n++) {
            animate(n, 0, 1);			// animate 10 items added
        }

        document.onkeydown = function (event) {
            if (event.keyCode == '37' || event.keyCode == '40') {    //left or down  --> previous
                prev();
            }
            else if (event.keyCode == '39' || event.keyCode == '38') {    //right or up --> next
                next();
            }
        };

        function shortCut(event) {
            if (event.wheelDelta > 0) {				// mouse wheel rolls forward
                next();
            }
            else if (event.wheelDelta < 0) {
                prev();								// mouse wheel rolls backward
            }
        }
        function shortCutFF(event) {				// only for Firefox, because it doesn't support onmousewheel event
            if (event.detail < 0) {					// mouse wheel rolls forward
                next();
            }
            else if (event.detail > 0) {
                prev();								// mouse wheel rolls backward
            }
        }
        if ("onmousewheel" in document) {
            document.onmousewheel = shortCut;		// Webkit & IE
        } else {
            document.addEventListener('DOMMouseScroll', shortCutFF, false);			// firefox
        }

        function jumpTo(n) {							// keep moving forward to show the n th item
            for (var i = current_index; i < n; i++) {
                next();
            }
        }

        function animate(n, y, opacity) {
            if (n <= MAX_SIZE) {
                var new_y = data[n].translate_y + y;
                var new_z = data[n].translate_z + y;
                var new_rz = data[n].rotate_z + angle * y / space;		// calculate new position of n th item

                var elementN = document.getElementById(n);
                elementN.onclick = function () { jumpTo(n) };
                // animate n th item with CSS3 translate3d and rotate3d methods
                // elementN.style.webkitTransform = 'translateX(' + (-0.3 * new_y) + 'px) translateY(' + new_y + 'px) translateZ(' + new_z + 'px) ';
                elementN.style.transform = 'translateX(' + (-0.3 * new_y) + 'px) translateY(' + new_y + 'px) translateZ(' + new_z + 'px) ';
                elementN.style.opacity = 1;

                // console.log("new_y", new_y, "n", n, "translateX", -0.3 * new_y, "translateY", new_y)

                data[n].translate_y = new_y;
                data[n].translate_z = new_z;
                data[n].rotate_z = new_rz;						// save its new position
            }
        }


        function prev() {
            if (current_index > 1) {
                document.getElementById(current_index - 1).style.opacity = 1;	// show last item
                current_index--;
                for (var n = 1; n < current_index; n++) {		// update the positions of previous invisible items
                    animate(n, space, 0);
                }
                for (var n = current_index; n < current_index + pageSize; n++) {	// update the positions of current visible items
                    animate(n, space, 1);
                }
                for (var n = current_index + pageSize; n <= max_index; n++) {	// update the positions of next invisible items
                    animate(n, space, 0);
                }
            }
        }

        function next() {
            if (current_index < data.length && current_index < MAX_SIZE) {
                document.getElementById(current_index).style.opacity = 1;	//hide current item
                current_index++;
                // if (current_index + pageSize - 1 > max_index && max_index < MAX_SIZE) {	// maximum 60 items allowed
                //     add(current_index + pageSize - 1);		// load a new item if available
                // }
                for (var n = 1; n < current_index; n++) {		// update the positions of previous invisible items
                    animate(n, -1 * space, 0);
                }
                for (var n = current_index; n < current_index + pageSize; n++) {	// update the positions of current visible items
                    animate(n, -1 * space, 1);
                }
                for (var n = current_index + pageSize; n <= max_index; n++) {	// update the positions of next invisible items
                    animate(n, -1 * space, 0);
                }
            }
        }
    }, []);




    return (
        <>
            <Head>
                <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>

                {/* <meta charset="utf-8"></meta>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
    <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
    <meta name="description"
        content="An Demonstration of CSS3 3D Time Machine Effect, inspired by @joecritchley's demo: http://joecritchley.com/demos/time-machine/"></meta>
    <meta name="author" content="coderLMN"></meta>
    <script src="https://code.jquery.com/jquery-3.7.0.min.js" integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous"></script>
    <title>An Demonstration of CSS3 3D Time Machine Effect</title>
    <link rel="shortcut icon" href="http://www.studycolony.com/img/favicon.ico"></link> */}
            </Head>

            {/* hello hannah doku */}

            {/* <body> */}
            <div
                // className={styles.viewwrapper}
                id="view"
            >
                {/* <div  className={styles.timelinewrapper}> */}
                <ul id="page">
                    {/* {home.week.map((week, k) => ( */}
                    {/* // return( */}
                    {/* <div className={styles.weekwrapper} key={k}> */}
                    {/* {week.title} */}
                    {home.galery.map((slideImage, index) => {

                        let zindexindividual = pageSize + 100 - index;

                        console.log("slideImage", slideImage)

                        return (
                            <li className={styles.slidewrapper}
                                key={index}
                                id={index + 1}
                                style={{ 'zIndex': `${zindexindividual}` }}
                            >
                                {
                                    slideImage.type === 'video' &&
                                    <div className={styles.eachslidevideo}
                                        key={index}
                                    >
                                        
                                        {/* <iframe src="https://player.vimeo.com/video/81007030?h=62949ac305&color=ffffff&title=0&byline=0&portrait=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                                        <p><a href="https://vimeo.com/81007030">ECAL/Photography - Class of Sannwald</a> from <a href="https://vimeo.com/ecal">ECAL</a> on <a href="https://vimeo.com">Vimeo</a>.</p> */}
                                        {/* <ReactPlayer
                                            url={slideImage.videolink}
                                            // controls={true}
                                            onMouseOver={event => event.target.play()}
                                            onMouseOut={event => event.target.pause()}
                                        /> */}
                                        <video
                                            // poster="https://i.imgur.com/Us5ckqm.jpg"
                                            // onMouseOver={e => e.target.play()}
                                            onMouseOut={e => e.target.pause()}
                                            controls={true}
                                            src={slideImage.videolink}
                                            width="600px"
                                            // height="800px"
                                        >
                                        </video>
                                        {/* <ReactPlayer
                                            url="https://vimeo.com/3155182"
                                        /> */}
                                        {/* <ReactPlayer
                                            url={slideImage.videolink}
                                            controls={true}
                                            width='100%'
                                            height='100%'
                                        /> */}
                                        {/* <ReactPlayer
                                            className={styles.slidevideo}
                                            url={slideImage.videolink}
                                            controls={false}
                                            width='100%'
                                            height='100%'
                                            playing={props.playonclick}
                                            pip={true}
                                            autoPlay={false}
                                        // onClick={props.setPlay}
                                        // onClick={() => props.setPlay(true)}
                                        // onPlay={() => props.setPlay(true)}
                                        /> */}
                                    </div>
                                }
                                {
                                    slideImage.type === 'image' &&
                                    // <div className={styles.eachslideimage}
                                    //     key={index}

                                    // >
                                    <img
                                        className={styles.slide}
                                        src={slideImage.image}
                                        width="600px"
                                    />
                                    // </div>
                                }
                            </li>
                        )
                    })}
                    {/* ) */}
                    {/* </div> */}
                </ul>
                {/* ))} */}
                {/* </div> */}
            </div>
            {/* <article>
          <h1>{title}</h1>
          <HomeContent />
          <ul>
            {cats.map((cat, k) => (
              <li key={k}>
                <h2>{cat.name}</h2>
                <p>{cat.description}</p>
              </li>
            ))}
          </ul>
        </article> */}
            {/* </body> */}
        </>
    )
}
