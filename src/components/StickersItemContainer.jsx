import { NoSearchRosultFound } from "./NoSearchRosultFound";
import { AddToFavorite, CopyToClipBoardButton } from './';
import { useAllFavorites, useGetItemById, useGetResposeBySearchTerm } from "../hooks";
import { useNavigate } from "react-router-dom";
import { ImageList, ImageListItem } from "@mui/material";



export const StickersItemContainer = () => {
    const { searchTerm } = useGetResposeBySearchTerm();
    const { stickersProccessed } = useAllFavorites();
    const { startShowingitem } = useGetItemById();
    const navigate = useNavigate();
    
    
    return (
        <>
        {(stickersProccessed.length>0)
                ?
                <ImageList variant="masonry" cols={4} gap={16} sx={{ pt:8, width:'98%'}}>
                    {stickersProccessed.map(sticker => (
                        <ImageListItem key={sticker.id}>
                            <div>
                                <img
                                    src={`${sticker.url}?w=248&fit=crop&auto=format`}
                                    alt={sticker.title}
                                    loading="lazy"
                                    onClick={() => {               
                                        startShowingitem({ id:sticker.id, name: sticker.title, user:sticker.user })
                                        navigate(`${sticker.slug}`);
                                    }}
                                    style={{
                                        cursor: 'pointer',
                                        borderBottomLeftRadius: 4,
                                        borderBottomRightRadius: 4,
                                        borderTopLeftRadius: 4,
                                        borderTopRightRadius: 4,
                                        display: 'block',
                                        height: '100%',
                                        width: '100%',
                                        backgroundColor:'gray'
                                        
                                    }}
                                />
                                <div className='absolute top-0 right-2 p-1 flex'>
                                    <CopyToClipBoardButton itemData={ sticker }/>
                                    <AddToFavorite itemData={{ item: sticker, size: 1.1}}/>
                                </div>
                            </div>
                        </ImageListItem>
                    ))}
                </ImageList>     
                :< NoSearchRosultFound searchTerm={searchTerm} />
        }
    </>
    )
}