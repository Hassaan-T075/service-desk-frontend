import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null)

    useEffect(() => {
        const abortCont = new AbortController();
        const token = localStorage.getItem("token");

        fetch(url, {
            signal: abortCont.signal,
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(res => {
            if (!res.ok) {
                throw Error('could not fetch data')
            }
            return res.json();
        })
            .then(data => {
                setIsPending(false)
                console.log(data)
                setData(data)
                setError(null)
            })
            .catch(err => {
                if (err.name === 'AbortError') { // if error is abort error
                    console.log('fetch aborted')
                }
                else { // if error is network / connection error
                    setError(err.message)
                    setIsPending(false)
                }
            })
        return () => abortCont.abort() //to counter react state update on un-mounted component, abort controller is used 
    }, [url])

    return { data, isPending, error }
}

export default useFetch