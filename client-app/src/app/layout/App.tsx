import {useEffect, useState} from 'react'
import axios from 'axios';
import {Container} from "semantic-ui-react";
import {Activity} from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';

function App() {
    // useState to HOLD the server response
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)
    const [editMode, setEditMode] = useState(false)

    // "View" button functionality on each Activity
    function handleSelectActivity(id: string) {
        setSelectedActivity(activities.find(x => x.id === id))
    }

    // "Cancel" button functionality on each Activity
    function handleCancelSelectActivity() {
        setSelectedActivity(undefined)
    }

    function handleOpenForm(id?: string) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        id ? handleSelectActivity(id) : handleCancelSelectActivity()
        setEditMode(true)
    }

    function handleCloseForm() {
        setEditMode(false)
    }

    function handleCreateOrEditActivity(activity: Activity) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        activity.id
            ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
            : setActivities([...activities, {...activity, id: uuid()} ]);
        setEditMode(false);
        setSelectedActivity(activity);
    }

    function handleDeleteActivity(id: string) {
        setActivities([...activities.filter(x => x.id !== id)])
    }

    // useEffect to GET the server response after making the query
    useEffect(() => {
        axios.get<Activity[]>("http://localhost:5000/api/activities")
            .then(response => setActivities(response.data))
    }, [])

    return (
        <>
            <NavBar openForm={handleOpenForm}/>
            <Container style={{marginTop: '7em'}}>
                <ActivityDashboard
                    activities={activities}
                    selectedActivity={selectedActivity}
                    selectActivity={handleSelectActivity}
                    cancelSelectActivity={handleCancelSelectActivity}
                    editMode={editMode}
                    openForm={handleOpenForm}
                    closeForm={handleCloseForm}
                    createOrEdit={handleCreateOrEditActivity}
                    deleteActivity={handleDeleteActivity}
                />
            </Container>

        </>
    )
}

export default App
