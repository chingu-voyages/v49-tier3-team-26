import {useState, useEffect} from "react"
import PetCard from "./PetCard"
import FilterButton from "./FilterButton"
import styles from "./Discover.module.css"
import Dog from "../assets/dogBtn.svg"
import Cat from "../assets/catBtn.svg"
import Other from "../assets/otherAnimalsBtn.svg"

export interface PetProfile {
    id: string;
    petName: string;
    petPhoto: string;
    petType: string;
    petBreed: string;
    petAge: number;
    location: string;
    description: string;
    tags: string;
    creationTimestamp?: string;
    lastUpdateTimestamp?: string;
    published: boolean;
    userId: string;
  }

interface filterOptions  {
    pet: string,
    selected: boolean,
    on: boolean,
    otherTypes?: string[],
}

export default function Discover() {
    const animalsArray :filterOptions[] = [
        {
        pet: "Dog",
        selected: false,
        on: true
        },
        {
        pet: "Cat",
        selected: false,
        on: true
        },
        {
        pet: "Other",
        selected: false,
        on: true,
        }
    ]
    let filteredPetArray = []
    const [data, setData] = useState<{ items: PetProfile[] }>({ items: [] });
    const [filterBtn, setFilterBtn] = useState<filterOptions[]>(animalsArray);

    useEffect(() => {
        async function getData() {
            const response = await 
            fetch("https://pawfect-match-api.onrender.com/v1/listings/search?&pageSize=10");
            // "https://pawfect-match-api.onrender.com/v1/listings/search"
            const animalsForAdoption = await response.json();
            setData(animalsForAdoption);
            
            updateOtherAnimals(animalsForAdoption.items)
            
        }
        getData()

        
    }, [])

        useEffect(() => {
            createFilteredPetArray(filterBtn);
        }, [filterBtn, data]);
                
        function updateOtherAnimals(items: PetProfile[]) {

            let petTypes: string[] = []
            petTypes = items.map((i) => {
                    return i.petType !== "Dog" &&
                        i.petType !== "Cat" ?
                        i.petType :
                        null
                }).filter(Boolean) as string[]; // Ensure petTypes is a string array;
            
            setFilterBtn((prevSelected) => { 
                return prevSelected.map((item) => {
                    if (item.pet === "Other") {
                        return {...item, otherTypes: petTypes};
                    }
                    return item;
                });
            });
                
            
        }

        function unselectFilterButton() {
            setFilterBtn(prevSelected => { 
                return prevSelected.map((item) => {
                    return {...item, selected: false, on: true}
                })
            })
        }

        function selectFilterButton(selection :string) {
            setFilterBtn(prevSelected => { 
                return prevSelected.map((item) => {
                    return item.pet === selection ? 
                    {...item, selected: true, on: true} : 
                    {...item, selected: false, on: false}
                })
            })
        }

        function createFilteredPetArray(filterState :filterOptions[]): (string | undefined)[] {
            
            filteredPetArray = filterState.map((item :any) => item.on ? item.pet : "")
            filteredPetArray[2] = filterBtn[2].otherTypes            
            return filteredPetArray
        }

        function petCardBuilder(pet :PetProfile) {
            return (
                <PetCard
                    key={pet.id} 
                    name={pet.petName}
                    photo={pet.petPhoto}
                    tags={pet.tags} 
                    breed={pet.petBreed}
                    location={pet.location}
                    type={pet.petType}
                    age={pet.petAge}
                />)
        }
        

    return (
        <>  
            <div className={styles.filterSection}>
                <h2 className={styles.sectionTitle}>
                    Find your new best friend
                </h2>
                <p className={styles.sectionDesc}>
                Animals are reliable. 
                Many full of love, true in their affections, 
                predictable in their actions grateful and loyal!
                </p>
                <div className={styles.filterBtnsContainer}>
                    <FilterButton 
                        key="Dog"
                        id="Dogs"
                        selected={filterBtn[0].selected}
                        on={filterBtn[0].on}
                        handleClick={() => selectFilterButton("Dog")}
                        handleClickWhenSelected={() => unselectFilterButton()}
                        image={Dog}
                    />
                    <FilterButton 
                        key="Cat"
                        id="Cats" 
                        selected={filterBtn[1].selected}
                        on={filterBtn[1].on}
                        handleClick={() => selectFilterButton("Cat")}
                        handleClickWhenSelected={() => unselectFilterButton()}
                        image={Cat}
                    />
                    <FilterButton 
                        key="Other"
                        id="Other animals"
                        selected={filterBtn[2].selected} 
                        on={filterBtn[2].on}
                        handleClick={() => selectFilterButton("Other")}
                        handleClickWhenSelected={() => unselectFilterButton()}
                        image={Other}
                    />                    
                </div>
            </div>
            <div>
                <h3 className={styles.listingsTitle}>
                    Pets available for adoption
                </h3>
            </div>
            <div className={styles.cardsContainer}>
                {data.items ? 
                data.items.map((pet: PetProfile) => {
                    if (filterBtn) {
                      const filteredArray = createFilteredPetArray(filterBtn);
                      
                      if ( filteredArray.includes(pet.petType) ) {
                        return petCardBuilder(pet);
                      }
                      // IF there are other animals in the animals array than cats and dogs
                      // AND cat or dog buttons are NOT selected, THEN show it.
                      else if (filteredArray[2]?.includes(pet.petType) &&
                      !filterBtn[0].selected && !filterBtn[1].selected) {
                        return petCardBuilder(pet);
                      }
                    } 
                    return null;
                  })
                : ""}
            </div>
        </>
    )
}