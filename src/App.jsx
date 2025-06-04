import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTumblr, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

function App() {
    const [color, setColor] = useState("#16a085");
    const [quotesList, setQuotesList] = useState([]);
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");

    function getRandomColor() {
        const colors = [
            "#16a085",
            "#27ae60",
            "#2c3e50",
            "#f39c12",
            "#e74c3c",
            "#9b59b6",
            "#FB6964",
            "#342224",
            "#472E32",
            "#BDBB99",
            "#77B1A9",
            "#73A857",
        ];
        let number = Math.floor(Math.random() * colors.length);
        setColor(colors[number]);
    }

    function getRandomQuote(quotes) {
        let number = Math.floor(Math.random() * quotes.length);

        setQuote(quotes[number].quote);
        setAuthor(quotes[number].author);
        getRandomColor();
    }

    useEffect(() => {
        async function getQuotes() {
            try {
                const response = await fetch(
                    "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
                );
                const data = await response.json();
                setQuotesList(data.quotes);
                getRandomQuote(data.quotes);
            } catch (error) {
                console.error(error);
            }
        }
        getQuotes();
    }, []);

    return (
        <main
            className="min-h-screen flex flex-col gap-4 items-center justify-center duration-300"
            style={{ backgroundColor: color }}
        >
            <section className="w-full max-w-xl bg-white p-8 md:p-14 rounded-md">
                <div
                    id="quote-box"
                    className="flex flex-col gap-4 text-2xl md:text-3xl font-semibold text-center"
                    style={{ color: color }}
                >

                    <blockquote
                        id="text"
                        className="text-center text-2xl md:text-3xl font-semibold leading-relaxed"
                    >
                        <span className="inline-block mr-2">
                            <FontAwesomeIcon icon={faQuoteLeft} />
                        </span>
                        {quote || "Loading..."}
                    </blockquote>
                    <p id="author" className="text-right text-lg">
                        - {author || "Unknown"}
                    </p>

                    <div id="sher" className="flex">
                        <div className="w-1/2 flex gap-2">
                            <a
                                id="tweet-quote"
                                href={`https://x.com/intent/post?hashtags=quotes&text=${quote}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                role="button"
                            >
                                <button
                                    className="text-white text-2xl py-2 px-4 cursor-pointer rounded-md duration-300 hover:opacity-90"
                                    style={{ backgroundColor: color }}
                                    aria-label="Share on Twitter"
                                >
                                    <FontAwesomeIcon icon={faTwitter} />
                                </button>
                            </a>
                            <a
                                id="tumblr-quote"
                                href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=Quote&content=${encodeURIComponent(
                                    quote
                                )}&canonicalUrl=https://www.tumblr.com/buttons&shareSource=tumblr_share_button`}
                                target="_blank"
                                rel="noopener noreferrer"
                                role="button"
                            >
                                <button
                                    className="text-white text-2xl py-2 px-4 cursor-pointer rounded-md duration-300 hover:opacity-90"
                                    style={{ backgroundColor: color }}
                                    aria-label="Share on Tumblr"
                                >
                                    <FontAwesomeIcon icon={faTumblr} />
                                </button>
                            </a>
                        </div>
                        <div className="w-1/2 flex justify-end">
                            <button
                                id="new-quote"
                                className="text-white text-base py-2 px-4 cursor-pointer rounded-md duration-300 hover:opacity-90"
                                style={{ backgroundColor: color }}
                                onClick={() => getRandomQuote(quotesList)}
                                aria-label="New quote"
                            >
                                New quote
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <p className="text-white text-lg font-bold">by wolf-root</p>
        </main>
    );
}

export default App;
