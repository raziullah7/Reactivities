import {Button, Form, FormInput, FormTextArea, Segment} from "semantic-ui-react";
import {ChangeEvent, useEffect, useState} from "react";
import {useStore} from "../../../app/stores/store.ts";
import {observer} from "mobx-react-lite";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Activity} from "../../../app/models/activity.ts";
import LoadingComponent from "../../../app/layout/LoadingComponent.tsx";
import {v4 as uuid} from "uuid";

function ActivityForm() {
    const {activityStore} = useStore();
    const {loading, createActivity, updateActivity, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams();
    const navigate = useNavigate();

    const [activity, setActivity] = useState<Activity>({
        id: "",
        title: "",
        date: "",
        description: "",
        category: "",
        city: "",
        venue: "",
    })

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity]);

    async function handleSubmit() {
         if (!activity.id) {
             activity.id = uuid();
             createActivity(activity).then(() => navigate(`/activities/${activity.id}`));
         } else {
             updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
         }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value});
    }

    if (loadingInitial) return <LoadingComponent content='Loading Activity...' />;

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete="off">
                <FormInput
                    placeholder="Title"
                    value={activity.title}
                    name="title"
                    onChange={handleInputChange}
                />
                <FormTextArea
                    placeholder="Description"
                    value={activity.description}
                    name="description"
                    onChange={handleInputChange}
                />
                <FormInput
                    placeholder="Category"
                    value={activity.category}
                    name="category"
                    onChange={handleInputChange}
                />
                <FormInput
                    placeholder="Date"
                    type="date"
                    value={activity.date}
                    name="date"
                    onChange={handleInputChange}
                />
                <FormInput
                    placeholder="City"
                    value={activity.city}
                    name="city"
                    onChange={handleInputChange}
                />
                <FormInput
                    placeholder="Venue"
                    value={activity.venue}
                    name="venue"
                    onChange={handleInputChange}
                />
                <Button
                    loading={loading}
                    positive floated="right"
                    type="submit" content="Submit"
                />
                <Button
                    floated="right" type="button" content="Cancel"
                    as={Link} to="/activities"
                />
            </Form>
        </Segment>
    );
}

const ActivityFormObserver = observer(ActivityForm);
export default ActivityFormObserver;