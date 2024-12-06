import { Breadcrumbs, Button, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import './BreadCrumb.css';
import { useDispatch, useSelector } from "react-redux";
import { addBreadCrumb, clearBreadCrumb } from "../../Features/PathSlice";
import { useEffect } from "react";

const Breadcrumb = ({ breadcrumbs }) => {
  const { directoryId,reference_Id } = useParams();
  const { moveItemsArray = [] ,status} = useSelector(state => state.work);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(()=>{
    const historyData = moveItemsArray.filter(history => history?.path.includes(directoryId));
    dispatch(addBreadCrumb(historyData[0]));
  },[directoryId])

  const handleClick = (event, path = null) => {
    event.preventDefault();
    if(status==='loading'){
       return;
    }
    if(path){
      navigate(`/${reference_Id}/directories/${path}`)
    } else {
      dispatch(clearBreadCrumb())
      navigate(`/${reference_Id}/directories/`)
    }
  };

  return (
    <div className="breadCrumb">
      <Button 
        sx={{marginRight:1}}
        variant="outlined"
        onClick={(e)=> handleClick(e)}
      >
        Home
      </Button>
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
            <Typography 
            key={index} color="text.primary">
              {breadcrumb?.label}
            </Typography>
          )
        ))}
      </Breadcrumbs>
    </div>
  );
};

export default Breadcrumb;
