import jsQR from "jsqr";

export interface DecodedQRResult {
  success: boolean;
  rawText?: string;
  url?: string;
  isUrl: boolean;
  error?: string;
}

/**
 * Decodes a QR code from an HTML Image Element using an offscreen canvas and jsQR
 */
export async function decodeQRFromImageElement(
  img: HTMLImageElement
): Promise<DecodedQRResult> {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) {
    return { success: false, isUrl: false, error: "Canvas 2D context unavailable" };
  }

  canvas.width = img.naturalWidth || img.width;
  canvas.height = img.naturalHeight || img.height;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const code = jsQR(imageData.data, imageData.width, imageData.height, {
    inversionAttempts: "attemptBoth",
  });

  if (!code || !code.data) {
    return {
      success: false,
      isUrl: false,
      error: "No QR code could be decoded from this image.",
    };
  }

  const rawText = code.data.trim();
  const isUrl = /^https?:\/\//i.test(rawText) || /^upi:\/\//i.test(rawText);

  return {
    success: true,
    rawText,
    url: isUrl ? rawText : undefined,
    isUrl,
  };
}

/**
 * Decodes a QR code from a user uploaded File (Blob)
 */
export async function decodeQRFromFile(file: File): Promise<DecodedQRResult> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      if (!dataUrl) {
        return resolve({
          success: false,
          isUrl: false,
          error: "Failed to read image file data.",
        });
      }

      const img = new Image();
      img.onload = async () => {
        try {
          const result = await decodeQRFromImageElement(img);
          resolve(result);
        } catch (err: any) {
          resolve({
            success: false,
            isUrl: false,
            error: err?.message || "Failed to decode QR image",
          });
        }
      };
      img.onerror = () => {
        resolve({
          success: false,
          isUrl: false,
          error: "Failed to load image for QR decoding",
        });
      };
      img.src = dataUrl;
    };
    reader.onerror = () => {
      resolve({
        success: false,
        isUrl: false,
        error: "Error reading uploaded file",
      });
    };
    reader.readAsDataURL(file);
  });
}
