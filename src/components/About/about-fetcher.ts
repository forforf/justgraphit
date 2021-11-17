/*
Although this is a bit more complex than it needs to be, it's more an exercise
about using functional code to separate concerns.

What the code does:
Given a list of constant names (like ["LICENSE", "VERSION"])
look up the corresponding CRA env variable in process.env.
Return an object with the env variables values e.g.:
  {LICENSE: "MIT", VERSION: "0.0.1"}

So why didn't I use something like:
```
function getProjectData(inputNames) {

  let envVarObj = {}
  inputNames.forEach(name => {
    const envVarName = `REACT_APP_${name}`;
    envVarObj[name] = process.env[envVarName];
  }
  return envVarObj;
}
```

* process.env is a "magical" operator. It just suddenly appears.
* process.env is tightly coupled with getProjectData even though they have separate concerns.
* mocking process.env for testing requires jumping through some hoops
* the forEach loop is mutating envVarObj as a side effect

What I wanted:
* separate the concerns of "process.env" (the provider) from the business logic of getProjectData which
  transforms a list of names into an object with the names as the key of that object, and the values
  are calculated based on the names (note that the business logic here doesn't care whether process.env does
  the calculation or not).
* no mutations (i.e. imuttable)
* dependency injection (i.e. no magical appearances)

How I did it:
Given:
* a concrete "provider" (a thin wrapper around process.env in this case,
  that also takes care of the inputName -> envVarName transform.
* a "hydrator" reducer that returns a reducing function that immutably creates an object based on
  input keys, using an *abstract* provider to calculate the values based on the provided keys.
  Note: reducer in the javascript array.reduce function, not as in map/reduce.
* A a "key list" of input names that will be the keys of the returned object.

Do: `keyList.reduce(hydrator(provider), {})`
* the provider is injected into the hydrator reducing function
* us reduce to convert the key list array into an object using the hydrator function

*/

function getEnvVar(envVar: string): string {
  const reactEnvVar = `REACT_APP_${envVar}`;
  return process.env[reactEnvVar] ?? '';
}

// hydrator, given a provider, returns the reducing function that
// that uses that provider to build key-value pairs
function hydrator(provider: (s: string) => string) {
  // returns the reducing function with the 'provider' dependency injected in the closure
  return function reducer(
    current_obj: Record<string, string>,
    current_key: string
  ) {
    // combine the current object with the key-value of current_key: provider(current_key)
    return { ...current_obj, [current_key]: provider(current_key) };
  };
}

// By passing a provider as an argument, we can swap out how the project data is configured easily
// plus it makes for easy testing
export function getProjectData(
  keyList: string[],
  provider = getEnvVar
): Record<string, string> {
  // take the keys and uses provider to hydrate the object
  return keyList.reduce(hydrator(provider), {});
}

// Note: hydrator is not being injected (so it is kind of "magically appearing).
// This could be fixed by adding a hydrator argument to getProjectData, but ... I didn't feel like going that far.
