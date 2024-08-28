import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { deleteEmployee, listEmployees } from '../services/EmployeeService';

//const base_url='http://localhost:8080/api/ems';
const ListEmployeeComponent = () => {
    const [employees, setEmployees] = useState([])
    const navigator = useNavigate();
    useEffect(() => {
        getAllEmployees();
    }
        , []);

    function getAllEmployees() {
        listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewEmployee() {
        navigator('/add-employee')
    }

    function updateEmployee(id) {
        navigator(`/edit-employee/${id}`)
    }

    function removeEmployee(id) {
        console.log(id);
        deleteEmployee(id).then(() => {
            getAllEmployees();

        }).catch(error => {
            console.error(error);
        })
    }
    return (
        <div className='container'>
            <h2 className='text-center'>List of employees</h2>
            <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Employee id</th>
                        <th>Employee first name</th>
                        <th>Employee last name</th>
                        <th>Employee email id</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map((employee) =>
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>
                                    <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>update</button>
                                    <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)} style={{ marginLeft: '10px' }}>delete</button>
                                </td>
                            </tr>

                        )

                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListEmployeeComponent