import {
    Button,
    Item,
    ItemDescription,
    ItemExtra,
    ItemGroup,
    ItemHeader,
    ItemMeta,
    Label,
    Segment
} from "semantic-ui-react";
import {SyntheticEvent, useState} from "react";
import {useStore} from "../../../app/stores/store.ts";
import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";

function ActivityList() {
    const {activityStore} = useStore();
    const {deleteActivity, activitiesByDate, loading} = activityStore;

    const [target, setTarget] = useState("");

    async function handleActivityDelete(eve: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(eve.currentTarget.name);
        await deleteActivity(id);
    }

    return (
        <Segment>
            <ItemGroup divided>
                {activitiesByDate.map(activity => (
                    <Item key={activity.id} style={{display: "block"}}>
                        <ItemHeader as='a'>{activity.title}</ItemHeader>
                        <ItemMeta>{activity.date}</ItemMeta>
                        <ItemDescription>
                            <div>{activity.description}</div>
                            <div>{activity.city}, {activity.venue}</div>
                        </ItemDescription>
                        <ItemExtra>
                            <Button
                                as={Link} to={`/activities/${activity.id}`}
                                floated="right" content="View" color="blue"
                            />
                            <Button
                                onClick={(eve) => handleActivityDelete(eve, activity.id)}
                                floated="right" content="Delete" color="red"
                                loading={loading && target === activity.id}
                                name={activity.id}
                            />
                            <Label basic content={activity.category}/>
                        </ItemExtra>
                    </Item>
                ))}
            </ItemGroup>
        </Segment>
    );
}

const ActivityListObserver = observer(ActivityList);
export default ActivityListObserver;