document.addEventListener('DOMContentLoaded', () => {
    // Background music
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.textContent = 'Pause Music';
        } else {
            bgMusic.pause();
            musicToggle.textContent = 'Play Music';
        }
    });

    // Floating hearts
    const floatingHearts = document.getElementById('floating-hearts');
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.textContent = '❤️';
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        heart.style.animationDuration = `${5 + Math.random() * 5}s`;
        floatingHearts.appendChild(heart);
    }

    // Countdown (assume anniversary date, replace with actual)
    const anniversaryDate = new Date('2026-01-01');
    const currentDate = new Date('2025-12-28');
    const daysLeft = Math.ceil((anniversaryDate - currentDate) / (1000 * 60 * 60 * 24));
    document.getElementById('countdown').textContent = `Days until our next anniversary: ${daysLeft}`;

    // Landing to main
    const heartButton = document.getElementById('heartButton');
    heartButton.addEventListener('click', () => {
        document.getElementById('landing').style.display = 'none';
        document.getElementById('main').style.display = 'block';
        bgMusic.play(); // Auto play on enter
    });

    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            document.getElementById(button.dataset.tab).classList.add('active');
        });
    });

    // Memories section
    const giftBox = document.getElementById('giftBox');
    const surpriseMessage = document.getElementById('surpriseMessage');
    const customForm = document.getElementById('customForm');
    const memoryList = document.getElementById('memoryList');
    const resetButton = document.getElementById('resetButton');

    let memories = JSON.parse(localStorage.getItem('memories')) || [
        'Sample memory: Our first date was magical!',
        'Another: That trip to the beach was unforgettable.'
    ];

    function renderMemories() {
        memoryList.innerHTML = '';
        memories.forEach(mem => {
            const li = document.createElement('li');
            li.textContent = mem;
            memoryList.appendChild(li);
        });
    }
    renderMemories();

    giftBox.addEventListener('click', () => {
        surpriseMessage.textContent = 'Surprise! I love you forever!';
        surpriseMessage.style.display = 'block';
        giftBox.style.display = 'none';
    });

    resetButton.addEventListener('click', () => {
        surpriseMessage.style.display = 'none';
        giftBox.style.display = 'block';
    });

    customForm.addEventListener('submit', e => {
        e.preventDefault();
        const msg = document.getElementById('customMessage').value;
        memories.push(msg);
        localStorage.setItem('memories', JSON.stringify(memories));
        renderMemories();
        customForm.reset();
    });

    // Notes section
    const noteForm = document.getElementById('noteForm');
    const noteList = document.getElementById('noteList');

    let notes = JSON.parse(localStorage.getItem('notes')) || [
        'Sweet message: You make my heart flutter every day!',
        'Note: Cant wait for our next adventure.'
    ];

    function renderNotes() {
        noteList.innerHTML = '';
        notes.forEach(note => {
            const li = document.createElement('li');
            li.textContent = note;
            noteList.appendChild(li);
        });
    }
    renderNotes();

    noteForm.addEventListener('submit', e => {
        e.preventDefault();
        const text = document.getElementById('noteText').value;
        notes.push(text);
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes();
        noteForm.reset();
    });

    // Videos section
    const videoForm = document.getElementById('videoForm');
    const videoList = document.getElementById('videoList');

    let videos = JSON.parse(localStorage.getItem('videos')) || []; 

    function renderVideos() {
        videoList.innerHTML = '';
        videos.forEach(base64 => {
            const video = document.createElement('video');
            video.src = base64;
            video.controls = true;
            video.width = 560;
            videoList.appendChild(video);
        });
    }
    renderVideos();

    videoForm.addEventListener('submit', e => {
        e.preventDefault();
        const file = document.getElementById('videoFile').files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const base64 = e.target.result;
                videos.push(base64);
                localStorage.setItem('videos', JSON.stringify(videos));
                renderVideos();
            };
            reader.readAsDataURL(file);
        }
        videoForm.reset();
    });

    // Images section
    const imageForm = document.getElementById('imageForm');
    const imageList = document.getElementById('imageList');

    let images = JSON.parse(localStorage.getItem('images')) || []; 

    function renderImages() {
        imageList.innerHTML = '';
        images.forEach(base64 => {
            const img = document.createElement('img');
            img.src = base64;
            img.alt = 'Saved image';
            img.style.width = '200px';
            imageList.appendChild(img);
        });
    }
    renderImages();

    imageForm.addEventListener('submit', e => {
        e.preventDefault();
        const file = document.getElementById('imageFile').files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const base64 = e.target.result;
                images.push(base64);
                localStorage.setItem('images', JSON.stringify(images));
                renderImages();
            };
            reader.readAsDataURL(file);
        }
        imageForm.reset();
    });
});