document.addEventListener('DOMContentLoaded', function () {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Theme Toggle Initialization - Improved Version
    const themeToggle = document.getElementById('themeToggle') || document.querySelector('.theme-toggle');
    const icon = themeToggle?.querySelector('i');
    const html = document.documentElement;

    // Function to set theme and save preference
    function setTheme(theme) {
        if (theme === 'dark') {
            html.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            if (icon) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        } else {
            html.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            if (icon) {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
    }

    // Function to initialize theme based on user preference or system preference
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Use saved theme if exists, otherwise use system preference
        if (savedTheme) {
            setTheme(savedTheme);
        } else {
            setTheme(prefersDark ? 'dark' : 'light');
        }
    }

    // Function to toggle between themes
    function toggleTheme() {
        const currentTheme = html.getAttribute('data-theme');
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    }

    // Initialize theme on page load
    initTheme();

    // Add click event to theme toggle button
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Watch for system theme changes (only if user hasn't set a preference)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');

    hamburger?.addEventListener('click', function () {
        this.classList.toggle('active');
        navMenu?.classList.toggle('active');
    });

    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });

    // Sticky header
    window.addEventListener('scroll', function () {
        const header = document.getElementById('header');
        if (!header) return;

        if (window.scrollY > 100) {
            header.style.background = 'var(--card-bg)';
            header.style.boxShadow = 'var(--card-shadow)';
        } else {
            header.style.background = 'transparent';
            header.style.boxShadow = 'none';
        }
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId) return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Skill bar animation
    const skillBars = document.querySelectorAll('.progress');
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            if (barPosition < screenPosition) {
                const finalWidth = bar.getAttribute('data-width') || bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = finalWidth;
                }, 100);
            }
        });
    };
    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars();

    // Coding Background Animation
    const codingBackground = document.getElementById('codingBackground');
    if (codingBackground) {
        const colors = ['#00aaff', '#ff00aa', '#00ffaa', '#ffff00'];
        const codeSnippets = [
            'function animate() { ... }',
            'const portfolio = new Portfolio();',
            'import React from "react";',
            'System.out.println("Hello");',
            'public static void main',
            '@GetMapping("/api")',
            'List<String> names = new ArrayList<>();',
            'docker-compose up -d',
            'git commit -m "update"',
            'mvn spring-boot:run',
            'public class Controller { ... }',
            '@Service public class ServiceImpl',
            'SELECT * FROM projects;',
            'printf("Debug");',
            'for(int i=0; i<10; i++)',
            '@Entity public class Project'
        ];

        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789{}[]();:<>+=!@#$%^&*";
        const keywords = ["function", "const", "let", "var", "if", "else", "for", "while", "return", "class"];
        let lastAnimationTime = 0;
        const animationInterval = 100;

        function createCodeLine(timestamp) {
            if (!lastAnimationTime || timestamp - lastAnimationTime > animationInterval) {
                lastAnimationTime = timestamp;

                const line = document.createElement('div');
                line.className = 'code-line';

                const useSnippet = Math.random() > 0.5;
                line.textContent = useSnippet
                    ? codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
                    : (Math.random() > 0.7
                        ? keywords[Math.floor(Math.random() * keywords.length)] + ' ' +
                          Array.from({ length: 5 + Math.floor(Math.random() * 10) }, () =>
                              characters.charAt(Math.floor(Math.random() * characters.length))
                          ).join('')
                        : Array.from({ length: 10 + Math.floor(Math.random() * 20) }, () =>
                              characters.charAt(Math.floor(Math.random() * characters.length))
                          ).join('')
                    );

                line.style.left = `${Math.random() * 90}%`;
                line.style.color = colors[Math.floor(Math.random() * colors.length)];
                line.style.animationDuration = `${5 + Math.random() * 10}s`;

                codingBackground.appendChild(line);

                setTimeout(() => line.remove(), parseFloat(line.style.animationDuration) * 1000);
            }

            requestAnimationFrame(createCodeLine);
        }

        requestAnimationFrame(createCodeLine);
    }

    // Animate all section-title elements with split color and scroll trigger
    (function animateAllSectionTitles() {
        const sectionTitles = document.querySelectorAll('.section-title');

        sectionTitles.forEach(sectionTitle => {
            const text = sectionTitle.textContent.trim();
            const [firstWord, ...rest] = text.split(' ');
            const secondWord = rest.join(' ');

            sectionTitle.textContent = '';
            let delay = 0;

            function wrapWord(word, className = '') {
                return word.split('').map(char => {
                    const span = document.createElement('span');
                    span.textContent = char;
                    if (className) span.classList.add(className);
                    span.style.animationPlayState = 'paused';
                    span.style.animationDelay = `${delay}s`;
                    delay += 0.1;
                    return span;
                });
            }

            const firstSpans = wrapWord(firstWord);
            const space = document.createTextNode(' ');
            const secondSpans = wrapWord(secondWord, 'blue');

            firstSpans.forEach(span => sectionTitle.appendChild(span));
            sectionTitle.appendChild(space);
            secondSpans.forEach(span => sectionTitle.appendChild(span));

            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        sectionTitle.querySelectorAll('span').forEach(span => {
                            span.style.animationPlayState = 'running';
                        });
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(sectionTitle);
        });
    })();
});