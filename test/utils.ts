export const randomString = Math.random().toString(36).substring(2);

export const generateRandomNumber = (length: number): string => {
    let randomNumber = "";
    for (let i = 0; i < length; i++) {
      randomNumber += Math.floor(Math.random() * 10);
    }
    return randomNumber;
  }
  