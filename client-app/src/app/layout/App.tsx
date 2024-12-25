import { useEffect, useState } from 'react'
import axios from 'axios';
import { Container } from "semantic-ui-react";
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {
    // useState to HOLD the server response
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)

    // "View" button functionality on each Activity
    function handleSelectActivity(id: string) {
        setSelectedActivity(activities.find(x => x.id === id))
    }

    // "Cancel" button functionality on each Activity
    function handleCancelSelectActivity() {
        setSelectedActivity(undefined)
    }

    // useEffect to GET the server response after making the query
    useEffect(() => {
        axios.get<Activity[]>("http://localhost:5000/api/activities")
            .then(response => setActivities(response.data))
    }, [])

    return (
        <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
                <ActivityDashboard
                    activities={activities}
                    selectedActivity={selectedActivity}
                    selectActivity={handleSelectActivity}
                    cancelSelectActivity={handleCancelSelectActivity}
                />
            </Container>

        </>
    )
}

export default App
