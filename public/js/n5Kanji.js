function KanjiBox(ka, k, o, km, ex) {
  this.kanji = ka,
  this.kun = k,
  this.on = o,
  this.meaning = km,
  this.examples = ex
}

let n5ex1 = [
  ['日', 'にち', 'sun'],
  ['日曜日', 'にちようび', 'Sunday'],
  ['今日', 'きょう', 'today'],
  ['暑い日', 'あついひ', 'a hot day'],
  ['休日', 'きゅうじつ', 'holiday'],
  ['日米', 'にちべい', 'Japan and USA'],
  ['十日間', 'とおかかん', 'ten days'],
  ['明日', 'あした', 'tomorrow']
];
let n5k1 = new KanjiBox('日', 'ひ, か', 'にち, ずつ', 'sun', n5ex1);

let n5ex2 = [
  ['月', 'つき', 'moon, month'],
  ['月曜日', 'げつようび', 'Monday'],
  ['一月', 'いちがつ', 'January'],
  ['一月', 'ひとつき', 'one month'],
  ['今月', 'こんげつ', 'this month'],
  ['月見', 'つきみ', 'moon viewing'],
  ['正月', 'しょうがつ', 'New Years']
];
let n5k2 = new KanjiBox('月', 'つき', 'げつ, がつ', 'moon', n5ex2);

let n5ex3 = [
  ['火', 'ひ', 'fire'],
  ['火曜日', 'かようび', 'Tuesday'],
  ['火災', 'かさい', 'a fire'],
  ['火力', 'かりょうく', 'heat'],
  ['消火', 'しょうか', 'fire extinguishing'],
  ['火山', 'かざん', 'volcano'],
  ['防火訓練', 'ぼうかくんれん', 'a fire drill']
];
let n5k3 = new KanjiBox('火', 'ひ, ほ', 'か', 'fire', n5ex3);

let n5ex4 = [
  ['水', 'みず', 'water'],
  ['水曜日', 'すいようび', 'Wednesday'],
  ['水道', 'すいどう', 'water supply'],
  ['防水', 'ぼうすい', 'waterproof'],
  ['水色', 'みずいろ', 'light blue'],
  ['水平', 'すいへい', 'horizontal'],
  ['水位', 'すいい', 'water level']
];
let n5k4 = new KanjiBox('水', 'みず', 'すい', 'water', n5ex4);

let n5ex5 = [
  ['木', 'き', 'tree'],
  ['木刀', 'ぼくとう', 'wooden sword'],
  ['木材', 'もくざい', 'wood'],
  ['植木', 'うえき', 'potted plant'],
  ['木曜日', 'もくようび', 'Thursday'],
  ['木陰', 'こかげ', 'shade of a tree']
];
let n5k5 = new KanjiBox('木', 'き, こ', 'ぼく, もく', 'tree', n5ex5);

let n5ex6 = [
  ['金', 'きん', 'gold'],
  ['お金', 'おかね', 'money'],
  ['金曜日', 'きんようび', 'Friday'],
  ['金額', 'きんがく', 'sum of money'],
  ['黄金', 'おうごん', 'gold'],
  ['料金', 'りょうきん', 'rate, fare'],
  ['金具', 'かねぐ', 'metal fittings']
];
let n5k6 = new KanjiBox('金', 'かね, かな', 'きん, こん', 'money', n5ex6);

let n5ex7 = [
  ['土', 'つち', 'soil, dirt'],
  ['土地', 'とち', 'land'],
  ['粘土', 'ねんど', 'clay'],
  ['土台', 'どだい', 'foundation'],
  ['土曜日', 'どようび', 'Saturday'],
  ['赤土', 'あかつち', 'red soil']
];
let n5k7 = new KanjiBox('土', 'つち', 'ど, と', 'soil', n5ex7);

let n5ex8 = [
  ['一', 'いち', 'one'],
  ['一番', 'いちばん', 'first'],
  ['一月', 'いちがつ', 'January'],
  ['一回', 'いっかい', 'once'],
  ['一人', 'ひとり', 'one person'],
  ['統一', 'とういつ', 'unity'],
  ['一つ', 'ひとつ', 'one thing']
];
let n5k8 = new KanjiBox('一', 'ひと', 'いち, いつ', 'one', n5ex8);

let n5ex9 = [
  ['二', 'に', 'two'],
  ['二番', 'にばん', 'second'],
  ['二月', 'にがつ', 'February'],
  ['二つ', 'ふたつ', 'two things'],
  ['二人', 'ふたり', 'two people'],
  ['二重', 'にじゅう', 'double'],
  ['二次元', 'にじげん', 'two dimensions']
]
let n5k9 = new KanjiBox('二', 'ふた', 'に', 'two', n5ex9);

