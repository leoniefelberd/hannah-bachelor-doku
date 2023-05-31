import styles from './filterelement.module.scss'
import React, { useState, useEffect, useContext } from 'react'


export default function FilterElement(props) {
  // console.log("props Filter Element", props)


  let FilterElement;
  if (props.filter) {
    FilterElement = <div className={styles.categorywrapper} >
      {props.props.map((kategorie) => {
        //  console.log("kategorie", kategorie)
        
        let active_class;
        if (props.filter.includes(kategorie)) {
          // console.log("filter jetzt aktiv", props.filter)
          active_class = styles.categorytitleactive
        }
        else {
          active_class = styles.categorytitle
        }
        return (
          <div className={active_class} key={kategorie}
          onClick={() => props.addMoreItem(kategorie)}>
            <div className={styles.bubble}></div>
            <a
              
              key={kategorie}
            >
              {kategorie}
            </a>
          </div>
        )
      })}
    </div>
  }

  return (
    <div>
      {/* <div
        className={styles.sitetitle}
        onClick={() => props.setFilter([])}
      >
        Roshan Adhihetty
      </div> */}

      {FilterElement}
    </div>

  )

}