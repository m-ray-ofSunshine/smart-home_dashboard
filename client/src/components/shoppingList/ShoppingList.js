import { useEffect, useState } from 'react'
import "./ShoppingList.css"

function ShoppingList() {
    const api_key = process.env.REACT_APP_TODO_LIST_API_KEY
    const todo_list_api_url = process.env.REACT_APP_TODO_LIST_URL

    const [todoListData, setTodoListData] = useState();

    useEffect(() => {

        const getToDoListData = async () => {
            const options = {
                "method": 'GET',
                "headers": {
                    'Content-Type': 'application/json', 
                    'x-api-key': api_key 
                }
            };
            console.log(`${todo_list_api_url}/list`);
            return await fetch(`${todo_list_api_url}/list`, options)
                .then(res => res.json())
                .catch(error => {
                    console.log("ERROR-------------", error);
                });
        };

        if (!todoListData) {
            getToDoListData()
                .then(data => {
                    setTodoListData(data)
                });
        }
    }, [todoListData]);
    return ( 
        <div className="shopping-list-wrapper">
            Shopping List
            {todoListData &&
            todoListData.map((item, index) => (
                <p key={index}>{item.name}</p>
            ))}
        </div>
     );
}

export default ShoppingList;