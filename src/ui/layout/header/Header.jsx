import React, { useState } from "react";
import styles from "./styles.module.scss";
import { FaBars } from "react-icons/fa";

function Header({ isShowMenu, handleShowMenu }) {
  return (
    <div className={styles["container"]}>
      <FaBars
        className={
          isShowMenu
            ? `${styles["menu-icon"]} ${styles["--show"]}`
            : styles["menu-icon"]
        }
        onClick={() => {
          if (handleShowMenu) {
            handleShowMenu(!isShowMenu);
          }
        }}
      />
      <div className={styles["title"]}>PTIT HCM</div>
    </div>
  );
}

export default Header;
