import React from 'react'
import './card.styles.css'

export default function Card({text, image}) {

    function capitaliseFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    return (
        <div className="card">
            <img src={image} />
            <h2>{capitaliseFirstLetter(text)}</h2>
        </div>
    )
}
