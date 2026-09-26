/* =====================================================
   MINECRAFT PORTFOLIO
   MAIN JAVASCRIPT
===================================================== */


/* =====================================================
   MOBILE MENU
===================================================== */

const menuBtn =
  document.getElementById("menuBtn");

const nav =
  document.getElementById("nav");

if (menuBtn && nav) {

  menuBtn.addEventListener(
    "click",
    () => {

      nav.classList.toggle("open");

    }
  );

  document
    .querySelectorAll("#nav a")
    .forEach(link => {

      link.addEventListener(
        "click",
        () => {

          nav.classList.remove("open");

        }
      );

    });

}


/* =====================================================
   SCROLL REVEAL
===================================================== */

const observer =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "show"
          );

        }

      });

    },
    {
      threshold: 0.12
    }
  );


document
  .querySelectorAll(".reveal")
  .forEach(element => {

    observer.observe(element);

  });


/* =====================================================
   BACKGROUND PARTICLES
===================================================== */

const particles =
  document.getElementById(
    "particles"
  );


if (particles) {

  for (let i = 0; i < 35; i++) {

    const particle =
      document.createElement("i");

    particle.className =
      "particle";

    particle.style.left =
      Math.random() * 100 + "%";

    particle.style.animationDelay =
      Math.random() * 8 + "s";

    particle.style.animationDuration =
      5 + Math.random() * 8 + "s";

    particle.style.opacity =
      0.15 + Math.random() * 0.4;

    const size =
      2 + Math.random() * 5;

    particle.style.width =
      size + "px";

    particle.style.height =
      size + "px";

    particles.appendChild(
      particle
    );

  }

}


/* =====================================================
   ACTIVE NAV
===================================================== */

const sections =
  document.querySelectorAll(
    "section[id]"
  );

const navLinks =
  document.querySelectorAll(
    "#nav a"
  );


window.addEventListener(
  "scroll",
  () => {

    let current =
      "home";

    sections.forEach(
      section => {

        if (
          window.scrollY >=
          section.offsetTop - 180
        ) {

          current =
            section.id;

        }

      }
    );

    navLinks.forEach(
      link => {

        link.classList.toggle(
          "active",
          link.getAttribute("href") ===
            "#" + current
        );

      }
    );

  }
);


/* =====================================================
   FLOATING ITEMS
===================================================== */

document
  .querySelectorAll(
    ".skill .icon"
  )
  .forEach(
    (icon, index) => {

      icon.classList.add(
        "floating-item"
      );

      icon.style.setProperty(
        "--float-delay",
        `${index * 0.25}s`
      );

    }
  );


/* =====================================================
   DESKTOP CHECK
===================================================== */

const finePointer =
  window.matchMedia(
    "(pointer: fine)"
  ).matches;


/* =====================================================
   EMERALD CURSOR
===================================================== */

if (finePointer) {

  const cursor =
    document.createElement("div");

  cursor.id =
    "emeraldCursor";

  cursor.innerHTML = `
    <div class="emerald-pixel"></div>
  `;

  document.body.appendChild(
    cursor
  );

  document.body.classList.add(
    "mc-cursor-active"
  );


  let mouseX = 0;
  let mouseY = 0;

  let cursorX = 0;
  let cursorY = 0;


  document.addEventListener(
    "mousemove",
    event => {

      mouseX =
        event.clientX;

      mouseY =
        event.clientY;

      createMouseParticle(
        mouseX,
        mouseY
      );

    }
  );


  function moveCursor() {

    cursorX +=
      (mouseX - cursorX) *
      0.18;

    cursorY +=
      (mouseY - cursorY) *
      0.18;

    cursor.style.transform =
      `translate3d(
        ${cursorX}px,
        ${cursorY}px,
        0
      )`;

    requestAnimationFrame(
      moveCursor
    );

  }

  moveCursor();


  document
    .querySelectorAll(
      "a, button"
    )
    .forEach(element => {

      element.addEventListener(
        "mouseenter",
        () => {

          cursor.classList.add(
            "cursor-hover"
          );

        }
      );

      element.addEventListener(
        "mouseleave",
        () => {

          cursor.classList.remove(
            "cursor-hover"
          );

        }
      );

    });

}


/* =====================================================
   MOUSE PARTICLE TRAIL
===================================================== */