let n5ex10 = [
  ['三', 'さん', 'three'],
  ['三番', 'さんばん', 'third'],
  ['三月', 'さんがつ', 'March'],
  ['三日月', 'みかづき', 'crescent moon'],
  ['三つ', 'みっつ', 'three things'],
  ['さ人', 'さんにん', 'three people'],
  ['三角形', 'さんかくけい', 'triangle'],
  ['三次元', 'さんじげん', 'three dimensions']
]
let n5k10 = new KanjiBox('三', 'み, みっ', 'さん', 'three', n5ex10);

let n5ex11 = [
  ['四', 'し', 'four'],
  ['四人', 'しにん', 'four people'],
  ['四月', 'しがつ', 'April'],
  ['四番', 'よんばん', 'fourth'],
  ['四年', 'よねん', 'four years'],
  ['四輪', 'よんりん', 'four wheels'],
  ['四角形', 'しかくけい', 'quadrangle'],
  ['四つ', 'よっつ', 'four things']

];
let n5k11 = new KanjiBox('四', 'よ, よん', 'し', 'four', n5ex11);

let n5ex12 = [
  ['五', 'ご', 'five'],
  ['五人', 'ごにん', 'five people'],
  ['五月', 'ごがつ', 'May'],
  ['五番', 'ごばん', 'fifth'],
  ['五日間', 'いつかかん', 'five days'],
  ['五輪', 'ごりん', 'the Olympics'],
  ['五角形', 'ごかくけい', 'pentagon'],
  ['五つ', 'いつつ', 'five']
];
let n5k12 = new KanjiBox('五', 'いつ', 'ご', 'five', n5ex12);

let n5ex13 = [
  ['六', 'ろく', 'six'],
  ['六人', 'ろくにん', 'six people'],
  ['六月', 'ろくがつ', 'June'],
  ['六番', 'ろくばん', 'sixth'],
  ['六日間', 'むいかかん', 'six days'],
  ['双六', 'すごろく', 'JApanese backgammon'],
  ['六角形', 'ろっかくけい', 'hexagon'],
  ['六つ', 'むっつ', 'six']
];
let n5k13 = new KanjiBox('六', 'む, むい', 'ろく', 'six', n5ex13);

let n5ex14 = [
  ['七', 'なな', 'seven'],
  ['七人', 'しちにん', 'seven people'],
  ['七月', 'しちがつ', 'July'],
  ['七番', 'ななばん', 'seventh'],
  ['七日間', 'なのかかん', 'seven days'],
  ['七面鳥', 'しちめんちょう', 'turkey'],
  ['北斗七星', 'ほくとしちせい', 'the Big Dipper'],
  ['七つ', 'ななつ', 'seven']
];
let n5k14 = new KanjiBox('七', 'なな, なの', 'しち', 'seven', n5ex14);

let n5ex15 = [
  ['八', 'はち', 'eight'],
  ['八人', 'はちにん', 'eight people'],
  ['八月', 'はちがつ', 'August'],
  ['八番', 'はちばん', 'eighth'],
  ['八日間', 'ようかかん', 'eight days'],
  ['八角形', 'はっかくけい', 'octagon'],
  ['八百屋', 'やおや', 'greengrocer'],
  ['八つ', 'はっつ', 'eight']
];
let n5k15 = new KanjiBox('八', 'や, よう', 'はち', 'eight', n5ex15);

let n5ex16 = [
  ['九', 'きゅう', 'nine'],
  ['九人', 'きゅうにん', 'nine people'],
  ['九月', 'くがつ', 'September'],
  ['九番', 'きゅうばん', 'ninth'],
  ['九日間', 'ここのかかん', 'nine days'],
  ['九州', 'きゅうしゅう', 'Kyushu'],
  ['九つ', 'ここのつ', 'nine']
];
let n5k16 = new KanjiBox('九', 'ここの', 'きゅう, く', 'nine', n5ex16);

let n5ex17 = [
  ['十', 'じゅう', 'ten'],
  ['十人', 'じゅうり', 'ten people'],
  ['十月', 'じゅうがつ', 'October'],
  ['十日間', 'とうかかん', 'ten days'],
  ['十円玉', 'じゅうえんだま', 'ten yen coin'],
  ['十五夜', 'じゅうごや', 'a full moon night'],
  ['十分', 'じゅうぶん', 'enough']
];
let n5k17 = new KanjiBox('十', 'とお, と', 'じゅう', 'ten', n5ex17);

let n5ex18 = [
  ['百', 'ひゃく', 'hundred'],
  ['二百', 'にひゃく', 'two hundred'],
  ['百円玉', 'ひゃくえんだま', 'hundred yen coin'],
  ['百円ショップ', 'ひゃくえんしょっぷ', '100 yen shop'],
  ['百科事典', 'ひゃっかじてん', 'encyclopedia'],
  ['百貨店', 'ひゃっかてん', 'department store']
];
let n5k18 = new KanjiBox('百', '', 'ひゃく', 'hundred', n5ex18);

let n5ex19 = [
  ['千', 'せん', 'thousand'],
  ['千円', 'せんえん', 'thousand yen'],
  ['三千', 'さんぜん', 'three thousand'],
  ['千代紙', 'ちよがみ', 'Japanese patterned paper']
];
let n5k19 = new KanjiBox('千', 'ち', 'せん', 'thousand', n5ex19);

