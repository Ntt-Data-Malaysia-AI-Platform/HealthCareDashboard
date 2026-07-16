import type { ClaimRecord } from '../types';
import { getEmployeeLimit, getEmployeeTier } from '../data';

export function generateClaimPdfDataUrl(claim: ClaimRecord, employeeName?: string): string {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  canvas.width = 800;
  canvas.height = 1000;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = '#e5e7eb';
  ctx.lineWidth = 2;
  ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

  ctx.fillStyle = '#1e3a5f';
  ctx.fillRect(40, 40, canvas.width - 80, 80);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px system-ui, -apple-system, sans-serif';
  ctx.fillText('MEDICAL CLAIM DOCUMENT', 60, 90);

  ctx.font = '14px system-ui, -apple-system, sans-serif';
  ctx.fillText('NTT DATA Healthcare', canvas.width - 200, 80);
  ctx.fillText('Healthcare Management Platform', canvas.width - 250, 100);

  let y = 160;
  const lineHeight = 28;

  ctx.fillStyle = '#64748b';
  ctx.font = '12px system-ui, -apple-system, sans-serif';
  ctx.fillText('CLAIM ID:', 60, y);
  ctx.fillStyle = '#1e3a5f';
  ctx.font = 'bold 14px system-ui, -apple-system, sans-serif';
  ctx.fillText(claim.id, 200, y);

  y += lineHeight;
  ctx.fillStyle = '#64748b';
  ctx.font = '12px system-ui, -apple-system, sans-serif';
  ctx.fillText('DATE SUBMITTED:', 60, y);
  ctx.fillStyle = '#1e293b';
  ctx.font = '14px system-ui, -apple-system, sans-serif';
  ctx.fillText(`${claim.date}, 2026`, 200, y);

  y += lineHeight * 1.5;

  ctx.fillStyle = '#f1f5f9';
  ctx.fillRect(60, y - 10, canvas.width - 120, 130);

  ctx.fillStyle = '#1e3a5f';
  ctx.font = 'bold 14px system-ui, -apple-system, sans-serif';
  ctx.fillText('EMPLOYEE INFORMATION', 80, y + 15);

  y += 45;
  ctx.fillStyle = '#64748b';
  ctx.font = '12px system-ui, -apple-system, sans-serif';
  ctx.fillText('Employee Name:', 80, y);
  ctx.fillStyle = '#1e293b';
  ctx.font = '14px system-ui, -apple-system, sans-serif';
  ctx.fillText(employeeName || claim.employeeName || 'N/A', 220, y);

  y += lineHeight;
  ctx.fillStyle = '#64748b';
  ctx.font = '12px system-ui, -apple-system, sans-serif';
  ctx.fillText('Employee ID:', 80, y);
  ctx.fillStyle = '#1e293b';
  ctx.font = '14px system-ui, -apple-system, sans-serif';
  ctx.fillText(claim.employeeId, 220, y);

  y += lineHeight;
  ctx.fillStyle = '#64748b';
  ctx.font = '12px system-ui, -apple-system, sans-serif';
  ctx.fillText('Benefit Tier:', 80, y);
  ctx.fillStyle = '#1e293b';
  ctx.font = '14px system-ui, -apple-system, sans-serif';
  ctx.fillText(getEmployeeTier(claim.employeeId), 220, y);

  y += lineHeight * 1.5;

  ctx.fillStyle = '#f1f5f9';
  ctx.fillRect(60, y - 10, canvas.width - 120, 160);

  ctx.fillStyle = '#1e3a5f';
  ctx.font = 'bold 14px system-ui, -apple-system, sans-serif';
  ctx.fillText('CLAIM DETAILS', 80, y + 15);

  y += 45;
  ctx.fillStyle = '#64748b';
  ctx.font = '12px system-ui, -apple-system, sans-serif';
  ctx.fillText('Healthcare Provider:', 80, y);
  ctx.fillStyle = '#1e293b';
  ctx.font = '14px system-ui, -apple-system, sans-serif';
  ctx.fillText(claim.provider, 250, y);

  y += lineHeight;
  ctx.fillStyle = '#64748b';
  ctx.font = '12px system-ui, -apple-system, sans-serif';
  ctx.fillText('Category:', 80, y);
  ctx.fillStyle = '#1e293b';
  ctx.font = '14px system-ui, -apple-system, sans-serif';
  ctx.fillText(`Outpatient · ${claim.paymentType}`, 250, y);

  y += lineHeight;
  ctx.fillStyle = '#64748b';
  ctx.font = '12px system-ui, -apple-system, sans-serif';
  ctx.fillText('Service Date:', 80, y);
  ctx.fillStyle = '#1e293b';
  ctx.font = '14px system-ui, -apple-system, sans-serif';
  ctx.fillText(`${claim.date}, 2026`, 250, y);

  y += lineHeight;
  ctx.fillStyle = '#64748b';
  ctx.font = '12px system-ui, -apple-system, sans-serif';
  ctx.fillText('Status:', 80, y);
  const statusColors: Record<string, string> = {
    approved: '#059669',
    pending: '#d97706',
    rejected: '#dc2626',
  };
  ctx.fillStyle = statusColors[claim.status] || '#1e293b';
  ctx.font = 'bold 14px system-ui, -apple-system, sans-serif';
  ctx.fillText(claim.status.toUpperCase(), 250, y);

  y += lineHeight * 1.5;

  ctx.strokeStyle = '#cbd5e1';
  ctx.beginPath();
  ctx.moveTo(60, y);
  ctx.lineTo(canvas.width - 60, y);
  ctx.stroke();

  y += 20;

  ctx.fillStyle = '#f0fdf4';
  ctx.fillRect(60, y, canvas.width - 120, 80);
  ctx.strokeStyle = '#86efac';
  ctx.strokeRect(60, y, canvas.width - 120, 80);

  y += 25;
  ctx.fillStyle = '#166534';
  ctx.font = 'bold 14px system-ui, -apple-system, sans-serif';
  ctx.fillText('CLAIMED AMOUNT', 80, y);

  y += 35;
  ctx.fillStyle = '#059669';
  ctx.font = 'bold 36px system-ui, -apple-system, sans-serif';
  ctx.fillText(`RM${claim.amount.toFixed(2)}`, 80, y);

  ctx.fillStyle = '#64748b';
  ctx.font = '12px system-ui, -apple-system, sans-serif';
  ctx.fillText(`Monthly Limit (${getEmployeeTier(claim.employeeId)}): RM${getEmployeeLimit(claim.employeeId)}`, 80, y + 25);

  ctx.fillStyle = '#1e3a5f';
  ctx.font = 'bold 14px system-ui, -apple-system, sans-serif';
  ctx.fillText('APPROVED', canvas.width - 250, y);

  y += lineHeight * 2;

  ctx.fillStyle = '#eff6ff';
  ctx.fillRect(60, y, canvas.width - 120, 180);
  ctx.strokeStyle = '#93c5fd';
  ctx.strokeRect(60, y, canvas.width - 120, 180);

  y += 25;
  ctx.fillStyle = '#1e3a5f';
  ctx.font = 'bold 14px system-ui, -apple-system, sans-serif';
  ctx.fillText('NOTES & ADDITIONAL INFORMATION', 80, y);

  y += 35;
  ctx.fillStyle = '#475569';
  ctx.font = '13px system-ui, -apple-system, sans-serif';

  const notes = [
    `This claim has been ${claim.status}.`,
    `Provider: ${claim.provider} is an in-network healthcare facility.`,
    'All services rendered are covered under the employee health plan.',
    'Processing Time: 3-5 business days for approved claims.',
    'For questions, contact: benefits@nttdata.com | ext. 4500',
  ];

  notes.forEach((note) => {
    ctx.fillText(`• ${note}`, 80, y);
    y += 22;
  });

  y += 20;

  ctx.strokeStyle = '#cbd5e1';
  ctx.beginPath();
  ctx.moveTo(60, y);
  ctx.lineTo(canvas.width - 60, y);
  ctx.stroke();

  y += 30;
  ctx.fillStyle = '#94a3b8';
  ctx.font = '11px system-ui, -apple-system, sans-serif';
  ctx.fillText('This document contains protected health information (PHI) and is confidential.', 60, y);
  ctx.fillText('Unauthorized disclosure is prohibited under HIPAA regulations.', 60, y + 16);

  ctx.fillStyle = '#1e3a5f';
  ctx.fillRect(40, canvas.height - 60, canvas.width - 80, 20);

  ctx.fillStyle = '#ffffff';
  ctx.font = '10px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`Generated: ${new Date().toLocaleString()} | Document ID: ${claim.id}-DOC | Page 1 of 1`, canvas.width / 2, canvas.height - 45);
  ctx.textAlign = 'left';

  return canvas.toDataURL('image/png');
}

