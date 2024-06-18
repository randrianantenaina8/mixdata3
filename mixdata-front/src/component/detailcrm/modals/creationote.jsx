import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { ajouterNote } from "../../../indexedDb";
import { ToastContainer, toast } from "react-toastify";

const CreateNote = ({ closeIt , numParcelle }) => {
  const [description, setDescription] = useState("");

  //Toasts
  const champsvide = () =>
    toast.warn("Veuillez compléter les champs obligatoires");
  const successtoast = () => toast.success("Note créé avec succès");



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

  const ajouterNouvelleNote = () => {
    const date_create = new Date();

    if (!description) {

      champsvide();
    } else {

      ajouterNote(description, numParcelle, date_create);
      successtoast();
      closeIt();
    }
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
      <Box sx={style}>
        <h4 style={{ marginBottom: 20 }}>Ajouter une note</h4>
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
            label="Description"
            fullWidth
            helperText="0/100"
            size="medium"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
              onClick={ajouterNouvelleNote}
            >
              Ajouter
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CreateNote;
