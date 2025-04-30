/*
==============================================
PORTFOLIO JAVASCRIPT
==============================================

HOW TO UPDATE:
1. Form Handling: Edit the contact form submission logic
2. Animations: Modify animation timing and effects
3. Project Filtering: Update project categories
4. Dark Mode: Customize theme toggle behavior

*/

// ===============================================
// NAVIGATION & MOBILE MENU
// ===============================================
// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navLinks = document.querySelector(".nav-links")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navLinks.classList.toggle("active")
})

// Close mobile menu when clicking on a nav link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navLinks.classList.remove("active")
  })
})

// ===============================================
// DARK MODE TOGGLE - IMPROVED
// ===============================================
// UPDATE: Improved dark mode behavior here
const themeToggle = document.getElementById("theme-toggle")
const body = document.body

// Check for saved theme preference
const savedTheme = localStorage.getItem("theme")
if (savedTheme === "dark") {
  body.classList.remove("light-mode")
  body.classList.add("dark-mode")
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
} else {
  body.classList.remove("dark-mode")
  body.classList.add("light-mode")
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>'
}

// Toggle theme
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    if (body.classList.contains("dark-mode")) {
      body.classList.remove("dark-mode")
      body.classList.add("light-mode")
      localStorage.setItem("theme", "light")
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>'
    } else {
      body.classList.remove("light-mode")
      body.classList.add("dark-mode")
      localStorage.setItem("theme", "dark")
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
    }
  })
}

// ===============================================
// SMOOTH SCROLLING
// ===============================================
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href")
    const targetElement = document.querySelector(targetId)

    if (targetElement) {
      // Calculate header height for offset
      const headerHeight = document.querySelector("header").offsetHeight

      window.scrollTo({
        top: targetElement.offsetTop - headerHeight,
        behavior: "smooth",
      })
    }
  })
})

// ===============================================
// HEADER SCROLL EFFECT
// ===============================================
// UPDATE: Customize header scroll behavior here
window.addEventListener("scroll", () => {
  const header = document.querySelector("header")
  if (window.scrollY > 50) {
    header.style.padding = "10px 0"
  } else {
    header.style.padding = "15px 0"
  }
})

// ===============================================
// BACK TO TOP BUTTON
// ===============================================
// UPDATE: Customize back to top button behavior here
const backToTopButton = document.getElementById("back-to-top")

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add("visible")
  } else {
    backToTopButton.classList.remove("visible")
  }
})

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// ===============================================
// SKILLS ANIMATION
// ===============================================
// UPDATE: Customize skill bar animation here
const animateSkills = () => {
  const skillItems = document.querySelectorAll(".skill-item")

  skillItems.forEach((item) => {
    const skillLevel = item.getAttribute("data-skill-level")
    const skillLevelBar = item.querySelector(".skill-level")

    // Set initial width to 0
    skillLevelBar.style.width = "0%"

    // Create an observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate the skill level bar
            setTimeout(() => {
              skillLevelBar.style.width = `${skillLevel}%`
            }, 200)

            // Stop observing after animation
            observer.unobserve(item)
          }
        })
      },
      { threshold: 0.5 },
    )

    // Start observing
    observer.observe(item)
  })
}

// ===============================================
// SKILLS ICONS ANIMATION
// ===============================================
// NEW: Add animation to skill icons when they come into view
const animateSkillIcons = () => {
  const skillIcons = document.querySelectorAll(".skill-icon")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Reset the animation by removing and adding the class
          entry.target.style.animation = "none"
          setTimeout(() => {
            entry.target.style.animation = ""
          }, 10)

          // Stop observing after animation
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: "0px 0px -100px 0px" },
  )

  skillIcons.forEach((icon) => {
    observer.observe(icon)
  })
}

// ===============================================
// PROJECT FILTERING
// ===============================================
// UPDATE: Customize project filtering here
const filterProjects = () => {
  const filterButtons = document.querySelectorAll(".filter-btn")
  const projectCards = document.querySelectorAll(".project-card")

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      button.classList.add("active")

      const filter = button.getAttribute("data-filter")

      // Filter projects
      projectCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "block"
          setTimeout(() => {
            card.style.opacity = "1"
            card.style.transform = "translateY(0)"
          }, 100)
        } else {
          card.style.opacity = "0"
          card.style.transform = "translateY(20px)"
          setTimeout(() => {
            card.style.display = "none"
          }, 300)
        }
      })
    })
  })
}

