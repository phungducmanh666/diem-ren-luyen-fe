import React from "react";
import styles from "./styles.module.scss";

function MenuItem({ text, icon, handleClick }) {
  return (
    <div className={styles["menu-item"]} onClick={handleClick}>
      <div className={styles["menu-item__icon"]}>{icon}</div>
      <span className={styles["menu-item__text"]}>{text}</span>
    </div>
  );
}

export default MenuItem;
