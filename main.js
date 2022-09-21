$(document).ready(() => {
  // Button declaration
  const number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const operator = ["-", "+", "*", "/"];
  const decimalPlace = ["."];

  // Major functions
  const updateInput = (val) => {
    $("input").val(val);
  };

  const trimDecimalPlace = (val) => {
    return val.replace(/[^0-9]+/g, "");
  };

  const clear = () => {
    $("input").val("");
  };

  const backspace = () => {
    let inputValue = $("input").val();

    let delValue = inputValue.slice(0, -1);

    if (inputValue !== "NaN" && inputValue !== "Infinity") {
      updateInput(delValue);
    } else {
      clear();
    }
  };

  const equal = () => {
    let inputValue = $("input").val();

    let lastChar = inputValue.slice(-1);

    let isLastCharOperator = operator.some((symbol) =>
      lastChar.includes(symbol)
    );

    if (!isLastCharOperator) {
      updateInput(eval(inputValue));
    } else {
      let delValue = inputValue.slice(0, -1);

      updateInput(eval(delValue));
    }
  };

  // Button click event
  $(document).on("click", ".btn", (e) => {
    // get the value from input field
    let inputValue = $("input").val();

    // get the last character of input field
    let lastChar = inputValue.slice(-1);

    // get the button value
    let btnValue = $(e.target).data("val");

    // append the button value to current input field value
    let updatedValue = inputValue + btnValue;

    // trim decimal place
    let plainValue = trimDecimalPlace(updatedValue);

    // get the input field value and splitting it into different set of numbers by operators
    let separatedNum = inputValue.split(/[-|+|*|/]/);

    // get the latest value from input field
    let latestValue = separatedNum.slice(-1).toString();

    // add maxLength = 16
    if (plainValue.length <= 16) {
      if (number.includes(btnValue)) {
        // case blocked: 0,000
        if (
          inputValue !== "0" &&
          inputValue !== "NaN" &&
          inputValue !== "Infinity"
        ) {
          updateInput(updatedValue);
        }
      } else if (operator.includes(btnValue)) {
        // case blocked: ++, .+
        if (
          inputValue !== "" &&
          inputValue !== "NaN" &&
          inputValue !== "Infinity" &&
          !operator.includes(lastChar) &&
          !decimalPlace.includes(lastChar)
        ) {
          updateInput(updatedValue);
        }
      } else if (decimalPlace.includes(btnValue)) {
        if (
          // case blocked: ..., +.
          // will check if the latest value is float as well
          inputValue !== "" &&
          inputValue !== "NaN" &&
          inputValue !== "Infinity" &&
          !operator.includes(lastChar) &&
          !latestValue.includes(decimalPlace)
        ) {
          updateInput(updatedValue);
        }
      }
    }
  });

  $(document).on("click", ".clear-btn", clear);

  $(document).on("click", ".backspace-btn", backspace);

  $(document).on("click", ".equal-btn", equal);

  // Button mousedown event
  const keyboardInput = (e) => {
    // get the value from input field
    let inputValue = $("input").val();

    // get the last character of input field
    let lastChar = inputValue.slice(-1);

    // get the key after pressing the keyboard
    let key = e.key;

    // append the key value to current input field value
    let updatedValue = inputValue + key;

    // trim decimal place
    let plainValue = trimDecimalPlace(updatedValue);

    // get the input field value and splitting it into different set of numbers by operators
    let separatedNum = inputValue.split(/[-|+|*|/]/);

    // get the latest value from input field
    let latestValue = separatedNum.slice(-1).toString();

    // add maxLength = 16 & block spacebar
    if (plainValue.length <= 16 && key != " ") {
      if (inputValue == "NaN" && inputValue == "Infinity") {
        if ((key === "Backspace") | (key === "Escape")) {
          clear();
        }
      }

      if (key > 0 && inputValue !== "0") {
        // case blocked: 0123
        updateInput(updatedValue);
      } else if (key == 0 && latestValue !== "0") {
        // case blocked: 0000
        updateInput(updatedValue);
      } else if (
        operator.includes(key) &&
        inputValue != "" &&
        !operator.includes(lastChar) &&
        !decimalPlace.includes(lastChar)
      ) {
        // case blocked: ++, .+
        updateInput(updatedValue);
      } else if (
        decimalPlace.includes(key) &&
        inputValue != "" &&
        !operator.includes(lastChar) &&
        !latestValue.includes(decimalPlace)
      ) {
        // case blocked: ..., +.
        // will check if the latest value is float as well
        updateInput(updatedValue);
      } else if (inputValue != "") {
        if (key === "=" || key === "Enter") {
          e.preventDefault();
          equal();
        } else if (key === "Backspace") {
          backspace();
        } else if (key === "Escape") {
          clear();
        }
      }
    }
  };

  // Keydown Listener
  window.addEventListener("keydown", keyboardInput);
});
