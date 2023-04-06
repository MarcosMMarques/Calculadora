var operation = "";

document.addEventListener("DOMContentLoaded", function () {
  const show_op = document.getElementById("show_op");
});

function show_operation(char) {
  if (char === "undo") {
    operation = operation.slice(0, -1);
  } else if (char === "clear") {
    operation = "";
  } else {
    operation += char;
  }
  show_op.textContent = operation;
}

function result() {
  numbers = [];
  operators = [];
  for (let i = 0; i < operation.length - 1; i++) {
    for (let j = i + 1; j < operation.length; j++) {
      if (isNaN(operation[j]) || j == operation.length - 1) {
        if (j == operation.length - 1) {
          //   console.log("Entrou");
          //   console.log(operation);
          //   console.log(i, j);
          str = operation.substring(i);
          //   console.log(str);
        } else {
          //   console.log("Entrou");
          //   console.log(operation);
          //   console.log(i, j);
          str = operation.substring(i, j);
          operators.push(operation[j]);
          //   console.log(str);
        }
        numbers.push(Number(str));
        i = j + 1;
      }
    }
  }
  for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i]);
  }
  for (let i = 0; i < operators.length; i++) {
    console.log(operators[i]);
  }
  //   array = [];
  //   for (let i = 0; i < operation.length; i++) {
  //     for (let j = i + 1; j < operation.length; j++) {
  //       if (!Number(operation[j]) >= 0 && !Number(operation[j]) <= 9) {
  //         str_aux = operation.slice(i, j);
  //         console.log(str_aux);
  //         array.push(Number(str_aux));
  //       }
  //     }
  //   }
  //   //   for (let i = 0; i < operation.length; i++) {
  //   //     console.log(array[i]);
  //   //   }
}
