---
title: "Buzzword List DSA"
tags: [dsa, algorithms, data-structures]
date: 2026-04-03
description: "Common terms and concepts in data structures and algorithms."
weight: 1
---

# Buzzword List DSA: Istilah yang Sering Muncul di Problem Statement
Banyak orang stuck di soal DSA bukan karena algoritmanya susah, tapi karena salah baca instruksi. Satu kata kayak _"subsequence"_ vs _"subarray"_ atau _"strictly increasing"_ vs _"non-decreasing"_ bisa bikin solusi yang technically benar jadi salah jawaban.

Berikut word list yang sering muncul di problem statement, dikelompokkan per kategori biar gampang dicari pas lagi practice.

## 1. Bagian dari data (array, string, sequence)

| Wording | Arti | Penjelasan |
|---|---|---|
| Array | Array | List of elements yang diakses by index |
| Subarray | Sub-array | Bagian array yang **kontigu**. Dari `[1,2,3,4,5]`, `[2,3,4]` valid; `[1,3,5]` BUKAN subarray |
| Substring | Substring | Sama kayak subarray tapi untuk string. `"bcd"` substring dari `"abcde"`, `"ace"` enggak |
| Subsequence | Subsequence | Element yang muncul dengan urutan sama tapi nggak harus kontigu. Dari `[1,2,3,4,5]`, `[1,3,5]` valid subsequence |
| Contiguous | Berdekatan tanpa skip | Sinonim dengan subarray/substring — element-elementnya berdampingan |
| Non-contiguous | Boleh skip | Element bisa diambil dengan melompat-lompat |
| Adjacent | Bersebelahan langsung | Index `i` dan `i+1`, atau cell yang berbagi sisi di grid |
| Consecutive | Berurutan secara nilai/posisi | "Three consecutive integers" = 3 angka berurutan kayak 7,8,9 |
| Prefix | Awalan | Dari awal array sampai index tertentu |
| Suffix | Akhiran | Dari index tertentu sampai akhir array |
| Range / Interval | Rentang `[l, r]` | Bagian array dari index `l` sampai `r` |
| Window | Jendela geser | Subarray ukuran tertentu yang "geser" sepanjang array (sliding window) |

## 2. Sifat angka & urutan

| Wording | Arti | Penjelasan |
|---|---|---|
| Distinct | Berbeda satu sama lain | Semua nilai unik. `[1,2,3]` distinct, `[1,2,2]` enggak |
| Unique | Unik | Sama dengan distinct, sering dipakai bergantian |
| Duplicate | Duplikat / kembar | Element yang muncul lebih dari sekali |
| Sorted | Sudah terurut | Default ascending kalau nggak disebut |
| Ascending | Naik | Dari kecil ke besar |
| Descending | Turun | Dari besar ke kecil |
| Non-decreasing | Nggak turun | Boleh sama atau naik. `[1,2,2,3]` non-decreasing tapi BUKAN strictly increasing |
| Non-increasing | Nggak naik | Boleh sama atau turun |
| Strictly increasing | Naik tegas | Selalu naik, nggak boleh ada yang sama |
| Strictly decreasing | Turun tegas | Selalu turun |
| Monotonic | Monoton | Salah satu dari naik atau turun konsisten |
| Non-negative | Nggak negatif | ≥ 0 (termasuk 0) |
| Positive | Positif | > 0 (TIDAK termasuk 0) — hati-hati di sini |
| Even / Odd | Genap / Ganjil | Even bisa dibagi 2 |
| Pair | Pasangan | Dua element. Cek soalnya: `(i,j)` dan `(j,i)` dihitung sama atau beda? |

## 3. Kuantifier & batasan

