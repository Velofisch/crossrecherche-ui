<script setup>
import { ref, onUpdated, onMounted } from 'vue'

var props=defineProps({
	id: { type: String},
	results: { type: Array},
})

const emit=defineEmits(['setObserver']);

onUpdated(() => {
	if(props.results.length>9){
		console.log(props.id+"-"+(props.results.length-2).toString()+" (senden-u)");
		emit("setObserver",props.id);
	}
	else{
		console.log(props.id+" (updated noch ohne Daten)");
	}
});

onMounted(() => {
	if(props.results.length>9){
		console.log(props.id+"-"+(props.results.length-2).toString()+" (senden-u)");
		emit("setObserver",props.id);
	}
	else{
		console.log(props.id+" (mounted noch ohne Daten)");
	}
});




</script>

<template>
    <div class="grid grid-cols-[minmax(1em,5%)_auto] gap-4">
        <SearchResult v-for="(result, index) in results" :key="id + index" :id="id + '-' +index" class="search-results-counter-reset my-2 sm:my-4" :resultNumber="index + 1" :description="result.description" :url="result.url"></SearchResult>
    </div>
</template>