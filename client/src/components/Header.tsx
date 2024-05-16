import React from "react"

function Header() {
    return(
        <header style={headerStyle}>
            <h1>Chingu voyage V49 Tier 3 Team 26</h1>
        </header >
    )

   
}
const headerStyle: React.CSSProperties = {
        display: 'flex',
        position: 'absolute',
        top: 0,
        width: '100%',
}
export default Header