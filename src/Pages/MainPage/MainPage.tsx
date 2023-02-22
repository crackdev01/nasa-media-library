import React, { useEffect, useState } from "react";

//Styles
import {
    MainPageContainer,
    Title,
    TitleContainer
} from "./MainPage.style";

//Components
import SearchBar from "../../Components/SearchBar/SearchBar";
import CollectionList from "../../Components/CollectionList/CollectionList";

//SVGs
import { NasaLogo } from "../../Assets/svg/NasaLogo";


const MainPage = () => {

    const [searchText, setSearchText] = useState<string>(window.localStorage.getItem('searchText') || "")
    const [yearStart, setYearStart] = useState<string>("")
    const [yearEnd, setYearEnd] = useState<string>("")
    const [collections, setCollections] = useState<any>([])
    const [page, setPage] = useState<number>(1)

    const fetchData = (searchString: string) => {
        try {
            fetch(`https://images-api.nasa.gov/search?q=${searchString}&media_type=image&page=${page}${yearStart.length > 0 ? `&year_start=${yearStart}` : ""}${yearEnd.length > 0 ? `&year_end=${yearEnd}` : ""}`)
                .then((res) => res.json())
                .then((res) => setCollections(res.collection))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setSearchText(window.localStorage.getItem('searchText') || "");
    }, []);

    useEffect(() => {
        fetchData(searchText)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    useEffect(() => {
        window.localStorage.setItem('searchText', searchText);
    }, [searchText]);

    return (
        <MainPageContainer>
            <TitleContainer>
                <Title>
                    Nasa Library
                </Title>
                <NasaLogo />
            </TitleContainer>
            <SearchBar
                searchText={searchText}
                setSearchText={setSearchText}
                onSearch={fetchData}
                setYearStart={setYearStart}
                setYearEnd={setYearEnd}
                yearStart={yearStart}
                yearEnd={yearEnd}
            />
            <CollectionList
                collections={collections?.items || []}
                total_hits={collections.metadata?.total_hits}
                setPage={setPage}
                page={page}
            />
        </MainPageContainer>
    )
}

export default MainPage;