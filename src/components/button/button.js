import React from 'react'
import './button.styles.css'

export default function Btn({onClick, text, style}) {
    return (
        <button onClick={onClick} style={style} className="btn">{text}</button>
    )
}
