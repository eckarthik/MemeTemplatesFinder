const downloadImage = (base64Content, fileName) => {
  const link = document.createElement("a");
  link.href = base64Content;
  link.download = fileName;
  link.click();
  link.remove();
};

export { downloadImage };
