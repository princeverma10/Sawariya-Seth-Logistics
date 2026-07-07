/**
 * Sawariya Seth Logistics - Global Scripts
 * Author: Prince Verma / Antigravity AI
 * Date: July 2026
 * Description: Client-side micro-interactions for sticky navigation, mobile drawer menu, FAQ accordions, and form verification.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll State for Sticky Header
    const header = document.querySelector('.site-header');
    if (header) {
        const toggleHeaderScrollClass = () => {
            if (window.scrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', toggleHeaderScrollClass);
        toggleHeaderScrollClass(); // Initial check
    }

    // 2. Mobile Navigation Drawer
    const openDrawerBtn = document.getElementById('open-drawer');
    const closeDrawerBtn = document.getElementById('close-drawer');
    const drawerOverlay = document.getElementById('drawer-overlay');
    const navDrawer = document.getElementById('nav-drawer');

    if (openDrawerBtn && closeDrawerBtn && drawerOverlay && navDrawer) {
        const openDrawer = () => {
            drawerOverlay.classList.add('active');
            navDrawer.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        };

        const closeDrawer = () => {
            drawerOverlay.classList.remove('active');
            navDrawer.classList.remove('active');
            document.body.style.overflow = ''; // Restore background scrolling
        };

        openDrawerBtn.addEventListener('click', openDrawer);
        closeDrawerBtn.addEventListener('click', closeDrawer);
        drawerOverlay.addEventListener('click', closeDrawer);

        // Close drawer when clicking a link
        const drawerLinks = navDrawer.querySelectorAll('.drawer-link');
        drawerLinks.forEach(link => {
            link.addEventListener('click', closeDrawer);
        });
    }

    // 3. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const content = item.querySelector('.faq-content');
        
        if (trigger && content) {
            trigger.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close other open FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-content').style.maxHeight = '0';
                    }
                });

                if (isActive) {
                    item.classList.remove('active');
                    content.style.maxHeight = '0';
                } else {
                    item.classList.add('active');
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            });
        }
    });

    // 4. Form Labels Interactivity
    const formControls = document.querySelectorAll('.form-control');
    formControls.forEach(control => {
        const parent = control.closest('.form-group');
        if (parent) {
            const label = parent.querySelector('.form-label');
            if (label) {
                control.addEventListener('focus', () => {
                    label.style.color = 'var(--primary-light)';
                });
                control.addEventListener('blur', () => {
                    label.style.color = '';
                });
            }
        }
    });

    // 5. Contact Form Submissions (No-code Formspree / Web3Forms fallback)
    const forms = document.querySelectorAll('form[data-submit-type]');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="material-symbols-outlined animate-spin">sync</span> Submitting...';
                
                // Allow form action to execute naturally or log locally if no backend key is configured
                const key = form.querySelector('input[name="apikey"]')?.value || form.querySelector('input[name="access_key"]')?.value;
                if (!key || key.includes('YOUR_ACCESS_KEY')) {
                    e.preventDefault();
                    setTimeout(() => {
                        alert('Inquiry received! In a production deployment, this form will send emails using Web3Forms. (No access key configured yet)');
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalText;
                        form.reset();
                    }, 800);
                }
            }
        });
    });
});
