import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Container, Avatar, Typography, Chip, Badge } from "@mui/material";
import DetailCrmApi from "./staticapi/contacts.json";
import ExistingParcels from "./staticapi/existingparcels.json";
import CustomBtn from "../customBtns/CustomBtn";
import UpdateIcon from "@mui/icons-material/Update";
import DefaultAvatar from "../../assets/Images/detailcrm/defaultAvatar.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import EmailIcon from "@mui/icons-material/Email";
import Divider from "@mui/material/Divider";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import enqueteIcon from "../../assets/svg/ListParcelle/enqtIcon.svg";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import Affaires from "./affaire/affaire";
import CreateAffaire from "./modals/creationaffaire";
import CreateNote from "./modals/creationote";
import Modal from "@mui/material/Modal";
import { getAffaireAssociee, getNotesAssociees } from "../../indexedDb";
import Note from "./note/note";
import ParcelleResume from "./modals/parcellerelies";
import Historique from "./modals/historique";
import { CircularProgress } from "@mui/material";

// Tables
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ContactMailRounded } from "@mui/icons-material";
import jwtInterceptor from "../../service/jwtInterceptor";
import { CONTACT_ENDPOINTS } from "../../utils/api";

const DetailCrm = () => {
  const { id, contactId } = useParams();
  const [personne, setPersonne] = useState(null);
  const [parcelle, setParcelle] = useState(null);
  const [parcellesPersonne, setParcellesPersonne] = useState([]);
  const [openAffaire, setOpenAffaire] = React.useState(false);
  const [openNote, setOpenNote] = React.useState(false);
  const [openResume, setOpenResume] = React.useState(false);
  const [openHistorique, setOpenHistorique] = React.useState(false);
  const handleOpenAffaire = () => setOpenAffaire(true);
  const handleCloseAffaire = () => {
    setLoading(true);
    setOpenAffaire(false);
      setTimeout(() => {
      setLoading(false)
    }, 2000);
  };
  const handleOpenNote = () => setOpenNote(true);
  const handleCloseNote = () => {
    setLoading(true);
    setOpenNote(false);
      setTimeout(() => {
      setLoading(false)
    }, 2000);
  };
  const handleOpenResume = () => setOpenResume(true);
  const handleCloseResume = () => {
    setLoading(true);
    setOpenResume(false);
      setTimeout(() => {
      setLoading(false)
    }, 2000);
  };
  const handleOpenHistorique = () => setOpenHistorique(true);
  const handleCloseHistorique = () => {
    setLoading(true);
    setOpenHistorique(false);
      setTimeout(() => {
      setLoading(false)
    }, 2000);
  };
  const [numeroDeParcelle, setNumeroDeParcelle] = useState(id);
  const [affairesAssociees, setAffairesAssociees] = useState([]);
  const notesAssociees = getNotesAssociees();
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [newPersonne, setNewPersonne] = useState(null);
  const [loading, setLoading] = useState(true);

  function recupererAffaireParParcelle(idParcelle) {
    const affaireString = localStorage.getItem("affaire_" + idParcelle);
    if (affaireString) {
      return JSON.parse(affaireString);
    } else {
      return null;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
        const filters = {
          _id: contactId
        }
        const personnesTrouvee = await jwtInterceptor.get(CONTACT_ENDPOINTS.getById.replace(":contactId", contactId))
        console.log("personnesTrouvee", personnesTrouvee)
        const person = personnesTrouvee.data.data.records[0]
        console.log("person", person)
        setPersonne(person)
        setParcellesPersonne(person.lands)
        setAffairesAssociees(person.opportunities)

      setLoading(false);
    };

    fetchData();
  }, [id, contactId]);

  console.log("newpersonne", newPersonne, "personne", personne);

  // Custom vars
  const brown = "#363636";

  return loading ? (
    <CircularProgress />
  ) : (
    <Box
      sx={{
        background: "#fff",
        padding: "15px",
        borderRadius: "8px",
        paddingInline: "25px",
      }}
    >
      {personne && (
        <Box>
          <Container
            maxWidth="1637px"
            sx={{
              margin: 0,
              display: "flex",
              justifyContent: "space-between",
              p: 0,
              mb: 2,
              paddingInline: "0!important",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <h3 style={{ marginRight: "15px" }}>
                {personne.firstName
                  ? `${personne.lastName} ${personne.lastName}`
                  : personne.lastName}
              </h3>
              <CustomBtn
                bgColor={"#88B790"}
                label="Historique"
                iconBg={"#a0d3a8"}
                icon={<UpdateIcon />}
                click={handleOpenHistorique}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CustomBtn
                bgColor={"#959FDB"}
                label="Note"
                iconBg={"#a3abe0"}
                icon={"+"}
                mR={"15px"}
                click={handleOpenNote}
              />
              <CustomBtn
                bgColor={"#299CDB"}
                label="Affaire"
                iconBg={"#3ba9e5"}
                icon={"+"}
                click={handleOpenAffaire}
              />
            </Box>
          </Container>
          <Container
            maxWidth="1637px"
            sx={{
              margin: 0,
              display: "flex",
              border: "1px solid #F2F2F2;",
              borderRadius: "4px",
              paddingInline: "25px",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                width: "48%",
                paddingBlock: "25px",
              }}
            >
              <Box sx={{ width: "20%", marginRight: "25px" }}>
                <Avatar
                  alt={personne.lastName}
                  src={DefaultAvatar}
                  sx={{ width: 100, height: 100, mb: 2 }}
                />
                <Box>
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                    }}
                    to={personne.website}
                    target="_blank"
                  >
                    <Typography sx={{ fontSize: "14px", marginRight: "15px" }}>
                      Voir le site web
                    </Typography>
                    <VisibilityIcon />
                  </Link>
                </Box>
              </Box>
              <Box>
                <Typography sx={{ mb: 1 }}>{personne.address}</Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <LocalPhoneIcon />
                  <Typography sx={{ ml: 1 }}>{personne.phones.filter(phone => phone.type === 'work')[0].number}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <SmartphoneIcon />
                  <Typography sx={{ ml: 1 }}>
                    {personne.phones.filter(phone => phone.type === 'mobile')[0].number}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <EmailIcon />
                  <Typography sx={{ ml: 1 }}>{personne.email}</Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  float: "right",
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                {personne.facebook && (
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      paddingRight: "15px",
                    }}
                    to={personne.facebook}
                    target="_blank"
                  >
                    <FacebookOutlinedIcon sx={{ color: "#1196f5" }} />
                  </Link>
                )}
                {personne.linkedin && (
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      paddingRight: "15px",
                    }}
                    to={personne.linkedin}
                    target="_blank"
                  >
                    <LinkedInIcon sx={{ color: "#0a66c2" }} />
                  </Link>
                )}
                {personne.twitter && (
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      paddingRight: "15px",
                    }}
                    to={personne.twitter}
                    target="_blank"
                  >
                    <TwitterIcon sx={{ color: "#1d9bf0" }} />
                  </Link>
                )}
                {personne.whatsapp && (
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                    to={personne.whatsapp}
                    target="_blank"
                  >
                    <WhatsAppIcon sx={{ color: "#25d366" }} />
                  </Link>
                )}
              </Box>
            </Box>
            <Divider
              orientation="vertical"
              sx={{ border: "1px dashed #000", height: "auto" }}
            />
            <Box
              sx={{
                width: "45%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                paddingBlock: "25px",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ mr: 3 }}>Type :</Typography>
                <Chip
                  sx={{ background: "#3F50B6", color: "#fff" }}
                  label={personne.type || personne.types}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ModeEditIcon sx={{ mr: 2 }} />
                <Typography>Modifier</Typography>
              </Box>
            </Box>
          </Container>
          <Box sx={{ mt: 5 }}>
            <h3>Parcelles reliés</h3>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Parcelle</TableCell>
                    <TableCell>Surface</TableCell>
                    <TableCell>Addresse</TableCell>
                    <TableCell>Bât/année</TableCell>
                    <TableCell>Historique</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{ height: "auto" }}>
                  {parcellesPersonne.map((parcelle) => (
                    <TableRow
                      key={parcelle.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setSelectedParcel(parcelle);
                        handleOpenResume();
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {parcelle.id}
                      </TableCell>
                      <TableCell>{parcelle.resume.area} m2</TableCell>
                      <TableCell>{parcelle.resume.municipality_name}</TableCell>
                      <TableCell>{parcelle.average_building_year}</TableCell>
                      <TableCell>
                        <Badge
                          badgeContent={
                            parcelle.transaction ? parcelle.transaction : "0"
                          }
                          color="primary"
                          size="small"
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          sx={{ mr: 2 }}
                        >
                          <MonetizationOnOutlinedIcon
                            style={{ color: brown }}
                          />
                        </Badge>
                        <Badge
                          badgeContent={
                            parcelle.enquete ? parcelle.enquete : "0"
                          }
                          color="primary"
                          size="small"
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                        >
                          <Image
                            class="fluid"
                            style={{ color: brown, fill: brown }}
                            src={enqueteIcon}
                          />
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      )}

      <Affaires
        numParcelle={numeroDeParcelle}
        affairesAssociees={affairesAssociees}
      />
      <Note numParcelle={numeroDeParcelle} noteData={notesAssociees} />
      <Modal
        open={openAffaire}
        onClose={handleCloseAffaire}
        aria-labelledby="creation-affaire-title"
        aria-describedby="creation-affaire-description"
      >
        <CreateAffaire closeIt={handleCloseAffaire} contact={personne} />
      </Modal>
      <Modal
        open={openNote}
        onClose={handleCloseNote}
        aria-labelledby="creation-note-title"
        aria-describedby="creation-note-description"
      >
        <CreateNote numParcelle={numeroDeParcelle} closeIt={handleCloseNote} />
      </Modal>
      <Modal
        open={openResume}
        onClose={handleCloseResume}
        aria-labelledby="creation-Resume-title"
        aria-describedby="creation-Resume-description"
      >
        <ParcelleResume
          selectedParcel={selectedParcel}
          closeIt={handleCloseResume}
        />
      </Modal>
      <Modal
        open={openHistorique}
        onClose={handleCloseHistorique}
        aria-labelledby="creation-historique-title"
        aria-describedby="creation-historique-description"
      >
        <Historique closeIt={handleCloseHistorique} />
      </Modal>
    </Box>
  );
};

export default DetailCrm;
