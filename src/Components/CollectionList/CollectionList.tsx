import React, { useEffect, useState } from "react";

//Styles
import { CollectionListContainer } from "./CollectionList.style";

//Models
import {
    ICollection,
    ICollectionWithMetadata
} from "../../Models/models";

//Components
import CollectionCard from "../CollectionCard/CollectionCard";
import { Box, CircularProgress, Pagination } from "@mui/material";

interface CollectionListProps {
    collections: ICollection[];
    total_hits: number;
    setPage: (page: number) => void;
    page: number;
}

const CollectionList = (props: CollectionListProps) => {

    const {
        collections,
        total_hits,
        setPage,
        page
    } = props;

    const [collectionsWithMetadata, setCollectionsWithMetadata] = useState<ICollectionWithMetadata[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getMetadata = (collections: ICollection[]) => {
        try {
            setLoading(true)
            Promise.allSettled(collections.map((el: ICollection) => {
                return fetch(`https://images-assets.nasa.gov/image/${el.data[0].nasa_id}/metadata.json`)
            }))
                .then(responses => {
                    Promise.all(responses.map(res => res.status === "fulfilled" && res.value.status === 200 && res.value.json()))
                        .then((data) => {
                            const collectionsWithMetadata = collections.map(collection => {
                                const metaData = data.filter(el => el["AVAIL:Title"] === collection.data[0].title)
                                return { ...collection, metaData }
                            })
                            setCollectionsWithMetadata(collectionsWithMetadata)
                            setLoading(false)
                        })
                }
                )

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMetadata(collections)
    }, [collections])

    return (
        <CollectionListContainer>
            {!loading ?
                collectionsWithMetadata.length > 0 ?
                    <>
                        {collectionsWithMetadata.map((collection: ICollectionWithMetadata, idx: number) => {
                            return (
                                <CollectionCard
                                    key={idx}
                                    allData={collection}
                                    title={collection.data[0].title}
                                    thumbnail={collection.links[0].href}
                                    location={collection.metaData.length > 0 ? collection.metaData[0]["AVAIL:Location"] : ""}
                                    photographerName={collection.metaData.length > 0 ? collection.metaData[0]["AVAIL:Photographer"] : ""}
                                />
                            )
                        })}
                        {Math.round(total_hits / 100) - 1 > 1 &&
                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Pagination
                                    count={Math.round(total_hits / 100)}
                                    onChange={(e, value) => { setPage(value); setLoading(true) }}
                                    page={page}
                                />
                            </Box>
                        }
                    </>
                    :
                    <div>
                        No results!
                    </div>
                :
                <CircularProgress />
            }
        </CollectionListContainer>
    )
}

export default CollectionList;