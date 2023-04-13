function tests() {
  const testCases = [
    { operation: "4*5+2/3-5*4+9", expected: "9.666666666666668" },
    { operation: "12+4-8*3/2", expected: "4" },
    { operation: "3*4/2+6-7", expected: "5" },
    { operation: "57*3/2+3+3-5-5*6/9/5*3+4-5*9-3", expected: "40.5" },
    { operation: "57*3/2+3+3-5-5*6/9/5*3+4", expected: "88.5" },
    { operation: "57*3/2+3+3-5-5*6/9/5*3+4-5*9", expected: "43.5" },
    {
      operation: "57*3/2+3+3-5-5*6/9/5*3+4-5*957*3/2+3+3-5-5*6/9/5*3+4-5*9",
      expected: "-7131",
    },
    {
      operation:
        "57*3/2+3+3-5-5*6/9/5*3+4-5*957*3/2+3+3-5-5*6/9/5*3+4-5*9+5*20+19-3*5/4+10*10-3+5*90",
      expected: "-6468.75",
    },
    {
      operation: "2*(1+3)/4",
      expected: "2",
    },
    {
      operation: "20/(2+(5-2))",
      expected: "4",
    },
    {
      operation: "20*(3-2)+5/(10-(2+(10-7)))+3",
      expected: "24",
    },
    {
      operation: "(1+1)",
      expected: "2",
    },
    {
      operation: "(1+1",
      expected: "Expressão mal formulada",
    },
    {
      operation: ")1+1(",
      expected: "Expressão mal formulada",
    },
  ];
  for (let i = 0; i < testCases.length; i++) {
    stringOperation = testCases[i].operation;
    bracket();
    showResult();
    if (showResultDiv.textContent == testCases[i].expected) {
      console.log(i + 1 + "º passed");
    } else {
      console.log(i + 1 + "º Not passed");
    }
    console.log(showResultDiv.textContent + " = " + testCases[i].expected);
  }
}
