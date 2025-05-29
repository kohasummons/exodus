<script setup></script>
<template>
    <main class="relative h-[calc(100vh-16px)] border border-[#FAFAFA] bg-[#FFFFFF] rounded-xl">
        <header class="flex items-start m-2 gap-1">
            <div>
                <NuxtLink to="/">koha.wtf</NuxtLink>
            </div>
            <div>
                <NuxtLink to="/lab/media-pipe-from-hell">Lab</NuxtLink>
            </div>
            <div><span>🎮</span></div>
        </header>
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

header>div {
    @apply text-grey-200 border border-grey-100 px-4 py-2 rounded;
}

header>div:last-child {
    @apply text-inherit pl-3 rounded-br-[32px] rounded-tr-[32px];
}
</style>
