const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCX16cLWl6dCjlZMgUBxgGkA&part=snippet%2Cid&order=date&maxResults=7';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '08aa86df15msh0a81eab0a8882ebp114c6cjsn814acdd29f1e',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

const content = null || document.getElementById('content');

async function fetchData(url) {
  const response = await fetch(url, options);
  const data = await response.json();
  return data
}

(async () => {
  try {
    const videos = await fetchData(API);
    let view = `
    ${videos.items.map(video => `
      <div class="group relative">
        <div
          class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75     lg:aspect-none">
          <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
        </div>
        <div class="mt-4 flex justify-between">
          <h3 class="text-sm text-gray-700">
            <span aria-hidden="true" class="absolute inset-0"></span>
            ${video.snippet.title}
          </h3>
        </div>
      </div>
    `).slice(0,4).join('')}
    `;
    console.log(view);
    content.innerHTML = view;
  } catch (error) {
    let fail = `
      <div class="mt-4 flex justify-between">
        <h3 class="text-sm text-gray-700">
          <span aria-hidden="true" class="absolute inset-0"></span>
          Llamado a la API fallo!!!
        </h3>
      </div>
    `;
    console.error(error);
    content.innerHTML = fail;
  }
})();