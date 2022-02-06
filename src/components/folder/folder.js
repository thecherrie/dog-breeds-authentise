import React, { useEffect, useState } from 'react'
import './folder.styles.css'
import { AiFillFolderAdd } from 'react-icons/ai'
import FloatingActionButton from '../floating_action_button/fab';
import Btn from '../button/button';
import Card from '../card/card';

export default function Folder({ text, favouriteBreeds, addNewFavouriteBreed, amtOfItems,  }) {

    function capitaliseFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const [viewing, setViewing] = useState(false)
    const [filteredBreeds, setFilteredBreeds] = useState([])

    useEffect(() => {
        setFilteredBreeds(favouriteBreeds.filter(breed => {
            return breed.breedName == text
        }))
    }, [favouriteBreeds])

    return (
        <>
            <div onClick={() => setViewing(!viewing)} className="folderViewOverlay" style={viewing ? { display: "block", position: "fixed" } : { display: "none" }}>
            </div>
            <div className="folderViewer" style={viewing ? { display: "block", position: "absolute" } : { display: "none" }}>
                <h1>{capitaliseFirstLetter(text)}</h1>
                <div className="folderPhotoContainer">
                    {
                        filteredBreeds.map(breed => (
                            <Card text="" image={breed.image} />
                        ))
                    }
                </div>
                <Btn onClick={() => addNewFavouriteBreed(text)} style={{ position: "absolute", bottom: 20 }} text={`Add new ${capitaliseFirstLetter(text)}`} />
            </div>
            <div onClick={() => setViewing(!viewing)} className="folder">
                <div>
                    <h2>{capitaliseFirstLetter(text)}</h2>
                    <p style={{ margin: 0, color: "black", opacity: 0.3 }}>{amtOfItems} items</p>
                </div>
                <AiFillFolderAdd size={30} />
            </div>
        </>
    )
}
