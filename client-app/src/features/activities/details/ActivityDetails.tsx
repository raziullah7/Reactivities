import {Button, ButtonGroup, Card, CardContent, CardDescription, CardHeader, CardMeta, Image} from "semantic-ui-react";
import {useStore} from "../../../app/stores/store.ts";
import LoadingComponent from "../../../app/layout/LoadingComponent.tsx";
import {Link, useParams} from "react-router-dom";
import {useEffect} from "react";
import {observer} from "mobx-react-lite";

function ActivityDetails() {
    const {activityStore, } = useStore();
    const {selectedActivity: activity, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams();

    useEffect(() => {
        if (id) loadActivity(id);
    }, [id, loadActivity]);

    // to avoid the error that activity can be Activity | undefined
    if (loadingInitial || !activity) return <LoadingComponent />;

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
                    <Button as={Link} to={`/manage/${activity.id}`}
                            basic color="blue" content="Edit"
                    />
                    <Button as={Link} to="/activities"
                            basic color="grey" content="Cancel" type="button"
                    />
                </ButtonGroup>
            </CardContent>
        </Card>
    );
}

const ActivityDetailsObserver = observer(ActivityDetails);
export default ActivityDetailsObserver;