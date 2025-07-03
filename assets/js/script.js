/**
 * ===== LEONAR CLIENT - ГОЛОВНИЙ JAVASCRIPT ФАЙЛ =====
 * Цей файл містить всю інтерактивну функціональність сайту
 */

// ===== ГЛОБАЛЬНІ ЗМІННІ =====
let isMenuOpen = false;
let scrollPosition = 0;

// ===== ІНІЦІАЛІЗАЦІЯ ПРИ ЗАВАНТАЖЕННІ СТОРІНКИ =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Leonar Client сайт завантажено!');

    // Ініціалізація всіх компонентів
    initializeNavigation();
    initializeFAQ();
    initializeScrollEffects();
    initializeAnimations();
    initializeButtons();

    // Показати привітальне повідомлення в консолі
    console.log(`
    ╔══════════════════════════════════════╗
    ║          LEONAR CLIENT               ║
    ║     Найкращий Minecraft клієнт       ║
    ╚══════════════════════════════════════╝
    `);
});

// ===== НАВІГАЦІЯ ТА МОБІЛЬНЕ МЕНЮ =====
function initializeNavigation() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Мобільне меню toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMobileMenu);
    }

    // Плавна прокрутка для навігаційних посилань
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Видалити активний клас з усіх посилань
                navLinks.forEach(navLink => navLink.classList.remove('active'));

                // Додати активний клас до поточного посилання
                this.classList.add('active');

                smoothScrollTo(targetSection);

                // Закрити мобільне меню після кліку
                if (isMenuOpen) {
                    toggleMobileMenu();
                }
            }
        });
    });

    // Встановити активний стан при прокрутці
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Зміна прозорості header при прокрутці буде ініціалізована пізніше
}

// Функція для toggle мобільного меню
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');

    isMenuOpen = !isMenuOpen;

    if (navMenu && mobileToggle) {
        if (isMenuOpen) {
            navMenu.style.display = 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.background = 'rgba(15, 15, 35, 0.98)';
            navMenu.style.padding = '2rem';
            navMenu.style.backdropFilter = 'blur(20px)';
            navMenu.style.borderTop = '1px solid rgba(255, 255, 255, 0.1)';

            // Анімація кнопки
            mobileToggle.classList.add('active');
        } else {
            navMenu.style.display = 'none';
            mobileToggle.classList.remove('active');
        }
    }
}

// ===== FAQ ACCORDION ФУНКЦІОНАЛЬНІСТЬ =====
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');

                // Закрити всі інші FAQ елементи
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });

                // Toggle поточний елемент
                if (isActive) {
                    item.classList.remove('active');
                } else {
                    item.classList.add('active');
                }

                // Додати анімацію
                addClickAnimation(question);
            });
        }
    });
}

// ===== ЕФЕКТИ ПРОКРУТКИ ТА АНІМАЦІЇ =====
function initializeScrollEffects() {
    // Intersection Observer для анімацій появи
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');

                // Додаткові ефекти для різних елементів
                if (entry.target.classList.contains('feature-card')) {
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.style.opacity = '1';
                    }, Math.random() * 300);
                }
            }
        });
    }, observerOptions);

    // Спостерігати за елементами для анімації
    const animatedElements = document.querySelectorAll('.feature-card, .stat-item, .faq-item, .section-header');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// ===== АНІМАЦІЇ ТА ЕФЕКТИ =====
function initializeAnimations() {
    // Анімація логотипу при наведенні
    const logoLarge = document.querySelector('.logo-icon-large');
    if (logoLarge) {
        logoLarge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.boxShadow = '0 0 50px rgba(99, 102, 241, 0.8)';
        });

        logoLarge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = '0 0 20px rgba(99, 102, 241, 0.3)';
        });
    }

    // Анімація статистики
    animateCounters();

    // Паралакс ефект буде ініціалізований через updateScrollEffects()
}

// Анімація лічильників статистики
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = counter.textContent;
        const numericValue = parseInt(target.replace(/\D/g, ''));

        if (numericValue) {
            let current = 0;
            const increment = numericValue / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= numericValue) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    const suffix = target.includes('K') ? 'K+' : target.includes('%') ? '%' : '';
                    counter.textContent = Math.floor(current) + suffix;
                }
            }, 20);
        }
    });
}

// ===== КНОПКИ ТА ІНТЕРАКТИВНІ ЕЛЕМЕНТИ =====
function initializeButtons() {
    // Всі кнопки на сайті
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        // Ефект ripple при кліку
        button.addEventListener('click', function(e) {
            addRippleEffect(this, e);

            // Специфічні дії для різних кнопок
            const buttonText = this.textContent.trim();

            if (buttonText.includes('Купити') || buttonText.includes('Завантажити')) {
                handlePurchaseClick();
            } else if (buttonText.includes('Дізнатися більше')) {
                smoothScrollTo(document.querySelector('#features'));
            }
        });

        // Hover ефекти
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}
// ===== ДОПОМІЖНІ ФУНКЦІЇ =====

// Плавна прокрутка до елемента
function smoothScrollTo(element) {
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const elementPosition = element.offsetTop - headerHeight - 20;

        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Ефект ripple для кнопок
function addRippleEffect(button, event) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    // Додати стилі для ripple ефекту
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple-animation 0.6s linear';
    ripple.style.pointerEvents = 'none';

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    // Видалити ripple після анімації
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Анімація кліку
function addClickAnimation(element) {
    element.style.transform = 'scale(0.98)';
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 150);
}