let n5ex20 = [
  ['手', 'て', 'hand'],
  ['握手', 'あくしゅ', 'handshake'],
  ['手袋', 'てぶくろ', 'glove'],
  ['手綱', 'たづな', 'reins'],
  ['手術', 'しゅじゅつ', 'surgery, operations'],
  ['手紙', 'てがみ', 'letter'],
  ['手段', 'しゅだん', 'means']
];
let n5k20 = new KanjiBox('手', 'て, た', 'しゅ', 'hand', n5ex20);

let n5ex21 = [
  ['足', 'あし', 'foot'],
  ['脚', 'あし', 'leg'],
  ['足す', 'たす', 'to add'],
  ['一足', 'いっそく', 'pair of shoes'],
  ['足首', '足首', 'wrist'],
  ['足し算', 'たしざん', 'addition'],
  ['足場', 'あしば', 'scaffold, foothold'],
  ['補足', 'ほそく', 'supplement'],
  ['満足', 'まんぞく', 'satisfied, contented']
];
let n5k21 = new KanjiBox('足', 'あし, た', 'そく', 'hand', n5ex21);

let n5ex22 = [
  ['目', 'め', 'eye'],
  ['目薬', 'めぐすり', 'eye drops'],
  ['目的', 'もくてき', 'purpose'],
  ['役目', 'やくめ', 'job, role'],
  ['目標', 'もくひょう', 'goal'],
  ['科目', 'かもく', 'subject']
];
let n5k22 = new KanjiBox('目', 'め, ま', 'もく, ぼく', 'eye', n5ex22);

let n5ex23 = [
  ['耳', 'みみ', 'ear'],
  ['右耳', 'みぎみみ', 'right ear'],
  ['耳元', 'みみもと', "one's ear"],
  ['耳栓', 'みみせん', 'earplug'],
  ['中耳炎', 'ちゅうじえん', 'otitis media']
];
let n5k23 = new KanjiBox('耳', 'みみ', 'じ', 'ear', n5ex23);

let n5ex24 = [
  ['口', 'くち', 'mouth'],
  ['人口', 'じんこう', 'population'],
  ['口調', 'くちょう', 'tone of voice'],
  ['口紅', 'くちべに', 'lipstick'],
  ['口論', 'こうろん', 'argument'],
  ['非常口', 'ひじょうぐち', 'emergency exit']
];
let n5k24 = new KanjiBox('口', 'くち', 'こう, く', 'mouth', n5ex24);

let n5ex25 = [
  ['林', 'はやし', 'woods'],
  ['林道', 'りんどう', 'forest road'],
  ['植林', 'しょくりん', 'afforestation'],
  ['杉林', 'すぎばやし', 'Japanese cedar forest'],
  ['林間学校', 'りんかんがっこう', 'open air school']
];
let n5k25 = new KanjiBox('林', 'はやし', 'りん', 'woods', n5ex25);

let n5ex26 = [
  ['森', 'もり', 'forest'],
  ['森林', 'しんりん', 'big forest'],
  ['青森市', 'あおもりし', 'Aomori city']
];
let n5k26 = new KanjiBox('森', 'もり', 'しん', 'forest', n5ex26);

let n5ex27 = [
  ['天', 'あめ', 'space'],
  ['天気', 'てんき', 'weather'],
  ['天井', 'てんじょう', 'ceiling'],
  ['天の川', 'あまのがわ', 'the Milky Way'],
  ['天使', 'てんし', 'angel'],
  ['天才', 'てんさい', 'genius']
];
let n5k27 = new KanjiBox('天', 'あめ, あま', 'てん', 'space', n5ex27);

let n5ex28 = [
  ['気', 'き', 'air'],
  ['気温', 'きおん', 'temperature'],
  ['気分', 'きぶん', 'mood'],
  ['気配', 'けはい', 'sign'],
  ['空気', 'くうき', 'air']
];
let n5k28 = new KanjiBox('気', '', 'き, け', 'air', n5ex28);

let n5ex29 = [
  ['空', 'そら', 'sky'],
  ['空く', 'あく', 'empty'],
  ['空港', 'くうこう', 'airport'],
  ['夜空', 'よぞら', 'night sky'],
  ['空手', 'からて', 'karate'],
  ['空き家', 'あきや', 'vacant house']
];
let n5k29 = new KanjiBox('空', 'そら, あ', 'くう', 'sky', n5ex29);

let n5ex30 = [
  ['夕', 'ゆう', 'evening'],
  ['一朝一夕', 'いっちょういっせき', 'in a short time'],
  ['夕方', 'ゆうがた', 'evening'],
  ['夕食', 'ゆうしょく', 'supper'],
  ['夕日', 'ゆうひ', 'setting sun']
];
let n5k30 = new KanjiBox('夕', 'ゆう', 'せき', 'evening', n5ex30);

