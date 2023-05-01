<script>
export default {
    name: "SearchResult",
    props: {
        "id": String,
        "resultNumber": Number,
        "description": Array,
        "url": String
    }
}

import { ref } from 'vue'

</script>

<template>
    <!-- <p :id="id" class="font-light mr-2 mt-1 pt-1 text-right">{{ resultNumber }}.</p> -->
    <div class="p-5 rounded-lg shadow bg-white">
        <h3 class="text-lg font-medium hover:text-gray-800">
            <a :href="url" target="_blank" class="hover:underline">
                <span v-html="description[0]"></span>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 inline ml-1" width="192" height="192" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><polyline points="216 100 216 40 156 40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline><line x1="144" y1="112" x2="216" y2="40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><path d="M184,144v64a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V80a8,8,0,0,1,8-8h64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path></svg>
            </a>
        </h3>
        <p v-html="description[1]"></p>
        <p v-html="description[2]"></p>
    </div>
</template>