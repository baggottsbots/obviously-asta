// Smooth scroll for internal anchors only
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      });
    });

    // Scroll-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    document.querySelectorAll('.float-animation').forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });

    // Contact form (simple demo)
    document.getElementById('contact-form').addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const name = formData.get('name');
      const email = formData.get('email');
      const project = formData.get('project');
      const message = formData.get('message');

      if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
      }

      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.innerHTML;

      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
      submitButton.disabled = true;

      setTimeout(() => {
        alert(
          `Thank you, ${name}! Your message has been sent. I'll get back to you soon about your ${project} project.`
        );
        this.reset();
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
      }, 1500);
    });