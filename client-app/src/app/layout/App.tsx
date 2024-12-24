import {useEffect, useState} from 'react'
import axios from 'axios';
import {Container} from "semantic-ui-react";
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

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
                <ActivityDashboard activities={activities} />
            </Container>
            
        </>
    )
}

export default App
