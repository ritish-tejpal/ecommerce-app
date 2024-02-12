import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email'; 


const Footer = () => {
    return(
        <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            <Typography variant="body1">
                Connect with us
            </Typography>
            <Box sx={{display: 'flex', flexDirection: 'row', mb: '5px'}}>
                <IconButton color="inherit" >
                    <EmailIcon />
                </IconButton>
            </Box>
        </Box>
    )
}

export default Footer;