import html2canvas from 'html2canvas';

export const captureElement = async (elementId, fileName = 'capture.png') => {
  const element = document.getElementById(elementId);
  if (element) {
    const canvas = await html2canvas(element);
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = fileName;
    link.click();
  }
};
