renderFeed()

const loBut = document.getElementById("logout");
loBut.addEventListener('click', logout);

function logout() {
    localStorage.clear();
    window.location.replace('./login.html')
}

async function renderFeed() {
    const feed = document.querySelector('section');
    feed.id = 'feed';
    
    const habits = await getAllHabits();

    if(habits.err){return}
    const renderHabit = postData => {
        const habit = document.createElement('div');
        // post.className = 'post';
        const name = document.createElement('h3');
        const target = document.createElement('p');
        const current = document.createElement('p');
        const streak = document.createElement('p');
        name.textContent = postData.name;
        target.textContent = "Target: " + postData.targetVal;
        current.textContent = "Current: " + postData.currentVal;
        streak.textContent = "Streak: " + postData.currentStreak;
        habit.appendChild(name);
        habit.appendChild(target);
        habit.appendChild(current);
        habit.appendChild(streak);
        feed.appendChild(habit);
    }
    habits.forEach(renderHabit);
}

async function getAllHabits(){
    try {
        const _id = localStorage.getItem('userID')
        const token = localStorage.getItem('token')
        const options = {
            headers: { 'Authorization': `Bearer ${token}`}
        }
        const response = await fetch('http://localhost:3000/habits', options);
        const data = await response.json();
        if(data.err){
            console.warn(data.err);
            logout();
        }
        return data;
    } catch (err) {
        console.log("error")
        console.warn(err);
    }
}
