import firebase from 'firebase';
import { 
    EMPLOYEE_UPDATE, 
    EMPLOYEE_CREATE,
    EMPLOYEES_FETCH_SUCCESS,
    EMPLOYEES_UPDATE_SUCCESS,
    EMPLOYEES_HAS_BEEN_FIRED
} from './type';
import { Actions } from '../../node_modules/react-native-router-flux';

export const employeeUpdate = ({ prop, value}) => {
    return{
        type: EMPLOYEE_UPDATE,
        payload: { prop, value }
    };
};

export const employeeCreate = ({ name, phone, shift}) => {
    const { currentUser } = firebase.auth();
    return(dispatch) => {
        firebase.database().ref(`/users/${ currentUser.uid }/employees`)
        .push({ name, phone, shift })
        .then(() =>  {
            dispatch({ type: EMPLOYEE_CREATE });
            Actions.pop()
        });
    };
};

export const employeeFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${ currentUser.uid }/employees`)
            .on('value', snapshot => {
                dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });   
            });
    };
};

export const employeeSave = ({ name, phone, shift, uid }) => {
    const { currentUser } = firebase.auth();
    

    return (dispatch) => {
        firebase.database().ref(`/users/${ currentUser.uid }/employees/${ uid }`)
            .set({ name, phone, shift })
            .then(() => {
                dispatch({ type: EMPLOYEES_UPDATE_SUCCESS})
            });
    };
};

export const employeeDelete = ({ uid }) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${ currentUser.uid }/employees/${ uid }`)
            .remove()
            .then(() => {
                dispatch({ type: EMPLOYEES_HAS_BEEN_FIRED})
            });
    };
};