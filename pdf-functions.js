// PDF İndirme Fonksiyonları

function pozPDF() {
  const icerik = document.getElementById('pozGrid').innerHTML;
  if (!icerik) return;
  const tarih = new Date().toLocaleDateString('tr-TR');
  
  const element = document.createElement('div');
  element.innerHTML = `<div style="font-family:'Segoe UI',sans-serif; color:#111; padding:16px;"><h1 style="text-align:center; letter-spacing:.18em; font-size:1.05rem; text-transform:uppercase; margin-bottom:4px;">Dolap Poz Görünümleri</h1><div style="text-align:center; color:#555; font-size:.8rem; margin-bottom:16px;">Tarih: ${tarih}</div><div style="display:grid; grid-template-columns: 1fr 1fr; gap: 14px;">${icerik.replaceAll('class="poz-kart"','style="border:1px solid #ddd; border-radius: 10px; overflow:hidden;"').replaceAll('class="poz-kart-header"','style="padding:8px 12px; background:#f4f6ff; font-weight:800; font-size:.82rem;"').replaceAll('class="poz-drawing"','style="padding:10px 12px; background:#fff;"')}</div></div>`;
  
  const opt = {
    margin: 10,
    filename: `dolap-poz-${tarih.replace(/\//g, '-')}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  
  html2pdf().set(opt).from(element).save();
}

function kesimPDF() {
  const icerik = document.getElementById('kesimIcerik').innerHTML;
  const tarih = new Date().toLocaleDateString('tr-TR');
  
  const element = document.createElement('div');
  element.innerHTML = `<div style="font-family:'Segoe UI',sans-serif; color:#111; padding:24px;"><h1 style="text-align:center; letter-spacing:.2em; font-size:1.1rem; text-transform:uppercase; margin-bottom:4px;">Profil Kesim Listesi</h1><div style="text-align:center; color:#555; font-size:.8rem; margin-bottom:10px;">Birleşik liste | Tarih: ${tarih}</div>${icerik}</div>`;
  
  const opt = {
    margin: 10,
    filename: `kesim-listesi-${tarih.replace(/\//g, '-')}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  
  html2pdf().set(opt).from(element).save();
}

function fiyatPDF() {
  const liste = getDolaplar().filter(d => d.W && d.H);
  if (liste.length === 0) return;
  const icerik = document.getElementById('fiyatCard').innerHTML;
  const reBtn = new RegExp('<button[^>]*onclick="fiyatPDF\\(\\)"[^>]*>[\\s\\S]*?<\\/button>', 'g');
  const icerikTemiz = icerik.replace(reBtn, '');
  const tarih = new Date().toLocaleDateString('tr-TR');
  
  const element = document.createElement('div');
  element.innerHTML = `<div style="font-family: 'Segoe UI', system-ui, sans-serif; padding: 18px;">${icerikTemiz}</div>`;
  
  const opt = {
    margin: 10,
    filename: `fiyat-listesi-${tarih.replace(/\//g, '-')}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  
  html2pdf().set(opt).from(element).save();
}
