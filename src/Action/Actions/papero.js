export const send = (work) => {
  console.log("abab")
  return {
    type: 'SEND',
    work: work,
  }
};


export const sendWORK = () => {
  return {
    type: 'SENDWORK',
  }
};

export const sended = () => {
  console.log("abab")
  return {
    type: 'SENDED',
  }
};
export const sendFailed = () => {
  console.log("abab")
  return {
    type: 'SENDFAILED',
  }
}


























