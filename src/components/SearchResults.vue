<script setup>
import { ref, onUpdated } from 'vue'

var props=defineProps({
	id: { type: String},
	results: { type: Array},
})

const emit=defineEmits(['setObserver']);

onUpdated(() => {
	emit("setObserver",props.id);
	// console.log("SetObserver von SearchResults", props.id);
});


</script>

<template>
    <h2 class="text-2xl font-medium">{{ ("Trefferliste")}}</h2>
    <div v-for="(result, index) in results" :key="id + index" :id="id + '-' +index" class="my-4">
        <SearchResult :description="result.description" :url="result.url"></SearchResult>
    </div>
</template>