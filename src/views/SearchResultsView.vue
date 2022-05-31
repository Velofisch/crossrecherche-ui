<script setup>
import { ref } from 'vue'
var props=defineProps({
	searchterm: { type: String},
	searchEngines: { type: Array},
})

const selectedTab = ref('entscheidsuche');

function selectTab(searchEngineId) {
    selectedTab.value = searchEngineId;
}

</script>


<template>
    <div class="tabs grid grid-rows-1 grid-flow-col">
        <div v-for="searchEngine in searchEngines.filter(function(u) { return u.checked})" :key="'tab-' + searchEngine.id" :class="['tab', {'active': selectedTab === searchEngine.id}]">
            <a v-if="searchEngine.hits>0" class="text-white text-base font-medium uppercase hover:cursor-pointer" @click="selectTab(searchEngine.id)">{{ searchEngine.name }} ({{ searchEngine.hits}})</a>
            <a v-else class="text-white text-base font-medium uppercase hover:cursor-pointer" @click="selectTab(searchEngine.id)">{{ searchEngine.name }}</a>
        </div>
    </div>
    <div class="p-8">
        <TabContent v-for="searchEngine in searchEngines.filter(function(u) { return u.checked})" :key="'tab-content-' + searchEngine.id" :selected="selectedTab === searchEngine.id" :class="[{'active': selectedTab === searchEngine.id}]">
            <SearchResults v-if="searchEngine.hits>0" :id="searchEngine.id" :results="searchEngine.hitlist"></SearchResults>
        </TabContent>
    </div>
</template>

<style scoped>
    .tab {
        @apply border border-gray-700 py-2 px-4 bg-gray-500 hover:bg-gray-600;
    }
    .tab.active {
        @apply border border-gray-700 py-2 px-4 bg-gray-600;
    }
</style>
