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

    const columnLimit = 6;
    const columns = [];
    if (todoListData) {
        for (let i = 0; i < todoListData.length; i += columnLimit) {
            columns.push(todoListData.slice(i, i + columnLimit));
        }
    }

    return (
        <div className="shopping-list-wrapper shopping-list-container" >
            <h1 className="shopping-list-title" >Shopping List</h1>
            <div className="shopping-list-columns-container" >
                {columns.map((column, colIndex) => (
                    <div key={colIndex} className="shopping-list-column" >
                        {column.map((item, index) => (
                            <div key={index} className="shopping-list-list-item" >
                                {item.name}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

// const styles = {
//     container: {
//         backgroundColor: '#f0f6ff', // Subtle light blue
//         border: '1px solid #d0d0d0',
//         borderRadius: '8px',
//         padding: '20px',
//         maxWidth: '600px',
//         fontFamily: '"Arial", sans-serif',
//     },
//     title: {
//         backgroundColor: '#3d7eb8', // Blue similar to the screenshot
//         color: 'white',
//         fontSize: '28px',
//         textAlign: 'center',
//         padding: '10px 0',
//         borderRadius: '6px',
//         marginBottom: '20px',
//     },
//     columnsContainer: {
//         display: 'flex',
//         justifyContent: 'space-between',
//         gap: '20px',
//     },
//     column: {
//         flex: 1,
//     },
//     listItem: {
//         padding: '5px 0',
//         color: '#333',
//         fontSize: '18px',
//         borderBottom: '1px solid #ddd',
//     },
// };

export default ShoppingList;