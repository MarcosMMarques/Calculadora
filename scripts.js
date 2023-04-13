var stringOperation = "";
var numbersList;
var operatorsList;
let showOp, showResultDiv;
let finalResultsArray = [];

document.addEventListener("DOMContentLoaded", function () {
  showOp = document.getElementById("show_op");
  showResultDiv = document.getElementById("show_result");

  showOp.addEventListener("keydown", (event) => {
    const keyCode = event.keyCode || event.which;
    if (keyCode === 13) {
      stringOperation = showOp.textContent.trim();
      // bracket();
      result();
      // showResult();
    }
  });
});

function malformedExpression() {
  showOperation("clear");
  showOperation("Expressão mal formulada");
  finalResultsArray.push("Expressão mal formulada");
}

function showOperation(char) {
  if (char === "undo") {
    stringOperation = stringOperation.slice(0, -1);
  } else if (char === "clear") {
    stringOperation = "";
  } else {
    stringOperation += char;
  }
  showOp.textContent = stringOperation;
}

function showResult() {
  showResultDiv.textContent = finalResultsArray[finalResultsArray.length - 1];
  showOperation("clear");
  showOperation(finalResultsArray[finalResultsArray.length - 1].toString());
}

function identificationPrecedence(operator1, operator2) {
  if (operatorsList.length === 0) return undefined;
  const matrix = [
    // soma    sub     multi   divi
    ["equal", "equal", false, false], //soma
    ["equal", "equal", false, false], //sub
    [true, true, "equal", "equal"], //multi
    [true, true, "equal", "equal"], //divi
  ];
  const indexMap = { "+": 0, "-": 1, "*": 2, "/": 3 };
  return matrix[indexMap[operator1]][indexMap[operator2]];
}

function calc(operator, value1, value2) {
  return {
    "+": value1 + value2,
    "-": value1 - value2,
    "*": value1 * value2,
    "/": value1 / value2,
  }[operator];
}

function checkBracketCount(expression) {
  let openBrackets = 0,
    closedBrackets = 0;
  for (
    let i = 0, j = expression.length;
    i < expression.length && j >= 0;
    i++, j--
  ) {
    if (expression[i] == "(") openBrackets++;
    if (expression[i] == ")") closedBrackets++;
  }

  if (openBrackets != closedBrackets) return false;
  return openBrackets;
}

function bracket() {
  let removeBracketsInExpression = stringOperation,
    bracketsQuantity;

  if (checkBracketCount(removeBracketsInExpression) === false)
    return malformedExpression();
  bracketsQuantity = checkBracketCount(removeBracketsInExpression);

  for (let i = 0; i < bracketsQuantity; i++) {
    let lastBracket = removeBracketsInExpression.indexOf(")");
    if (lastBracket === -1) return malformedExpression();
    let subString = removeBracketsInExpression.substring(0, lastBracket + 1);
    let firstBracket = subString.lastIndexOf("(");

    if (firstBracket === -1) return malformedExpression();

    expressionInBracket = removeBracketsInExpression.substring(
      firstBracket + 1,
      lastBracket
    );
    stringOperation = expressionInBracket;
    result();
    expressionInBracket = finalResultsArray[finalResultsArray.length - 1];
    finalResultsArray.pop();
    if (firstBracket != 0) {
      str = removeBracketsInExpression.substring(0, firstBracket);
    } else {
      str = "";
    }

    str += expressionInBracket;

    if (lastBracket != removeBracketsInExpression.length - 1) {
      str += removeBracketsInExpression.substring(lastBracket + 1);
    }

    removeBracketsInExpression = str;
  }
  stringOperation = removeBracketsInExpression;
  result();
}

function result() {
  if (stringOperation.length == 1 && !isNaN(stringOperation[0]))
    return finalResultsArray.push(Number(stringOperation[0]));
  let result, str, precedence;
  numbersList = [];
  operatorsList = [];
  for (let i = 0; i < stringOperation.length - 1; i++) {
    for (let j = i + 1; j < stringOperation.length; j++) {
      if (
        (isNaN(stringOperation[j]) && stringOperation[j] != ".") ||
        j == stringOperation.length - 1
      ) {
        if (j == stringOperation.length - 1) {
          str = stringOperation.substring(i);
          numbersList.push(Number(str));
          if (
            operatorsList[operatorsList.length - 1] === "*" ||
            operatorsList[operatorsList.length - 1] === "/"
          ) {
            result = calc(
              operatorsList[operatorsList.length - 1],
              numbersList[numbersList.length - 2],
              numbersList[numbersList.length - 1]
            );
            operatorsList.pop();
            numberList = numbersList.pop() && numbersList.pop();
            numbersList.push(result);
          }
          while (numbersList.length != 1) {
            result = calc(operatorsList[0], numbersList[0], numbersList[1]);
            numbersList = numbersList.slice(1);
            numbersList[0] = result;
            operatorsList = operatorsList.slice(1);
          }
        } else {
          precedence = identificationPrecedence(
            operatorsList[operatorsList.length - 1],
            stringOperation[j]
          );

          if (precedence === "equal" || precedence === true) {
            str = stringOperation.substring(i, j);
            numbersList.push(Number(str));
            if (
              operatorsList[operatorsList.length - 1] == "+" &&
              operatorsList[operatorsList.length - 2] == "-"
            ) {
              result = calc(
                "-",
                numbersList[numbersList.length - 1],
                numbersList[numbersList.length - 2]
              );
              operatorsList.pop();
              operatorsList[operatorsList.length - 1] = "+";
            } else {
              result = calc(
                operatorsList[operatorsList.length - 1],
                numbersList[numbersList.length - 2],
                numbersList[numbersList.length - 1]
              );
              operatorsList.pop();
            }
            numberList = numbersList.pop() && numbersList.pop();
            numbersList.push(result);
            operatorsList.push(stringOperation[j]);
          } else if (precedence === false || precedence === undefined) {
            operatorsList.push(stringOperation[j]);
            str = stringOperation.substring(i, j);
            numbersList.push(Number(str));
          }
        }
        i = j + 1;
      }
    }
  }
  finalResultsArray.push(result);
}
