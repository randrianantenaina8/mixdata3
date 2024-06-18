import Navbar from "react-bootstrap/Navbar";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import EarthIcon from "../assets/svg/earthlogo.svg"
import CRMIcon from "../assets/svg/cloudCrm.svg"
import UserSettingLogo from "../assets/svg/UserSetting.svg"
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

const Sidebar = ({ children, isOpen, isClosed }) => {
  const [visible, setVisible] = useState(false)
  const sidebarClass = isOpen ? "sidebar open" : "sidebar"

  /**** Custom variable style */
  const bluedark = "#3F50B6"
  const stickySidebar = {
    maxWidth: '203px',
    with: '100%'
  };
  const fontWeightTitle = {
    fontWeight: "600"
  };
  const large = {
    width: '250px',
    height: '100vh',
    zIndex:99999
  }
  const normal = {
    width: '230px',
    height: '100vh',
    zIndex:1000
  }

  const handleToggle = () => {
    setVisible((current) => !current);
  };


  return (
    <>
      <aside className={sidebarClass + (visible ? ' ' : ' closed')} style={isOpen ? normal : large}>
        <Navbar className="d-block px-3" variant="dark" style={Object.assign({ width: '100%', height: '100%', paddingTop: '30px', backgroundColor: bluedark }, stickySidebar)}>
          <Navbar.Brand className="pb-0 m-0 text-center d-flex justify-content-xl-center justify-content-lg-center justify-content-md-center justify-content-sm-between  justify-content-between">
            <Nav.Link as={Link} to="/">
              <h3 style={fontWeightTitle}>MIXDATA</h3>
            </Nav.Link>
            <CloseIcon className="d-xl-none d-lg-none d-md-none d-sm-block d-block pointer" onClick={handleToggle} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar id="responsive-navbar-nav" className="d-block mt-5">
            <Nav className="d-block mb-2">
              <Nav.Link className="text-white d-flex align-items-center" as={Link} to="/land" onClick={handleToggle}>
                <Image className="fluid me-2" src={EarthIcon}></Image>
                Parcelle
              </Nav.Link>
            </Nav>
            <Nav className="d-block mb-2">
              <Nav.Link className="text-white d-flex align-items-center" as={Link} to="/list-crm" onClick={handleToggle}>
                <Image className="fluid me-2" src={CRMIcon}></Image>
                CRM
              </Nav.Link>
            </Nav>
            <Nav className="d-block mb-2">
              <Nav.Link className="text-white d-flex align-items-center" as={Link} to="/user" onClick={handleToggle}>
                <Image className="fluid me-2" src={UserSettingLogo}></Image>
                Gestion Utilisateur
              </Nav.Link>
            </Nav>
          </Navbar>
        </Navbar>
      </aside>
      <Container className="d-none">{children}</Container>
    </>
  )
};

export default Sidebar;
