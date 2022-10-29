document.querySelector(".control-buttons span").onclick = function () {
  let yourName = prompt("What's Your Name?");
  if (yourName == null || yourName == "") {
    document.querySelector(".name span").innerHTML = "Unkown";
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }

  this.parentElement.remove();
};

//Needed Variables
let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(document.querySelectorAll(".game-block"));

let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);

blocks.forEach((block, index) => {
  block.style.order = orderRange[index];

  block.onclick = function () {
    flipBlock(block);
  };
});

// Flip Function
function flipBlock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");

  //check if they Are the Same img
  //[1] get is-flipped
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );

  // check length lenth
  if (allFlippedBlocks.length == 2) {
    //....Stop Clicking and Match imgs
    stopClicking();
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

//Stop clicking event setTiming/Duration
function stopClicking() {
  blocksContainer.classList.add("no-clicking");
  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

// Match imgs fun
function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");

  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);
  }
}

//Shuffle fun
function shuffle(array) {
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}
