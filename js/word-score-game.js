var BAG_OF_LETTERS = [
	new Letter('_', 2, 0),
	new Letter('_', 2, 0),
	new Letter('A', 9, 1),
	new Letter('A', 9, 1),
	new Letter('A', 9, 1),
	new Letter('A', 9, 1),
	new Letter('A', 9, 1),
	new Letter('A', 9, 1),
	new Letter('A', 9, 1),
	new Letter('A', 9, 1),
	new Letter('A', 9, 1),
	new Letter('B', 2, 3),
	new Letter('B', 2, 3),
	new Letter('C', 2, 3),
	new Letter('C', 2, 3),
	new Letter('D', 4, 2),
	new Letter('D', 4, 2),
	new Letter('D', 4, 2),
	new Letter('D', 4, 2),
	new Letter('E', 12, 1),
	new Letter('E', 12, 1),
	new Letter('E', 12, 1),
	new Letter('E', 12, 1),
	new Letter('E', 12, 1),
	new Letter('E', 12, 1),
	new Letter('E', 12, 1),
	new Letter('E', 12, 1),
	new Letter('E', 12, 1),
	new Letter('E', 12, 1),
	new Letter('E', 12, 1),
	new Letter('E', 12, 1),
	new Letter('F', 2, 4),
	new Letter('F', 2, 4),
	new Letter('G', 3, 2),
	new Letter('G', 3, 2),
	new Letter('G', 3, 2),
	new Letter('H', 2, 4),
	new Letter('H', 2, 4),
	new Letter('I', 9, 1),
	new Letter('I', 9, 1),
	new Letter('I', 9, 1),
	new Letter('I', 9, 1),
	new Letter('I', 9, 1),
	new Letter('I', 9, 1),
	new Letter('I', 9, 1),
	new Letter('I', 9, 1),
	new Letter('I', 9, 1),
	new Letter('J', 1, 8),
	new Letter('K', 1, 5),
	new Letter('L', 4, 1),
	new Letter('L', 4, 1),
	new Letter('L', 4, 1),
	new Letter('L', 4, 1),
	new Letter('M', 2, 3),
	new Letter('M', 2, 3),
	new Letter('N', 6, 1),
	new Letter('N', 6, 1),
	new Letter('N', 6, 1),
	new Letter('N', 6, 1),
	new Letter('N', 6, 1),
	new Letter('N', 6, 1),
	new Letter('O', 8, 1),
	new Letter('O', 8, 1),
	new Letter('O', 8, 1),
	new Letter('O', 8, 1),
	new Letter('O', 8, 1),
	new Letter('O', 8, 1),
	new Letter('O', 8, 1),
	new Letter('O', 8, 1),
	new Letter('P', 2, 3),
	new Letter('P', 2, 3),
	new Letter('Q', 1, 10),
	new Letter('R', 6, 1),
	new Letter('R', 6, 1),
	new Letter('R', 6, 1),
	new Letter('R', 6, 1),
	new Letter('R', 6, 1),
	new Letter('R', 6, 1),
	new Letter('S', 4, 1),
	new Letter('S', 4, 1),
	new Letter('S', 4, 1),
	new Letter('S', 4, 1),
	new Letter('T', 6, 1),
	new Letter('T', 6, 1),
	new Letter('T', 6, 1),
	new Letter('T', 6, 1),
	new Letter('T', 6, 1),
	new Letter('T', 6, 1),
	new Letter('U', 4, 1),
	new Letter('U', 4, 1),
	new Letter('U', 4, 1),
	new Letter('U', 4, 1),
	new Letter('V', 2, 4),
	new Letter('V', 2, 4),
	new Letter('W', 2, 4),
	new Letter('W', 2, 4),
	new Letter('X', 1, 8),
	new Letter('Y', 2, 4),
	new Letter('Y', 2, 4),
	new Letter('Z', 1, 10),
];

var YOUR_HAND = new Array();
var SCORE = 0;
var C = new Combination(7);
C.run();
var COMBINATION_RES = C.result;

function startGame() {
	addNumbersFromBag();
	displayHand();
};


