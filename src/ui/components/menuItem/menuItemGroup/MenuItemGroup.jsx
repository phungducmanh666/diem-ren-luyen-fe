import React from "react";
import styles from "./styles.module.scss";
import { IoIosArrowForward } from "react-icons/io";

function MenuItemGroup({ icon, text, children }) {
  const [isShowChilds, setIsShowChilds] = React.useState(false);
  const handleClick = () => {
    setIsShowChilds(!isShowChilds);
  };
  return (
    <div className={styles["menu-item-group"]}>
      <div className={styles["parent"]} onClick={handleClick}>
        <div className={styles["parent__icon"]}>{icon}</div>
        <div className={styles["parent__text"]}>{text}</div>
        <div
          className={`${styles["parent__icon"]} ${
            isShowChilds
              ? styles["parent__icon__arrow--show"]
              : styles["parent__icon__arrow"]
          }`}
        >
          <IoIosArrowForward />
        </div>
      </div>
      <div className={isShowChilds ? styles["childs--show"] : styles["childs"]}>
        {children}
      </div>
    </div>
  );
}

export default MenuItemGroup;
