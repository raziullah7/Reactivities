import {Grid, GridColumn} from "semantic-ui-react";
import ActivityList from "./ActivityList";
import {useStore} from "../../../app/stores/store.ts";
import {observer} from "mobx-react-lite";
import {useEffect} from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent.tsx";

function ActivityDashboard() {

    const {activityStore} = useStore();
    const {loadActivities, activityRegistry} = activityStore;

    // useEffect to GET the server response after making the query
    useEffect(() => {
        if (activityRegistry.size <= 1) loadActivities();
    }, [activityRegistry.size, loadActivities])

    if (activityStore.loadingInitial) return <LoadingComponent content="Loading App"/>;

    return (
        <Grid>
            <GridColumn width='10'>
                <ActivityList />
            </GridColumn>
            <GridColumn width='6'>
                <h2>Activity Filters</h2>
            </GridColumn>
        </Grid>
    )
}

const ActivityDashboardObserver = observer(ActivityDashboard);
export default ActivityDashboardObserver;