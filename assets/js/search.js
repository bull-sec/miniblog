document.addEventListener("DOMContentLoaded", function() {

  // Find search input and posts
  const searchInput = document.getElementById("search-input");
  if (!searchInput) return; // exit if page doesn't have a search input

  const cards = document.querySelectorAll(".post-item, .blog-card");
  
  // Results container: try both IDs
  const info = document.getElementById("search-results") || document.getElementById("search-results-info");

  // ---------- SEARCH FILTER ----------
  searchInput.addEventListener("input", function() {
    const query = this.value.toLowerCase().trim();
    let visibleCount = 0;

    cards.forEach(card => {
      const titleEl = card.querySelector("h3");
      if(!titleEl) return;

      const title = titleEl.innerText.toLowerCase();
      const tags = card.dataset.tags || "";

      if(title.includes(query) || tags.includes(query)) {
        card.style.display = "";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    if(info) {
      info.textContent = query.length > 0 ? visibleCount + " result(s)" : "";
    }
  });

  // ---------- IMAGE SCROLL ANIMATION (MOBILE ONLY) ----------
  const isMobile = window.innerWidth <= 768;
  if(isMobile) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const img = entry.target.querySelector("img");
        if(img) {
          if(entry.isIntersecting) {
            img.classList.add("img-animate");
          } else {
            img.classList.remove("img-animate"); // remove if you want reset
          }
        }
      });
    }, { threshold: 0.2 });

    cards.forEach(card => observer.observe(card));
  }
});