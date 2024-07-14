import React from "react";
import styles from "./styles.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
function Footer(props) {
  return (
    <Container fluid className={styles["container"]}>
      <Row className={styles["row"]} xs={2} md={3}>
        <Col className={styles["col"]}>
          <div className={styles["footer_col"]}>
            <div className={styles["header"]}>about</div>
            <div className={styles["content"]}>
              <p>contact</p>
              <p>service</p>
              <p>team</p>
            </div>
          </div>
        </Col>
        <Col className={styles["col"]}>
          <div className={styles["footer_col"]}>
            <div className={styles["header"]}>infomation</div>
            <div className={styles["content"]}>
              <p>Phùng Đức Mạnh - N20DCCN040</p>
              <p>D20CQCNPM01-N</p>
            </div>
          </div>
        </Col>
        <Col className={styles["col"]}>
          <div className={styles["footer_col"]}>
            <div className={styles["header"]}>follow me</div>
            <div className={styles["content"]}>
              <div className="d-flex flex-row justify-content-center align-items-center">
                <FaFacebook className="me-1 text-white" />
                <div className="text-white">mạnh đang suy</div>
              </div>
              <div className="d-flex flex-row justify-content-center align-items-center">
                <FaInstagram className="me-1 text-white" />
                <div className="text-white">mạnh đang suy</div>
              </div>
              <div className="d-flex flex-row justify-content-center align-items-center">
                <AiFillTikTok className="me-1 text-white" />
                <div className="text-white">phùng đức mạnh</div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
