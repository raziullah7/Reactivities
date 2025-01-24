import {useEffect, useState} from 'react'
import {Container} from "semantic-ui-react";
import {Activity} from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from "../api/agent.ts";
import LoadingComponent from "./LoadingComponent.tsx";
import {useStore} from "../stores/store.ts";
import {observer} from "mobx-react-lite";

// eslint-disable-next-line react-refresh/only-export-components
function App() {
    const {activityStore} = useStore();

    // useState to HOLD the server response
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)
    const [editMode, setEditMode] = useState(false)
    const [submitting, setSubmitting] = useState<boolean>(false);

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
        setSubmitting(true);

        // if activity ID exists, it means that it's a PUT request
        if (activity.id) {
            agent.Activities.update(activity).then(() => {
                setActivities([...activities.filter(x => x.id !== activity.id), activity]);
                setSelectedActivity(activity);
                setEditMode(false);
                setSubmitting(false);
            })
        }
        // else if the ID doesn't exist, it means that it's a POST request
        else {
            activity.id = uuid();
            agent.Activities.create(activity).then(() => {
                setActivities([...activities, activity]);
                setSelectedActivity(activity);
                setEditMode(false);
                setSubmitting(false);
            })
        }
    }

    function handleDeleteActivity(id: string) {
        setSubmitting(true);
        agent.Activities.delete(id).then(() => {
            setActivities([...activities.filter(x => x.id !== id)]);
            setSubmitting(false);
        })
    }

    // useEffect to GET the server response after making the query
    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore])

    if (activityStore.loadingInitial) return <LoadingComponent content="Loading App"/>;

    return (
        <>
            <NavBar openForm={handleOpenForm}/>
            <Container style={{marginTop: '7em'}}>
                <ActivityDashboard
                    activities={activityStore.activities}
                    selectedActivity={selectedActivity}
                    selectActivity={handleSelectActivity}
                    cancelSelectActivity={handleCancelSelectActivity}
                    editMode={editMode}
                    openForm={handleOpenForm}
                    closeForm={handleCloseForm}
                    createOrEdit={handleCreateOrEditActivity}
                    deleteActivity={handleDeleteActivity}
                    submitting={submitting}
                />
            </Container>

        </>
    )
}

export default observer(App);
