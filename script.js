gsap.registerPlugin(ScrollTrigger);

const loader = document.getElementById("loader");
const loaderBar = document.querySelector(".loader-line div");
const loaderPercent = document.querySelector(".loader-percent");

let loaderProgress = 0;

const loaderInterval = setInterval(() => {
    loaderProgress += Math.floor(Math.random() * 8) + 3;

    if (loaderProgress >= 100) {
        loaderProgress = 100;
        clearInterval(loaderInterval);

        setTimeout(() => {
            gsap.to(loader, {
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                onComplete: () => {
                    loader.style.display = "none";
                    document.body.classList.add("loaded");
                    ScrollTrigger.refresh();
                }
            });
        }, 500);
    }

    loaderBar.style.width = loaderProgress + "%";
    loaderPercent.textContent = loaderProgress + "%";
}, 100);

const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");
const cursorTrail = document.querySelector(".cursor-trail");

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", event => {
    mouseX = event.clientX;
    mouseY = event.clientY;

    gsap.to(cursorDot, {
        x: mouseX,
        y: mouseY,
        duration: .05
    });

    gsap.to(cursorRing, {
        x: mouseX,
        y: mouseY,
        duration: .22,
        ease: "power2.out"
    });

    gsap.to(cursorTrail, {
        x: mouseX,
        y: mouseY,
        duration: .5,
        ease: "power3.out"
    });
});

document
    .querySelectorAll("a,button,.tilt,.skill-card,.service-card")
    .forEach(element => {
        element.addEventListener("mouseenter", () => {
            gsap.to(cursorRing, {
                width: 65,
                height: 65,
                borderColor: "rgba(0,245,255,.9)",
                background: "rgba(0,245,255,.05)",
                duration: .25
            });
        });

        element.addEventListener("mouseleave", () => {
            gsap.to(cursorRing, {
                width: 38,
                height: 38,
                borderColor: "rgba(0,245,255,.6)",
                background: "transparent",
                duration: .25
            });
        });
    });

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("active");

        const icon = menuBtn.querySelector("i");

        if (navMenu.classList.contains("active")) {
            icon.className = "fa-solid fa-xmark";
        } else {
            icon.className = "fa-solid fa-bars";
        }
    });

    document
        .querySelectorAll("#navMenu a")
        .forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");

                const icon = menuBtn.querySelector("i");

                if (icon) {
                    icon.className = "fa-solid fa-bars";
                }
            });
        });
}

const progressBar = document.querySelector(".scroll-progress div");

if (progressBar) {
    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const documentHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const percentage =
            documentHeight > 0
                ? (scrollTop / documentHeight) * 100
                : 0;

        progressBar.style.width = percentage + "%";
    });
}

const typingElement = document.getElementById("typing");

const words = [
    "SOFTWARE DEVELOPER",
    "PROGRAMADOR",
    "CREADOR DIGITAL",
    "ENTUSIASTA DE LA TECNOLOGÍA",
    "INGENIERO EN FORMACIÓN",
    "DESARROLLADOR WEB",
    "TECH EXPLORER"
];

let wordIndex = 0;
let characterIndex = 0;
let deleting = false;

function typing() {
    if (!typingElement) {
        return;
    }

    const currentWord = words[wordIndex];

    if (!deleting) {
        characterIndex++;

        typingElement.textContent =
            currentWord.substring(0, characterIndex);

        if (characterIndex >= currentWord.length) {
            deleting = true;

            setTimeout(typing, 1700);

            return;
        }
    } else {
        characterIndex--;

        typingElement.textContent =
            currentWord.substring(0, characterIndex);

        if (characterIndex <= 0) {
            deleting = false;

            wordIndex =
                (wordIndex + 1) % words.length;
        }
    }

    setTimeout(
        typing,
        deleting ? 35 : 70
    );
}

typing();

const heroTimeline = gsap.timeline({
    defaults: {
        ease: "power4.out"
    }
});

