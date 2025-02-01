import {makeAutoObservable, runInAction} from "mobx";
import {Activity} from "../models/activity.ts";
import agent from "../api/agent.ts";
import {v4 as uuid} from 'uuid';

export default class ActivityStore {
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

    // COMPUTED property to sort by date
    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort(
            (a, b) => Date.parse(a.date) - Date.parse(b.date)
        );
    }

    // action to set loadingInitial to NOT use runInAction()
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    // action to search for an activity from memory and return it
    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    private setActivity = (activity: Activity) => {
        activity.date = activity.date.split("T")[0];
        this.activityRegistry.set(activity.id, activity);
    }

    //-------------------------------------------------------------------------------------------------
    // action to load Activities from the API
    loadActivities = async () => {
        this.setLoadingInitial(true);
        try {
            const activities = await agent.Activities.list();
            runInAction(() => {
                activities.forEach(activity => {
                    this.setActivity(activity);
                })
                this.setLoadingInitial(false);
            })

        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
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
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    // GET Detail of an activity (from the memory, otherwise from the API)
    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            runInAction(() => {
                this.selectedActivity = activity;
            })
            return activity;
        }
        else {
            this.setLoadingInitial(true);
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(() => {
                    this.selectedActivity = activity;
                })
                this.setLoadingInitial(false);
                return activity;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }
}