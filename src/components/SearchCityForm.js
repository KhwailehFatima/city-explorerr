import { Component } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default class SearchCityForm extends Component {

    render() {
        return (
            <>
                <Form onSubmit={this.props.handleSubmit}>
                    <Form.Group className="mb-3"  >
                        <Form.Label id="searchQuery">Enter City</Form.Label>
                        <Form.Control type="text" id="searchQuery" placeholder="Enter city name  ..." />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Explore!
                    </Button>
                </Form>
            </>
        )
    }
}