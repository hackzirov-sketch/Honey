export async function compressImage(
  file: File,
  opts: { maxWidth?: number; maxHeight?: number; quality?: number; mimeType?: string } = {}
): Promise<File> {
  const { maxWidth = 1280, maxHeight = 1280, quality = 0.82, mimeType = "image/jpeg" } = opts;
  if (!file.type.startsWith("image/")) return file;

  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const i = new Image();
    i.onload = () => resolve(i);
    i.onerror = reject;
    i.src = dataUrl;
  });

  let { width, height } = img;
  const ratio = Math.min(maxWidth / width, maxHeight / height, 1);
  width = Math.round(width * ratio);
  height = Math.round(height * ratio);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return file;
  ctx.drawImage(img, 0, 0, width, height);

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob((b) => resolve(b), mimeType, quality)
  );
  if (!blob) return file;

  const ext = mimeType === "image/png" ? "png" : "jpg";
  const name = file.name.replace(/\.[a-z0-9]+$/i, "") + "." + ext;
  return new File([blob], name, { type: mimeType });
}
