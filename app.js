function showSection(sectionId) {
    const sections = document.querySelectorAll('main section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
        showSection('upload');
    } else {
        alert('Login failed!');
    }
}

async function upload() {
    const fileInput = document.getElementById('fileInput');
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
    });
    if (response.ok) {
        alert('Upload successful!');
    } else {
        alert('Upload failed!');
    }
}

function playAudio() {
    document.getElementById('audio').play();
}

function pauseAudio() {
    document.getElementById('audio').pause();
}

function stopAudio() {
    const audio = document.getElementById('audio');
    audio.pause();
    audio.currentTime = 0;
}