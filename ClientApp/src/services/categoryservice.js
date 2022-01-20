export async function getCategories() {
    const response = await fetch('http://localhost:5002/api/category');
    return await response.json();
}

// loginUser
export async function getCategory() {
    const response = await fetch(`http://localhost:5002/api/authManagement/login`)
    return await response.json();
}