// ===============================================
// PROJECT MODAL
// ===============================================
// UPDATE: Customize project modal behavior here
const setupProjectModal = () => {
  const modal = document.getElementById("project-modal")
  const modalImage = document.getElementById("modal-image")
  const modalTitle = document.getElementById("modal-title")
  const modalDescription = document.getElementById("modal-description")
  const closeModal = document.querySelector(".close-modal")
  const viewProjectButtons = document.querySelectorAll(".view-project")

  viewProjectButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault()

      const projectCard = button.closest(".project-card")
      const projectImage = projectCard.querySelector("img").src
      const projectTitle = projectCard.querySelector("h3").textContent
      const projectDescription = projectCard.querySelector("p").textContent

      modalImage.src = projectImage
      modalTitle.textContent = projectTitle
      modalDescription.textContent = projectDescription

      modal.style.display = "block"
      document.body.style.overflow = "hidden"
    })
  })

  closeModal.addEventListener("click", () => {
    modal.style.display = "none"
    document.body.style.overflow = "auto"
  })

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none"
      document.body.style.overflow = "auto"
    }
  })
}

// ===============================================
// ACHIEVEMENT CARDS MODAL
// ===============================================
const setupAchievementModals = () => {
  const achievementCards = document.querySelectorAll(".achievement-card")
  const closeModalButtons = document.querySelectorAll(".achievement-modal .close-modal")

  // Open modal when clicking on achievement card
  achievementCards.forEach((card) => {
    card.addEventListener("click", () => {
      const modalId = card.getAttribute("data-modal")
      const modal = document.getElementById(modalId)

      if (modal) {
        modal.style.display = "block"
        document.body.style.overflow = "hidden"
      }
    })
  })

  // Close modal when clicking on close button
  closeModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modal")
      modal.style.display = "none"
      document.body.style.overflow = "auto"
    })
  })

  // Close modal when clicking outside of modal content
  const modals = document.querySelectorAll(".achievement-modal")
  modals.forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none"
        document.body.style.overflow = "auto"
      }
    })
  })
}

// ===============================================
// SCROLL ANIMATIONS
// ===============================================
// UPDATE: Customize scroll animations here
const animateOnScroll = () => {
  const elements = document.querySelectorAll(".project-card, .timeline-item, .about-content, .contact-content")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in")
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 },
  )

  elements.forEach((element) => {
    observer.observe(element)
  })

  // Special animation for timeline items
  const timelineItems = document.querySelectorAll(".timeline-item")
  timelineItems.forEach((item, index) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (index % 2 === 0) {
              item.classList.add("slide-in-left")
            } else {
              item.classList.add("slide-in-right")
            }
            observer.unobserve(item)
          }
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(item)
  })
}

// ===============================================
// TYPING ANIMATION
// ===============================================
// UPDATE: Customize typing animation here
const typingEffect = () => {
  const text = "Cybersecurity Specialist"
  const typingElement = document.querySelector(".hero-content h2")
  let i = 0

  if (typingElement) {
    typingElement.innerHTML = ""

    const typing = setInterval(() => {
      if (i < text.length) {
        typingElement.innerHTML += text.charAt(i)
        i++
      } else {
        clearInterval(typing)
      }
    }, 100)
  }
}

// ===============================================
// CONTACT FORM
// ===============================================
const setupContactForm = () => {
  const contactForm = document.getElementById("contactForm")
  const formStatus = document.getElementById("form-status")
  const iframe = document.getElementById("hidden-iframe")

  if (contactForm) {
    // Handle form submission
    contactForm.addEventListener("submit", (e) => {
      // Show loading message
      formStatus.className = "form-status"
      formStatus.textContent = "Sending message..."

      // Listen for iframe load event (form submission complete)
      iframe.addEventListener("load", () => {
        // Clear the form
        contactForm.reset()

        // Show success message
        formStatus.className = "form-status success"
        formStatus.textContent = "Thank you for your message! I will get back to you soon."

        // Clear success message after 5 seconds
        setTimeout(() => {
          formStatus.textContent = ""
          formStatus.className = "form-status"
        }, 5000)
      })
    })
  }
}

// ===============================================
// INITIALIZE ALL FUNCTIONS
// ===============================================
// Initialize all functions when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  animateSkills()
  animateSkillIcons() // New function to animate skill icons
  filterProjects()
  setupProjectModal()
  setupContactForm() // Make sure this is called
  animateOnScroll()
  typingEffect()
  setupAchievementModals() // Initialize achievement modals
})
