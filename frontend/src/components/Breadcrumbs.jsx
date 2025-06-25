import React from "react";
import { Breadcrumbs, Typography, Link } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const BreadcrumbsNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ m: 2 }}>
      <Link
        underline="hover"
        color="inherit"
        onClick={() => navigate("/")}
        sx={{ cursor: "pointer" }}
      >
        Početna
      </Link>

      {pathnames.map((value, index) => {
        const routeTo = "/" + pathnames.slice(0, index + 1).join("/");

        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <Typography color="text.primary" key={routeTo}>
            {decodeURIComponent(value)}
          </Typography>
        ) : (
          <Link
            underline="hover"
            color="inherit"
            onClick={() => navigate(routeTo)}
            key={routeTo}
            sx={{ cursor: "pointer" }}
          >
            {decodeURIComponent(value)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbsNav;
