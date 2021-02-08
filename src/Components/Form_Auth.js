import React from 'react';
import Modal from "react-modal";

class FormInput extends React.Component {
    constructor(props) {
        super(props);
        this.valid_strings=['alias','password'];
        this.state = {
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
            })
        }
        
    }

    handleSubmit(event) {
        event.preventDefault();
        if((this.state.alias).trim()!='' || (this.state.password).trim()!='')
        {
            this.props.get_auth(this.state);
            event.target.reset();
            this.check_valid=1;
        }    
        else{
            alert("Please Dont enter nothing, be sensible =.=");
        }
    }


    
    render() {
        
        return (
            <Modal isOpen={this.props.modalState_prop} shouldCloseOnOverlayClick={false} contentLabel="My dialog">
                <h1>Authenticate User</h1>
                <div id="Form_Auth" action="POST">
                <form onSubmit={this.handleSubmit}>
                <div>
                    <label>Alias</label><input type='text' name='alias' onChange={this.handleChange}/>
                    <label>Password</label><input type='password' name='password' onChange={this.handleChange}/></div>
                    <input type="submit" value="Submit"/></form>
                </div>
            </Modal>
            
        //<InnerHTML html={html} />
        );
    }
}

export default FormInput;