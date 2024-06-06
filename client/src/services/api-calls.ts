import { PetProfile } from "../types";

export async function getData():Promise<{ items: PetProfile[] }> {

    try {
        const response = await 
        fetch("https://pawfect-match-api.onrender.com/v1/listings/search?&pageSize=10");
        const animalsForAdoption = await response.json();
        return animalsForAdoption
    }

    catch(err) {
        console.log(err)
        return { items: [] }
    }
}

export async function postData(data :PetProfile):Promise<Response> {
    const response = await fetch("https://pawfect-match-api.onrender.com/v1/listinga", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(data)
    })
    return response
}