// =============================================
//  Mira's Elite - simple frontend script
// =============================================

// Your WhatsApp number: country code + number, no "+" or spaces (example: 2348012345678)
const WHATSAPP_NUMBER = "2349032408225";

// Your cars. To add a car, copy one line and change the details.
const cars = [
    { name: "Bugatti",  origin: "Direct Belgium",      engine: "V8", price: "$2m",   status: "2 months registered", image: "img/img (1).jpg" },
    { name: "Porsche",  origin: "Direct Belgium",      engine: "V8", price: "$6m",   status: "Not registered",      image: "img/img (16).jpg" },
    { name: "Audi",     origin: "Direct Belgium",      engine: "V8", price: "$1m",   status: "1 year registered",   image: "img/img (18).jpg" },
    { name: "BMW M2",   origin: "Direct Belgium",      engine: "V8", price: "$4.5m", status: "Not registered",      image: "img/img (4).jpg" },
    { name: "BMW X3M",  origin: "Clean Nigeria Used",  engine: "V8", price: "$1.2m", status: "2 months registered", image: "img/img (5).jpg" },
    { name: "BMW iX4",  origin: "Direct Belgium",      engine: "V8", price: "$2.9m", status: "Newly registered",    image: "img/img (6).jpg" },
    { name: "BMW XM",   origin: "Direct Belgium",      engine: "V8", price: "$4.8m", status: "Not registered",      image: "img/img (7).jpg" },
    { name: "BMW iX5",  origin: "Direct Belgium",      engine: "V8", price: "$7m",   status: "Not registered",      image: "img/img (8).jpg" },
    { name: "BMW X6M",  origin: "Belgium",             engine: "V8", price: "$2.5m", status: "Not registered",      image: "img/img (9).jpg" },
    { name: "BMW I59",  origin: "Direct Belgium",      engine: "V8", price: "$5.5m", status: "4 months registered", image: "img/img (10).jpg" },
    { name: "BMW M5",   origin: "Direct Belgium",      engine: "V8", price: "$8.7m", status: "5 months registered", image: "img/img (11).jpg" },
    { name: "BMW i5X",  origin: "Direct Belgium",      engine: "V8", price: "$4.7m", status: "Not registered",      image: "img/img (12).jpg" },
];

// Your Mercedes-Benz cars (prices in naira millions)
const benz = [
    { name: "GLE 400", year: 2025, price: "₦200m", image: "img/img (30).jpg", video: "videos/benz-1.mp4" },
    { name: "GLE 400", year: 2025, price: "₦300m", image: "img/img (2).jpg",  video: "videos/benz-2.mp4" },
    { name: "GLE 63",  year: 2022, price: "₦150m", image: "img/img (31).jpg", video: "videos/benz-3.mp4" },
    { name: "G-Wagon", year: 2024, price: "₦750m", image: "img/img (21).jpg", video: "videos/benz-4.mp4" },
];

// ---------- Helpers ----------

function whatsappLink(carName) {
    const message = `Hello, I am interested in the ${carName}.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// ---------- Build the cards ----------

function showroomCard(car) {
    return `
        <article class="car">
            <img src="${encodeURI(car.image)}" alt="${car.name}" loading="lazy">
            <div class="car-body">
                <h3>${car.name}</h3>
                <p class="car-info">${car.origin} &middot; ${car.engine} &middot; ${car.status}</p>
                <div class="car-bottom">
                    <span class="price">${car.price}</span>
                    <div class="car-links">
                        <a href="${whatsappLink(car.name)}" target="_blank" rel="noopener">Enquire</a>
                    </div>
                </div>
            </div>
        </article>`;
}

function benzCard(car) {
    return `
        <article class="car">
            <img src="${encodeURI(car.image)}" alt="Mercedes-Benz ${car.name}" loading="lazy">
            <div class="car-body">
                <h3>${car.name}</h3>
                <p class="car-info">${car.year} &middot; Newly imported</p>
                <div class="car-bottom">
                    <span class="price">${car.price}</span>
                    <div class="car-links">
                        <button type="button" data-video="${encodeURI(car.video)}">Watch</button>
                        <a href="${whatsappLink("Mercedes-Benz " + car.name)}" target="_blank" rel="noopener">Enquire</a>
                    </div>
                </div>
            </div>
        </article>`;
}

const carGrid = document.getElementById("carGrid");
const benzGrid = document.getElementById("benzGrid");
const emptyMessage = document.getElementById("empty");
const searchInput = document.getElementById("search");

function showCars(list) {
    carGrid.innerHTML = list.map(showroomCard).join("");
    emptyMessage.hidden = list.length > 0;
}

showCars(cars);
benzGrid.innerHTML = benz.map(benzCard).join("");

// ---------- Search ----------

searchInput.addEventListener("input", () => {
    const text = searchInput.value.trim().toLowerCase();

    const results = cars.filter((car) =>
        `${car.name} ${car.origin} ${car.status}`.toLowerCase().includes(text)
    );

    showCars(results);
});

// ---------- Video pop-up ----------

const videoModal = document.getElementById("videoModal");
const videoPlayer = document.getElementById("videoPlayer");
const videoError = document.getElementById("videoError");

benzGrid.addEventListener("click", (e) => {
    const button = e.target.closest("[data-video]");
    if (!button) return;

    videoError.hidden = true;
    videoPlayer.hidden = false;
    videoPlayer.src = button.dataset.video;
    videoModal.showModal();
    videoPlayer.play().catch(() => {});
});

// If the file is missing or the wrong format, show a message
videoPlayer.addEventListener("error", () => {
    if (!videoPlayer.getAttribute("src")) return; // ignore the reset when closing
    videoPlayer.hidden = true;
    videoError.hidden = false;
});

// Stop the video when the pop-up closes
videoModal.addEventListener("close", () => {
    videoPlayer.pause();
    videoPlayer.removeAttribute("src");
    videoPlayer.load();
});

document.getElementById("videoClose").addEventListener("click", () => videoModal.close());

videoModal.addEventListener("click", (e) => {
    if (e.target === videoModal) videoModal.close();
});

// ---------- Contact: WhatsApp button ----------

document.getElementById("whatsappLink").href =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello, I would like to ask about your cars.")}`;

// ---------- Mobile menu ----------

const nav = document.getElementById("nav");
const menu = document.getElementById("menu");
const menuBtn = document.getElementById("menuBtn");
const menuIcon = menuBtn.querySelector("i");

function closeMenu() {
    menu.classList.remove("open");
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuIcon.className = "fa-solid fa-bars";
}

menuBtn.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    nav.classList.toggle("open", isOpen);
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuIcon.className = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
});

menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

// ---------- Navbar turns solid after scrolling ----------

window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
});

// ---------- Footer year ----------

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("waFloat").href =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello, I would like to ask about your cars.")}`;