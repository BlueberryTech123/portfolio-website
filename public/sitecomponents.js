let navbar = `

`;
let decorations = ["none", "green wavy underline", "red dotted underline", "blue underline"];
let index = 0;

const maxItems = 4;
let itemInRow = 0;
let curRow;

addEventListener("error", (event) => {
    document.getElementById("gallery").innerText += event.message;
    document.getElementById("gallery").innerText += event.lineno;
});

function loadNavBar() {
    document.getElementById("navbar").innerHTML = navbar;
}
function loadWindow(title, img) {
    let galleryWindow = document.getElementById("gallery-window");
    let information = galleryWindow.querySelectorAll('#information')[0];

    galleryWindow.className = "row visible";
    galleryWindow.querySelectorAll('#title')[0].innerHTML = title;
    // galleryWindow.querySelectorAll('#description')[0].innerHTML = description;
    galleryWindow.querySelectorAll('#gallery-full')[0].style.backgroundImage = `url('${img}')`;
}
function closeWindow() {
    document.getElementById("gallery-window").className = "row invisible";
}

function loadGalleryItem(title, img) {
    document.innerText += "heheheheha1\n";
    if (itemInRow == 0) {
        curRow = document.getElementById("gallery").appendChild(document.createElement("div"));
        curRow.className = "row";
    }
    document.innerText += "heheheheha2\n";

    let galleryItem = `
        <div class="col-3">
            <div class="gallery-item" style="background-image: url('${img}');">
                <div class="container-fluid caption-overlay h-100">
                    <p>
                        <b id="title">${title}</b><br><br>
                    </p>
                    <br>
                    <button onclick="loadWindow('${title}', '${img}');">View</button>
                </div>
            </div>
        </div>
        `;
    curRow.innerHTML += galleryItem;
    itemInRow++;
    if (itemInRow >= maxItems) {
        itemInRow = 0;
    }

    // document.getElementById("gallery").innerHTML += "heheheheha\n";
}

function loadAllGalleryItems() {
    $.post("/loadgallery", function (data, status) {
        data["gallery"].forEach((fileData) => {
            loadGalleryItem(fileData["title"], fileData["image"]);
        });
    });

    // loadGalleryItem("Tessstttt", "/gallery/placeholder.png");
    // loadGalleryItem("Tessstttt", "https://i.kym-cdn.com/entries/icons/original/000/043/403/cover3.jpg");
}