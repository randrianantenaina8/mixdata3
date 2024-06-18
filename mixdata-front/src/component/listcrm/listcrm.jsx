import {
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Box,
  Chip,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import CustomBtn from "../customBtns/CustomBtn";
import Etat from "../etatComponent/etatComponent.";
import PlaceIcon from "@mui/icons-material/Place";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Image from "react-bootstrap/Image";
import FilterIcon from "@assets/svg/param.svg";
import { Link } from "react-router-dom";
import Modal from "@mui/material/Modal";
import CreateContact from "../detailcrm/modals/creationcontact";
import jwtInterceptor from "../../service/jwtInterceptor";
import { LAND_ENDPOINTS } from "../../utils/api";
import { useToast } from "../../Context/ToastContext";
import axios from "axios";

const ListCrm = () => {
  const [data, setData] = useState(null);
  const [openContact, setOpenContact] = React.useState(false);
  const [selectedParcelleId, setSelectedParcelleId] = useState(null);
  const toaster = useToast();
  const handleOpenContact = (parcelleId) => {
    setSelectedParcelleId(parcelleId);
    setOpenContact(true);
  };
  const handleCloseContact = () => {
    setSelectedParcelleId(null);
    setOpenContact(false);
  };

  useEffect(() => {
    jwtInterceptor.get(LAND_ENDPOINTS.list).then((response) => {
      console.log('response', response)
      setData(response.data.data.records)
      console.log("data", data)
    }).catch((error) => {
      toaster.notifyError(error.message)
    })  
  }, []);

  // Custom styles

  const boxedStyles = {
    background: "#fff",
    borderRadius: "8px",
    padding: "25px",
  };
  const tableBodyStyles = {
    height: "auto",
  };
  const tableHeadStyles = {
    background: "#F5F5F5",
  };
  const fontWeightMedium = {
    fontWeight: "500!important",
  };
  const fontWeightTitle = {
    fontWeight: "600",
  };
  const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 500,
      background: "#F9FAFB",
    },
  });
  return (
    <Box sx={boxedStyles}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <h3 className="mb-4" style={fontWeightTitle}>
          Parcelles et contacts gérés
        </h3>
        <Image src={FilterIcon} className="fluid ms-3 pointer"></Image>
      </Box>

      <Table className="crm" size="small">
        <TableHead sx={tableHeadStyles}>
          <TableRow>
            <TableCell sx={fontWeightMedium}>Parcelle</TableCell>
            <TableCell sx={fontWeightMedium}>Contact</TableCell>
            <TableCell sx={fontWeightMedium}>Type</TableCell>
            <TableCell sx={fontWeightMedium}>Etat</TableCell>
            <TableCell sx={fontWeightMedium}>Nb Affaires</TableCell>
            <TableCell sx={fontWeightMedium}>Nb Notes</TableCell>
            <TableCell sx={fontWeightMedium}>Dernière action</TableCell>
            <TableCell sx={fontWeightMedium}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={tableBodyStyles}>
          {data &&
            data.map((parcelle, index) => (
              // Void content
              <>
                {parcelle.contacts && parcelle.contacts.length < 2 ? (
                  <TableRow
                    key={parcelle.id}
                    sx={{
                      borderTop: "1px solid rgba(224, 224, 224, 1)!important",
                    }}
                  >
                    <TableCell>
                      <Box
                        sx={{
                          textDecoration: "underline",
                          fontWeight: "bold",
                          display: "flex",
                        }}
                      >
                        {parcelle.externalId}{" "}
                        <CustomWidthTooltip
                          title={
                            <Box
                              sx={{ display: "flex", p: 3, flexWrap: "wrap" }}
                            >
                              <Box sx={{ width: "50%" }}>
                                <p style={{ color: "#363636" }}>
                                  {parcelle.resume.adress_full
                                    ? `Adresse complet : ${parcelle.resume.adress_full}`
                                    : "Adresse indisponible"}
                                </p>
                                <p style={{ color: "#363636" }}>
                                  {parcelle.resume.area
                                    ? `Surface  : ${parcelle.resume.area}`
                                    : "Surface indisponible"}
                                </p>
                              </Box>
                              <Box sx={{ width: "50%" }}>
                                <p style={{ color: "#363636" }}>
                                  {parcelle.resume.average_building_year
                                    ? `Bâtiment/année  : ${parcelle.resume.average_building_year}`
                                    : "Bâtiment/année indisponible"}
                                </p>
                              </Box>
                            </Box>
                          }
                          placement="bottom-start"
                        >
                          <InfoIcon
                            sx={{
                              color: "#3F50B6",
                              width: "19px",
                              height: "19px",
                              marginLeft: "10px",
                            }}
                          />
                        </CustomWidthTooltip>
                      </Box>
                      <Box
                        sx={{
                          fontStyle: "italic",
                          fontSize: "13px",
                          display: "flex",
                          alignItems: "flex-start",
                        }}
                      >
                        {parcelle.resume.address_npa ? (
                          <PlaceIcon sx={{ width: "17px", height: "17px" }} />
                        ) : (
                          ""
                        )}{" "}
                        {parcelle.resume.address_npa + " " + parcelle.resume.municipality_name}
                      </Box>
                    </TableCell>
                    <TableCell>
                      {parcelle.contacts[0] && parcelle.contacts[0].lastName ? (
                        parcelle.contacts[0].lastName && parcelle.contacts[0].firstName ? (
                          <Link
                            to={`/detail/${parcelle._id}/${parcelle.contacts[0]._id}`}
                            style={{ textDecoration: "none" }}
                          >
                            {parcelle.contacts[0].lastName} 
                            {parcelle.contacts[0].firstName}
                          </Link>
                        ) : (
                          <Link
                            to={`/detail/${parcelle._id}/${parcelle.contacts[0]._id}`}
                            style={{ textDecoration: "none" }}
                          >
                            {parcelle.contacts[0].lastName}
                          </Link>
                        )
                      ) : (
                        ""
                      )}
                    </TableCell>
                    <TableCell>
                      {(parcelle.contacts[0] && parcelle.contacts[0].type) ||
                      (parcelle.contacts[0] && parcelle.contacts[0].types) ? (
                        <Chip
                          sx={{ background: "#3F50B6", color: "#fff" }}
                          label={
                            (parcelle.contacts[0] &&
                              parcelle.contacts[0].type) ||
                            (parcelle.contacts[0] && parcelle.contacts[0].types)
                          }
                        />
                      ) : (
                        <></>
                      )}
                    </TableCell>
                    <TableCell>
                      {parcelle.contacts[0] && parcelle.contacts[0].etat}
                    </TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>
                      {parcelle.contacts[0] &&
                        parcelle.contacts[0].derniere_action}
                    </TableCell>
                    <TableCell className="TacheCell">
                      <CustomBtn
                        label="contact"
                        bgColor="#299CDB"
                        iconBg={"#3ba9e5"}
                        icon={"+"}
                        click={() => handleOpenContact(parcelle._id)}
                      />
                    </TableCell>
                  </TableRow>
                ) : (
                  // Existing content
                  <>
                    {/* first element */}

                    <TableRow className="deleteBorder" key={parcelle.id}>
                      <TableCell
                        rowSpan={
                          parcelle.contacts.length > 1
                            ? parcelle.contacts.length
                            : 1
                        }
                      >
                        <Box
                          sx={{
                            textDecoration: "underline",
                            fontWeight: "bold",
                            display: "flex",
                          }}
                        >
                          {parcelle.externalId}{" "}
                          <CustomWidthTooltip
                            title={
                              <Box
                                sx={{ display: "flex", p: 3, flexWrap: "wrap" }}
                              >
                                <Box sx={{ width: "50%" }}>
                                  <p style={{ color: "#363636" }}>
                                    Adresse complet :{" "}
                                    {parcelle.resume.address_full}
                                  </p>
                                  <p style={{ color: "#363636" }}>
                                    Surface : {parcelle.resume.area}
                                  </p>
                                </Box>
                                <Box sx={{ width: "50%" }}>
                                  <p style={{ color: "#363636" }}>
                                    Bâtiment/année : {parcelle.resume.average_building_year}
                                  </p>
                                </Box>
                              </Box>
                            }
                            placement="bottom-start"
                          >
                            <InfoIcon
                              sx={{
                                color: "#3F50B6",
                                width: "19px",
                                height: "19px",
                                marginLeft: "10px",
                              }}
                            />
                          </CustomWidthTooltip>
                        </Box>
                        <Box
                          sx={{
                            fontStyle: "italic",
                            fontSize: "13px",
                            display: "flex",
                            alignItems: "flex-start",
                          }}
                        >
                          {parcelle.resume.code_postal_rue ? (
                            <PlaceIcon sx={{ width: "17px", height: "17px" }} />
                          ) : (
                            ""
                          )}{" "}
                          {parcelle.resume.address_npa}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Link
                          to={`/detail/${parcelle._id}/${parcelle.contacts[0]._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          {parcelle.contacts[0] && parcelle.contacts[0].lastName}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Chip
                          sx={{ background: "#3F50B6", color: "#fff" }}
                          label={
                            parcelle.contacts[0] && parcelle.contacts[0].type
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Etat
                          type={
                            parcelle.contacts[0] && parcelle.contacts[0].etat
                          }
                        />
                      </TableCell>
                      <TableCell>
                        {parcelle.contacts[0] &&
                          parcelle.contacts[0].nb_affaire}
                      </TableCell>
                      <TableCell>
                        {parcelle.contacts[0] && parcelle.contacts[0].nb_note}
                      </TableCell>
                      <TableCell>
                        {parcelle.contacts[0] &&
                          parcelle.contacts[0].derniere_action}
                      </TableCell>
                      <TableCell className="TacheCell">
                        <CustomBtn
                          label="contact"
                          bgColor="#299CDB"
                          iconBg={"#3ba9e5"}
                          icon={"+"}
                          click={() => handleOpenContact(parcelle._id)}
                        />
                      </TableCell>
                    </TableRow>

                    {parcelle.contacts.slice(1).map((contact) => (
                      // second elements +
                      <TableRow className="deleteBorder" key={parcelle.id}>
                        <TableCell>
                          {" "}
                          <Link
                            to={`/detail/${parcelle._id}/${contact._id}`}
                            style={{ textDecoration: "none" }}
                          >
                            {contact.lastName}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Chip
                            sx={{ background: "#3F50B6", color: "#fff" }}
                            label={contact.type || contact.types}
                          />
                        </TableCell>
                        <TableCell>
                          <Etat type={contact.etat} />
                        </TableCell>
                        <TableCell>{contact.nb_affaire}</TableCell>
                        <TableCell>{contact.nb_note}</TableCell>
                        <TableCell>{contact.derniere_action}</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    ))}
                    {parcelle.contacts.length < 2 && (
                      <TableRow
                        sx={{ textDecoration: "underline", fontWeight: "bold" }}
                        key={parcelle.id}
                      >
                        <TableCell>
                          <Chip
                            sx={{ background: "#3F50B6", color: "#fff" }}
                            label={
                              parcelle.contacts[0] && parcelle.contacts[0].type
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Link
                            to={`/detail/${parcelle.id}/${parcelle.contacts[0]._id}`}
                            style={{ textDecoration: "none" }}
                          >
                            {parcelle.contacts[0] && parcelle.contacts[0].etat}
                          </Link>
                        </TableCell>
                        <TableCell>
                          {parcelle.contacts[0] &&
                            parcelle.contacts[0].nb_affaire}
                        </TableCell>
                        <TableCell>
                          {parcelle.contacts[0] && parcelle.contacts[0].nb_note}
                        </TableCell>
                        <TableCell>
                          {parcelle.contacts[0] &&
                            parcelle.contacts[0].derniere_action}
                        </TableCell>
                        <TableCell className="TacheCell">
                          <CustomBtn
                            label="contact"
                            bgColor="#299CDB"
                            iconBg={"#3ba9e5"}
                            icon={"+"}
                            click={() => handleOpenContact(parcelle._id)}
                          />
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                )}
                <Modal
                  open={openContact}
                  onClose={handleCloseContact}
                  aria-labelledby="creation-contact-title"
                  aria-describedby="creation-contact-description"
                >
                  <CreateContact
                    numParcelle={selectedParcelleId}
                    closeIt={handleCloseContact}
                  />
                </Modal>
              </>
            ))}
        </TableBody>
      </Table>
    </Box>
  );
};
export default ListCrm;
