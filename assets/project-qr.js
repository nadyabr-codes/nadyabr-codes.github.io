const qrDialog = document.querySelector('#project-qr-dialog');

if (qrDialog && typeof qrDialog.showModal === 'function') {
  document.querySelectorAll('[data-project-qr]').forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      // Preserve ordinary link behavior for opening the QR image in another tab.
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const project = trigger.closest('.project-detail');
      const name = project.querySelector('h2').textContent;
      const storeName = trigger.dataset.storeName || 'Google Play';
      const store = document.getElementById(trigger.dataset.storeLink) || project.querySelector('a[href^="https://play.google.com/"]');
      qrDialog.querySelector('#qr-title').textContent = name;
      const image = qrDialog.querySelector('.qr-image');
      image.src = trigger.href;
      image.alt = `Scan to download ${name} from ${storeName}`;
      qrDialog.querySelector('#qr-description').textContent = `Scan with your phone’s camera to open ${storeName}.`;
      const storeLink = qrDialog.querySelector('.qr-store-link');
      storeLink.href = store.href;
      storeLink.textContent = `Get it on ${storeName} ↗`;
      qrDialog.showModal();
    });
  });

  qrDialog.addEventListener('click', (event) => {
    const bounds = qrDialog.getBoundingClientRect();
    if (event.target === qrDialog && (event.clientX < bounds.left ||
        event.clientX > bounds.right || event.clientY < bounds.top ||
        event.clientY > bounds.bottom)) qrDialog.close();
  });
}
