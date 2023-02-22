import styled from "@emotion/styled";
import { Box, Button, TextField } from "@mui/material";

export const SearchContainer = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: "35px",
    padding: "22px"
})

export const SearchInput = styled(TextField)({
    width: "30%",
    minWidth: "200px",
})

export const SearchButton = styled(Button)({
    height: "55px"
})

export const InputContainer = styled(Box)({
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "35px",
})

export const FiltersContainer = styled(Box)({
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "35px",
})

export const FiltersInput = styled(TextField)({
    width: "120px",
    height: "100px"
})