| Wording | Arti | Penjelasan |
|---|---|---|
| At most | Maksimal (≤) | "At most k operations" = nggak lebih dari k |
| At least | Minimal (≥) | "At least k" = paling sedikit k |
| Exactly | Tepat | Tepat segini, nggak lebih nggak kurang |
| Up to | Sampai dengan | Sama dengan "at most" |
| No more than | Tidak lebih dari | Sama dengan "at most" |
| At least once | Minimal sekali | Boleh berkali-kali, asal nggak nol |
| In any order | Urutan bebas | Output urutan terserah, asal isinya benar |
| Lexicographically smallest | Terkecil secara lexicographic | Diurutkan kayak kamus. `"abc" < "abd" < "b"` |
| 0-indexed | Index mulai dari 0 | Default LeetCode |
| 1-indexed | Index mulai dari 1 | Sering muncul di soal yang bilang "the i-th element" |
| Inclusive | Termasuk | `[l, r]` inclusive = both `l` dan `r` masuk |
| Exclusive | Tidak termasuk | `[l, r)` = `l` masuk, `r` enggak |

## 4. Operasi & instruksi

| Wording | Arti | Penjelasan |
|---|---|---|
| In-place | Ubah langsung di tempat | Modify input array directly, jangan bikin array baru. Biasanya sekalian minta O(1) extra space |
| Return | Kembalikan | Pakai keyword `return`. JANGAN print ke stdout |
| Modify | Ubah | Ubah nilai/struktur langsung |
| Swap | Tukar | Tukar dua element |
| Rearrange / Reorder | Susun ulang | Ubah urutan element |
| Reverse | Balik | Urutan dari belakang ke depan |
| Rotate | Putar | Geser element, yang keluar dari satu ujung masuk lagi di ujung lain |
| Append | Tambahkan di belakang | Push ke akhir |
| Insert | Sisipkan | Masukkan di posisi tertentu |
| Remove / Delete | Hapus | Buang element dari struktur |
| Traverse | Lewati / kunjungi | Datangi tiap element/node satu per satu |
| Partition | Pisahkan jadi bagian | Bagi data jadi beberapa bagian dengan kriteria |
| Merge | Gabungkan | Satukan dua struktur jadi satu |
| Encode / Decode | Enkode / Dekode | Ubah ke representasi lain dan baliknya |

## 5. Frasa standar yang sering muncul

| Wording | Arti | Penjelasan |
|---|---|---|
| You may assume that... | Kamu boleh anggap bahwa... | Asumsi yang nggak perlu kamu validasi. Hemat code |
| It is guaranteed that... | Dijamin bahwa... | Sama kayak "you may assume" |
| Such that | Sedemikian rupa sehingga | Penghubung kondisi. "Find x such that f(x) = 0" = cari x yang bikin f(x) = 0 |
| If no such X exists | Jika X yang dimaksud nggak ada | Biasanya diikuti instruksi return -1 atau empty |
| Return any valid X | Kembalikan X mana saja yang valid | Boleh ada banyak jawaban, satu aja cukup |
| Return all possible X | Kembalikan semua X yang mungkin | Harus enumerate semua kemungkinan |
| Without using X | Tanpa menggunakan X | Constraint operasi. Misal "without using division" |
| Note that | Perhatikan bahwa | Detail penting yang gampang ke-skip — selalu baca |
| Follow-up | Pertanyaan lanjutan | Variasi soal yang minta optimasi lebih |
| Constraints | Batasan | Section paling penting — nentuin kompleksitas yang harus kamu target |
| Modulo 10⁹ + 7 | Modulo 10⁹ + 7 | Karena hasilnya bisa kebesaran, return `answer % (10**9 + 7)`. Ciri khas problem DP/kombinatorik |
| Valid | Sah / memenuhi syarat | "Valid parentheses" = parentheses-nya tertutup dengan benar |

## 6. Tree & graph

