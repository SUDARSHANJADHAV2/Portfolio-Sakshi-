// ========================================
// SAKSHI'S PORTFOLIO - FINAL OPTIMIZED JAVASCRIPT
// ========================================

// ==========================================
// 1. MOBILE MENU TOGGLE
// ==========================================
var menuBtn = document.querySelector('.menu-btn');
var menu = document.querySelector('.nav-links');
var menuLinks = document.querySelectorAll('.nav-links li a');

// Toggle menu when hamburger is clicked
menuBtn.addEventListener('click', function() {
	menuBtn.classList.toggle('active');
	menu.classList.toggle('active');
	document.body.classList.toggle('menu-open'); // Prevent body scrolling when menu is open
});

// Close menu when any menu link is clicked
for(var i = 0; i < menuLinks.length; i++){
	menuLinks[i].addEventListener('click', function() {
		menuBtn.classList.remove('active');
		menu.classList.remove('active');
		document.body.classList.remove('menu-open');
	});
}

// Close menu when clicking outside (Better UX)
document.addEventListener('click', function(event) {
	var isClickInsideMenu = menu.contains(event.target);
	var isClickOnMenuBtn = menuBtn.contains(event.target);
	
	if (!isClickInsideMenu && !isClickOnMenuBtn && menu.classList.contains('active')) {
		menuBtn.classList.remove('active');
		menu.classList.remove('active');
		document.body.classList.remove('menu-open');
	}
});

// Close menu with ESC key
document.addEventListener('keydown', function(e) {
	if (e.key === 'Escape' && menu.classList.contains('active')) {
		menuBtn.classList.remove('active');
		menu.classList.remove('active');
		document.body.classList.remove('menu-open');
	}
});

// ==========================================
// 2. STICKY NAVBAR ON SCROLL
// ==========================================
var homeSection = document.querySelector('.home');

function handleScroll() {
	if(window.scrollY > 60){
		homeSection.classList.add('active');
	} else {
		homeSection.classList.remove('active');
	}
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);

// ==========================================
// 3. PROJECTS FILTERING (ISOTOPE)
// ==========================================
$(document).ready(function() {
	// Initialize Isotope
	var $galleryContainer = $('.gallery').isotope({
		itemSelector: '.item',
		layoutMode: 'fitRows',
		transitionDuration: '0.6s'
	});

	// Filter items on button click
	$('.button-group .button').on('click', function(){
		$('.button-group .button').removeClass('active');
		$(this).addClass('active');

		var filterValue = $(this).attr('data-filter');
		$galleryContainer.isotope({
			filter: filterValue
		});
	});

	// Layout Isotope after each image loads (prevents layout issues)
	$galleryContainer.imagesLoaded().progress(function() {
		$galleryContainer.isotope('layout');
	});
});

// ==========================================
// 4. SMOOTH SCROLLING FOR ANCHOR LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();
		var targetId = this.getAttribute('href');
		
		// Skip if it's just "#"
		if(targetId === '#') return;
		
		var target = document.querySelector(targetId);
		
		if(target) {
			var offsetTop = target.offsetTop - 70; // 70px offset for navbar
			
			window.scrollTo({
				top: offsetTop,
				behavior: 'smooth'
			});
		}
	});
});

// ==========================================
// 5. SCROLL TO TOP BUTTON
// ==========================================
// Create scroll to top button dynamically
var scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-to-top';
scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
scrollTopBtn.style.cssText = `
	position: fixed;
	bottom: 30px;
	right: 30px;
	width: 50px;
	height: 50px;
	background-color: var(--primary-clr);
	color: white;
	border: none;
	border-radius: 50%;
	cursor: pointer;
	display: none;
	z-index: 999;
	font-size: 20px;
	box-shadow: 0 5px 20px rgba(5,85,92,0.3);
	transition: all 0.3s ease;
`;
document.body.appendChild(scrollTopBtn);

// Show/hide scroll to top button based on scroll position
window.addEventListener('scroll', function() {
	if (window.scrollY > 300) {
		scrollTopBtn.style.display = 'block';
		scrollTopBtn.style.opacity = '1';
	} else {
		scrollTopBtn.style.opacity = '0';
		setTimeout(function() {
			if (window.scrollY <= 300) {
				scrollTopBtn.style.display = 'none';
			}
		}, 300);
	}
});

// Scroll to top when clicked
scrollTopBtn.addEventListener('click', function() {
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	});
});

// Hover effects
scrollTopBtn.addEventListener('mouseenter', function() {
	this.style.transform = 'scale(1.1) translateY(-3px)';
	this.style.boxShadow = '0 8px 25px rgba(5,85,92,0.4)';
});

scrollTopBtn.addEventListener('mouseleave', function() {
	this.style.transform = 'scale(1) translateY(0)';
	this.style.boxShadow = '0 5px 20px rgba(5,85,92,0.3)';
});

scrollTopBtn.addEventListener('mousedown', function() {
	this.style.transform = 'scale(0.95)';
});

