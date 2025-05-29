<script setup>
import { Howl } from 'howler';
const { gtag } = useGtag();

useHead({
    script: [
        {
            src: "https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js",
            crossorigin: "anonymous",
        },
        {
            src: "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js",
            crossorigin: "anonymous",
        },
        {
            src: "https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js",
            crossorigin: "anonymous",
        },
        {
            src: "https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js",
            crossorigin: "anonymous",
        },
    ],
});

// State variables
const videoEl = ref(null);
const canvasEl = ref(null);

let webcamRunning = ref(false);
let hands = null;
let face = null;
let camera = null;
let canvasCtx = null;
let isVideoHidden = ref(false);
let isSoundOn = ref(true);
let ambienceSound = null;

// Hand tracking state
let rightHandActive = ref(false);
let leftHandActive = ref(false);

// Countdown state
let countdownActive = ref(false);
let countdownNumber = ref(3);

// Initialize MediaPipe Hands when component is mounted
onMounted(async () => {
    try {
        await initializeLayout();
        await initWebcam();
        await initMediaPipeHands();
        await initMediaPipeFace();
        startHandTracking();
        initAudio();
    } catch (error) {
        console.error("Error initializing MediaPipe from hell:", error);
    }
});

// Keep canvas size in sync with video display size
function updateCanvasSize() {
    if (canvasEl.value && videoEl.value) {
        const rect = videoEl.value.getBoundingClientRect();
        canvasEl.value.width = rect.width;
        canvasEl.value.height = rect.height;
    }
}

// Initialize and properly set element sizes
function initializeLayout() {
    updateCanvasSize();
    
    // Update layout when window is resized
    window.addEventListener('resize', () => {
        updateCanvasSize();
    });
}

// Initialize audio
function initAudio() {
    ambienceSound = new Howl({
        src: ['/audio/ambience.mp3'],
        loop: true,
        volume: 0.5,
        autoplay: true,
        onplayerror: () => {
            isSoundOn.value = false; // Autoplay blocked
        }
    });
}

// Initialize webcam with constraints
async function initWebcam() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: { ideal: 1920 },
                height: { ideal: 1080 },
                facingMode: 'user'
            }
        });
        
        if (videoEl.value) {
            videoEl.value.srcObject = stream;
            
            return new Promise((resolve) => {
                videoEl.value.onloadedmetadata = () => {
                    updateCanvasSize();
                    resolve(videoEl.value);
                };
            });
        }
    } catch (error) {
        console.error('Error accessing webcam:', error);
        throw error;
    }
}

// Initialize MediaPipe Hands
async function initMediaPipeHands() {
    hands = new Hands({
        locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
        }
    });
    
    hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.7
    });
    
    await hands.initialize();
    hands.onResults(onResults);
    
    // Set up canvas context
    if (canvasEl.value) {
        canvasCtx = canvasEl.value.getContext("2d");
    }
}

// Initialize MediaPipe Face Landmarker
async function initMediaPipeFace() {
    face = new FaceMesh({
        locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
        }
    });
    
    face.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
    });
    
    face.onResults(onFaceResults);
}

// Start hand tracking with camera
function startHandTracking() {
    if (!hands || !videoEl.value) return;
    
    camera = new Camera(videoEl.value, {
        onFrame: async () => {
            await hands.send({image: videoEl.value});
        },
        width: 1920,
        height: 1080
    });
    
    camera.start();
    webcamRunning.value = true;
}