let lastParticle =
  0;


function createMouseParticle(
  x,
  y
) {

  if (!finePointer) {
    return;
  }


  const now =
    Date.now();


  if (
    now - lastParticle <
    35
  ) {
    return;
  }


  lastParticle =
    now;


  const particle =
    document.createElement("span");

  particle.className =
    "mouse-particle";


  particle.style.left =
    x + "px";

  particle.style.top =
    y + "px";


  const size =
    3 + Math.random() * 5;

  particle.style.width =
    size + "px";

  particle.style.height =
    size + "px";


  particle.style.setProperty(
    "--random-x",
    `${(Math.random() - .5) * 35}px`
  );

  particle.style.setProperty(
    "--random-y",
    `${(Math.random() - .5) * 35}px`
  );


  document.body.appendChild(
    particle
  );


  setTimeout(
    () => {

      particle.remove();

    },
    600
  );

}


/* =====================================================
   MINECRAFT PARALLAX
===================================================== */

if (finePointer) {

  const hero =
    document.querySelector(
      ".hero"
    );

  const heroImage =
    document.querySelector(
      ".hero-image"
    );

  const heroCopy =
    document.querySelector(
      ".hero-copy"
    );

  const glow =
    document.querySelector(
      ".image-glow"
    );


  if (hero) {

    hero.addEventListener(
      "mousemove",
      event => {

        const rect =
          hero.getBoundingClientRect();


        const x =
          event.clientX -
          rect.left;

        const y =
          event.clientY -
          rect.top;


        const centerX =
          rect.width / 2;

        const centerY =
          rect.height / 2;


        const moveX =
          (x - centerX) /
          centerX;

        const moveY =
          (y - centerY) /
          centerY;


        if (heroImage) {

          heroImage.style.transform =
            `translate(
              ${moveX * 12}px,
              ${moveY * 8}px
            ) scale(1.03)`;

        }


        if (heroCopy) {

          heroCopy.style.transform =
            `translate(
              ${moveX * -5}px,
              ${moveY * -3}px
            )`;

        }


        if (glow) {

          glow.style.transform =
            `translate(
              ${moveX * 20}px,
              ${moveY * 15}px
            )`;

        }

      }
    );


    hero.addEventListener(
      "mouseleave",
      () => {

        if (heroImage) {

          heroImage.style.transform =
            "";

        }

        if (heroCopy) {

          heroCopy.style.transform =
            "";

        }

        if (glow) {

          glow.style.transform =
            "";

        }

      }
    );

  }

}


/* =====================================================
   MINECRAFT BEDROCK LOADING
===================================================== */

function createBedrockLoading() {

  let loading =
    document.getElementById(
      "bedrockLoading"
    );


  if (loading) {
    return loading;
  }


  loading =
    document.createElement(
      "div"
    );


  loading.id =
    "bedrockLoading";


  loading.innerHTML = `

    <div class="bedrock-loading-content">

      <div class="minecraft-loading-logo">
        MINECRAFT
      </div>

      <div
        class="bedrock-loading-edition"
        id="loadingSectionName"
      >
        HOME
      </div>

      <div
        class="bedrock-loading-text"
        id="loadingWorldText"
      >
        Loading Home...
      </div>

      <div class="bedrock-loading-bar">

        <div class="bedrock-loading-progress">
        </div>

      </div>

      <div class="bedrock-loading-percent">
        0%
      </div>

      <div class="bedrock-loading-dots">

        <span></span>
        <span></span>
        <span></span>

      </div>

    </div>

  `;


  document.body.appendChild(
    loading
  );


  return loading;

}


/* =====================================================
   GET SECTION NAME
===================================================== */

function getSectionName(
  target
) {

  const element =
    document.querySelector(
      target
    );


  if (!element) {
    return "HOME";
  }


  const id =
    element.getAttribute(
      "id"
    );


  if (!id) {
    return "HOME";
  }


  const names = {

    home: "Bosh sahifa",

    about: "Men Haqimda",

    skills: "Ko‘nikmalar",

    projects: "Loyihalar",

    contact: "Kontakt"

  };


  return (
    names[id.toLowerCase()] ||
    id.toUpperCase()
  );

}


/* =====================================================
   BEDROCK LOADING FUNCTION
===================================================== */

