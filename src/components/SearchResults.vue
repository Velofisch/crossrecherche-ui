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
    <h2 class="text-2xl font-medium">{{ ("Trefferliste")}}</h2>
    <div v-for="(result, index) in results" :key="id + index" :id="id + '-' +index" class="my-4">
        <SearchResult :description="result.description" :url="result.url"></SearchResult>
    </div>
</template>