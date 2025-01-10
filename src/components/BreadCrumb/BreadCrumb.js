import { Breadcrumbs, Button, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addBreadCrumb, clearBreadCrumb, storeBreadCrumbs } from "../../Features/PathSlice";
import { useEffect } from "react";
import "./BreadCrumb.css";
import clsx from "clsx";

const Breadcrumb = ({ breadcrumbs = [], isDarkMode }) => {
  const { directoryId, reference_Id } = useParams();
  const { moveItemsArray = [], status } = useSelector((state) => state.work);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    window.addEventListener('beforeunload',()=>{
      dispatch(storeBreadCrumbs())
    })
  },[])
    
  
  useEffect(() => {
    const historyData = moveItemsArray.filter((history) =>
      history?.path.includes(directoryId)
    );
    dispatch(addBreadCrumb(historyData));
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
      className={clsx("breadCrumb", {
        "dark-mode": isDarkMode,
        "light-mode": !isDarkMode,
      })}
    >
      <Button
        sx={{ marginRight: 1 }}
        variant="outlined"
        onClick={(e) => handleBreadcrumbClick(e)}
      >
        Home
      </Button>
      <Breadcrumbs
        sx={{
          "& .MuiBreadcrumbs-separator": {
            color: isDarkMode ? "#FFF" : "rgb(33,37,39)",
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
                color: isDarkMode ? "#FFF" : "rgb(33,37,39)",
              }}
            >
              {breadcrumb?.label}
            </RouterLink>
          ) : (
            <Typography
              sx={{
                textDecoration: "none",
                color: isDarkMode ? "#FFF" : "rgb(33,37,39)",
              }}
              key={index}
            >
              {breadcrumb?.label}
            </Typography>
          )
        )}
      </Breadcrumbs>
    </div>
  );
};

export default Breadcrumb;
