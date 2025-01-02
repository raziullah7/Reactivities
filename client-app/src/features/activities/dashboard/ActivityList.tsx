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
import {Activity} from "../../../app/models/activity";

interface Props {
    activities: Activity[]
    selectActivity: (id: string) => void
    deleteActivity: (id: string) => void
}

export default function ActivityList({activities, selectActivity, deleteActivity}: Props) {
    return (
        <Segment>
            <ItemGroup divided>
                {activities.map(activity => (
                    <Item key={activity.id} style={{display: "block"}}>
                        <ItemHeader as='a'>{activity.title}</ItemHeader>
                        <ItemMeta>{activity.date}</ItemMeta>
                        <ItemDescription>
                            <div>{activity.description}</div>
                            <div>{activity.city}, {activity.venue}</div>
                        </ItemDescription>
                        <ItemExtra>
                            <Button
                                onClick={() => selectActivity(activity.id)}
                                floated="right" content="View" color="blue"
                            />
                            <Button
                                onClick={() => deleteActivity(activity.id)}
                                floated="right" content="Delete" color="red"
                            />
                            <Label basic content={activity.category}/>
                        </ItemExtra>
                    </Item>
                ))}
            </ItemGroup>
        </Segment>
    );
}