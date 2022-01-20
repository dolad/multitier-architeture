export async function getSkills() {
    const response = await fetch('http://localhost:5002/api/skill');
    return await response.json();
}

// loginUser
export async function createSkill() {
    const response = await fetch(`/api/jobs`);
    console.log(response);
    return await response.json();
}