/* تغيير لون النص وحجمه */
const styleDemo = document.getElementById("style-demo");
const colorButton = document.getElementById("color-button");
const sizeButton = document.getElementById("size-button");

colorButton.addEventListener("click", function () {
    const isPink = styleDemo.classList.toggle("is-pink");

    colorButton.setAttribute("aria-pressed", String(isPink));
    colorButton.textContent = isPink
        ? "أعيدي اللون الأصلي"
        : "غيّري اللون";
});

sizeButton.addEventListener("click", function () {
    const isLarge = styleDemo.classList.toggle("is-large");

    sizeButton.setAttribute("aria-pressed", String(isLarge));
    sizeButton.textContent = isLarge
        ? "أعيدي الحجم الأصلي"
        : "كبّري النص";
});

/* العدّاد */
const counterValue = document.getElementById("counter-value");
const increaseButton = document.getElementById("increase-button");
const resetButton = document.getElementById("reset-button");

let count = 0;

increaseButton.addEventListener("click", function () {
    count = count + 1;
    counterValue.textContent = count;
});

resetButton.addEventListener("click", function () {
    count = 0;
    counterValue.textContent = count;
});

/* ظهور الأقسام تدريجيًا */
const sections = document.querySelectorAll(".reveal");
const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);

if ("IntersectionObserver" in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.remove("is-pending");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0,
            rootMargin: "0px 0px -30px 0px"
        }
    );

    sections.forEach(function (section) {
        const position = section.getBoundingClientRect();

        if (position.top >= window.innerHeight) {
            observer.observe(section);
            section.classList.add("is-pending");
        }
    });

    /* إظهار وجهة الرابط قبل بدء الانتقال */
    const nextLinks = document.querySelectorAll(".next-section");

    nextLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            const targetId = link.getAttribute("href").slice(1);
            const target = document.getElementById(targetId);

            if (target) {
                target.classList.remove("is-pending");
                observer.unobserve(target);
            }
        });
    });

    /* دعم فتح رابط قسم مباشرةً */
    function showLinkedSection() {
        const targetId = window.location.hash.slice(1);
        const target = document.getElementById(targetId);

        if (target) {
            target.classList.remove("is-pending");
            observer.unobserve(target);
        }
    }

    window.addEventListener("hashchange", showLinkedSection);
    showLinkedSection();

    /* دعم التنقل بلوحة المفاتيح */
    sections.forEach(function (section) {
        section.addEventListener("focusin", function () {
            section.classList.remove("is-pending");
            observer.unobserve(section);
        });
    });
}