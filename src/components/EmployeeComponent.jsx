import { useEffect, useState } from 'react';
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';
const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const navigator = useNavigate();
  const { id } = useParams();
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  useEffect(() => {
    if (id) {
      getEmployee(id).then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
      }).catch(error => {
        console.log(error);
      })
    }

  }, [id])

  function saveOrUpdateEmployee(e) {
    e.preventDefault();
    if (validateForm()) {
      const employee = { firstName, lastName, email }
      console.log(employee);

      if (id) {
        updateEmployee(id, employee).then((response) => {
          console.log(response.data);
          navigator('/ems');
        }).catch(error => {
          console.error(error);
        })
      } else {
        createEmployee(employee).then((response) => {
          console.log(response.data)
          navigator('/ems');
        }).catch(error => {
          console.error(error);
        })
      }


    }

  }

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors }

    if (firstName.trim()) {
      errorsCopy.firstName = '';
    }
    else {
      errorsCopy.firstName = 'first name required';
      valid = false;
    }
    if (lastName.trim()) {
      errorsCopy.lastName = '';
    }
    else {
      errorsCopy.lastName = 'last name required';
      valid = false;
    }
    if (email.trim()) {
      errorsCopy.email = '';
    }
    else {
      errorsCopy.email = 'email is required';
      valid = false;
    }
    setErrors(errorsCopy);
    return valid;
  }

  function pageTitle() {
    return id ? (<h2 className='text-center'>Update employee</h2>) : (<h2 className='text-center'>Add employee</h2>);

  }
  return (
    <div className='container'>
      <br /> <br />
      <div className='row'>
        <div className='card col-md-6 offset-md-3 offset-md-3'>
          {
            pageTitle()
          }
          <div className='card-body'>
            <form>
              <div className='form-group mb-2'>
                <label className='form-label'>First Name:</label>
                <input type="text" placeholder='enter first name' name='firstName' className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'>Last Name:</label>
                <input type="text" placeholder='enter last name' name='lastName' className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} value={lastName} onChange={(e) => setLastName(e.target.value)} />
                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'>Email:</label>
                <input type="text" placeholder='enter email' name='email' className={`form-control ${errors.email ? 'is-invalid' : ''}`} value={email} onChange={(e) => setEmail(e.target.value)} />
                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
              </div>
              <button type='submit' className='btn btn-success' onClick={saveOrUpdateEmployee}>submit</button>
            </form>

          </div>
        </div>
      </div>

    </div>
  )
}

export default EmployeeComponent