heroTimeline
    .from(".hero-status", {
        y: 40,
        opacity: 0,
        duration: .7
    })
    .from(".hero-mini-label", {
        y: 25,
        opacity: 0,
        duration: .5
    }, "-=.3")
    .from(".title-small", {
        y: 30,
        opacity: 0,
        duration: .5
    }, "-=.2")
    .from(".title-main", {
        y: 90,
        opacity: 0,
        duration: 1,
        stagger: .12
    }, "-=.3")
    .from(".title-outline", {
        y: 50,
        opacity: 0,
        duration: .7
    }, "-=.5")
    .from(".typing-box", {
        y: 30,
        opacity: 0,
        duration: .6
    }, "-=.4")
    .from(".hero-description", {
        y: 30,
        opacity: 0,
        duration: .7
    }, "-=.3")
    .from(".hero-buttons", {
        y: 25,
        opacity: 0,
        duration: .6
    }, "-=.3")
    .from(".hero-social", {
        y: 20,
        opacity: 0,
        duration: .5
    }, "-=.3")
    .from(".hero-stats", {
        y: 20,
        opacity: 0,
        duration: .5
    }, "-=.3")
    .from(".hero-visual", {
        scale: .7,
        opacity: 0,
        rotationY: -20,
        duration: 1.3,
        ease: "power3.out"
    }, "-=1");

gsap.fromTo(
    ".parallax-photo",
    {
        scale: .7,
        opacity: 0,
        yPercent: 20
    },
    {
        scale: 1.2,
        opacity: 1,
        yPercent: 0,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "+=600",
            scrub: 1
        }
    }
);

gsap.to(".hero-content", {
    yPercent: -10,
    ease: "none",
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1
    }
});

gsap.to(".hero-visual", {
    yPercent: -16,
    ease: "none",
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1
    }
});

gsap.to(".hero-grid", {
    yPercent: 20,
    ease: "none",
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 2
    }
});

gsap.to(".orbit-one", {
    rotation: 360,
    duration: 18,
    repeat: -1,
    ease: "none"
});

gsap.to(".orbit-two", {
    rotation: -360,
    duration: 25,
    repeat: -1,
    ease: "none"
});

gsap.to(".orbit-three", {
    rotation: 360,
    duration: 35,
    repeat: -1,
    ease: "none"
});

gsap.to(".ring-a", {
    scale: 1.1,
    opacity: .65,
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 2
    }
});

gsap.to(".ring-b", {
    scale: .8,
    opacity: .3,
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 2
    }
});

gsap.to(".tech-html", {
    rotation: 360,
    duration: 20,
    repeat: -1,
    ease: "none"
});

gsap.to(".tech-js", {
    rotation: -360,
    duration: 24,
    repeat: -1,
    ease: "none"
});

document
    .querySelectorAll(".reveal")
    .forEach(element => {
        gsap.to(element, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: element,
                start: "top 86%",
                toggleActions: "play none none reverse"
            }
        });
    });

gsap.utils
    .toArray(".section-heading")
    .forEach(heading => {
        const label = heading.querySelector(".section-label");
        const title = heading.querySelector("h2");

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: heading,
                start: "top 85%"
            }
        });

        if (label) {
            tl.from(label, {
                x: -30,
                opacity: 0,
                duration: .5
            });
        }

        if (title) {
            tl.from(title, {
                y: 60,
                opacity: 0,
                duration: .8
            }, "-=.2");
        }
    });

gsap.utils
    .toArray(".stat-card")
    .forEach((card, index) => {
        gsap.from(card, {
            scale: .8,
            opacity: 0,
            y: 60,
            duration: .8,
            delay: index * .1,
            scrollTrigger: {
                trigger: ".about-cards",
                start: "top 80%"
            }
        });
    });

document
    .querySelectorAll(".counter")
    .forEach(counter => {
        const target =
            Number(counter.dataset.target);

        ScrollTrigger.create({
            trigger: counter,
            start: "top 85%",
            once: true,
            onEnter: () => {
                const object = {
                    value: 0
                };

                gsap.to(object, {
                    value: target,
                    duration: 1.6,
                    ease: "power2.out",
                    onUpdate: () => {
                        counter.textContent =
                            Math.floor(object.value);
                    }
                });
            }
        });
    });