let n5ex31 = [
  ['石', 'いし', 'stone'],
  ['石油', 'せきゆ', 'oil'],
  ['磁石', 'じしゃく', 'magnet'],
  ['宝石', 'ほうせき', 'jewel'],
  ['石畳', 'いしだたみ', 'stone pavement']
];
let n5k31 = new KanjiBox('石', 'いし', 'せき, しゃく, こく', 'stone', n5ex31);

let n5ex32 = [
  ['貝', 'かい', 'shellfish'],
  ['貝殻', 'かいがら', 'shell'],
  ['帆立貝', 'ほたてがい', 'scallop'],
  ['二枚貝', 'にまいがい', 'clam'],
  ['貝柱', 'かいばしら', 'adductor muscle']
];
let n5k32 = new KanjiBox('貝', 'かい', '', 'shellfish', n5ex32);

let n5ex33 = [
  ['草', 'くさ', 'grass'],
  ['野草', 'やそう', 'wild grass'],
  ['海草', 'かいそう', 'seagrass'],
  ['草原', 'そうげん', 'grassland'],
  ['牧草', 'ぼくそう', 'pasture, grass']
];
let n5k33 = new KanjiBox('草', 'くさ', 'そう', 'grass', n5ex33);

let n5ex34 = [
  ['花', 'はな', 'flower'],
  ['花壇', 'かだん', 'flower bed'],
  ['花束', 'はなたば', 'bouquet'],
  ['花火', 'はなび', 'fireworks'],
  ['花嫁', 'はなよめ', 'bride']
];
let n5k34 = new KanjiBox('花', 'はな', 'か', 'flower', n5ex34);

let n5ex35 = [
  ['竹', 'たけ', 'bamboo'],
  ['竹林', 'ちくりん', 'bamboo grove'],
  ['竹馬', 'たけうま', 'bamboo stilts'],
  ['竹垣', 'たけがき', 'bamboo fence'],
  ['竹の子', 'たけのこ', 'bamboo shoes']
];
let n5k35 = new KanjiBox('竹', 'たけ', 'ちく', 'bamboo', n5ex35);

let n5ex36 = [
  ['山', 'やま', 'mountain'],
  ['富士山', 'ふじさん', 'Mt. Fuji'],
  ['登山', 'とざん', 'climbing'],
  ['山火事', 'やまかじ', 'forest fire'],
  ['火山', 'かざん', 'volcano'],
  ['高山', 'こうざん', 'high mountain']
];
let n5k36 = new KanjiBox('山', 'やま', 'せん', 'mountain', n5ex36);

let n5ex37 = [
  ['川', 'かわ', 'river'],
  ['河川', 'かせん', 'river'],
  ['川辺', 'かわべ', 'riverside'],
  ['川上', 'かわかみ', "a river's upper reaches"],
  ['小川', 'おがわ', 'stream, creak'],
  ['川岸', 'かわぎし', 'riverbank']
];
let n5k37 = new KanjiBox('川', 'かわ', 'せん', 'river', n5ex37);

let n5ex38 = [
  ['雨', 'あめ', 'rain'],
  ['雷雨', 'らいう', 'thunderstorm'],
  ['長雨', 'ながあめ', 'long rain'],
  ['雨具', 'あまぐ', 'rain gear'],
  ['雨量', 'うりょう', 'rainfall'],
  ['豪雨', 'ごうう', 'heavy rain'],
  ['雨水', 'あまみず', 'rainwater']
];
let n5k38 = new KanjiBox('雨', 'あめ, あま', 'う', 'rain', n5ex38);

let n5ex39 = [
  ['田', 'た', 'paddy'],
  ['水田', 'すいでん', 'rice paddy'],
  ['田畑', 'たはた', 'field, farmland'],
  ['油田', 'ゆでん', 'oil field'],
  ['田園', 'でんえん', 'the countryside'],
  ['田植え', 'たうえ', 'rice planting']
];
let n5k39 = new KanjiBox('田', 'た', 'でん', 'rice field', n5ex39);

let n5ex40 = [
  ['虫', 'むし', 'bug'],
  ['昆虫', 'こんちゅう', 'insect'],
  ['毛虫', 'けむし', 'hairy caterpillar'],
  ['虫歯', 'むしば', 'bad tooth'],
  ['弱虫', 'よわむし', 'wimp, coward'],
  ['殺虫剤', 'さっちゅうざい', 'insecticide']
];
let n5k40 = new KanjiBox('虫', 'むし', 'ちゅう', 'bug', n5ex40);

let n5ex41 = [
  ['犬', 'いぬ', 'dog'],
  ['愛犬', 'あいけん', 'pet dog'],
  ['番犬', 'ばんけん', 'guard dog'],
  ['猟犬', 'りょうけん', 'hound'],
  ['野良犬', 'のらいぬ', 'stray dog'],
  ['犬小屋', 'いぬごや', 'doghouse']
];
let n5k41 = new KanjiBox('犬', 'いぬ', 'けん', 'dog', n5ex41);

