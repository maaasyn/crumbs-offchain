type MatchCallbacks<T, E> = {
  ok: (value: T) => void;
  error: (value: E) => void;
};

class Result<T, E> {
  private constructor(
    private readonly isOk: boolean,
    private readonly value: T | E
  ) {}

  static ok<T>(value: T): Result<T, never> {
    return new Result<T, never>(true, value);
  }

  static error<E>(value: E): Result<never, E> {
    return new Result<never, E>(false, value);
  }

  static async wrapPromise<T, E>(promise: Promise<T>): Promise<Result<T, E>> {
    try {
      const value = await promise;
      return Result.ok<T>(value);
    } catch (error) {
      return Result.error(error as E);
    }
  }

  match(callbacks: MatchCallbacks<T, E>): void {
    if (this.isOk) {
      callbacks.ok(this.value as T);
    } else {
      callbacks.error(this.value as E);
    }
  }
}

function ok<T>(value: T): Result<T, never> {
  return Result.ok(value);
}

function err<E>(value: E): Result<never, E> {
  return Result.error(value);
}

const someGoofyPromise = async () => {
  return 123;
};

async function magic() {
  const promiseResult = await Result.wrapPromise(someGoofyPromise());

  promiseResult.match({
    ok: (value) => {
      console.log("Magic succeeded with value:", value);
    },
    error: (err) => {
      console.log("Magic failed with error:", err);
    },
  });
  // Simulate an operation that can succeed or fail
  const success = Math.random() > 0.5;
  if (success) {
    return ok(42);
  } else {
    return err("Something went wrong");
  }
}

async function moreComplicatedMagicWithMoreComplicatedError() {
  // Simulate an operation that can succeed or fail
  const success = Math.random() > 0.5;
  if (success) {
    return ok(42);
  } else {
    return err({ code: 500, message: "Something went wrong" });
  }
}

async function exampleUsage() {
  const result = await magic();

  result.match({
    ok: (value) => {
      console.log("Magic succeeded with value:", value);
    },
    error: (err) => {
      console.log("Magic failed with error:", err);
    },
  });

  const result2 = await moreComplicatedMagicWithMoreComplicatedError();

  result2.match({
    ok: (value) => {
      console.log("More complicated magic succeeded with value:", value);
    },
    error: (err) => {
      console.log("More complicated magic failed with error:", err);
    },
  });
}

const main = async () => {
  await exampleUsage();
};

main();
