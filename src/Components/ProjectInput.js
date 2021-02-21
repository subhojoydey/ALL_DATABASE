import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


class ProjectInput extends React.Component {
    constructor(props) {
        super(props);
        this.valid_strings=['Purpose','NP'];
        this.state = {
            modalState: false,
            [this.valid_strings[0]]: '',
            [this.valid_strings[1]]: ''
        };
        this.check_valid=1;
        this.handleChange = this
            .handleChange
            .bind(this);
        this.handleSubmit = this
            .handleSubmit
            .bind(this);
        
            this.openModal = this.openModal.bind(this);
            this.toggleModal = this.toggleModal.bind(this);
    }

    openModal() {
        this.check_valid=1;
        this.setState({
            modalState: true
        });
    }

    toggleModal() {
        this.setState({
            modalState: false,
            [this.valid_strings[0]]: '',
            [this.valid_strings[1]]: ''
        });
    }

    handleChange(evt) {
        if (this.valid_strings.includes(evt.target.name) && this.check_valid==1)
        {
            this.setState({
                [evt.target.name]:evt.target.value
            });
        }
        else{
            this.check_valid=0;
            this.setState({
                [this.valid_strings[0]]: '',
                [this.valid_strings[1]]: ''
            });
        }
        
    }

    handleSubmit(event) {
        event.preventDefault();
        var data = this.state;
        delete data['modalState'];
        if(data.Purpose.trim()!='' && data.NP.trim()!=''){
            this.props.add_project(data);
            event.target.reset();
            this.check_valid=1;
            this.toggleModal();
        }
        else {
            event.target.reset();
            alert("Please Dont enter nothing, be sensible =.=");
            this.toggleModal();
        }
    }

    render() {
        return (
            <div>
                <Button variant="outline-success" size="l" onClick={this.openModal}>Add Project</Button>
                <Modal show={this.state.modalState}
                    aria-labelledby="contained-modal-title-vcenter"
                    size="lg"
                    autoFocus={true}
                    animation={true}
                    backdrop={true}
                    keyboard={true}
                    onHide={this.toggleModal}
                    centered>
                        <Modal.Header closeButton>
                            <Modal.Title id="new project">
                                Enter New Project
                            </Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Form onSubmit={this.handleSubmit}>

                                <Form.Group controlId="formProjectPurpose">
                                    <Form.Label>Purpose</Form.Label>
                                    <Form.Control type='text' name='Purpose' placeholder="Project Purpose" onChange={this.handleChange}/>
                                    <Form.Text className="text-muted">
                                        Wow, great idea
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="formProjectNP">
                                    <Form.Label>Name of Project</Form.Label>
                                    <Form.Control type="text" placeholder="Project Name" name='NP' onChange={this.handleChange}/>
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>

                            </Form>
                        </Modal.Body>
                </Modal>
            </div>
        //<InnerHTML html={html} />
        );
    }
};

export default ProjectInput;