let n5ex42 = [
  ['音', 'おと', 'sound'],
  ['音楽', 'おんがく', 'music'],
  ['足音', 'あしおと', 'footstep'],
  ['音色', 'ねいろ', 'tone'],
  ['騒音', 'そうおん', 'noise'],
  ['子音', 'しいん', 'consonant']
];
let n5k42 = new KanjiBox('音', 'おと, ね', 'おん, いん', 'sound', n5ex42);

let n5ex43 = [
  ['本', 'ほん', 'book'],
  ['本屋', 'ほんや', 'bookstore'],
  ['本音', 'ほんね', 'real feelings'],
  ['熊本市', 'くまもとし', 'Kumamoto City'],
  ['基本', 'きほん', 'basis, basics'],
  ['資本', 'しほん', 'capital']
];
let n5k43 = new KanjiBox('本', 'もと', 'ほん', 'book', n5ex43);

let n5ex44 = [
  ['男', 'おとこ', 'male'],
  ['男性', 'だんせい', 'man'],
  ['長男', 'ちょうなん', 'the eldest son'],
  ['男女', 'だんじょ', 'men and women'],
  ['男前', 'おとこまえ', 'handsome man']
];
let n5k44 = new KanjiBox('男', 'おとこ', 'だん, なん', 'man', n5ex44);

let n5ex45 = [
  ['女', 'おんな', 'female'],
  ['女性', 'じょせい', 'woman'],
  ['乙女', 'おとめ', 'young girl'],
  ['少女', 'しょうじょ', 'girl'],
  ['女神', 'めがみ', 'goddess'],
  ['女王', 'じょおう', 'queen']
];
let n5k45 = new KanjiBox('女', 'おんな, め', 'じょ, にょ', 'woman', n5ex45);

let n5ex46 = [
  ['学', 'がく', 'study'],
  ['学ぶ', 'まなぶ', 'to learn'],
  ['学校', 'がっこう', 'school'],
  ['留学', 'りゅうがく', 'studying abroad'],
  ['学習', 'がくしゅう', 'learning, study'],
  ['学生', 'がくせい', 'student']
];
let n5k46 = new KanjiBox('学', 'まな', 'がく', 'learn', n5ex46);

let n5ex47 = [
  ['校', 'こう', 'school'],
  ['校庭', 'こうてい', 'playground'],
  ['校舎', 'こうしゃ', 'school building'],
  ['校長', 'こうちょう', 'principal'],
  ['校正', 'こうせい', 'proofreading'],
  ['校歌', 'こうか', 'school song']
];
let n5k47 = new KanjiBox('校', '', 'こう', 'school', n5ex47);

let n5ex48 = [
  ['先', 'さき', 'preceding'],
  ['先生', 'せんせい', 'teacher'],
  ['先輩', 'せんぱい', "one's senior"],
  ['先程', 'さきほど', 'a little while ago'],
  ['先頭', 'せんとう', 'the front'],
  ['先月', 'せんげつ', 'last month']
];
let n5k48 = new KanjiBox('先', 'さき', 'せん', 'precede', n5ex48);

let n5ex49 = [
  ['生', 'せい', 'live'],
  ['生命', 'せいめい', 'life, existence'],
  ['一生', 'いっしょう', "one's whole life"],
  ['生き物', 'いきもの', 'living thing'],
  ['生徒', 'せいと', 'student']
];
let n5k49 = new KanjiBox('生', 'い, う, は', 'せい, しょう', 'life', n5ex49);

let n5ex50 = [
  ['帽子', 'ぼうし', 'hat'],
  ['椅子', 'いす', 'chair'],
  ['子供', 'こども', 'child'],
  ['調子', 'ちょうし', 'condition'],
  ['男子', 'だんし', 'boy, man']
];
let n5k50 = new KanjiBox('子', 'こ', 'し, す', 'child', n5ex50);

let n5ex51 = [
  ['入る', 'はいる', 'to enter'],
  ['入学', 'にゅうがく', 'admission to school'],
  ['入国', 'にゅうこく', 'entry into a country'],
  ['侵入', 'しんにゅう', 'invasion'],
  ['輸入', 'ゆにゅう', 'import'],
  ['入り口', 'いりぐち', 'entrance']
];
let n5k51 = new KanjiBox('入', 'い, はい', 'にゅう', 'enter', n5ex51);

let n5ex52 = [
  ['文字', 'もじ', 'letter, character'],
  ['数字', 'すうじ', 'number'],
  ['字数', 'じすう', 'the number of characters'],
  ['字幕', 'じまく', 'subtitles'],
  ['大文字', 'おおもじ', 'capital']
];
let n5k52 = new KanjiBox('字', 'あざ', 'じ', 'letter', n5ex52);

let n5ex53 = [
  ['人', 'ひと', 'people, person'],
  ['人生', 'じんせい', "one's life"],
  ['人間', 'にんげん', 'human being'],
  ['人柄', 'ひとがら', 'personality'],
  ['友人', 'ゆうじん', 'friend'],
  ['個人', 'こじん', 'individual']
];
let n5k53 = new KanjiBox('人', 'ひと', 'じん, にん', 'people', n5ex53);

