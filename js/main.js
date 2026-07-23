// ========== 新疆人力资源服务协会 - 主脚本 ==========

document.addEventListener('DOMContentLoaded', function() {

    // ----- 头部滚动效果 -----
    const header = document.getElementById('header');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // ----- 回到顶部 -----
    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ----- 移动端菜单 -----
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');

    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.classList.toggle('active');
    });

    // 点击导航链接后关闭菜单
    nav.querySelectorAll('.nav-link').forEach(function(link) {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    // ----- 平滑滚动 -----
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var target = document.querySelector(targetId);
            if (target) {
                var offset = header.offsetHeight + 10;
                var top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

    // ----- 导航高亮 -----
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        var scrollPos = window.scrollY + header.offsetHeight + 50;

        sections.forEach(function(section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(function(link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // ----- 数字动画 -----
    var statNumbers = document.querySelectorAll('.stat-number');
    var statsAnimated = false;

    function animateNumbers() {
        if (statsAnimated) return;

        var statsSection = document.querySelector('.stats');
        var rect = statsSection.getBoundingClientRect();

        if (rect.top < window.innerHeight && rect.bottom > 0) {
            statsAnimated = true;

            statNumbers.forEach(function(num) {
                var target = parseInt(num.getAttribute('data-target'));
                var duration = 2000;
                var start = 0;
                var startTime = null;

                function update(timestamp) {
                    if (!startTime) startTime = timestamp;
                    var progress = Math.min((timestamp - startTime) / duration, 1);
                    // easeOutCubic
                    var eased = 1 - Math.pow(1 - progress, 3);
                    var current = Math.floor(eased * target);
                    num.textContent = current.toLocaleString();
                    if (progress < 1) {
                        requestAnimationFrame(update);
                    } else {
                        num.textContent = target.toLocaleString();
                    }
                }

                requestAnimationFrame(update);
            });
        }
    }

    window.addEventListener('scroll', animateNumbers);
    animateNumbers(); // 初始检查

    // ----- 新闻标签筛选 -----
    var tabBtns = document.querySelectorAll('.tab-btn');
    var newsCards = document.querySelectorAll('.news-card');

    tabBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            tabBtns.forEach(function(b) { b.classList.remove('active'); });
            this.classList.add('active');

            var tab = this.getAttribute('data-tab');

            newsCards.forEach(function(card) {
                if (tab === 'all' || card.getAttribute('data-category') === tab) {
                    card.style.display = '';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(function() {
                        card.style.transition = 'all 0.4s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ----- 联系表单 -----
    var contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        var formData = new FormData(contactForm);
        var data = {};
        formData.forEach(function(value, key) {
            data[key] = value;
        });

        // 简单验证
        if (!data.name || !data.phone || !data.message) {
            alert('请填写必填项（姓名、电话、留言内容）');
            return;
        }

        // 这里可以对接后端 API
        // 目前仅做前端演示
        var submitBtn = contactForm.querySelector('button[type="submit"]');
        var originalText = submitBtn.textContent;
        submitBtn.textContent = '提交中...';
        submitBtn.disabled = true;

        setTimeout(function() {
            alert('感谢您的留言！我们会尽快与您联系。');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1000);
    });

    // ----- 滚动动画（Intersection Observer） -----
    if ('IntersectionObserver' in window) {
        var animateElements = document.querySelectorAll(
            '.about-grid, .org-node, .charter-item, .news-card, .policy-card, .service-card, .contact-item'
        );

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animateElements.forEach(function(el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
    }

});