export function downloadClaimPdf(claim: ClaimRecord, employeeName?: string): void {
  const dataUrl = generateClaimPdfDataUrl(claim, employeeName);

  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = `${claim.id}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function openClaimPdfInNewTab(claim: ClaimRecord, employeeName?: string): void {
  const dataUrl = generateClaimPdfDataUrl(claim, employeeName);

  const newWindow = window.open('', '_blank');
  if (newWindow) {
    newWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${claim.id} - Medical Claim Document</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              min-height: 100vh;
              background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 2rem;
              font-family: system-ui, -apple-system, sans-serif;
            }
            .container {
              text-align: center;
            }
            img {
              max-width: 100%;
              height: auto;
              box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
              border-radius: 8px;
              background: white;
            }
            .actions {
              margin-top: 1.5rem;
              display: flex;
              gap: 1rem;
              justify-content: center;
            }
            button, a {
              padding: 0.75rem 1.5rem;
              border-radius: 8px;
              font-size: 14px;
              font-weight: 600;
              cursor: pointer;
              text-decoration: none;
              display: inline-flex;
              align-items: center;
              gap: 0.5rem;
              transition: all 0.2s;
            }
            .download-btn {
              background: #3366ff;
              color: white;
              border: none;
            }
            .download-btn:hover {
              background: #2855dd;
            }
            .print-btn {
              background: white;
              color: #1e293b;
              border: 1px solid #e2e8f0;
            }
            .print-btn:hover {
              background: #f8fafc;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <img src="${dataUrl}" alt="Claim Document" />
            <div class="actions">
              <a href="${dataUrl}" download="${claim.id}.png" class="download-btn">Download</a>
              <button class="print-btn" onclick="window.print()">Print</button>
            </div>
          </div>
        </body>
      </html>
    `);
    newWindow.document.close();
  }
}
