<template>
    <ClientOnly v-if="!colorMode?.forced">
        <UButton :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'" color="neutral" variant="ghost"
            @click="isDark = !isDark" />

        <div class="text-4xl text-primary">hi how are you</div>
        <template #fallback>
            <div class="text-4xl text-red-500">hi how are you</div>
        </template>
    </ClientOnly>
</template>

<script setup>
const colorMode = useColorMode()

const isDark = computed({
    get() {
        return colorMode.value === 'dark'
    },
    set(_isDark) {
        colorMode.preference = _isDark ? 'dark' : 'light'
    }
})
</script>

<style>
/* Tailwind CSS should be imported globally in your project */
</style>