let n5ex54 = [
  ['出', 'しゅつ', 'out'],
  ['出る', 'でる', 'to leave'],
  ['出す', 'だす', 'to put out'],
  ['外出', 'がいしゅつ', 'going out'],
  ['出納', 'すいとう', 'cashier'],
  ['出口', 'でぐち', 'exit, way out'],
  ['出国', 'しゅっこく', 'departure from a country'],
  ['出現', 'しゅつげん', 'emersion, appearance'],
  ['算出', 'さんしゅつ', 'computation']
];
let n5k54 = new KanjiBox('出', 'で, だ', 'しゅつ, すい', 'out', n5ex54);

let n5ex55 = [
  ['右', 'みぎ', 'right'],
  ['右折', 'うせつ', 'right turn'],
  ['左右', 'さゆう', 'right and left'],
  ['右手', 'みぎて', 'right hand'],
  ['右側', 'みぎがわ', 'the right side'],
  ['右利き', 'みぎきき', 'right handed'],
  ['右岸', 'うがん', 'right river bank']
];
let n5k55 = new KanjiBox('右', 'みぎ', 'う, ゆう', 'right', n5ex55);

let n5ex56 = [
  ['左', 'ひだり', 'left'],
  ['左折', 'させつ', 'left turn'],
  ['左手', 'ひだりて', 'left hand'],
  ['左側', 'ひだりがわ', 'the left side'],
  ['左利き', 'ひだりきき', 'left handed'],
  ['左岸', 'さがん', 'left river bank']
];
let n5k56 = new KanjiBox('左', 'ひだり', 'さ', 'left', n5ex56);

let n5ex57 = [
  ['上', 'うえ', 'up'],
  ['上げる', 'あげる', 'to go up'],
  ['上がる', 'あがる', 'to raise'],
  ['上る', 'のぼる', 'to climb'],
  ['屋上', 'おくじょう', 'rooftop'],
  ['年上', 'としうえ', 'older, senior'],
  ['上半期', 'かみはんき', 'first half of the year'],
  ['上昇', 'じょうしょう', 'rise'],
  ['向上', 'こうじょう', 'improvement'],
  ['上着', 'うわぎ', 'coat, jacket'],
  ['上野', 'うえの', 'Ueno']
];
let n5k57 = new KanjiBox('上', 'うえ, うわ, かみ, あ, の', 'じょう, しょう', 'up', n5ex57);

let n5ex58 = [
  ['下', 'した', 'down'],
  ['下げる', 'さげる', 'to go down'],
  ['下がる', 'さがる', 'to fall'],
  ['下る', '下る', 'to descend'],
  ['地下', 'ちか', 'underground'],
  ['下車', 'げしゃ', 'getting off'],
  ['下半期', 'しもはんき', 'latter half of the year'],
  ['下り坂', 'くだりざか', 'downward slope'],
  ['上下', 'じょうげ', 'top and bottom, up and down'],
  ['下着', 'したぎ', 'underwear']
];
let n5k58 = new KanjiBox('下', 'した, さ, くだ, お', 'か, げ', 'down', n5ex58);

let n5ex59 = [
  ['大きい', 'おおきい', 'big'],
  ['大学', 'だいがく', 'college, university'],
  ['大切', 'たいせつ', 'important'],
  ['大型', 'おおがた', 'large, big'],
  ['拡大', 'かくだい', 'exapnsion'],
  ['大事', 'だいじ', 'important rule']
];
let n5k59 = new KanjiBox('大', 'おお', 'だい, たい', 'big', n5ex59);

let n5ex60 = [
  ['中', 'なか', 'middle'],
  ['中学校', 'ちゅうがっこう', 'junior high school'],
  ['世界中', 'せかいじゅう', 'all over the world'],
  ['背中', 'せなか', 'back'],
  ['中止', 'ちゅうし', 'canceling'],
  ['中央', 'ちゅうおう', 'center']
];
let n5k60 = new KanjiBox('中', 'なか', 'ちょう, じゅう', 'middle', n5ex60);

let n5ex61 = [
  ['小さい', 'ちいさい', 'small'],
  ['小学校', 'しょうがっこう', 'elementary school'],
  ['小雨', 'こさめ', 'light rain'],
  ['小川', 'おがわ', 'stream, brook'],
  ['小鳥', 'ことり', 'little bird'],
  ['小説', 'しょうせつ', 'novel']
];
let n5k61 = new KanjiBox('小', 'ちい, こ, お', 'しょう', 'small', n5ex61);

let n5ex62 = [
  ['青', 'あお', 'blue, green'],
  ['青年', 'せいねん', 'young people'],
  ['群青色', 'ぐんじょういろ', 'ultramarine'],
  ['青空', 'あおぞら', 'blue sky'],
  ['青春', 'せいしゅん', 'youth'],
  ['青信号', 'あおしんごう', 'green light']
];
let n5k62 = new KanjiBox('青', 'あお', 'せい, しょう', 'blue', n5ex62);

