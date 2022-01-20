export async function createJob(data) {
    const response = await fetch('http://localhost:5002/api/job', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      });
    return await response.json();
}

// loginUser
export async function getJobs() {
    const response = await fetch(`/api/jobs`)
    return await response.json();
}

export async function loadUserJob(data) {
    const response = await fetch(`http://localhost:5002/api/job/user`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
    return await response.json();
}

export async function markJobAsComplete(data) {
    const response = await fetch(`http://localhost:5002/api/job/complete`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      });
    return await response.json();
}