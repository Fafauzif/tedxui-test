export const categories = [
  "Semua",
  "Arah",
  "Cara pandang",
  "Bersama",
  "Dunia sekitar",
] as const;
export type Category = (typeof categories)[number];
export type Question = {
  id: string;
  category: Exclude<Category, "Semua">;
  text: string;
  hint: string;
  perspective: string;
};

// Original campaign prompts. Perspectives are editorial examples, not audience submissions.
export const questions: Question[] = [
  {
    id: "arah-01",
    category: "Arah",
    text: "Kapan terakhir kali kamu berubah pikiran?",
    hint: "Tentang hal kecil juga boleh. Apa yang membuatmu melihatnya berbeda?",
    perspective:
      "Dulu aku mengira berganti arah berarti menyia-nyiakan waktu. Sekarang aku mulai melihat bahwa pengalaman sebelumnya tetap ikut membentuk pilihan berikutnya.",
  },
  {
    id: "pandang-01",
    category: "Cara pandang",
    text: "Apa yang sedang kamu pelajari untuk tidak buru-buru simpulkan?",
    hint: "Sebuah situasi, seseorang, atau mungkin dirimu sendiri.",
    perspective:
      "Aku sedang belajar membedakan tidak setuju dan tidak mau mendengar. Kadang aku baru memahami alasan seseorang setelah berhenti menyiapkan bantahan.",
  },
  {
    id: "bersama-01",
    category: "Bersama",
    text: "Percakapan apa yang ingin kamu mulai, tapi selalu kamu tunda?",
    hint: "Kamu tidak perlu menyebut nama. Mulai dari apa yang ingin kamu pahami.",
    perspective:
      "Aku ingin bertanya bagaimana orang tuaku memilih pekerjaannya dulu. Selama ini aku hanya tahu hasilnya, belum pernah mendengar keraguannya.",
  },
  {
    id: "dunia-01",
    category: "Dunia sekitar",
    text: "Apa yang sebaiknya tetap sulit, meski teknologi bisa memudahkannya?",
    hint: "Pikirkan kegiatan yang prosesnya sama penting dengan hasilnya.",
    perspective:
      "Mungkin membentuk pendapat. Aku senang bisa menemukan ringkasan dengan cepat, tetapi aku juga ingin tahu alasan di balik hal yang akhirnya aku percaya.",
  },
  {
    id: "arah-02",
    category: "Arah",
    text: "Ekspektasi siapa yang sedang kamu pertimbangkan ulang?",
    hint: "Apa yang kamu pilih karena ingin, dan apa yang terasa seperti kewajiban?",
    perspective:
      "Aku baru sadar bahwa beberapa targetku berasal dari perbandingan yang bahkan tidak pernah dibicarakan. Aku ingin memeriksa mana yang masih masuk akal untukku.",
  },
  {
    id: "pandang-02",
    category: "Cara pandang",
    text: "Apa yang baru kamu pahami setelah mengalaminya sendiri?",
    hint: "Adakah nasihat yang maknanya berubah setelah kamu menjalaninya?",
    perspective:
      "Meminta bantuan ternyata bukan cuma soal keberanian. Aku juga perlu belajar menjelaskan bagian mana yang belum kupahami.",
  },
  {
    id: "bersama-02",
    category: "Bersama",
    text: "Siapa yang melihat dunia dengan cara berbeda darimu?",
    hint: "Kalau kamu punya sepuluh menit untuk mendengar, apa yang ingin kamu tanyakan?",
    perspective:
      "Temanku bekerja sambil kuliah. Obrolan tentang waktu luang dengannya membuatku menyadari betapa berbedanya pilihan yang tersedia bagi setiap orang.",
  },
  {
    id: "dunia-02",
    category: "Dunia sekitar",
    text: "Hal biasa apa yang sebenarnya ingin kamu pahami lebih dalam?",
    hint: "Dari perjalanan pulang sampai rekomendasi di layar ponselmu.",
    perspective:
      "Aku penasaran mengapa rute yang nyaman untukku bisa terasa tidak aman untuk orang lain. Ternyata pertanyaannya lebih besar daripada jarak.",
  },
  {
    id: "arah-03",
    category: "Arah",
    text: "Bagaimana kamu membedakan istirahat dan menghindar?",
    hint: "Tidak harus sudah ada jawabannya. Apa tanda yang biasanya kamu perhatikan?",
    perspective:
      "Kadang bentuknya sama: menutup laptop. Aku sedang belajar memperhatikan apakah setelahnya aku lebih siap kembali, atau justru makin takut memulai.",
  },
  {
    id: "pandang-03",
    category: "Cara pandang",
    text: "Apa yang dulu terasa pasti, tapi sekarang jadi pertanyaan?",
    hint: "Keyakinan kecil pun bisa punya cerita yang panjang.",
    perspective:
      "Dulu aku yakin semua hal bisa diukur dengan hasil. Sekarang aku bertanya bagaimana menilai proses yang belum menghasilkan sesuatu yang terlihat.",
  },
  {
    id: "bersama-03",
    category: "Bersama",
    text: "Apa yang ingin kamu pahami sebelum menilai seseorang?",
    hint: "Coba mulai dari konteks yang belum kamu ketahui.",
    perspective:
      "Aku ingin tahu pilihan apa yang sebenarnya mereka miliki. Keputusan yang tampak aneh dari luar mungkin masuk akal dalam keadaan yang belum kupahami.",
  },
  {
    id: "dunia-03",
    category: "Dunia sekitar",
    text: "Kapan informasi yang banyak justru membuatmu kurang memahami?",
    hint: "Ingat satu saat ketika mencari tahu malah menambah kebingungan.",
    perspective:
      "Aku pernah membaca belasan pendapat tentang satu topik tanpa tahu pertanyaan awalku. Berhenti sebentar membantuku menyadari apa yang sebenarnya ingin kucari.",
  },
  {
    id: "arah-04",
    category: "Arah",
    text: "Apa yang ingin kamu coba tanpa harus langsung mahir?",
    hint: "Kalau tidak perlu menunjukkan hasilnya, apa yang akan kamu mulai?",
    perspective:
      "Aku ingin menggambar lagi, tanpa mengubahnya menjadi target baru. Kali ini aku ingin tahu apakah aku masih menikmati prosesnya.",
  },
  {
    id: "pandang-04",
    category: "Cara pandang",
    text: "Kapan kamu terakhir mengatakan, “Aku belum tahu”?",
    hint: "Apa yang terjadi setelah kamu mengatakannya?",
    perspective:
      "Dalam diskusi kemarin aku mengakui belum membaca sumbernya. Percakapannya justru menjadi lebih berguna karena kami mulai memeriksa alasannya bersama.",
  },
  {
    id: "bersama-04",
    category: "Bersama",
    text: "Pertanyaan apa yang ingin kamu dengar dari seorang teman?",
    hint: "Bukan nasihat. Hanya satu pertanyaan yang membuka ruang.",
    perspective:
      "Mungkin, “Kamu ingin didengarkan atau dibantu mencari pilihan?” Aku sering belum tahu apa yang kubutuhkan sampai seseorang memberiku kesempatan memilih.",
  },
  {
    id: "dunia-04",
    category: "Dunia sekitar",
    text: "Apa yang tidak terlihat di balik sesuatu yang kamu gunakan setiap hari?",
    hint: "Siapa, proses apa, atau keputusan mana yang jarang kamu pikirkan?",
    perspective:
      "Segelas kopi membuatku bertanya tentang orang-orang yang terlibat sebelum sampai di mejaku. Aku biasanya hanya memikirkan rasa dan harganya.",
  },
  {
    id: "arah-05",
    category: "Arah",
    text: "Seperti apa kemajuan yang tidak perlu kamu unggah?",
    hint: "Apa yang tetap berarti meski tidak disaksikan orang lain?",
    perspective:
      "Bisa mengubah kebiasaan kecil yang dulu selalu kuulang. Tidak ada foto yang menjelaskannya, tetapi aku tahu bedanya.",
  },
  {
    id: "pandang-05",
    category: "Cara pandang",
    text: "Apa yang mungkin terlewat dari cerita yang kamu percaya?",
    hint: "Coba bayangkan sudut pandang yang belum kamu dengar.",
    perspective:
      "Aku sedang belajar mencari siapa yang tidak ada dalam sebuah cerita. Kadang pertanyaan itu mengubah cara aku membaca kesimpulannya.",
  },
  {
    id: "bersama-05",
    category: "Bersama",
    text: "Dari siapa kamu belajar sesuatu yang tidak kamu duga?",
    hint: "Bisa dari pertemuan singkat, bukan hanya orang yang dekat.",
    perspective:
      "Dari orang yang memperbaiki sepatuku. Caranya menjelaskan bahan membuatku berpikir ulang tentang barang yang selama ini cepat kuganti.",
  },
  {
    id: "dunia-05",
    category: "Dunia sekitar",
    text: "Apa yang berubah saat sesuatu bisa diukur?",
    hint: "Apakah angka membantu memahami, atau mengubah hal yang kita kejar?",
    perspective:
      "Ketika mulai menghitung langkah, aku lebih rajin berjalan. Tetapi aku juga sadar pernah menganggap jalan santai tanpa ponsel sebagai sesuatu yang tidak tercatat, lalu kurang berarti.",
  },
  {
    id: "arah-06",
    category: "Arah",
    text: "Pilihan apa yang ingin kamu pahami sebelum kamu putuskan?",
    hint: "Apa satu informasi atau percakapan yang masih kamu butuhkan?",
    perspective:
      "Aku ingin mendengar keseharian seseorang di pekerjaan yang kuincar. Nama profesinya menarik, tetapi aku belum tahu apakah aku menyukai proses kerjanya.",
  },
  {
    id: "pandang-06",
    category: "Cara pandang",
    text: "Apa bedanya memahami suatu pendapat dan menyetujuinya?",
    hint: "Pikirkan percakapan ketika dua hal ini terasa bercampur.",
    perspective:
      "Aku bisa mengerti mengapa temanku memilih sesuatu tanpa ingin membuat pilihan yang sama. Rasanya sederhana, tetapi aku sering melupakannya dalam perdebatan.",
  },
  {
    id: "bersama-06",
    category: "Bersama",
    text: "Apa yang ingin kamu tanyakan kepada seseorang dari generasi berbeda?",
    hint: "Mulai dari rasa ingin tahu, bukan anggapan tentang mereka.",
    perspective:
      "Aku ingin bertanya seperti apa masa depan yang mereka bayangkan saat seusia denganku. Mungkin ada kekhawatiran yang ternyata serupa.",
  },
  {
    id: "dunia-06",
    category: "Dunia sekitar",
    text: "Pertanyaan kecil apa yang bisa mengubah cara kita hidup bersama?",
    hint: "Mulai dari sesuatu yang kamu lihat di sekitar, bukan solusi yang sudah jadi.",
    perspective:
      "Siapa yang belum bisa menggunakan ruang ini? Pertanyaan itu membuatku melihat tangga, papan petunjuk, dan tempat duduk dengan cara yang berbeda.",
  },
];

export const event = {
  name: "TEDxUniversitasIndonesia 2027",
  theme: "Still, We Grow",
  // Add approved public details here. Keep null until confirmed.
  date: null as string | null,
  venue: null as string | null,
  ticketUrl: null as string | null,
  instagramUrl: null as string | null,
  logoUrl: null as string | null,
};