function bedrockLoading(
  target
) {

  const loading =
    createBedrockLoading();


  const progress =
    loading.querySelector(
      ".bedrock-loading-progress"
    );


  const percent =
    loading.querySelector(
      ".bedrock-loading-percent"
    );


  const sectionName =
    loading.querySelector(
      "#loadingSectionName"
    );


  const worldText =
    loading.querySelector(
      "#loadingWorldText"
    );


  /* ---------------------------------------------
     SECTION NOMINI ANIQLASH
  --------------------------------------------- */

  const name =
    getSectionName(
      target
    );


  /* ---------------------------------------------
     SECTION NOMINI KO‘RSATISH
  --------------------------------------------- */

  if (sectionName) {

    sectionName.textContent =
      name;

  }


  /* ---------------------------------------------
     LOADING MATNINI O‘ZGARTIRISH
  --------------------------------------------- */

  if (worldText) {

    worldText.textContent =
      `Loading ${name.charAt(0) + name.slice(1).toLowerCase()}...`;

  }


  /* ---------------------------------------------
     LOADINGNI BOSHLASH
  --------------------------------------------- */

  loading.classList.remove(
    "hide"
  );


  progress.style.width =
    "0%";


  percent.textContent =
    "0%";


  let value = 0;


  /* ---------------------------------------------
     OLDINGI INTERVAL BO‘LSA TO‘XTATISH
  --------------------------------------------- */

  if (
    loading.loadingInterval
  ) {

    clearInterval(
      loading.loadingInterval
    );

  }


  /* ---------------------------------------------
     PROGRESS ANIMATION
  --------------------------------------------- */

  loading.loadingInterval =
    setInterval(
      () => {

        value +=
          Math.floor(
            Math.random() * 7
          ) + 4;


        if (value >= 100) {

          value = 100;


          progress.style.width =
            "100%";


          percent.textContent =
            "100%";


          clearInterval(
            loading.loadingInterval
          );


          setTimeout(
            () => {

              const element =
                document.querySelector(
                  target
                );


              if (element) {

                element.scrollIntoView({
                  behavior: "smooth",
                  block: "start"
                });

              }


              history.replaceState(
                null,
                "",
                target
              );


              setTimeout(
                () => {

                  loading.classList.add(
                    "hide"
                  );

                },
                100
              );


            },
            250
          );


          return;

        }


        progress.style.width =
          `${value}%`;


        percent.textContent =
          `${value}%`;

      },
      70
    );

}


/* =====================================================
   SECTION NAVIGATION
===================================================== */

document
  .querySelectorAll(
    'a[href^="#"]'
  )
  .forEach(
    link => {

      link.addEventListener(
        "click",
        event => {

          const target =
            link.getAttribute(
              "href"
            );


          if (
            !target ||
            target === "#" ||
            !document.querySelector(
              target
            )
          ) {

            return;

          }


          event.preventDefault();


          /* -------------------------------------------
             MOBILE MENU YOPISH
          ------------------------------------------- */

          if (nav) {

            nav.classList.remove(
              "open"
            );

          }


          /* -------------------------------------------
             BEDROCK LOADING
          ------------------------------------------- */

          bedrockLoading(
            target
          );

        }
      );

    }
  );


/* =====================================================
   PROJECT 3D EFFECT
===================================================== */

if (finePointer) {

  document
    .querySelectorAll(
      ".latest-card"
    )
    .forEach(
      card => {

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


            const rotateX =
              ((y - rect.height / 2) /
                rect.height) *
              -5;


            const rotateY =
              ((x - rect.width / 2) /
                rect.width) *
              5;


            card.style.transform =
              `perspective(800px)
               rotateX(${rotateX}deg)
               rotateY(${rotateY}deg)
               translateY(-5px)`;

          }
        );


        card.addEventListener(
          "mouseleave",
          () => {

            card.style.transform =
              "";

          }
        );

      }
    );

}


/* =====================================================
   BUTTON EFFECT
===================================================== */

document
  .querySelectorAll(
    ".btn"
  )
  .forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          button.classList.add(
            "minecraft-click"
          );


          setTimeout(
            () => {

              button.classList.remove(
                "minecraft-click"
              );

            },
            250
          );

        }
      );

    }
  );


/* =====================================================
   FINISHED
===================================================== */

console.log(
  "Minecraft Portfolio loaded successfully!"
);