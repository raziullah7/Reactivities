import {useEffect} from 'react'
import {Container} from "semantic-ui-react";
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from "./LoadingComponent.tsx";
import {useStore} from "../stores/store.ts";
import {observer} from "mobx-react-lite";

function App() {
    const {activityStore} = useStore();

    // useEffect to GET the server response after making the query
    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore])

    if (activityStore.loadingInitial) return <LoadingComponent content="Loading App"/>;

    return (
        <>
            <NavBar/>
            <Container style={{marginTop: '7em'}}>
                <ActivityDashboard/>
            </Container>

        </>
    )
}

const AppObserver = observer(App);
export default AppObserver;
