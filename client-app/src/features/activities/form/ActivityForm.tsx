import { Button, Form, FormInput, FormTextArea, Segment } from "semantic-ui-react";

export default function ActivityForm() {
    return (
        <Segment clearing>
            <Form>
                <FormInput placeholder="Title" />
                <FormTextArea placeholder="Description" />
                <FormInput placeholder="Category" />
                <FormInput placeholder="Date" />
                <FormInput placeholder="City" />
                <FormInput placeholder="Venue" />
                <Button positive floated="right" type="submit" content="Submit" />
                <Button  floated="right" type="button" content="Cancel" />
            </Form>
        </Segment>
    );
}