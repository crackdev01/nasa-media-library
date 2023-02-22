export interface IData {
    center: string,
    date_created: string,
    description: string,
    keywords: string[],
    location: string,
    media_type: string,
    nasa_id: string,
    photographer: string,
    title: string
}

export interface ILinks {
    href: string,
    rel: string,
    render: string
}

export interface ICollection {
    data: IData[],
    href: string,
    links: ILinks[],
}

export interface ICollectionWithMetadata {
    data: IData[],
    href: string,
    links: ILinks[],
    metaData: any[]
}