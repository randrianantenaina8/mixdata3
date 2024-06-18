import React from "react";
import { Box , Accordion , AccordionSummary , Typography , AccordionDetails } from "@mui/material";
import { detailparcelleStyles } from "./styles";
import jwtInterceptor from "../../../service/jwtInterceptor";
import { useState , useEffect } from "react";
import { useApplication } from "../../../hooks/UseApplication";
import { CircularProgress } from "@mui/material";
import { API_URL } from "@utils/constants";

/*****Ui icons */
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const TransactionDetail = () => {
    const generalId = useApplication();
    const gId = generalId.details.land_id;
    const [loading, setLoading] = useState(true)
    // const detail = detailTransaction.transactions
    const [expanded, setExpanded] = React.useState('panel1');
    const handleChanges = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
      };
    const [matchingTransactions, setMatchingTransactions] = useState([]);
    const fetchData = async () => {
        try {
          const response = await jwtInterceptor.get(
            `${API_URL}/transaction/land/${gId}`,
            {
              size: 2000,
              page: 1,
              region: "all",
            }
          );
          setLoading(true)
          const data = response.data.data.results;
          const matchingTransactions = data;
          setMatchingTransactions(matchingTransactions);
          if(!matchingTransactions){
            setLoading(false)
          }
          setLoading(false)
        } catch (error) {
          console.error("Erreur lors de la requête API :", error);
        }
      };

    useEffect(() => {
        fetchData();
    } , [gId])
    

    return(
        <Box className="Layout bg-white my-4 rounded p-4" id="transaction">
            <Typography variant="h6" style={detailparcelleStyles.fontWeightTitle}>TRANSACTIONS</Typography>
            <Box sx={{p:1 , mt:2}}>

                {
                loading ? (<CircularProgress />) :
                 matchingTransactions.length > 0 ? (
                    matchingTransactions.map((transaction) => {
                        return(
                            <Accordion
                            key={transaction._id}
                            expanded={expanded === transaction._id}
                            onChange={handleChanges(transaction._id)}
                        >
                            <AccordionSummary
                                aria-controls="panel1d-content"
                                id="panel1d-header"
                                expandIcon={<ExpandMoreIcon />}
                                sx={detailparcelleStyles.accordions}
                            >
                                <Typography sx={{ width: "33.3%", textAlign: "start", ml: 5, color: "#299CDB", fontWeight: "bold" }}>
                                    {transaction._source.official_id}
                                </Typography>
                                <Typography sx={{ width: "33.3%", textAlign: "center" }}>
                                    {transaction._source.reason}
                                </Typography>
                                <Typography sx={{ width: "33.3%", textAlign: "right", color: "#299CDB", fontWeight: "bold" }}>
                                    {transaction._source.date}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ background: "#FAFAFA" }}>
                                <Box className="col-12 p-4">
                                <AccordionDetails sx={{ background: "#FAFAFA" }}>
                                    <Box className="col-12 p-4">
                                        <Box className="d-flex justify-content-between p-4 overflow-auto" style={detailparcelleStyles.grayBg}>
                                            <Box className="me-2" style={detailparcelleStyles.cellWdth10p}>
                                                <p style={{ color: detailparcelleStyles.graylight, ...detailparcelleStyles.fontWeightTitle }}>Type</p>
                                                <p style={{ color: detailparcelleStyles.graylight, ...detailparcelleStyles.fontWeightTitle }}>Type de bien</p>
                                                <p style={{ color: detailparcelleStyles.graylight, ...detailparcelleStyles.fontWeightTitle }}>Information</p>
                                                <p style={{ color: detailparcelleStyles.graylight, ...detailparcelleStyles.fontWeightTitle }}>Prix</p>
                                                <p style={{ color: detailparcelleStyles.graylight, ...detailparcelleStyles.fontWeightTitle }}>Acheteurs</p>
                                            </Box>
                                            <Box className="mx-2" sx={{ maxWidth: "400px", width: "100%" }}>
                                                <p>{transaction._source.reason}</p>
                                                <p>{transaction._source.ownership_type}</p>
                                                <p>{transaction._source.land_information}</p>
                                                <p>{transaction._source.price ? `${transaction._source.price} €` : 'N/A'}</p>
                                                <p>{transaction._source.buyers}</p>
                                            </Box>
                                            <Box className="mx-2" style={detailparcelleStyles.cellWdth10p}>
                                                <p style={{ color: detailparcelleStyles.graylight, ...detailparcelleStyles.fontWeightTitle }}>Vendeurs</p>
                                                <p style={{ color: detailparcelleStyles.graylight, ...detailparcelleStyles.fontWeightTitle }}>Détails</p>
                                                <p style={{ color: detailparcelleStyles.graylight, ...detailparcelleStyles.fontWeightTitle }}>Ville</p>
                                                <p style={{ color: detailparcelleStyles.graylight, ...detailparcelleStyles.fontWeightTitle }}>Date de transaction</p>
                                                <p style={{ color: detailparcelleStyles.graylight, ...detailparcelleStyles.fontWeightTitle }}>Adresse</p>
                                            </Box>
                                            <Box className="ms-2" sx={{ maxWidth: "500px", width: "100%" }}>
                                                <p>{transaction._source.sellers}</p>
                                                <p>{transaction._source.details}</p>
                                                <p>{transaction._source.city}</p>
                                                <p>{transaction._source.previous_transaction_date}</p>
                                                <p>{transaction._source.address}</p>
                                            </Box>
                                        </Box>
                                    </Box>
                                </AccordionDetails>
                                </Box>
                            </AccordionDetails>
                        </Accordion>
    
                        )
                    }
                    )) : (
                        <Typography variant="body1">Pas de transaction disponible</Typography>
                    )
                }
            </Box>
        </Box>
    )
}

export default TransactionDetail;