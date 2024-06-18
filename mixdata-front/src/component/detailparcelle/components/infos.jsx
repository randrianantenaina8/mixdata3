import React , {useState} from "react";
import { detailparcelleStyles } from "./styles";
import { Box , Paper, Accordion , Typography , AccordionSummary , AccordionDetails , TableContainer, Table, TableHead, TableRow, TableCell, TableBody , Tabs, Tab, Stack, Chip , Link} from "@mui/material";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { useApplication } from "../../../hooks/UseApplication";


/****Image const*/
import resumeIcon from "../../../assets/Images/icons/resumeMix.svg"
import homeIcon from "../../../assets/Images/icons/homeMix.svg"
import zoneIcon from "../../../assets/Images/icons/zoneMix.svg"
import restrictionIcon from "../../../assets/Images/icons/restrictionMix.svg"

/***icons */
import InfoIcon from '@mui/icons-material/Info';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


const DetailInfos = () =>{
    const [activeTab, setActiveTab] = useState('resume');
    const { details } = useApplication()
    const [expanded, setExpanded] = React.useState('panel1');
    const [inneractiveTab, setInnerActiveTab] = useState('tabs1');
    const handleChangeTab = (event, newValue) => {
        setActiveTab(newValue);
      };
      let batiments = [];

      if (details && details.buildings && details.buildings.length > 0) {
          batiments = details.buildings.map(batiment => batiment.buildings_administrative);
      }
    const handleChanges = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
    };
    const handleInnerChangeTab = (event, newValue) => {
        setInnerActiveTab(newValue);
      };
    const CustomWidthTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
      ))({
        [`& .${tooltipClasses.tooltip}`]: {
          maxWidth: 500,
          background: "#F9FAFB"
        },
      });
      
      function createBat(name, secondR){
        return {name, secondR}
      }
      function createData(name, Actuel, Autorisé, Différence) {
        return { name, Actuel, Autorisé, Différence };
      }
      const customRows = [
        createData('Coefficient d’occupation du sol (COS)', 0.08, 0.15, +0.15),
        createData('Surface bâtie (SB)', '100 m2', '300 m2', '+100 m2'),
        createData('Indice d’utilisation du sol (IUS)', 0.07, 0.7, +0.50),
        createData('Surface de plancher déterminante (SPd)', '83 m2', '830 m2', '+300 m2'),
        createData('Etage max', 1, 4, +4),
        createData('Hauteur max)', '1000m', '-', '-'),
        createData('Distace aux limites', '4', '-', '-'),
      ]
      const residentRow = [
        createBat('Numéro Officiel', 1504),
        createBat('Nom', 'N/A'),
        createBat('Catégorie OFS', 'Bâtiment à usage habitation'),
      ]
    
      const informationRow = [
        createBat('Numéro Officiel' , 1504),
        createBat('Nom' , 'N/A'),
        createBat('Catégorie OFS' , 'Bâtiment à usage habitation'),
        createBat('Classification OFS' , 'Maison individuelle'),
      ]
    
      const energieRow = [
        createBat('Chauffage principale' , 'Chaudière'),
        createBat('Chauffage secondaire' , 'Pas de générateur de chaleur'),
        createBat('Eau chauffage principale' , 'Mazout'),
        createBat('Eau chauffage secondaire' , 'Aucune'),
        createBat('Potentiel solaire' , 'Bon')
      ]

        /*****custom styles variables*/

  const tooltipContent = (
    <Box sx={{display: "flex", p:3, flexWrap:"wrap"}}>
      <Box sx={{width:"25%"}}>
        <p style={{ color: detailparcelleStyles.graylight, ...detailparcelleStyles.fontWeightTitle }}>Affectation</p>
        <p style={{ color: detailparcelleStyles.graylight, ...detailparcelleStyles.fontWeightTitle }}>Constructible</p>
        <p style={{ color: detailparcelleStyles.graylight, ...detailparcelleStyles.fontWeightTitle }}>Part</p>
        <p style={{ color: detailparcelleStyles.graylight, ...detailparcelleStyles.fontWeightTitle }}>Destination</p>
      </Box>
      <Box sx={{width:"25%"}}>
        <p style={{color:"#363636"}}>Zone</p>
        <p style={{color:"#363636"}}>
          <CheckCircleOutlineIcon sx={{color: "#88B790", height: "18px"}}/>
        </p>
        <p style={{color:"#363636"}}>100%</p>
      </Box>
      <Box sx={{width:"25%"}}>
        <p style={{ color: detailparcelleStyles.graylight, ...detailparcelleStyles.fontWeightTitle }}>Ordre des constructions</p>
      </Box>
      <Box sx={{width:"25%"}}>
        <p style={{color:"#363636"}}>C/NC</p>
      </Box>
      <Box sx={{width: "100%"}}>
        <p style={{color:"#363636"}}>La 3e zone est une zone résidentielle destinée aux villas où des exploitations agricoles peuvent également trouver place ; l'activité professionnelle du propriétaire ou de l'ayant-droit peut être admise (gabarit max. 10 m).</p>
      </Box>
    </Box>
  );
  const tooltipRestrictions = (
    <Box sx={{display: "flex", p:3, flexWrap:"wrap"}}>
      <Box sx={{width:"25%"}}>
        <p style={{ color: detailparcelleStyles.graylight, ...detailparcelleStyles.fontWeightTitle }}>Officiel ID</p>
        <p style={{ color: detailparcelleStyles.graylight, ...detailparcelleStyles.fontWeightTitle }}>Type</p>
        <p style={{ color: detailparcelleStyles.graylight, ...detailparcelleStyles.fontWeightTitle }}>Statu</p>
        <p style={{ color: detailparcelleStyles.graylight, ...detailparcelleStyles.fontWeightTitle }}>Remark</p>
        <p style={{ color: detailparcelleStyles.graylight, ...detailparcelleStyles.fontWeightTitle }}>Article in BZR</p>
      </Box>
      <Box sx={{width:"25%"}}>
        <p style={{color:"#363636"}}>02655844540</p>
        <p style={{color:"#363636"}}>Gestaudb</p>
        <p style={{color:"#363636"}}>in Kraft</p>
        <p style={{color:"#363636"}}></p>
        <p style={{color:"#363636"}}>42</p>
      </Box>
      <Box sx={{width:"25%"}}>
        <p style={{ color: detailparcelleStyles.graylight, ...detailparcelleStyles.fontWeightTitle }}>Other provisions in the BZR</p>
        <p style={{ color: detailparcelleStyles.graylight, ...detailparcelleStyles.fontWeightTitle }}>Protection start date filename</p>
      </Box>
      <Box sx={{width:"25%"}}>
        <p style={{color:"#363636"}}></p>
        <p style={{color:"#363636"}}>dhon.itf</p>
      </Box>
    </Box>
  );

    return(
        <Box className="Layout bg-white my-4 rounded" sx={{display: "flex" , height: "auto" , minHeight: "848px" , flexWrap : "wrap" , flexDirection: {xl: "row" , lg: "row" , md: "row" , sm: "column-reverse" , xs: "column-reverse" } , borderTopRightRadius: "8px" , borderTopLeftRadius: {lg: 0 , md: 0 , sm: "8px" , xs: "8px"} , justifyContent: {lg: "inherit" , md: "inherit" , sm: "flex-end", xs: "flex-end"}}}>
            <Box className="container-fluid" sx={activeTab === 'zone' || activeTab === 'batiment'  ? {width: "84%"} : {width:{xl:"80%", lg:"80%" , md:"80%" , sm:"100%" , xs:"100%"}}}>
            {activeTab === 'resume' && (
                <Box className="row">
                <Box className="col-12 p-4">
                    <p style={detailparcelleStyles.fontWeightTitle}>INFORMATIONS</p>
                    <Box className="d-flex justify-content-between p-4 overflow-auto" style={detailparcelleStyles.grayBg}>
                    <Box className="me-2" sx={detailparcelleStyles.cellWdth}>
                        <p style={{ color: detailparcelleStyles.graylight, ...detailparcelleStyles.fontWeightTitle }}>Adresses</p>
                        <p style={{ color: detailparcelleStyles.graylight, ...detailparcelleStyles.fontWeightTitle }}>Type</p>
                        <p style={{ color: detailparcelleStyles.graylight, ...detailparcelleStyles.fontWeightTitle }}>Surface</p>
                        <p style={{ color: detailparcelleStyles.graylight, ...detailparcelleStyles.fontWeightTitle }}>Commune OFS n<sup>°</sup></p>
                    </Box>
                    <Box className="mx-2" sx={detailparcelleStyles.cellWdth}>
                        <p>{details.address_full}</p>
                        <p>{details.type === 'private' ? 'Privé' : 'Public'}</p>
                        <p>{details.area} m<sup>2</sup></p>
                        <p>{details.city_ofs_number}</p>
                    </Box>
                    <Box className="mx-2" sx={detailparcelleStyles.cellWdth}>
                        <p style={{ color: detailparcelleStyles.graylight, ...detailparcelleStyles.fontWeightTitle }}>Nom Zone</p>
                        <p style={{ color: detailparcelleStyles.graylight, ...detailparcelleStyles.fontWeightTitle }}>N° Parcelle</p>
                        <p style={{ color: detailparcelleStyles.graylight, ...detailparcelleStyles.fontWeightTitle }}>EGRID</p>
                        <p style={{ color: detailparcelleStyles.graylight, ...detailparcelleStyles.fontWeightTitle }}>Type de plan</p>
                    </Box>
                    <Box className="ms-2" sx={detailparcelleStyles.cellWdth}>
                        <p>{details.main_lupa_name}</p>
                        <p>{details.code_number}</p>
                        <p>{details.egrid_nb}</p>
                        <p>{details.main_lupa_type}</p>
                    </Box>
                    </Box>
                </Box>
                <Box className="col-12 p-4">
                    <p style={detailparcelleStyles.fontWeightTitle}>BATIMENTS</p>
                    <Box className="d-flex justify-content-between p-4 overflow-auto" style={detailparcelleStyles.grayBg}>
                      <Box className="mx-2" style={detailparcelleStyles.cellWdth}>
                          <p style={{ color: detailparcelleStyles.graylight, ...detailparcelleStyles.fontWeightTitle }}>Total emprise</p>
                          <p style={{ color: detailparcelleStyles.graylight, ...detailparcelleStyles.fontWeightTitle }}>Etage max</p>
                          <p style={{ color: detailparcelleStyles.graylight, ...detailparcelleStyles.fontWeightTitle }}>Hauteur max</p>
                      </Box>
                      <Box className="ms-2" style={detailparcelleStyles.cellWdth}>
                          <p>{details.building_total_area} m<sup>2</sup></p>
                          <p>{details.max_floor_nb}</p>
                          <p>{details.max_height ? `${details.max_height} m` : 'Non spécifié' }</p>
                      </Box>
                    </Box>
                    {
                      batiments && batiments.length > 0 ? 
                      ( batiments &&
                      batiments.map((batiment, index) => (
                        <Box className="pt-4" key={index}>
                          <p style={detailparcelleStyles.fontWeightTitle}>BATIMENT {index + 1}</p>
                          <Box className="d-flex justify-content-between p-4 overflow-auto" style={detailparcelleStyles.grayBg}>
                            <Box className="me-2" style={detailparcelleStyles.cellWdth}>
                              <p style={{ color: detailparcelleStyles.graylight, ...detailparcelleStyles.fontWeightTitle }}>Classe bâtiments</p>
                              <p style={{ color: detailparcelleStyles.graylight, ...detailparcelleStyles.fontWeightTitle }}>Année de contr.</p>
                              {/* <p style={{ color: detailparcelleStyles.graylight, ...detailparcelleStyles.fontWeightTitle }}>Catégorie de bâtiments</p> */}
                              <p style={{ color: detailparcelleStyles.graylight, ...detailparcelleStyles.fontWeightTitle }}>Numéro Officiel bâtiments</p>
                            </Box>
                            {batiment && batiment[0] && (
                                <Box className="mx-2" style={detailparcelleStyles.cellWdth}>
                                <p>{batiment[0].category}</p>
                                <p>{batiment[0].building_period}</p>
                                {/* <p>Usage habitation</p> */}
                                {
                                  batiment[0].egid ? (
                                    <Link href={'https://www.housing-stat.ch/fr/query/egid.html?egid=' + batiment[0].egid } target="_blank" rel="noreferrer" sx={{fontStyle: "none"}}>Bâtiment {index + 1}</Link>
                                  ) : null
                                }
                              </Box>
                            )}
                          </Box>
                        </Box>
                      )) ) : (
                        <Box className="mt-4 p-4" style={detailparcelleStyles.grayBg}>Pas de bâtiments disponible</Box>
                      )
                    }
                </Box>
                </Box>
            )}
            {activeTab === 'zone' && (
                <Box sx={{my:5}}>
                <p style={detailparcelleStyles.fontWeightTitle}>ZONE D’AFFECTATION</p>
                <Accordion expanded={expanded === 'zone'} onChange={handleChanges('zone')} sx={{pb:0}}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ExpandMoreIcon />} sx={detailparcelleStyles.accordions}>
                    <Typography sx={{width:"33.3%", textAlign: "start", ml:5, color:"#299CDB", fontWeight: "bold"}}>Loi sur les constructions et les installations diverses</Typography>
                    <Typography sx={{width:"33.3%", textAlign: "center"}}>LCI adopté le 1988-04-14 -En vigueur</Typography>
                    <Typography sx={{width:"33.3%", textAlign: "right", color:"#299CDB", fontWeight: "bold"}}>
                        <CustomWidthTooltip title={tooltipContent}  placement="bottom-start">
                        <InfoIcon />
                        </CustomWidthTooltip>
                    </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{background: "#FAFAFA"}}>
                    <Box className="col-12 p-4">
                        <Box className="d-flex justify-content-between p-4 overflow-auto" style={detailparcelleStyles.grayBg}>
                        <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell sx={detailparcelleStyles.fontWeightTitle}>Surface et indices</TableCell>
                                <TableCell align="right" sx={{color:"#299CDB", fontWeight: "bold"}}>Actuel</TableCell>
                                <TableCell align="right" sx={{color:"#299CDB", fontWeight: "bold"}}>Autorisé</TableCell>
                                <TableCell align="right" sx={{color:"#299CDB", fontWeight: "bold"}}>Différence</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {customRows.map((row) => (
                                <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.Actuel}</TableCell>
                                <TableCell align="right">{row.Autorisé}</TableCell>
                                <TableCell align="right">{row.Différence}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </TableContainer>
                        </Box>
                    </Box>
                    </AccordionDetails>
                </Accordion>
                </Box>
            )}
            {activeTab === 'batiment' && (
                <Box sx={{my:5}}>
                <p style={detailparcelleStyles.fontWeightTitle}>BATIMENT</p>
                <Accordion expanded={expanded === 'batiment'} onChange={handleChanges('batiment')} sx={{pb:0}}>
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header" expandIcon={<ExpandMoreIcon />} sx={detailparcelleStyles.accordions}>
                    <Typography sx={{width:"25%", textAlign: "start", ml:5, color:"#299CDB", fontWeight: "bold"}}>Bâtiment 1</Typography>
                    <Typography sx={{width:"25%", textAlign: "center"}}>EGID 103542</Typography>
                    <Typography sx={{width:"25%", textAlign: "center"}}>Liverdy presles en brie 25</Typography>
                    <Typography sx={{width:"25%", textAlign: "right", color:"#299CDB", fontWeight: "bold"}}>
                        <CustomWidthTooltip title={tooltipContent}  placement="bottom-start">
                        <InfoIcon />
                        </CustomWidthTooltip>
                    </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{background: "#FAFAFA"}}>
                    <Box className="col-12 p-0">
                        <Box className="d-flex justify-content-start py-4 px-0 flex-wrap" style={detailparcelleStyles.grayBg}>
                        <TableContainer component={Paper} sx={{width: "47%", mx:2, mb:0 , height: "fit-content"}}>
                            <Table sx={{ minWidth: "inherit" , height: "auto" }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                <TableCell align="left" sx={{color:"#299CDB", fontWeight: "bold"}}>Résidentiel</TableCell>
                                <TableCell align="right" sx={{color:"#299CDB", fontWeight: "bold"}}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody sx={{height: "auto"}}>
                                {residentRow.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                    {row.name}
                                    </TableCell>
                                    <TableCell align="left">{row.secondR}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                            </Table>
                        </TableContainer>
                        <TableContainer component={Paper} sx={{width: "47%", mx:2, mb:0 , height: "fit-content"}}>
                            <Table sx={{ minWidth: "inherit" , height: "auto" }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                <TableCell align="left" sx={{color:"#299CDB", fontWeight: "bold"}}>Information</TableCell>
                                <TableCell align="right" sx={{color:"#299CDB", fontWeight: "bold"}}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody sx={{height: "auto"}}>
                                {informationRow.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                    {row.name}
                                    </TableCell>
                                    <TableCell align="left">{row.secondR}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                            </Table>
                        </TableContainer>
                        <TableContainer component={Paper} sx={{width: "47%", mx: 2 , height: "fit-content"}}>
                            <Table sx={{ minWidth: "inherit" , height: "auto" }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                <TableCell align="left" sx={{color:"#299CDB", fontWeight: "bold"}}>Energie</TableCell>
                                <TableCell align="right" sx={{color:"#299CDB", fontWeight: "bold"}}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody sx={{height: "auto"}}>
                                {energieRow.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                    {row.name}
                                    </TableCell>
                                    <TableCell align="left">{row.secondR}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                            </Table>
                        </TableContainer>
                        </Box>
                    </Box>
                    </AccordionDetails>
                </Accordion>
            </Box>
            )}
            {activeTab === 'restriction' && (
                <Box sx={{background: '#F9F9F9' , borderRadius: "8px" , my:5 , p:5}} value="1">
                <Box sx={{display: "flex" , justifyContent: "space-between", alignItems: "center"}}>
                    <Tabs value={inneractiveTab} onChange={handleInnerChangeTab} sx={{background: "#fff" , width: "85%"}}>
                    <Tab label="Restrictions affectant la parcelle" value="tabs1" sx={{ fontWeight: "bold", fontSize: "15px" , textTransform: "capitalize"}}/>
                    <Tab label="Restrictions n’affectant pas la parcelle" value="tabs2" sx={{ fontWeight: "bold", fontSize: "15px" , textTransform: "capitalize"}}/>
                    </Tabs>
                    <Stack direction="row" sx={{width: "15%" , display: "flex" , justifyContent: "flex-end"}}>
                    <Chip label="3/9" size="medium" sx={{px:4 , borderRadius:2, fontSize: "14px" , color: "#3F50B6" , background: "rgba(63, 80, 182, 0.15)" , fontWeight: "bold"}}/>
                    </Stack>
                </Box>
                <Box>
                    {inneractiveTab === 'tabs1' && (
                    <Box sx={{mt:3}}>
                        <Box sx={{background: "#fff" , p:2 ,   display: "flex" , justifyContent: "space-between" , borderBottom: "1px solid #E9E9E9"}}>
                        <Typography sx={{fontWeight: "bold",}}>Servitude</Typography>
                        <InfoIcon sx={{color: "#299CDB" , cursor : "pointer"}} />
                        </Box>
                        <Box sx={{background: "#fff" , p:2 ,   display: "flex" , justifyContent: "space-between" , borderBottom: "1px solid #E9E9E9"}}>
                        <Typography sx={{fontWeight: "bold",}}>Zone de protection des eaux souterraines</Typography>
                        <InfoIcon sx={{color: "#299CDB" , cursor : "pointer"}} />
                        </Box>
                        <Box sx={{background: "#fff" , p:2 ,   display: "flex" , justifyContent: "space-between" , borderBottom: "1px solid #E9E9E9"}}>
                        <Typography sx={{fontWeight: "bold",}}>Zone à planification obligateoire</Typography>
                        <CustomWidthTooltip title={tooltipRestrictions}  placement="bottom">
                            <InfoIcon sx={{color: "#299CDB" , cursor : "pointer"}} />
                        </CustomWidthTooltip>
                        </Box>
                    </Box>
                    )}
                </Box>
                </Box>
            )}
            </Box>
            <Box sx={{background: '#757575' , width: {lg:"15%" , md: "15%" , sm: "100%" , xs: "100%"} , borderTopRightRadius: "8px" , borderTopLeftRadius: {lg: 0 , md: 0 , sm: "8px" , xs: "8px"} }} value="1">
            <Tabs
                value={activeTab}
                onChange={handleChangeTab}
                scrollButtons={false}
                orientation="vertical"
                indicatorColor={detailparcelleStyles.white}
                sx={{height: "100%" , flexDirection: {lg: "column" , md: "column" , sm: "row" , xs: "row"} , justifyContent: {lg: "inherit" , md: "inherit" , sm: "space-between" , xs: "space-between"} }}
                className="includedTabs"
            >
                <Tab value="resume" icon={<Box component="img" src={resumeIcon} alt="résumé" sx={{height: {xl:45 , lg:45 , md: 45 , sm: 45 , xs: 25} , marginBottom:5}}></Box>} label="Résumé" sx={{color:"white" ,  borderBottom: {lg: "2px #DADADA solid", md: "2px #DADADA solid" , sm: "none" , xs: "none"} , height: {lg: "25%" , md: "25%", sm: "100%" , xs: "100%"} , width: {lg: "auto" , md: "auto" , sm:"25%" , xs: "25%"} , borderRight: {lg: "none" , md: "none" , sm: "2px #DADADA solid" , xs: "2px #DADADA solid"} , fontSize: {xl:"1rem" , lg: "1rem" , md: "1rem" , sm: "0.8rem" , xs: "0.7rem"}}}/>
                <Tab value="zone" icon={<Box component="img" src={zoneIcon} alt="zone" sx={{height: {xl:35 , lg:35 , md: 35 , sm: 35 , xs: 25} , marginBottom:5}}></Box>} label="Zone d'affectation" sx={{color:"white" ,  borderBottom: {lg: "2px #DADADA solid", md: "2px #DADADA solid" , sm: "none" , xs: "none"} , height: {lg: "25%" , md: "25%", sm: "100%" , xs: "100%"} , width: {lg: "auto" , md: "auto" , sm:"25%" , xs: "25%"} , borderRight: {lg: "none" , md: "none" , sm: "2px #DADADA solid" , xs: "2px #DADADA solid"} , fontSize: {xl:"1rem" , lg: "1rem" , md: "1rem" , sm: "0.8rem" , xs: "0.7rem"}}}/>
                <Tab value="batiment" icon={<Box component="img" src={homeIcon} alt="batiment" sx={{height: {xl:35 , lg:35 , md: 35 , sm: 35 , xs: 25} , marginBottom:5}}></Box>} label="Bâtiment" sx={{color:"white" ,  borderBottom: {lg: "2px #DADADA solid", md: "2px #DADADA solid" , sm: "none" , xs: "none"} , height: {lg: "25%" , md: "25%", sm: "100%" , xs: "100%"} , width: {lg: "auto" , md: "auto" , sm:"25%" , xs: "25%"} , borderRight: {lg: "none" , md: "none" , sm: "2px #DADADA solid" , xs: "2px #DADADA solid"} , fontSize: {xl:"1rem" , lg: "1rem" , md: "1rem" , sm: "0.8rem" , xs: "0.7rem"}}}/>
                <Tab value="restriction" icon={<Box component="img" src={restrictionIcon} alt="restriction" sx={{height: {xl:35 , lg:35 , md: 35 , sm: 35 , xs: 25} , marginBottom:5}}></Box>} label="Restriction" sx={{color:"white" ,  height: {lg: "25%" , md: "25%", sm: "100%" , xs: "100%"} , width: {lg: "auto" , md: "auto" , sm:"25%" , xs: "25%"} , borderRight: {lg: "none" , md: "none" , sm: "2px #DADADA solid" , xs: "2px #DADADA solid"} , fontSize: {xl:"1rem" , lg: "1rem" , md: "1rem" , sm: "0.8rem" , xs: "0.7rem"}}}/>
            </Tabs>
            </Box>
        </Box>
    )
}

export default DetailInfos;