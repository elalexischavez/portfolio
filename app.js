
const API_URL = 'https://blog-rest-server.azurewebsites.net/api';
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

(async ()=>{
    const lastPost = await getLastPost();
    loadHtmlData(lastPost[0]);
})();


async function getLastPost()
{
    let response = await fetch(`${API_URL}/posts/get/lastPost`);
    let data = await response.json();
    return data;
}

function loadHtmlData(lastPost){
    const divElement=document.querySelector('.news');
    // -> format date to month day year
    const data = new Date(lastPost.date);
    const dateFomated = `${months[data.getMonth()]} ${data.getDate()}, ${data.getFullYear()}`;
    const html = 
    `
    <p>Last Post ${dateFomated}</p>
    <a href="https://www.alexisblog.me/posts/${lastPost.path}">
        <div class="banner-container">
            <div class="image-container">
                <img src="${lastPost.mainImage}" alt="banner" class="post-image"/>
            </div>
            <div class="post-data-container">
                <p class="post-data"> 
                    <b class="title">${lastPost.categories[0]}</b>
                        <br />
                    ${lastPost.postName}
                        <br />
                    <b class="author-name"> by ${lastPost.author}</b>
                </p>
            </div>
        </div>
    </a>
    `;
   divElement.innerHTML += html;
}
