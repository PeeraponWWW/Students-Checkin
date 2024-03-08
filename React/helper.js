export function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

export function postToFirebase(origObj) {
    let string = JSON.stringify(origObj);
    let newObj = JSON.parse(string);
    return newObj;
  }

export const dateoptions = { day: '2-digit', month: '2-digit', year: 'numeric' };;