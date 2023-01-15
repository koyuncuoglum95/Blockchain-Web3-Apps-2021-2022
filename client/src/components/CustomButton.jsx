import React from 'react';

import styles from '../styles';

const CustomButton = ({ title, handleClick, restType }) => {
  return (
    <button 
      type='button'
      onClick={handleClick}
      className={`${styles.btn} ${restType}`}
    >
    {title}
    </button>
  )
}

export default CustomButton