export const sortBy = (jobs, action) => {
  const option = action.option;
  const temp = jobs.map(el => el);

  if (action.reverse) return temp.reverse();

  return insertionSortBy(temp, option);
}

function insertionSortBy(arr, option) {
  const sorted = [];
  let max;

  const statuses = {
    'applied': 4,
    'phone screen': 3,
    'on-site': 2,
    'offer': 1,
    'rejected': 5
  }

  arr.forEach(job => {
    const curr = statuses[job[option].toLowerCase()] || job[option].toLowerCase();
    console.log(curr)

    max = max || curr;
    if (curr > max) {
      max = curr;
      sorted.push(job);
      return;
    }

    for (let i = 0; i < sorted.length; i++) {
      let compare = statuses[sorted[i][option].toLowerCase()] || sorted[i][option].toLowerCase();
      if (compare > curr) {
        sorted.splice(i, 0, job)
        return;
      }
    }

    sorted.push(job)
  })

  return sorted;
}