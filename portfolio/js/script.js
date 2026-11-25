const yearElement = document.querySelector("[data-current-year]");
const LINKEDIN_URL = "#";
const FACEBOOK_URL = "#";

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
