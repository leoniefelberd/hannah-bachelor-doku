import Head from "next/head"
import { Component } from 'react'
import styles from "../styles/Home.module.scss";
import home from "../content/home.json"

// import ReactPlayer from 'react-player';


export default function Home(props) {

    console.log("home", home);



    

    // let { title, cats } = attributes
    return (
        <>
            <Head>
                <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
            </Head>

            hello hannah doku

            <div className={styles.viewwrapper}>
                <div className={styles.timelinewrapper}>
                    {home.week.map((week, k) => (
                        // return(
                        <div className={styles.weekwrapper} key={k}>
                            {week.title}
                            {week.galery.map((slideImage, index) => (
                                <div className={styles.slidewrapper} key={index}>
                                    {
                                        slideImage.type === 'video' &&
                                        <div className={styles.eachslidevideo} key={index}>
                                            video
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
                                        <div className={styles.eachslideimage} key={index}>
                                            <img
                                                className={styles.slide}
                                                src={slideImage.image}
                                            />
                                        </div>
                                    }
                                </div>
                            ))}
                            {/* ) */}
                        </div>
                    ))}
                </div>
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
        </>
    )
}
