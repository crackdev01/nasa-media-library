import React, { useEffect, useState } from "react";

//React Router
import {
    useLocation,
    useNavigate
} from "react-router-dom";

//Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

//Styles
import {
    BackArrowContainer,
    DetailsCollectionContainer,
    DetailsContainer,
    DetailsData,
    PicturesContainer
} from "./Collection.style";

//MUI Components
import {
    Box,
    Chip
} from "@mui/material";

//Date Format
import { format } from "date-fns";


const Collection = () => {

    const [allPics, setAllPics] = useState<string[]>([])

    const { state } = useLocation();
    const { allData } = state;

    const navigate = useNavigate()

    const fetchPicCollection = () => {
        fetch(allData.href)
            .then((res) => res.json())
            .then((result) => setAllPics(result))
    }

    useEffect(() => {
        fetchPicCollection()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allData])

    return (
        <DetailsCollectionContainer>
            <BackArrowContainer
                onClick={() => navigate(-1)}
            >
                <ArrowBackIcon
                    sx={{
                        background: "#000000",
                        borderRadius: "50%",
                        padding: "5px",
                        color: "#FFFFFF",
                        cursor: "pointer"
                    }}
                    fontSize="medium"
                />
            </BackArrowContainer>
            <DetailsContainer>
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "22px",
                    }}
                >
                    <Box
                        sx={{
                            backgroundImage: `url(${allData.links[0].href})`,
                            width: "300px",
                            height: "200px",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            border: 0,
                            overflow: "hidden"
                        }}
                    >
                    </Box>
                    <DetailsData>
                        <Box
                            sx={{
                                fontSize: "22px",
                                fontWeight: "600"
                            }}
                        >
                            {allData?.data[0].title}
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px"
                            }}
                        >
                            <LocationOnIcon fontSize="small" />
                            {allData?.metaData.length > 0 && allData?.metaData[0]["AVAIL:Location"].length > 0 ? allData?.metaData[0]["AVAIL:Location"] : "No location"}
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px"
                            }}
                        >
                            <AddAPhotoIcon fontSize="small" />
                            {allData?.metaData.length > 0 && allData?.metaData[0]["AVAIL:Photographer"].length > 0 ? allData?.metaData[0]["AVAIL:Photographer"] : "No photographer name"}
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px"
                            }}
                        >
                            <CalendarMonthIcon fontSize="small" />
                            {allData?.data[0].date_created.length > 0 ? format(new Date(allData?.data[0].date_created), "PPP") : "Unknown date"}
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "10px",
                                paddingTop: "10px",
                                width: "100%"
                            }}
                        >
                            {allData.data[0].keywords.map((keyword: string, idx: number) => {
                                return (
                                    <Chip
                                        label={keyword}
                                        variant="outlined"
                                        sx={{
                                            maxWidth: "300px"
                                        }}
                                        key={idx} />
                                )
                            })}
                        </Box>
                    </DetailsData>
                </Box>
                <Box
                    sx={{
                        padding: "22px 0px",
                        fontSize: "14px"
                    }}
                >
                    <Box
                        sx={{
                            fontSize: "18px",
                            fontWeight: "600",
                            paddingBottom: "10px"
                        }}
                    >
                        Description
                    </Box>
                    {allData.data[0].description}
                </Box>
            </DetailsContainer>
            <PicturesContainer>
                <Box
                    sx={{
                        fontSize: "18px",
                        fontWeight: "600",
                        padding: "0px 22px"
                    }}
                >
                    Pictures
                </Box>
                {
                    allPics.filter(pic => pic.includes("~orig")).map((pic, idx) => {
                        return (
                            <Box
                                sx={{
                                    backgroundImage: `url(${pic})`,
                                    height: "300px",
                                    backgroundSize: "contain",
                                    backgroundRepeat: "no-repeat",
                                    border: 0,
                                    overflow: "hidden",
                                    margin: "22px"
                                }}
                                key={idx}
                            >
                            </Box>
                        )
                    })
                }
            </PicturesContainer>
        </DetailsCollectionContainer>
    )
}

export default Collection;