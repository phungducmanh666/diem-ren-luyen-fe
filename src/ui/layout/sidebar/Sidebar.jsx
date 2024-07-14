import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import MenuItem from "~/ui/components/menuItem/menuItem/MenuItem";
import { FaChartPie, FaHome, FaUserCog } from "react-icons/fa";
import MenuItemGroup from "~/ui/components/menuItem/menuItemGroup/MenuItemGroup";
import { IoCalendarOutline, IoSettingsOutline } from "react-icons/io5";
import { SiGoogletagmanager } from "react-icons/si";
import { GrScorecard } from "react-icons/gr";
import { Link } from "react-router-dom";

function Sidebar(props) {
  const [url, setUrl] = useState();
  const linkRef = useRef();

  const handleClickMenuItem = (url) => {
    setUrl(url);
  };

  useEffect(() => {
    linkRef.current.click();
  }, [url]);

  return (
    <>
      <Link ref={linkRef} to={url}></Link>
      <div className={styles["container"]}>
        <MenuItem
          text="Trang chủ"
          icon={<FaHome />}
          handleClick={() => handleClickMenuItem("/")}
        />
        <MenuItemGroup text="Quản lý" icon={<IoSettingsOutline />}>
          <MenuItemGroup text="Chung" icon={<SiGoogletagmanager />}>
            <MenuItem
              text="Nhóm tiêu chí"
              handleClick={() =>
                handleClickMenuItem("/management/criteria-group")
              }
            />
            <MenuItem
              text="Tiêu chí"
              handleClick={() => handleClickMenuItem("/management/criteria")}
            />
            <MenuItem
              text="Học kì"
              handleClick={() => handleClickMenuItem("/management/semester")}
            />
            <MenuItem
              text="Khoa"
              handleClick={() => handleClickMenuItem("/management/faculty")}
            />
            <MenuItem
              text="Lớp"
              handleClick={() => handleClickMenuItem("/management/class")}
            />
          </MenuItemGroup>

          <MenuItemGroup text="Người dùng" icon={<FaUserCog />}>
            <MenuItem
              text="Tài khoản"
              handleClick={() => handleClickMenuItem("/management/account")}
            />
            <MenuItem
              text="Quyền truy cập"
              handleClick={() => handleClickMenuItem("/management/role")}
            />
            <MenuItem
              text="Nhân viên"
              handleClick={() => handleClickMenuItem("/management/staff")}
            />
            <MenuItem
              text="Giảng viên"
              handleClick={() => handleClickMenuItem("/management/teacher")}
            />
            <MenuItem
              text="Sinh viên"
              handleClick={() => handleClickMenuItem("/management/student")}
            />
          </MenuItemGroup>
        </MenuItemGroup>
        <MenuItemGroup text="Chấm điểm rèn luyện" icon={<GrScorecard />}>
          <MenuItem
            text="Chấm điểm cho lớp"
            handleClick={() => handleClickMenuItem("/criteria-score/class")}
          />
          <MenuItem
            text="Tự chấm điểm rèn luyện"
            handleClick={() => handleClickMenuItem("/criteria-score/student")}
          />
        </MenuItemGroup>
        <MenuItemGroup text="Thống kê" icon={<FaChartPie />}>
          <MenuItem
            text="Quản lý thống kê"
            handleClick={() => handleClickMenuItem("/criteria-score/class")}
          />
          <MenuItem
            text="Điểm rèn luyện Lớp"
            handleClick={() => handleClickMenuItem("/criteria-score/student")}
          />
        </MenuItemGroup>
      </div>
    </>
  );
}

export default Sidebar;
