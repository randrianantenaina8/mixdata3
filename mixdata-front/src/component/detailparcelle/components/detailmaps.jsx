import React from "react";
import { useApplication } from "../../../hooks/UseApplication";
import MapsLayout from "../../MapsLayout";
import { detailparcelleStyles } from "./styles";
import { Box , Typography , Table  , TableCell , TableHead , TableBody , TableRow } from "@mui/material";
import { Image } from "react-bootstrap";
import { Form } from "react-bootstrap";

/**** Svgs && icons */
import Surface from '../../../assets/svg/DetailParcelle/Surface.svg'
import Logement from '../../../assets/svg/DetailParcelle/Logement.svg'
import Bat from '../../../assets/svg/DetailParcelle/Bat.svg'
import TimerIcon from '@mui/icons-material/Timer';

const DetailMap = () =>{

    const { details } = useApplication()
    const resumeStyle = {
        maxWidth: {xl:"850px" , lg: "850px" ,  md: "90%" , sm: "90%" , xs: "90%"} ,
        width: "100%",
        borderRadius: "8px",
        position: {xl:"absolute" , lg: "absolute" , md: "inherit"},
        mt: {xl: 0 , lg: 0 , md: "-75px" , xs: "-75px"},
        zIndex:1 ,
        bottom: "-7%",
        ml: {xl:5 , lg:5 , md:"inherit" , sm:"inherit" , xs:"inherit"},
        filter: "drop-shadow(0px 4px 4px rgba(230, 230, 230, 0.25))",
        display: "flex",
        justifyContent: "center",
        background: "white",
        flexWrap: "wrap",
        mx: { md:"auto" , sm:"auto" , xs:"auto"}
    }
    const responsiveMarginLayout = {
        mt: "79px",
        '@media(max-width: 768px)' : {
            mt: "112px"
          }
    }



    return(
        <Box className="col-lg-12 px-4 pb-4" sx={responsiveMarginLayout}>
            <Box sx={{position: "relative", mb:{xl:15 , lg:15 , md:5 , sm:5 , xs:5}}}>
                <Box className="mb-4" style={detailparcelleStyles.mapsLayout}>
                    <MapsLayout    
                        lat={details.geo_center ? details.geo_center.lat : 0}
                        long={details.geo_center ? details.geo_center.lon : 0}
                        name={details.city_name || ''}
                    />
                    {details.city_name}
                </Box>
                <Box className="px-4" sx={resumeStyle}>
                    <Box className="col d-flex justify-content-center flex-wrap  py-4 px-1" sx={{borderRight: "2px solid rgba(217, 217, 217, 0.35)" , borderBottom: {xl: "inherit", lg: "inherit" , md: "inherit", sm: "inherit",  xs: "2px solid rgba(217, 217, 217, 0.35)"}}}>
                        <Box sx={{display: 'flex' , alignItems: 'center'}}>
                            <Image className="fluid " style={detailparcelleStyles.logoWidth} src={Surface}></Image>
                            <p className="w-100 text-center mb-0 fs-5 ms-2" style={{ ...detailparcelleStyles.fontWeightTitle, ...detailparcelleStyles.textBlueLight }}>Surface</p>
                        </Box>
                        <p className="w-100 text-center mb-0" style={detailparcelleStyles.fontWeightTitle}>{details.area} m<sup style={detailparcelleStyles.fontWeightTitle}>2</sup></p>
                    </Box>
                    <Box className="col d-flex justify-content-center flex-wrap  py-4 px-1" sx={{borderRight: {xl: "2px solid rgba(217, 217, 217, 0.35)" , lg: "2px solid rgba(217, 217, 217, 0.35)" , md: "2px solid rgba(217, 217, 217, 0.35)" , sm: "2px solid rgba(217, 217, 217, 0.35)" ,   xs:"inherit"} , borderBottom: {xl: "inherit", lg: "inherit" , md: "inherit", sm: "inherit",  xs: "2px solid rgba(217, 217, 217, 0.35)"}}}>
                        <Box sx={{display: 'flex' , alignItems: 'center'}}>
                            <TimerIcon className="fluid" style={{ ...detailparcelleStyles.logoWidth, fontSize: 30 }} />
                            <p className="w-100 text-center mb-0 fs-5 ms-2" style={{ ...detailparcelleStyles.fontWeightTitle, ...detailparcelleStyles.textBlueLight }}>Années</p>
                        </Box>
                        <p className="w-100 text-center mb-0" style={detailparcelleStyles.fontWeightTitle}>{details.average_building_year}</p>
                    </Box>
                    <Box className="col d-flex justify-content-center flex-wrap  py-4 px-1" sx={{borderRight: "2px solid rgba(217, 217, 217, 0.35)" }}>
                        <Box sx={{display: 'flex' , alignItems: 'center'}}>
                            <Image className="fluid" style={detailparcelleStyles.logoWidth} src={Bat}></Image>
                            <p className="w-100 text-center mb-0 fs-5 ms-2" style={{ ...detailparcelleStyles.fontWeightTitle, ...detailparcelleStyles.textBlueLight }}>Bâtiment(s)</p>
                        </Box>
                        {details.buildings && details.buildings.length && (
                            <p className="w-100 text-center mb-0 ms-2" style={detailparcelleStyles.fontWeightTitle}>
                                {details.buildings.length}
                            </p>
                        )}
                    </Box>
                    <Box className="col d-flex justify-content-center flex-wrap  py-4 px-1">
                        <Box sx={{display: 'flex' , alignItems: 'center'}}>
                            <Image className="fluid" style={detailparcelleStyles.logoWidth} src={Logement}></Image>
                            <p className="w-100 text-center mb-0 fs-5 ms-2" style={{ ...detailparcelleStyles.fontWeightTitle, ...detailparcelleStyles.textBlueLight }}>Logement</p>
                        </Box>
                        <p className="w-100 text-center mb-0" style={detailparcelleStyles.fontWeightTitle}>2</p>
                    </Box>
                </Box>
            </Box>
            <Box sx={{maxWidth: "890px" , width: "100%" , ml:{xl:5 , lg:5 , md:0 , sm:0 , xs:0}}}>
                <Box className="d-flex justify-content-between align-items-center">
                    <Typography variant="h5" component="h5" style={detailparcelleStyles.fontWeightTitle}>Coordonnée du propriétaire principal</Typography>
                </Box>
                <Form.Label style={detailparcelleStyles.fontWeightTitle}>Propriétaires :</Form.Label>
                <Box className="overflow-auto" sx={{mb:3}}>
                    <Table size="small" aria-label="purchases">
                    <TableHead>
                        <TableRow>
                        <TableCell>Nom</TableCell>
                        <TableCell>type</TableCell>
                        <TableCell>Search.ch</TableCell>
                        <TableCell>Local.ch</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{ height: 'inherit' }}>
                    {
                        details && details.owners && details.owners.length > 0 ? (
                            details.owners.map((item) => (
                                <TableRow key={item.name}>
                                    <TableCell component="th" scope="row">
                                        {item.name}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {item.type === "private" ? "privé" : "public"}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <img height="15" width="15" alt="search.ch" src="https://lib.search.ch/favicon.ico?c=3" />
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <img height="20" width="50" alt="local.ch" src="https://www.local.ch/homepage/assets/local-ui/local_logo-73b7898c22130d6735071fcfc5f80316c27ea6bf1475bcb397e95c7611aee979.png" />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4}>Aucun propriétaire trouvé</TableCell>
                            </TableRow>
                        )
                    }

                    </TableBody>
                    </Table>
                </Box>
            </Box>
      </Box>
    )
}

export default DetailMap