let n5ex63 = [
  ['赤', 'あか', 'red'],
  ['赤らむ', 'あからむ', 'to redden'],
  ['赤潮', 'あかしお', 'red tide'],
  ['赤字', 'あかじ', 'in the red, deficit'],
  ['赤道', 'せきどう', 'equator'],
  ['赤外線', 'せきがいせん', 'infrared rays'],
  ['赤面', 'せきめん', 'blushing']
];
let n5k63 = new KanjiBox('赤', 'あか', 'せき, しゃく', 'red', n5ex63);

let n5ex64 = [
  ['白', 'しろ', 'white'],
  ['白衣', 'はくい', 'white coat'],
  ['白熊', 'しろくま', 'polar bear'],
  ['白黒', 'しろくろ', 'balck and white'],
  ['告白', 'こくはく', 'confession'],
  ['白髪', 'しらが', 'gray hair']
];
let n5k64 = new KanjiBox('白', 'しろ, しら', 'はく, びゃく', 'white', n5ex64);

let n5ex65 = [
  ['立てる', 'たてる', 'to rise'],
  ['立つ', 'たつ', 'to stand'],
  ['国立の', 'こくりつの', 'national'],
  ['建立', 'こんりゅう', 'erection of a temple'],
  ['立体', 'りったい', 'solid, 3D'],
  ['立派', 'りっぱ', 'splendid, fine']
];
let n5k65 = new KanjiBox('立', 'た', 'りつ, りゅう', 'to stand', n5ex65);

let n5ex66 = [
  ['見る', 'みる', 'to look'],
  ['見える', 'みえる', 'to see'],
  ['見せる', 'みせる', 'to show'],
  ['見物', 'けんぶつ', 'sightseeing'],
  ['意見', 'いけん', 'opinion'],
  ['花見', 'はなみ', 'sakura viewing'],
  ['見学', 'けんがく', 'visit, field trip'],
  ['発見', 'はっけん', 'discovery']
];
let n5k66 = new KanjiBox('見', 'み', 'けん', 'see', n5ex66);

let n5ex67 = [
  ['休む', 'やすむ', 'to rest'],
  ['休まる', 'やすまる', 'to relax'],
  ['休める', 'やすめる', ''],
  ['休暇', 'きゅうか', 'vacation'],
  ['連休', 'れんきゅう', 'consecutive holidays'],
  ['夏休み', 'なつやすみ', 'summer vacation'],
  ['定休日', 'てきゅうび', 'regular day off']
];
let n5k67 = new KanjiBox('休', 'やす', 'きゅう', 'rest', n5ex67);

let n5ex68 = [
  ['早い', 'はやい', 'quick'],
  ['早く', 'はやく', 'early'],
  ['早まる', 'はやまる', 'to hasten'],
  ['早める', 'はやめる', 'to hasten'],
  ['早朝', 'そうちょう', 'early morning'],
  ['早速', 'さっそく', 'immediately'],
  ['早口', 'はやくち', 'talking fast'],
  ['早起き', 'はやおき', 'getting up early'],
  ['早期', 'そうき', 'early stage']
];
let n5k68 = new KanjiBox('早', 'はや', 'そう, さっ', 'quick', n5ex68);

let n5ex69 = [
  ['正しい', 'ただしい', 'correct, right'],
  ['正す', 'ただす', 'to correct'],
  ['正確', 'せいかく', 'accuracy'],
  ['正月', 'しょうがつ', 'New Year Holiday'],
  ['正解', 'せいかい', 'correct answer'],
  ['訂正', 'ていせい', 'correction']
];
let n5k69 = new KanjiBox('正', 'ただ', 'せい, しょう', 'correct', n5ex69);

let n5ex70 = [
  ['村', 'むら', 'village'],
  ['農村', 'のうそん', 'farming village'],
  ['漁村', 'ぎょそん', 'fishing village'],
  ['村里', 'むらざと', 'village'],
  ['村人', 'むらびと', 'villager'],
  ['市町村', 'しちょうそん', 'cities, towns and villages']
];
let n5k70 = new KanjiBox('村', 'むら', 'そん', 'village', n5ex70);

let n5ex71 = [
  ['町', 'まち', 'town, city'],
  ['町営の', 'ちょうえいの', 'municipal'],
  ['港町', 'みなとまち', 'port town'],
  ['町長', 'ちょうちょう', 'town mayor'],
  ['金町', 'かなまち', 'Kanamachi'],
  ['剣士町', 'けんしちょう', 'Kenshicho']
];
let n5k71 = new KanjiBox('町', 'まち', 'ちょう', 'town', n5ex71);

let n5ex72 = [
  ['年', 'とし', 'year'],
  ['年齢', 'ねんれい', 'age'],
  ['学年', 'がくねん', 'educational stage'],
  ['今年', 'ことし', 'this year'],
  ['一年', 'いちねん', 'one year'],
  ['年収', 'ねんしゅう', 'annual income']
];
let n5k72 = new KanjiBox('年', 'とし', 'ねん', 'year', n5ex72);

