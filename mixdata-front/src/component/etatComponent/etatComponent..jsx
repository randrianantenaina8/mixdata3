import React from "react";
import { Box , Typography } from "@mui/material";

const Etat = ({type , mLeft , wdt}) => {
    return(
        <Box className="excludeStyles" sx={{display: 'flex' , alignItems: 'center' , marginLeft: mLeft , width:wdt}}>
            <Box sx={type === 'En négociation' || 'En cours'   ? {background: '#88b790' , width:'7px!important' , height: '7px' , borderRadius: '100%' , marginRight: '5px!important'} : {background: '#e31414' , width:'7px!important' , height: '7px' , borderRadius: '100%' , marginRight: '5px!important'}}></Box>
            <Typography>{type}</Typography>
        </Box>
    )
}
export default Etat