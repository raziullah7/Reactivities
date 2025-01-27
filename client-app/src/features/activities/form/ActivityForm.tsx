import {Button, Form, FormInput, FormTextArea, Segment} from "semantic-ui-react";
import {ChangeEvent, useState} from "react";
import {useStore} from "../../../app/stores/store.ts";
import {observer} from "mobx-react-lite";

function ActivityForm() {
    const {activityStore} = useStore();
    const {selectedActivity, closeForm, loading, createActivity, updateActivity} = activityStore;

    const initialState = selectedActivity ?? {
        id: "",
        title: "",
        date: "",
        description: "",
        category: "",
        city: "",
        venue: "",
    }

    const [activity, setActivity] = useState(initialState);

    async function handleSubmit() {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
         activity.id ?
             await updateActivity(activity) :
             await createActivity(activity);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value});
    }

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
                    onClick={() => closeForm()}
                />
            </Form>
        </Segment>
    );
}

const ActivityFormObserver = observer(ActivityForm);
export default ActivityFormObserver;