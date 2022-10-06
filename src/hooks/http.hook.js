import { useState, useCallback} from "react";

export const useHttp = () =>{
	const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

	const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) =>{
		
		setLoading(true);

		try{
			const respons = await fetch(url, {method, body, headers});
			if(!respons.ok){
				throw new Error(`Cloud not fetch ${url}, status: ${respons.status}`);
			}
			const data = await respons.json();
			setLoading(false);
			return data;
		}catch(e){
			setLoading(false);
			setError(e.massage);
			throw e;
		}
	}, []);
	
	const clearError = useCallback(() => setError(null), []);
	return {loading, request, error, clearError}
}