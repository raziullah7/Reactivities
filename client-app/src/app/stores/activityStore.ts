import {makeAutoObservable, runInAction} from "mobx";
import {Activity} from "../models/activity.ts";
import agent from "../api/agent.ts";
import {v4 as uuid} from 'uuid';

export default class ActivityStore {
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this);
    }

    // COMPUTED property to sort by date
    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort(
            (a, b) => Date.parse(a.date) - Date.parse(b.date)
        );
    }

    // action to load Activities from the API
    loadActivities = async () => {
        try {
            const activities = await agent.Activities.list();
            runInAction(() => {
                activities.forEach(activity => {
                    activity.date = activity.date.split("T")[0];
                    this.activityRegistry.set(activity.id, activity);
                })
                this.setLoadingInitial(false);
            })

        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    // action to set loadingInitial to NOT use runInAction()
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    // action to assign an activity to selectedActivity
    selectActivity = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id);
    }

    // action to assign 'undefined' or de-select the selectedActivity
    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    // action to open the edit form (Edit an existing activity or Create a new activity)
    openForm = (id?: string) => {
        if (id) {
            // Editing an existing activity
            this.selectActivity(id);
        } else {
            // Creating a new activity
            this.cancelSelectedActivity();
        }
        this.editMode = true;
    }

    // action to close the edit form
    closeForm = () => {
        this.editMode = false;
    }

    // Create activity
    createActivity = async (activity: Activity) => {
        this.loading = true;
        activity.id = uuid();
        try {
            await agent.Activities.create(activity);
            // alter all the states into runInAction, because the current action is
            // in a different lifecycle (tick) due to async/await delays
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    // Update activity
    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            // alter all the states into runInAction, because the current action is
            // in a different lifecycle (tick) due to async/await delays
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);

                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    // Delete activity
    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            // alter all the states into runInAction, because the current action is
            // in a different lifecycle (tick) due to async/await delays
            runInAction(() => {
                // remove the activity being deleted from the list
                this.activityRegistry.delete(id);

                if (this.selectedActivity?.id === id) {
                    this.cancelSelectedActivity();
                }
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}