// Обробка кліку на кнопку покупки
function handlePurchaseClick() {
    // Показати модальне вікно або перенаправити
    showNotification('🚀 Дякуємо за інтерес до Leonar Client! Незабаром ви будете перенаправлені на сторінку покупки.', 'success');

    // Тут можна додати логіку для перенаправлення на сторінку оплати
    setTimeout(() => {
        console.log('Перенаправлення на сторінку покупки...');
        // window.location.href = '/purchase';
    }, 2000);
}

// Система сповіщень
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Стилі для сповіщення
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '1rem 1.5rem';
    notification.style.borderRadius = '12px';
    notification.style.color = 'white';
    notification.style.fontWeight = '600';
    notification.style.zIndex = '10000';
    notification.style.maxWidth = '400px';
    notification.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
    notification.style.backdropFilter = 'blur(10px)';
    notification.style.transform = 'translateX(100%)';
    notification.style.transition = 'transform 0.3s ease-out';

    // Кольори залежно від типу
    switch(type) {
        case 'success':
            notification.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
            break;
        case 'warning':
            notification.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';
            break;
        default:
            notification.style.background = 'linear-gradient(135deg, #6366f1, #8b5cf6)';
    }

    document.body.appendChild(notification);

    // Анімація появи
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Автоматичне приховування
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);

    // Закриття по кліку
    notification.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
}

// ===== ДОДАТКОВІ ЕФЕКТИ ТА АНІМАЦІЇ =====

// Ефект печатання для тексту
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Генерація реалістичних падаючих зірок
function createFallingStar() {
    const star = document.createElement('div');
    const size = Math.random() * 3 + 2; // Розмір від 2px до 5px
    const brightness = Math.random() * 0.4 + 0.6; // Яскравість від 0.6 до 1

    star.style.position = 'fixed';
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    star.style.background = `radial-gradient(circle, rgba(255, 255, 255, ${brightness}) 0%, rgba(255, 255, 255, ${brightness * 0.6}) 50%, transparent 100%)`;
    star.style.borderRadius = '50%';
    star.style.left = Math.random() * window.innerWidth + 'px';
    star.style.top = '-20px';
    star.style.pointerEvents = 'none';
    star.style.zIndex = '-1';

    // Реалістичне мерехтіння
    const glowSize = Math.random() * 12 + 6;
    star.style.boxShadow = `0 0 ${glowSize}px rgba(255, 255, 255, ${brightness * 0.7}), 0 0 ${glowSize * 1.5}px rgba(255, 255, 255, ${brightness * 0.3})`;

    document.body.appendChild(star);

    // Анімація падіння зірки
    const duration = Math.random() * 4000 + 3000; // 3-7 секунд
    const horizontalMove = Math.random() * 100 - 50; // Невеликий горизонтальний рух

    const animation = star.animate([
        {
            transform: 'translateY(-20px) translateX(0px) scale(0)',
            opacity: 0
        },
        {
            transform: 'translateY(30px) translateX(10px) scale(1)',
            opacity: brightness,
            offset: 0.1
        },
        {
            transform: `translateY(${window.innerHeight + 50}px) translateX(${horizontalMove}px) scale(0.8)`,
            opacity: brightness * 0.7,
            offset: 0.9
        },
        {
            transform: `translateY(${window.innerHeight + 100}px) translateX(${horizontalMove}px) scale(0)`,
            opacity: 0
        }
    ], {
        duration: duration,
        easing: 'ease-out'
    });

    animation.onfinish = () => {
        star.remove();
    };
}

// Запуск генерації падаючих зірок
setInterval(createFallingStar, 800); // Зірки кожні 0.8 секунди

// Додаткова генерація зірок для більшої щільності
setTimeout(() => {
    setInterval(createFallingStar, 1500); // Додаткові зірки кожні 1.5 секунди
}, 400);

// ===== ОБРОБКА ПОМИЛОК ТА ВІДЛАДКА =====
window.addEventListener('error', function(e) {
    console.error('Помилка на сайті:', e.error);
});

// Виправлення застарілих методів
function getScrollPosition() {
    return window.scrollY || document.documentElement.scrollTop;
}

// Оновлення функцій з виправленими методами
function updateScrollEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = getScrollPosition();
        const header = document.querySelector('.header');

        if (header) {
            if (scrolled > 100) {
                header.style.background = 'rgba(15, 15, 35, 0.95)';
            } else {
                header.style.background = 'rgba(15, 15, 35, 0.8)';
            }
        }

        // Паралакс ефект для фону
        const parallaxElements = document.querySelectorAll('.floating-particles, .grid-overlay');
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Ініціалізація оновлених ефектів прокрутки
updateScrollEffects();

// ===== ДОДАВАННЯ CSS АНІМАЦІЙ ЧЕРЕЗ JAVASCRIPT =====
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .notification {
        font-family: 'Inter', sans-serif;
        cursor: pointer;
    }

    .notification:hover {
        transform: translateX(-5px) !important;
    }
`;
document.head.appendChild(style);

// ===== ФІНАЛЬНА ІНІЦІАЛІЗАЦІЯ =====
console.log('✅ Всі JavaScript компоненти Leonar Client ініціалізовано успішно!');
