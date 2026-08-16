// ==========================================
// FIREBASE IMPORTS
// ==========================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

import {
    getDatabase,
    ref,
    set
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-database.js";


// ==========================================
// FIREBASE CONFIGURATION
// ==========================================

const firebaseConfig = {
    apiKey: "AIzaSyAR6eeBcnFm5igyUHRdXL3DqHjDpxuKtI",
    authDomain: "yadav-ji-dudh-wale.firebaseapp.com",
    databaseURL: "https://yadav-ji-dudh-wale-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "yadav-ji-dudh-wale",
    storageBucket: "yadav-ji-dudh-wale.firebasestorage.app",
    messagingSenderId: "56182173073",
    appId: "1:56182173073:web:cfbeeb56697921d89efe30"
};


// ==========================================
// INITIALIZE FIREBASE
// ==========================================

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


// ==========================================
// TEST FIREBASE CONNECTION
// ==========================================

const testRef = ref(database, "test");

set(testRef, {
    message: "Yadav Ji Dudh Wale connected successfully",
    time: new Date().toISOString()
})
.then(() => {
    console.log("Firebase connected successfully!");
})
.catch((error) => {
    console.error("Firebase error:", error);
});


// ==========================================
// MUSIC PLAYER
// ==========================================

// IMPORTANT:
// Your MP3 files are in the ROOT of GitHub repository.
// Therefore DO NOT use "songs/song1.mp3".

const songs = [
    {
        file: "song1.mp3",
        title: "Dudh Ke Vyapari",
        artist: "Tuntun Yadav, Shivani Singh",
        emoji: "🥛"
    },
    {
        file: "song2.mp3",
        title: "Yadav Ji Ke Dudh",
        artist: "Sharwan Yadav, Prabha Raj",
        emoji: "🐄"
    },
    {
        file: "song3.mp3",
        title: "Yadav Ji Ko Saiya Bana Lijiye",
        artist: "Puja Mahi, Rahul Raj",
        emoji: "❤️"
    },
    {
        file: "song4.mp3",
        title: "दुधवा में पानी जादव जी",
        artist: "Angad Ram Ojha, Kavita Yadav",
        emoji: "🔥"
    }
];


// ==========================================
// GET HTML ELEMENTS
// ==========================================

const audio = document.getElementById("audioPlayer");
const playButton = document.getElementById("playButton");
const nextButton = document.getElementById("nextButton");
const prevButton = document.getElementById("prevButton");

const songTitle = document.getElementById("songTitle");
const songArtist = document.getElementById("songArtist");
const album = document.querySelector(".album");


// ==========================================
// VARIABLES
// ==========================================

let currentSong = 0;
let playing = false;


// ==========================================
// CHECK AUDIO ELEMENT
// ==========================================

if (!audio) {
    console.error("ERROR: #audioPlayer was not found in index.html");
}

if (!playButton) {
    console.error("ERROR: #playButton was not found in index.html");
}


// ==========================================
// LOAD SONG
// ==========================================

function loadSong(index) {

    if (!audio) return;

    if (index < 0 || index >= songs.length) {
        index = 0;
    }

    currentSong = index;

    const song = songs[currentSong];

    // Set MP3 file
    audio.src = song.file;

    // Update title
    if (songTitle) {
        songTitle.textContent = song.title;
    }

    // Update artist
    if (songArtist) {
        songArtist.textContent = song.artist;
    }

    // Update album emoji
    if (album) {
        album.textContent = song.emoji;
    }

    // Prepare audio
    audio.load();

    console.log("Loaded:", song.file);
}


// ==========================================
// PLAY SONG
// ==========================================

function playSong() {

    if (!audio) return;

    audio.play()
        .then(() => {

            playing = true;

            if (playButton) {
                playButton.textContent = "⏸";
            }

            console.log("Playing:", songs[currentSong].file);

        })
        .catch((error) => {

            playing = false;

            if (playButton) {
                playButton.textContent = "▶";
            }

            console.error("Could not play audio:", error);

        });
}


// ==========================================
// PAUSE SONG
// ==========================================

function pauseSong() {

    if (!audio) return;

    audio.pause();

    playing = false;

    if (playButton) {
        playButton.textContent = "▶";
    }
}


// ==========================================
// PLAY / PAUSE BUTTON
// ==========================================

if (playButton && audio) {

    playButton.addEventListener("click", () => {

        if (playing) {

            pauseSong();

        } else {

            playSong();

        }

    });

}


// ==========================================
// NEXT SONG
// ==========================================

if (nextButton) {

    nextButton.addEventListener("click", () => {

        currentSong++;

        if (currentSong >= songs.length) {
            currentSong = 0;
        }

        loadSong(currentSong);
        playSong();

    });

}


// ==========================================
// PREVIOUS SONG
// ==========================================

if (prevButton) {

    prevButton.addEventListener("click", () => {

        currentSong--;

        if (currentSong < 0) {
            currentSong = songs.length - 1;
        }

        loadSong(currentSong);
        playSong();

    });

}


// ==========================================
// AUTOMATICALLY PLAY NEXT SONG
// ==========================================

if (audio) {

    audio.addEventListener("ended", () => {

        currentSong++;

        if (currentSong >= songs.length) {
            currentSong = 0;
        }

        loadSong(currentSong);
        playSong();

    });

}


// ==========================================
// AUDIO ERROR CHECK
// ==========================================

if (audio) {

    audio.addEventListener("error", () => {

        console.error(
            "ERROR: MP3 could not be loaded:",
            songs[currentSong].file
        );

    });

}


// ==========================================
// WHEN AUDIO STARTS
// ==========================================

if (audio) {

    audio.addEventListener("play", () => {

        playing = true;

        if (playButton) {
            playButton.textContent = "⏸";
        }

    });

}


// ==========================================
// WHEN AUDIO PAUSES
// ==========================================

if (audio) {

    audio.addEventListener("pause", () => {

        if (!audio.ended) {

            playing = false;

            if (playButton) {
                playButton.textContent = "▶";
            }

        }

    });

}


// ==========================================
// MILK BUTTON
// ==========================================

const milkButton = document.getElementById("milkButton");
const message = document.getElementById("message");

if (milkButton) {

    milkButton.addEventListener("click", () => {

        if (message) {

            message.textContent =
                "🥛 Doodh ready hai! Yadav Ji ko bulao 😎";

        }

    });

}


// ==========================================
// REAL-TIME CLOCK
// ==========================================

function updateClock() {

    const clock = document.getElementById("clock");

    if (!clock) return;

    const now = new Date();

    clock.textContent = now.toLocaleTimeString("en-IN", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });

}

updateClock();

setInterval(updateClock, 1000);


// ==========================================
// LOAD FIRST SONG
// ==========================================

loadSong(0);

console.log("Yadav Ji Dudh Wale music player loaded successfully!");
