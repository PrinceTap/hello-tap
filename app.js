/*
  CUSTOMER SETUP:
  1. Edit the sample profile below.
  2. For another customer, duplicate the object and give it a new key, such as "maria-cafe".
  3. Share the website URL with ?u=maria-cafe at the end.
  Example: https://YOUR-SITE.vercel.app/?u=maria-cafe

  IMPORTANT: This is a beginner demo. Customer details in this file are public.
  Do not put private information, passwords, or confidential data here.
*/
const customers = {
  "demo": {
    name: "Alex Morgan",
    title: "Business Consultant",
    company: "NORTHSTAR CONSULTING",
    bio: "Helping people and businesses connect with confidence. Replace this introduction with your own short bio.",
    phone: "+639171234567",
    email: "hello@example.com",
    whatsapp: "639171234567",
    photo: "https://placehold.co/400x400/e7edf3/23364d?text=Your+Photo",
    logo: "",
    brandColor: "#173653",
    accentColor: "#c7a56b",
    backgroundColor: "#eef2f6",
    fontFamily: "Arial, Helvetica, sans-serif",
    socials: [
      { label: "Facebook", url: "https://facebook.com/" },
      { label: "Instagram", url: "https://instagram.com/" },
      { label: "LinkedIn", url: "https://linkedin.com/" }
    ],
    products: [
      {
        name: "Business Consulting",
        description: "Practical guidance for your next step.",
        price: "Ask for a quote",
        image: "https://placehold.co/640x400/e8edf2/23364d?text=Service",
        link: "mailto:hello@example.com?subject=Business%20Consulting"
      },
      {
        name: "Professional Services",
        description: "Solutions tailored to your needs.",
        price: "Contact for pricing",
        image: "https://placehold.co/640x400/e8edf2/23364d?text=Services",
        link: "mailto:hello@example.com?subject=Service%20Inquiry"
      }
    ]
  },

  /* COPY the "demo" profile above, paste it here, and change the key to a unique slug.
     Example: "maria-cafe": { name: "Maria Santos", ... } */
};

function safeText(value) {
  return String(value ?? "");
}
function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = safeText(value);
}
function safeUrl(value, allowed = ["http:", "https:", "mailto:", "tel:"]) {
  try {
    const parsed = new URL(value, window.location.origin);
    return allowed.includes(parsed.protocol) ? parsed.href : "#";
  } catch {
    return "#";
  }
}
function getCustomer() {
  const params = new URLSearchParams(window.location.search);
  const key = params.get("u") || "demo";
  return customers[key] || customers.demo;
}
function renderCustomer(customer) {
  document.title = `${customer.name} | Digital Business Card`;
  document.documentElement.style.setProperty("--brand", customer.brandColor || "#173653");
  document.documentElement.style.setProperty("--accent", customer.accentColor || "#c7a56b");
  document.documentElement.style.setProperty("--page-bg", customer.backgroundColor || "#eef2f6");
  document.documentElement.style.setProperty("--font-family", customer.fontFamily || "Arial, Helvetica, sans-serif");

  setText("fullName", customer.name);
  setText("jobTitle", customer.title);
  setText("companyName", customer.company);
  setText("footerCompany", customer.company);
  setText("bio", customer.bio);

  const avatar = document.getElementById("avatar");
  avatar.src = safeUrl(customer.photo, ["http:", "https:"]);
  avatar.alt = `${customer.name} profile photo`;

  const phoneHref = customer.phone ? `tel:${customer.phone.replace(/[^\d+]/g, "")}` : "#";
  const emailHref = customer.email ? `mailto:${customer.email}` : "#";
  const waNumber = safeText(customer.whatsapp).replace(/\D/g, "");
  document.getElementById("callButton").href = phoneHref;
  document.getElementById("emailButton").href = emailHref;
  document.getElementById("whatsappButton").href = waNumber ? `https://wa.me/${waNumber}` : "#";
  document.getElementById("contactCta").href = emailHref;

  const socialContainer = document.getElementById("socialLinks");
  socialContainer.replaceChildren();
  (customer.socials || []).forEach((social) => {
    const a = document.createElement("a");
    a.className = "social-link";
    a.textContent = social.label;
    a.href = safeUrl(social.url, ["http:", "https:"]);
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    socialContainer.appendChild(a);
  });
  document.getElementById("socialSection").hidden = !(customer.socials || []).length;

  const catalog = document.getElementById("catalog");
  catalog.replaceChildren();
  (customer.products || []).forEach((product) => {
    const article = document.createElement("article");
    article.className = "product";
    const img = document.createElement("img");
    img.src = safeUrl(product.image, ["http:", "https:"]);
    img.alt = product.name;
    img.loading = "lazy";
    const info = document.createElement("div");
    info.className = "product-info";
    const title = document.createElement("h3");
    title.textContent = product.name;
    const description = document.createElement("p");
    description.textContent = product.description || "";
    const price = document.createElement("p");
    price.className = "price";
    price.textContent = product.price || "";
    const link = document.createElement("a");
    link.href = safeUrl(product.link);
    link.textContent = "Inquire ↗";
    if (link.href.startsWith("http")) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
    info.append(title, description, price, link);
    article.append(img, info);
    catalog.appendChild(article);
  });
  document.getElementById("catalogSection").hidden = !(customer.products || []).length;

  document.getElementById("saveContact").addEventListener("click", () => downloadVCard(customer));
}
function escapeVCard(value) {
  return safeText(value).replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}
function downloadVCard(customer) {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${escapeVCard(customer.name)}`,
    `ORG:${escapeVCard(customer.company)}`,
    `TITLE:${escapeVCard(customer.title)}`,
    customer.phone ? `TEL;TYPE=CELL:${escapeVCard(customer.phone)}` : "",
    customer.email ? `EMAIL;TYPE=INTERNET:${escapeVCard(customer.email)}` : "",
    customer.bio ? `NOTE:${escapeVCard(customer.bio)}` : "",
    "END:VCARD"
  ].filter(Boolean);
  const blob = new Blob([lines.join("\r\n")], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${safeText(customer.name).trim().replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "contact"}.vcf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
renderCustomer(getCustomer());
