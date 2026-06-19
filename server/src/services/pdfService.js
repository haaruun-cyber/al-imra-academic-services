import fs from 'node:fs';
import path from 'node:path';
import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';
import { config } from '../config.js';

const documentsDir = path.resolve(config.documentStorageDir);

export async function createCertificatePdf(request) {
  fs.mkdirSync(documentsDir, { recursive: true });
  const fileName = `${request.requestNo}.pdf`;
  const filePath = path.join(documentsDir, fileName);
  const verificationUrl = `${config.publicAppUrl.replace(/\/$/, '')}/verify/${request.requestNo}`;
  const qrDataUrl = await QRCode.toDataURL(verificationUrl);
  const qrBuffer = Buffer.from(qrDataUrl.split(',')[1], 'base64');

  await new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 46, size: 'A4' });
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    doc.rect(28, 28, 539, 786).strokeColor('#0f766e').lineWidth(1.5).stroke();
    doc.fillColor('#0f172a').fontSize(22).font('Helvetica-Bold').text('AL-IMRA ACADEMIC SERVICES', { align: 'center' });
    doc.moveDown(0.5).fontSize(12).fillColor('#475569').text('Academic Certificate Request Document', { align: 'center' });
    doc.moveDown(2);

    section(doc, 'Student Information');
    row(doc, 'Student Name', request.student.studentName);
    row(doc, 'Student ID', request.student.studentId);
    row(doc, 'Mother Name', request.student.motherName);
    row(doc, 'Place of Birth', request.student.placeOfBirth);
    row(doc, 'Date of Birth', request.student.dateOfBirth.toISOString().slice(0, 10));
    row(doc, 'Faculty', request.student.faculty);
    row(doc, 'Department', request.student.department);
    row(doc, 'Academic Year', request.student.academicYear);

    doc.moveDown();
    section(doc, 'Request Information');
    row(doc, 'Request Number', request.requestNo);
    row(doc, 'Request Date', request.submittedAt.toISOString().slice(0, 10));
    row(doc, 'Status', request.status.replaceAll('_', ' '));

    doc.moveDown(2);
    section(doc, 'Signatures Section');
    doc.moveDown(1.5);
    doc.text('____________________________', 70, doc.y);
    doc.text('____________________________', 340, doc.y - 14);
    doc.moveDown(0.4);
    doc.text('Registrar Office', 102, doc.y);
    doc.text('Finance Office', 382, doc.y - 14);

    doc.moveDown(3);
    doc.image(qrBuffer, 70, doc.y, { width: 86 });
    doc.fontSize(10).fillColor('#475569').text('QR Code Verification', 170, doc.y + 22);
    doc.roundedRect(370, doc.y - 6, 120, 80, 6).strokeColor('#94a3b8').stroke();
    doc.fillColor('#64748b').text('Official Stamp Area', 386, doc.y + 28);

    doc.end();
    stream.on('finish', resolve);
    stream.on('error', reject);
  });

  return { fileName, filePath: `/api/documents/file/${fileName}` };
}

function section(doc, title) {
  doc.fontSize(14).fillColor('#0f766e').font('Helvetica-Bold').text(title);
  doc.moveTo(46, doc.y + 4).lineTo(550, doc.y + 4).strokeColor('#99f6e4').stroke();
  doc.moveDown(0.8);
}

function row(doc, label, value) {
  doc.fontSize(11).fillColor('#334155').font('Helvetica-Bold').text(`${label}: `, { continued: true });
  doc.font('Helvetica').fillColor('#0f172a').text(String(value || '-'));
}
