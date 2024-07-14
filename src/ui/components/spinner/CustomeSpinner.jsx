import React from "react";
import { Spinner } from "react-bootstrap";
import styles from "./styles.module.scss";

function CustomeSpinner(props) {
  return (
    <div className={styles["container"]}>
      <Spinner
        className={styles["spinner"]}
        animation="grow"
        variant="primary"
        {...props}
      />
    </div>
  );
}

export default CustomeSpinner;
