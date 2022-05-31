<script>
export default {
    name: "SearchResults",
    props: {
        "id": String,
        "results": Object
    }
}

import { ref } from 'vue'

</script>

<template>
    <h2 class="text-2xl font-medium">{{ ("Trefferliste")}}</h2>
    <div v-for="(result, index) in results" :key="id + index" class="my-4">
        <SearchResult :description="result.description" :url="result.url"></SearchResult>
    </div>
</template>