// Draw hand landmarks with dynamic sizing and colors
function drawLandmarks(landmarks, isLeft) {
    if (!canvasCtx || !canvasEl.value || !videoEl.value) return;
    
    // Get video display dimensions and actual video dimensions
    const videoRect = videoEl.value.getBoundingClientRect();
    const videoActualWidth = videoEl.value.videoWidth;
    const videoActualHeight = videoEl.value.videoHeight;
    
    // Calculate scaling factors for object-cover
    const scaleX = videoRect.width / videoActualWidth;
    const scaleY = videoRect.height / videoActualHeight;
    const scale = Math.max(scaleX, scaleY);
    
    // Calculate offset for centering (object-cover centers the video)
    const scaledVideoWidth = videoActualWidth * scale;
    const scaledVideoHeight = videoActualHeight * scale;
    const offsetX = (videoRect.width - scaledVideoWidth) / 2;
    const offsetY = (videoRect.height - scaledVideoHeight) / 2;
    
    // Adjust line width and point size based on canvas dimension
    const canvasSize = Math.min(canvasEl.value.width, canvasEl.value.height);
    const lineWidth = Math.max(1, Math.min(1, canvasSize / 300));
    const pointSize = Math.max(3, Math.min(10, canvasSize / 250));
    
    // Define hand connections
    const connections = [
        [0, 1], [1, 2], [2, 3], [3, 4],
        [0, 5], [5, 6], [6, 7], [7, 8],
        [0, 9], [9, 10], [10, 11], [11, 12],
        [0, 13], [13, 14], [14, 15], [15, 16],
        [0, 17], [17, 18], [18, 19], [19, 20],
        [0, 5], [5, 9], [9, 13], [13, 17]
    ];
    
    // Choose different color for each hand
    const handColor = isVideoHidden.value ? '#000000' : '#FFFFFF';
    
    // Draw connections
    canvasCtx.lineWidth = lineWidth;
    canvasCtx.strokeStyle = handColor;
    
    connections.forEach(([i, j]) => {
        const start = landmarks[i];
        const end = landmarks[j];
        
        // Transform coordinates to match video display
        const startX = offsetX + (start.x * scaledVideoWidth);
        const startY = offsetY + (start.y * scaledVideoHeight);
        const endX = offsetX + (end.x * scaledVideoWidth);
        const endY = offsetY + (end.y * scaledVideoHeight);
        
        canvasCtx.beginPath();
        canvasCtx.moveTo(startX, startY);
        canvasCtx.lineTo(endX, endY);
        canvasCtx.stroke();
    });
    
    // Draw landmarks with special colors for fingertips
    landmarks.forEach((landmark, index) => {
        let pointColor = handColor;
        
        // Transform coordinates to match video display
        const x = offsetX + (landmark.x * scaledVideoWidth);
        const y = offsetY + (landmark.y * scaledVideoHeight);
        
        canvasCtx.fillStyle = pointColor;
        canvasCtx.beginPath();
        canvasCtx.arc(x, y, pointSize * 1.2, 0, 2 * Math.PI);
        canvasCtx.fill();
    });
}

function onFaceResults(results) {
    if (!isVideoHidden.value || !canvasCtx || !canvasEl.value) return;
    
    if (results.multiFaceLandmarks) {
        for (const landmarks of results.multiFaceLandmarks) {
            drawConnectors(canvasCtx, landmarks, FACEMESH_TESSELATION,
                         {color: '#C0C0C070', lineWidth: 1});
            drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_EYE, {color: '#000'});
            drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_EYE, {color: '#000'});
            drawConnectors(canvasCtx, landmarks, FACEMESH_FACE_OVAL, {color: '#E0E0E0'});
            drawConnectors(canvasCtx, landmarks, FACEMESH_LIPS, {color: '#E0E0E0'});
        }
    }
}

// Process hand tracking results
async function onResults(results) {
    if (!canvasCtx || !canvasEl.value) return;
    
    // Clear canvas
    canvasCtx.clearRect(0, 0, canvasEl.value.width, canvasEl.value.height);
    
    // Make sure canvas size matches video display
    if (videoEl.value) {
        const rect = videoEl.value.getBoundingClientRect();
        if (canvasEl.value.width !== rect.width || 
            canvasEl.value.height !== rect.height) {
            updateCanvasSize();
        }
    }
    
    // Reset tracking flags
    rightHandActive.value = false;
    leftHandActive.value = false;

      // If video is hidden, process face landmarks
      if (isVideoHidden.value && face && videoEl.value) {
        await face.send({image: videoEl.value});
    }
    
    // Process hand landmarks if detected
    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        for (let handIndex = 0; handIndex < results.multiHandLandmarks.length; handIndex++) {
            const landmarks = results.multiHandLandmarks[handIndex];
            const handedness = results.multiHandedness[handIndex].label;
            const isLeftHand = handedness === 'Left';
            
            // Draw the hand landmarks
            drawLandmarks(landmarks, isLeftHand);
            
            if (!isLeftHand) {
                rightHandActive.value = true;
            } else {
                leftHandActive.value = true;
            }
        }
    }
}

