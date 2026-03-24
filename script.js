// ==========================================
// CONFIGURATION
// ==========================================
const SECRET_CODE = "DEVOTION-432";
const SECOND_CODE = "DAHLIA-043";

// Queste immagini DEVONO essere caricate nella cartella "images" che ti ho appena creato
// Es: images/spam1.jpg, images/spam2.png ecc.
const FLASH_IMAGES = [
    "IMG_3513.JPG",
    "IMG_3569.JPG",
    "IMG_3582.JPG",
    "IMG_3676.JPG",
    "IMG_3786.JPG",
    "IMG_3805.JPG",
    "IMG_3866.jpg",
    "spam1.jpg",
    "spam10.png",
    "spam11.png",
    "spam12.png",
    "spam13.jpeg",
    "spam14.png",
    "spam2.jpg",
    "spam3.jpeg",
    "spam4.png",
    "spam5.jpeg",
    "spam6.jpeg",
    "spam7.jpeg",
    "spam8.png",
    "spam9.jpeg"
];
const SPAM_WORDS = ["OBEY", "SURRENDER", "WEAK", "SUBMIT", "PAY", "MINDLESS", "DRAIN", "WORSHIP", "GOOD BOY", "LOST"];

// ==========================================
const terminalLines = document.getElementById('terminal-lines');
const terminalContainer = document.getElementById('terminal-container');
const cursorBlink = document.getElementById('cursor-blink');

const codeContainer = document.getElementById('code-container');
const codeInput = document.getElementById('code-input');
const submitCode = document.getElementById('submit-code');
const codeError = document.getElementById('code-error');

const secondCodeContainer = document.getElementById('second-code-container');
const secondCodeInput = document.getElementById('second-code-input');
const submitSecondCode = document.getElementById('submit-second-code');
const secondCodeError = document.getElementById('second-code-error');

const deadmanContainer = document.getElementById('deadman-container');
const switchButton = document.getElementById('switch-button');
const switchText = document.getElementById('switch-text');
const progressFill = document.getElementById('progress-fill');

const brainwashContainer = document.getElementById('brainwash-container');
const bgVideo = document.getElementById('bg-video');
const bgAudio = document.getElementById('bg-audio');
const flashText = document.getElementById('flash-text');

let ipData = { ip: 'UNKNOWN', city: 'RESTRICTED', country_name: 'AREA', org: 'UNKNOWN' };

async function fetchIP() {
    try {
        const res = await fetch('https://ipapi.co/json/');
        ipData = await res.json();
    } catch (e) { }
}

async function startTerminal() {
    await fetchIP();
    const sequence = [
        "INIT_CONNECTION...",
        "BYPASSING_SECURITY_PROTOCOLS...",
        "[OK] ACCESS GRANTED.",
        "IDENTIFYING_SUBJECT...",
        `IP_ADDRESS: ${ipData.ip}`,
        `LOCATION: ${ipData.city || 'UNKNOWN'}, ${ipData.country_name || 'UNKNOWN'}`,
        `ISP: ${ipData.org || 'UNKNOWN'}`,
        `OS: ${navigator.platform || 'UNKNOWN'}`,
        "SUBJECT_IDENTIFIED.",
        "AWAITING_CODE_INPUT..."
    ];

    let i = 0;
    const typeInterval = setInterval(() => {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        if (sequence[i].includes('SUBJECT_IDENTIFIED') || sequence[i].includes('AWAITING_CODE')) {
            line.classList.add('highlight');
        }
        line.innerHTML = `<span class="prompt">></span> ${sequence[i]}`;
        terminalLines.appendChild(line);
        i++;

        if (i >= sequence.length) {
            clearInterval(typeInterval);
            cursorBlink.classList.add('hidden');
            setTimeout(showCodeInput, 800);
        }
    }, 600);
}

function showCodeInput() {
    terminalContainer.classList.add('hidden');
    codeContainer.classList.remove('hidden');
    codeInput.focus();
}

