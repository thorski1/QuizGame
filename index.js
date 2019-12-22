// create web audio api context
var audioCtx = new (window.AudioContext ||
	window.webkitAudioContext)();

function playNote(frequency, duration) {
	// create Oscillator node
	var oscillator = audioCtx.createOscillator();

	oscillator.type = "sine"; //square, square wave, sawtooth, triangle
	oscillator.frequency.value = frequency; // value in hertz
	oscillator.connect(audioCtx.destination);
	oscillator.start();

	setTimeout(function() {
		oscillator.stop();
		playMelody();
	}, duration);
}

function playMelody() {
	if (notes.length > 0) {
		note = notes.pop();
		playNote(note[0], (1000 * 256) / (note[1] * tempo));
	}
}

notes = [
	[329.5, 8],
	[329.5, 8],
	[329.5, 8],
	[261.5, 16],
	[0, 32],
	[391.5, 32],
	[329.5, 8],
	[261.5, 16],
	[0, 32],
	[391.5, 32],
	[329.5, 8],
	[0, 8],
	[493.5, 8],
	[493.5, 8],
	[493.5, 8],
	[523, 16],
	[0, 32],
	[391.5, 32],
	[311, 8],
	[261.5, 16],
	[0, 32],
	[391.5, 32],
	[329.5, 8]
];

notes.reverse();
tempo = 100;

playMelody();

console.log(`Welcome to the Quiz Game!
You will be given a question with 3 multiple choice answers. If you choose the correct one, you advance to the next question. If you choose incorrectly, you lose a life! You only have 3 lives, so be careful!`);

let life = [" 💗", " 💗", " 💗"];
// - to type in concolse
const q1 = {
	q: `1) What is “closure” in JavaScript?

  a) A function that takes a function as a parameter,
  b) A statement that breaks you out of a loop?
  c) A closure is a function having access to the parent  scope, even after the parent function has closed.
  
  `,
	right: "c",
	wrong1: "b",
	wrong2: "a"
};

const q2 = {
	q: `2) What will this print to the console?
  const num = 40;
  let final;
    if (num > 100) {
  final = null;
  }  else {
  final = num * 2
  }
  console.log(final)
    a) 40
    b) 100
    c) 80
`,
	right: "a",
	wrong1: "b",
	wrong2: "c"
};

const q3 = {
	q: `3) What does the native method 'reduce' do?
  a) The reduce method reduces the array to a single   value.
  b) Reduce loops though the arrays 
  c) It allows an engineer to compress larg amounts of data into a smaller file.
  `,
	right: "a",
	wrong1: "b",
	wrong2: "c"
};

const q4 = {
	q: `4) What is a callback function?
  a) A callback is a higher order function. 
  b) A callback is a function that is returned from another function.
  c) A callback is a function that is passed as an argument to another function.
  
  `,
	right: "c",
	wrong1: "b",
	wrong2: "a"
};

const q5 = {
	q: "5) how are you?",
	right: "b",
	wrong1: "a",
	wrong2: "c"
};

const arrOfQ = [q1, q2, q3, q4, q5];

function askQuestion(qArr, i = 0) {
	if (life.length === 0) {
		return "💀💀💀";
	} else if (qArr[i] === undefined) {
		return "You Win!, congratulations!";
	}

	console.log(life.join(""));

	let ans = prompt(qArr[i]["q"]);

	if (ans.toLowerCase() === qArr[i]["right"]) {
		console.log("correct!");
		return askQuestion(arrOfQ, i + 1);
	}

	if (
		ans.toLowerCase() === qArr[i].wrong1 ||
		ans.toLowerCase() === qArr[i].wrong2
	) {
		console.log("wrong!");
		console.log("Guess again, dummy!");
		life.pop();
		return askQuestion(arrOfQ, i);
	}
	console.log("Please choose a, b, or c...");
	return askQuestion(arrOfQ, i);
}

askQuestion(arrOfQ, 0);
