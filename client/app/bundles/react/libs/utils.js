/**********************************************************************
Generate a random id
**********************************************************************/
const random = () => {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const randomLetter = 'abcdefghijklmnopqrstuvwxyz';
  let randomResult = '';

  for (let i = 8; i > 0; --i) {
    randomResult += chars[Math.round(Math.random() * (chars.length - 1))];
  }

  randomResult = (randomResult.charAt(0).toLowerCase() + randomResult.slice(1)).toString();

  const first = randomResult.charAt(0);

  if (first <= '9' && first >= '0') {
    randomResult = randomResult.replace(
      first,
      randomLetter[Math.round(Math.random() * (randomLetter.length - 1))]
    );
  }

  return randomResult;
}

/**********************************************************************
Generate a random background color
**********************************************************************/
const getColor = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**********************************************************************
Validate input for email Regex
**********************************************************************/
const validateEmail = (email) => {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}

export { random, getColor, validateEmail };
