<script setup>
const pane = ref();

onMounted(() => {
    pane.value.addEventListener('mousedown', (e) => {
        pane.value.classList.add('is-dragging');

        let l = pane.value.offsetLeft;
        let t = pane.value.offsetTop;

        let startX = e.pageX;
        let startY = e.pageY;

        const drag = (e) => {
            e.preventDefault();

            pane.value.style.left = `${l + e.pageX - startX}px`;
            pane.value.style.top = `${t + e.pageY - startY}px`;

            // console.log({ x: pane.value.style.left, y:pane.value.style.top });
        }

        const mouseup = () => {
            pane.value.classList.remove('is-dragging');

            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', mouseup);
        }

        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', mouseup);
    });
});
</script>

<template>
    <main class="relative flex flex-col items-center justify-center h-screen">
        <div ref="pane" class="fixed w-10 h-10 bg-black cursor-grab flex items-center justify-center">
            <p class="text-[#e6e6e6]"><span>+</span><span>_</span><span>+</span></p>
        </div>
        <section class="max-w-[600px] mx-auto flex flex-row items-center justify-center">
            <div class="mx-auto md:w-full w-1/2">
                <!-- <sphere /> -->
                <p class="text-sm text-[#5f5f5f]"><a href="https://x.com/kohawithstuff">
                    koha.wtf
                </a></p>
            </div>
            <div class="absolute bottom-12 flex flex-col items-center">
                
            </div>
        </section>
    </main>
</template>
<style>
html {
    @apply h-screen
}

span {
    font-weight: bold;
    opacity: 0.7;
    display: inline-block;
    animation: pulse 0.5s alternate infinite ease-in-out;
}

span:nth-child(odd) {
    animation-delay: 0.5s;
}


@keyframes pulse {
    to {
        transform: scale(0.8);
        opacity: 0.5;
    }
}

.is-dragging {
    background-color:rgb(16, 38, 235);
    cursor: grabbing;
}
</style>
