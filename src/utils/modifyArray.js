export function arrayDeleteRepeat(arr) {
  let res = [];
  let json = {};
  for (let i = 0; i < arr.length; i++) {
      if (!json[arr[i]]) {
          res.push(arr[i]);
          json[arr[i]] = 1;
      }
  }
  return res;
};