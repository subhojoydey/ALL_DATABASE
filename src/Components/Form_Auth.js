import React from 'react';
//import Modal from "react-modal";
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class FormInput extends React.Component {
    constructor(props) {
        super(props);
        this.valid_strings = ['alias', 'password'];
        this.state = {
            [this.valid_strings[0]]: '',
            [this.valid_strings[1]]: ''
        };
        this.check_valid = 1;
        this.handleChange = this
            .handleChange
            .bind(this);
        this.handleSubmit = this
            .handleSubmit
            .bind(this);
    }

    handleChange(evt) {
        if (this.valid_strings.includes(evt.target.name) && this.check_valid == 1) {
            this.setState({
                [evt.target.name]: evt.target.value
            });
        } else {
            this.check_valid = 0;
            this.setState({
                [this.valid_strings[0]]: '',
                [this.valid_strings[1]]: ''
            })
        }

    }

    handleSubmit(event) {
        event.preventDefault();
        if ((this.state.alias).trim() != '' && (this.state.password).trim() != '') {
            this
                .props
                .get_auth(this.state);
            event
                .target
                .reset();
            this.check_valid = 1;
        } else {
            alert("Please DONT enter nothing, be sensible =.=!");
        }
    }

    render() {

        return (
            <Modal
                show={this.props.modalState_prop}
                animation="true"
                backdrop="true"
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Authentication
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formAlias">
                            <Form.Label>Alias</Form.Label>
                            <Form.Control type="text" placeholder="Enter alias" name='alias' onChange={this.handleChange}/>
                            
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name='password' placeholder="Password" onChange={this.handleChange}/>
                            <Form.Text className="text-muted">
                                Your password is safe with me :)
                            </Form.Text>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>

                    </Form>
                </Modal.Body>
            </Modal>

        //<InnerHTML html={html} />
        );
    }
}

export default FormInput;