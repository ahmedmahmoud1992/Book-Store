import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "./UserInfo.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFooterMargin,
  setFooterMargin,
} from "../../Redux/Slicies/appSlice";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useMediaQuery } from "@mui/material";

const UserInfo = () => {
  const { footerH, navH } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(removeFooterMargin());
    return () => dispatch(setFooterMargin());
  }, [dispatch]);

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const isSmallScreen = useMediaQuery('(max-width:991px)');

  return (
    <>
      <Box
        sx={{
          marginTop: `${navH}px`,
          minHeight: `calc(100vh - ${footerH + navH}px)`,
        }}
      >
        <div className={`row ${styles.row} w-100 flex-lg-row flex-column align-items-center align-items-lg-start`}>
          <div className="col-lg-3 col-md-10 col-12">
            <nav
              className={`sidebar d-flex flex-column align-item-start p-3 h-100 align-items-center`}
            >
              <h3 className="my-4">
                <div className={`${styles.sidebarHeader} fw-bold`}>User Profile</div>
              </h3>

              <Box sx={{ width: "100%" }}>
                <Tabs
                  orientation={isSmallScreen? "horizontal" : "vertical"}
                  sx={isSmallScreen?{ borderBottom: 1, borderColor: "divider" }:{ borderRight: 1, borderColor: "divider" }}
                  onChange={handleChange}
                  value={value}
                  aria-label="Tabs where selection follows focus"
                  variant="scrollable"
                  selectionFollowsFocus
                >
                  <Tab onClick={() => navigate("")} icon={<i className="fa-solid fa-user"></i>} iconPosition="start" label="User Info" />
                  <Tab
                    onClick={() => navigate("favourites")} icon={<i className="fa-solid fa-heart"></i>} iconPosition="start" label="Favourites" />
                  <Tab
                    onClick={() => navigate("settings")} icon={<i className="fa-solid fa-gear"></i>} iconPosition="start" label="Settings" />
                </Tabs>
              </Box>
            </nav>
          </div>
          <div className="col-lg-9 col-md-10 col-12 mt-lg-5 mt-3">
            <Outlet></Outlet>
          </div>
        </div>
      </Box>
    </>
  );
};

export default UserInfo;