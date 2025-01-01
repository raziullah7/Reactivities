import {Button, ButtonGroup, Card, CardContent, CardDescription, CardHeader, CardMeta, Image} from "semantic-ui-react";
import {Activity} from "../../../app/models/activity";

interface Props {
    activity: Activity
    cancelSelectActivity: () => void
    openForm: (id: string) => void
}

export default function ActivityDetails({activity, cancelSelectActivity, openForm}: Props) {
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
                        onClick={() => cancelSelectActivity()}
                    />
                </ButtonGroup>
            </CardContent>
        </Card>
    );
}