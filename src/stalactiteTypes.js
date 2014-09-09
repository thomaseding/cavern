var stalactiteTypes = [];

/*************************************************************************************/

function Stalactite1 (pos) {
  // V
  Stalactite.call (this, pos, 5, "V");
}
extend (Stalactite1, Stalactite);

stalactiteTypes.push (Stalactite1);

/*************************************************************************************/

function Stalactite2 (pos) {
  // \/
  Stalactite.call (this, pos, 5, "\\/");
}
extend (Stalactite2, Stalactite);

stalactiteTypes.push (Stalactite2);

/*************************************************************************************/

function Stalactite3 (pos) {
  // \\//
  //  \/ 
  Stalactite.call (this, pos, 5, "\\\\//\n \\/");
}
extend (Stalactite3, Stalactite);

stalactiteTypes.push (Stalactite3);

/*************************************************************************************/

function Stalactite4 (pos) {
  // \_Vv/
  //   \/ 
  Stalactite.call (this, pos, 5, "\\_Vv/\n  \\/");
}
extend (Stalactite4, Stalactite);

stalactiteTypes.push (Stalactite4);

/*************************************************************************************/

function Stalactite5 (pos) {
  // \Vv_/
  //  \/ 
  Stalactite.call (this, pos, 5, "\\Vv_/\n \\/");
}
extend (Stalactite5, Stalactite);

stalactiteTypes.push (Stalactite5);

/*************************************************************************************/

function Stalactite6 (pos) {
  // v\`/
  //   V 
  Stalactite.call (this, pos, 5, "v\\`/\n  V");
}
extend (Stalactite6, Stalactite);

stalactiteTypes.push (Stalactite6);

/*************************************************************************************/

function Stalactite7 (pos) {
  // \`/v
  //  V  
  Stalactite.call (this, pos, 5, "\\`/v\n V");
}
extend (Stalactite7, Stalactite);

stalactiteTypes.push (Stalactite7);

/*************************************************************************************/

function Stalactite8 (pos) {
  // \`/
  //  V
  Stalactite.call (this, pos, 5, "\\`/\n V");
}
extend (Stalactite8, Stalactite);

stalactiteTypes.push (Stalactite8);

/*************************************************************************************/

function Stalactite9 (pos) {
  // V\VvVvV/V
  //   V\v/V
  //     V
  Stalactite.call (this, pos, 10, "V\\VvVvV/V\n  V\\v/V\n    V");
  this.chanceToDrip += 0.1;
}
extend (Stalactite9, Stalactite, {
  
    shatter: function () {
      // \ / \`/ \ /
      // \  \ V /  /
      //   \     /  
      var shards = Rock.prototype.shatter.call (this);

      var pos = this.pos ().add (new Pos (0, -1));
      // \ / \`/ \ /
      //      V
      shards.push (new Shard (pos.add (new Pos (-1, 0)), "\\"));
      shards.push (new Shard (pos.add (new Pos (1, 0)), "/"));
      shards.push (new Shard (pos.add (new Pos (7, 0)), "\\"));
      shards.push (new Shard (pos.add (new Pos (9, 0)), "/"));
      var stalactite = new Stalactite8 (pos.add (new Pos (3, 0)));
      stalactite.fallen = this.fallen;
      shards.push (stalactite);

      var pos = pos.add (Dir.DOWN.toPos ());
      // \  \   /  /
      shards.push (new Shard (pos.add (new Pos (-1, 0)), "\\"));
      shards.push (new Shard (pos.add (new Pos (2, 0)), "\\"));
      shards.push (new Shard (pos.add (new Pos (6, 0)), "/"));
      shards.push (new Shard (pos.add (new Pos (9, 0)), "/"));
      

      var pos = pos.add (Dir.DOWN.toPos ());
      //   \     /  
      shards.push (new Shard (pos.add (new Pos (1, 0)), "\\"));
      shards.push (new Shard (pos.add (new Pos (7, 0)), "/"));
      
      return shards;
    }
});

stalactiteTypes.push (Stalactite9);
