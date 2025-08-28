// c1200: optimiza imágenes con Cloudinary (AVIF/WebP, q_auto, dpr_auto, ancho).
// Idempotente: si la URL ya trae transforms, las reemplaza (no duplica).
// Soporta Cloudinary "/image/upload" y URLs externas (Firebase) vía "image/fetch".
// Cambia el cloud si el tuyo NO es "dcerhiol0".
const CLOUD = "dcerhiol0"; // <--- pon aquí tu cloud si es otro

const isStr = (x) => typeof x === "string" && x.length > 0;
const isCloudinary = (url) => isStr(url) && url.includes("res.cloudinary.com");
const enc = (u) => encodeURIComponent(u);

const buildTransform = ({ w = 1200, eco = false, mode = "limit", ar } = {}) => {
  const parts = ["f_auto", `q_auto${eco ? ":eco" : ""}`, "dpr_auto"];
  const crop = mode === "fill" ? "c_fill,g_auto" : "c_limit";
  if (ar) parts.push(`ar_${ar}`);
  parts.push(crop, `w_${w}`);
  return parts.join(",");
};

function withUploadTransform(url, t) {
  const marker = "/upload/";
  const i = url.indexOf(marker);
  if (i === -1) return url;
  const start = i + marker.length;
  const rest = url.slice(start);
  const slash = rest.indexOf("/");
  if (slash === -1) return url.slice(0, start) + t + "/" + rest; // por si acaso
  const firstSeg = rest.slice(0, slash); // puede ser transforms o "v123"
  const isVersion = /^v\d+$/.test(firstSeg);
  if (isVersion) {
    // no había transforms -> inserta antes de la versión
    return url.slice(0, start) + t + "/" + rest;
  } else {
    // ya había transforms -> reemplaza
    const after = rest.slice(slash + 1);
    return url.slice(0, start) + t + "/" + after;
  }
}

function withFetchTransform(url, t) {
  const marker = "/image/fetch/";
  const i = url.indexOf(marker);
  if (i === -1) return url;
  const start = i + marker.length;
  const rest = url.slice(start);
  const slash = rest.indexOf("/");
  if (slash === -1) return url.slice(0, start) + t + "/" + rest;
  const after = rest.slice(slash + 1);
  return url.slice(0, start) + t + "/" + after;
}

export const c1200 = (url, w = 1200, opts = {}) => {
  if (!isStr(url)) return url;
  const t = buildTransform({ w, ...opts });

  // 1) Cloudinary upload
  if (isCloudinary(url) && url.includes("/image/upload/")) {
    return withUploadTransform(url, t);
  }

  // 2) Ya proxificada por fetch
  if (isCloudinary(url) && url.includes("/image/fetch/")) {
    return withFetchTransform(url, t);
  }

  // 3) Externa (Firebase, etc.) -> proxificar si tenemos CLOUD
  if (CLOUD) {
    return `https://res.cloudinary.com/${CLOUD}/image/fetch/${t}/${enc(url)}`;
  }

  // 4) Sin CLOUD -> devuelve original
  return url;
};

export const c1200Set = (url, widths = [320, 480, 640], opts = {}) =>
  widths.map((w) => `${c1200(url, w, opts)} ${w}w`).join(", ");

export default c1200;
