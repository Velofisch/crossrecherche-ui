

<template>
    <div class="flex flex-col w-full sm:w-2/3 gap-4">
        <div class="w-full flex">
            <input id="searchterm" type="text" placeholder="Search term" v-on:keyup.enter="onSuche($event)" v-model="searchterm" class="w-full px-4 py-2 text-xl font-medium border border-gray-500 focus:ring-gray-500 focus:border-gray-500">
            <button type="button" v-on:click="onSuche($event)" class="flex-shrink-0 inline-flex items-center gap-4 px-4 py-2 text-base font-medium text-gray-900 bg-white border-y border-r border-gray-500 hover:bg-gray-200 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><circle cx="116" cy="116" r="84" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></circle><line x1="175.4" y1="175.4" x2="224" y2="224" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line></svg>
            </button>
        </div>
        <fieldset class="flex w-full gap-8">
            <div>
                <legend class="mb-4 text-gray-700 text-sm font-medium uppercase">Search in:</legend>
            </div>
            <div class="grid grid-flow-col grid-cols-2 grid-rows-2 gap-x-8 gap-y-4">
                <div v-for="searchEngine in searchEngines" :key="searchEngine.id" class="relative flex items-center justify-left">
                    <div class="h-5">
                        <input v-on:click="onSuche($event)" :id="searchEngine.id" :aria-describedby="searchEngine.id + '-description'" :name="searchEngine.id" type="checkbox" :checked="searchEngine.defaultCheckedState" class="focus:ring-gray-200 h-6 w-6 text-gray-900 border-gray-300 checked:bg-gray-200">
                    </div>
                    <div class="ml-3">
                        <label :for="searchEngine.id" class="text-gray-700 text-sm font-medium uppercase">{{ searchEngine.name }}</label>
                    </div>
                </div>
            </div>
        </fieldset>
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