// Check if webcam access is supported
const hasGetUserMedia = () => !!navigator.mediaDevices?.getUserMedia;

function toggleVideoVisibility() {
    isVideoHidden.value = !isVideoHidden.value;
}

// Toggle sound
function toggleSound() {
    if (!ambienceSound) return;
    
    isSoundOn.value = !isSoundOn.value;
    isSoundOn.value ? ambienceSound.play() : ambienceSound.pause();
}

async function downloadSnapshot() {
    if (!canvasEl.value || !canvasCtx || !videoEl.value) {
        console.warn("Canvas or video not available for snapshot");
        return;
    }

    // Track with gtag
    gtag('event', 'file_download', {
        file_name: `koha-mediapipe-from-hell-${new Date().toISOString()}.png`,
        file_extension: 'png'
    });

    // Start countdown
    countdownActive.value = true;
    countdownNumber.value = 3;

    // Countdown timer
    for (let i = 3; i > 0; i--) {
        countdownNumber.value = i;
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    countdownActive.value = false;

    try {
        // Create temporary canvas for the snapshot content
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = canvasEl.value.width;
        tempCanvas.height = canvasEl.value.height;
        const tempCtx = tempCanvas.getContext("2d");

        if (tempCtx) {
            // Draw video if visible
            if (!isVideoHidden.value && videoEl.value.readyState >= 2) {
                tempCtx.drawImage(
                    videoEl.value,
                    0,
                    0,
                    tempCanvas.width,
                    tempCanvas.height,
                );
            }

            // Draw hand tracking overlay
            tempCtx.drawImage(canvasEl.value, 0, 0);
            
            // Convert canvas to data URL
            const snapshotDataURL = tempCanvas.toDataURL("image/png");

            // Load and modify SVG
            const svgResponse = await fetch('/images/snapshot_banner.svg');
            const svgText = await svgResponse.text();
            
            // Replace the [Snapshot] element with an image element
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
            const snapshotElement = svgDoc.querySelector('#\\[Snapshot\\]');
            
            if (snapshotElement) {
                // Create a clipping path to constrain the image
                const defs = svgDoc.querySelector('defs') || svgDoc.createElementNS('http://www.w3.org/2000/svg', 'defs');
                if (!svgDoc.querySelector('defs')) {
                    svgDoc.documentElement.insertBefore(defs, svgDoc.documentElement.firstChild);
                }
                
                const clipPath = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
                clipPath.setAttribute('id', 'snapshot-clip');
                
                const clipRect = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'rect');
                clipRect.setAttribute('x', '23');
                clipRect.setAttribute('y', '23');
                clipRect.setAttribute('width', '1874');
                clipRect.setAttribute('height', '1034');
                clipRect.setAttribute('rx', '8'); // Match the rounded corners from the path
                
                clipPath.appendChild(clipRect);
                defs.appendChild(clipPath);
                
                // Create image element to replace the snapshot placeholder
                const imageElement = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'image');
                imageElement.setAttribute('href', snapshotDataURL);
                imageElement.setAttribute('x', '23');
                imageElement.setAttribute('y', '23');
                imageElement.setAttribute('width', '1874');
                imageElement.setAttribute('height', '1034');
                imageElement.setAttribute('preserveAspectRatio', 'xMidYMid slice');
                imageElement.setAttribute('clip-path', 'url(#snapshot-clip)');
                
                // Replace the snapshot element
                snapshotElement.parentNode.replaceChild(imageElement, snapshotElement);
            }

            // Convert modified SVG to data URL
            const serializer = new XMLSerializer();
            const modifiedSvgString = serializer.serializeToString(svgDoc);
            const svgDataURL = `data:image/svg+xml;base64,${btoa(modifiedSvgString)}`;

            // Create final canvas with SVG dimensions
            const finalCanvas = document.createElement("canvas");
            finalCanvas.width = 1920;
            finalCanvas.height = 1080;
            const finalCtx = finalCanvas.getContext("2d");

            // Load and draw the modified SVG
            const img = new Image();
            img.onload = () => {
                finalCtx.drawImage(img, 0, 0);
                
                // Download the final image
                const link = document.createElement("a");
                const date = new Date();
                const timestamp = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}_${String(date.getHours()).padStart(2, "0")}-${String(date.getMinutes()).padStart(2, "0")}-${String(date.getSeconds()).padStart(2, "0")}`;
                
                link.download = `koha-mediapipe-from-hell-${timestamp}.png`;
                link.href = finalCanvas.toDataURL("image/png");
                
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            };
            
            img.src = svgDataURL;
        }
    } catch (error) {
        console.error("Error downloading snapshot:", error);
    }
}

onUnmounted(() => {
    webcamRunning.value = false;

    if (camera) {
        camera.stop();
    }

    if (videoEl.value && videoEl.value.srcObject) {
        const tracks = videoEl.value.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
    }

    if (ambienceSound) {
        ambienceSound.unload();
    }

    if (face) {
        face.close();
    }
    
    window.removeEventListener('resize', updateCanvasSize);
});
</script>

<template>
    <main class="relative h-[calc(100vh-16px)] border border-[#FAFAFA] bg-[#FFFFFF] rounded-xl flex flex-col justify-between">
        <header class="relative flex items-start m-2 gap-1">
            <div><NuxtLink to="/">#1: Media Pipe from hell</NuxtLink></div>
            <div class="text-inherit pl-3 rounded-br-[32px] rounded-tr-[32px]">⚡️</div> 
            <div>
                <div v-if="rightHandActive" class="cursor-pointer select-none text-inherit">✋🏼</div>
                <div v-if="leftHandActive" class="cursor-pointer select-none text-inherit">🤚🏽</div>
            </div>
            </header>
        <section class="absolute h-full w-full rounded-xl overflow-hidden">
            <video
                ref="videoEl"
                :class="{ 'opacity-0': isVideoHidden }"
                class="object-cover inset-0 w-full h-full transition-opacity duration-300"
                autoplay
                playsinline
            ></video>
            <canvas ref="canvasEl" class="w-full h-full"></canvas>
            
            <!-- Countdown overlay -->
            <div v-if="countdownActive" class="absolute inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div class="text-white text-9xl font-bold animate-pulse">
                    {{ countdownNumber }}
                </div>
            </div>
        </section>
        <footer class="relative m-2 flex gap-1">
            <div>Help</div>
            <NuxtLink to="/">
                <div class="hover:border-grey-200 transition-colors">
                    <IconMingcuteForkFill />
                </div>
            </NuxtLink>
            <div
                class="cursor-pointer select-none"
                :class="{ '!bg-gray-200': !isSoundOn }"
                @click="toggleSound"
            >
                {{ isSoundOn ? 'Sound on' : 'Sound off' }}
            </div>
            <div
                class="ml-auto cursor-pointer select-none"
                @click="downloadSnapshot"
            >
                Download Snapshot
            </div>
            <div
                class="cursor-pointer select-none"
                :class="{ '!bg-gray-200': isVideoHidden }"
                @click="toggleVideoVisibility"
            >
                Toggle Mirror
            </div>
        </footer>
    </main>
</template>

<style>
html,
body {
    @apply bg-[#F5F5F5] overscroll-none overflow-hidden;
}

body {
    @apply p-2;
}

header,
footer {
    @apply z-10;
}

header div,
footer div {
    @apply bg-white select-none text-grey-200 px-4 py-2 rounded h-full flex items-center justify-center;
}

header > div:last-child {
    @apply bg-none bg-transparent p-0 flex items-center justify-center gap-1 border-none ml-auto;
}

video,
canvas {
    z-index: 1;
    position: absolute;
    pointer-events: none;
    transform: rotateY(180deg);
    -webkit-transform: rotateY(180deg);
    -moz-transform: rotateY(180deg);
    top: 0;
    left: 0;
    transform: scaleX(-1);
}
</style>
