import styled from "@emotion/styled";

//MUI Components
import {
    Box,
    IconButton
} from "@mui/material";

export const DetailsCollectionContainer = styled(Box)({
})

export const BackArrowContainer = styled(IconButton)({
    margin: "22px",
    padding: 0,
    "&:hover": {
        background: "none"
    }
})

export const DetailsContainer = styled(Box)({
    padding: "22px",
    display: "flex",
    flexDirection: "column",
})

export const DetailsData = styled(Box)({
    display: "flex",
    flexDirection: "column",
    gap: "7px",
})

export const PicturesContainer = styled(Box)({
})