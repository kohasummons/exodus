<script setup lang="ts">
import {
    HandLandmarker,
    FilesetResolver,
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0";

useHead({
    script: [
        {
            src: "https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js",
            crossorigin: "anonymous",
            body: true,
        },
        {
            src: "https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js",
            crossorigin: "anonymous",
            body: true,
        },
    ],
});

// State variables
const videoEl = ref<HTMLVideoElement | null>(null);
const canvasEl = ref<HTMLCanvasElement | null>(null);

let webcamRunning = ref(false);
let handLandmarker = null;
let canvasCtx = null;
let lastVideoTime = -1;
let animationId = null;
let isVideoHidden = ref(false);
let handConnectorColor = ref("#FFFFFF");

// Initialize the hand landmarker when component is mounted
onMounted(async () => {
    try {
        // Initialize vision tasks
        const vision = await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
        );

        // Create hand landmarker
        handLandmarker = await HandLandmarker.createFromOptions(vision, {
            baseOptions: {
                modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
                delegate: "GPU",
            },
            numHands: 2,
        });

        await handLandmarker.setOptions({
            runningMode: "VIDEO",
            modelComplexity: 1,
            minDetectionConfidence: 0.7,
            minTrackingConfidence: 0.7,
        });

        // Set up canvas context
        if (canvasEl.value) {
            canvasCtx = canvasEl.value.getContext("2d");
        }

        // Check if webcam is supported
        if (hasGetUserMedia()) {
            // Enable webcam automatically
            await enableCam();
        } else {
            console.warn("getUserMedia() is not supported by your browser");
        }
    } catch (error) {
        console.error("Error initializing hand landmarker:", error);
    }
});

// Check if webcam access is supported
const hasGetUserMedia = () => !!navigator.mediaDevices?.getUserMedia;

function toggleVideoVisibility() {
    isVideoHidden.value = !isVideoHidden.value;
    handConnectorColor.value = isVideoHidden.value ? "#000000" : "#FFF";
}

function downloadSnapshot() {
    if (!canvasEl.value || !canvasCtx || !videoEl.value) {
        console.warn("Canvas or video not available for snapshot");
        return;
    }

    try {
        // Create temporary link element
        const link = document.createElement("a");

        // Get current date and time for filename
        const date = new Date();
        const timestamp = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}_${String(date.getHours()).padStart(2, "0")}-${String(date.getMinutes()).padStart(2, "0")}-${String(date.getSeconds()).padStart(2, "0")}`;

        // Set up download attributes
        link.download = `hand-tracking-${timestamp}.png`;

        // Create a temporary canvas for the combined image
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = canvasEl.value.width;
        tempCanvas.height = canvasEl.value.height;
        const tempCtx = tempCanvas.getContext("2d");

        if (tempCtx) {
            // If video is visible, draw the video frame first
            if (!isVideoHidden.value && videoEl.value.readyState >= 2) {
                // Since the video is already flipped in the CSS via transform: scaleX(-1),
                // we need to draw it normally here to match what the user sees
                tempCtx.drawImage(
                    videoEl.value,
                    0,
                    0,
                    tempCanvas.width,
                    tempCanvas.height,
                );
            }

            // The canvas is also flipped in the CSS, so we need to capture it as shown
            // Just directly copy the canvas as it appears
            tempCtx.drawImage(canvasEl.value, 0, 0);

            // Convert the combined canvas to data URL
            const dataURL = tempCanvas.toDataURL("image/png");
            link.href = dataURL;

            // Append to document, trigger click, and remove
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    } catch (error) {
        console.error("Error downloading snapshot:", error);
    }
}

// Enable the live webcam view and start detection
async function enableCam() {
    if (!handLandmarker) {
        console.log("Wait! handLandmarker not loaded yet.");
        return;
    }

    // Prevent multiple initializations
    if (webcamRunning.value) return;

    webcamRunning.value = true;

    // getUsermedia parameters
    const constraints = {
        video: {
            width: 1280,
            height: 720,
        },
    };

    // Activate the webcam stream
    await navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
            if (videoEl.value) {
                videoEl.value.srcObject = stream;

                // Remove any existing listeners to prevent duplicates
                videoEl.value.removeEventListener("loadeddata", predictWebcam);
                videoEl.value.addEventListener("loadeddata", predictWebcam);
            }
        })
        .catch((err) => {
            console.error("Error accessing webcam:", err);
            webcamRunning.value = false; // Reset the state on error
        });
}

async function predictWebcam() {
    // Guard clauses to ensure all requirements are met
    if (!videoEl.value || !canvasEl.value || !canvasCtx || !handLandmarker) {
        console.warn("Missing required elements for hand detection");
        return;
    }

    if (!webcamRunning.value) {
        console.log("Webcam detection stopped");
        return;
    }

    // canvasEl.value.style.width = videoEl.value.videoWidth + "px";
    // canvasEl.value.style.height = videoEl.value.videoHeight + "px";
    canvasEl.value.width = videoEl.value.videoWidth;
    canvasEl.value.height = videoEl.value.videoHeight;

    let startTimeMs = performance.now();
    let results;

    // Always detect landmarks regardless of video time - removed the time check
    results = handLandmarker.detectForVideo(videoEl.value, startTimeMs);
    lastVideoTime = videoEl.value.currentTime;

    // Draw results on canvas with a smoother approach
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasEl.value.width, canvasEl.value.height);

    if (results && results.landmarks && results.landmarks.length > 0) {
        for (const landmarks of results.landmarks) {
            // Draw hand connections with slightly thicker lines for stability
            drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
                color: handConnectorColor.value,
                lineWidth: 3,
            });
            // Draw landmarks with slightly larger size for stability
            drawLandmarks(canvasCtx, landmarks, {
                color: "#FF0000",
                lineWidth: 2,
                radius: 3,
            });
        }
    }

    canvasCtx.restore();

    if (webcamRunning.value) {
        animationId = requestAnimationFrame(predictWebcam);
    }
}

onUnmounted(() => {
    webcamRunning.value = false;

    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }

    // Stop media tracks
    if (videoEl.value && videoEl.value.srcObject) {
        const tracks = (videoEl.value.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
    }
});
</script>

<template>
    <main
        class="relative h-[calc(100vh-16px)] border border-[#FAFAFA] bg-[#FFFFFF] rounded-xl flex flex-col justify-between"
    >
        <header class="relative flex items-start m-2 gap-1">
            <div>
                <NuxtLink to="/">#1: Media Pipe from hell</NuxtLink>
            </div>
            <div><span>⚡️</span></div>
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
        </section>
        <footer class="relative m-2 flex gap-1">
            <div>Help</div>
            <NuxtLink to="/"
                ><div class="hover:border-grey-200 transition-colors">
                    <IconMingcuteForkFill /></div
            ></NuxtLink>
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
    @apply bg-white select-none text-grey-200 border border-grey-100 px-4 py-2 rounded h-full flex items-center justify-center;
}

header > div:last-child {
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
