export type GalleryImage = {
  src: string;
  alt: string;
  rotate: string;
  caption: string;
  fileName: string;
};

const galleryModules = import.meta.glob(
  "../assets/gallery/*.{jpg,jpeg,png,webp}",
  {
    eager: true,
    as: "url",
  },
) as Record<string, string>;

const rotationAngles = [
  "-5deg",
  "4deg",
  "-3deg",
  "2deg",
  "-4deg",
  "5deg",
  "-2deg",
  "3deg",
];

function normalizeFileName(fileName: string) {
  const name = fileName.replace(/\.[^.]+$/, "");
  return name.replace(/[-_]+/g, " ").replace(/\b(\w)/g, (_, char) => char.toUpperCase());
}

function formatAltText(fileName: string) {
  const normalized = normalizeFileName(fileName);
  return `Shivaya Yogashala gallery image - ${normalized}`;
}

function getRotation(index: number) {
  return rotationAngles[index % rotationAngles.length];
}

export function getGalleryImages(): GalleryImage[] {
  return Object.keys(galleryModules)
    .sort((a, b) =>
      a.localeCompare(b, undefined, {
        numeric: true,
        sensitivity: "base",
      }),
    )
    .map((filePath, index) => {
      const fileName = filePath.split("/").pop() ?? filePath;
      return {
        src: galleryModules[filePath],
        alt: formatAltText(fileName),
        caption: normalizeFileName(fileName),
        rotate: getRotation(index),
        fileName,
      };
    });
}
