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
			// console.log("Sende set Observer", s.id);
			emit("setObserver", document.getElementById(s.id+"-"+(s.hitlist.length-2).toString()), s, s.hitlist.length);
		}
	})

}
</script>


<template>
    <div class="tabs grid grid-rows-1 grid-flow-col">
        <div @click="selectTab(searchEngine.id)" v-for="searchEngine in searchEngines.filter(function(u) { return u.checked})" :key="'tab-' + searchEngine.id" :class="['tab', {'active': selectedTab === searchEngine.id}]">
            <a v-if="searchEngine.hits>=0" class="text-white text-base font-medium uppercase hover:cursor-pointer">{{ searchEngine.name }} ({{ searchEngine.hits}})</a>
            <a v-else class="text-white text-base font-medium uppercase hover:cursor-pointer">{{ searchEngine.name }}</a>
        </div>
    </div>
    <div class="overflow-scroll p-8">
        <TabContent v-for="searchEngine in searchEngines.filter(function(u) { return u.checked})" :key="'tab-content-' + searchEngine.id" :selected="selectedTab === searchEngine.id" :class="[{'active': selectedTab === searchEngine.id}]">
            <SearchResults v-if="searchEngine.hits>0" :id="searchEngine.id" :results="searchEngine.hitlist" @setObserver="setObserver"></SearchResults>
            <SearchResults v-else :id="searchEngine.id" :results="[]" @setObserver="setObserver"></SearchResults>            
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
