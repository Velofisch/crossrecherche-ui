<script setup>
import { ref, onBeforeUpdate, onUpdated } from 'vue'

var props=defineProps({
	searchterm: { type: String},
	searchEngines: { type: Array},
})

var selectedTab = ref('entscheidsuche');

function selectTab(searchEngineId) {
    selectedTab.value = searchEngineId;
}

// If the active tab is deselected as search engine, select the first available tab
onBeforeUpdate((tab=selectedTab.value, ses=props.searchEngines) => {
		if (ses.filter(function(u) { return u.checked && u.id==tab}).length==0) {
			var l=ses.filter(function(u) { return u.checked})
			if (l.length>0){
			  selectTab(l[0].id);
			} 	
		}
});

const emit=defineEmits(['setObserver']);

// onUpdated(() => {
//	props.searchEngines.forEach(function(s){
//		if (s.observer && s.hitlist.length<s.hits && document.getElementById(s.id+"-"+(s.hitlist.length-2).toString())){
//			console.log("Sende set Observer", s.id);
//			emit("setObserver", document.getElementById(s.id+"-"+(s.hitlist.length-2).toString()), s, s.hitlist.length);
//		}
//	})
//});

function setObserver(id) {
	// console.log("empfange", id);
	props.searchEngines.filter(function(u) { return u.id==id}).forEach(function(s){
		if (s.observer && s.hitlist.length<s.hits && document.getElementById(s.id+"-"+(s.hitlist.length-2).toString())){
			console.log(s.id+"-"+(s.hitlist.length-2).toString()+" (weiterleiten)");
			emit("setObserver", document.getElementById(s.id+"-"+(s.hitlist.length-2).toString()), s, s.hitlist.length);
		}
	})

}
</script>


<template>
    <div class="tabs grid sm:grid-flow-col-dense overflow-x-auto">
        <div @click="selectTab(searchEngine.id)" v-for="searchEngine in searchEngines.filter(function(u) { return u.checked})" :key="'tab-' + searchEngine.id" :class="['tab', 'cursor-pointer', {'active': selectedTab === searchEngine.id}]">
            <a class="text-white text-sm font-medium uppercase hover:cursor-pointer">
                {{ searchEngine.name }}
                <template v-if="searchEngine.hits>=0">
                    ({{ searchEngine.hits}})
                </template>
                <template v-else>
                    <template v-if="searchEngine.searchterm != ''">
                        <svg class="animate-spin mx-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </template>
                </template>
            </a>
        </div>
    </div>
    <div class="overflow-scroll p-2 sm:p-8">
        <TabContent v-for="searchEngine in searchEngines.filter(function(u) { return u.checked})" :key="'tab-content-' + searchEngine.id" :selected="selectedTab === searchEngine.id" :class="[{'active': selectedTab === searchEngine.id}]">
            <SearchResults v-if="searchEngine.hits>0" :id="searchEngine.id" :results="searchEngine.hitlist" @setObserver="setObserver"></SearchResults>
            <SearchResults v-else :id="searchEngine.id" :results="[]" @setObserver="setObserver"></SearchResults>
            <div v-if="searchEngine.hits === 0">
                <p>
                    There is no result for the search term <span class="font-semibold">{{ searchEngine.searchterm }}</span> in this search engine.
                </p>
            </div>
            <div v-else-if="searchEngine.hits > searchEngine.hitsLoaded" class="flex flex-col items-center">
                <svg class="animate-spin p-4 h-20 w-20 text-gray-600 text-center" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span class="text-sm">Loading more results...</span>
            </div>
        </TabContent>
    </div>
</template>

<style scoped>
    .tab {
        @apply border border-gray-700 p-1 sm:p-2 bg-gray-500 hover:bg-gray-600;
    }
    .tab.active {
        @apply bg-gray-600;
    }
</style>
