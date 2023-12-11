import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddApp = ({ newApp, handleInputChange, handleAddApp, handleRemoveApp }) => {
  const showToast = (message) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };

  const handleAddClick = () => {
    if (!newApp.name || !newApp.url || !newApp.image) {
      showToast("Please fill in all fields");
    } else {
      handleAddApp();
      showToast("App added successfully");
    }
  };

  const handleRemoveClick = () => {
    if (!newApp.name || !newApp.url) {
      showToast("Please fill in Name and URL to remove the app");
    } else {
      handleRemoveApp(newApp.name, newApp.url);
      showToast("App removed successfully");
    }
  };

  return (
    <Box>
      <h2>Add App</h2>
      <TextField
        label="Name"
        name="name"
        value={newApp.name}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="URL"
        name="url"
        value={newApp.url}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Image URL"
        name="image"
        value={newApp.image}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleAddClick}>
        Add App
      </Button>
      <Button variant="contained" color="secondary" onClick={handleRemoveClick}>
        Remove App
      </Button>
      <Link to="/">
        <HomeIcon style={{ fontSize: 55, position: 'fixed', bottom: 11, left: 10, cursor: 'pointer' }} />
      </Link>
      <ToastContainer />
    </Box>
  );
};

export default AddApp;

