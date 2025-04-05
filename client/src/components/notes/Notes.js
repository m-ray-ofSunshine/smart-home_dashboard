import { useEffect, useState } from 'react'
import "./Notes.css"
function Notes() {

    const api_key = process.env.REACT_APP_AWS_API_KEY
    const api_url = process.env.REACT_APP_AWS_API_URL

    const [notesData, setNotesData] = useState();

    useEffect(() => {

        const getNotesData = async () => {
            const options = {
                "method": 'GET',
                "headers": {
                    'Content-Type': 'application/json',
                    'x-api-key': api_key
                }
            };
            return await fetch(`${api_url}/notes`, options)
                .then(res => res.json())
                .catch(error => {
                    console.log("ERROR-------------", error);
                });
        };

        if (!notesData) {
            getNotesData()
                .then(data => {
                    setNotesData(data)
                    
                });
            }
        }, [notesData, api_key, api_url]);
        
        
        const columnLimit = 6;
    const columns = [];
    if (notesData) {
        for (let i = 0; i < notesData.length; i += columnLimit) {
            columns.push(notesData.slice(i, i + columnLimit));
        }
    }

    return (
        <div className="notes-wrapper notes-container" >
            <h1 className="notes-title" >Notes for everyone</h1>
            <div className="notes-columns-container" >
                {columns.map((column, colIndex) => (
                    <div key={colIndex} className="notes-column" >
                        {column.map((item, index) => (
                            <div key={index} className="notes-list-item" >
                                {item.name}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Notes;