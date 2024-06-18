import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  recupererEvenementsHistorique,
  viderHistorique,
} from "../../../indexedDb";

const ParcelleResume = ({ closeIt }) => {
  const [evenementsHistorique, setEvenementsHistorique] = useState([]);
  const username = localStorage.getItem("username");

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const truncate = (str) => {
    return str.length > 10 ? str.substring(0, 25) + "..." : str;
  };

  useEffect(() => {
    recupererEvenementsHistorique().then((evenements) => {
      setEvenementsHistorique(evenements);
    });
  }, []);

  const viderHistoriqueHandler = () => {
    viderHistorique();
    setEvenementsHistorique([]);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };
  return (
    <Box sx={style}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 5,
        }}
      >
        <h4>Historiques</h4>
        <CloseIcon sx={{ cursor: "pointer" }} onClick={closeIt} />
      </Box>
      <Box sx={{ marginBottom: 5, overflow: "auto", maxHeight: "240px" }}>
        {evenementsHistorique &&
          evenementsHistorique.map((evenement, index) => (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid #e3e3e3",
                paddingBlock: 1,
              }}
              key={index}
            >
              <Typography sx={{ marginRight: "60px" }}>
                {formatDate(evenement.date)}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ fontWeight: "bold", pr: 1 }}>
                  {evenement.action === "Affaire créé"
                    ? truncate(evenement.details.nom_affaire)
                    : evenement.action === "Tâche créé"
                    ? truncate(evenement.details.objectif)
                    : evenement.action === "Note créé"
                    ? truncate(evenement.details.description)
                    : evenement.action === "Affaire supprimée"
                    ? evenement.details.nom_affaire
                    : ""}{" "}
                  -
                </Typography>
                <Typography sx={{ pr: 1, color: "#299CDB" }}>
                  {evenement.action} -
                </Typography>
                <Typography>{username}</Typography>
              </Box>
            </Box>
          ))}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 2 }}>
        <Typography
          sx={{
            textDecoration: "underline",
            color: "red",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={viderHistoriqueHandler}
        >
          <DeleteIcon />
          Vider l'historique
        </Typography>
      </Box>
    </Box>
  );
};

export default ParcelleResume;
