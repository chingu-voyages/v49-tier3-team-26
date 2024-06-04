import { useState, } from "react"
import { PetProfile } from "./Discover"

export default function Discover() {
    const [formData, setFormData] = useState<PetProfile>(
        {
        id: "",
        petName: "",
        petPhoto: "",
        petType: "",
        petBreed: "",
        petAge: 0,
        location: "",
        description: "",
        tags: "",
        userId: "",
        published: false,
      }
    )

    function handleChange(event :any) {
        setFormData( (prevFormData :PetProfile) => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.type === 'checkbox' ? 
                event.target.checked : 
                event.target.value
            }
        })
    }

    // Ensuring petAge gets passed as a number to the API
    const dataToSend = {
        ...formData,
        petAge: typeof formData.petAge !== "number" ? 
        parseInt(formData.petAge, 10) : formData.petAge
      };

    async function postListing() {
        const response = await fetch("https://pawfect-match-api.onrender.com/v1/listing", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSend)
        })

        if(!response.ok) {
            console.error('Failed to post data', response.statusText);
            return;
        }

        const result = await response.json();
        console.log("Data posted succesfully", result)
        }   

    return (
        <>
            <h2>New Listing</h2>
            <form onSubmit={e => {e.preventDefault()}}>
                <label>
                ID
                <input 
                    type="text"
                    placeholder="ID"
                    onChange={event => handleChange(event)}
                    name="id"
                    value={formData.id}
                    />
                </label>
                <label>
                    Pet Name
                    <input 
                        type="text"
                        placeholder="Pet Name"
                        onChange={event => handleChange(event)}
                        name="petName"
                        value={formData.petName}
                    />
                </label>
                <label>
                    Pet Photo
                    <input 
                        type="text"
                        placeholder="Pet Photo"
                        onChange={event => handleChange(event)}
                        name="petPhoto"
                        value={formData.petPhoto}
                    />
                </label>
                <label>
                    Pet Type
                    <input 
                        type="text"
                        placeholder="Pet Type"
                        onChange={event => handleChange(event)}
                        name="petType"
                        value={formData.petType}
                    />
                </label>
                <label>
                    Pet Breed
                    <input 
                        type="text"
                        placeholder="Pet Breed"
                        onChange={event => handleChange(event)}
                        name="petBreed"
                        value={formData.petBreed}
                    />
                </label>
                <label>
                    Pet Age
                    <input 
                        type="number"
                        placeholder="Pet Age"
                        onChange={event => handleChange(event)}
                        name="petAge"
                        value={formData.petAge}
                    />
                </label>
                <label>
                    Location
                    <input 
                        type="text"
                        placeholder="Location"
                        onChange={event => handleChange(event)}
                        name="location"
                        value={formData.location}
                    />
                </label>
                <label>
                    Description
                    <input 
                        type="text"
                        placeholder="Description"
                        onChange={event => handleChange(event)}
                        name="description"
                        value={formData.description}
                    />
                </label>
                <label>
                    Tags
                    <input 
                        type="text"
                        placeholder="Tags"
                        onChange={event => handleChange(event)}
                        name="tags"
                        value={formData.tags}
                    />
                </label>
                <label>
                    Published
                    <input 
                        type="checkbox"
                        placeholder="Published"
                        onChange={event => handleChange(event)}
                        name="isPublished"
                        checked={formData.published}
                    />
                </label>
                <label>
                    User ID
                    <input 
                        type="text"
                        placeholder="User ID"
                        onChange={event => handleChange(event)}
                        name="userId"
                    />
                </label>
                <button 
                    type="button" 
                    onClick={() => postListing()}
                    >Create new listing
                </button>
            </form>
        </>
    )
}