function startBrainwash(isFrantic = false) {
    deadmanContainer.classList.add('hidden');
    codeContainer.classList.add('hidden');
    if (secondCodeContainer) secondCodeContainer.classList.add('hidden');
    brainwashContainer.classList.remove('hidden');

    // Play multimedia
    bgVideo.play().catch(e => console.log("Video autoplay blocked", e));
    bgAudio.volume = 1.0;
    bgAudio.play().catch(e => console.log("Audio autoplay blocked", e));

    if (isFrantic) {
        bgVideo.playbackRate = 2.0;
        bgAudio.playbackRate = 1.5;
        bgVideo.style.filter = "saturate(3) hue-rotate(180deg) invert(0.2)";
    }

    // Flash Text Routine
    const flashIntervalSpeed = isFrantic ? 400 : 1500;
    const flashTextInterval = setInterval(() => {
        flashText.innerText = SPAM_WORDS[Math.floor(Math.random() * SPAM_WORDS.length)];
        flashText.classList.remove('hidden');
        if (isFrantic) {
            flashText.style.color = "red";
            flashText.style.textShadow = "0 0 50px red";
        }
        setTimeout(() => flashText.classList.add('hidden'), isFrantic ? 300 : 1000 + Math.random() * 500);
    }, flashIntervalSpeed + Math.random() * (isFrantic ? 300 : 800));

    // Pop-up Overlapping Image Routine
    const spawnSpeed = isFrantic ? 500 : 1800;
    const brainwashInterval = setInterval(spawnPopupImage, spawnSpeed);

    // Interactivity during spam phase
    function triggerGlitchExplosion() {
        const burstCount = isFrantic ? 15 : 5;
        for (let j = 0; j < burstCount; j++) setTimeout(spawnPopupImage, j * 30);
        bgVideo.style.filter = isFrantic ? "invert(1) hue-rotate(90deg) contrast(3)" : "invert(1) hue-rotate(90deg) contrast(2)";
        clearTimeout(brainwashContainer.glitchTimeout);
        brainwashContainer.glitchTimeout = setTimeout(() => {
            if (isFrantic) {
                bgVideo.style.filter = "saturate(3) hue-rotate(180deg) invert(0.2)";
            } else {
                bgVideo.style.filter = "none";
            }
        }, 150);
    }

    // Remove old listeners to prevent duplicates if restarting
    if (brainwashContainer._glitchHandler) {
        brainwashContainer.removeEventListener('mousedown', brainwashContainer._glitchHandler);
        brainwashContainer.removeEventListener('touchstart', brainwashContainer._touchHandler);
    }

    brainwashContainer._glitchHandler = triggerGlitchExplosion;
    brainwashContainer._touchHandler = (e) => { e.preventDefault(); triggerGlitchExplosion(); };

    brainwashContainer.addEventListener('mousedown', brainwashContainer._glitchHandler);
    brainwashContainer.addEventListener('touchstart', brainwashContainer._touchHandler, { passive: false });

    // 1 minute timer for Phase 1
    if (!isFrantic) {
        setTimeout(() => {
            clearInterval(brainwashInterval);
            clearInterval(flashTextInterval);
            brainwashContainer.classList.add('hidden');
            secondCodeContainer.classList.remove('hidden');
            bgAudio.volume = 0.3; // lower volume during paywall
            if (window.lucide) window.lucide.createIcons();
        }, 60000); // 60 seconds
    }

    try { document.documentElement.requestFullscreen(); } catch (e) { }
}

function spawnPopupImage() {
    if (FLASH_IMAGES.length === 0) return;
    const imgEl = document.createElement('img');
    imgEl.src = "images/" + encodeURIComponent(FLASH_IMAGES[Math.floor(Math.random() * FLASH_IMAGES.length)]);
    imgEl.className = 'popup-image';

    const size = 15 + Math.random() * 25; // 15% to 40% screen width
    const left = Math.random() * (100 - size);
    const top = Math.random() * (100 - size);
    const rotation = (Math.random() - 0.5) * 50;

    imgEl.style.width = `${size}vw`;
    imgEl.style.left = `${left}vw`;
    imgEl.style.top = `${top}vh`;
    imgEl.style.transform = `rotate(${rotation}deg) scale(0)`;
    imgEl.style.opacity = '1';

    brainwashContainer.appendChild(imgEl);

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            imgEl.style.transform = `rotate(${rotation}deg) scale(1)`;
        });
    });

    setTimeout(() => {
        imgEl.style.opacity = '0';
        imgEl.style.transform = `rotate(${rotation + (Math.random() > 0.5 ? 20 : -20)}deg) scale(1.15) translateY(50px)`;
        setTimeout(() => imgEl.remove(), 1000);
    }, 7000);
}

