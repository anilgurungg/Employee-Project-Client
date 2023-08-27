import React, {useState} from 'react';
import InputField from '../shared/InputField';
import { Button, TextField } from '@mui/material';

const EditForm = ({initialData, onSubmit}) => {
const [name, setName] = useState(initialData.employeeName || '');
  const [email, setEmail] = useState(initialData.emailId || '');
  const [password, setPassword] = useState('');
  const [salary, setSalary] = useState(initialData.salary || 0);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      employeeName: name,
      emailId: email,
      password: password,
      salary: salary
    };
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField fullWidth label="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <InputField fullWidth label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <InputField  required={true} fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <InputField  fullWidth label="Salary" type="number" value={salary} onChange={(e) => setSalary(e.target.value)} />
      <Button variant="contained" color="primary" type="submit">
        Update Changes
      </Button>
    </form>
  )
}

export default EditForm