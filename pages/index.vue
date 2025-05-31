<script setup>
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
let isVideoHidden = ref(true);

// Initialize MediaPipe Hands when component is mounted
onMounted(async () => {
    try {
        await initializeLayout();
        await initWebcam();
        await initMediaPipeHands();
        await initMediaPipeFace();
        startHandTracking();
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
            await hands.send({ image: videoEl.value });
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
    const handColor = '#FF0000AD';

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
                { color: '#C0C0C070', lineWidth: 1 });
            drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_EYE, { color: '#000' });
            drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_EYE, { color: '#000' });
            drawConnectors(canvasCtx, landmarks, FACEMESH_FACE_OVAL, { color: '#E0E0E0' });
            drawConnectors(canvasCtx, landmarks, FACEMESH_LIPS, { color: '#E0E0E0' });
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

    // If video is hidden, process face landmarks
    if (isVideoHidden.value && face && videoEl.value) {
        await face.send({ image: videoEl.value });
    }

    // Process hand landmarks if detected
    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        for (let handIndex = 0; handIndex < results.multiHandLandmarks.length; handIndex++) {
            const landmarks = results.multiHandLandmarks[handIndex];
            const handedness = results.multiHandedness[handIndex].label;
            const isLeftHand = handedness === 'Left';

            // Draw the hand landmarks
            drawLandmarks(landmarks, isLeftHand);
        }
    }
}

// Check if webcam access is supported
const hasGetUserMedia = () => !!navigator.mediaDevices?.getUserMedia;

onUnmounted(() => {
    webcamRunning.value = false;

    if (camera) {
        camera.stop();
    }

    if (videoEl.value && videoEl.value.srcObject) {
        const tracks = videoEl.value.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
    }

    if (face) {
        face.close();
    }

    window.removeEventListener('resize', updateCanvasSize);
});
</script>
<template>
    <main
        class="relative h-[calc(100vh-16px)] border border-[#FAFAFA] bg-[#FFFFFF] rounded-xl flex flex-col justify-between">
        <header class="flex items-start m-2 gap-1">
            <div>
                <NuxtLink to="/">koha.wtf</NuxtLink>
            </div>
            <div class="cursor-pointer">
                <NuxtLink to="/lab/media-pipe-from-hell">Lab</NuxtLink>
            </div>
            <div><span>🎮</span></div>
        </header>
        <section class="absolute h-full w-full rounded-xl overflow-hidden">
            <video ref="videoEl" :class="{ 'opacity-0': isVideoHidden }"
                class="object-cover inset-0 w-full h-full transition-opacity duration-300" autoplay playsinline></video>
            <canvas ref="canvasEl" class="w-full h-full"></canvas>
        </section>
    </main>
</template>
<style>
html,
body {
    @apply bg-[#F5F5F5] overscroll-none;
}

body {
    @apply p-2;
}

header {
    @apply z-10;
}

header>div {
    @apply text-grey-200 border border-grey-100 px-4 py-2 rounded;
}

header>div:last-child {
    @apply text-inherit pl-3 rounded-br-[32px] rounded-tr-[32px];
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
