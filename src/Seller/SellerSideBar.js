import { Typography } from "@mui/material";

const SellerSideBar = () => {
  return (
    <div className="row" style={{width:"200px",height:"100%",clear:"both" }}>
      <div className="col ml-1">
        <Typography style={{paddingTop:"1em"}} variant="h6">Home</Typography>
        <Typography style={{paddingTop:"1.3em"}} variant="h6">Order</Typography>
        <Typography style={{paddingTop:"1.3em"}} variant="h6">Products</Typography>
        <Typography style={{paddingTop:"1.3em"}} variant="h6">Add Product</Typography>
        <Typography style={{paddingTop:"1.3em"}} variant="h6">Profile</Typography>
        <Typography style={{paddingTop:"1.3em"}} variant="h6">Logout</Typography>
      </div>
    </div>
  );
};

export default SellerSideBar;