scrollTopBtn.addEventListener('mouseup', function() {
	this.style.transform = 'scale(1.1) translateY(-3px)';
});

// ==========================================
// 6. FORM VALIDATION & FEEDBACK
// ==========================================
$(document).ready(function() {
	// Form 2 submission feedback
	$('.form-2').on('submit', function(e) {
		var submitButton = $(this).find('.form-button');
		var originalText = submitButton.text();
		var textarea = $(this).find('textarea[name="message"]');
		
		// Check if textarea is empty
		if(textarea.val().trim() === '') {
			e.preventDefault();
			textarea.focus();
			
			// Add shake animation
			textarea.addClass('shake-animation');
			setTimeout(function() {
				textarea.removeClass('shake-animation');
			}, 500);
			
			// Show error message
			if(!$('.error-message').length) {
				textarea.after('<span class="error-message" style="color: #e74c3c; font-size: 13px; margin-top: 5px; display: block;">Please enter a message before submitting.</span>');
				setTimeout(function() {
					$('.error-message').fadeOut(function() {
						$(this).remove();
					});
				}, 3000);
			}
			
			return false;
		}
		
		// Show loading state
		submitButton.text('SENDING...').prop('disabled', true);
		submitButton.css({
			'background-color': '#186f78',
			'cursor': 'not-allowed'
		});
		
		// Reset after form submission (Formspree handles the redirect)
		setTimeout(function() {
			submitButton.text(originalText).prop('disabled', false);
			submitButton.css({
				'background-color': '',
				'cursor': 'pointer'
			});
		}, 3000);
	});
	
	// Real-time email validation
	$('input[type="email"]').on('blur', function() {
		var email = $(this).val();
		var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		
		if(email && !emailRegex.test(email)) {
			$(this).css('border-bottom-color', '#e74c3c');
			
			if(!$(this).next('.email-error').length) {
				$(this).after('<span class="email-error" style="color: #e74c3c; font-size: 12px; margin-top: 5px; display: block; position: absolute; bottom: -20px; left: 0;">Please enter a valid email address.</span>');
			}
		} else {
			$(this).css('border-bottom-color', '');
			$(this).next('.email-error').remove();
		}
	});
	
	// Remove error on focus
	$('input[type="email"]').on('focus', function() {
		$(this).css('border-bottom-color', '');
		$(this).next('.email-error').remove();
	});
});

// ==========================================
// 7. TYPING ANIMATION FOR HERO ROLE
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
	var roles = [
		'A.I. & M.L. Engineer',
		'Full Stack Developer',
		'Software Engineer',
		'Problem Solver'
	];
	var roleElement = document.querySelector('.hero-text h2');
	
	if(roleElement) {
		var currentRoleIndex = 0;
		var currentCharIndex = 0;
		var isDeleting = false;
		var typingSpeed = 100;
		var deletingSpeed = 50;
		var pauseTime = 2000;
		
		function typeRole() {
			var currentRole = roles[currentRoleIndex];
			
			if (isDeleting) {
				roleElement.textContent = currentRole.substring(0, currentCharIndex - 1);
				currentCharIndex--;
			} else {
				roleElement.textContent = currentRole.substring(0, currentCharIndex + 1);
				currentCharIndex++;
			}
			
			var speed = isDeleting ? deletingSpeed : typingSpeed;
			
			if (!isDeleting && currentCharIndex === currentRole.length) {
				speed = pauseTime;
				isDeleting = true;
			} else if (isDeleting && currentCharIndex === 0) {
				isDeleting = false;
				currentRoleIndex = (currentRoleIndex + 1) % roles.length;
				speed = 500;
			}
			
			setTimeout(typeRole, speed);
		}
		
		// Start typing animation after a short delay
		setTimeout(function() {
			typeRole();
		}, 1000);
	}
});

// ==========================================
// 8. PAGE LOADING ANIMATION
// ==========================================
// Add loading screen HTML dynamically
window.addEventListener('load', function() {
	// Create loading screen
	var loaderHTML = `
		<div class="loader-wrapper" style="
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: #f6f9fe;
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 99999;
			flex-direction: column;
		">
			<div class="loader" style="
				border: 5px solid #eef1f6;
				border-top: 5px solid #05555c;
				border-radius: 50%;
				width: 60px;
				height: 60px;
				animation: spin 1s linear infinite;
			"></div>
			<p style="
				margin-top: 20px;
				color: #05555c;
				font-size: 16px;
				font-weight: 500;
				letter-spacing: 1px;
			">Loading Portfolio...</p>
		</div>
	`;
	
	// Add loader to body if it doesn't exist
	if(!document.querySelector('.loader-wrapper')) {
		document.body.insertAdjacentHTML('afterbegin', loaderHTML);
	}
	
	// Fade out loading screen
	setTimeout(function() {
		var loader = document.querySelector('.loader-wrapper');
		if(loader) {
			loader.style.opacity = '0';
			loader.style.transition = 'opacity 0.5s ease';
			setTimeout(function() {
				loader.remove();
			}, 500);
		}
	}, 500); // Adjust delay as needed
});

