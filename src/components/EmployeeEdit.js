import _ from 'lodash';
import React, { Component } from 'react';
import EmployeeForm from './EmployeeForm';
import { connect } from 'react-redux';
import { Card, CardSection, Button } from './common';
import { employeeUpdate, employeeSave } from '../actions';
import { Actions } from '../../node_modules/react-native-router-flux';

class EmployeeEdit extends Component{
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
                    <Button>
                        Fire Employee
                    </Button>
                </CardSection>
            </Card>
        );
    }
}

const mapStateToProm =(state) => {
    const { name, phone, shift} = state.employeeForm;

    return { name, phone, shift};
};

export default connect(mapStateToProm, {employeeUpdate, employeeSave})(EmployeeEdit);