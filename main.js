const TelegramBot = require("node-telegram-bot-api");

// Replace 'YOUR_BOT_TOKEN' with your actual bot token
const token = "6109169471:AAE9Xdyv7yu5tyXznq4AEq8ptEn5m5bIJ6E";

// Create a new bot instance
const tesbot = new TelegramBot(token, { polling: true });
const prefix = "/";
const hiTes = new RegExp(`^${prefix}tes$`);
const gempa = new RegExp(`^${prefix}gempa$`);

// Ketika bot dijalankan
tesbot.onText(/^\/start$/, (msg) => {
  const commandsList = `
Halo! Saya adalah bot gempa bumi.
Berikut adalah daftar perintah yang dapat Anda gunakan:
  
1. /tes - Untuk melakukan tes.
2. /gempa - Untuk mendapatkan informasi tentang gempa terkini.
  `;

  tesbot.sendMessage(msg.chat.id, commandsList);
});

tesbot.onText(hiTes, (callback) => {
  tesbot.sendMessage(callback.from.id, "Ada yg bisa di banting? -_-");
});

tesbot.onText(gempa, async (callback) => {
  const BMKG_ENDPOINT = "https://data.bmkg.go.id/DataMKG/TEWS/";
  const apiCall = await fetch(BMKG_ENDPOINT + "autogempa.json");
  const {
    Infogempa: {
      gempa: {
        Tanggal,
        Jam,
        Magnitude,
        Kedalaman,
        Wilayah,
        Potensi,
        Dirasakan,
        Shakemap,
      },
    },
  } = await apiCall.json();

  const imgBMKG = BMKG_ENDPOINT + Shakemap;
  const resultText = `
*Info Gempa*

Waktu: ${Tanggal} | ${Jam}
Besaran: ${Magnitude} SR
Kedalaman: ${Kedalaman}
Wilayah: ${Wilayah}. 
Potensi: ${Potensi}
Dirasakan: ${Dirasakan}
  
Sumber:
[BMKG (Badan Meteorologi, Klimatologi, dan Geofisika)](https://data.bmkg.go.id/gempabumi/)
`;

  tesbot.sendPhoto(callback.from.id, imgBMKG, {
    caption: resultText,
  });
});

console.log("Bot is running...");
