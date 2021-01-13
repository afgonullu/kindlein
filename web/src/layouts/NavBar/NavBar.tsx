import React, { useContext } from "react"
import { Nav, Navbar } from "react-bootstrap"
import { NavLink } from "react-router-dom"

import { AuthContext } from "../../context/auth"

const NavBar: React.FC = () => {
  const context = useContext(AuthContext)

  return (
    <Navbar className="d-flex flex-column justify-content-between align-items-start vh-100 position-fixed">
      <Nav className="d-flex flex-column mr-auto">
        <Navbar.Brand>
          <NavLink className="d-flex align-items-center" to="/">
            <i className="bi bi-palette d-flex align-items-center justify-content-center mr-2" />
            <span className="d-none d-xl-inline-block">Kindlein</span>
          </NavLink>
        </Navbar.Brand>
        <NavLink className="d-flex align-items-center" to="/">
          <i className="bi bi-house d-flex align-items-center justify-content-center mr-2" />
          <span className="d-none d-xl-inline-block">Home</span>
        </NavLink>
        <NavLink to="/about">About</NavLink>
      </Nav>
      {context.user ? (
        <Nav>
          <p>Welcome back</p>
          <p>{context.user.username}</p>
          <NavLink className="d-flex align-items-center" onClick={context.logout} to="/">
            <i className="bi bi-house d-flex align-items-center justify-content-center mr-2" />
            <span className="d-none d-xl-inline-block">Logout</span>
          </NavLink>
        </Nav>
      ) : (
        <Nav>
          <NavLink className="d-flex align-items-center" to="/login">
            <i className="bi bi-house d-flex align-items-center justify-content-center mr-2" />
            <span className="d-none d-xl-inline-block">Login</span>
          </NavLink>
        </Nav>
      )}
    </Navbar>
  )
}

export default NavBar
