import React from 'react'

import styles from '../styles';

const ActionButton = ({ imgUrl, handleClick, restType }) => {
  return (
    <div className={`${styles.gameMoveBox} ${styles.flexCenter} ${styles.glassEffect} ${restType}`} onClick={handleClick}>
      <img src={imgUrl} alt="action_img" className={styles.gameMoveIcon}/>
    </div>
  )
}

export default ActionButton