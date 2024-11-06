import { Breadcrumbs, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import './BreadCrumb.css';
import { useDispatch, useSelector } from "react-redux";
import { addBreadCrumb } from "../../Features/PathSlice";
import { useEffect } from "react";

const Breadcrumb = ({ breadcrumbs }) => {
  const { directoryId,reference_Id } = useParams();
  const { moveItemsArray = [] } = useSelector(state => state.work);
  const navigate = useNavigate();
  const dispatch = useDispatch()



  useEffect(()=>{
    const historyData = moveItemsArray.filter(history => history?.path.includes(directoryId));
    dispatch(addBreadCrumb(historyData[0]));
  },[directoryId])

  const handleClick = (event, path = null) => {
    event.preventDefault();
    if(path){
      navigate(`/${reference_Id}/directories/${path}`)
    } else {
      navigate(`/${reference_Id}/directories/`)
    }
  };

  return (
    <div className="breadCrumb">
      <RouterLink
      onClick={(e) => handleClick(e)}
      style={{ textDecoration: 'none', color: 'inherit', fontSize:'18px',paddingBottom:5 }}
      >Home</RouterLink>
      <Breadcrumbs aria-label="breadcrumb">
        {breadcrumbs?.map((breadcrumb, index) => (
          breadcrumb?.path ? (
            <RouterLink
              key={index}
              to={breadcrumb?.path}
              onClick={(e) => handleClick(e, breadcrumb?.path)}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              {breadcrumb?.label}
            </RouterLink>
          ) : (
            <Typography key={index} color="text.primary">
              {breadcrumb?.label}
            </Typography>
          )
        ))}
      </Breadcrumbs>
    </div>
  );
};

export default Breadcrumb;