let n5ex73 = [
  ['文', 'ふみ', 'letter'],
  ['文化', 'ぶんか', 'culture'],
  ['注文', 'ちゅうもん', 'order, request'],
  ['恋文', 'こいぶみ', 'love letter'],
  ['文房具', 'ぶんぼうぐ', 'stationery'],
  ['論文', 'ろんぶん', 'treatise']
];
let n5k73 = new KanjiBox('文', 'ふみ', 'ぶん, もん', 'letter', n5ex73);

let n5ex74 = [
  ['名', 'めい', 'reputation'],
  ['氏名', 'しめい', 'full name'],
  ['名字', 'みょうじ', 'family name'],
  ['名前', 'なまえ', 'name'],
  ['有名', 'ゆうめい', 'famous']
];
let n5k74 = new KanjiBox('名', 'な', 'めい, みょう', 'name', n5ex74);

let n5ex75 = [
  ['円', 'えん', 'Japanese yen'],
  ['十円', 'じゅうえん', 'ten yen'],
  ['円満', 'えんまん', 'peaceful'],
  ['円い', 'まるい', 'round'],
  ['円形', 'えんけい', 'circle, round']
];
let n5k75 = new KanjiBox('円', 'まる', 'えん', 'yen', n5ex75);

let n5ex76 = [
  ['国王', 'こくおう', 'king'],
  ['女王', 'じょおう', 'queen'],
  ['王宮', 'おうきゅう', 'royal palace'],
  ['王冠', 'おうかん', 'crown']
];
let n5k76 = new KanjiBox('王', '', 'おう', 'king', n5ex76);

let n5ex77 = [
  ['玉', 'たま', 'ball, jewel'],
  ['珠玉', 'しゅぎょく', 'gem'],
  ['玉葱', 'たまねぎ', 'onion'],
  ['百円玉', 'ひゃくえんたま', 'hundred yen coin'],
  ['目玉商品', 'めだましょうひん', 'eye catching item']
];
let n5k77 = new KanjiBox('玉', 'たま', 'ぎょう', 'jewel', n5ex77);

let n5ex78 = [
  ['糸', 'いと', 'thread, string'],
  ['製糸', 'せいし', 'spinning'],
  ['毛糸', 'けいと', 'knitting wool'],
  ['糸口', 'いとぐち', 'clue'],
  ['生糸', 'きいと', 'raw silk'],
  ['抜糸', 'ばっし', 'suture removal']
];
let n5k78 = new KanjiBox('糸', 'いと', 'し', 'thread', n5ex78);

let n5ex79 = [
  ['車', 'くるま', 'car'],
  ['自動車', 'じどうしゃ', 'car'],
  ['列車', 'れっしゃ', 'train'],
  ['肩車', 'かたぐるま', 'riding on shoulders'],
  ['台車', 'だいしゃ', 'cart, dolly'],
  ['駐車場', 'ちゅしゃじょう', 'parking lot']
];
let n5k79 = new KanjiBox('車', 'くるま', 'しゃ', 'car', n5ex79);

let n5ex80 = [
  ['力', 'ちから', 'strength'],
  ['努力', 'どりょく', 'effort'],
  ['人力車', 'じんりきしゃ', 'rickshaw'],
  ['力持ち', 'ちからもち', 'strong person'],
  ['能力', 'のうりょく', 'ability'],
  ['体力', 'たいりょく', 'physical strength']
];
let n5k80 = new KanjiBox('力', 'ちから', 'りょう, りき', 'strength', n5ex80);

let arrN5 = [
  n5k1,
  n5k2,
  n5k3,
  n5k4,
  n5k5,
  n5k6,
  n5k7,
  n5k8,
  n5k9,
  n5k10,
  n5k11,
  n5k12,
  n5k13,
  n5k14,
  n5k15,
  n5k16,
  n5k17,
  n5k18,
  n5k19,
  n5k20,
  n5k21,
  n5k22,
  n5k23,
  n5k24,
  n5k25,
  n5k26,
  n5k27,
  n5k28,
  n5k29,
  n5k30,
  n5k31,
  n5k32,
  n5k33,
  n5k34,
  n5k35,
  n5k36,
  n5k37,
  n5k38,
  n5k39,
  n5k40,
  n5k41,
  n5k42,
  n5k43,
  n5k44,
  n5k45,
  n5k46,
  n5k47,
  n5k48,
  n5k49,
  n5k50,
  n5k51,
  n5k52,
  n5k53,
  n5k54,
  n5k55,
  n5k56,
  n5k57,
  n5k58,
  n5k59,
  n5k60,
  n5k61,
  n5k62,
  n5k63,
  n5k64,
  n5k65,
  n5k66,
  n5k67,
  n5k68,
  n5k69,
  n5k70,
  n5k71,
  n5k72,
  n5k73,
  n5k74,
  n5k75,
  n5k76,
  n5k77,
  n5k78,
  n5k79,
  n5k80
];
