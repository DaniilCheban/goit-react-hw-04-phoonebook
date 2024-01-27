import React, { useState } from 'react';

const FormAddContacts = ({ handleAddContact }) => {
  const [formDataa, setFormData] = useState({
    name: '',
    number: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    handleAddContact(formDataa, clean);
  };

  const clean = () => setFormData({ name: '', number: '' });

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          name="name"
          id="name"
          onChange={handleChange}
          value={formDataa.name}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="number" className="form-label">
          Number
        </label>
        <input
          type="tel"
          className="form-control"
          name="number"
          id="number"
          value={formDataa.number}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add contact
      </button>
    </form>
  );
};

export { FormAddContacts };
