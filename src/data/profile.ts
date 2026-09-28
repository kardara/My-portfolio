export const profile = {
  name: "Abdoulaye Zakaria Djerou",
  handle: "kardara",
  email: "azdjerou@gmail.com",
  phone: "+250 791 375 009",
  whatsapp:
    "https://wa.me/250791375009?text=Hello%20Abdoulaye%2C%20I%20got%20your%20contact%20from%20your%20website",
  github: "https://github.com/kardara",
  linkedin: "https://www.linkedin.com/in/abdoulaye-zakaria-djerou-022613327",
  calendar:
    "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Meeting%20with%20Abdoulaye%20Zakaria&details=Hi%20Abdoulaye%2C%20I%20would%20like%20to%20schedule%20a%20meeting%20from%20your%20portfolio.&location=Google%20Meet&add=azdjerou@gmail.com",
  cv: `${import.meta.env.BASE_URL}Zakaria_CV.pdf`,
  photo: `${import.meta.env.BASE_URL}kardara.webp`,
};

/** Single source of truth for the numbers shown in the hero. */
export const stats = {
  projects: 10,
  roles: 3,
  languages: 3,
};

export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