| Wording | Arti | Penjelasan |
|---|---|---|
| Node | Simpul | Unit data dalam tree/graph |
| Edge | Sisi penghubung | Penghubung antara dua node |
| Vertex / Vertices | Titik (jamak: vertices) | Nama lain dari node, biasanya untuk graph |
| Root | Akar | Node paling atas dalam tree |
| Leaf | Daun | Node yang nggak punya child |
| Parent / Child | Induk / Anak | Hubungan langsung antar node |
| Ancestor | Leluhur | Node mana saja di atas dalam jalur ke root |
| Descendant | Keturunan | Node mana saja di bawah |
| Sibling | Saudara | Node yang punya parent sama |
| Depth | Kedalaman | Jarak dari root ke node tersebut |
| Height | Tinggi | Jarak dari node ke leaf terjauh |
| Subtree | Sub-tree | Tree kecil yang root-nya adalah suatu node |
| BST | Binary Search Tree | Tree dengan property: kiri < root < kanan |
| Preorder / Inorder / Postorder | Urutan traversal tree | Root-Left-Right / Left-Root-Right / Left-Right-Root |
| Level-order / BFS | Per level | Traversal level demi level pakai queue |
| Connected | Terhubung | Antar node bisa dijangkau lewat edge |
| Cycle | Siklus | Path yang balik ke node awalnya |
| Directed / Undirected | Berarah / Tak berarah | Edge punya arah atau dua arah |
| Weighted | Berbobot | Tiap edge punya nilai (cost/distance) |
| Path | Jalur | Urutan node yang dilewati lewat edge |
| Neighbor | Tetangga | Node yang langsung terhubung lewat satu edge |

## 7. Grid & matrix

| Wording | Arti | Penjelasan |
|---|---|---|
| Matrix / Grid | Matriks / Grid | 2D array. `m × n` artinya m baris, n kolom |
| Row / Column | Baris / Kolom | `matrix[row][col]` — row dulu, baru column |
| Cell | Sel | Satu posisi di grid, alamatnya `(row, col)` |
| 4-directional | 4 arah | Atas/bawah/kiri/kanan saja, nggak diagonal |
| 8-directional | 8 arah | Termasuk diagonal |
| Boundary / Border | Tepi grid | Cell yang ada di pinggir matrix |
| Out of bounds | Di luar batas | Index yang nggak valid (negatif atau ≥ ukuran) |

## 8. Kompleksitas

| Wording | Arti | Penjelasan |
|---|---|---|
| Time complexity | Kompleksitas waktu | Berapa cepat algoritma terhadap ukuran input |
| Space complexity | Kompleksitas ruang | Berapa banyak memory yang dipakai |
| Auxiliary space | Memory tambahan | Memory di luar input. "O(1) auxiliary space" = nggak boleh array baru ukuran n |
| Linear | Linear | O(n) |
| Logarithmic | Logaritmik | O(log n) |
| Constant | Konstan | O(1) |
| Quadratic | Kuadratik | O(n²) |
| Exponential | Eksponensial | O(2ⁿ) atau lebih |

---

## Tiga distinction yang paling sering bikin ke-trap

**Subarray vs subsequence.** Paling fatal kalau salah baca. Subarray harus kontigu, subsequence boleh skip. Kalau soalnya bilang "longest increasing subsequence" terus kamu kerjain dengan asumsi kontigu, jawaban kamu salah.

**Strictly increasing vs non-decreasing.** Soal kayak "Longest Increasing Subsequence" di LeetCode pakai strictly increasing (nggak boleh sama), sementara variant lain pakai non-decreasing (boleh sama). Ini kadang nentuin algoritma yang berbeda.

**At most k vs exactly k.** Ini sering muncul di soal sliding window. "At most k distinct characters" lebih gampang dari "exactly k distinct characters" — pendekatan teknisnya beda.

---

## Penutup

Saran praktisnya: tiap kali buka soal baru, scan keyword di problem statement dan match ke list ini. Lama-lama kamu hapal sendiri, dan kecepatan baca soal naik drastis — yang langsung berdampak ke jumlah problem yang bisa kamu solve per sesi practice.