import {Grid, GridColumn} from "semantic-ui-react";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import {useStore} from "../../../app/stores/store.ts";
import {observer} from "mobx-react-lite";

function ActivityDashboard() {

    const {activityStore} = useStore();
    const {selectedActivity, editMode} = activityStore;

    return (
        <Grid>
            <GridColumn width='10'>
                <ActivityList />
            </GridColumn>
            <GridColumn width='6'>
                {   // display ActivityDetails if selectedActivity is not NULL and editMode is FALSE
                    selectedActivity && !editMode && <ActivityDetails />
                }
                {   // display the Activity if editMode is TRUE
                    editMode && <ActivityForm />
                }
            </GridColumn>
        </Grid>
    )
}

const ActivityDashboardObserver = observer(ActivityDashboard);
export default ActivityDashboardObserver;