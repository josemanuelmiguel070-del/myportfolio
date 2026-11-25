const yearElement = document.querySelector("[data-current-year]");
const LINKEDIN_URL = "https://www.linkedin.com/in/jos%C3%A9-miguel-00259a423/";
const FACEBOOK_URL = "https://m.facebook.com/profile.php?id=61580620917176";

if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}

const portrait = document.querySelector("[data-portrait]");
const portraitImage = portrait?.querySelector(".portrait-image");

if (portrait && portraitImage) {
  const showPortrait = () => {
    portrait.classList.add("is-loaded");
    portraitImage.removeAttribute("aria-hidden");
  };

  if (portraitImage.complete && portraitImage.naturalWidth > 0) {
    showPortrait();
  } else {
    portraitImage.addEventListener("load", showPortrait, { once: true });
  }

  portraitImage.addEventListener("error", () => {
    portrait.classList.remove("is-loaded");
  });
}

const socialProfiles = {
  linkedin: LINKEDIN_URL,
  facebook: FACEBOOK_URL,
};

document.querySelectorAll("[data-profile-link]").forEach((link) => {
  const url = socialProfiles[link.dataset.profileLink];

  if (url && url !== "#") {
    link.href = url;
  } else {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      link.setAttribute("aria-label", `${link.textContent.trim()} (URL ainda não configurado)`);
    });
  }
});

const certificateButton = document.querySelector(".certificate-button");
const certificateNotice = document.querySelector("#certificate-notice");

if (certificateButton && certificateNotice) {
  certificateButton.addEventListener("click", () => {
    const isExpanded = certificateButton.getAttribute("aria-expanded") === "true";
    certificateButton.setAttribute("aria-expanded", String(!isExpanded));
    certificateNotice.hidden = isExpanded;
  });
}


const contactForm = document.querySelector("#form");
const contactStatus = document.querySelector("#contact-status");

if (contactForm && contactStatus) {
  const contactSubmit = contactForm.querySelector('button[type="submit"]');

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const originalText = contactSubmit.textContent;
    contactSubmit.textContent = "A enviar...";
    contactSubmit.disabled = true;
    contactStatus.textContent = "";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: new FormData(contactForm),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        contactStatus.textContent = "Mensagem enviada com sucesso. Obrigado pelo contacto.";
        contactStatus.dataset.state = "success";
        contactForm.reset();
      } else {
        throw new Error(result.message || "Não foi possível enviar a mensagem.");
      }
    } catch (error) {
      contactStatus.textContent = error.message || "Ocorreu um erro. Tente novamente.";
      contactStatus.dataset.state = "error";
    } finally {
      contactSubmit.textContent = originalText;
      contactSubmit.disabled = false;
    }
  });
}
