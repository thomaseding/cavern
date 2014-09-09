function Game (textArea) {
  this.textArea = textArea;
  this.cavern = new Cavern (textArea.cols - 0, textArea.rows - 0);
}

Game.prototype = {
  
    draw: function () {
      this.textArea.value = this.cavern.toString ();
    }

  , init: function () {
      this.cavern.populateCeiling ();
      this.cavern.populateFloor ();
    }

  , start: function () {
      this.init ();
      this.run ();
    }

  , run: function () {
      this.cavern.moveThings ();
      this.cavern.drip ();
      this.cavern.runCollisions ();
      var deadRocks = this.cavern.getEvery (Rock).filter (function (rock) {
        return !rock.alive ();
      });
      this.cavern.removeDead ();
      deadRocks.forEach (function (rock) {
        rock.shatter ().forEach (function (shard) {
          this.cavern.tryAdd (shard);
        }, this);
      }, this);
      this.draw ();
      setTimeout ((function (self) {
        return function () {
          self.run ();
        }
      }) (this), 100);
      if (Math.random () < 0.03) {
        this.cavern.populateCeiling ();
      }
      return this;
    }
};

Game.getPossibleThingTypes = function () {
  return rockTypes.concat ([Fly]);
};
