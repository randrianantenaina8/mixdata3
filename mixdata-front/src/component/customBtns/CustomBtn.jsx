import React from 'react';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import { Box } from '@mui/material';

const CustomBtn = ({ label , bgColor , iconBg , icon , mR , mL , click }) => {
    return (
        <Box sx={{marginRight: mR , marginLeft: mL}} onClick={click}>
        <Chip 
            sx={{ background: bgColor, color: "#fff", fontSize: "15px" , cursor: "pointer" , boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25);' }} 
            label={label} 
            avatar={<Avatar sx={{ background: iconBg }}><span style={{ color: "#fff", fontSize: "25px" }}>{icon}</span></Avatar>}
            clickable 
        />
        </Box>
    );
}

export default CustomBtn;




