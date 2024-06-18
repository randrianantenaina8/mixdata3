import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import burgerHide from "../assets/svg/burgerIconsHide.svg"
import burgerShow from "../assets/svg/burgerIconsShow.svg"
import Image from 'react-bootstrap/Image'
import { useApplication } from "../hooks/UseApplication";
import { Box } from "@mui/material";
import InfoModal from "./InfoModal";
import { useState } from "react";
import { useToast } from "../Context/ToastContext";

const Header = ({ children, onClick, isOpen }) => {
  const { logout } = useApplication()
  const sidebarClass = isOpen ? "logonav show fluid ms-4" : "logonav hide fluid ms-4"
  const sidebarClassToogle = isOpen ? "logonav hide fluid ms-4" : "logonav show fluid ms-4"
  const sidebarLogo = isOpen ? "logonav hide pb-0 m-0" : "logonav show pb-0 m-0"
  const LayoutOpen = isOpen ? "Layout large w-100" : "Layout normal w-100"
  const [modal, setModal] = useState({
    show: false,
    title: "",
    content: "",
    error: false,
  });
  const toaster = useToast();

  const handleLogout = async () => {
    toaster.notifySuccess('Déconnécté avec succès')
    await logout(); 
  };

  /**** Custom variable style */
  const textColor = "#363636"

  const logocolor = {
    color: "#3F50B6"
  }
  const fontWeightTitle = {
    fontWeight: "600"
  };
  const graylight = {
    backgroundColor: "#F3F3F9"
  }
  const resizedWidth = {
    width: isOpen ? "100%" : { xl: "calc(100% - 176px)" , lg:"calc(100% - 176px)" , md: "100%" , sm: "100%" , xs: "100%" },
    
  }

  return (
    <>
    <InfoModal show={modal.show} onHide={() => setModal({ show: false, content: "", error: false, title: "Succès" })} data={modal} />
      <Box className={LayoutOpen} sx={{position: "relative"}}>
        <Navbar bg="white" variant="black" style={{position: "fixed", top: 0 , ...resizedWidth, zIndex:2 }}>
          <Box className="container-fluid App-container">
            <Box className="row w-100 align-items-center flex-wrap m-xl-0 m-lg-0 m-md-0 m-sm-auto m-auto">
              <Box className="LeftSide col d-flex align-items-center py-xl-0 py-lg-0 py-md-2 py-sm-2 py-2 justify-content-xl-start justify-content-lg-start justify-content-md-start justify-content-sm-between justify-content-between">
                <Navbar.Brand className={(sidebarLogo) + ' logos'}>
                  <Nav.Link style={logocolor} as={Link} to="/">
                    <h3 style={fontWeightTitle}>MIXDATA</h3>
                  </Nav.Link>

                </Navbar.Brand>
                <Image className={(sidebarClass) + ' gray'} style={{ width: '25px', cursor: 'pointer' }} src={burgerShow} onClick={onClick}></Image>
                <Image className={(sidebarClassToogle) + ' blue'} style={{ width: '25px', cursor: 'pointer' }} src={burgerHide} onClick={onClick}></Image>
              </Box>
              <Box className="rightSide col-xl col-lg col-md col-sm-12 col-12  py-xl-0 py-lg-0 py-md-2 py-sm-2 py-2 pe-xl-0 pe-lg-0 pe-md-0 pe-sm-3 pe-3">
                <Navbar.Collapse id="responsive-navbar-nav" className="d-flex justify-content-end mt-xl-0 mt-lg-0 mt-md-0 mt-sm-2 mt-2">
                  <Button
                    variant="none"
                    type="button"
                    onClick={handleLogout}
                    style={{ color: '#000', fontWeight: "501", background: 'none' }}
                  >
                    Se déconnecter
                  </Button>

                  <Card className=" shadow-none  border-0 ms-3 d-xl-block d-lg-block d-md-none d-sm-none d-none">
                    <Card.Header className="border-0 d-flex align-items-center px-4 py-3" style={graylight}>
                      <AccountCircleIcon fontSize="large"></AccountCircleIcon>
                      <Box className="ms-2">
                        <strong className="pb-0 mb-0" style={{ color: textColor }}>Utilisateur</strong>
                      </Box>
                    </Card.Header>
                  </Card>
                </Navbar.Collapse>
              </Box>
            </Box>
          </Box>
        </Navbar>
        <Box className={isOpen ? 'App-container px-4' : 'App-container px-2'} sx={{mt: "120px"}}>
          <Box>{children}</Box>
        </Box>
      </Box>
    </>
  )
};

export default Header;