submitCode.addEventListener('click', () => {
    const val = codeInput.value.trim().toUpperCase();
    if (val === SECRET_CODE.toUpperCase()) {
        if (bgVideo.paused) { bgVideo.play().catch(() => { }); }
        if (bgAudio.paused) { bgAudio.play().catch(() => { }); }
        bgAudio.volume = 0; // Muted during hold step, will pump to 1.0 in startBrainwash

        showDeadmanSwitch();
    } else {
        codeError.classList.remove('hidden');
        codeInput.value = '';
        setTimeout(() => codeError.classList.add('hidden'), 2000);
    }
});

codeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') submitCode.click();
});

if (submitSecondCode) {
    submitSecondCode.addEventListener('click', () => {
        const val = secondCodeInput.value.trim().toUpperCase();
        if (val === SECOND_CODE.toUpperCase()) {
            startBrainwash(true); // START FRANTIC PHASE 2
        } else {
            secondCodeError.classList.remove('hidden');
            secondCodeInput.value = '';
            setTimeout(() => secondCodeError.classList.add('hidden'), 2000);
        }
    });

    secondCodeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') submitSecondCode.click();
    });
}

function showDeadmanSwitch() {
    codeContainer.classList.add('hidden');
    deadmanContainer.classList.remove('hidden');
}

// Web Audio API for Hold Sound
let audioCtx;
let holdOscillator;
let holdGainNode;

function startHoldAudio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    holdOscillator = audioCtx.createOscillator();
    holdGainNode = audioCtx.createGain();

    holdOscillator.type = 'sawtooth';
    holdOscillator.frequency.setValueAtTime(50, audioCtx.currentTime);
    holdOscillator.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 10);

    holdGainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    holdGainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.5);
    holdGainNode.gain.linearRampToValueAtTime(1.0, audioCtx.currentTime + 9.5);

    holdOscillator.connect(holdGainNode);
    holdGainNode.connect(audioCtx.destination);
    holdOscillator.start();
}

function stopHoldAudio() {
    if (holdGainNode && holdOscillator) {
        try {
            // Absolute instant silence
            holdGainNode.gain.setValueAtTime(0, audioCtx.currentTime);
            holdOscillator.stop();
            holdOscillator.disconnect();
            holdGainNode.disconnect();
        } catch (e) {
            console.log("Audio stop error", e);
        }
    }
}

// Deadman Switch Logic
let holdTimer = null;
let holdStartTime = null;
let isHolding = false;
const HOLD_DURATION = 10000; // 10 seconds

function startHold(e) {
    if (e.cancelable) e.preventDefault();
    if (isHolding) return;

    isHolding = true;
    startHoldAudio();
    holdStartTime = Date.now();
    switchText.innerText = "HOLDING...";
    switchButton.style.borderColor = "var(--term-accent)";

    function updateProgress() {
        if (!isHolding) return;

        const elapsed = Date.now() - holdStartTime;
        const progress = Math.min((elapsed / HOLD_DURATION) * 100, 100);
        progressFill.style.height = `${progress}%`;

        if (progress >= 100) {
            isHolding = false;
            switchText.innerText = "ACCESS GRANTED";
            setTimeout(startBrainwash, 1000);
        } else {
            holdTimer = requestAnimationFrame(updateProgress);
        }
    }

    holdTimer = requestAnimationFrame(updateProgress);
}

function endHold(e) {
    if (e && e.cancelable) e.preventDefault();
    if (!isHolding) return;

    isHolding = false;
    stopHoldAudio();
    cancelAnimationFrame(holdTimer);

    if (progressFill.style.height !== "100%") {
        progressFill.style.height = "0%";
        switchText.innerText = "HOLD TO SUBMIT";
        switchButton.style.borderColor = "rgba(255, 176, 0, 0.2)";
    }
}

switchButton.addEventListener('mousedown', startHold);
switchButton.addEventListener('mouseup', endHold);
switchButton.addEventListener('mouseleave', endHold);
switchButton.addEventListener('touchstart', startHold, { passive: false });
switchButton.addEventListener('touchend', endHold);

startTerminal();
