export const calculateMean = (arr) => {
  let curr = 0;
  if (arr.length === 0) {
    return { errorEmpty: 1 };
  }

  for (const e of arr) {
    if (Number.isNaN(Number(e))) {
      return { errorNaN: e };
    }
    curr += Number(e);
  }
  return { success: curr / arr.length };
};

export const calculateMedian = (arr) => {
  const integers = [];
  for (const char of arr) {
    const num = Number(char);
    if (isNaN(Number(num))) {
      return { error: char };
    }
    integers.push(num);
  }

  // Check if there are no valid integers
  if (integers.length === 0) {
    return "Error: No valid integers found in the input.";
  }

  // Sort the valid integers in ascending order
  integers.sort((a, b) => a - b);

  // Calculate the middle index
  const middleIndex = Math.floor(integers.length / 2);

  // Check if the array length is odd or even
  if (integers.length % 2 === 0) {
    // If it's even, calculate the average of the two middle values
    const middleValue1 = integers[middleIndex - 1];
    const middleValue2 = integers[middleIndex];
    return { success: (middleValue1 + middleValue2) / 2 };
  } else {
    // If it's odd, return the middle value
    return { success: integers[middleIndex] };
  }
};

export const calculateMode = (arr) => {
  const frequencyMap = {};

  // Convert characters to integers and count their frequency
  for (const char of arr) {
    const num = Number(char);
    if (isNaN(Number(num))) {
      return { error: char };
    }
    if (frequencyMap[num] === undefined) {
      frequencyMap[num] = 1;
    } else {
      frequencyMap[num]++;
    }
  }

  let mode;
  let maxFrequency = 0;

  // Find the number with the highest frequency (mode)
  for (const num in frequencyMap) {
    if (frequencyMap[num] > maxFrequency) {
      mode = parseInt(num);
      maxFrequency = frequencyMap[num];
    }
  }

  return { success: mode };
};
