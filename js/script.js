// Acervo de Projetos Artísticos dos Alunos
const projects = [
  {
    title: "Landing Page - SESI",
    author: "Ângelo A. da Silva",
    category: "HTML & CSS",
    image: "https://i.ibb.co/HkLw62N/landing-page-SESI.png",
    description:
      "Nesse Projeto o objetivo era criar uma landing page funcional para um programa integrado as funcionalidades SESI para ajudar os estudantes a se inscreverem no ENEM"
  },
  {
    title: "Pagina Revista de Moda",
    author: "Ângelo A. da Silva",
    category: "FIGMA - Desing Editorial",
    image: "https://i.ibb.co/27nhrjDR/Captura-de-tela-2026-08-12-231747.png",
    description:
      "Projeto pensado para um treinamento de layouts utilizando a plataforma FIGMA. Estudo de ritmo visual e espaço negativo aplicado.",
  },
  {
    title: "Pagina Dupla de Revista",
    author: "Ângelo A. da Silva",
    category: "FIGMA - Design Editorial",
    image: "https://i.ibb.co/vCSkB0MR/Captura-de-tela-2026-08-12-231730.png",
    description:
      "Projeto pensado para um treinamento de layouts utilizando a plataforma FIGMA. Estudo de ritmo visual e espaço negativo aplicado.",
  },
  {
    title: "Projeto Semestral - Flash Acadêmico",
    author: "Ângelo A. da Silva, Vitória de Souza Toppan",
    category: "HTML, CSS & JS",
    image: "https://i.ibb.co/gZ9gp8JJ/Flash-Academico.png",
    description:
      "Projeto com objetivo de criar um site funcional do zero com paginação, identidade visual propria, .",
  },
  {
    title: "Propaganda Vestibular - Morrison University",
    author: "Ângelo A. da Silva",
    category: "Photoshop & Illustrator - Desing Editorial ",
    image: "https://i.ibb.co/LMrzmRY/atividade-7-angelo-a-da-silva.png",
    description:
      "Projeto para a promoção de cursos de graduação em diversas áreas.",
  },
  {
    title: "Primeiro site",
    author: "Ângelo A. da Silva",
    category: "HTML & CSS",
    image: "https://i.ibb.co/Q3SC6K2W/Captura-de-tela-2026-08-20-122843.png",
    description:
      "Minha primeira tentativa de fazer um site usando elementos de HTML & CSS.",
  },
  {
    title: "Validador de Descontos",
    author: "Ângelo A. da Silva",
    category: "JavaScript",
    image: "https://i.ibb.co/LXX2ZZ49/Validador-de-Desconto-de-E-commerce.png",
    description:
      "Um dos registros do começo do meu estudo em JS. O código em questão é usado para validar um desconto de uma loja online em relação a primeira compra ou ativação de um cupom pelo usuario.",
  },
  {
    title: "Sorteio Power-Glove",
    author: "Arthur F. Almeida",
    category: "HTML, CSS & JS - Menção Honrrosa",
    image: "https://i.ibb.co/FbWG29ds/power-glove.png",
    description:
      "Projeto para construir um formulário onde o JS faria a verificação de dados inseridos pelo usuário.",
  },
];

// Seletores do DOM
const galleryGrid = document.getElementById("gallery-grid");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxTag = document.getElementById("lightbox-tag");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxAuthor = document.getElementById("lightbox-author");
const lightboxDescription = document.getElementById("lightbox-description",);
const lightboxCounter = document.getElementById("lightbox-counter");
const closeBtn = document.getElementById("close-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

let currentIndex = 0;

// Renderização dos Quadros na Galeria
function renderGallery() {
  galleryGrid.innerHTML = "";
  projects.forEach((proj, index) => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
                    <div class="thumbnail-container">
                        <img src="${proj.image}" alt="${proj.title}" class="project-thumbnail" loading="lazy">
                    </div>
                    <div class="card-details">
                        <span class="card-tag">${proj.category}</span>
                        <h3 class="card-title">${proj.title}</h3>
                        <p class="card-author">Por ${proj.author}</p>
                    </div>
                `;
    card.addEventListener("click", () => openLightbox(index));
    galleryGrid.appendChild(card);
  });
}

// Atualização do Modal com dados da obra
function updateLightboxContent(index) {
  const proj = projects[index];
  lightboxImg.src = proj.image;
  lightboxImg.alt = proj.title;
  lightboxTag.textContent = proj.category;
  lightboxTitle.textContent = proj.title;
  lightboxAuthor.textContent = `Obra concebida por ${proj.author}`;
  lightboxDescription.textContent = proj.description;

  // Contador formatado com dois dígitos no estilo curadoria de arte (ex: "03 / 08")
  const currentFormatted = String(index + 1).padStart(2, "0");
  const totalFormatted = String(projects.length).padStart(2, "0");
  lightboxCounter.textContent = `${currentFormatted} / ${totalFormatted}`;
}

function openLightbox(index) {
  currentIndex = index;
  updateLightboxContent(currentIndex);
  lightbox.classList.add("active");
  lightbox.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
}

function navigate(direction) {
  currentIndex += direction;
  if (currentIndex >= projects.length) currentIndex = 0;
  if (currentIndex < 0) currentIndex = projects.length - 1;
  updateLightboxContent(currentIndex);
}

// Listeners de Interação
closeBtn.addEventListener("click", closeLightbox);
prevBtn.addEventListener("click", () => navigate(-1));
nextBtn.addEventListener("click", () => navigate(1));

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") navigate(1);
  if (e.key === "ArrowLeft") navigate(-1);
});

// Inicializa a galeria
renderGallery();