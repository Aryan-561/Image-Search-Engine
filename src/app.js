
// Selecting elements from the DOM
let input = document.querySelector("#search-bar");
const searchBtn = document.querySelector("#search-btn");
const showMoreBtn = document.querySelector("#showMore-btn");

let container = document.querySelector("#container");

const footer = document.querySelector("footer");

// Variable to keep track of the current page number    
let page = 1;
// Event listener for the search button click
searchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    container.innerHTML = "";
    page = 1;
    dataApi()
});

// Event listener for pressing Enter key in the input field
input.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
        event.preventDefault();
        searchBtn.click();
    }

})

// Event listener for the "Show More" button click
showMoreBtn.addEventListener("click", (event) => {
    event.preventDefault();
    page++;
    dataApi();
})

// Function to fetch data from the API
async function dataApi() {
    if (input.value !== "") {

        let url = `https://api.unsplash.com/search/photos?page=${page}&query=${input.value}&client_id=rZHK9ICdDk_iAetO5jKc2v7LUmWksAocJpPmf2IHsy0&per_page=12`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);

            console.log(data.results.length);
            showData(data);
        }
        catch (error) {
            console.log(error);
            container.innerHTML = `<div class="text-2xl col-span-full text-sky-500 text-center font-semibold">Page Not Found</div>`;
            showMoreBtn.style.display = "none";
            footer.style.display = "none";

        }
        document.querySelector("main").style.display = "block";

    }

    else {
        showMoreBtn.style.display = "none";
        footer.style.display = "none";
        container.innerHTML = `<div class="text-2xl col-span-full text-sky-500 text-center font-semibold">Please Enter Some Keyword</div>`
    }
}


// Function to display the fetched data
function showData(data) {
    showMoreBtn.style.display = page >= data.total_pages ? "none" : "block";
    if (data.total === 0) {
        container.innerHTML = `<div class="text-2xl text-sky-500 text-center font-semibold col-span-full" >Image Not Found</div>`
        footer.style.display = "none";
    }
    else {
        let res = data.results;
        res.forEach(element => {
            console.log(element.urls.small);
            container.innerHTML += `
            <div class="group hover:scale-110  w-[90%] hover:skew-x-1 duration-500 relative rounded-md border-2  hover:shadow-xl border-sky-200  overflow-hidden">
            <a target="_blank" rel="noopener" href=${element.urls.regular}>
            <img src =${element.urls.small} class="w-full h-52   object-cover  rounded-md hover:contrast-125  hover:scale-110  duration-500" alt="${element.alt_description}">
            </a>
            <div class="absolute   bottom-0 invisible group-hover:visible delay-200 ease-in text-white cursor-pointer text-sm backdrop-opacity-30 backdrop-invert bg-black/20 font-semibold  w-full pl-2">${element.user.name}</div>
            </div>
            `
            footer.style.display = "block";
        });
    }
}