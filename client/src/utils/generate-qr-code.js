import qrImage from 'qr-image';

export function generateQRCode(data) {
    const qrImageBuffer = qrImage.imageSync(data, { type: 'png' });
    return `data:image/png;base64,${qrImageBuffer.toString('base64')}`;
}