// ==========================================
// 9. SCROLL REVEAL ANIMATIONS
// ==========================================
function revealElements() {
	var reveals = document.querySelectorAll('.service-box, .box, .career-item, .item');
	
	for (var i = 0; i < reveals.length; i++) {
		var windowHeight = window.innerHeight;
		var elementTop = reveals[i].getBoundingClientRect().top;
		var elementVisible = 100;
		
		if (elementTop < windowHeight - elementVisible) {
			reveals[i].style.opacity = '1';
			reveals[i].style.transform = 'translateY(0)';
		}
	}
}

// Set initial state for scroll reveal elements
document.addEventListener('DOMContentLoaded', function() {
	var elements = document.querySelectorAll('.service-box, .box, .career-item, .item');
	elements.forEach(function(el) {
		el.style.opacity = '0';
		el.style.transform = 'translateY(30px)';
		el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
	});
	
	// Reveal elements on page load
	setTimeout(revealElements, 100);
});

window.addEventListener('scroll', revealElements);

// ==========================================
// 10. ACTIVE NAVIGATION HIGHLIGHTING
// ==========================================
window.addEventListener('scroll', function() {
	var sections = document.querySelectorAll('section[id]');
	var navLinks = document.querySelectorAll('.nav-links li a');
	
	var current = '';
	
	sections.forEach(function(section) {
		var sectionTop = section.offsetTop - 100;
		var sectionHeight = section.clientHeight;
		
		if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
			current = section.getAttribute('id');
		}
	});
	
	navLinks.forEach(function(link) {
		link.classList.remove('active-link');
		if (link.getAttribute('href') === '#' + current) {
			link.classList.add('active-link');
		}
	});
});

// ==========================================
// 11. INJECT ADDITIONAL STYLES
// ==========================================
var additionalStyles = document.createElement('style');
additionalStyles.textContent = `
	/* Shake Animation */
	@keyframes shake {
		0%, 100% { transform: translateX(0); }
		10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
		20%, 40%, 60%, 80% { transform: translateX(8px); }
	}
	
	.shake-animation {
		animation: shake 0.5s ease-in-out;
		border-bottom-color: #e74c3c !important;
	}
	
	/* Loader Spin Animation */
	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}
	
	/* Prevent body scroll when menu is open */
	body.menu-open {
		overflow: hidden;
	}
	
	/* Active Navigation Link */
	.nav-links li a.active-link {
		color: var(--primary-clr) !important;
		font-weight: 600;
	}
	
	.nav-links li a.active-link::after {
		transform: scaleX(1) !important;
	}
	
	/* Scroll to Top Button Responsive */
	@media (max-width: 768px) {
		.scroll-to-top {
			bottom: 20px !important;
			right: 20px !important;
			width: 45px !important;
			height: 45px !important;
			font-size: 18px !important;
		}
	}
	
	/* Form Input Group Position */
	.inputGroup {
		position: relative;
	}
	
	/* Smooth transitions for all interactive elements */
	button, a, input, textarea {
		transition: all 0.3s ease;
	}
`;
document.head.appendChild(additionalStyles);

// ==========================================
// 12. CONSOLE WELCOME MESSAGE
// ==========================================
console.log('%c👋 Welcome to Sakshi\'s Portfolio!', 'color: #05555c; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);');
console.log('%c════════════════════════════════════', 'color: #186f78; font-size: 12px;');
console.log('%c💼 Looking to collaborate?', 'color: #186f78; font-size: 16px; font-weight: 600;');
console.log('%c📧 Email: sakshibiranje7126@gmail.com', 'color: #3f7277; font-size: 14px;');
console.log('%c💻 GitHub: github.com/SakshiBiranje', 'color: #3f7277; font-size: 14px;');
console.log('%c🔗 LinkedIn: linkedin.com/in/sakshi-biranje', 'color: #3f7277; font-size: 14px;');
console.log('%c════════════════════════════════════', 'color: #186f78; font-size: 12px;');
console.log('%c✨ Built with passion and powered by code!', 'color: #277b6d; font-size: 12px; font-style: italic;');

// ==========================================
// 13. PERFORMANCE MONITORING
// ==========================================
window.addEventListener('load', function() {
	// Calculate and log page load time
	if (window.performance) {
		var loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
		console.log('%c⚡ Page Performance: Loaded in ' + loadTime + 'ms', 'color: #27ae60; font-size: 14px; font-weight: 600;');
		
		// Alert if page loads slowly (optional - comment out in production)
		if (loadTime > 3000) {
			console.warn('⚠️ Page load time is high. Consider optimizing images and assets.');
		}
	}
});

// ==========================================
// 14. PREVENT CONSOLE ERRORS
// ==========================================
// Graceful handling of missing elements
window.addEventListener('error', function(e) {
	// Don't show errors to regular users, only log them
	console.error('An error occurred:', e.message);
	return true; // Prevents the error from appearing in console for users
});

// ==========================================
// END OF SCRIPT - PORTFOLIO READY! 🚀
// ==========================================