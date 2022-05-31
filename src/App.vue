
<template>
  <div class="h-full flex flex-col justify-between border-2 border-gray-500 bg-white">
    <header class="bg-gray-100 p-16 flex items-start space-x-16 grow-0 text-gray-600">
      <RouterLink to="/"><img alt="Sci-Gate Logo" class="logo" src="@/assets/logo.svg" width="180" height="100" /></RouterLink>
      <SearchBar :searchterm="searchterm" :searchEngines="searchEngines" @clicked="onSearch"></SearchBar>
    </header>

    <main class="grow">
      <RouterView :searchterm="searchterm" :searchEngines="searchEngines"></RouterView>
    </main>
    <footer class="bg-gray-100 p-16 grow-0 flex flex-row justify-between">
      <span class="text-gray-700 text-sm font-medium uppercase">A running prototype</span>
      <div>
        <RouterLink to="/" class="text-gray-700 text-sm font-medium uppercase">Home</RouterLink> |
        <RouterLink to="/search" class="text-gray-700 text-sm font-medium uppercase">Search</RouterLink> |
        <RouterLink to="/about" class="text-gray-700 text-sm font-medium uppercase">About</RouterLink>
      </div>
    </footer>
  </div>
</template>

<style>
body {
  @apply bg-gray-300 min-h-screen;
}
#app {
  @apply container h-full mx-auto my-12;
}
</style>

<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import SearchBar from "@/components/SearchBar.vue"
import { createApp } from 'vue'
// import { createI18n } from 'vue-i18n'
import SearchResultsView from '@/views/SearchResultsView.vue'
import router from '@/router'


// const i18n = createI18n({
  // something vue-i18n options here ...
// })

const app = createApp({
  // something vue options here ...
})

// app.use(i18n);


var searchterm='';
const proxyurl='http://v2202109132150164038.luckysrv.de:8080/';

var searchEngines= ref([
        { id: "entscheidsuche", name: "Entscheidsuche", defaultCheckedState: true, checked: true, hitlist: [], hits: 0 },
        { id: "swisscovery", name: "Swisscovery", defaultCheckedState: true, checked: true, hitlist: [], hits: 0 },
        { id: "zora", name: "Zora", defaultCheckedState: true, checked: true, hitlist: [],  hits: 0 },
        { id: "boris", name: "Boris", defaultCheckedState: true, checked: true, hitlist: [],  hits: 0 }
      ]);


    
function process_hits(data,se){
	// Sending and receiving data in JSON format using POST method
	//
	  var xhr = new XMLHttpRequest();
	  var url = proxyurl;
	  xhr.open("POST", url, true);
	  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
      // window.alert("Sende Suchanfrage für "+se.id+" mit Data:\n" + data);
	  xhr.send(data);
	  xhr.onreadystatechange = function () {
    	if (xhr.readyState === 4 && xhr.status === 200) {
    	  // window.alert("process_hits: "+xhr.responseText);
    	  var result=JSON.parse(xhr.responseText)
    	  se.hits=result.hits;
          //window.alert("Antwort für "+se.id+": " + result.hits);    	  
    	  //this.searchEngines_result.result=result;
          //document.getElementById("tab-content-"+se.id).title="XY";
		}
      }
    }

function process_hitlists(data,se){
	// Sending and receiving data in JSON format using POST method
	//
	  var xhr = new XMLHttpRequest();
	  var url = proxyurl;
	  xhr.open("POST", url, true);
	  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
      // window.alert("Sende Suchanfrage für "+se.id+" mit Data:\n" + data);
	  xhr.send(data);
	  xhr.onreadystatechange = function () {
    	if (xhr.readyState === 4 && xhr.status === 200) {
    	  // window.alert("process_hit: "+xhr.responseText);
    	  var result=JSON.parse(xhr.responseText)
    	  se.hitlist=result.hitlist;  	  
    	  //this.searchEngines_result.result=result;
          //document.getElementById("tab-content-"+se.id).title="XY";
		}
      }
    }
    
function onSearch (sb) {
      router.push({ path: '/search' });
      if (sb !== '') {
        for (const s of searchEngines.value){
          if(document.getElementById(s.id).checked){
    		// window.alert("Suchanfrage mit "+this.searchterm+" an "+s.id);
            var data=JSON.stringify({"type": "search", "term": sb, "engine": s.id});
            process_hits(data,s);
            var data=JSON.stringify({"type": "hitlist", "term": sb, "engine": s.id});
            process_hitlists(data,s);
            s.checked=true;
    	  }
    	  else {
    	    s.checked=false;
    	  }
        }
        //window.alert(this.searchterm);
        //SearchModule.SetQuery(this.searchterm)
      }
    }

</script>

