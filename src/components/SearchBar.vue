

<template>
    <div class="flex flex-col w-full sm:w-2/3 gap-2 sm:gap-4">
        <div class="w-full flex">
            <input id="searchterm" type="text" placeholder="Search term" v-on:keyup.enter="onSuche($event)" v-model="searchterm" class="w-full px-4 py-2 text-xl font-medium border border-gray-500 focus:ring-gray-500 focus:border-gray-500">
            <button type="button" v-on:click="onSuche($event)" class="flex-shrink-0 inline-flex items-center gap-4 px-4 py-2 text-base font-medium text-gray-900 bg-white border-y border-r border-gray-500 hover:bg-gray-200 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><circle cx="116" cy="116" r="84" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></circle><line x1="175.4" y1="175.4" x2="224" y2="224" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line></svg>
            </button>
        </div>
        <div>
            <details>
                <summary>Advanced search</summary>
                <fieldset class="flex w-full gap-4 sm:gap-8 pt-3">
                    <div>
                        <legend class="mb-4 text-gray-700 text-sm font-medium uppercase whitespace-nowrap">Search in:</legend>
                    </div>
                    <div class="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-8 gap-y-1 sm:gap-y-4">
                        <div v-for="searchEngine in searchEngines" :key="searchEngine.id" class="relative flex justify-left">
                            <div class="h-5">
                                <input v-on:click="onSuche($event)" :id="searchEngine.id" :aria-describedby="searchEngine.id + '-description'" :name="searchEngine.id" type="checkbox" :checked="searchEngine.defaultCheckedState" class="focus:ring-gray-200 sm:h-6 sm:w-6 text-gray-900 border-gray-300 checked:bg-gray-200">
                            </div>
                            <div class="ml-2 sm:ml-3">
                                <label :for="searchEngine.id" class="text-gray-700 text-sm font-medium uppercase">{{ searchEngine.name }}</label>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </details>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
    
export default {
  name: "SearchBar",
  props: {
    "searchterm": String,
    "searchEngines": Array
  },
  setup(props, context){
  	const onSuche = (event) => {
    	context.emit("onSearch", props.searchterm);
  	}
  	return {
  		onSuche
  	}
  }
}

</script>



