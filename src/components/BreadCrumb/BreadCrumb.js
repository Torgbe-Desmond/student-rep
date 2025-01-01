import { Breadcrumbs, Button, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addBreadCrumb, clearBreadCrumb } from "../../Features/PathSlice";
import { useEffect } from "react";
import "./BreadCrumb.css";
import clsx from "clsx";

const Breadcrumb = ({ breadcrumbs = [], isDarkMode }) => {
  const { directoryId, reference_Id } = useParams();
  const { moveItemsArray = [], status } = useSelector((state) => state.work);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  
  useEffect(() => {
    const historyData = moveItemsArray.filter((history) =>
      history?.path.includes(directoryId)
    );
    dispatch(addBreadCrumb(historyData));
    // dispatch(storeBreadCrumbs())
  }, [directoryId, moveItemsArray, dispatch]);

  const handleBreadcrumbClick = (event, path) => {
    event.preventDefault();
    if (status === "loading") return;
    if (path) {
      navigate(`/${reference_Id}/directories/${path}`);
    } else {
      dispatch(clearBreadCrumb());
      navigate(`/${reference_Id}/directories/`);
    }
  };

  return (
    <div
      // style={{marginTop:-10}}
      className={clsx("breadCrumb", {
        "dark-mode": isDarkMode,
        "light-mode": !isDarkMode,
      })}
    >
      <Button
        sx={{ marginRight: 1, }}
        variant="outlined"
        onClick={(e) => handleBreadcrumbClick(e)}
      >
        Home
      </Button>
      <Breadcrumbs
        sx={{
          "& .MuiBreadcrumbs-separator": {
            color: isDarkMode ? "#FFF" : "'rgb(33,37,39)'",
          },
        }}
        aria-label="breadcrumb"
      >
        {breadcrumbs.map((breadcrumb, index) =>
          breadcrumb?.path ? (
            <RouterLink
              key={index}
              to={breadcrumb?.path}
              onClick={(e) => handleBreadcrumbClick(e, breadcrumb?.path)}
              style={{
                textDecoration: "none",
                color: isDarkMode ? "#FFF" : "'rgb(33,37,39)'",
              }}
            >
              {breadcrumb?.label}
            </RouterLink>
          ) : (
            <Typography key={index} color="text.primary">
              {breadcrumb?.label}
            </Typography>
          )
        )}
      </Breadcrumbs>
    </div>
  );
};

export default Breadcrumb;
