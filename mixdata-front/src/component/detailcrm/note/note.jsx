import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import { Box, Typography } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

const Note = ({ noteData, numParcelle }) => {
  const [data, setData] = useState([]);
  const [numParc, setNumParc] = useState([]);
  const [newData, setNewData] = useState([]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    setData(noteData);
    setNumParc(numParcelle);

    const filteredData = noteData.filter(
      (datas) => datas.num_parcelle === numParc
    );
    setNewData(filteredData);
  }, [data, noteData, numParcelle, numParc]);


  return (
    <Box sx={{ mt: 5 }}>
      <h3>Notes</h3>
      {newData && newData.length > 0 ? (
        newData.map((notes, index) => (
          <Accordion
            key={index}
            sx={{
              background: index % 2 === 0 ? "#f4fafd" : "#ffffff",
            }}
          >
            <AccordionSummary className="noteCordion">
              <Box sx={{display: 'flex' , alignItems: 'center' , width: '80%'}}>
                <Box sx={{width:'33.3%'}}>{index + 1}</Box>
                <Box sx={{width:'33.3%'}}>{formatDate(notes.date_create)}</Box>
                <Box sx={{width:'33.3%'}}>{notes.description}</Box>
              </Box>
              <Box>
                <ModeEditIcon sx={{ mr: 2 }} />
                <DeleteIcon sx={{ color: "red" }} />
              </Box>
            </AccordionSummary>
          </Accordion>
        ))
      ) : (
        <Typography sx={{ fontWeight: "bold" ,p:3 }}>
          Pas de note disponible
        </Typography>
      )}
    </Box>
  );
};

export default Note;
