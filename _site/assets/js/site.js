
  // Initialize AOS after DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
      offset: 0,
      duration: 600,
      easing: 'ease-out-cubic',
      once: true,
      mirror: true,
      anchorPlacement: 'top-bottom'
    });
    
    // Force refresh multiple times to ensure detection
    setTimeout(function() { AOS.refresh(); }, 100);
    setTimeout(function() { AOS.refresh(); }, 500);
  });
  
  // Also refresh on scroll
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function() {
      AOS.refresh();
    }, 50);
  });


// Function to enable center highlight for elements
function enableCentreHighlight(selector) {

    if (window.matchMedia("(hover: hover)").matches) {
        return;
    }

    const items = [...document.querySelectorAll(selector)];

    if (!items.length) return;

    function update() {

        const centre = window.innerHeight / 2;

        let closest = null;
        let distance = Infinity;

        items.forEach(item => {

            const rect = item.getBoundingClientRect();

            const itemCentre = rect.top + rect.height / 2;

            const d = Math.abs(itemCentre - centre);

            if (d < distance) {
                distance = d;
                closest = item;
            }

        });

        items.forEach(item => item.classList.remove("active"));

        if (closest) {
            closest.classList.add("active");
        }

    }

    update();

    window.addEventListener("scroll", update, { passive: true });

    window.addEventListener("resize", update);

}


document.addEventListener("DOMContentLoaded", function () {

    const filters = document.querySelectorAll(".tag-filter");
    const posts = document.querySelectorAll(".gallery-item");

    filters.forEach(filter => {
        
        filter.addEventListener("click", function (e) {

            e.preventDefault();

            const tag = this.dataset.tag;

            posts.forEach(post => {

                const tags = post.dataset.tags
                    .split(",")
                    .map(t => t.trim());

                if (tag === "all" || tags.includes(tag)) {
                    post.style.display = "";
                } else {
                    post.style.display = "none";
                }

            });

        });

    });

});


// Gallery modal functionality
document.addEventListener("DOMContentLoaded", () => {

    const images = [...document.querySelectorAll(".gallery-image")];

    if (!images.length) return;

    const modal = document.getElementById("gallery-modal");
    const modalImage = document.getElementById("gallery-modal-image");

    const prev = document.querySelector(".gallery-prev");
    const next = document.querySelector(".gallery-next");
    const close = document.querySelector(".gallery-close");

    let current = 0;

    function show(index) {

        current = (index + images.length) % images.length;

        modalImage.src = images[current].src;

    }

    images.forEach((img, index) => {

        img.addEventListener("click", () => {

            show(index);

            modal.classList.add("open");

        });

    });

    next.addEventListener("click", e => {

        e.stopPropagation();

        show(current + 1);

    });

    prev.addEventListener("click", e => {

        e.stopPropagation();

        show(current - 1);

    });

    close.addEventListener("click", () => {

        modal.classList.remove("open");

    });

    modal.addEventListener("click", e => {

        if (e.target === modal) {
            modal.classList.remove("open");
        }

    });

    document.addEventListener("keydown", e => {

        if (!modal.classList.contains("open")) return;

        switch (e.key) {

            case "ArrowRight":
                show(current + 1);
                break;

            case "ArrowLeft":
                show(current - 1);
                break;

            case "Escape":
                modal.classList.remove("open");
                break;

        }

    });

});

if (typeof Swiper !== 'undefined') {
document.addEventListener("DOMContentLoaded", function () {

  new Swiper('.featured-swiper', {

    slidesPerView: 1,
    spaceBetween: 16,
    grabCursor: true,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints: {
      640: {
        slidesPerView: 1
      },
      1024: {
        slidesPerView: 1
      }
    }

  });

});
}

enableCentreHighlight(".gallery-item");
enableCentreHighlight(".blog-card");

document.addEventListener("DOMContentLoaded", () => {

    const sidebar = document.querySelector(".story-nav");

    if (!sidebar) return;

    const headings = document.querySelectorAll("article h3[id]");

    // Build navigation
    headings.forEach(h => {

        const link = document.createElement("a");

        link.href = "#" + h.id;
        link.textContent = h.textContent;

        sidebar.appendChild(link);

    });

    // Highlight current section
    const links = Array.from(document.querySelectorAll(".story-nav a"));

    const footer = document.querySelector("footer");

    const footerObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                links.forEach(link => {
                    link.classList.remove("active");
                    link.classList.add("completed");
                });
            }
        });
    }, {
        rootMargin: "0px 0px 0px 0px"
    });

    footerObserver.observe(footer);

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const activeIndex = links.findIndex(link =>
                link.getAttribute("href") === "#" + entry.target.id
            );

            links.forEach((link, index) => {
                link.classList.toggle("completed", index < activeIndex);
                link.classList.toggle("active", index === activeIndex);
            });
        });
    }, {
        rootMargin: "-40% 0px -50% 0px"
    });

    headings.forEach(h => observer.observe(h));

    // Progress bar
    const progressFill = document.querySelector(".story-progress-fill");

    window.addEventListener("scroll", () => {

        const maxScroll =
            document.documentElement.scrollHeight - window.innerHeight;

        const progress = (window.scrollY / maxScroll) * 100;

        progressFill.style.width = progress + "%";

    });

});

links.forEach((link, index) => {
    if (index < activeIndex) {
        link.classList.add("completed");
    } else {
        link.classList.remove("completed");
    }
});