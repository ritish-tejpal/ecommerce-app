import { Box } from "@mui/material";
import { styled } from "@mui/system";

const FlexBetween = styled(Box, {
    shouldForwardProp: (prop) => prop !== "flex",
})(({ flex }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flex,
}));


export default FlexBetween;