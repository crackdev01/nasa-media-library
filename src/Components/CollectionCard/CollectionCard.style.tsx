import styled from "@emotion/styled";

//MUI Components
import { Box } from "@mui/material";

export const CardContainer = styled(Box)({
    display: "flex",
    flexDirection: "column",
    width: "350px",
    height: "300px",
    marginBottom: "10px",
    border: "1px solid #D7D7D7",
    borderRadius: "12px",
    "&:hover": {
        scale: "1.05"
    },
    cursor: "pointer",
    transition: "all 1s"

})

export const DetailsContainer = styled(Box)({
    display: "flex",
    flexDirection: "column",
    height: "80px",
    padding: "12px",
    gap: "2px",
    fontSize: "12px"
})