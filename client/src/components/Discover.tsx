import React from "react"
import PetCard from "./PetCard"
import styles from "./Discover.module.css"

interface PetProfile {
    id: string;
    petName: string;
    petPhoto: string;
    petType: string;
    petBreed: string;
    petAge: number;
    location: string;
    description: string;
    tags: string;
    creationTimestamp: string;
    lastUpdateTimestamp: string;
    published: boolean;
    userId: string;
  }
export default function Discover() {
    const [data, setData] = React.useState(Object)

    React.useEffect(() => {
        async function getData() {
            const response = await fetch("https://pawfect-match-api.onrender.com/v1/listings/search");
            const animalsForAdoption = await response.json();
            console.log(animalsForAdoption.items[0].petName)
            setData(animalsForAdoption);
        }
        getData()
    }, [])
    return (
        <>  
            <div className={styles.title}>
                <h2>Pets available for adoption</h2>
            </div>
            <div className={styles.cardsContainer}>
                {data.items ? 
                data.items.map(( pet :PetProfile ) => {
                return (<PetCard
                    key={pet.id} 
                    name={pet.petName}
                    // photo={pet.petPhoto}
                    tags={pet.tags} 
                    breed={pet.petBreed}
                    location={pet.location}
                    type={pet.petType}
                    age={pet.petAge}
                />)
                }) :
                 ""}
            </div>
            {/* <h1>{data.items[0].petName}</h1>
            <h1>{data.items[1].petName}</h1>
            <h1>{data.items[2].petName}</h1> */}
            
        </>
    )
}