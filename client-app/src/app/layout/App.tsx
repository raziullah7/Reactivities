import {useEffect, useState} from 'react'
import axios from 'axios';
import {Container, List, ListItem} from "semantic-ui-react";
import { Activity } from '../models/activity';
import NavBar from './NavBar';

function App() {
    // useState to HOLD the server response
    const [activities, setActivities] = useState<Activity[]>([]);

    // useEffect to GET the server response after making the query
    useEffect(() => {
        axios.get<Activity[]>("http://localhost:5000/api/activities")
            .then(response => setActivities(response.data))
    }, [])

    return (
        <>
            <NavBar />
            <Container style={{marginTop: '7em'}}>
                <List>
                    {
                        activities.map((activity) => (
                            <ListItem key={activity.id}> {activity.title} </ListItem>
                        ))
                    }
                </List>
            </Container>
            
        </>
    )
}

export default App
