import { NavLink } from "react-router-dom";

function Link() {
  return (
    <div>
      <div className="bg-[#B1A080]  py-4 mt-[5%] text-[#fff] text-[0.7rem]">
        <p className="ps-[7%]">

          <NavLink to="/">Home </NavLink> / 
          <NavLink to="Products"> Shop</NavLink>  /  

          <span>{" Name product"}</span>
        </p>
      </div>
    </div>
  );
}

export default Link;