document
    .querySelectorAll(".skill-progress div")
    .forEach(bar => {
        const width = bar.dataset.width;

        gsap.to(bar, {
            width: width,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
                trigger: bar.closest(".skill-card"),
                start: "top 85%"
            }
        });
    });

gsap.utils
    .toArray(".skill-card")
    .forEach((card, index) => {
        gsap.from(card, {
            y: 80,
            opacity: 0,
            scale: .9,
            duration: .8,
            delay: index * .08,
            scrollTrigger: {
                trigger: card,
                start: "top 88%"
            }
        });
    });

gsap.utils
    .toArray(".service-card")
    .forEach((card, index) => {
        gsap.from(card, {
            y: 70,
            opacity: 0,
            rotationX: 15,
            duration: .9,
            delay: index * .1,
            scrollTrigger: {
                trigger: card,
                start: "top 85%"
            }
        });
    });

gsap.utils
    .toArray(".process-item")
    .forEach((item, index) => {
        gsap.from(item, {
            y: 50,
            opacity: 0,
            scale: .8,
            duration: .7,
            delay: index * .1,
            scrollTrigger: {
                trigger: ".process-grid",
                start: "top 80%"
            }
        });
    });

gsap.utils
    .toArray(".project-card-big")
    .forEach((project, index) => {
        const visual = project.querySelector(".project-visual");
        const info = project.querySelector(".project-info");

        if (info) {
            gsap.from(info, {
                x: index % 2 === 0 ? -80 : 80,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: project,
                    start: "top 80%"
                }
            });
        }

        if (visual) {
            gsap.from(visual, {
                x: index % 2 === 0 ? 100 : -100,
                opacity: 0,
                rotationY: index % 2 === 0 ? -15 : 15,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: project,
                    start: "top 80%"
                }
            });

            gsap.to(visual, {
                yPercent: -7,
                ease: "none",
                scrollTrigger: {
                    trigger: project,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        }
    });

gsap.to(".browser-window", {
    y: -20,
    ease: "none",
    scrollTrigger: {
        trigger: ".project-web",
        start: "top bottom",
        end: "bottom top",
        scrub: 1
    }
});

gsap.to(".iot-core", {
    scale: 1.08,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});

gsap.to(".iot-node", {
    y: -10,
    duration: 1.8,
    repeat: -1,
    yoyo: true,
    stagger: .3,
    ease: "sine.inOut"
});

gsap.to(".dashboard-chart span", {
    scaleY: .7,
    duration: 2,
    repeat: -1,
    yoyo: true,
    stagger: .15,
    ease: "sine.inOut"
});

gsap.utils
    .toArray(".experience-item")
    .forEach((item, index) => {
        gsap.from(item, {
            opacity: 0,
            x: 70,
            duration: .9,
            delay: index * .1,
            scrollTrigger: {
                trigger: item,
                start: "top 85%"
            }
        });
    });

gsap.utils
    .toArray(".education-card")
    .forEach((card, index) => {
        gsap.from(card, {
            y: 70,
            opacity: 0,
            rotationY: index % 2 === 0 ? -10 : 10,
            duration: 1,
            delay: index * .12,
            scrollTrigger: {
                trigger: card,
                start: "top 85%"
            }
        });
    });

gsap.utils
    .toArray(".certificate-card")
    .forEach((card, index) => {
        gsap.from(card, {
            y: 60,
            opacity: 0,
            scale: .9,
            duration: .8,
            delay: index * .12,
            scrollTrigger: {
                trigger: ".certificate-grid",
                start: "top 85%"
            }
        });
    });

gsap.from(".final-content h2", {
    scale: .8,
    opacity: 0,
    duration: 1.2,
    scrollTrigger: {
        trigger: ".final-cta",
        start: "top 70%"
    }
});

gsap.from(".contact-card", {
    y: 70,
    opacity: 0,
    scale: .9,
    stagger: .15,
    duration: 1,
    scrollTrigger: {
        trigger: ".contact-buttons",
        start: "top 85%"
    }
});

document
    .querySelectorAll(".tilt")
    .forEach(card => {
        card.addEventListener("mousemove", event => {
            const rect = card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -7;

            const rotateY =
                ((x - centerX) / centerX) * 7;

            gsap.to(card, {
                rotationX: rotateX,
                rotationY: rotateY,
                transformPerspective: 1000,
                duration: .3,
                ease: "power2.out"
            });
        });

        card.addEventListener("mouseleave", () => {
            gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                duration: .7,
                ease: "elastic.out(1,.5)"
            });
        });
    });

