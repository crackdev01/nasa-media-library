import React from "react"

// Styles
import {
    CardContainer,
    DetailsContainer
} from "./CollectionCard.style";

//Icons
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

//Models
import { ICollectionWithMetadata } from "../../Models/models";

//MUI Components
import { Box } from "@mui/material";

//React Router
import { useNavigate } from "react-router-dom";

interface CollectionCardProps {
    title: string,
    thumbnail: string,
    location: string,
    photographerName: string,
    allData: ICollectionWithMetadata,
}

const CollectionCard = (props: CollectionCardProps) => {

    const {
        title,
        thumbnail,
        location,
        photographerName,
        allData
    } = props;

    const navigate = useNavigate();

    return (
        <CardContainer
            onClick={() => navigate(`/${allData.data[0].nasa_id}`, { state: { allData } })}
        >
            <Box
                sx={{
                    backgroundImage: `url(${thumbnail})`,
                    width: "100%",
                    height: "60%",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    borderRadius: "10px 10px 0px 0px",
                    border: 0,
                    overflow: "hidden"
                }}
            >
            </Box>
            <DetailsContainer>
                <Box
                    sx={{
                        fontSize: "14px",
                        fontWeight: "600",
                        whiteSpace: title.length > 100 ? "nowrap" : "initial",
                        overflow: title.length > 100 ? "hidden" : "initial",
                        textOverflow: "ellipsis",
                    }}
                >
                    {title}
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px"
                    }}
                >
                    <LocationOnIcon fontSize="small" />
                    {location.length > 0 ? location : "No location"}
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px"
                    }}
                >
                    <AddAPhotoIcon fontSize="small" />
                    {photographerName.length > 0 ? photographerName : "No photographer name"}
                </Box>
            </DetailsContainer>
        </CardContainer>
    )
}

export default CollectionCard;