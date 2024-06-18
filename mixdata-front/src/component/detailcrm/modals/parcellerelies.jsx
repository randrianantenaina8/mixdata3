import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Grid from "@mui/system/Unstable_Grid/Grid";
import { useNavigate } from "react-router-dom";

const ParcelleResume = ({ selectedParcel, closeIt }) => {
  const bat_annee = selectedParcel.bat_annee;
  const numParcelle = selectedParcel.id;
  const [batiment, annee] = bat_annee.split("/");
  const navigate = useNavigate();

  const goToParcel = () => {
    navigate(`/details/${numParcelle}`);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };
  return (
    <Box sx={style}>
      {selectedParcel && (
        <Box>
          <h4 style={{ marginBottom: 20 }}>Parcelle n° {selectedParcel.id}</h4>
          <Box sx={{ background: "#fafafa", p: 3 }}>
            <Grid container rowSpacing={3} columSpacing={3}>
              <Grid item xs={6}>
                <Typography>Surface: {selectedParcel.surface} m2</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Années: {annee} </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Bâtiment(s): {batiment} </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Enquête(s): {selectedParcel.enquete} </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  Transaction(s): {selectedParcel.transaction}{" "}
                </Typography>
              </Grid>
            </Grid>

            {/* <Typography>Surface: {selectedParcel.surface} </Typography> */}
          </Box>
        </Box>
      )}
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
          Fermer
        </Button>
        <Button
          sx={{
            background: "#299CDB",
            color: "#fff",
            "&:hover": { background: "#299CDB" },
          }}
          onClick={goToParcel}
        >
          Visiter la parcelle
        </Button>
      </Box>
    </Box>
  );
};

export default ParcelleResume;
