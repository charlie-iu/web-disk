import React from "react";
import { NavLink } from "react-router-dom";

export default function MyNavLink(props) {
  return (
    <>
      <NavLink {...props} >{props.children}</NavLink>
    </>
  )
}
