import React from "react";
import { useApplication } from "../../../hooks/UseApplication";
import {
  Box,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import { detailparcelleStyles } from "./styles";
import jwtInterceptor from "../../../service/jwtInterceptor";
import { useState, useEffect } from "react";
import { API_URL } from '@utils/constants';

/*****Ui icons */
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const EnqueteDetail = () => {
  const details = useApplication();
  const [loading, setLoading] = useState(true)
  const detail = details.details.land_id;
  const [expanded, setExpanded] = React.useState("panel1");
  const [matchingEnquetes, setMatchingEnquetes] = useState([]);
  const handleChanges = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };


  const fetchData = async () => {
    try {      
      const response = await jwtInterceptor.get(
        `${API_URL}/faos/land/${detail}`,
        {
          size: 2000,
          page: 1,
          region: "all",
        }
      );
      setLoading(true)
      const data = response.data.data.results;
      const matchingEnquetes = data;
      setMatchingEnquetes(matchingEnquetes);
      if(!matchingEnquetes){
        setLoading(false)  
      }
      setLoading(false)
    } catch (error) {
      console.error("Erreur lors de la requête API :", error);
    }

  };

  useEffect(() => {
    fetchData();
  }, [detail]);

  


  return (
    <Box className="Layout bg-white my-4 rounded p-4" id="enquete">
      <Typography variant="h6" style={detailparcelleStyles.fontWeightTitle}>
        ENQUÊTES
      </Typography>
      <Box sx={{ p: 1, mt: 2 }}>
      {
        loading ? (<CircularProgress />) : 
        matchingEnquetes.length > 0 ? (
          matchingEnquetes.map((enquete) => {
            return(
              <>
                <Accordion
                expanded={expanded === enquete._id}
                onChange={handleChanges(enquete._id)}
                key={enquete._id}
                sx={{ pb: 0 }}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                  expandIcon={<ExpandMoreIcon />}
                  sx={detailparcelleStyles.accordions}
                >
                  <Typography
                    sx={{
                      width: "33.3%",
                      textAlign: "start",
                      ml: 5,
                      color: "#299CDB",
                      fontWeight: "bold",
                    }}
                  >
                    {enquete._source.type_name}
                  </Typography>
                  <Typography sx={{ width: "33.3%", textAlign: "center" }}>
                    {enquete._source.work_type}
                  </Typography>
                  <Typography
                    sx={{
                      width: "33.3%",
                      textAlign: "right",
                      color: "#299CDB",
                      fontWeight: "bold",
                    }}
                  >
                    {enquete._source.inquiry_start_date}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ background: "#FAFAFA" }}>
                  <Box className="col-12 p-4">
                    <Box
                      className="d-flex justify-content-between p-4 overflow-auto"
                      style={detailparcelleStyles.grayBg}
                    >
                      <Box className="me-2" style={detailparcelleStyles.cellWdth10p}>
                        <p
                          style={{
                            color: detailparcelleStyles.graylight,
                            ...detailparcelleStyles.fontWeightTitle,
                          }}
                        >
                          Code du dossier
                        </p>
                        <p
                          style={{
                            color: detailparcelleStyles.graylight,
                            ...detailparcelleStyles.fontWeightTitle,
                          }}
                        >
                          Abbr
                        </p>
                        <p
                          style={{
                            color: detailparcelleStyles.graylight,
                            ...detailparcelleStyles.fontWeightTitle,
                          }}
                        >
                          Propriétaire
                        </p>
                        <p
                          style={{
                            color: detailparcelleStyles.graylight,
                            ...detailparcelleStyles.fontWeightTitle,
                          }}
                        >
                          Architecte
                        </p>
                        <p
                          style={{
                            color: detailparcelleStyles.graylight,
                            ...detailparcelleStyles.fontWeightTitle,
                          }}
                        >
                          Region
                        </p>
                        <p
                          style={{
                            color: detailparcelleStyles.graylight,
                            ...detailparcelleStyles.fontWeightTitle,
                          }}
                        >
                          Commune
                        </p>
                      </Box>
                      <Box className="mx-2" sx={{ maxWidth: "400px", width: "100%" }}>
                        <p>{enquete._source.fao_code_number}</p>
                        <p>{enquete._source.type_code}</p>
                        <p>{enquete._source.owner}</p>
                        <p>{enquete._source.architect}</p>
                        <p>{enquete._source.region}</p>
                        <p>{enquete._source.city}</p>
                      </Box>
                      <Box className="mx-2" style={detailparcelleStyles.cellWdth10p}>

                        <p
                          style={{
                            color: detailparcelleStyles.graylight,
                            ...detailparcelleStyles.fontWeightTitle,
                          }}
                        >
                          Description des travaux
                        </p>
                        <p
                          style={{
                            color: detailparcelleStyles.graylight,
                            ...detailparcelleStyles.fontWeightTitle,
                          }}
                        >
                          Notre ID
                        </p>
                        <p
                          style={{
                            color: detailparcelleStyles.graylight,
                            ...detailparcelleStyles.fontWeightTitle,
                          }}
                        >
                          Mandataire
                        </p>
                        <p
                          style={{
                            color: detailparcelleStyles.graylight,
                            ...detailparcelleStyles.fontWeightTitle,
                          }}
                        >
                          Adresse
                        </p>
                        <p
                          style={{
                            color: detailparcelleStyles.graylight,
                            ...detailparcelleStyles.fontWeightTitle,
                          }}
                        >
                          Liens
                        </p>
                      </Box>
                      <Box className="ms-2" sx={{ maxWidth: "660px", width: "100%" }}>

                        <p>{enquete._source.work_description}</p>
                        <p>{enquete._source.lands_id}</p>
                        <p>{enquete._source.result}</p>
                        <p>{enquete._source.address}</p>
                        <Link to={enquete._source.url_official} target="_blank">{enquete._source.url_official}</Link>
                      </Box>
                    </Box>
                  </Box>
                </AccordionDetails>
                </Accordion>
            </>
          )
          }
          )) : (
            <Typography variant="body1">Pas d'enquête disponible</Typography>
          )
      }

      </Box>
    </Box>
  );
};

export default EnqueteDetail;
