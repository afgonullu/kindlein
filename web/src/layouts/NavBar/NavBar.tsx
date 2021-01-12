import React from "react"
import { Nav, Navbar } from "react-bootstrap"
import { NavLink } from "react-router-dom"

const NavBar: React.FC = () => {
  return (
    <Navbar className="d-flex flex-column justify-content-start align-items-start">
      <Navbar.Brand>
        <NavLink className="d-flex align-items-center" to="/">
          <i className="bi bi-palette d-flex align-items-center justify-content-center mr-2" />
          <span className="d-none d-xl-inline-block">Kindlein</span>
        </NavLink>
      </Navbar.Brand>
      <Nav className="d-flex flex-column">
        <NavLink className="d-flex align-items-center" to="/">
          <i className="bi bi-house d-flex align-items-center justify-content-center mr-2" />
          <span className="d-none d-xl-inline-block">Home</span>
        </NavLink>
        <NavLink to="/about">About</NavLink>
      </Nav>
    </Navbar>
  )
}

export default NavBar