document
    .querySelectorAll(".magnetic")
    .forEach(button => {
        button.addEventListener("mousemove", event => {
            const rect = button.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left -
                rect.width / 2;

            const y =
                event.clientY -
                rect.top -
                rect.height / 2;

            gsap.to(button, {
                x: x * .25,
                y: y * .25,
                duration: .3,
                ease: "power2.out"
            });
        });

        button.addEventListener("mouseleave", () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: .7,
                ease: "elastic.out(1,.5)"
            });
        });
    });

gsap.to(".marquee-content", {
    xPercent: -20,
    ease: "none",
    scrollTrigger: {
        trigger: ".marquee-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    }
});

const canvas = document.getElementById("three-bg");

if (canvas && typeof THREE !== "undefined") {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        .1,
        1000
    );

    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    const particleCount =
        window.innerWidth < 700 ? 550 : 1400;

    const particleGeometry =
        new THREE.BufferGeometry();

    const particlePositions =
        new Float32Array(
            particleCount * 3
        );

    const particleSizes =
        new Float32Array(
            particleCount
        );

    for (
        let i = 0;
        i < particleCount;
        i++
    ) {
        particlePositions[i * 3] =
            (Math.random() - .5) * 22;

        particlePositions[i * 3 + 1] =
            (Math.random() - .5) * 22;

        particlePositions[i * 3 + 2] =
            (Math.random() - .5) * 15;

        particleSizes[i] =
            Math.random();
    }

    particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            particlePositions,
            3
        )
    );

    particleGeometry.setAttribute(
        "size",
        new THREE.BufferAttribute(
            particleSizes,
            1
        )
    );

    const particleMaterial =
        new THREE.PointsMaterial({
            color: 0x00f5ff,
            size: .025,
            transparent: true,
            opacity: .55,
            depthWrite: false
        });

    const particles =
        new THREE.Points(
            particleGeometry,
            particleMaterial
        );

    scene.add(particles);

    const objects = [];

    function createShape(
        geometry,
        color,
        x,
        y,
        z,
        speed,
        opacity = .15
    ) {
        const material =
            new THREE.MeshBasicMaterial({
                color: color,
                wireframe: true,
                transparent: true,
                opacity: opacity
            });

        const mesh =
            new THREE.Mesh(
                geometry,
                material
            );

        mesh.position.set(
            x,
            y,
            z
        );

        mesh.userData.speed =
            speed;

        scene.add(mesh);
        objects.push(mesh);
    }

    createShape(
        new THREE.IcosahedronGeometry(1.3, 1),
        0x00f5ff,
        -4,
        1,
        -4,
        .003,
        .18
    );

    createShape(
        new THREE.OctahedronGeometry(1.2, 1),
        0x8b5cf6,
        4,
        -1,
        -5,
        -.004,
        .16
    );

    createShape(
        new THREE.TorusGeometry(
            1.5,
            .025,
            16,
            100
        ),
        0xec4899,
        3,
        3,
        -6,
        .002,
        .14
    );

    createShape(
        new THREE.DodecahedronGeometry(.9, 0),
        0x00ff9d,
        -4,
        -3,
        -5,
        .003,
        .1
    );

    createShape(
        new THREE.TorusKnotGeometry(
            .7,
            .025,
            80,
            12
        ),
        0x3b82f6,
        5,
        3,
        -7,
        -.002,
        .1
    );

    let threeMouseX = 0;
    let threeMouseY = 0;

    document.addEventListener(
        "mousemove",
        event => {
            threeMouseX =
                (event.clientX /
                    window.innerWidth) - .5;

            threeMouseY =
                (event.clientY /
                    window.innerHeight) - .5;
        }
    );

    let scrollAmount = 0;

    window.addEventListener(
        "scroll",
        () => {
            scrollAmount =
                window.scrollY;
        }
    );

    function animateThree() {
        requestAnimationFrame(
            animateThree
        );

        particles.rotation.y += .00025;
        particles.rotation.x += .00008;

        objects.forEach(object => {
            object.rotation.x +=
                object.userData.speed;

            object.rotation.y +=
                object.userData.speed * 1.5;
        });

        camera.position.x +=
            (
                threeMouseX * .5 -
                camera.position.x
            ) * .015;

        camera.position.y +=
            (
                -threeMouseY * .5 -
                camera.position.y
            ) * .015;

        camera.position.z +=
            (
                6 +
                Math.sin(
                    scrollAmount * .0005
                ) * .15 -
                camera.position.z
            ) * .01;

        camera.lookAt(scene.position);

        renderer.render(
            scene,
            camera
        );
    }

    animateThree();

    window.addEventListener(
        "resize",
        () => {
            camera.aspect =
                window.innerWidth /
                window.innerHeight;

            camera.updateProjectionMatrix();

            renderer.setSize(
                window.innerWidth,
                window.innerHeight
            );

            renderer.setPixelRatio(
                Math.min(
                    window.devicePixelRatio,
                    2
                )
            );
        }
    );
}

