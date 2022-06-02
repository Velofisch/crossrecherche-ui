<script>
export default {
    name: "SearchResult",
    props: {
        "description": Array,
        "url": String
    }
}

import { ref } from 'vue'

</script>

<template>
    <h3 class="text-xl font-medium"><a :href="url" target="_blank" v-html="description[0]"></a></h3>
    <p v-html="description[1]"></p>
    <p v-html="description[2]"></p>
</template>