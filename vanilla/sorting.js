// Bubble Sort
function bubble(array) {
  if (array.length < 2) return array;
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1; j++) {
      if (array[j] > array[j + 1]) {
        const pivot = array[j];

        array[j] = array[j + 1];
        array[j + 1] = pivot;
      }
    }
  }
  return array;
}

// Quick Sort
function quick(array) {
  if (array.length < 2) return array;
  let pivot = array[0];
  const left = [];
  const right = [];

  for (let i = 1; i < array.length; i++) {
    if (pivot > array[i]) {
      left.push(array[i]);
    } else {
      right.push(array[i]);
    }
  }
  return quick(left).concat(pivot, quick(right));
}
