const numSimilarGroups = (strs) => {
  const len = strs.length,
    slen = strs[0].length;
  const grp = new Array(len).fill(0);
  let nxtGrp = 1,
    countGrp = 0;
  for (let i = 0; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      // optimization: skip pair of the same group
      if (grp[j] > 0 && grp[j] == grp[i]) continue;
      // count diffs
      let count = 0;
      for (let k = 0; k < slen; k++) {
        if (strs[i][k] !== strs[j][k]) {
          count++;
          // we don't need more then 2 anyway
          if (count > 2) break;
        }
      }
      // similarity check
      if (count == 2 || count == 0) {
        // new group case
        if (grp[i] == 0 && grp[j] == 0) {
          grp[j] = grp[i] = nxtGrp++;
          countGrp++;
          // merging two groups case
        } else if (grp[i] > 0 && grp[j] > 0) {
          const obsoleteGrp = grp[j];
          grp.forEach((elm, ind) => {
            if (elm == obsoleteGrp) grp[ind] = grp[i];
          });
          countGrp--;
          // join to existing group cases
        } else if (grp[i] > 0) {
          grp[j] = grp[i];
        } else {
          grp[i] = grp[j];
        }
      }
    }
  }
  // eventually we could have a few elements which
  // don't have a group, so they should have own unique groups
  grp.forEach((elm) => {
    if (elm == 0) countGrp++;
  });
  return countGrp;
};
