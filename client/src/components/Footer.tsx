export default function Footer() {

    const currentYear = new Date().getFullYear()

    return(
        <footer>
            <p>&copy; {currentYear} 
                <a href="https://www.github.com/chingu-voyages/v49-tier3-team-26">
                    Chingu Voyage V49-tier3-team26.
                </a> 
            All rights reserved  
            </p>
        </footer>
    )
}