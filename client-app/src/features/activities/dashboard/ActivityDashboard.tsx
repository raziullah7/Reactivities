import {Grid, GridColumn} from "semantic-ui-react";
import {Activity} from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface Props {
    activities: Activity[]
    selectedActivity: Activity | undefined
    selectActivity: (id: string) => void
    cancelSelectActivity: () => void
    editMode: boolean
    openForm: (id: string) => void
    closeForm: () => void
    createOrEdit: (activity: Activity) => void
    deleteActivity: (id: string) => void
}

export default function ActivityDashboard(
    {
        activities, selectedActivity, selectActivity, cancelSelectActivity,
        editMode, openForm, closeForm, createOrEdit, deleteActivity
    }: Props) {
    return (
        <Grid>
            <GridColumn width='10'>
                <ActivityList
                    activities={activities}
                    selectActivity={selectActivity}
                    deleteActivity={deleteActivity}
                />
            </GridColumn>
            <GridColumn width='6'>
                {   // display ActivityDetails if selectedActivity is not NULL
                    // and editMode is FALSE
                    (selectedActivity && !editMode) &&
                    <ActivityDetails
                        activity={selectedActivity}
                        cancelSelectActivity={cancelSelectActivity}
                        openForm={openForm}
                    />
                }
                {// display the Activity if editMode is TRUE
                    editMode &&
                    <ActivityForm
                        closeForm={closeForm}
                        activity={selectedActivity}
                        createOrEdit={createOrEdit}
                    />
                }
            </GridColumn>
        </Grid>
    )
}