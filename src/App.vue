
<template>
	<div class="flex flex-col justify-between border-2 border-gray-500 bg-white">
		<div class="fixed bottom-2 sm:bottom-4 right-2 sm:right-4 bg-gray-100 rounded-full p-4 shadow-md opacity-50 hover:opacity-100 z-50">
			<a href="#" class="hover:underline text-sm" title="Scroll to top"><svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 inline" width="192" height="192" fill="#000000" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><line x1="128" y1="224" x2="128" y2="72" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><polyline points="56 144 128 72 200 144" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline><line x1="40" y1="40" x2="216" y2="40" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line></svg></a>
		</div>
		<header class="bg-gray-100 p-2 sm:p-8 sticky top-0 flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-16 grow-0 text-gray-600">
			<RouterLink to="/"><img alt="Sci-Gate Logo" class="logo w-auto h-12 sm:h-16" src="@/assets/logo.svg" width="160" height="77" /></RouterLink>
			<SearchBar :searchterm="searchterm" :searchEngines="searchEngines" @onSearch="onSearch"></SearchBar>
		</header>

		<main class="grow">
			<RouterView :searchterm="searchterm" :searchEngines="searchEngines" @setObserver="setObserver"></RouterView>
		</main>
		<footer class="bg-gray-100 p-2 sm:p-4 grow-0 sticky bottom-0 flex flex-row justify-between z-20">
			<span class="text-gray-700 text-sm font-medium uppercase">A running prototype</span>
			<div class="flex items-center gap-1">
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
  @apply container h-full mx-auto sm:mt-12;
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


var searchterm=ref('');
const proxyurl='http://v2202109132150164038.luckysrv.de:8080/';
// const proxyurl='http://localhost:8080';

var searchEngines= ref([
        { id: "entscheidsuche", name: "Entscheidsuche", defaultCheckedState: true, checked: true, hitlist: [], hits: -1, hitsLoaded: 0, searchterm: '',observer: null},
        { id: "swisscovery", name: "Swisscovery", defaultCheckedState: true, checked: true, hitlist: [], hits: -1, hitsLoaded: 0, searchterm: '', observer: null},
        { id: "zora", name: "Zora", defaultCheckedState: true, checked: true, hitlist: [],  hits: -1, hitsLoaded: 0 , searchterm: '', observer: null},
        { id: "boris", name: "Boris", defaultCheckedState: true, checked: true, hitlist: [],  hits: -1, hitsLoaded: 0, searchterm: '', observer: null }
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
    	  var result=JSON.parse(xhr.responseText);
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
    	  if(result.start==0){
	    	  se.hitlist=result.hitlist;  
    	  }
    	  else{
    	  	result.hitlist.forEach(x => se.hitlist.push(x));
    	  	se.observer.unobserve(document.getElementById(se.id+"-"+(parseInt(result.start)-2).toString()));
    	  }
    	  se.hitsLoaded=se.hitlist.length+result.start;
    	  se.searchterm=result.searchterm;
    	  if(!se.observer){
    	  	let observer = new IntersectionObserver((changes,observer) => {
				if(changes[0].isIntersecting){
					const name=changes[0].target.id;
					const names=name.split('-',2);
					const id=names[0];
					const start=parseInt(names[1])+2;
					const sea=searchEngines.value.filter(function(u) { return u.id==id;});
					if (sea.length==1){
						const data=JSON.stringify({"type": "hitlist", "term": sea[0].searchterm, "engine": id, "start": start.toString()});
						console.log("hitliste",data)
						process_hitlists(data,sea[0]);
					}
					else{
						console.error(name,"nicht zerlegbar!")
					}
					
				}
			});
			se.observer=observer;
    	  }
    	  // window.alert("searchtterm set "+result.searchterm);
    	  //this.searchEngines_result.result=result;
          //document.getElementById("tab-content-"+se.id).title="XY";
		}
      }
    }

    
function onSearch (sb) {
      router.push({ path: '/search' });
      if (sb !== '') {
        for (var s of searchEngines.value){
          // window.alert("old searchterm for "+s.id+": '"+s.searchterm+"' new searchterm: '"+sb+"'");
          // window.alert(document.getElementById(s.id).checked && s.searchterm!=sb);
          if(document.getElementById(s.id).checked){
          	if(s.searchterm!=sb){
              s.hits = undefined;
              s.hitlist = Array();
              const data1=JSON.stringify({"type": "search", "term": sb, "engine": s.id});
              process_hits(data1,s);
              const data2=JSON.stringify({"type": "hitlist", "term": sb, "engine": s.id});
              process_hitlists(data2,s);
          	}
    		// window.alert("Suchanfrage mit "+this.searchterm+" an "+s.id);
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

function setObserver(element,se,len) {
	console.log(element.id+" (empfangen)");
	se.observer.observe(element,se.id);
}


</script>

