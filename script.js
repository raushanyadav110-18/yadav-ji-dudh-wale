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
// YADAV JI DUDH WALE - MUSIC PLAYER
// ==========================================

const songs = [
    {
        file: "songs/song1.mp3",
        title: "Dudh Ke Vyapari",
        artist: "Tuntun Yadav, Shivani Singh",
        emoji: "🥛"
    },
    {
        file: "songs/song2.mp3",
        title: "Yadav Ji Ke Dudh",
        artist: "Sharwan Yadav, Prabha Raj",
        emoji: "🐄"
    },
    {
        file: "songs/song3.mp3",
        title: "Yadav Ji Ko Saiya Bana Lijiye",
        artist: "Puja Mahi, Rahul Raj",
        emoji: "❤️"
    },
    {
        file: "songs/song4.mp3",
        title: "दुधवा में पानी जादव जी",
        artist: "Angad Ram Ojha, Kavita Yadav",
        emoji: "🔥"
    }
];


// ==========================================
// ELEMENTS
// ==========================================

const audio = document.getElementById("audioPlayer");
const playButton = document.getElementById("playButton");
const nextButton = document.getElementById("nextButton");
const prevButton = document.getElementById("prevButton");

const songTitle = document.getElementById("songTitle");
const songArtist = document.getElementById("songArtist");
const album = document.querySelector(".album");

let currentSong = -1;
let playing = false;


// ==========================================
// CHECK REQUIRED MUSIC ELEMENTS
// ==========================================

if (!audio) {
    console.error("Audio element #audioPlayer not found.");
}

if (!playButton) {
    console.error("Play button #playButton not found.");
}


// ==========================================
// LOAD SONG
// ==========================================

function loadSong(index, autoPlay = false) {

    if (!audio || !songs[index]) return;

    currentSong = index;

    audio.src = songs[currentSong].file;

    if (songTitle) {
        songTitle.textContent = songs[currentSong].title;
    }

    if (songArtist) {
        songArtist.textContent = songs[currentSong].artist;
    }

    if (album) {
        album.textContent = songs[currentSong].emoji;
    }

    if (autoPlay) {

        audio.play()
            .then(() => {

                playing = true;

                if (playButton) {
                    playButton.textContent = "⏸";
                }

            })
            .catch((error) => {

                playing = false;

                if (playButton) {
                    playButton.textContent = "▶";
                }

                console.error("Audio play error:", error);

            });
    }
}


// ==========================================
// RANDOM SONG
// ==========================================

function randomSong() {

    let next;

    do {

        next = Math.floor(Math.random() * songs.length);

    } while (
        songs.length > 1 &&
        next === currentSong
    );

    loadSong(next, true);
}


// ==========================================
// NEXT SONG
// ==========================================

function nextSong() {

    if (songs.length === 0) return;

    let next = (currentSong + 1) % songs.length;

    loadSong(next, true);
}


// ==========================================
// PREVIOUS SONG
// ==========================================

function previousSong() {

    if (songs.length === 0) return;

    if (currentSong <= 0) {

        currentSong = songs.length - 1;

    } else {

        currentSong--;

    }

    loadSong(currentSong, true);
}


// ==========================================
// PLAY / PAUSE
// ==========================================

if (playButton && audio) {

    playButton.addEventListener("click", () => {

        if (!playing) {

            // No song selected yet
            if (currentSong === -1) {

                randomSong();

            } else {

                audio.play()
                    .then(() => {

                        playing = true;
                        playButton.textContent = "⏸";

                    })
                    .catch((error) => {

                        console.error("Audio play error:", error);

                    });
            }

        } else {

            audio.pause();

            playing = false;

            playButton.textContent = "▶";
        }

    });

}


// ==========================================
// NEXT BUTTON
// ==========================================

if (nextButton) {

    nextButton.addEventListener("click", () => {

        nextSong();

    });

}


// ==========================================
// PREVIOUS BUTTON
// ==========================================

if (prevButton) {

    prevButton.addEventListener("click", () => {

        previousSong();

    });

}


// ==========================================
// AUTO NEXT SONG
// ==========================================

if (audio) {

    audio.addEventListener("ended", () => {

        nextSong();

    });

}


// ==========================================
// RESET PLAY BUTTON WHEN PAUSED
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

    clock.textContent =
        now.toLocaleTimeString("en-IN", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true
        });

}

updateClock();

setInterval(updateClock, 1000);