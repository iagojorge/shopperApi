export function getinlineData(image: string) {
  var mimeType: string = "";

  const [metadata, image64] = image.split(",");

  const mimeTypeMatch = metadata.match(/:(.*?);/);

  if (mimeTypeMatch) {
    mimeType = mimeTypeMatch[1];
  }

  return {
    inlineData: {
      data: image64,
      mimeType: mimeType,
    },
  };
}