//从字母包剩余的字母随机抽取7个放在手上
function addNumbersFromBag() {
	// console.log("your hand has:" + YOUR_HAND.length);
	for (i = YOUR_HAND.length; i < 7; i++) {
		YOUR_HAND[i] = getAvailableLetter();
		//
		if (BAG_OF_LETTERS.length == 0) {
			break;
		}
	}

}

//将手里的字母及其分数展示在页面上
function displayHand() {
	console.log("your hand has:" + YOUR_HAND.length);
	var tile_piece = $('.tile-piece');
	for (i = 0; i < YOUR_HAND.length; i++) {
		if (YOUR_HAND[i]) {
			$('#letter-'+(i+1)).html(YOUR_HAND[i].letter);
			$('#points-'+(i+1)).html(YOUR_HAND[i].pointsWhenLettersUsed);
		}
	}
	if (YOUR_HAND.length < 7) {
		for (var i = YOUR_HAND.length; i < 7; i++) {
			if (tile_piece[i]) {
				tile_piece[i].remove();
			}
		}
	}
	$('#remaining-letters-number').html(BAG_OF_LETTERS.length);
}


//随机抽取一个可用的字母
function getAvailableLetter() {
	var randomIndex = Math.floor(Math.random() * BAG_OF_LETTERS.length);
	var randomLetter = BAG_OF_LETTERS.splice(randomIndex, 1);
	return randomLetter[0];
}


