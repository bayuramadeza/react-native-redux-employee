import _ from 'lodash';
import React, { Component } from 'react';
import EmployeeForm from './EmployeeForm';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import { Card, CardSection, Button, Confirm } from './common';
import { employeeUpdate, employeeSave, employeeDelete } from '../actions';
import { Actions } from '../../node_modules/react-native-router-flux';

class EmployeeEdit extends Component{
state = { showModal : false };

    componentWillMount(){
        _.each(this.props.employee, (value, prop) => {
            this.props.employeeUpdate({ prop, value});
        });
    }

    onButtonPress(){
        const { name, phone, shift } = this.props;
        // console.log(this.props.employee)
        this.props.employeeSave({ name, phone, shift, uid: this.props.employee.uid })
        Actions.pop();
    }

    onTextPress(){
        const { phone, shift } = this.props;

        Communications.text(phone, `Your upcoming shift is on ${ shift }`)
    }

    onAccept(){
        this.props.employeeDelete({ uid: this.props.employee.uid})
        Actions.pop();
    }

    onDecline(){
        this.setState({ showModal: false});
    }
    
    render(){
        return(
            <Card>
                <EmployeeForm />
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Save Changes
                    </Button>
                </CardSection>

                <CardSection>
                    <Button onPress={this.onTextPress.bind(this)}>
                        Text Employee
                    </Button>
                </CardSection>

                <CardSection>
                    <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
                        Fire Employee
                    </Button>
                </CardSection>

                <Confirm
                    visible = { this.state.showModal }
                    onAccept={this.onAccept.bind(this)}
                    onDecline={this.onDecline.bind(this)}
                >
                    Are you sure want to delete this?
                </Confirm>
            </Card>
        );
    }
}

const mapStateToProm =(state) => {
    const { name, phone, shift} = state.employeeForm;

    return { name, phone, shift};
};

export default connect(mapStateToProm, {employeeUpdate, employeeSave, employeeDelete})(EmployeeEdit);