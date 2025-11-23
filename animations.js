// Ensure GSAP is loaded before this script runs
document.addEventListener('DOMContentLoaded', () => {
    // 1. Hero Section Animation (happens immediately on load)
    gsap.from(".hero-content h1", { 
        duration: 1.2, 
        y: 50, 
        opacity: 0, 
        ease: "power3.out" 
    });
    
    gsap.from(".hero-content p", { 
        duration: 1.2, 
        y: 50, 
        opacity: 0, 
        delay: 0.3, 
        ease: "power3.out" 
    });
    
    gsap.from(".hero-image", { 
        duration: 1.5, 
        scale: 0.8, 
        opacity: 0, 
        delay: 0.6, 
        ease: "elastic.out(1, 0.5)" 
    });

    // 2. Scroll-Triggered Animations (for all other content)

    // Select all elements tagged for animation
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in');

    animatedElements.forEach((element, index) => {
        // We skip the hero elements as they were animated above
        if (element.closest('.hero-header')) return; 

        // Apply a general scroll-based animation
        gsap.to(element, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            
            // GSAP ScrollTrigger setup
            scrollTrigger: {
                trigger: element,
                start: "top 85%", // Start animation when element is 85% down the viewport
                toggleActions: "play none none none",
            }
        });
    });
});