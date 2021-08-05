let inputElement = document.getElementById("searchInput");
let displayCount = document.getElementById("selectDisplayCount");

let searchResults = document.getElementById("searchResults");
let searchStatus = document.getElementById("status");

let spinner = document.getElementById("spinner");

let bookName;

function displayResult(jsonData) {
    searchResults.textContent = "";
    searchStatus.textContent = "Popular Books"
    spinner.classList.add("d-none");
    for (let item of jsonData) {
        let book = document.createElement("div");
        book.classList.add("col-6", "books-container");
        searchResults.appendChild(book);

        let bookImage = document.createElement("img");
        bookImage.setAttribute("src", item.imageLink);
        book.appendChild(bookImage);

        let authorName = document.createElement("p");
        authorName.classList.add("auth-name");
        authorName.textContent = item.author;
        book.appendChild(authorName);
    }
}




function findBooks(bookName) {
    if (bookName === "") {
        searchStatus.textContent = "No results found!"
    } else {
        let url = "https://apis.ccbp.in/book-store?title=" + bookName + "&maxResults=" + parseInt(displayCount.value);
        let options = {
            method: "GET",
        }
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                if (jsonData.search_results.length === 0) {
                    searchStatus.textContent = "No results found!"
                } else {
                    let data = jsonData.search_results;
                    displayResult(data);

                }
            });
    }
}


inputElement.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        bookName = event.target.value;
        spinner.classList.remove("d-none");
        findBooks(bookName);
    }
});

displayCount.addEventListener("change", function() {
    spinner.classList.remove("d-none");
    searchStatus.textContent = "";
    searchResults.textContent = "";
    findBooks(inputElement.value);
});