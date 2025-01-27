import {Button, ButtonGroup, Card, CardContent, CardDescription, CardHeader, CardMeta, Image} from "semantic-ui-react";
import {useStore} from "../../../app/stores/store.ts";
import LoadingComponent from "../../../app/layout/LoadingComponent.tsx";

export default function ActivityDetails() {
    const {activityStore} = useStore();
    const {selectedActivity: activity, openForm, cancelSelectedActivity} = activityStore;

    // to avoid the error that activity can be undefined as defined in the store
    if (!activity) return <LoadingComponent />;

    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category.toLocaleLowerCase()}.jpg`}/>
            <CardContent>
                <CardHeader>{activity.title}</CardHeader>
                <CardMeta><span>{activity.date}</span></CardMeta>
                <CardDescription>{activity.description}</CardDescription>
            </CardContent>
            <CardContent extra>
                <ButtonGroup widths="2">
                    <Button
                        basic color="blue" content="Edit"
                        onClick={() => openForm(activity.id)}
                    />
                    <Button
                        basic color="grey" content="Cancel" type="button"
                        onClick={() => cancelSelectedActivity()}
                    />
                </ButtonGroup>
            </CardContent>
        </Card>
    );
}