// Smile cases (before/after). case-01 kept from the first set; 02–04 are the
// pairs added on 13 Nov (their BEFORE / AFTER labels and the logo were baked in
// on 16 Nov to match case-01). Titles and captions describe what the photos
// show; the procedure names still need the clinic's confirmation.
export const CASES = [
  {
    id: "01",
    title: "Повна реабілітація усмішки",
    caption: "Нова форма, колір і висота прикусу на обох щелепах — усмішка знову повна та рівна.",
  },
  {
    id: "02",
    title: "Гармонія форми",
    caption: "Вирівняли контури й пропорції передніх зубів — природний блиск без «штучної» білизни.",
  },
  {
    id: "03",
    title: "Оновлення реставрацій",
    caption: "Замість старих реставрацій — рівна лінія різців і тон, що пасує до обличчя.",
  },
  {
    id: "04",
    title: "Світла природна усмішка",
    caption: "Колір і форма в гармонії: рівний ряд і світлий відтінок, що виглядає по-справжньому.",
  },
  // Added 20 Nov from IMG_1430 (before) / IMG_1432 (after); before is aligned
  // onto the after photo so the slider lines up.
  {
    id: "05",
    title: "Рівний ряд і світлий тон",
    caption: "Вирівняли довжину й контури передніх зубів і висвітлили тон — лінія усмішки повторює лінію губ.",
  },
] as const;
