var stalagmiteTypes = [];

/*************************************************************************************/

function Stalagmite1 (pos) {
  // Λ
  Stalagmite.call (this, pos, 5, Unicode.capitalLambda);
}
extend (Stalagmite1, Stalagmite);

stalagmiteTypes.push (Stalagmite1);

/*************************************************************************************/

function Stalagmite2 (pos) {
  // /\
  Stalagmite.call (this, pos, 5, "/\\");
}
extend (Stalagmite2, Stalagmite);

stalagmiteTypes.push (Stalagmite2);

/*************************************************************************************/

function Stalagmite3 (pos) {
  // /▔\
  Stalagmite.call (this, pos, 5, "/_\\".replace (/_/g, Unicode.upperBlock));
}
extend (Stalagmite3, Stalagmite);

stalagmiteTypes.push (Stalagmite3);

/*************************************************************************************/

function Stalagmite4 (pos) {
  //   /▔\
  // /▔   \
  Stalagmite.call (this, pos, 5, "  /_\\\n/_aaa\\".replace (/_/g, Unicode.upperBlock).replace (/a/g, Unicode.nbsp));
}
extend (Stalagmite4, Stalagmite);

stalagmiteTypes.push (Stalagmite4);

/*************************************************************************************/

function Stalagmite5 (pos) {
  //  /▔\
  // /   ▔\
  Stalagmite.call (this, pos, 5, " /_\\\n/aaa_\\".replace (/_/g, Unicode.upperBlock).replace (/a/g, Unicode.nbsp));
}
extend (Stalagmite5, Stalagmite);

stalagmiteTypes.push (Stalagmite5);

/*************************************************************************************/

function Stalagmite6 (pos) {
  //  /▔\
  // /   \
  Stalagmite.call (this, pos, 5, " /_\\\n/aaa\\".replace (/_/g, Unicode.upperBlock).replace (/a/g, Unicode.nbsp));
}
extend (Stalagmite6, Stalagmite);

stalagmiteTypes.push (Stalagmite6);

/*************************************************************************************/

function Stalagmite7 (pos) {
  //   /▔▔\
  // /▔  ▔▔\
  Stalagmite.call (this, pos, 5, "  /__\\\n/_aa__\\".replace (/_/g, Unicode.upperBlock).replace (/a/g, Unicode.nbsp));
}
extend (Stalagmite7, Stalagmite);

stalagmiteTypes.push (Stalagmite7);

/*************************************************************************************/

function Stalagmite8 (pos) {
  //   /▔▔\
  // /▔▔   ▔\
  Stalagmite.call (this, pos, 5, "  /__\\\n/__aa_\\".replace (/_/g, Unicode.upperBlock).replace (/a/g, Unicode.nbsp));
}
extend (Stalagmite8, Stalagmite);

stalagmiteTypes.push (Stalagmite8);

/*************************************************************************************/

function Stalagmite9 (pos) {
  //     /▔\
  //   /▔/ ▔▔\
  // /▔▔  ▔ \ ▔\
  Stalagmite.call (this, pos, 5, "    /_\\\n  /_/a__\\\n/__aa_a\\a_\\".replace (/_/g, Unicode.upperBlock).replace (/a/g, Unicode.nbsp));
}
extend (Stalagmite9, Stalagmite);

stalagmiteTypes.push (Stalagmite9);

/*************************************************************************************/

function Stalagmite10 (pos) {
  // /▔▔▔\
  Stalagmite.call (this, pos, 5, "/___\\".replace (/_/g, Unicode.upperBlock).replace (/a/g, Unicode.nbsp));
}
extend (Stalagmite10, Stalagmite);

stalagmiteTypes.push (Stalagmite10);

/*************************************************************************************/

function Stalagmite11 (pos) {
  // /▔▔▔▔\
  Stalagmite.call (this, pos, 5, "/____\\".replace (/_/g, Unicode.upperBlock).replace (/a/g, Unicode.nbsp));
}
extend (Stalagmite11, Stalagmite);

stalagmiteTypes.push (Stalagmite11);
