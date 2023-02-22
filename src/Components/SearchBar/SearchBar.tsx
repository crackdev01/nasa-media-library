import React, { useState } from "react";

//Styles
import {
    FiltersContainer,
    FiltersInput,
    InputContainer,
    SearchButton,
    SearchContainer,
    SearchInput
} from "./SearchBar.style";

interface SearchBarProps {
    searchText: string,
    setSearchText: (searchText: string) => void,
    onSearch: (searchText: string) => void,
    setYearStart: (yearStart: string) => void,
    setYearEnd: (yearEnd: string) => void,
    yearStart: string,
    yearEnd: string,
}

const SearchBar = (props: SearchBarProps) => {

    const { searchText, setSearchText, onSearch, setYearStart, setYearEnd, yearStart, yearEnd } = props;

    const [validateYearStart, setValidateYearStart] = useState<boolean>(false)
    const [validateYearEnd, setValidateYearEnd] = useState<boolean>(false)

    const validateInput = () => {
        if (yearStart.length === 4 || yearStart.length === 0) {
            setValidateYearStart(false)
        } else {
            setValidateYearStart(true)
        }
        if (yearEnd.length === 4 || yearEnd.length === 0) {
            setValidateYearEnd(false)
        } else {
            setValidateYearEnd(true)
        }

        if ((yearStart.length === 4 || yearStart.length === 0) && (yearEnd.length === 4 || yearEnd.length === 0))
            return true

        return false
    }

    const onSubmit = () => {
        const proceedFetch = validateInput()
        if (proceedFetch)
            onSearch(searchText)
    }

    return (
        <SearchContainer>
            <InputContainer>
                <SearchInput
                    label="Search in library"
                    variant="outlined"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
                    value={searchText}
                />
                <SearchButton
                    variant="contained"
                    onClick={onSubmit}
                >
                    Search
                </SearchButton>
            </InputContainer>
            <FiltersContainer>
                <FiltersInput
                    label="Year Start"
                    variant="outlined"
                    onChange={(e) => setYearStart(e.target.value)}
                    value={yearStart}
                    type="number"
                    error={validateYearStart}
                    helperText={validateYearStart ? "Format: YYYY" : ""}
                    size="small"
                />
                <FiltersInput
                    label="Year End"
                    variant="outlined"
                    onChange={(e) => setYearEnd(e.target.value)}
                    value={yearEnd}
                    type="number"
                    error={validateYearEnd}
                    helperText={validateYearEnd ? "Format: YYYY" : ""}
                    size="small"
                />
            </FiltersContainer>
        </SearchContainer>
    )
}

export default SearchBar;