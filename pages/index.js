import Head from "next/head"
import React, { Component, useEffect, useState } from 'react'
import styles from "../styles/Home.module.scss";
import home from "../content/home.json"
import ReactPlayer from "react-player"
import ReactDOM from "react-dom";


import FilterElement from '../components/FilterElement/FilterElement';

export default function Home(props) {


    //FILTER
    const allKategories = ["Zeit", "Zeitung", "Zeiger", "Zeneggen", "Uhr", "Testen", "Sammeln", "Schatten", "Schreiben", "Sonne", "Struggle", "Projizieren", "Natur", "Notizen", "Miro", "Lesen", "Loading", "Kalender", "Gefundenes", "Endspurt", "Experimentieren", "Beobachten", "Ausstellen"];
    const [filter, setFilter] = useState(["Zeit"])


    // //nach Kategorie filtern
    // function filterBy(data, filterterms) {
    //     return data.filter((obj) => {
    //         return filterterms.every((term) => {
    //             return obj.kategorie.toString().includes(term);
    //         })
    //     })
    // }

    const addMoreItem = (item) => {
        const copyfilter = [...filter]
        var index = copyfilter.indexOf(item);
        if (index !== -1) {
            copyfilter.splice(index, 1);
            setFilter([...copyfilter])
        }
        else {
            // wenn mehrere aktiviert sein sollen : setFilter([...filter, item])
            setFilter([item])
        }
    }

    // const [filterdList, setFilterdList] = useState([...home.galery])
    // const [pageSize, setpageSize] = useState(filterdList.length)

    // useEffect(() => {
    //     setFilterdList(filterBy(home.galery, filter))

    // }, [filter])
    // console.log("updated filtered List", filterdList)




    // useEffect(() => {
    //     setpageSize(filterdList.length)

    // }, [filterdList])
    // console.log("updated page size", pageSize)
    // console.log("filtered list", filterdList)




    // console.log(pageSize)




    // GALERY ITEM FUNCTIONS
    // console.log("home", home);

    var space = -300;			// offset between neighboring items on Y and Z axis
    var angle = 3;

    // console.log(home.galery.length);
    // var weekitems = 0;
    // console.log(home.week.length);
    // for (var i = 0; i < home.week.length; i++) {
    //     weekitems += home.week[i].galery.length;
    //     // console.log("home.week[i].length", home.week[i].galery.length)		
    // }

    var pageSize = home.galery.length;	// number of items each page
    // console.log("weekitems", weekitems)		

    // var MAX_SIZE = pageSize;
    var data = [];				// position of each item

    var current_index = 1;		// the sequence number of current item
    // var max_index = pageSize;

    var page;

    useEffect(() => {
        // pageSize = filterdList.length;	
        // const collection = document.getElementsByClassName('my-text');
        // the sequence number of the last item
        page = document.getElementById('page');	// the DOM element where the items are placed

        data.push(new Item(0, 0, 0));     //fill the first element data[0], so that the index == DOM li sequence

        function Item(translate_y, translate_z) {	// data structure for storing the positions
            this.translate_y = translate_y;
            this.translate_z = translate_z;
            // this.rotate_z = rotate_z;
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
            if (n <= pageSize) {
                // console.log("filterdList.length", filterdList.length, "pageSize", pageSize)


                var new_y = data[n].translate_y + y;
                var new_z = data[n].translate_z + y;
                // var new_rz = data[n].rotate_z + angle * y / space;		// calculate new position of n th item

                var elementN = document.getElementById(n);

                var filterelement = document.getElementById('filterwrapper');
                // console.log("if click on filterelement", filterelement.onclick == true)
                // filterelement.onclick = function () { jumpTo(1) };
                // console.log("elementN", elementN, n)
                elementN.onclick = function () { jumpTo(n) };
                // animate n th item with CSS3 translate3d and rotate3d methods
                // elementN.style.webkitTransform = 'translateX(' + (-0.3 * new_y) + 'px) translateY(' + new_y + 'px) translateZ(' + new_z + 'px) ';
                elementN.style.transform = 'translateX(' + (-0.3 * new_y) + 'px) translateY(' + new_y + 'px) translateZ(' + new_z + 'px) ';
                elementN.style.opacity = 1;

                // console.log("new_y", new_y, "n", n, "translateX", -0.3 * new_y, "translateY", new_y)

                data[n].translate_y = new_y;
                data[n].translate_z = new_z;
                // data[n].rotate_z = new_rz;						// save its new position
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
                for (var n = current_index + pageSize; n <= pageSize; n++) {	// update the positions of next invisible items
                    animate(n, space, 0);
                }
            }
        }

        function next() {
            if (current_index < data.length && current_index < pageSize) {
                // console.log("current_index", current_index)
                document.getElementById(current_index).style.opacity = 1;	//hide current item
                current_index++;
                // if (current_index + pageSize - 1 > max_index && max_index < MAX_SIZE) {	// maximum 60 items allowed
                //     add(current_index + pageSize - 1);		// load a new item if available
                // }
                for (var n = 1; n < current_index; n++) {		// update the positions of previous invisible items
                    animate(n, -1 * space, 0);
                    // console.log("n next n = 1", n)
                }
                for (var n = current_index; n < current_index + pageSize; n++) {	// update the positions of current visible items
                    animate(n, -1 * space, 1);
                    // console.log("n next n = current index", n)
                }
                for (var n = current_index + pageSize; n <= pageSize; n++) {	// update the positions of next invisible items
                    animate(n, -1 * space, 0);
                    // console.log("n next n = current index + pagesize", n)
                }
            }
        }
    }, []);




    return (
        <>
            <Head>
                <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>

                <title>Dokumentation Bachelorthesis Hannah Boldt</title>
                <link rel="icon" href="../Cursor-normal.png" />
                <meta name="description" content="Dokumentation Bachelorthesis Hannah Boldt" />
            </Head>

            {/* hello hannah doku */}
<div id="filterwrapper">
<FilterElement  props={allKategories} filter={filter} addMoreItem={addMoreItem} setFilter={setFilter} />

</div>
           
            <div class="sitetitlewrapper">
                <div class="mobileinfo">
                    Bitte schaue die Website am Laptop an! :)
                </div>
                <div class="sitetitle">
                    other times <br></br>
                    <br></br>
                    Dokumentation<br></br>
                    Bachelorthesis 2023<br></br>
                    Hannah Boldt<br></br>
                    <br></br>
                    BA Visuelle Kommunikation<br></br>
                    Hochschule der Künste Bern
                </div>

            </div>


            <div
                // className={styles.viewwrapper}
                id="view"
            >
                {/* <div  className={styles.timelinewrapper}> */}
                <ul id="page">
                    {/* {home.week.map((week, k) => {
                        return (
                            // <div className={styles.weekwrapper} key={k}>
                            // {week.title}
                            <> */}
                    {home.galery.map((slideImage, index) => {

                        // console.log("anzahl filter", slideImage.kategorie.length)

                        let zindexindividual = pageSize + 100 - index;

                        let showdefinition = "block";
                        // console.log(filter, slideImage.kategorie, filter[0] == slideImage.kategorie[0] || filter[0] == slideImage.kategorie[1])

                        if (filter.length == 0) {
                            showdefinition = "block"
                            // console.log("no filter aktiv, alle darstellen")
                        }
                        else if (filter[0] == slideImage.kategorie[0] || filter[0] == slideImage.kategorie[1] || filter[0] == slideImage.kategorie[2] || filter[0] == slideImage.kategorie[3] || filter[0] == slideImage.kategorie[4] || filter[0] == slideImage.kategorie[5] || filter[0] == slideImage.kategorie[6] || filter[0] == slideImage.kategorie[7] || filter[0] == slideImage.kategorie[8] || filter[0] == slideImage.kategorie[9] || filter[0] == slideImage.kategorie[10]){
                            // console.log(filter, slideImage.kategorie)
                            showdefinition = "block"
                        } else {
                            showdefinition = "none"
                        }

                        index += 1;
                        // console.log("slideImage", slideImage, index)

                        return (
                            <li
                                className={styles.slidewrapper}
                                // className={[styles.slidewrapper, (filter ? styles.filter : [])].join(' ')}
                                key={index}
                                id={index}
                                style={{ 'zIndex': `${zindexindividual}`, 'display': `${showdefinition}` }}

                            >
                                {
                                    slideImage.type === 'video' &&
                                    // <div className={styles.eachslidevideo}
                                    //     key={index}
                                    // >

                                    <>
                                        <video
                                            controls
                                            width="600px"
                                            onMouseOut={event => event.target.pause()}
                                        >
                                            <source src={slideImage.videolink}
                                            //  type="video/mp4" 

                                            />
                                            Sorry, your browser doesn't support embedded videos.
                                        </video>
                                        {/* <div className="kalenderwoche">
                                            {slideImage.kalenderwoche}
                                        </div> */}
                                    </>
                                    // </div>
                                }
                                {
                                    slideImage.type === 'image' &&
                                    // <div className={styles.eachslideimage}
                                    //     key={index}

                                    // >
                                    <>
                                        <img
                                            className={styles.slide}
                                            src={slideImage.image}
                                            width="600px"
                                        />
                                        {/* <div className="kalenderwoche">
                                            {slideImage.kalenderwoche}
                                        </div> */}
                                    </>
                                    // </div>
                                }
                            </li>
                        )
                    })}
                    {/* </>
                        )
                    })} */}
                </ul>
            </div>

            <div class="zeitstrahlwrapper">
                KW23
                <img
                    class="zeitstrahl"
                    src="../img/Weg-allblack.png"
                    width="600px"
                />
                KW6
            </div>



        </>
    )
}
