//添加Letter的构造函数(字母，？？，对应的分数)
function Letter(letter, numberOfStartingTiles, pointsWhenLettersUsed) {
    this.letter = letter;  
    this.numberOfStartingTiles = numberOfStartingTiles;  
    this.pointsWhenLettersUsed = pointsWhenLettersUsed;  
    this.tilesUsed = 0;
    this.used = false;

    this.remainingTiles = function () {
    	if((this.numberOfStartingTiles - this.tilesUsed) > 0){
    		return (this.numberOfStartingTiles - this.tilesUsed);
    	}else{
    		return 0;
    	}
    };
    this.useTile = function () {
    	if((this.numberOfStartingTiles - this.tilesUsed) > 0){
    		this.tilesUsed++;
    		return true;
    	}else{
    		return false;
    	}
    };
    
}