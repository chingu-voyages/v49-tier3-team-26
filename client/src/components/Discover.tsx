import {useState, useEffect} from "react"
import PetCard from "./PetCard"
import FilterButton from "./FilterButton"
import styles from "./Discover.module.css"
import Dog from "../assets/dogBtn.svg"
import Cat from "../assets/catBtn.svg"
import Other from "../assets/otherAnimalsBtn.svg"

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

interface filterOptions  {
    pet: string,
    selected: boolean,
    on: boolean,
    includes?: Array<string>,
}

export default function Discover() {
    const animalsArray = [
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

    const [data, setData] = useState(Object)
    const [selectedFilterBtn, setSelectedFilterBtn] = useState<filterOptions[]>(animalsArray)

    useEffect(() => {
        async function getData() {
            const response = await 
            fetch("https://pawfect-match-api.onrender.com/v1/listings/search");
            const animalsForAdoption = await response.json();
            setData(animalsForAdoption);
            
            otherAnimals()
        }
        getData()
        
        function otherAnimals() {
            if (data.items) {

                let petTypes = []
                petTypes = data.items.map((i :PetProfile) => {
                    return i.petType !== "Dog" && 
                    i.petType !== "Cat" ?  
                    i.petType : 
                    null
                })                
                
                setSelectedFilterBtn(prevSelected => { 
                    return prevSelected.map((item) => {
                        if (item.pet === "Other") {
                            return {...item, includes: petTypes}
                        }
                        return item
                    })
                })
            }
        }
        
    }, [])


        function unselectFilterButton() {
            setSelectedFilterBtn(prevSelected => { 
                return prevSelected.map((item) => {
                    return {...item, selected: false, on: true}
                })
            })
        }

        function selectFilterButton(selection :string) {
            setSelectedFilterBtn(prevSelected => { 
                return prevSelected.map((item) => {
                    return item.pet === selection ? 
                    {...item, selected: true, on: true} : 
                    {...item, selected: false, on: false}
                })
            })
        }

        function filteredPetArray(filterState:any){
            const filteredArray = filterState.map((item :filterOptions) => item.on ? item.pet : "")
            //Includes is the property not the method:
            filteredArray[2] = selectedFilterBtn[2].includes
            return filteredArray
        }

        function petCardBuilder(pet :PetProfile) {
            return (
                <PetCard
                    key={pet.id} 
                    name={pet.petName}
                    // photo={pet.petPhoto}
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
                        selected={selectedFilterBtn[0].selected}
                        on={selectedFilterBtn[0].on}
                        handleClick={() => selectFilterButton("Dog")}
                        handleClickWhenSelected={() => unselectFilterButton()}
                        image={Dog}
                    />
                    <FilterButton 
                        key="Cat"
                        id="Cats" 
                        selected={selectedFilterBtn[1].selected}
                        on={selectedFilterBtn[1].on}
                        handleClick={() => selectFilterButton("Cat")}
                        handleClickWhenSelected={() => unselectFilterButton()}
                        image={Cat}
                    />
                    <FilterButton 
                        key="Other"
                        id="Other animals"
                        selected={selectedFilterBtn[2].selected} 
                        on={selectedFilterBtn[2].on}
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
                    if (selectedFilterBtn) {
                      const filteredArray = filteredPetArray(selectedFilterBtn);
                      if ( filteredArray.includes(pet.petType) ) {
                        return petCardBuilder(pet);
                      }
                      else if (filteredArray[2].includes(pet.petType)) {
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