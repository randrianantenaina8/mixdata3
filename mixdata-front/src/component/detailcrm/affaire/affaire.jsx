import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import CreateTask from "../modals/creationtache";
import Modal from "@mui/material/Modal";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Select,
  MenuItem,
  Paper,
  Button,
  Checkbox,
} from "@mui/material";
import Grid from "@mui/system/Unstable_Grid/Grid";
import { getTachesAssociees , supprimerAffaire } from "../../../indexedDb";
import Etat from "../../etatComponent/etatComponent.";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { CircularProgress } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

const Affaires = ({ numParcelle, affaireName, affairesAssociees }) => {
  const [affaires, setAffaires] = useState([]);
  const [affaireAssociee, setAffaireAssociee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setLoading(true);
    setOpen(false);
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  }
  const [selectedAffaire, setSelectedAffaire] = useState(null);

  const tacheAssociees = getTachesAssociees();

  //Toast
  const successtoast = () => toast.success("Affaire supprimé avec succès");

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };



  useEffect(() => {
    setAffaireAssociee(affairesAssociees)
    setLoading(false);
  }, [numParcelle, affairesAssociees]);

  const handleChange = (event, index, id) => {
    const selectedValue = event.target.value;
    setAffaires((prevAffaires) => {
      const newAffaires = [...prevAffaires];
      if (newAffaires[index]) {
        newAffaires[index].valeurSelectionnee = selectedValue;
        return newAffaires;
      }
      return prevAffaires;
    });
  
    if (selectedValue === "modification") {
      return;
    } else if (selectedValue === "suppression") {
      successtoast();

      setTimeout(() => {
        supprimerAffaire(id);
        setLoading(true);

        setTimeout(() => {
          setLoading(false);
        }, 5000);
      }, 1000);
      return;
    } else if (selectedValue === "add_task") {
      handleOpen();
      setSelectedAffaire(affaireAssociee[index]);
    }
  };
  
  console.log('aaffaires>>>' , affairesAssociees)


  const BbottomNone = {
    borderBottom: "none",
  };

  return loading ? (
    <CircularProgress />
  ) :  (
    <Box sx={{ mt: 5 }}>
            <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <h3>Suivi des affaires</h3>
      <Table className="affaire_table">
        <TableHead sx={{ background: "rgba(41, 156, 219, 0.05)" }}>
          <TableCell>Nom de l'affaire</TableCell>
          <TableCell>N° parcelle</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Etapes</TableCell>
          <TableCell>Date de création</TableCell>
          <TableCell>Actions</TableCell>
        </TableHead>
        {affaireAssociee.map((affaire, index) => {

          const tachesFiltrees = tacheAssociees.filter(
            (tache) => tache.name === affaire.name
          );
          return (
            <TableBody
              key={index}
              sx={{ height: "auto", mb: 5, background: "#FAFAFA" }}
            >
              <TableRow sx={{ background: "#FAFAFA" }}>
                <TableCell sx={BbottomNone}>{affaire.name}</TableCell>
                <TableCell sx={BbottomNone}>{affaire.land}</TableCell>
                <TableCell sx={BbottomNone}>{affaire.description}</TableCell>
                <TableCell sx={BbottomNone}>{affaire.status}</TableCell>
                <TableCell sx={BbottomNone}>
                  {formatDate(affaire.createdAt)}
                </TableCell>
                <TableCell sx={BbottomNone}>
                  <Select
                    labelId={"actions"}
                    id={"actions"}
                    label="Selectionnez une option"
                    value={affaire.valeurSelectionnee || "default"}
                    onChange={(event) => handleChange(event, index, affaire.id)}
                  >
                    <MenuItem value={"default"}>
                      Séléctionnez une option
                    </MenuItem>
                    <MenuItem value={"modification"}>Modifier</MenuItem>
                    <MenuItem value={"suppression"}>Supprimer</MenuItem>
                    <MenuItem value={"add_task"}>Ajouter une tâche</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
              <TableRow className="rowTask" sx={{ borderBottom: "none" }}>
                <TableCell
                  className={
                    index % 2 === 0
                      ? "TacheCell "
                      : "TacheCell TacheCellWithBackground"
                  }
                  sx={{ px: 3, pb: 5, borderBottom: "none" }}
                  colSpan={6}
                >
                  <h5
                    style={{
                      color: "#299CDB",
                      fontWeight: "bold",
                      marginBottom: "15px",
                    }}
                  >
                    Tâches
                  </h5>
                  {tachesFiltrees && tachesFiltrees.length > 0 ? (
                    tachesFiltrees.map((tache, index) => (
                      <Accordion sx={{ width: "100%!important" }} key={index}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id={index}
                          sx={{
                            width: "100%!important",
                            borderBottom: "1px solid #e7e7e7e8",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              width: "100%!important",
                              ml: "15px!important",
                            }}
                          >
                            <Box
                              sx={{
                                width: "50%!important",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-start",
                              }}
                            >
                              <Typography
                                sx={{ color: "#299CDB", fontWeight: "bold" }}
                              >
                                {tache.objectif}
                              </Typography>
                              <Etat
                                type={tache.statut}
                                mLeft={"15px!important"}
                              />
                            </Box>
                            <Box
                              sx={{
                                width: "50%!important",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end",
                              }}
                            >
                              <ModeEditIcon sx={{ mr: 2 }} />
                              <DeleteIcon sx={{ color: "red" }} />
                            </Box>
                          </Box>
                        </AccordionSummary>
                        <AccordionDetails
                          sx={{ width: "100%!important", padding: "25px" }}
                        >
                          <Box sx={{ display: "flex" }}>
                            <Box sx={{ width: "33.3%" }}>
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <Typography
                                  sx={{ maxWidth: "150px", width: "100%" }}
                                >
                                  Objectif
                                </Typography>
                                <Typography>{tache.objectif}</Typography>
                              </Box>
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <Typography
                                  sx={{ maxWidth: "150px", width: "100%" }}
                                >
                                  Desciption
                                </Typography>
                                <Typography>{tache.description}</Typography>
                              </Box>
                            </Box>
                            <Box sx={{ width: "33.3%" }}>
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <Typography
                                  sx={{ maxWidth: "150px", width: "100%" }}
                                >
                                  Date de création
                                </Typography>
                                <Typography>
                                  {formatDate(tache.createdAt)}
                                </Typography>
                              </Box>
                              <Box
                                className="excludedStyles"
                                sx={{
                                  display: "flex",
                                  justifyContent: "flex-start",
                                  alignItems: "center",
                                }}
                              >
                                <Typography
                                  sx={{ maxWidth: "150px", width: "100%" }}
                                >
                                  Statut
                                </Typography>
                                <Etat
                                  type={tache.statut}
                                  wdt={"50%!important"}
                                />
                              </Box>
                            </Box>
                            <Box sx={{ width: "33.3%" }}>
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <Typography
                                  sx={{ maxWidth: "150px", width: "100%" }}
                                >
                                  Date d'échéance{" "}
                                </Typography>
                                <Typography> {tache.date_Echeance}</Typography>
                              </Box>
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <Typography
                                  sx={{ maxWidth: "150px", width: "100%" }}
                                >
                                  Assigné à{" "}
                                </Typography>
                                <Typography> {tache.assigneA}</Typography>
                              </Box>
                            </Box>
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    ))
                  ) : (
                    <Typography sx={{ fontWeight: "bold", p:2 }}>
                      Pas de tâche disponible
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  className={
                    index % 2 === 0
                      ? "TacheCell "
                      : "TacheCell TacheCellWithBackground"
                  }
                  colSpan={6}
                  sx={{ px: 3, pb: 5 }}
                >
                  <Paper sx={{ width: "100%", p: 3 }}>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography>Documents</Typography>
                        <Select
                          labelId={"docs"}
                          id={"docs"}
                          onChange={(event) => handleChange(event, index)}
                          label="ACTIONS"
                          value={"default"}
                          defaultValue="default"
                          sx={{ mx: 3 }}
                        >
                          <MenuItem value={"default"}>ACTIONS</MenuItem>
                          <MenuItem value={"suppression"}>Supprimer</MenuItem>
                        </Select>
                        <Button
                          sx={{ background: "#299CDB" }}
                          variant="contained"
                        >
                          Valider
                        </Button>
                      </Box>
                      <Box>
                        <Button
                          sx={{ background: "#299CDB" }}
                          variant="contained"
                          startIcon={<UploadFileIcon />}
                        >
                          Ajouter
                        </Button>
                      </Box>
                    </Box>
                    <Box sx={{ py: 3 }}>
                      {affaire.files && affaire.files.length > 0 ? (
                        <Grid container rowSpacing={3} columnSpacing={3}>
                          {affaire.files.map((file, index) => (
                            <Grid key={index} item xs={4}>
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <Checkbox />
                                <Typography sx={{color: "rgb(41, 156, 219)"}}>
                                  {file.path ? file.path : file.name}
                                </Typography>
                              </Box>
                              <Typography sx={{ml:5 , fontSize: '12px', fontStyle: 'italic'}}>{formatDate(affaire.date_create)}</Typography>
                            </Grid>
                          ))}
                        </Grid>
                      ) : (
                        <Box sx={{p:2}}>
                          <Typography>Pas de document disponible</Typography>
                        </Box>
                      )}
                    </Box>
                  </Paper>
                </TableCell>
              </TableRow>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="create_task"
                aria-describedby="task_description"
              >
                <CreateTask
                  closeIt={handleClose}
                  nomAffaire={
                    selectedAffaire ? selectedAffaire.nom_affaire : ""
                  }
                />
              </Modal>
            </TableBody>
          );
        })}
      </Table>
    </Box>
  );
};

export default Affaires;
