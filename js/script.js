document.addEventListener("DOMContentLoaded", function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault()
            const scrollTarget = document.querySelector(this.getAttribute('href'))
            const topOffset = document.querySelector('header').offsetHeight // Consider header height
            const elementPosition = scrollTarget.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - topOffset

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            })
        })
    })

    // Update the year dynamically in the footer
    document.querySelector('footer p').textContent += ` ${new Date().getFullYear()}`

    // Form validation
    const form = document.querySelector('form')
    if (form) {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault() // Prevent form submission if validation fails
                alert('Please fill out all required fields correctly.')
            }
        })
    }

    // Animation for project items on scroll
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in')
            }
        })
    }, {
        threshold: 0.5 // Trigger when 50% of the item is visible
    })

    document.querySelectorAll('.project-item').forEach(item => {
        observer.observe(item)
    })
})

// Class to be added for animations
document.styleSheets[0].insertRule('.fade-in { opacity: 1; transform: translateY(0); transition: opacity 0.5s ease-out, transform 0.5s ease-out; }', document.styleSheets[0].cssRules.length)
document.styleSheets[0].insertRule('.project-item { opacity: 0; transform: translateY(20px); }', document.styleSheets[0].cssRules.length)
