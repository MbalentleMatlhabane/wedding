// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const rsvpForm = document.getElementById('wedding-rsvp');
    
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const attendance = document.getElementById('attendance').value;
            
            // Simple validation
            if (name.trim() === '') {
                alert('Please enter your name');
                return;
            }
            
            // Show appropriate message based on attendance
            if (attendance === 'yes') {
                alert(`Thank you for your RSVP, ${name}! We look forward to celebrating with you.`);
            } else {
                alert(`Thank you for letting us know, ${name}. We'll miss you at our celebration!`);
            }
            
            // Reset form
            this.reset();
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-list a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to current section in navigation
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-list a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 100)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
        
        // Add visible class to sections when they come into view
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - window.innerHeight + 100)) {
                section.classList.add('visible');
            }
        });
    });
    
    // Add countdown timer
    function updateCountdownTimer() {
        const weddingDate = new Date('December 20, 2025 00:00:00').getTime();
        
        // Update countdown every second
        const countdownTimer = setInterval(function() {
            const now = new Date().getTime();
            const timeRemaining = weddingDate - now;
            
            if (timeRemaining < 0) {
                clearInterval(countdownTimer);
                document.querySelector('.countdown').innerHTML = '<div class="countdown-message">The celebration has arrived!</div>';
                return;
            }
            
            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days;
            document.getElementById('hours').textContent = hours.toLocaleString();
            document.getElementById('minutes').textContent = minutes.toLocaleString();
            document.getElementById('seconds').textContent = seconds.toLocaleString();
        }, 1000);
    }
    
    // Initialize countdown timer
    updateCountdownTimer();
    
    // Add image modal functionality
    function createImageModal() {
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        const closeBtn = document.getElementsByClassName('close')[0];
        
        // Add click events to gallery images
        const galleryImages = document.querySelectorAll('.gallery-item img');
        galleryImages.forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', function() {
                modal.style.display = 'flex';
                modalImg.src = this.src;
            });
        });
        
        // Close modal events
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    // Initialize image modal
    createImageModal();
    
    // Trigger initial scroll event to set active nav and visible sections
    window.dispatchEvent(new Event('scroll'));
    
    // Add click effect to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Create a temporary highlight effect
            this.style.transform = 'scale(0.95)';
            this.style.boxShadow = '0 0 30px rgba(26, 115, 232, 0.5)';
            
            setTimeout(() => {
                this.style.transform = '';
                this.style.boxShadow = '';
            }, 300);
        });
    });
});