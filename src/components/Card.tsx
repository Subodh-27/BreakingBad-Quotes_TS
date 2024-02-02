import { useEffect, useState } from "react";

import "./Card.css";

interface QuoteTypes {
    quote: string;
    author: string;
}

const Card = () => {
    
    const [randomQuote, setRandomQuote] = useState<QuoteTypes[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchQuotes()
    }, [])

    const fetchQuotes = async() => {
        try {
            const response = await fetch("https://api.breakingbadquotes.xyz/v1/quotes")
            const quotes = await response.json();
            setRandomQuote(quotes)
            setLoading(true)
        } catch {
            console.error("Something went Wrong");
        }
    }

    return (
        <>
            <div className="container">
                {
                    !loading 
                    ? ( <div className="loading-spinner"></div> ) 
                    : <h2>Breaking Bad Quotes</h2>
                }

                {
                    randomQuote.map((quote, index) => (
                        <span key={index}>
                            <p>{ quote.quote }</p>
                            <h4>- { quote.author }</h4>
                        </span>
                    ))
                }
            </div>

            <button onClick={() => window.location.reload() }>Next</button>
        </>
    )
}

export default Card;