const soundBtn =
    document.getElementById("soundBtn");

let soundOn = true;

if (soundBtn) {
    soundBtn.addEventListener(
        "click",
        () => {
            soundOn = !soundOn;

            if (soundOn) {
                soundBtn.innerHTML =
                    '<i class="fa-solid fa-volume-high"></i>';

                document.body.classList.remove(
                    "sound-off"
                );
            } else {
                soundBtn.innerHTML =
                    '<i class="fa-solid fa-volume-xmark"></i>';

                document.body.classList.add(
                    "sound-off"
                );
            }
        }
    );
}

const photoFrame =
    document.querySelector(".photo-frame");

if (photoFrame) {
    gsap.to(photoFrame, {
        y: -10,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
}

document
    .querySelectorAll(".contact-card")
    .forEach(card => {
        card.addEventListener(
            "mousemove",
            event => {
                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                card.style.background =
                    `
                    radial-gradient(
                        circle at
                        ${x}px ${y}px,
                        rgba(0,245,255,.08),
                        rgba(255,255,255,.025)
                    )
                    `;
            }
        );

        card.addEventListener(
            "mouseleave",
            () => {
                card.style.background = "";
            }
        );
    });

document
    .querySelectorAll(".tech-cloud span")
    .forEach((element, index) => {
        gsap.to(element, {
            y: index % 2 === 0 ? -5 : 5,
            duration: 2 + index * .15,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * .08
        });
    });

gsap.utils
    .toArray(".section-number")
    .forEach(number => {
        gsap.to(number, {
            yPercent: -25,
            ease: "none",
            scrollTrigger: {
                trigger: number.closest(".section"),
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });
    });

gsap.to(".photo-system", {
    rotationY: 5,
    ease: "none",
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 2
    }
});

window.addEventListener(
    "load",
    () => {
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 500);
    }
);

document.addEventListener(
    "visibilitychange",
    () => {
        if (document.hidden) {
            document.body.classList.add(
                "page-hidden"
            );
        } else {
            document.body.classList.remove(
                "page-hidden"
            );

            ScrollTrigger.refresh();
        }
    }
);