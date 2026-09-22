import { Scene } from '../types';

export const INITIAL_VARIABLES = {
  bravery: 0,
  curiosity: 0,
  trust: 0,
  panic: 0,
  clues: 0,
  sandal: false,
  iceCream: false,
  mirror: false,
  simulationKnowledge: 0,
  goatFollowed: false,
  noodlesCooked: false,
  closetBefriended: false,
  interactedWardrobeCount: 0,
};

export const STORY_SCENES: Record<string, Scene> = {
  // ==========================================
  // PROLOGUE
  // ==========================================
  prologue_start: {
    id: 'prologue_start',
    background: 'room13',
    speaker: 'Narrator',
    music: 'ambient',
    screenEffect: 'none',
    text: 'Motel Cendana Asri. Kamar Nomor 13. Pukul 02:13 dini hari.',
    dialogueLines: [
      {
        speaker: 'Narrator',
        text: 'Hujan deras mengguyur jendela kaca tua yang bergetar pelan. Suara petir bergemuruh di kejauhan.',
        soundEffect: 'thunder',
      },
      {
        speaker: 'You',
        text: 'Uh... kasur motel ini keras banget kayak batu kali. Kenapa juga tadi pas check-in resepsionisnya natap aneh...',
      },
      {
        speaker: 'Narrator',
        text: 'Tepat saat jam digital di meja nakas berganti angka... kamu mendengar sesuatu.',
        soundEffect: 'knock',
        screenEffect: 'shake',
      },
      {
        speaker: 'Narrator',
        text: 'KNOCK. KNOCK. KNOCK.',
      },
      {
        speaker: 'You',
        text: 'Tunggu. Suara ketukan itu... asalnya bukan dari pintu depan kamar. Tapi dari dalam lemari kayu jati di sudut.',
        screenEffect: 'flicker',
      },
    ],
    choices: [
      {
        text: 'Buka lemari sekarang. Aku penasaran!',
        next: 'open_closet_brave',
        effects: { bravery: 1, curiosity: 1 },
        flavorTag: 'Berani',
        soundEffect: 'click',
      },
      {
        text: 'Abaikan dan tarik selimut. Aku menghargai hidupku.',
        next: 'ignore_and_sleep',
        effects: { panic: 1 },
        flavorTag: 'Paranoid',
        soundEffect: 'click',
      },
      {
        text: 'Ketuk balik lemarinya: KNOCK KNOCK KNOCK.',
        next: 'knock_back_closet',
        effects: { bravery: 1, curiosity: 2 },
        flavorTag: 'Absurd',
        soundEffect: 'knock',
      },
    ],
  },

  // OPTION B: IGNORE AND SLEEP
  ignore_and_sleep: {
    id: 'ignore_and_sleep',
    background: 'room13',
    speaker: 'You',
    music: 'ambient',
    text: '"Ini pasti cuma tikus motel yang lagi cosplay jadi hantu. Tarik selimut, merem."',
    dialogueLines: [
      {
        speaker: 'Narrator',
        text: 'Kamu membalikkan badan membelakangi lemari. Hening. Lima detik kemudian...',
        soundEffect: 'knock',
        screenEffect: 'shake',
      },
      {
        speaker: 'Narrator',
        text: 'KNOCK. KNOCK. KNOCK. Kali ini lebih berirama, seperti ketukan lagu dangdut koplo.',
      },
      {
        speaker: 'You',
        text: 'Buset, hantunya punya selera musik.',
      },
    ],
    choices: [
      {
        text: 'Bodo amat. Pasang earplug, tidur sampai pagi!',
        next: 'ending_coward',
        effects: { bravery: 0 },
        flavorTag: 'Santai',
      },
      {
        text: 'Oke, nggak tahan lagi. Buka lemarinya!',
        next: 'open_closet_brave',
        effects: { bravery: 1, curiosity: 1 },
        flavorTag: 'Penasaran',
        soundEffect: 'door',
      },
      {
        text: 'Keluar kamar lewat pintu utama dan panggil satpam.',
        next: 'hallway_intro',
        effects: { panic: 1 },
        flavorTag: 'Paranoid',
        soundEffect: 'footstep',
      },
    ],
  },

  ending_coward: {
    id: 'ending_coward',
    background: 'room13',
    speaker: 'Narrator',
    music: 'silence',
    endingId: 'ENDING_I',
    text: 'Kamu memakai earplug peredam suara industri, menarik selimut tebal sampai menutup kepala, dan memejamkan mata rapat-rapat.',
    dialogueLines: [
      {
        speaker: 'Narrator',
        text: 'Kamu tidur nyenyak luar biasa sampai matahari terbit pukul 09:30 pagi.',
      },
      {
        speaker: 'Narrator',
        text: 'Ketika bangun, pintu lemari sudah terbuka sedikit. Ada secarik kertas bertuliskan: "Makasih udah nggak kepo. Kamu tamu terbaik minggu ini."',
      },
      {
        speaker: 'You',
        text: 'Gitu dong. Hidup tenang itu pilihan.',
      },
    ],
    choices: [],
  },

  // OPTION C: KNOCK BACK
  knock_back_closet: {
    id: 'knock_back_closet',
    background: 'room13',
    speaker: 'You',
    music: 'comedy',
    text: 'Kamu melangkah mendekati lemari kayu, lalu membalas ketukan dengan ritme yang sama persis: DOK. DOK. DOK.',
    dialogueLines: [
      {
        speaker: 'Narrator',
        text: 'Suasana mendadak senyap selama tiga detik.',
      },
      {
        speaker: 'The Closet Person',
        text: '...Eh? Ada orang di luar?',
        soundEffect: 'sting',
        screenEffect: 'flicker',
      },
      {
        speaker: 'You',
        text: 'LAH KOK NANYA BALIK?! Kamu siapa di dalam lemari kamarku?!',
      },
      {
        speaker: 'The Closet Person',
        text: 'Santai bro, jangan ngegas. Aku tamu Room 13 hari Selasa lalu. Handle pintunya macet dari dalam, terus aku mager dobrak.',
      },
      {
        speaker: 'You',
        text: 'Kamu kejebak di lemari dari hari Selasa?! Dan kamu masih hidup?!',
      },
      {
        speaker: 'The Closet Person',
        text: 'Ada stok wafer biskuit sama walkie-talkie di sini. Tolong puter kuncinya dong dari luar, engselnya karatan.',
      },
    ],
    choices: [
      {
        text: 'Buka kuncinya dan tolong Mas Lemari keluar.',
        next: 'free_closet_person',
        effects: { trust: 2, closetBefriended: true, bravery: 1 },
        flavorTag: 'Santai',
        soundEffect: 'door',
      },
      {
        text: 'Ganjel lemarinya pake kursi! Mencurigakan!',
        next: 'block_closet',
        effects: { panic: 2 },
        flavorTag: 'Paranoid',
        soundEffect: 'click',
      },
      {
        text: '"Boleh barter wafer sama informasi motel nggak?"',
        next: 'bargain_closet_person',
        effects: { clues: 1, curiosity: 2 },
        flavorTag: 'Absurd',
      },
    ],
  },

  free_closet_person: {
    id: 'free_closet_person',
    background: 'closet_open',
    speaker: 'Narrator',
    music: 'comedy',
    text: 'KREEEEK... Pintu lemari terbuka lebar.',
    dialogueLines: [
      {
        speaker: 'Narrator',
        text: 'Seorang pria berkaus oblong lusuh keluar sambil meregangkan punggungnya. Di tangannya ada sebuah sandal karet hijau tua bernomor seri 13-ALPHA dan walkie-talkie.',
        soundEffect: 'magic',
      },
      {
        speaker: 'The Closet Person',
        text: 'Wah gila, oksigen segar! Kenalin, panggil aja Doni. Makasih ya bro. Nih, buat kamu sebagai tanda terima kasih.',
      },
      {
        speaker: 'Narrator',
        text: 'Doni menyerahkan satu buah Sandal Jepit Hijau Motel bercahaya redup dan Walkie-Talkie berdebu.',
        soundEffect: 'sting',
      },
      {
        speaker: 'You',
        text: 'Kenapa cuma sebelah sandalnya?! Dan kenapa sandalnya bau pandan?!',
      },
      {
        speaker: 'The Closet Person',
        text: 'Sandal itu bukan sandal biasa, bro. Itu kartu pass master motel. Jangan tanya kenapa manajemen milih bentuk sandal.',
      },
    ],
    choices: [
      {
        text: 'Simpan sandal hijau misterius & walkie-talkie.',
        next: 'hallway_intro',
        effects: { sandal: true, clues: 1, bravery: 1 },
        flavorTag: 'Berani',
        soundEffect: 'click',
      },
      {
        text: 'Tanya Doni: "Sebenernya ada apa di motel ini?"',
        next: 'ask_doni_about_motel',
        effects: { clues: 1, simulationKnowledge: 1 },
        flavorTag: 'Penasaran',
      },
    ],
  },

  bargain_closet_person: {
    id: 'bargain_closet_person',
    background: 'room13',
    speaker: 'The Closet Person',
    music: 'comedy',
    text: '"Deal! Kamu buka pintu dikit, aku lempar wafer cokelat sama peta coret-coretan basement."',
    dialogueLines: [
      {
        speaker: 'Narrator',
        text: 'Dari sela pintu lemari meluncur satu bungkus wafer renyah dan secarik kertas denah rahasia motel bertuliskan: "BASEMENT JANGAN DIBUKA - BANYAK PROTOKOL ANEH".',
        soundEffect: 'click',
      },
      {
        speaker: 'You',
        text: 'Mantap. Sekarang aku buka pintunya.',
      },
    ],
    choices: [
      {
        text: 'Buka pintu lemari sekarang.',
        next: 'free_closet_person',
        effects: { clues: 2, trust: 1, sandal: true, closetBefriended: true },
        flavorTag: 'Santai',
        soundEffect: 'door',
      },
    ],
  },

  block_closet: {
    id: 'block_closet',
    background: 'room13',
    speaker: 'You',
    music: 'tension',
    text: 'Kamu menarik kursi kayu berat dan mengganjal gagang lemari rapat-rapat.',
    dialogueLines: [
      {
        speaker: 'The Closet Person',
        text: 'Woi?! Kok diganjel?! Parah banget kamu, diskriminasi kaum penghuni lemari!',
      },
      {
        speaker: 'You',
        text: 'Tidak semudah itu Ferguso. Aku mau kabur dari kamar ini sekarang juga!',
      },
    ],
    choices: [
      {
        text: 'Lari keluar kamar ke lorong motel.',
        next: 'hallway_intro',
        effects: { panic: 1, bravery: 1 },
        flavorTag: 'Paranoid',
        soundEffect: 'footstep',
      },
    ],
  },

  ask_doni_about_motel: {
    id: 'ask_doni_about_motel',
    background: 'closet_open',
    speaker: 'The Closet Person',
    music: 'mystery',
    text: 'Doni mendekatkan wajahnya dan berbisik pelan.',
    dialogueLines: [
      {
        speaker: 'The Closet Person',
        text: 'Motel ini... sebenernya bukan motel komersil biasa. Di lantai bawah tanah ada Ruang Kontrol berlayar tabung.',
      },
      {
        speaker: 'The Closet Person',
        text: 'Semua tamu di sini adalah "Subjek Uji Coba Simulasi Bertahan Hidup". Katanya kalo ada yang berhasil mecahin kode sebelum subuh, simulasi bakal tamat.',
      },
      {
        speaker: 'You',
        text: 'Simulasi?! Terus resepsionis sama satpam tadi itu aktor bayaran?!',
      },
      {
        speaker: 'The Closet Person',
        text: 'Satpamnya kayaknya bukan aktor deh, emang orang capek biasa yang digaji murah. Ayo kita selidiki lorong.',
      },
    ],
    choices: [
      {
        text: 'Ajak Doni menjelajahi lorong motel.',
        next: 'hallway_intro',
        effects: { simulationKnowledge: 1, clues: 1, trust: 1 },
        flavorTag: 'Berani',
        soundEffect: 'footstep',
      },
    ],
  },

  // OPTION A: OPEN CLOSET DIRECTLY
  open_closet_brave: {
    id: 'open_closet_brave',
    background: 'closet_open',
    speaker: 'Narrator',
    music: 'tension',
    screenEffect: 'flicker',
    text: 'Dengan napas tertahan, kamu mencengkeram pegangan lemari kuningan dan menariknya sekuat tenaga!',
    dialogueLines: [
      {
        speaker: 'Narrator',
        text: 'KREEEKKK! Lampu kamar berkedip sekali.',
        soundEffect: 'door',
      },
      {
        speaker: 'Narrator',
        text: 'Kosong. Benar-benar kosong. Tidak ada monster bertaring maupun arwah gentayangan.',
      },
      {
        speaker: 'Narrator',
        text: 'Hanya ada satu gantungan baju reyot, sebuah sandal karet hijau tua, dan... sebuah walkie-talkie tua berwarna hitam legam.',
      },
      {
        speaker: 'Walkie-Talkie',
        text: 'Kzzzzt... *kresek kresek*... "Halo? Tes 1 2 3... Jangan keluar kamar."',
        soundEffect: 'radioStatic',
        screenEffect: 'shake',
      },
      {
        speaker: 'You',
        text: 'Kenapa?',
      },
      {
        speaker: 'Walkie-Talkie',
        text: '"Karena."',
      },
      {
        speaker: 'You',
        text: 'Karena apa?!',
      },
      {
        speaker: 'Walkie-Talkie',
        text: '"Budget dialog kami habis. Jangan nanya lagi."',
        soundEffect: 'sting',
      },
    ],
    choices: [
      {
        text: 'Ambil walkie-talkie dan sandal hijau, lalu keluar ke lorong.',
        next: 'hallway_intro',
        effects: { sandal: true, clues: 1, curiosity: 1 },
        flavorTag: 'Berani',
        soundEffect: 'click',
      },
      {
        text: 'Bicara ke walkie-talkie: "Siapa kamu sebenarnya?"',
        next: 'talk_to_walkie',
        effects: { curiosity: 2 },
        flavorTag: 'Penasaran',
      },
      {
        text: 'Periksa cermin kamar mandi dulu sebelum keluar.',
        next: 'bathroom_mirror',
        effects: { mirror: true, curiosity: 1 },
        flavorTag: 'Absurd',
      },
    ],
  },

  talk_to_walkie: {
    id: 'talk_to_walkie',
    background: 'closet_open',
    speaker: 'Walkie-Talkie',
    music: 'mystery',
    text: 'Kzzzzt... "Nama saya bukan urusanmu, Tamu Nomor 13. Tapi jika kamu ingin keluar hidup-hidup malam ini, perhatikan tanda-tanda di lantai bawah tanah."',
    dialogueLines: [
      {
        speaker: 'Walkie-Talkie',
        text: '"Dan satu hal lagi: Jika kamu bertemu kambing di lorong... jangan tatap matanya lebih dari 4 detik. Dia bukan kambing biasa."',
        soundEffect: 'radioStatic',
      },
      {
        speaker: 'You',
        text: 'Kambing?! Di dalam koridor motel bintang dua ada KAMBING?!',
      },
      {
        speaker: 'Walkie-Talkie',
        text: '"Bintang satu setengah, tolong jangan berlebihan. Klik." *suara sambungan terputus*',
      },
    ],
    choices: [
      {
        text: 'Bawa walkie-talkie & sandal hijau, buka pintu lorong motel.',
        next: 'hallway_intro',
        effects: { sandal: true, clues: 1, bravery: 1 },
        flavorTag: 'Berani',
        soundEffect: 'footstep',
      },
    ],
  },

  // ==========================================
  // MIRROR ROUTE (ROUTE D)
  // ==========================================
  bathroom_mirror: {
    id: 'bathroom_mirror',
    background: 'mirror_room',
    speaker: 'Narrator',
    music: 'mystery',
    screenEffect: 'flicker',
    text: 'Kamu melangkah ke kamar mandi Room 13 yang remang-remang. Lampu neon panjang berdengung pelan.',
    dialogueLines: [
      {
        speaker: 'Narrator',
        text: 'Uap dingin menyelimuti permukaan cermin. Kamu mengusap kacanya dengan telapak tangan.',
      },
      {
        speaker: 'Narrator',
        text: 'Refleksimu muncul. Tapi ada yang ganjil...',
      },
      {
        speaker: 'Mirror You',
        text: 'Hai. Akhirnya kamu nengok ke sini juga.',
        soundEffect: 'sting',
        screenEffect: 'shake',
      },
      {
        speaker: 'You',
        text: 'ASTAGA! Refleksiku ngomong?!',
      },
      {
        speaker: 'Mirror You',
        text: 'Santai, jangan panik. Aku ini kamu dari 15 menit ke depan. Di duniaku, motel ini udah kehabisan stok kopi.',
      },
      {
        speaker: 'Narrator',
        text: 'Kamu menyadari bahwa sosok di cermin memakai sepasang sandal hijau bercahaya.',
      },
    ],
    choices: [
      {
        text: '"Tukar tempat sama aku! Kamu aja yang hadapin lemari horor itu!"',
        next: 'mirror_swap',
        effects: { mirror: true, trust: 1 },
        flavorTag: 'Absurd',
      },
      {
        text: '"Kenapa kamu pake sandal hijau itu?"',
        next: 'mirror_sandal_timeline',
        effects: { sandal: true, simulationKnowledge: 1 },
        flavorTag: 'Penasaran',
      },
      {
        text: 'Cuci muka, anggap ini halusinasi kurang tidur, langsung ke lorong.',
        next: 'hallway_intro',
        effects: { bravery: 1 },
        flavorTag: 'Santai',
      },
    ],
  },

  mirror_swap: {
    id: 'mirror_swap',
    background: 'mirror_room',
    speaker: 'Mirror You',
    music: 'silence',
    endingId: 'ENDING_F',
    screenEffect: 'flash',
    text: '"Tukar tempat? Wah kebetulan banget. Di dalam cermin ada WiFi kenceng sama camilan."',
    dialogueLines: [
      {
        speaker: 'Narrator',
        text: 'Tangan dari balik cermin menjangkau kerah bajumu dan menarikmu masuk! Dunia berputar 180 derajat.',
        soundEffect: 'magic',
      },
      {
        speaker: 'Narrator',
        text: 'Sekarang KAMU yang berada di dalam cermin, memegang segelas jus jeruk dingin.',
        soundEffect: 'ding',
      },
      {
        speaker: 'Mirror You',
        text: 'Makasih ya bro! Sekarang giliranku yang kena teror Room 13!',
      },
      {
        speaker: 'You',
        text: 'Lho... kok di dalam cermin lebih nyaman dari kamarnya ya?',
      },
    ],
    choices: [],
  },

  mirror_sandal_timeline: {
    id: 'mirror_sandal_timeline',
    background: 'mirror_room',
    speaker: 'Mirror You',
    music: 'mystery',
    endingId: 'ENDING_G',
    screenEffect: 'glitch',
    text: '"Sandal ini adalah jangkar kontinum motel. Kalau kamu pasang sandal ini ke kaki kananmu sekarang..."',
    dialogueLines: [
      {
        speaker: 'Narrator',
        text: 'Kamu merogoh sandal hijau dari kantongmu dan menyelipkannya ke kaki kanan.',
        soundEffect: 'magic',
        screenEffect: 'flash',
      },
      {
        speaker: 'Narrator',
        text: 'BZZZZT! Seluruh ruangan bermutasi warna menjadi hijau emerald cerah! Jam di dinding berputar terbalik.',
      },
      {
        speaker: 'Intercom',
        text: '"PERHATIAN SELURUH STAFF: SANG PEMBAWA SANDAL TELAH TIBA. SELURUH PROTOKOL DARURAT DIBATALKAN."',
        soundEffect: 'alarm',
      },
      {
        speaker: 'You',
        text: 'Tunggu sebentar... jadi selama ini sandal jepit karet ini kartu identitas presiden direktur motel?!',
      },
    ],
    choices: [],
  },

  // ==========================================
  // HALLWAY HUB
  // ==========================================
  hallway_intro: {
    id: 'hallway_intro',
    background: 'hallway',
    speaker: 'Narrator',
    music: 'ambient',
    screenEffect: 'flicker',
    text: 'Kamu membuka pintu kamar dan melangkah ke lorong panjang motel.',
    dialogueLines: [
      {
        speaker: 'Narrator',
        text: 'Karpet motif jadul berwarna merah kecokelatan meredam langkah kakimu. Lampu fluorescent di langit-langit berkedip-kedip tak beraturan.',
        soundEffect: 'flicker',
      },
      {
        speaker: 'Narrator',
        text: 'Di ujung lorong kiri tercium bau aroma kuah mie instan dan udara dingin membeku dari Dapur Motel.',
      },
      {
        speaker: 'Narrator',
        text: 'Di sebelah kanan ada tangga darurat menuju Atap (Rooftop), dan pintu besi misterius bertuliskan: "RUANG MESIN / BASEMENT - DILARANG MASUK KECUALI PETUGAS".',
      },
      {
        speaker: 'Narrator',
        text: 'Dan di bawah lampu merah EXIT di kejauhan... ada seekor kambing berbulu cokelat yang sedang mengunyah brosur wisata motel dengan tenang.',
        soundEffect: 'goat',
      },
    ],
    choices: [
      {
        text: 'Masuk ke Dapur Motel (Aroma kuah mie instan manggil-manggil).',
        next: 'kitchen_hub',
        effects: { curiosity: 1 },
        flavorTag: 'Santai',
        soundEffect: 'footstep',
      },
      {
        text: 'Turun ke Pintu Besi Basement / Ruang Bawah Tanah.',
        next: 'basement_entry',
        effects: { bravery: 2, clues: 1 },
        flavorTag: 'Berani',
        soundEffect: 'door',
      },
      {
        text: 'Naik tangga darurat menuju Atap (Rooftop).',
        next: 'rooftop_entry',
        effects: { bravery: 1 },
        flavorTag: 'Penasaran',
        soundEffect: 'footstep',
      },
      {
        text: 'Dekati kambing misterius yang lagi makan brosur.',
        next: 'goat_encounter',
        effects: { curiosity: 2, goatFollowed: true },
        flavorTag: 'Absurd',
        soundEffect: 'goat',
      },
    ],
  },

  // ==========================================
  // ROUTE E: KITCHEN & FREEZER (ICE CREAM / NOODLE)
  // ==========================================
  kitchen_hub: {
    id: 'kitchen_hub',
    background: 'kitchen',
    speaker: 'Narrator',
    music: 'ambient',
    text: 'Kamu menyelinap ke dapur motel. Suasananya hangat remang-remang.',
    dialogueLines: [
      {
        speaker: 'Narrator',
        text: 'Di atas meja pantry tergeletak setumpuk mie instan kuah kari ayam, kompor portable yang menyala pelan, dan panci air mendidih.',
      },
      {
        speaker: 'Narrator',
        text: 'Namun di sisi lain dapur, pintu freezer industri stainless steel bergetar pelan. Suara batuk terdengar dari dalam freezer.',
        soundEffect: 'sting',
      },
      {
        speaker: 'You',
        text: 'Wait... ada orang batuk di dalam kulkas pembeku daging?',
      },
    ],
    choices: [
      {
        text: 'Buka pintu freezer industri: "Halo? Ada orang beku di dalam?"',
        next: 'freezer_inside',
        effects: { curiosity: 2, iceCream: true },
        flavorTag: 'Penasaran',
        soundEffect: 'door',
      },
      {
        text: 'Bodo amat sama freezer. Rebus Indomie pake telur setengah matang!',
        next: 'ending_noodle',
        effects: { noodlesCooked: true, bravery: 0 },
        flavorTag: 'Santai',
        soundEffect: 'ding',
      },
      {
        text: 'Kembali ke lorong motel.',
        next: 'hallway_intro',
        flavorTag: 'Paranoid',
        soundEffect: 'footstep',
      },
    ],
  },

  ending_noodle: {
    id: 'ending_noodle',
    background: 'kitchen',
    speaker: 'Narrator',
    music: 'comedy',
    endingId: 'ENDING_D',
    text: 'Kamu memutuskan bahwa misteri supranatural tidak ada apa-apanya dibanding semangkuk mie kuah hangat di tengah hujan badai.',
    dialogueLines: [
      {
        speaker: 'Narrator',
        text: 'Dengan presisi koki bintang lima, kamu merebus mie pas 3 menit, menambahkan cabai rawit potong dan telur mata sapi sempurna.',
        soundEffect: 'ding',
      },
      {
        speaker: 'Narrator',
        text: 'Kamu duduk di bangku dapur sambil menyeruput kuah gurih. Jam menunjukkan pukul 03:00 pagi.',
      },
      {
        speaker: 'The Guard',
        text: '...Lho mas, bikin mie ya? Bagi kuahnya dikit dong, jaga malam dingin banget.',
      },
      {
        speaker: 'You',
        text: 'Boleh pak satpam, duduk sini. Ambil mangkok.',
      },
      {
        speaker: 'Narrator',
        text: 'Malam misteri di Room 13 berakhir menjadi sesi nongkrong santai makan mie kuah sampai adzan subuh berkumandang.',
      },
    ],
    choices: [],
  },

  freezer_inside: {
    id: 'freezer_inside',
    background: 'freezer',
    speaker: 'Narrator',
    music: 'mystery',
    screenEffect: 'flicker',
    text: 'Kamu menarik tuas freezer industri. Kabut es tebal menyembur keluar bersama hawa dingin menusuk tulang.',
    dialogueLines: [
      {
        speaker: 'Narrator',
        text: 'Di antara deretan es batu dan drum es krim rasa Neapolitan, duduk seorang pria paruh baya mengenakan jaket parka oranye dan earmuff bulu.',
      },
      {
        speaker: 'Ice Cream Man',
        text: 'Brrr... Jangan ditutup dulu pintunya! AC di lobi mati, jadi saya ngadem di sini sambil maintenance termostat.',
        soundEffect: 'sting',
      },
      {
        speaker: 'You',
        text: 'Bapak maintenance termostat dari DALAM FREEZER?!',
      },
      {
        speaker: 'Ice Cream Man',
        text: 'Job desk teknisi motel ini luas, dekkk. Mau es krim rasa stroberi nggak? Gratis, subsidi direksi.',
      },
      {
        speaker: 'Ice Cream Man',
        text: 'Atau kamu mau bantuin saya cek sirkuit pendingin di Basement? Lagi lowongan nih, gaji 4.5 juta plus jatah es krim tak terbatas.',
      },
    ],
    choices: [
      {
        text: '"Saya terima tawarannya! Jadi staf teknisi motel freezer!"',
        next: 'ending_ice_cream',
        effects: { iceCream: true, trust: 2 },
        flavorTag: 'Absurd',
      },
      {
        text: 'Tanya bapak teknisi: "Bapak tahu jalan ke Ruang Kontrol Rahasia?"',
        next: 'ask_technician_secret',
        effects: { clues: 2, simulationKnowledge: 1 },
        flavorTag: 'Penasaran',
      },
      {
        text: 'Tutup freezer pelan-pelan dan kabur ke lorong.',
        next: 'hallway_intro',
        flavorTag: 'Paranoid',
      },
    ],
  },

  ending_ice_cream: {
    id: 'ending_ice_cream',
    background: 'freezer',
    speaker: 'Ice Cream Man',
    music: 'comedy',
    endingId: 'ENDING_H',
    text: '"Pilihan karir yang mantap jiwa! Nih pakai jaket parka cadangan."',
    dialogueLines: [
      {
        speaker: 'Narrator',
        text: 'Bapak teknisi memakaikan mantel tebal dan topi wol ke kepalamu, lalu menyerahkan sendok es krim stainless steel profesional.',
        soundEffect: 'magic',
      },
      {
        speaker: 'Narrator',
        text: 'Kamu melupakan seluruh urusan hidup lamamu. Mulai malam ini, kamu adalah Teknisi Senior Departemen Pendingin Motel Cendana Asri.',
      },
      {
        speaker: 'You',
        text: 'Ternyata survival terbaik bukan kabur, tapi dapat kerjaan tetap dengan fasilitas es krim tak terbatas.',
      },
    ],
    choices: [],
  },

  ask_technician_secret: {
    id: 'ask_technician_secret',
    background: 'freezer',
    speaker: 'Ice Cream Man',
    music: 'mystery',
    text: 'Bapak teknisi menurunkan sendok es krimnya dan menatapmu serius.',
    dialogueLines: [
      {
        speaker: 'Ice Cream Man',
        text: 'Ruang Kontrol itu ada di balik generator Basement, nak. Pintu baja di balik tumpukan kardus 1994.',
      },
      {
        speaker: 'Ice Cream Man',
        text: 'Kalo kamu punya Sandal Hijau Motel, tempelin aja ke reader di sebelah kanan generator. Nanti pintunya otomatis ke-unlock.',
        soundEffect: 'sting',
      },
      {
        speaker: 'You',
        text: 'Beneran sandal jepit itu kuncinya?! Dunia ini makin aneh...',
      },
    ],
    choices: [
      {
        text: 'Langsung menuju Basement dengan petunjuk bapak teknisi.',
        next: 'basement_entry',
        effects: { clues: 1, simulationKnowledge: 1 },
        flavorTag: 'Berani',
        soundEffect: 'footstep',
      },
    ],
  },

  // ==========================================
  // ROUTE F: THE GOAT SECRET
  // ==========================================
  goat_encounter: {
    id: 'goat_encounter',
    background: 'hallway',
    speaker: 'The Goat',
    music: 'comedy',
    text: 'Kambing itu menatapmu dengan pupil horizontalnya yang khas.',
    dialogueLines: [
      {
        speaker: 'The Goat',
        text: 'Mbaaaaaaa~',
        soundEffect: 'goat',
      },
      {
        speaker: 'You',
        text: 'Pus pus pus... eh, mbee mbee... kamu ngapain di sini kambing manis?',
      },
      {
        speaker: 'Narrator',
        text: 'Kambing itu berbalik dengan langkah anggun seperti model catwalk, lalu mengetukkan kukunya ke dinding berpanel kayu di ujung lorong buntu.',
        soundEffect: 'knock',
      },
      {
        speaker: 'Narrator',
        text: 'Dinding kayu bergeser membuka celah tersembunyi! Di dalamnya terdapat lift antik berhias ornamen emas dengan panel tombol bertuliskan huruf Yunani kuno.',
        soundEffect: 'magic',
      },
      {
        speaker: 'The Goat',
        text: 'Mbaaa! *sambil menunjuk tombol paling bawah*',
        soundEffect: 'goat',
      },
    ],
    choices: [
      {
        text: 'Ikut masuk ke dalam lift bersama kambing misterius!',
        next: 'secret_elevator_scene',
        effects: { goatFollowed: true, bravery: 2 },
        flavorTag: 'Secret',
        soundEffect: 'door',
      },
      {
        text: '"Nggak dulu bro, aku nggak mau diculik kambing sakti." Balik ke lorong.',
        next: 'hallway_intro',
        flavorTag: 'Paranoid',
      },
    ],
  },

  secret_elevator_scene: {
    id: 'secret_elevator_scene',
    background: 'secret_elevator',
    speaker: 'Narrator',
    music: 'mystery',
    screenEffect: 'flicker',
    text: 'Pintu lift antik tertutup rapat dengan denting emas halus.',
    dialogueLines: [
      {
        speaker: 'Narrator',
        text: 'Lantai lift mulai bergetar. Jarum indikator lantai berputar kencang melampaui angka Basement, minus 10, minus 50, hingga lambang tak hingga.',
        soundEffect: 'generator',
      },
      {
        speaker: 'You',
        text: 'Kambing, kita mau kemana sebenernya?!',
      },
      {
        speaker: 'The Goat',
        text: 'Mbaaaaaa... (Translasi batin: "Tenang saja wahai fana, tontonan ini telah dirancang oleh leluhur").',
        soundEffect: 'goat',
      },
      {
        speaker: 'Narrator',
        text: 'TING! Pintu lift terbuka ke hamparan cahaya ungu keemasan yang menakjubkan.',
        soundEffect: 'ding',
        screenEffect: 'flash',
      },
    ],
    choices: [
      {
        text: 'Langkah keluar menuju Dimensi Kambing Kosmik.',
        next: 'ending_goat',
        flavorTag: 'Absurd',
      },
    ],
  },

  ending_goat: {
    id: 'ending_goat',
    background: 'dream_void',
    speaker: 'Narrator',
    music: 'mystery',
    endingId: 'ENDING_K',
    screenEffect: 'flash',
    text: 'Kamu melangkah keluar dari lift menuju hamparan awan kosmik berbintang.',
    dialogueLines: [
      {
        speaker: 'Narrator',
        text: 'Di tengah kehampaan ruang dan waktu, ribuan sandal hijau melayang berputar seperti galaksi spiral.',
        soundEffect: 'magic',
      },
      {
        speaker: 'Narrator',
        text: 'Kambing di sampingmu kini mengenakan kacamata hitam retro dan berdiri dengan dua kaki belakang sambil memegang mikrofon karaoke.',
      },
      {
        speaker: 'The Goat',
        text: 'Mbaaa! Selamat datang di Dimensi Kambing Motel! Jangan tanyakan logika, nikmati saja bassline-nya!',
        soundEffect: 'goat',
      },
      {
        speaker: 'You',
        text: 'Kayaknya... aku butuh periksa obat tidur yang ku minum semalem.',
      },
    ],
    choices: [],
  },

  // ==========================================
  // ROUTE A: BASEMENT & CONTROL ROOM (SIMULATION)
  // ==========================================
  basement_entry: {
    id: 'basement_entry',
    background: 'basement',
    speaker: 'Narrator',
    music: 'tension',
    screenEffect: 'flicker',
    text: 'Kamu menuruni tangga beton dingin menuju lantai bawah tanah.',
    dialogueLines: [
      {
        speaker: 'Narrator',
        text: 'Bau oli mesin dan karat menusuk hidung. Suara dengung generator diesel beresonansi di dalam dada.',
        soundEffect: 'generator',
      },
      {
        speaker: 'Narrator',
        text: 'Di sudut ruangan, di balik tumpukan kardus arsip tahun 1994, terdapat pintu baja tebal dengan panel scanner digital berkedip lampu kuning.',
      },
      {
        speaker: 'You',
        text: 'Ada scanner kartu di sini? Padahal ini motel murah...',
      },
    ],
    choices: [
      {
        text: 'Tempelkan Sandal Hijau Motel ke sensor scanner.',
        next: 'open_control_with_sandal',
        requirement: { sandal: true },
        requirementHint: 'Membutuhkan Sandal Hijau Motel dari Lemari.',
        flavorTag: 'Absurd',
        soundEffect: 'magic',
      },
      {
        text: 'Periksa tumpukan kardus dan berkas motel untuk mencari clue.',
        next: 'search_basement_clues',
        effects: { clues: 2, simulationKnowledge: 1 },
        flavorTag: 'Penasaran',
        soundEffect: 'click',
      },
      {
        text: 'Coba paksa dobrak pintu baja dengan pipa besi.',
        next: 'force_basement_door',
        effects: { bravery: 1, panic: 1 },
        flavorTag: 'Berani',
        soundEffect: 'knock',
      },
      {
        text: 'Kembali naik ke lorong motel.',
        next: 'hallway_intro',
        flavorTag: 'Paranoid',
        soundEffect: 'footstep',
      },
    ],
  },

  search_basement_clues: {
    id: 'search_basement_clues',
    background: 'basement',
    speaker: 'You',
    music: 'mystery',
    text: 'Kamu membongkar berkas map kuning berdebu dari kardus.',
    dialogueLines: [
      {
        speaker: 'You',
        text: '"PROYEK EVALUASI KAMAR 13 - UJI COBA KETAHANAN MENTAL TERHADAP SITUASI ABSURD".',
        soundEffect: 'sting',
      },
      {
        speaker: 'You',
        text: 'Ada catatan password darurat tertulis di lembar terakhir: "SANDAL13" atau "KODE_OVERRIDE_404".',
      },
      {
        speaker: 'Narrator',
        text: 'Kamu menemukan kartu akses cadangan yang terselip di dalam map!',
        soundEffect: 'magic',
      },
    ],
    choices: [
      {
        text: 'Gunakan kartu akses cadangan untuk membuka pintu baja.',
        next: 'control_room_hub',
        effects: { clues: 1, simulationKnowledge: 1 },
        flavorTag: 'Berani',
        soundEffect: 'door',
      },
    ],
  },

  force_basement_door: {
    id: 'force_basement_door',
    background: 'basement',
    speaker: 'Narrator',
    music: 'tension',
    text: 'Kamu memukulkan pipa besi ke kunci pintu baja: TRANGGG!',
    dialogueLines: [
      {
        speaker: 'Narrator',
        text: 'Engsel pintu malah copot karena sudah dimakan rayap sejak tahun 1980-an.',
        soundEffect: 'thunder',
        screenEffect: 'shake',
      },
      {
        speaker: 'You',
        text: '...Teknologi tinggi tapi engselnya kerupuk.',
      },
    ],
    choices: [
      {
        text: 'Masuk ke dalam ruangan di balik pintu baja.',
        next: 'control_room_hub',
        flavorTag: 'Berani',
        soundEffect: 'footstep',
      },
    ],
  },

  open_control_with_sandal: {
    id: 'open_control_with_sandal',
    background: 'basement',
    speaker: 'Narrator',
    music: 'mystery',
    text: 'Kamu menempelkan sol sandal jepit hijau ke sensor canggih.',
    dialogueLines: [
      {
        speaker: 'Narrator',
        text: 'BEEP! Lampu scanner langsung berubah menjadi hijau tosca!',
        soundEffect: 'ding',
        screenEffect: 'flash',
      },
      {
        speaker: 'System',
        text: '"OTORISASI TERTINGGI DITERIMA. SELAMAT DATANG, DIREKTUR SANDAL KELAS A."',
      },
      {
        speaker: 'You',
        text: 'GILA. Beneran fungsi?! Sandal jepit ini beneran master key!',
      },
    ],
    choices: [
      {
        text: 'Masuk ke Ruang Kontrol Rahasia motel.',
        next: 'control_room_hub',
        effects: { simulationKnowledge: 1, clues: 1 },
        flavorTag: 'Berani',
        soundEffect: 'door',
      },
      {
        text: 'Terapkan sandal ke sistem keamanan motel secara permanen!',
        next: 'ending_the_sandal',
        flavorTag: 'Absurd',
      },
    ],
  },

  ending_the_sandal: {
    id: 'ending_the_sandal',
    background: 'control_room',
    speaker: 'Narrator',
    music: 'comedy',
    endingId: 'ENDING_E',
    screenEffect: 'flash',
    text: 'Kamu meletakkan sandal hijau di pedestal utama konsol keamanan motel.',
    dialogueLines: [
      {
        speaker: 'Narrator',
        text: 'Seluruh layar CCTV menampilkan gambar sandal jepit hijau dalam resolusi 4K ultra-HD.',
        soundEffect: 'magic',
      },
      {
        speaker: 'Intercom',
        text: '"SISTEM KEAMANAN NASIONAL TELAH DI-OVERRIDE OLEH PROTOKOL SANDAL JEPIT."',
      },
      {
        speaker: 'The Guard',
        text: 'Lho... gaji kita semua dinaikkan 300% dan seragam satpam diganti celana pendek pantai santai?! Makasih bos sandal!',
      },
      {
        speaker: 'You',
        text: 'Aku tidak mengerti apa yang baru saja terjadi, tapi hidupku sekarang makmur.',
      },
    ],
    choices: [],
  },

  control_room_hub: {
    id: 'control_room_hub',
    background: 'control_room',
    speaker: 'Narrator',
    music: 'tension',
    screenEffect: 'flicker',
    text: 'Kamu melangkah ke dalam Ruang Kontrol Rahasia.',
    dialogueLines: [
      {
        speaker: 'Narrator',
        text: 'Dinding ruangan dipenuhi deretan monitor tabung CRT yang menyala kehijauan. Setiap layar menampilkan sudut CCTV seluruh motel.',
        soundEffect: 'radioStatic',
      },
      {
        speaker: 'You',
        text: 'Tunggu... monitor nomor 13... itu CCTV di Room 13 pas aku lagi tidur jam 02:13 tadi!',
        screenEffect: 'shake',
      },
      {
        speaker: 'Narrator',
        text: 'Di konsol tengah, ada dua tombol besar yang menyala: Tombol Merah bertuliskan "HENTIKAN SIMULASI" dan Tombol Kuning bertuliskan "DISPENSER SNACK GRATIS".',
      },
      {
        speaker: 'Narrator',
        text: 'Di sudut kanan ada terminal komputer bertuliskan: "SUBJECT_LOGS.dat (Perlu 3 Clue)".',
      },
    ],
    choices: [
      {
        text: 'Tekan Tombol Merah: HENTIKAN SIMULASI!',
        next: 'ending_escaped',
        effects: { simulationKnowledge: 2 },
        flavorTag: 'Berani',
        soundEffect: 'alarm',
      },
      {
        text: 'Tekan Tombol Kuning: DISPENSER SNACK GRATIS!',
        next: 'ending_free_snacks',
        flavorTag: 'Absurd',
        soundEffect: 'ding',
      },
      {
        text: 'Tekan KEDUA TOMBOL SEKALIGUS!',
        next: 'ending_chaos',
        effects: { panic: 2 },
        flavorTag: 'Absurd',
        soundEffect: 'thunder',
      },
      {
        text: 'Akses terminal rahasia "SUBJECT_LOGS.dat".',
        next: 'true_mystery_terminal',
        requirement: { clues: 3 },
        requirementHint: 'Membutuhkan minimal 3 Clue yang terkumpul.',
        flavorTag: 'Secret',
        soundEffect: 'click',
      },
    ],
  },

  ending_escaped: {
    id: 'ending_escaped',
    background: 'control_room',
    speaker: 'Narrator',
    music: 'silence',
    endingId: 'ENDING_A',
    screenEffect: 'flash',
    text: 'KLIK! Kamu menekan tombol merah dengan mantap.',
    dialogueLines: [
      {
        speaker: 'System',
        text: '"PROTOKOL SIMULASI SURVIVAL DINONAKTIFKAN. MEMBUKA SELURUH PINTU DARURAT."',
        soundEffect: 'alarm',
      },
      {
        speaker: 'Narrator',
        text: 'Lampu darurat putih terang menyala di seluruh koridor. Pintu geser di ujung ruang kontrol membuka akses langsung ke jalan raya luar motel.',
        soundEffect: 'door',
      },
      {
        speaker: 'You',
        text: 'Berhasil! Hujan di luar sudah mulai reda. Saatnya pulang dan tidur di kasur empuk sendiri.',
      },
    ],
    choices: [],
  },

  ending_free_snacks: {
    id: 'ending_free_snacks',
    background: 'control_room',
    speaker: 'Narrator',
    music: 'comedy',
    endingId: 'ENDING_B',
    text: 'KLIK! Kamu menekan tombol kuning bertuliskan dispenser snack gratis.',
    dialogueLines: [
      {
        speaker: 'Narrator',
        text: 'BRRUKK! Panel dinding terbuka dan memuntahkan puluhan bungkus keripik kentang impor, cokelat kacang, dan minuman soda dingin ke lantai.',
        soundEffect: 'ding',
      },
      {
        speaker: 'You',
        text: 'Lupakan pelarian dramatis. Malam ini kita pesta micin di ruang kontrol.',
      },
      {
        speaker: 'Narrator',
        text: 'Kamu menghabiskan sisa malam menonton rekaman CCTV motel sambil ngemil keripik kentang sampai ketiduran di kursi putar empuk.',
      },
    ],
    choices: [],
  },

  ending_chaos: {
    id: 'ending_chaos',
    background: 'control_room',
    speaker: 'Narrator',
    music: 'silence',
    endingId: 'ENDING_C',
    screenEffect: 'shake',
    text: 'Kamu merentangkan kedua tangan dan menghantam kedua tombol secara bersamaan!',
    dialogueLines: [
      {
        speaker: 'System',
        text: '"PERINGATAN: PERINTAH KONFLIK! MERAH + KUNING = PROTOKOL DISKO DARURAT."',
        soundEffect: 'thunder',
      },
      {
        speaker: 'Narrator',
        text: 'Lampu sprinkler menyemprotkan air, lampu disko berputar warna-warni, sirine berbunyi dengan nada remix EDM koplo!',
        soundEffect: 'alarm',
        screenEffect: 'flash',
      },
      {
        speaker: 'The Guard',
        text: 'WOI SIAPA YANG NYALAIN PARTY?! *joget di depan kamera CCTV*',
      },
      {
        speaker: 'You',
        text: 'Kekacauan mutlak. Tapi seru juga sih.',
      },
    ],
    choices: [],
  },

  true_mystery_terminal: {
    id: 'true_mystery_terminal',
    background: 'control_room',
    speaker: 'Narrator',
    music: 'mystery',
    text: 'Layar monokrom hijau terminal memproses dekripsi data...',
    dialogueLines: [
      {
        speaker: 'Narrator',
        text: 'BEEP! Arsip rahasia terbuka di layar tabung CRT.',
        soundEffect: 'ding',
      },
      {
        speaker: 'You',
        text: '"DAFTAR SUBJEK ROOM 13:"\n- Player 01: Kabur hari ke-2.\n- Player 05: Memasak mie selamanya.\n- Player 08: Bergabung jadi teknisi freezer.\n- Player 12: Berteman dengan penghuni lemari.\n- Player 13: SEDANG AKTIF...',
        soundEffect: 'sting',
      },
      {
        speaker: 'Narrator',
        text: 'Foto profil Player 13 di layar adalah foto wajahmu saat pertama kali check-in di lobi tadi sore.',
      },
      {
        speaker: 'You',
        text: 'Tunggu... tanggal registrasi di bawah fotoku tertulis: "10 TAHUN LALU".',
        screenEffect: 'shake',
      },
    ],
    choices: [
      {
        text: 'Unduh file lengkap dan sadari realitas sesungguhnya.',
        next: 'ending_player_13',
        flavorTag: 'True Mystery',
        soundEffect: 'magic',
      },
    ],
  },

  ending_player_13: {
    id: 'ending_player_13',
    background: 'control_room',
    speaker: 'Narrator',
    music: 'mystery',
    endingId: 'ENDING_M',
    screenEffect: 'glitch',
    text: 'Kamu menekan tombol ENTER. Seluruh memori motel membanjiri pikiranmu.',
    dialogueLines: [
      {
        speaker: 'Narrator',
        text: 'Kamu bukan tamu biasa yang tersesat karena hujan lebat. Kamu adalah pencipta asli dari seluruh sistem simulasi Room 13.',
        soundEffect: 'magic',
      },
      {
        speaker: 'Narrator',
        text: 'Setiap malam, kamu menghapus ingatanmu sendiri untuk menguji apakah simulasi misteri komedi ini masih menghibur.',
      },
      {
        speaker: 'You',
        text: '...Jadi aku sendiri yang mendesain suara ketukan lemari itu? Selera humorku memang rada aneh dari dulu.',
      },
      {
        speaker: 'System',
        text: '"SELAMAT DATANG KEMBALI, KREATOR NOMOR 13. TES SIKLUS KE-104 SELESAI."',
      },
    ],
    choices: [],
  },

  // ==========================================
  // ROUTE B: ROOFTOP & ESCAPE (ROOFTOP / WRONG WAY / WALK AWAY)
  // ==========================================
  rooftop_entry: {
    id: 'rooftop_entry',
    background: 'rooftop',
    speaker: 'Narrator',
    music: 'ambient',
    screenEffect: 'rain-heavy',
    text: 'Kamu mendorong pintu besi tangga darurat dan tiba di atas atap motel.',
    dialogueLines: [
      {
        speaker: 'Narrator',
        text: 'Hujan rintik-rintik menerpa wajahmu. Neon plang "M TEL 13" berkedip merah redup di belakang menara tangki air berkarat.',
        soundEffect: 'thunder',
      },
      {
        speaker: 'Narrator',
        text: 'Di sudut atap, di bawah tenda terpal kecil, Pak Satpam sedang duduk di kursi lipat sambil menuang kopi panas dari termos.',
      },
      {
        speaker: 'The Guard',
        text: 'Eh mas... ngapain hujan-hujan naik ke atap? Masih jam tiga pagi ini.',
      },
      {
        speaker: 'You',
        text: 'Pak Satpam?! Bapak tahu kamar 13 ada suara aneh dan lorongnya ada kambing?!',
      },
      {
        speaker: 'The Guard',
        text: 'Oalah... kambing si Jono itu mah emang suka kabur dari kebun sebelah. Kalo lemari berisik, biasa mas engselnya ketiup angin pipa AC.',
      },
    ],
    choices: [
      {
        text: '"Pak, kita bangun markas survival di atap ini aja bareng-bareng!"',
        next: 'ending_rooftop_kingdom',
        effects: { trust: 2, bravery: 1 },
        flavorTag: 'Absurd',
      },
      {
        text: '"Pak, saya mau kabur keluar motel lewat tangga darurat belakang."',
        next: 'forest_escape_path',
        effects: { panic: 1 },
        flavorTag: 'Paranoid',
        soundEffect: 'footstep',
      },
      {
        text: '"Kunci mobil saya ada di saku. Saya mau langsung pulang aja."',
        next: 'ending_walk_away',
        flavorTag: 'Santai',
        soundEffect: 'click',
      },
    ],
  },

  ending_rooftop_kingdom: {
    id: 'ending_rooftop_kingdom',
    background: 'rooftop',
    speaker: 'The Guard',
    music: 'comedy',
    endingId: 'ENDING_L',
    text: '"Ide bagus tuh mas! Kebetulan saya bawa panggangan sosis sama gitar bolong."',
    dialogueLines: [
      {
        speaker: 'Narrator',
        text: 'Doni si orang lemari dan Pak Joko teknisi freezer ikut naik ke atap membawa terpal tambahan dan es krim.',
        soundEffect: 'magic',
      },
      {
        speaker: 'Narrator',
        text: 'Kalian membarikade pintu tangga darurat dan mendeklarasikan Republik Survival Atap Motel Cendana Asri.',
      },
      {
        speaker: 'The Guard',
        text: 'Mas jadi Perdana Menteri, saya jadi Panglima Keamanan. Besok kita panen kangkung hidroponik di talang air.',
      },
      {
        speaker: 'You',
        text: 'Misteri terselesaikan dengan cara paling tidak masuk akal, tapi sosis bakarnya enak.',
      },
    ],
    choices: [],
  },

  forest_escape_path: {
    id: 'forest_escape_path',
    background: 'forest',
    speaker: 'Narrator',
    music: 'tension',
    screenEffect: 'darkness',
    text: 'Kamu melompat menuruni tangga darurat dan berlari menerobos pagar kawat motel menuju hutan berkabut tebal.',
    dialogueLines: [
      {
        speaker: 'Narrator',
        text: 'Napasmu terengah-engah. Sepatu basah kuyup terkena lumpur. Cabang pepohonan pinus menggores jaketmu.',
        soundEffect: 'footstep',
      },
      {
        speaker: 'You',
        text: 'Lari terus! Jangan noleh ke belakang! Aku harus keluar dari wilayah motel terkutuk ini!',
      },
      {
        speaker: 'Narrator',
        text: 'Setelah berlari 20 menit menembus kabut... di depanmu terlihat samar-samar sebuah pintu kayu bernomor 13.',
        soundEffect: 'sting',
        screenEffect: 'shake',
      },
    ],
    choices: [
      {
        text: 'Buka pintu kayu di tengah hutan...',
        next: 'ending_wrong_way',
        flavorTag: 'Paranoid',
        soundEffect: 'door',
      },
    ],
  },

  ending_wrong_way: {
    id: 'ending_wrong_way',
    background: 'room13',
    speaker: 'Narrator',
    music: 'silence',
    endingId: 'ENDING_J',
    screenEffect: 'flicker',
    text: 'Kamu membuka pintu kayu itu... dan melangkah masuk kembali ke dalam Room 13!',
    dialogueLines: [
      {
        speaker: 'Narrator',
        text: 'Jam alarm digital di meja nakas masih menunjukkan pukul 02:13 AM. Selimutmu masih berantakan persis seperti saat pertama kali kamu bangun.',
        soundEffect: 'thunder',
      },
      {
        speaker: 'Narrator',
        text: 'KNOCK. KNOCK. KNOCK.',
        soundEffect: 'knock',
      },
      {
        speaker: 'You',
        text: 'LHO KOK KEMBALI KE SINI LAGI?! INI MOTEL APA GAME NINTENDO TAHUN 80-AN?!',
      },
    ],
    choices: [],
  },

  ending_walk_away: {
    id: 'ending_walk_away',
    background: 'exit_road',
    speaker: 'Narrator',
    music: 'ambient',
    endingId: 'ENDING_N',
    text: 'Kamu turun dengan santai ke lobi, meletakkan kunci kamar di atas meja resepsionis yang kosong, lalu berjalan menuju mobilmu di parkiran.',
    dialogueLines: [
      {
        speaker: 'Narrator',
        text: 'Kamu menyalakan mesin mobil, menyetel musik santai di radio, dan menginjak gas keluar dari gerbang motel menuju jalan raya beraspal basah.',
        soundEffect: 'magic',
      },
      {
        speaker: 'You',
        text: 'Ada lemari bunyi? Bukan urusanku. Ada kambing di lorong? Bukan urusanku juga. Yang penting bensin penuh dan selamat.',
      },
      {
        speaker: 'Narrator',
        text: 'Kamu menyetir menjauhi motel misteri tanpa pernah menoleh ke kaca spion. Terkadang, keputusan paling bijak adalah tidak ikut campur.',
      },
    ],
    choices: [],
  },
};
