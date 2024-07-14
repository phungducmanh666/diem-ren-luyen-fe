import React, { useState } from "react";
import styles from "./styles.module.scss";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";

function LayoutTemplate(props) {
  const [isShowMenu, setIsShowMenu] = useState(true);
  const handleShowMenu = (isShow) => {
    setIsShowMenu(isShow);
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["header"]}>
        <Header isShowMenu={isShowMenu} handleShowMenu={handleShowMenu} />
      </div>
      <div className={styles["body"]}>
        <div
          className={`${styles["sidebar"]} ${!isShowMenu && styles["--hide"]}`}
        >
          <Sidebar />
        </div>
        <div className={styles["main"]}>
          <div className={styles["page"]}>
            <Outlet />
          </div>
          <div className={styles["footer"]}>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutTemplate;
