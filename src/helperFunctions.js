
export default  function tryValue (tryFunction){
  try {
    return tryFunction();
  } catch {
    return null;
  }
};


