import React, { useState } from "react";
import { Box, Autocomplete, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers";
import { ajouterTache } from "../../../indexedDb";
import { ToastContainer, toast } from "react-toastify";


const CreateTask = ({ closeIt , nomAffaire }) => {
  const [objectif, setObjectif] = useState('');
  const [description, setDescription] = useState('');
  const [dateEcheance, setDateEcheance] = useState(null);
  const [assigneA, setAssigned] = useState(null);
  const [statut, setStatus] = useState(null);
  const [affaireNom, setAffaireNom] = useState('');
  

  //Toasts
  const champsvide = () =>
    toast.warn("Veuillez compléter les champs obligatoires");
  const successtoast = () => toast.success("Affaire créé avec succès");

  const handleDateChange = (date) => {
    setDateEcheance(date);
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

  const ajouterNouvelleTask = () => {
    const date_create = new Date();
    setAffaireNom(nomAffaire)

    if (
      !objectif ||
      !dateEcheance ||
      !description ||
      !assigneA ||
      !statut
    ) {
      champsvide();
    } else {
      ajouterTache(
        nomAffaire,
        objectif,
        description,
        dateEcheance ? dateEcheance.format('DD-MM-YYYY') : '',
        assigneA,
        statut,
        date_create
      );
      successtoast();
      closeIt();
    }
  };

  const assignation = [
    {
      label: "Anne Marie",
      value: "Anne Marie",
    },
    {
      label: "ARNI Sonia",
      value: "ARNI Sonia",
    },
  ];
  const statuts = [
    {
      label: "En cours",
      value: "En cours",
    },
    {
      label: "En attente",
      value: "En attente",
    },
  ];
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
      <Box sx={style}>
        <h4 style={{ marginBottom: 20 }}>Ajouter une tâche</h4>
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
            label="Objectif"
            fullWidth
            value={objectif}
            onChange={(e) => setObjectif(e.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="Description"
            fullWidth
            helperText="0/100"
            size="medium"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <DatePicker
            label="Date d'échéance"
            value={dateEcheance}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} />}
            sx={{
              width: "100%",
            }}
            
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            sx={{ width: "100%" }}
            renderInput={(params) => (
              <TextField {...params} label="Assigné à ..." />
            )}
            fullWidth
            options={assignation}
            value={assigneA}
            onChange={(event, newValue) => {
              setAssigned(newValue ? newValue.value : null);
            }}
            isOptionEqualToValue={(option, value) => option.value === value}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            sx={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label="Statut" />}
            fullWidth
            options={statuts}
            value={statut}
            onChange={(event, newValue) => {
              setStatus(newValue ? newValue.value : null);
            }}
            isOptionEqualToValue={(option, value) => option.value === value}
          />
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
              onClick={ajouterNouvelleTask}
            >
              Ajouter
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CreateTask;
