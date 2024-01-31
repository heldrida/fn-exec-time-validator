const MAX_EXEC_TIME = 120;

const execValidatorHandler = (cb, ...args) => {
  const execValidator = (...args) => {
    const time = execTimer(...args);

    if (time >= MAX_EXEC_TIME) return false;

    return true;
  }

  const execTimer = (...args) => {
    const start = performance.now();

    cb(...args);

    return performance.now() - start;
  }

  return execValidator(...args);
};

const testFns = [
  {
    expr: (msg) => `The user message is ${msg}`,
    arg: ["Hello world!"],
  },
  {
    expr: (a, b) => a + b,
    arg: [1, 2],
  },
  {
    expr: () => setTimeout(() => 1, 1000),
    arg: [],
  },
  {
    expr: (a) => { while (a > 0) { a-- } },
    arg: [1000000000],
  },
];

testFns.forEach((el) => {
  const res = execValidatorHandler(el.expr, el.arg);

  console.assert(res, `Test failed: ${el.expr} with arg ${el.arg}`);
});

