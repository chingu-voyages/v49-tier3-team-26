import dog from "../assets/dog.png";
import cat from "../assets/cat.png";
import paw from "../assets/favourite-paw.svg";
import locationPin from "../assets/location-pin.svg"
import styles from "./PetCard.module.css";

interface CardItems {
    name: string; 
    tags: string;
    location: string; 
    breed: string;
    type: string; 
    age: number;
    photo: string;
}

export default function PetCard( {name, tags, location, type, age, photo} :CardItems ) {
    
    return (
        <div className={styles.card}>
            <div className={styles.img}>
                {photo.includes('https://example.com/photos/') ? 
                    <img
                    src={type === "Dog" ? dog : cat} 
                    alt="animal for adoption" 
                    /> : 
                    <img 
                    className={styles.photo}
                    src={photo} alt={`Picture of ${name}`} 
                    /> 
                }
            </div>
            <div className={styles.desc}>
                <div className={styles.tags}>
                    {tags && 
                        tags.split(',').map((tag, index) => (
                            <div key={index} className={styles.tag}>
                                {tag}
                            </div>
                        ))
                    }
                </div>
                <div className={styles.focus}>
                    <p>{name}</p>
                    <span>●</span>
                    <p>{age} year(s) old</p>
                </div>
                <div className={styles.location}>
                    <img className={styles.locationPin} src={locationPin} alt="location pin" />
                    <p>{location}</p>
                </div>
                
            </div>
        </div>
    )
} 