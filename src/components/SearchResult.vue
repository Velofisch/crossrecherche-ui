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
    <h3 class="text-xl font-medium"><a :href="url" target="_blank">{{ description[0] }}</a></h3>
    <p>{{ description[1] }}</p>
    <p>{{ description[2] }}</p>
</template>