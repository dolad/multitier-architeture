// register
export async function registerUser(data) {
    const response = await fetch('http://localhost:5002/api/authManagement/register', {
        method: "POST",
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    return await response.json();
}

// loginUser
export async function loginUser(data) {
    const response = await fetch(`http://localhost:5002/api/authManagement/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
    return await response.json();
}
