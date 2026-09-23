chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "send-to-privacar",
    title: "Invia a Privacar WhatsApp: '%s'",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "send-to-privacar" && info.selectionText) {
    // Rimuove spazi, trattini, parentesi e caratteri non numerici
    let phone = info.selectionText.replace(/\D/g, "");

    // Se il numero inizia con 39 ed è più lungo di 10 cifre (es. 393401234567), togli il prefisso 39
    if (phone.length > 10 && phone.startsWith("39")) {
      phone = phone.substring(2);
    }

    // Prendi le ultime 10 cifre se necessario
    if (phone.length > 10) {
      phone = phone.slice(-10);
    }

    // INSERISCI QUI IL LINK AL TUO index.html
    const baseUrl = "https://gestionedigitalesrl-oss.github.io/NewWA/index.html"; 
    // Oppure: const baseUrl = "file:///C:/percorso/del/tuo/index.html";

    const targetUrl = `${baseUrl}?CELLNUM=${encodeURIComponent(phone)}`;
    chrome.tabs.create({ url: targetUrl });
  }
});