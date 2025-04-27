
        // Counter Animation
        document.addEventListener('DOMContentLoaded', function() {
            const counters = document.querySelectorAll('.stat-number');
            const speed = 200;

            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute('data-count');
                    const count = +counter.innerText;
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 10);
                    } else {
                        counter.innerText = target;
                    }
                };

                // Start counting when scrolled to the stats section
                const observer = new IntersectionObserver((entries) => {
                    if (entries[0].isIntersecting) {
                        updateCount();
                        observer.unobserve(counter);
                    }
                }, { threshold: 0.5 });

                observer.observe(counter);
            });

            // Smooth scrolling for navigation links
            const links = document.querySelectorAll('header nav a');
            
            links.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Add smooth scrolling here if needed
                    console.log('Link clicked:', this.textContent);
                });
            });

            // Mobile menu toggle functionality would go here
            // This is a placeholder for real functionality
            document.querySelector('.logo').addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Logo clicked');
            });
        });
   