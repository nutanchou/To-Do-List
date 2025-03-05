export const fetchRegister = async (userData) => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, message: data.message || 'Something went wrong' };
    }
  } catch (error) {
    console.error('Error during registration:', error);
    return { success: false, message: 'Something went wrong' };
  }
};

export const fetchLogin = async (userData) => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, message: data.message || 'Invalid credentials' };
    }
  } catch (error) {
    console.error('Error during login:', error);
    return { success: false, message: 'Something went wrong' };
  }
};
