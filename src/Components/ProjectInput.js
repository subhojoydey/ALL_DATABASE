import React from 'react';
import Modal, { defaultStyles } from "react-modal";

import Button from 'react-bootstrap/Button';

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
        this.setState({
            modalState: true
        });
    }

    toggleModal() {
        this.setState({
            modalState: false
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
        if(data.Purpose.trim()=='' || data.NP.trim()==''){
            alert("Please Dont enter nothing, be sensible =.=");
        }
        else {
            this.props.add_project(data);
            console.log(data);
            event.target.reset();
            this.check_valid=1;
            this.toggleModal();
        }
    }

    render() {
        return (
            <div>
            <Button variant="outline-success" size="l" onClick={this.openModal}>Add Project</Button>
            <Modal isOpen={this.state.modalState} shouldCloseOnOverlayClick={false} contentLabel="My dialog">
                <h1>Enter New Project</h1>
                <div id="New_project" action="POST">
                <form onSubmit={this.handleSubmit}>
                <div>
                    <label>Purpose</label><input type='text' name='Purpose' onChange={this.handleChange}/>
                    <label>Name of Project</label><input type='text' name='NP' onChange={this.handleChange}/></div><input type="submit" value="Submit"/></form>
                </div>
            </Modal>
            </div>
        //<InnerHTML html={html} />
        );
    }
};

export default ProjectInput;