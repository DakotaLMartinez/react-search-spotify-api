const originalError = console.error;
console.error = message => {
  if(message.startsWith("Warning: ")) {
    throw new Error(message);
  } else {
    originalError.call(console, message);
  }
};