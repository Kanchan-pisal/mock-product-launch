// Toggle dark mode
function toggleDarkMode() {
  const body = document.body;
  const navbar = document.querySelector(".navbar");
  const darkModeIconMobile = document.querySelector(
    "#dark-mode-toggle-mobile i"
  );
  const darkModeIconDesktop = document.querySelector(
    "#dark-mode-toggle-desktop i"
  );

  // Toggle dark mode class on the body
  body.classList.toggle("dark-mode");

  // Update navbar class
  if (body.classList.contains("dark-mode")) {
    navbar.classList.remove("navbar-light", "bg-light");
    navbar.classList.add("navbar-dark", "bg-dark");
    darkModeIconMobile.classList.remove("bi-moon");
    darkModeIconMobile.classList.add("bi-sun");
    darkModeIconDesktop.classList.remove("bi-moon");
    darkModeIconDesktop.classList.add("bi-sun");
  } else {
    navbar.classList.remove("navbar-dark", "bg-dark");
    navbar.classList.add("navbar-light", "bg-light");
    darkModeIconMobile.classList.remove("bi-sun");
    darkModeIconMobile.classList.add("bi-moon");
    darkModeIconDesktop.classList.remove("bi-sun");
    darkModeIconDesktop.classList.add("bi-moon");
  }
}

// Get the back-to-top button
const backToTopButton = document.getElementById("backToTop");

// When the user scrolls down 100px from the top of the document, show the button
window.onscroll = function () {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
};

// When the user clicks on the button, scroll to the top of the document
backToTopButton.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// Attach event listeners to both toggle buttons
document
  .getElementById("dark-mode-toggle-mobile")
  .addEventListener("click", toggleDarkMode);
document
  .getElementById("dark-mode-toggle-desktop")
  .addEventListener("click", toggleDarkMode);

document.addEventListener("DOMContentLoaded", () => {
  fetch("mockData.json")
    .then((response) => response.json())
    .then((data) => {
      const featuresContainer = document.getElementById("features-container");
      const carouselInner = document.querySelector(".carousel-inner");

      data.features.forEach((feature) => {
        const card = document.createElement("div");
        card.classList.add("col-12", "col-md-6", "col-lg-4");

        card.innerHTML = `
                    <div class="feature-card">
                        <img src="${feature.icon}" alt="${feature.title} Icon">
                        <h4>${feature.title || "Feature Title"}</h4>
                        <p>${
                          feature.description ||
                          "Feature description goes here."
                        }</p>
                    </div>
                `;
        featuresContainer.appendChild(card);
      });
    })
    .catch((error) => console.error("Error fetching features:", error));
});

const testimonials = [
  {
    id: 1,
    name: "Fairy Kim",
    feedback: "This platform has been a game changer in my learning journey.",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  },
  {
    id: 2,
    name: "Jane Smith",
    feedback:
      "The courses are well-structured and the instructors are top-notch.",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
  },
  {
    id: 3,
    name: "Amelia Johnson",
    feedback:
      "I appreciate the hands-on projects, they helped me apply what I learned.",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
  },
];

let currentIndex = 0;
const slider = document.getElementById("testimonial-slider");

// Function to load testimonials
function loadTestimonials() {
  testimonials.forEach((testimonial) => {
    const testimonialDiv = document.createElement("div");
    testimonialDiv.classList.add("testimonial");
    testimonialDiv.innerHTML = `
            <img src="${testimonial.photo}" alt="${testimonial.name}">
            <h3>${testimonial.name}</h3>
            <p>"${testimonial.feedback}"</p>
        `;
    slider.appendChild(testimonialDiv);
  });
}

// Function to show the next testimonial
function showNextTestimonial() {
  currentIndex = (currentIndex + 1) % testimonials.length;
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Function to show the previous testimonial
function showPrevTestimonial() {
  currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Auto-slide functionality
let autoSlide = setInterval(showNextTestimonial, 5000);

// Event Listeners for buttons
document.getElementById("nextBtn").addEventListener("click", () => {
  clearInterval(autoSlide);
  showNextTestimonial();
  autoSlide = setInterval(showNextTestimonial, 5000);
});

document.getElementById("prevBtn").addEventListener("click", () => {
  clearInterval(autoSlide);
  showPrevTestimonial();
  autoSlide = setInterval(showNextTestimonial, 5000);
});

// Load testimonials on page load
loadTestimonials();

function validateForm() {
  let isValid = true;

  // Reset error messages
  document.getElementById("nameError").textContent = "";
  document.getElementById("emailError").textContent = "";

  // Validate Name (Only characters and spaces)
  const name = document.getElementById("name").value;
  const nameRegex = /^[A-Za-z\s]+$/;
  if (!nameRegex.test(name)) {
    document.getElementById("nameError").textContent =
      "Please enter a valid name (letters and spaces only).";
    isValid = false;
  }

  // Validate Email
  const email = document.getElementById("email").value;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    document.getElementById("emailError").textContent =
      "Please enter a valid email address.";
    isValid = false;
  }

  // If form is valid, show a success message
  if (isValid) {
    alert("Subscription Successful!");
  }

  return isValid;
}