function findWordToUse() {
	//TODO Your job starts here.
	//alert("Your code needs to go here");
	var maxWord = '';
	var maxPoints = 0;
	var usedLetters = [];
	if (YOUR_HAND.length < 7) {
		C = new Combination(YOUR_HAND.length);
		C.run();
		COMBINATION_RES = C.result;
	}
	COMBINATION_RES.forEach(function (item) {
		var comArr = [];
		item.forEach(function (elem, index) {
			if (elem === 1) {
				comArr.push(YOUR_HAND[index])
			}
		});
		var permu = new Permutation(comArr);
		permu.run(0);
		permu.result.forEach(function (letterArr) {
			var tempArr = letterArr.map(function (letterObj) {
				if (letterObj == undefined) {
					console.log('LETTER:');
					console.log(letterObj);
				}
				return letterObj.letter;
			});
			var foundWord = tempArr.join("");
			if (isThisAWord(foundWord)) {
				var total = totalPoints(letterArr);
				if (total > maxPoints) {
					maxPoints = total;
					maxWord = foundWord;
					usedLetters = comArr;
				}
			}
		});
	});
	//如果没有获取到单词
	if (maxPoints === 0) {
		alert('can\'t find a word!Please retire your hand!');
	} else {
		$("#word-history-list").append("<li>" + maxWord.toLowerCase() + "</li>");
		SCORE += maxPoints;
		$("#score-number").html(SCORE);
		discardUsedLetters(usedLetters);
		if (BAG_OF_LETTERS.length > 0) {
			addNumbersFromBag();
		}
		displayHand();
	}
	if (BAG_OF_LETTERS.length === 0 && YOUR_HAND.length === 0) {
		alert('Game over!')
	}

}
function totalPoints(letterArr) {
	var sum = 0;
	letterArr.forEach(function (item) {
		sum += item.pointsWhenLettersUsed
	})
	return sum;
}
function discardUsedLetters(used) {
	for (var i = 0; i < used.length; i++) {
		var index = YOUR_HAND.indexOf(used[i]);
		if (index > -1) {
			YOUR_HAND.splice(index, 1);
		}
	}
}
function Combination(size) {
	this.result = [];
	var max = Math.pow(2, size);
	this.run = function () {
		for (var i = 1; i < max; i++) {
			var temp = i;
			var arr = [];
			for (var j = 0; j < size; j++) {
				var res = 0;
				var left = temp % 2;
				if (left !== 0 && temp !== 0) {
					res = 1;
				}
				temp = parseInt(temp / 2);
				arr.push(res);
			}
			this.result.push(arr);
		}
	}
}
function Permutation(arr) {
	this.len = 0;//全排列次数
	this.result = [];//全排列结果
	this.arr = arr.slice();//传入的

	this.swap = function (array, i, j) {
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	this.run = function (index) {
		if (index == this.arr.length - 1) {
			this.len++;
			this.result.push(this.arr.slice());
			return;
		}
		for (var i = index; i < this.arr.length; i++) {
			this.swap(this.arr, index, i);
			this.run(index + 1);
			this.swap(this.arr, i, index);
		}
	}
}

function humanFindWordToUse() {

	var humanFoundWord = $("#human-word-input").val();
	console.log("Checking human workd of:" + humanFoundWord);
	//判断字符串humanFoundWord是否是个单词
	if (isThisAWord(humanFoundWord)) {
		if (haveLettersForWord(humanFoundWord)) {
			//成功添加一个单词
			successfullyAddedWord(humanFoundWord);
		} else {
			alert(humanFoundWord + " - Do not have the letters for this word");
		}
	} else {
		alert(humanFoundWord + " is not a valid word.");
	}

}

//成功添加单词后恢复到添加单词之前
function successfullyAddedWord(foundWord) {
	$("#word-history-list").append("<li>" + foundWord + "</li>");
	takeOutUsedLetters();
	//补充手里的字母到7个
	addNumbersFromBag();
	displayHand();
	$("#human-word-input").val('');

}

//加分
function addToScore(letterToAddToScore) {
	SCORE = SCORE + letterToAddToScore.pointsWhenLettersUsed;
	console.log(letterToAddToScore.pointsWhenLettersUsed + "<-Points added for " + letterToAddToScore.letter);
	$("#score-number").html(SCORE);
}

//将使用过的字母分数加上并删除该字母
function takeOutUsedLetters() {

	for (ii = 0; ii < YOUR_HAND.length; ii++) {
		if (YOUR_HAND[ii].used) {
			addToScore(YOUR_HAND[ii]);
			YOUR_HAND.splice(ii, 1);
			ii = ii - 1;
		} else {
			console.log(YOUR_HAND[ii].letter + "<- Not Used");
		}
	}

}
//判断图中是否有组成这个单词的所有字母
function haveLettersForWord(aProposedWord) {
	//You could code the _ logic could go in this function
	var wordAsArray = aProposedWord.toUpperCase().split("");
	for (i = 0; i < wordAsArray.length; i++) {
		var foundLetter = false;
		console.log(wordAsArray[i] + "<-For match");
		for (ii = 0; ii < YOUR_HAND.length; ii++) {
			console.log("              " + YOUR_HAND[ii].letter + "<-Checking");
			if (YOUR_HAND[ii].letter == wordAsArray[i]) {
				if (!YOUR_HAND[ii].used && !foundLetter) {
					console.log("     " + YOUR_HAND[ii].letter + "<-Found");
					YOUR_HAND[ii].used = true;
					foundLetter = true;

				}
			}
		}


		if (!foundLetter) {
			resetHand();
			return false;
		}
	}

	return true;
}

//把手中所有的字母重置为未使用
function resetHand() {

	for (ii = 0; ii < YOUR_HAND.length; ii++) {
		YOUR_HAND[i].used = false;
	}
}
//判断字符串是否为单词的函数
function isThisAWord(aProposedWord) {
	//是否含有'_'
	var index = aProposedWord.indexOf('_');
	if (index > -1) {
		var text = '^' + aProposedWord.toLowerCase().replace(/_/g, '[a-z]') + '$'
		var reg = new RegExp(text);
		var firstCharacter=aProposedWord.toLowerCase().charAt(0);
		if(Word_List.test(reg,firstCharacter)){
			return true;
		}else{
			return false;
		}
	} else {
		if (Word_List.isInList(aProposedWord)) {
			return true;
		}
		return false;
	}

}

function retireHand() {
	//Loose all the points in your hand
	YOUR_HAND = new Array();
	if (BAG_OF_LETTERS.length === 0) {
		alert('Game over!')
		return;
	}
	addNumbersFromBag();
	displayHand();

}

$(document).ready(function () {
	startGame();

	$("#find-word-button").click(function () {
		findWordToUse();
	});
	$("#human-find-word-button").click(function () {
		humanFindWordToUse();
	});
	$("#retire-hand-button").click(function () {
		retireHand();
	});
	$('#human-word-input').keypress(function (event) {
		if (event.which == 13) {
			humanFindWordToUse();
		}
	});
	$('#remaining-letters-number').html(BAG_OF_LETTERS.length);
});