const chapters = [
  {
    id: 1,
    title: "Kenalan",
    description_english:
      "Master basic Javanese greetings, introductions, and simple conversation starters!",
    description_indonesian:
      "Kuasai salam dasar, perkenalan, dan cara memulai percakapan dalam bahasa Jawa!",
    order: 1,
    phases: [
      { id: 1, name_english: "Pretest", name_indonesian: "Pretest" },
      {
        id: 2,
        name_english: "How to Introduce Yourself",
        name_indonesian: "Cara Berkenalan",
        pdf_file_english: "chapter-1-1-en.pdf",
        pdf_file_indonesian: "chapter-1-1-id.pdf",
      },
      {
        id: 3,
        name_english: "Family",
        name_indonesian: "Keluarga",
        pdf_file_english: "chapter-1-2-en.pdf",
        pdf_file_indonesian: "chapter-1-2-id.pdf",
      },
      {
        id: 4,
        name_english: "Body Parts",
        name_indonesian: "Anggota Tubuh",
        pdf_file_english: "chapter-1-3-en.pdf",
        pdf_file_indonesian: "chapter-1-3-id.pdf",
      },
      {
        id: 5,
        name_english: "Greeting someone",
        name_indonesian: "Menyapa",
        pdf_file_english: "chapter-1-4-en.pdf",
        pdf_file_indonesian: "chapter-1-4-id.pdf",
      },
      { id: 6, 
        name_english: "Posttest", 
        name_indonesian: "Posttest" 
      },
    ],
    questions: [
      {
        question_english: "Meyong ,,, meyong .. iku swarane?",
        question_indonesian: "Meyong ,,, meyong .. iku swarane?",
        options_english: ["Pitik", "Kebo", "Wedhus", "Kucing"],
        options_indonesian: ["Pitik", "Kebo", "Wedhus", "Kucing"],
        correctAnswer: 3,
      },
      {
        question_english: "Jenengku …",
        question_indonesian: "Jenengku …",
        options_english: ["SD 1 Sukareja", "Jalan Juanda No. 2", "Doni Wicaksono", "Patang taun"],
        options_indonesian: ["SD 1 Sukareja", "Jalan Juanda No. 2", "Doni Wicaksono", "Patang taun"],
        correctAnswer: 2,
      },
      {
        question_english: "Alamat omahku …",
        question_indonesian: "Alamat omahku …",
        options_english: ["Niken", "Jalan Juanda No. 2", "Doni Wicaksono", "Patang taun"],
        options_indonesian: ["Niken", "Jalan Juanda No. 2", "Doni Wicaksono", "Patang taun"],
        correctAnswer: 1,
      },
      {
        question_english: "Asmane Bapakku …",
        question_indonesian: "Asmane Bapakku …",
        options_english: ["Susilo Agus", "Bandung", "Pitung taun", "Simbah"],
        options_indonesian: ["Susilo Agus", "Bandung", "Pitung taun", "Simbah"],
        correctAnswer: 0,
      },
      {
        question_english: "Taun ngarep adhiku mlebu …",
        question_indonesian: "Taun ngarep adhiku mlebu …",
        options_english: ["Semarang", "Patang taun", "TK", "Ora ngerti"],
        options_indonesian: ["Semarang", "Patang taun", "TK", "Ora ngerti"],
        correctAnswer: 2,
      },
      {
        question_english: "Tangan gunane kanggo …",
        question_indonesian: "Tangan gunane kanggo …",
        options_english: ["Nyekel", "Mlaku", "Ngunyah", "Ndelok"],
        options_indonesian: ["Nyekel", "Mlaku", "Ngunyah", "Ndelok"],
        correctAnswer: 0,
      },
      {
        question_english: "Piranti kang ana ing sekolah yaiku …",
        question_indonesian: "Piranti kang ana ing sekolah yaiku …",
        options_english: ["Ulekan", "Dandhang", "Solet", "Potelot"],
        options_indonesian: ["Ulekan", "Dandhang", "Solet", "Potelot"],
        correctAnswer: 3,
      },
      {
        question_english: "Budi nulis nganggo …",
        question_indonesian: "Budi nulis nganggo …",
        options_english: ["Potelot", "Garisan", "Ongotan", "Setip"],
        options_indonesian: ["Potelot", "Garisan", "Ongotan", "Setip"],
        correctAnswer: 0,
      },
      {
        question_english: "Perangan awak sing kanggo ngrungokake yaiku …",
        question_indonesian: "Perangan awak sing kanggo ngrungokake yaiku …",
        options_english: ["Kuping", "Sikil", "Untu", "Lambe"],
        options_indonesian: ["Kuping", "Sikil", "Untu", "Lambe"],
        correctAnswer: 0,
      },
      {
        question_english: "Kenalan iku luwih apik karo ...",
        question_indonesian: "Kenalan iku luwih apik karo ...",
        options_english: ["Turu", "Meneng", "Salaman", "Mulih"],
        options_indonesian: ["Turu", "Meneng", "Salaman", "Mulih"],
        correctAnswer: 2,
      },
      {
        question_english: "Kangmas sebutan kanggo lanang, yen kanggo wedok kasebut ...",
        question_indonesian: "Kangmas sebutan kanggo lanang, yen kanggo wedok kasebut ...",
        options_english: ["Simbah", "Budhe", "Adhi", "Mbakyu"],
        options_indonesian: ["Simbah", "Budhe", "Adhi", "Mbakyu"],
        correctAnswer: 3,
      },
      {
        question_english: "Dina iki swasane atiku ...",
        question_indonesian: "Dina iki swasane atiku ...",
        options_english: ["Nglokro", "Sikil", "Ibu", "Idep"],
        options_indonesian: ["Nglokro", "Sikil", "Ibu", "Idep"],
        correctAnswer: 0,
      },
      {
        question_english: "Gunane Kenalan yaiku ...",
        question_indonesian: "Gunane Kenalan yaiku ...",
        options_english: ["Ajar wedi", "Akeh satru", "Nduweni kanca", "Nambah Songong"],
        options_indonesian: ["Ajar wedi", "Akeh satru", "Nduweni kanca", "Nambah Songong"],
        correctAnswer: 2,
      },
      {
        question_english: "Jeneng celukanku ...",
        question_indonesian: "Jeneng celukanku ...",
        options_english: ["Doni", "Doni Bagus Saputra", "Telu taun", "SMA 5 Semarang"],
        options_indonesian: ["Doni", "Doni Bagus Saputra", "Telu taun", "SMA 5 Semarang"],
        correctAnswer: 0,
      },
      {
        question_english: "Sikil gunane kanggo ...",
        question_indonesian: "Sikil gunane kanggo ...",
        options_english: ["Nyekel", "Mlaku", "Ndelok", "Ngrungokake"],
        options_indonesian: ["Nyekel", "Mlaku", "Ndelok", "Ngrungokake"],
        correctAnswer: 1,
      }   
    ],
  },
  {
    id: 2,
    title: "Pitutur kang Becik",
    description_english:
      "Learn about good advice and wise sayings in Javanese culture.",
    description_indonesian:
      "Pelajari nasihat baik dan pepatah bijak dalam budaya Jawa.",
    order: 2,
    phases: [
      { id: 1, name_english: "Pretest", name_indonesian: "Pretest" },
      {
        id: 2,
        name_english: "Singing (Nembang)",
        name_indonesian: "Menyanyi (Nembang)",
        pdf_file_english: "chapter-2-1-en.pdf",
        pdf_file_indonesian: "chapter-2-1-id.pdf",
      },
      {
        id: 3,
        name_english: "Match the Words",
        name_indonesian: "Cocokkan Katanya",
        pdf_file_english: "chapter-2-2-en.pdf",
        pdf_file_indonesian: "chapter-2-2-id.pdf",
      },
      { id: 4, name_english: "Posttest", name_indonesian: "Posttest" },
    ],
    questions: [
      {
        question_english: "Titikane tembang dolanan yaiku …",
        question_indonesian: "Titikane tembang dolanan yaiku …",
        options_english: [
          "Basane angel",
          "Cengkok utawa wilet lagu samadya",
          "Cacahe gatra wates",
          "Ngemot babagan kaendahan, kejahatan, lan nilai sosial liyane"
        ],
        options_indonesian: [
          "Basane angel",
          "Cengkok utawa wilet lagu samadya",
          "Cacahe gatra wates",
          "Ngemot babagan kaendahan, kejahatan, lan nilai sosial liyane"
        ],
        correctAnswer: 1
      },
      {
        question_english: "Tembang kodhok ngorek nduweni makna …",
        question_indonesian: "Tembang kodhok ngorek nduweni makna …",
        options_english: [
          "Dadi bocah kudu sregep",
          "Dadi bocah sing kesed",
          "Bocah bodho dadi dokter",
          "Bocah pinter dadi kebo"
        ],
        options_indonesian: [
          "Dadi bocah kudu sregep",
          "Dadi bocah sing kesed",
          "Bocah bodho dadi dokter",
          "Bocah pinter dadi kebo"
        ],
        correctAnswer: 0
      },
      {
        question_english: "Sedheku tegese …",
        question_indonesian: "Sedheku tegese …",
        options_english: [
          "Sikep nalika lungguh, tangane ditekuk kaya sedhakep, sidelehake ing ndhuwur meja",
          "Nyimak pitutur kanthi premati",
          "Diwenehi pitakonan",
          "Perangan awak kanggo nulis lan nyekel"
        ],
        options_indonesian: [
          "Sikep nalika lungguh, tangane ditekuk kaya sedhakep, sidelehake ing ndhuwur meja",
          "Nyimak pitutur kanthi premati",
          "Diwenehi pitakonan",
          "Perangan awak kanggo nulis lan nyekel"
        ],
        correctAnswer: 0
      },
      {
        question_english: "Mirengake ing tembung “Siji Loro Telu” tegese …",
        question_indonesian: "Mirengake ing tembung “Siji Loro Telu” tegese …",
        options_english: [
          "Sikep nalika lungguh, tangane ditekuk kaya sedhakep, sidelehake ing ndhuwur meja",
          "Nyimak pitutur kanthi premati",
          "Diwenehi pitakonan",
          "Perangan awak kanggo nulis lan nyekel"
        ],
        options_indonesian: [
          "Sikep nalika lungguh, tangane ditekuk kaya sedhakep, sidelehake ing ndhuwur meja",
          "Nyimak pitutur kanthi premati",
          "Diwenehi pitakonan",
          "Perangan awak kanggo nulis lan nyekel"
        ],
        correctAnswer: 1
      },
      {
        question_english: "Isi Tembang “Siji Loro Telu” yaiku …",
        question_indonesian: "Isi Tembang “Siji Loro Telu” yaiku …",
        options_english: [
          "Dadi bocah sing mirengake guru lan aja usil",
          "Bocah kasebut kudu nduweni piwulang lan nilai moral sing apik supaya bisa migunani kanggo wong liyane",
          "Aja srakah marang kasugihan llan kebak hawa nepsu",
          "Undangan kanggo sregep sinau supaya bisa entuk kesempatan dadi pimpinan"
        ],
        options_indonesian: [
          "Dadi bocah sing mirengake guru lan aja usil",
          "Bocah kasebut kudu nduweni piwulang lan nilai moral sing apik supaya bisa migunani kanggo wong liyane",
          "Aja srakah marang kasugihan llan kebak hawa nepsu",
          "Undangan kanggo sregep sinau supaya bisa entuk kesempatan dadi pimpinan"
        ],
        correctAnswer: 0
      },
      {
        question_english: "Kendharaan kang ana ing tembang “Sepuran” yaiku …",
        question_indonesian: "Kendharaan kang ana ing tembang “Sepuran” yaiku …",
        options_english: [
          "Montor",
          "Bis",
          "Sepur",
          "Prau"
        ],
        options_indonesian: [
          "Montor",
          "Bis",
          "Sepur",
          "Prau"
        ],
        correctAnswer: 2
      },
      {
        question_english: "Kendharaan ing “Sepuran” areng menyang …",
        question_indonesian: "Kendharaan ing “Sepuran” areng menyang …",
        options_english: [
          "Kedhiri",
          "Semarang",
          "Surabaya",
          "Tegal"
        ],
        options_indonesian: [
          "Kedhiri",
          "Semarang",
          "Surabaya",
          "Tegal"
        ],
        correctAnswer: 0
      },
      {
        question_english: "Tembang kasebut klebu jinise tembang …",
        question_indonesian: "Tembang kasebut klebu jinise tembang …",
        options_english: [
          "Dolanan",
          "Macapat",
          "Campusari",
          "Bawa"
        ],
        options_indonesian: [
          "Dolanan",
          "Macapat",
          "Campusari",
          "Bawa"
        ],
        correctAnswer: 0
      },
      {
        question_english: "Cublak-Cublak Suweng nduweni makna …",
        question_indonesian: "Cublak-Cublak Suweng nduweni makna …",
        options_english: [
          "Undangan kanggo sregep sinau supaya bisa entuk kesempatan dadi pimpinan",
          "Aja dadi bocak nakal",
          "Bocah kasebut kudu nduweni piwulang lan nilai moral sing apik supaya bisa migunani kanggo wong liyane",
          "Aja srakah marang kasugihan llan kebak hawa nepsu"
        ],
        options_indonesian: [
          "Undangan kanggo sregep sinau supaya bisa entuk kesempatan dadi pimpinan",
          "Aja dadi bocak nakal",
          "Bocah kasebut kudu nduweni piwulang lan nilai moral sing apik supaya bisa migunani kanggo wong liyane",
          "Aja srakah marang kasugihan llan kebak hawa nepsu"
        ],
        correctAnswer: 3
      },
      {
        question_english: "“Pak Empong lera lero” ing cublak-cublak suweng tegese …",
        question_indonesian: "“Pak Empong lera lero” ing cublak-cublak suweng tegese …",
        options_english: [
          "Wong tuwa bingung",
          "Wong sing gila bondo",
          "Kebecikan",
          "Lagu dolanan bocah"
        ],
        options_indonesian: [
          "Wong tuwa bingung",
          "Wong sing gila bondo",
          "Kebecikan",
          "Lagu dolanan bocah"
        ],
        correctAnswer: 0
      },
      {
        question_english: "Adhedhasar crita, sapa sing kesed?",
        question_indonesian: "Adhedhasar crita, sapa sing kesed?",
        options_english: [
          "Ibu",
          "Menthog",
          "Dimas",
          "Esuk"
        ],
        options_indonesian: [
          "Ibu",
          "Menthog",
          "Dimas",
          "Esuk"
        ],
        correctAnswer: 2
      },
      {
        question_english: "Adhedhasar crita, saiki Dimas kelas pira?",
        question_indonesian: "Adhedhasar crita, saiki Dimas kelas pira?",
        options_english: [
          "Papat",
          "Telu",
          "Loro",
          "Siji"
        ],
        options_indonesian: [
          "Papat",
          "Telu",
          "Loro",
          "Siji"
        ],
        correctAnswer: 3
      },
      {
        question_english: "Tembang dolanan nduweni piwulang ngadohi watak kesed, kaya kewan menthog",
        question_indonesian: "Tembang dolanan nduweni piwulang ngadohi watak kesed, kaya kewan menthog",
        options_english: [
          "Menthog-menthog",
          "Kupu-kupu",
          "Kodhok ngorek",
          "Kidang"
        ],
        options_indonesian: [
          "Menthog-menthog",
          "Kupu-kupu",
          "Kodhok ngorek",
          "Kidang"
        ],
        correctAnswer: 0
      },
      {
        question_english: "“Siji Loro Telu” yaiku …",
        question_indonesian: "“Siji Loro Telu” yaiku …",
        options_english: [
          "Nyimak pitutur kanthi premati",
          "Jengenge wilangan kang kasebut kanthi runtut",
          "Diwenehi pitakonan",
          "Perangan awak kanggo nulis lan nyekel"
        ],
        options_indonesian: [
          "Nyimak pitutur kanthi premati",
          "Jengenge wilangan kang kasebut kanthi runtut",
          "Diwenehi pitakonan",
          "Perangan awak kanggo nulis lan nyekel"
        ],
        correctAnswer: 1
      },
      {
        question_english: "Tuladha tembang dolanan …",
        question_indonesian: "Tuladha tembang dolanan …",
        options_english: [
          "Kodhok ngorek",
          "Sinom",
          "Pangkur",
          "Pocung"
        ],
        options_indonesian: [
          "Kodhok ngorek",
          "Sinom",
          "Pangkur",
          "Pocung"
        ],
        correctAnswer: 0
      }     
    ],
  },
  {
    id: 3,
    title: "Budi Pekerti",
    description_english:
      "Learn about good manners and how to behave respectfully in Javanese culture.",
    description_indonesian:
      "Pelajari tata krama dan cara bersikap sopan dalam budaya Jawa.",
    order: 3,
    phases: [
      { id: 1, name_english: "Pretest", name_indonesian: "Pretest" },
      {
        id: 2,
        name_english: "Short Story (Cerkak)",
        name_indonesian: "Cerita Pendek (Cerkak)",
        pdf_file_english: "chapter-3-1-en.pdf",
        pdf_file_indonesian: "chapter-3-1-id.pdf",
      },
      {
        id: 3,
        name_english: "Story (Dongeng)",
        name_indonesian: "Cerita (Dongeng)",
        pdf_file_english: "chapter-3-2-en.pdf",
        pdf_file_indonesian: "chapter-3-2-id.pdf",
      },
      {
        id: 4,
        name_english: "Mouse Deer and Mr Farmer",
        name_indonesian: "Kancil dan Pak Petani",
        pdf_file_english: "chapter-3-3-en.pdf",
        pdf_file_indonesian: "chapter-3-3-id.pdf",
      },
      {
        id: 5,
        name_english: "Telling a Story",
        name_indonesian: "Menceritakan Cerita",
        pdf_file_english: "chapter-3-4-en.pdf",
        pdf_file_indonesian: "chapter-3-4-id.pdf",
      },
      { id: 6, name_english: "Posttest", name_indonesian: "Posttest" },
    ],
    questions: [
      {
        question_english: "Piwulang kang bisa dijupuk saka crita “Kancil lan Pak Tani” yaiku …",
        question_indonesian: "Piwulang kang bisa dijupuk saka crita “Kancil lan Pak Tani” yaiku …",
        options_english: [
          "Aja nyolong, kuwi ora becik",
          "Ngapusi wae marang wong tuwa",
          "Yen salah ora usa njaluk ngapura",
          "Aja tulung-tinulung marang sepadha"
        ],
        options_indonesian: [
          "Aja nyolong, kuwi ora becik",
          "Ngapusi wae marang wong tuwa",
          "Yen salah ora usa njaluk ngapura",
          "Aja tulung-tinulung marang sepadha"
        ],
        correctAnswer: 0
      },
      {
        question_english: "Ing dongeng “Kancil lan Pak Tani” apa sing dicolong kancil …",
        question_indonesian: "Ing dongeng “Kancil lan Pak Tani” apa sing dicolong kancil …",
        options_english: [
          "Nangka",
          "Godhong",
          "Jipang",
          "Timun"
        ],
        options_indonesian: [
          "Nangka",
          "Godhong",
          "Jipang",
          "Timun"
        ],
        correctAnswer: 3
      },
      {
        question_english: "Sapa wae paraga kang ana ing dongeng Kancil lan Pak Tani …",
        question_indonesian: "Sapa wae paraga kang ana ing dongeng Kancil lan Pak Tani …",
        options_english: [
          "Timun",
          "Kancil lan Pak Tani",
          "Wong awah",
          "Kancil, Timun, Pak Tani, lan Wong sawah"
        ],
        options_indonesian: [
          "Timun",
          "Kancil lan Pak Tani",
          "Wong awah",
          "Kancil, Timun, Pak Tani, lan Wong sawah"
        ],
        correctAnswer: 1
      },
      {
        question_english: "Klebu jinis dongeng apa dongeng Kancil lan Pak Tani kuwi …",
        question_indonesian: "Klebu jinis dongeng apa dongeng Kancil lan Pak Tani kuwi …",
        options_english: [
          "Legendha",
          "Mite",
          "Fabel",
          "Sage"
        ],
        options_indonesian: [
          "Legendha",
          "Mite",
          "Fabel",
          "Sage"
        ],
        correctAnswer: 2
      },
      {
        question_english: "Ndongeng nduweni tatacara …",
        question_indonesian: "Ndongeng nduweni tatacara …",
        options_english: [
          "Swarane cilik",
          "Swarane ora cetha",
          "Paham isine",
          "Maca"
        ],
        options_indonesian: [
          "Swarane cilik",
          "Swarane ora cetha",
          "Paham isine",
          "Maca"
        ],
        correctAnswer: 2
      },
      {
        question_english: "Ing dongeng “Yuyu lan Bango”, sing dicapit Yuyu yaiku …",
        question_indonesian: "Ing dongeng “Yuyu lan Bango”, sing dicapit Yuyu yaiku …",
        options_english: [
          "Iwak",
          "Kancil",
          "Pak Tani",
          "Bango"
        ],
        options_indonesian: [
          "Iwak",
          "Kancil",
          "Pak Tani",
          "Bango"
        ],
        correctAnswer: 3
      },
      {
        question_english: "Dongeng ngemot patuladhan supaya para siswa …",
        question_indonesian: "Dongeng ngemot patuladhan supaya para siswa …",
        options_english: [
          "Kuminter",
          "Nduweni Budi Pekerti",
          "Kesed",
          "Gumedhe"
        ],
        options_indonesian: [
          "Kuminter",
          "Nduweni Budi Pekerti",
          "Kesed",
          "Gumedhe"
        ],
        correctAnswer: 1
      },
      {
        question_english: "Dongeng yaiku crita rakyat sing isine ngayawara. Ngayawara tegese …",
        question_indonesian: "Dongeng yaiku crita rakyat sing isine ngayawara. Ngayawara tegese …",
        options_english: [
          "Pengalaman",
          "Saka angen-angen",
          "Kasunyatan",
          "Kabeh bener"
        ],
        options_indonesian: [
          "Pengalaman",
          "Saka angen-angen",
          "Kasunyatan",
          "Kabeh bener"
        ],
        correctAnswer: 1
      },
      {
        question_english: "Crita dongeng sumebar kanthi …",
        question_indonesian: "Crita dongeng sumebar kanthi …",
        options_english: [
          "Turun-tumurun",
          "Buku",
          "Naskah",
          "Warta"
        ],
        options_indonesian: [
          "Turun-tumurun",
          "Buku",
          "Naskah",
          "Warta"
        ],
        correctAnswer: 0
      },
      {
        question_english: "Sage iku crita kang ana sesambungane karo …",
        question_indonesian: "Sage iku crita kang ana sesambungane karo …",
        options_english: [
          "Alam Gaib",
          "Sejarah",
          "Dumadine panggonan",
          "Kewan"
        ],
        options_indonesian: [
          "Alam Gaib",
          "Sejarah",
          "Dumadine panggonan",
          "Kewan"
        ],
        correctAnswer: 0
      },
      {
        question_english: "Crita dongeng kuwi klebu kasusastran …",
        question_indonesian: "Crita dongeng kuwi klebu kasusastran …",
        options_english: [
          "Lawas",
          "Anyar",
          "Modern",
          "Kabeh bener"
        ],
        options_indonesian: [
          "Lawas",
          "Anyar",
          "Modern",
          "Kabeh bener"
        ],
        correctAnswer: 0
      },
      {
        question_english: "Asal-usul Rawa Pening iku klebu jinis dongeng …",
        question_indonesian: "Asal-usul Rawa Pening iku klebu jinis dongeng …",
        options_english: [
          "Legendha",
          "Mite",
          "Fabel",
          "Sage"
        ],
        options_indonesian: [
          "Legendha",
          "Mite",
          "Fabel",
          "Sage"
        ],
        correctAnswer: 0
      },
      {
        question_english: "Sapa sing dadi paraga ana ing dongen jinis fabel …",
        question_indonesian: "Sapa sing dadi paraga ana ing dongen jinis fabel …",
        options_english: [
          "Sultan",
          "Wong",
          "Kewan sing bisa guneman",
          "Dewa lan dewi"
        ],
        options_indonesian: [
          "Sultan",
          "Wong",
          "Kewan sing bisa guneman",
          "Dewa lan dewi"
        ],
        correctAnswer: 2
      },
      {
        question_english: "Dongeng asal-usuling panggonan/bendha kasebut …",
        question_indonesian: "Dongeng asal-usuling panggonan/bendha kasebut …",
        options_english: [
          "Legendha",
          "Mite",
          "Fabel",
          "Sage"
        ],
        options_indonesian: [
          "Legendha",
          "Mite",
          "Fabel",
          "Sage"
        ],
        correctAnswer: 0
      },
      {
        question_english: "Crita sing ana gegayutane karo sejarah kasebut …",
        question_indonesian: "Crita sing ana gegayutane karo sejarah kasebut …",
        options_english: [
          "Legendha",
          "Mite",
          "Fabel",
          "Sage"
        ],
        options_indonesian: [
          "Legendha",
          "Mite",
          "Fabel",
          "Sage"
        ],
        correctAnswer: 3
      }      
    ],
  },
  {
    id: 4,
    title: "Perangane Awak",
    description_english: "Learn the Javanese vocabulary related to body parts.",
    description_indonesian:
      "Pelajari kosakata bahasa Jawa tentang bagian tubuh.",
    order: 4,
    phases: [
      { id: 1, name_english: "Pretest", name_indonesian: "Pretest" },
      {
        id: 2,
        name_english: "Body Parts",
        name_indonesian: "Anggota Tubuh",
        pdf_file_english: "chapter-4-1-en.pdf",
        pdf_file_indonesian: "chapter-4-1-id.pdf",
      },
      {
        id: 3,
        name_english: "Body Parts Accessories",
        name_indonesian: "Aksesoris Anggota Tubuh",
        pdf_file_english: "chapter-4-2-en.pdf",
        pdf_file_indonesian: "chapter-4-2-id.pdf",
      },
      { id: 4, name_english: "Posttest", name_indonesian: "Posttest" },
    ],
    questions: [
      {
        question_english: "Tembung 'pipi kiwa' tegesé ...",
        question_indonesian: "Tembung 'pipi kiwa' tegesé ...",
        options_english: [
          "Right cheek",
          "Left cheek",
          "Left side of head",
          "Forehead",
        ],
        options_indonesian: [
          "Pipi kanan",
          "Pipi kiri",
          "Kepala bagian kiri",
          "Dahi",
        ],
        correctAnswer: 1,
      },
      {
        question_english: "Apa tegesé 'untu' ing basa Inggris?",
        question_indonesian: "Apa tegesé 'untu' ing basa Indonesia?",
        options_english: ["Tooth / Teeth", "Nose", "Ear", "Neck"],
        options_indonesian: ["Gigi", "Hidung", "Telinga", "Leher"],
        correctAnswer: 0,
      },
      {
        question_english: "Apa tegesé 'sirah'?",
        question_indonesian: "Apa tegesé 'sirah'?",
        options_english: ["Hand", "Eye", "Stomach", "Head"],
        options_indonesian: ["Tangan", "Mata", "Perut", "Kepala"],
        correctAnswer: 3,
      },
      {
        question_english: "Piranti 'topi' digunakake kanggo ...",
        question_indonesian: "Piranti 'topi' digunakake kanggo ...",
        options_english: [
          "Cover the head",
          "Cover the feet",
          "Style the hair",
          "Cover the hands",
        ],
        options_indonesian: [
          "Menutupi kaki",
          "Menutupi kepala",
          "Menata rambut",
          "Menutupi tangan",
        ],
        correctAnswer: 0,
      },
      {
        question_english: "Piranti apa sing digunakake kanggo ngresiki untu?",
        question_indonesian:
          "Piranti apa sing digunakake kanggo ngresiki untu?",
        options_english: ["Mask", "Helmet", "Toothbrush", "Gloves"],
        options_indonesian: ["Masker", "Helm", "Sikat gigi", "Sarung tangan"],
        correctAnswer: 2,
      },
      {
        question_english: "'Irung' iku bagian awak sing digunakake kanggo ...",
        question_indonesian:
          "'Irung' iku bagian awak sing digunakake kanggo ...",
        options_english: ["Hear", "Eat", "Breathe", "Walk"],
        options_indonesian: ["Mendengar", "Makan", "Bernapas", "Berjalan"],
        correctAnswer: 2,
      },
      {
        question_english: "Tembung 'mripat' ing basa Inggris tegesé ...",
        question_indonesian: "Tembung 'mripat' ing basa Indonesia tegesé ...",
        options_english: ["Ear", "Eye", "Leg", "Finger"],
        options_indonesian: ["Telinga", "Mata", "Kaki", "Jari"],
        correctAnswer: 1,
      },
      {
        question_english: "Kacamata digunakake kanggo nglindhungi ...",
        question_indonesian: "Kacamata digunakake kanggo nglindhungi ...",
        options_english: ["Head", "Ears", "Eyes", "Chest"],
        options_indonesian: ["Kepala", "Telinga", "Mata", "Dada"],
        correctAnswer: 2,
      },
      {
        question_english: "'Tutuk' iku tegesé ...",
        question_indonesian: "'Tutuk' iku tegesé ...",
        options_english: ["Nose", "Chin", "Mouth", "Head"],
        options_indonesian: ["Hidung", "Dagu", "Mulut", "Kepala"],
        correctAnswer: 2,
      },
      {
        question_english: "Sarung tangan digunakake kanggo ...",
        question_indonesian: "Sarung tangan digunakake kanggo ...",
        options_english: [
          "Cover the feet",
          "Cover the hands",
          "Cover the head",
          "Cover the nose",
        ],
        options_indonesian: [
          "Menutupi kaki",
          "Menutupi tangan",
          "Menutupi kepala",
          "Menutupi hidung",
        ],
        correctAnswer: 1,
      },
      {
        question_english: "'Gulu' tegesé apa ing basa Indonesia?",
        question_indonesian: "'Gulu' tegesé apa ing basa Indonesia?",
        options_english: ["Stomach", "Chest", "Head", "Neck"],
        options_indonesian: ["Perut", "Dada", "Kepala", "Leher"],
        correctAnswer: 3,
      },
      {
        question_english: "Sandhal digunakake kanggo njaga ...",
        question_indonesian: "Sandhal digunakake kanggo njaga ...",
        options_english: ["Hands", "Teeth", "Hair", "Feet"],
        options_indonesian: ["Tangan", "Gigi", "Rambut", "Kaki"],
        correctAnswer: 3,
      },
      {
        question_english: "Piranti 'jas udan' gunane kanggo ...",
        question_indonesian: "Piranti 'jas udan' gunane kanggo ...",
        options_english: [
          "Nata rambut",
          "Nglindhungi mripat",
          "Nglindhungi tangan",
          "Njaga awak supaya ora teles",
        ],
        options_indonesian: [
          "Nata rambut",
          "Nglindhungi mripat",
          "Nglindhungi tangan",
          "Njaga awak supaya ora teles",
        ],
        correctAnswer: 3,
      },
      {
        question_english: "Tembung 'weteng' tegesé ...",
        question_indonesian: "Tembung 'weteng' tegesé ...",
        options_english: ["Neck", "Stomach", "Hair", "Eye"],
        options_indonesian: ["Leher", "Perut", "Rambut", "Mata"],
        correctAnswer: 1,
      },
      {
        question_english: "'Jungkat' yaiku piranti kanggo ...",
        question_indonesian: "'Jungkat' yaiku piranti kanggo ...",
        options_english: [
          "Nata rambut",
          "Njaga sikil",
          "Nutupi irung",
          "Nglindhungi mripat",
        ],
        options_indonesian: [
          "Nata rambut",
          "Njaga sikil",
          "Nutupi irung",
          "Nglindhungi mripat",
        ],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 5,
    title: "Ndongeng Fabel",
    description_english: "Learn about Javanese fairy tales and storytelling.",
    description_indonesian:
      "Pelajari dongeng dan cara bercerita dalam bahasa Jawa.",
    order: 5,
    phases: [
      { id: 1, name_english: "Pretest", name_indonesian: "Pretest" },
      {
        id: 2,
        name_english: "Fable",
        name_indonesian: "Fabel",
        pdf_file_english: "chapter-5-1-en.pdf",
        pdf_file_indonesian: "chapter-5-1-id.pdf",
      },
      {
        id: 3,
        name_english: "Names of Animals",
        name_indonesian: "Nama-Nama Hewan",
        pdf_file_english: "chapter-5-2-en.pdf",
        pdf_file_indonesian: "chapter-5-2-id.pdf",
      },
      { id: 4, name_english: "Posttest", name_indonesian: "Posttest" },
    ],
    questions: [
      {
        question_english: "Apa tegese 'dongeng'?",
        question_indonesian: "Apa tegese 'dongeng'?",
        options_english: [
          "A real story that happens daily",
          "A historical story from the past",
          "A folktale with strange and impossible events",
          "A joke without meaning",
        ],
        options_indonesian: [
          "Cerita nyata yang terjadi sehari-hari",
          "Cerita sejarah dari masa lalu",
          "Cerita rakyat dengan kejadian aneh dan mustahil",
          "Lelucon tanpa makna",
        ],
        correctAnswer: 2,
      },
      {
        question_english: "Fabel iku jinis dongeng kang paragane ...",
        question_indonesian: "Fabel iku jinis dongeng kang paragane ...",
        options_english: [
          "Humans and gods",
          "Robots and machines",
          "Animals acting like humans",
          "Humans and spirits",
        ],
        options_indonesian: [
          "Manusia dan dewa",
          "Robot dan mesin",
          "Hewan yang berperilaku seperti manusia",
          "Manusia dan roh",
        ],
        correctAnswer: 2,
      },
      {
        question_english: "Tembung 'pitutur luhur' tegesé ...",
        question_indonesian: "Tembung 'pitutur luhur' tegesé ...",
        options_english: [
          "Useful moral advice",
          "Command to break rules",
          "Funny and entertaining story",
          "Foreign folktale",
        ],
        options_indonesian: [
          "Nasihat moral yang berguna",
          "Perintah untuk melanggar aturan",
          "Cerita lucu dan menghibur",
          "Cerita rakyat dari luar negeri",
        ],
        correctAnswer: 0,
      },
      {
        question_english: "Dongeng fabel asring migunani kanggo ...",
        question_indonesian: "Dongeng fabel asring migunani kanggo ...",
        options_english: [
          "Increasing pet population",
          "Adults who work",
          "Poetry competitions",
          "Children to learn lessons",
        ],
        options_indonesian: [
          "Menambah populasi hewan peliharaan",
          "Orang dewasa yang bekerja",
          "Kompetisi puisi",
          "Anak-anak agar belajar nilai kehidupan",
        ],
        correctAnswer: 3,
      },
      {
        question_english: "Paraga kewan ing fabel asring tumindak kaya ...",
        question_indonesian: "Paraga kewan ing fabel asring tumindak kaya ...",
        options_english: [
          "Ghosts and spirits",
          "Humans who can think and speak",
          "Automated robots",
          "Puppet characters",
        ],
        options_indonesian: [
          "Hantu dan roh",
          "Manusia yang bisa berpikir dan berbicara",
          "Robot otomatis",
          "Tokoh wayang",
        ],
        correctAnswer: 1,
      },
      {
        question_english: "Tembung 'kebo' tegesé ...",
        question_indonesian: "Tembung 'kebo' tegesé ...",
        options_english: ["Pig", "Buffalo", "Cat", "Elephant"],
        options_indonesian: ["Babi", "Kerbau", "Kucing", "Gajah"],
        correctAnswer: 1,
      },
      {
        question_english: "Tembung 'jerapah' iku kewan kang duwé ...",
        question_indonesian: "Tembung 'jerapah' iku kewan kang duwé ...",
        options_english: [
          "Loud voice and can fly",
          "Black and white striped skin",
          "Fins like a fish",
          "Long neck",
        ],
        options_indonesian: [
          "Suara keras dan bisa terbang",
          "Kulit belang hitam-putih",
          "Sirip seperti ikan",
          "Leher yang panjang",
        ],
        correctAnswer: 3,
      },
      {
        question_english: "Ing basa Jawa, 'sheep' iku ...",
        question_indonesian: "Ing basa Jawa, 'sheep' iku ...",
        options_english: ["Sheep", "Goat", "Cow", "Horse"],
        options_indonesian: ["Wedhus gembel", "Wedhus biasa", "Sapi", "Jaran"],
        correctAnswer: 0,
      },
      {
        question_english:
          "Hewan apa ing ngisor iki sing bisa urip ing banyu lan lemah?",
        question_indonesian:
          "Hewan apa ing ngisor iki sing bisa urip ing banyu lan lemah?",
        options_english: ["Elephant", "Frog", "Giraffe", "Lion"],
        options_indonesian: ["Gajah", "Kodok", "Jerapah", "Singa"],
        correctAnswer: 1,
      },
      {
        question_english: "Tembung 'itik' ing basa Indonesia tegesé ...",
        question_indonesian: "Tembung 'itik' ing basa Indonesia tegesé ...",
        options_english: ["Duck", "Chicken", "Bird", "Cow"],
        options_indonesian: ["Bebek", "Ayam", "Burung", "Sapi"],
        correctAnswer: 0,
      },
      {
        question_english: "Tembung 'gajah' tegesé ...",
        question_indonesian: "Tembung 'gajah' tegesé ...",
        options_english: ["Elephant", "Giraffe", "Tiger", "Buffalo"],
        options_indonesian: ["Gajah", "Jerapah", "Macan", "Kerbau"],
        correctAnswer: 0,
      },
      {
        question_english: "Tembung 'kodhok' tegesé ...",
        question_indonesian: "Tembung 'kodhok' tegesé ...",
        options_english: ["Rabbit", "Frog", "Deer", "Sheep"],
        options_indonesian: ["Kelinci", "Kodok", "Rusa", "Domba"],
        correctAnswer: 1,
      },
      {
        question_english: "Fabel iku dongeng sing tokoh-tokone ...",
        question_indonesian: "Fabel iku dongeng sing tokoh-tokone ...",
        options_english: ["Humans", "Aliens", "Animals", "Robots"],
        options_indonesian: ["Manusia", "Alien", "Hewan", "Robot"],
        correctAnswer: 2,
      },
      {
        question_english: "Tembung 'asu' tegesé ...",
        question_indonesian: "Tembung 'asu' tegesé ...",
        options_english: ["Cat", "Mouse", "Horse", "Dog"],
        options_indonesian: ["Kucing", "Tikus", "Kuda", "Anjing"],
        correctAnswer: 3,
      },
      {
        question_english: "Apa tegese 'pitik' ing basa Inggris?",
        question_indonesian: "Apa tegese 'pitik' ing basa Inggris?",
        options_english: ["Pig", "Duck", "Chicken", "Horse"],
        options_indonesian: ["Babi", "Bebek", "Ayam", "Kuda"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: 6,
    title: "Aksara Jawa",
    description_english: "Learn Javanese alphabets.",
    description_indonesian: "Mempelajari Aksara Jawa",
    order: 6,
    phases: [
      { id: 1, name_english: "Pretest", name_indonesian: "Pretest" },
      {
        id: 2,
        name_english: "Aksara Jawa",
        name_indonesian: "Aksara Jawa",
        pdf_file_english: "chapter-6-1-en.pdf",
        pdf_file_indonesian: "chapter-6-1-id.pdf",
      },
      {
        id: 3,
        name_english: "Bonus: Semarang Traditional Food",
        name_indonesian: "Bonus: Makanan Traditional Semarang",
        pdf_file_english: "chapter-6-2-en.pdf",
        pdf_file_indonesian: "chapter-6-2-id.pdf",
      },{
        id: 4,
        name_english: "Bonus: Semarang Travel Destinations",
        name_indonesian: "Bonus: Destinasi Wisata Semarang",
        pdf_file_english: "chapter-6-3-en.pdf",
        pdf_file_indonesian: "chapter-6-3-id.pdf",
      },{
        id: 5,
        name_english: "Bonus: Semarangan Language",
        name_indonesian: "Bonus: Bahasa Semarangan",
        pdf_file_english: "chapter-6-4-en.pdf",
        pdf_file_indonesian: "chapter-6-4-id.pdf",
      },{
        id: 6,
        name_english: "Bonus: Central Java Traditional House",
        name_indonesian: "Bonus: Rumah Traditional Jawa Tengah",
        pdf_file_english: "chapter-6-5-en.pdf",
        pdf_file_indonesian: "chapter-6-5-id.pdf",
      },{
        id: 7,
        name_english: "Bonus: Traditional Clothing",
        name_indonesian: "Bonus: Baju Traditional",
        pdf_file_english: "chapter-6-6-en.pdf",
        pdf_file_indonesian: "chapter-6-6-id.pdf",
      },
      { id: 8, name_english: "Posttest", name_indonesian: "Posttest" },
    ],
    questions: [
      {
        question_english: "ꦠꦸꦏꦸꦠꦲꦸꦧꦏ꧀ꦱꦺꦴꦩꦼꦚꦁꦱꦭꦠꦶꦒ Wacane aksara ing dhuwur yaiku …",
        question_indonesian: "ꦠꦸꦏꦸꦠꦲꦸꦧꦏ꧀ꦱꦺꦴꦩꦼꦚꦁꦱꦭꦠꦶꦒ Wacane aksara ing dhuwur yaiku …",
        options_english: [
          "Tuku tahu bakso menyang Semarang",
          "Tuku tahu bakso menyang Salatiga",
          "Tuku buku menyang Salatiga",
          "Tuku buku telu menyang Semarang"
        ],
        options_indonesian: [
          "Tuku tahu bakso menyang Semarang",
          "Tuku tahu bakso menyang Salatiga",
          "Tuku buku menyang Salatiga",
          "Tuku buku telu menyang Semarang"
        ],
        correctAnswer: 1
      },
      {
        question_english: "Unine aksara “ꦩ” yaiku …",
        question_indonesian: "Unine aksara “ꦩ” yaiku …",
        options_english: ["Ma", "Ga", "Ba", "Tha"],
        options_indonesian: ["Ma", "Ga", "Ba", "Tha"],
        correctAnswer: 0
      },
      {
        question_english: "Jeneng penemu Aksara Jawi yaiku …",
        question_indonesian: "Jeneng penemu Aksara Jawi yaiku …",
        options_english: ["Ajisaka", "Roro Jonggrang", "Timun Mas", "Dewi Persik"],
        options_indonesian: ["Ajisaka", "Roro Jonggrang", "Timun Mas", "Dewi Persik"],
        correctAnswer: 0
      },
      {
        question_english: "Jeneng abdi setiane Ajisaka yaikut …",
        question_indonesian: "Jeneng abdi setiane Ajisaka yaikut …",
        options_english: ["Rama lan Sinta", "Dewa", "Sembada lan Dora", "Sembadan lan Dara"],
        options_indonesian: ["Rama lan Sinta", "Dewa", "Sembada lan Dora", "Sembadan lan Dara"],
        correctAnswer: 2
      },
      {
        question_english: "“Gelas” migunake E …",
        question_indonesian: "“Gelas” migunake E …",
        options_english: ["Taling", "Taling tarung", "Suku", "Pepet"],
        options_indonesian: ["Taling", "Taling tarung", "Suku", "Pepet"],
        correctAnswer: 3
      },
      {
        question_english: "ꦲꦏ꧀ꦱꦫꦗꦮ macane …",
        question_indonesian: "ꦲꦏ꧀ꦱꦫꦗꦮ macane …",
        options_english: ["Aksara Jawa", "Ajisaka", "Hasin Kundang", "Aksesoris"],
        options_indonesian: ["Aksara Jawa", "Ajisaka", "Hasin Kundang", "Aksesoris"],
        correctAnswer: 0
      },
      {
        question_english: "ꦩꦔꦤ꧀ꦱꦼꦒꦺꦴ macane …",
        question_indonesian: "ꦩꦔꦤ꧀ꦱꦼꦒꦺꦴ macane …",
        options_english: ["Sego dadi bubur", "Mangan sego", "Masak lawuk", "Adus esuk"],
        options_indonesian: ["Sego dadi bubur", "Mangan sego", "Masak lawuk", "Adus esuk"],
        correctAnswer: 1
      },
      {
        question_english: "꧇꧒꧐꧒꧐꧇ macane yaiku …",
        question_indonesian: "꧇꧒꧐꧒꧐꧇ macane yaiku …",
        options_english: ["2019", "2017", "2020", "1010"],
        options_indonesian: ["2019", "2017", "2020", "1010"],
        correctAnswer: 2
      },
      {
        question_english: "ꦠꦸꦏꦸ macane …",
        question_indonesian: "ꦠꦸꦏꦸ macane …",
        options_english: ["Tuku", "Mangan", "Ngombe", "Buku"],
        options_indonesian: ["Tuku", "Mangan", "Ngombe", "Buku"],
        correctAnswer: 0
      },
      {
        question_english: "ꦧꦥꦏ꧀ macane …",
        question_indonesian: "ꦧꦥꦏ꧀ macane …",
        options_english: ["Bapak", "Ibu", "Simbah", "Mbakyu"],
        options_indonesian: ["Bapak", "Ibu", "Simbah", "Mbakyu"],
        correctAnswer: 0
      },
      {
        question_english: "ꦗꦺꦤꦺꦁ macane …",
        question_indonesian: "ꦗꦺꦤꦺꦁ macane …",
        options_english: ["Meneng", "Jenang", "Renang", "Jeneng"],
        options_indonesian: ["Meneng", "Jenang", "Renang", "Jeneng"],
        correctAnswer: 3
      },
      {
        question_english: "ꦏꦿꦠꦺꦴꦤ꧀ macane …",
        question_indonesian: "ꦏꦿꦠꦺꦴꦤ꧀ macane …",
        options_english: ["Kerdus", "Kraton", "Sikil", "Rambut"],
        options_indonesian: ["Kerdus", "Kraton", "Sikil", "Rambut"],
        correctAnswer: 1
      },
      {
        question_english: "Joglo salah sawijining …",
        question_indonesian: "Joglo salah sawijining …",
        options_english: ["Omah adat", "Baju adat", "Gamelan", "Sego"],
        options_indonesian: ["Omah adat", "Baju adat", "Gamelan", "Sego"],
        correctAnswer: 0
      },
      {
        question_english: "Hanacaraka tegese …",
        question_indonesian: "Hanacaraka tegese …",
        options_english: [
          "Ada utusan hidup",
          "Mereka berbeda pendapat",
          "Mereka berdua sama kuatnya",
          "Inilah mayat mereka"
        ],
        options_indonesian: [
          "Ada utusan hidup",
          "Mereka berbeda pendapat",
          "Mereka berdua sama kuatnya",
          "Inilah mayat mereka"
        ],
        correctAnswer: 0
      },
      {
        question_english: "Unine aksara “ꦲ” yaiku …",
        question_indonesian: "Unine aksara “ꦲ” yaiku …",
        options_english: ["Ma", "Ra", "Na", "Ha"],
        options_indonesian: ["Ma", "Ra", "Na", "Ha"],
        correctAnswer: 3
      }      
    ],
  },
];

export default chapters;
