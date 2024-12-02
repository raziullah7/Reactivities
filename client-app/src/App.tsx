import {useEffect, useState} from 'react'
import './App.css'
import axios from 'axios';
import {Header, List, ListItem} from "semantic-ui-react";

function App() {
    // useState to HOLD the server response
    const [activities, setActivities] = useState([]);

    // useEffect to GET the server response after making the query
    useEffect(() => {
        axios.get("http://localhost:5000/api/activities")
            .then(response => setActivities(response.data))
    }, [])

    return (
        <div>
            <Header as="h2" content="Reactivities" icon="users"/>
            <List>
                {
                    activities.map((activity: any) => (
                        <ListItem key={activity.id}> {activity.title} </ListItem>
                    ))
                }
            </List>
        </div>
    )
}

export default App
