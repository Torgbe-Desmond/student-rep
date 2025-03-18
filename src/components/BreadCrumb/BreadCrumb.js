import { Breadcrumbs, Button, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./BreadCrumb.css";
import clsx from "clsx";
import { clearBreadCrumb, getBreadCrumb } from "../../Features/PathSlice";

const Breadcrumb = ({ breadcrumbs = [], isDarkMode, setSearchTerm }) => {
  const { directoryId, reference_Id } = useParams();
  const { moveItemsArray = [], status } = useSelector((state) => state.work);
  const [breadCrumbs, setBreadCrumbs] = useState([]);
  const toggelSearch = useSelector((state) => state.stack.search);
  const breadCrumb = useSelector((state) => state.path.breadCrumbs);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (breadCrumb) {
      setBreadCrumbs([...(breadCrumb || [])].sort((a, b) => b.order - a.order));
    }
    setSearchTerm("");

    return () => {
      setBreadCrumbs([]);
    };
  }, [directoryId, dispatch]);

  const handleBreadcrumbClick = (event, path) => {
    event.preventDefault();
    if (status === "loading") return;
    if (path) {
      navigate(`/${reference_Id}/directories/${path}`);
    } else {
      navigate(`/${reference_Id}/directories/`);
      dispatch(clearBreadCrumb());
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
        {breadCrumb?.map((value, index) => (
          <RouterLink
            key={index}
            to={value?.directoryId}
            onClick={(e) => handleBreadcrumbClick(e, value?.directoryId)}
            style={{
              textDecoration: "none",
              color: isDarkMode ? "#FFF" : "rgb(33,37,39)",
            }}
          >
            {value?.name}
          </RouterLink>
        ))}
      </Breadcrumbs>
    </div>
  );
};

export default Breadcrumb;
