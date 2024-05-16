function Footer() {

    const currentYear = new Date().getFullYear()
    return(
        <footer style={footerStyle}>
            
        <p>&copy; {currentYear} <a href="https://www.github.com/chingu-voyages/v49-tier3-team-26"> Chingu Voyage V49-tier3-team26.</a> All rights reserved  </p>

            
        </footer>
    )
}

const footerStyle: React.CSSProperties = {
    
    background: '#333',
    color: '#fff',
    padding: '1rem',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    
  };


export default Footer