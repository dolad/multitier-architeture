export async function createArtisan(data) {
    const response = await fetch('http://localhost:5002/api/artisan', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      });
    return await response.json();
}

// loginUser
export async function getArtisan() {
    try {
        const response = await fetch(`http://localhost:5002/api/artisan`);
        console.log(response.json);
        return await response.json();
        
    } catch (error) {
        console.log(error);
    }
}

export async function getSingleArtisan(id) {
    try {
        const response = await fetch(`http://localhost:5002/api/artisan/${id}`);
        return await response.json();
        
    } catch (error) {
        console.log(error);
    }
}

export async function getArtisanBySkills(data) {
    try {
        
        const response = await fetch(`http://localhost:5002/api/artisan/skills`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
          });
        return await response.json();
        
    } catch (error) {
        console.log(error);
    }
    
}

export async function getArtisanByLocation(data) {
    try {
        
        const response = await fetch(`http://localhost:5002/api/artisan/location`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
          });
        return await response.json();
        
    } catch (error) {
        console.log(error);
    }
    
}