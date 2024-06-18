import React, { useState, useEffect } from "react";
import { Box, Autocomplete, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputFile from "../../inputfile/inputfile";
import { ajouterAffaire } from "../../../indexedDb/index";
import listCrm from "../../listcrm/staticApi/ListCrm.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useToast } from "../../../Context/ToastContext";

const CreateAffaire = (props) => {
  const {closeIt, contact} = props;
  const [nomAffaire, setNomAffaire] = useState("");
  const [numParcelle, setNumParcelle] = useState(null);
  const [montant, setMontant] = useState("");
  const [description, setDescription] = useState("");
  const [etapes, setEtapes] = useState(null);
  const [listCrms, setListCrms] = useState(null);
  const [file , setFile] = useState([])

  const toaster = useToast()

  const champsvide = () =>
    toast.warn("Veuillez compléter les champs obligatoires");
  const successtoast = () => toast.success("Affaire créé avec succès");

  useEffect(() => {
    console.log("contact", contact)
    setListCrms(listCrm.parcelles);
  }, []);

  const parcelleOptions =
    contact.lands.map((parcelle) => ({
      label: parcelle.externalId.toString(),
      value: parcelle._id.toString(),
    }));

  const defaultSteps = [
    {
      label: "Rendez-vous",
      value: "Rendez-vous",
    },
  ];

  const handleUpload = (files) => {
    setFile(files)
  }
  const ajouterNouvelleAffaire = () => {
    const date_create = new Date();

    if (!nomAffaire || !numParcelle || !montant || !description || !etapes) {
      champsvide();
    } else {
      console.log("numParcelle", numParcelle)
      console.log("contact", contact)
      ajouterAffaire(
        nomAffaire,
        numParcelle,
        montant,
        description,
        etapes,
        file,
        contact._id
      ).then((response) => {
        successtoast();

      })
      .catch((err) => toaster.notifyError(err.message));
      closeIt();
    }
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
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

      <ToastContainer />
      <Box sx={style}>
        <h4 style={{ marginBottom: 20 }}>Ajouter une affaire</h4>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { my: 1, maxWidth: "436px" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            required
            id="outlined-required"
            label="Nom de l'affaire"
            fullWidth
            value={nomAffaire}
            onChange={(e) => setNomAffaire(e.target.value)}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            sx={{ width: "100%" }}
            renderInput={(params) => (
              <TextField {...params} label="Parcelle n°" />
            )}
            fullWidth
            options={parcelleOptions}
            value={numParcelle}
            onChange={(event, newValue) => {
              setNumParcelle(newValue ? newValue.value : null);
            }}
            isOptionEqualToValue={(option, value) => option.value === value}
          />
          <TextField
            id="outlined-required"
            type="number"
            label="Montant"
            fullWidth
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            sx={{ width: "100%" }}
            renderInput={(params) => (
              <TextField {...params} label="Etape de l'affaire" />
            )}
            fullWidth
            options={defaultSteps}
            value={etapes}
            onChange={(event, newValue) => {
              setEtapes(
                newValue ? newValue.value : null
              );
            }}
            isOptionEqualToValue={(option, value) => option.value === value}
          />
          <TextField
            required
            id="outlined-required"
            label="Description"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            helperText="0/100"
            size="medium"
          />
          <Box sx={{ mt: 2 }}>
            <InputFile handleUpload={handleUpload} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 2 }}>
            <Button
              sx={{
                background: "#757575",
                color: "#fff",
                "&:hover": { background: "#757575" },
                mr: 2,
              }}
              onClick={closeIt}
            >
              Annuler
            </Button>
            <Button
              sx={{
                background: "#299CDB",
                color: "#fff",
                "&:hover": { background: "#299CDB" },
              }}
              onClick={ajouterNouvelleAffaire}
            >
              Ajouter
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CreateAffaire;
