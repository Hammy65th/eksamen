import axios from 'axios'
import { useState } from 'react';
// fetch()
// axios

const useRequestData = () => {

    // Loader - venter på svar
    // Success = data
    // Error = 404 not found (No data)

    // usestate - opbevaring af data
    const [isLoading, setIsLoading] = useState(false); // True eller false

    // data
    const [data, setData] = useState(null); // data enten {} eller []

    // error
    const [error, setError] = useState(null); // 
    
    // function: ring op api'et - modtager en url (fx til swapi)
    const makeRequest = async (url, method="GET", headers = null, params = null, body = null) => {

        let response;

        
        setIsLoading(true) // der loades - ventes på data/svar

        // await new Promise( resolve => setTimeout( resolve, 3000 ) ) // 3 sekunder forsinkelse

        try {
            if (method === "GET") {
                
                response = await axios.get( url, {headers: headers, params: params} )
            } 
            else if (method === "DELETE") {
                // Delete har ofte ikke noget response-data (204)
                response = await axios.delete( url, {headers: headers, params: params} )

                if ( response.status === 204 ) {
                    // Hvis 204 No content, betder det succes, men uden body
                    setData( { success:true, message: "Der er blevet slettet" } )
                    setError( false )
                    return // returner her for at stoppe vidre behandling
                }

            } 
            else if (method === "POST") {
                // Post skal have data/body med = det nye der skal oprettes
                response = await axios.post( url,body, {headers: headers, params: params} )

            }
            else if (method === "PUT") {
                // Post skal have data/body med = det der skal rettes
                response = await axios.put( url,body, {headers: headers, params: params} )

            } 
            else if (method === "PATCH") {
                // Post skal have data/body med = det der skal rettes
                response = await axios.patch( url,body, {headers: headers, params: params} )

            }  
            else {
                throw new Error("Forkert Metode - vælg GET POST PUT PATCH eller DELETE");
            }
            
            setData(response.data)
            setError(false)

        } catch (error) {

            setError(true)
            setData(null)
            console.log( error)

        } finally {

            setIsLoading(false)
        }

    }

    return {makeRequest, isLoading, data, error}


}

export default useRequestData;

//* Custom hook der håndterer API-kald med axios (genbrugelig i hele appen).

//* State styrer isLoading, data og error for at vise status i UI’et.

//* makeRequest laver asynkrone kald med flere HTTP-metoder (GET, POST, PUT, PATCH, DELETE).

//* Fejl- og status-håndtering sikrer korrekt feedback og stabilitet.

//* Returnerer { makeRequest, isLoading, data, error } for nem brug i komponenter.