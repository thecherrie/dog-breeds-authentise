import React, { useEffect } from 'react'
import './list_item.css'
import { AiFillHeart, AiFillDelete } from 'react-icons/ai'

export default function ListItem({ leading, trailing, liked, addNewFavouriteBreed, collections, removeFavouriteBreed }) {

    useEffect(() => {
        console.log(collections)
    }, [liked])

    return (
        <div className="listItem">
            <h2>{leading}</h2>
            {collections.includes(leading) ? < AiFillDelete size={30} onClick={() => removeFavouriteBreed(leading)} color={"#ff3333"} /> : 
            <AiFillHeart onClick={() => addNewFavouriteBreed(leading)}
                size={30} color={"#ff3333"} />}
        </div>
    )
}
