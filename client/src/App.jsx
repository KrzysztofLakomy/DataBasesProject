import React from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import { HospitalContextProvider } from './context/HospitalContext';
import AddPatientWard from './routes/AddPatientWard';
import AddWardOperation from './routes/AddWardOperation';
import AppointmentCreate from './routes/AppointmentCreate';
import AppointmentSignUp from './routes/AppointmentSignUp';
import Clinics from './routes/Clinics';
import Diseases from './routes/Diseases';
import DoctorDetailPage from './routes/DoctorDetailPage';
import Doctors from './routes/Doctors';
import Home from './routes/Home';
import OperationCreate from './routes/OperationCreate';
import Operations from './routes/Operations';
import OperationSignUp from './routes/OperationSignUp';
import PatientDetailPage from './routes/PatientDetailPage';
import PatientRegister from './routes/PatientRegister';
import Patients from './routes/Patients';
import UpdateDoctorRoute from './routes/UpdateDoctorRoute';
import WardDetailPage from './routes/WardDetailPage';
import Wards from './routes/Wards';


const App = () => {
    return(
        <HospitalContextProvider>
            <div className="container bg-white" style={{minHeight: "1080px"}}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/doctors" component={Doctors} />
                        <Route exact path="/doctors/:id" component={DoctorDetailPage} />
                        <Route exact path="/doctors/:id/update" component={UpdateDoctorRoute} />
                        <Route exact path="/patients/register" component={PatientRegister} />
                        <Route exact path="/patients" component={Patients} />
                        <Route exact path="/patients/:id" component={PatientDetailPage} />
                        <Route exact path="/diseases" component={Diseases} />
                        <Route exact path="/clinics" component={Clinics} />
                        <Route exact path="/appointment/signUp" component={AppointmentSignUp} />
                        <Route exact path="/appointment/create" component={AppointmentCreate} />
                        <Route exact path="/wards" component={Wards} />
                        <Route exact path="/wards/:id" component={WardDetailPage} />
                        <Route exact path="/w/patient" component={AddPatientWard} />
                        <Route exact path="/operation" component={Operations} />
                        <Route exact path="/operation/create" component={OperationCreate} />
                        <Route exact path="/operation/signUp" component={OperationSignUp} />
                    </Switch>
                </Router>
            </div>
        </HospitalContextProvider>
    );
}

export default App;
