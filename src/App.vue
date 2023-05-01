
<template>
	<div class="flex min-h-full">
		<div class="flex flex-col w-1/5 bg-white pt-9 top-0 sticky h-screen">
			<RouterLink to="/" class="mx-auto mb-10"><img alt="Sci-Gate Logo" class="logo w-auto h-12 sm:h-16" src="@/assets/logo.svg" width="160" height="77" /></RouterLink>
			<div class="overflow-y-auto">
				<div @click="selectTab('gesamt')" :key="'tab25'" :class="['tab', 'cursor-pointer', 'font-medium', {'active font-bold': selectedTab === 'gesamt'}]">
					<a class="text-sm uppercase hover:cursor-pointer py-4 px-6 hover:bg-gray-50 flex justify-between">
						Gesamt
						<template v-if="hitsGesamt>0">
							({{ hitsGesamt  }})
						</template>
					</a>
				</div>
				<div @click="selectTab(searchEngine.id)" v-for="searchEngine in searchEngines.filter(function(u) { return u.checked})" :key="'tab-' + searchEngine.id" :class="['tab', 'cursor-pointer', 'font-medium', {'active font-bold': selectedTab === searchEngine.id}]">
					<a class="text-sm uppercase hover:cursor-pointer py-4 px-6 hover:bg-gray-50 flex justify-between">
						{{ searchEngine.name }}
						<template v-if="searchEngine.hits>=0">
							({{ searchEngine.hits}})
							<a v-bind:href="getDownloadLink(searchEngine)" target='_blank'>
								<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M220 896q-24 0-42-18t-18-42V693h60v143h520V693h60v143q0 24-18 42t-42 18H220Zm260-153L287 550l43-43 120 120V256h60v371l120-120 43 43-193 193Z"/></svg>
							</a>
						</template>
						<template v-else>
							<template v-if="searchEngine.searchterm != ''">
								<svg class="animate-spin mx-3 h-5 w-5 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
									<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
							</template>
						</template>
					</a>
				</div>
			</div>
			<div class="mt-auto mx-auto text-center pb-5 pt-9">
				<span class="text-gray-700 text-sm font-medium uppercase">A running prototype</span>
				<div class="flex flex-wrap text-center items-center justify-center gap-1 mt-3">
					<RouterLink to="/" class="text-gray-700 text-sm font-medium uppercase hover:underline">Home</RouterLink> |
					<RouterLink to="/about" class="text-gray-700 text-sm font-medium uppercase hover:underline">About</RouterLink> |
					<RouterLink to="/impressum" class="text-gray-700 text-sm font-medium uppercase hover:underline">Impressum</RouterLink>
					<br>
					<a href="apidocs" class="text-gray-700 text-sm font-medium uppercase hover:underline">APIdocs</a> |		
					<a href="api/ui" class="text-gray-700 text-sm font-medium uppercase hover:underline">API</a>				
				</div>
			</div>
		</div>
		<div class="w-4/5">
			<div class="mx-auto pt-9 px-10 max-w-7xl bg-gray-50 top-0 sticky">
				<SearchBar :searchterm="searchterm" :searchEngines="searchEngines" @onSearch="onSearch"></SearchBar>
			</div>
			<div class="mx-auto px-10 max-w-7xl">
				<RouterView :searchterm="searchterm" :searchEngines="searchEngines" :selectedTab="selectedTab" @setObserver="setObserver"></RouterView>
			</div>
			<a href="#" class="bg-white inline-block p-3 rounded-lg fixed bottom-10 right-10 shadow-md hover:shadow-lg" title="Scroll to top">
				<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 inline" width="192" height="192" fill="#000000" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><line x1="128" y1="224" x2="128" y2="72" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><polyline points="56 144 128 72 200 144" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline><line x1="40" y1="40" x2="216" y2="40" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line></svg>
			</a>
		</div>
	</div>
</template>

<style>
body {
  @apply bg-gray-50;
}
#app {
  @apply h-screen;
}
</style>

<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import SearchBar from "@/components/SearchBar.vue"
import { createApp } from 'vue'
// import { createI18n } from 'vue-i18n'
import router from '@/router'


// const i18n = createI18n({
  // something vue-i18n options here ...
// })

const app = createApp({
  // something vue options here ...
})

// app.use(i18n);

var selectedTab = ref('gesamt');

function selectTab(searchEngineId) {
	console.log(searchEngineId);
	selectedTab.value = searchEngineId;
}

var searchterm=ref('');
const proxyurl='http://v2202109132150164038.luckysrv.de/stubs/';
// const proxyurl='http://localhost:8080';

var searchEngines= ref([
        { id: "entscheidsuche", name: "Entscheidsuche", defaultCheckedState: true, checked: true, hitlist: [], hits: -1, hitsLoaded: 0, searchterm: '',observer: null},
        { id: "swisscovery", name: "Swisscovery", defaultCheckedState: true, checked: true, hitlist: [], hits: -1, hitsLoaded: 0, searchterm: '', observer: null},
        { id: "zora", name: "Zora", defaultCheckedState: true, checked: true, hitlist: [],  hits: -1, hitsLoaded: 0 , searchterm: '', observer: null},
        { id: "boris", name: "Boris", defaultCheckedState: true, checked: true, hitlist: [],  hits: -1, hitsLoaded: 0, searchterm: '', observer: null },
        { id: "fedlex", name: "Fedlex", defaultCheckedState: true, checked: true, hitlist: [],  hits: -1, hitsLoaded: 0, searchterm: '', observer: null },
        { id: "repositorium", name: "Repositorium", defaultCheckedState: true, checked: true, hitlist: [],  hits: -1, hitsLoaded: 0, searchterm: '', observer: null }
        // , { id: "swisslexGreen", name: "Lexcampus Green", defaultCheckedState: true, checked: true, hitlist: [],  hits: -1, hitsLoaded: 0, searchterm: '', observer: null }
      ]);
	var hitsGesamt = ref(0);
    
function process_hits(data,se){
	// Sending and receiving data in JSON format using POST method
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
			hitsGesamt.value += result.hits;
			//window.alert("Antwort für "+se.id+": " + result.hits);    	  
			//this.searchEngines_result.result=result;
			//document.getElementById("tab-content-"+se.id).title="XY";
		}
	}
}


function process_hitlists(data,se){
	// Sending and receiving data in JSON format using POST method
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
	hitsGesamt.value = 0;
	router.push({ path: '/search' });
	if (sb !== '') {
		for (var s of searchEngines.value){
			console.log(s);
			// window.alert("old searchterm for "+s.id+": '"+s.searchterm+"' new searchterm: '"+sb+"'");
			// window.alert(document.getElementById(s.id).checked && s.searchterm!=sb);
			//if(document.getElementById(s.id).checked){
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
			/* } else {
				s.checked=false;
			} */
		}
		//window.alert(this.searchterm);
		//SearchModule.SetQuery(this.searchterm)
	}
}

function setObserver(element,se,len) {
	console.log(element.id+" (empfangen)");
	se.observer.observe(element,se.id);
}

function getDownloadLink(se) {
	var url='http://v2202109132150164038.luckysrv.de/api/search?{"collection":"'+se.id+'", "query":"'+se.searchterm+'", "getDocs":';
	if (se.id=='entscheidsuche'){
		url+='true,"getZIP":true';
	}
	else {
		url+='false,"getZIP":false';
	}
	url+=', "getCSV":false, "getHTML":true, "getNiceHTML":false, "getJSON":false, "ui":true}';
	return url;
}
</script>

