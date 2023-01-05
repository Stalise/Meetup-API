const createTagsValues = (tags: string[]): string => {
  const maxIndex = tags.length - 1;

  const values = tags.map((tag, index) => {
    const output = `('${tag}', $1)`;

    return index < maxIndex ? output + ',' : output;
  });

  return values.join(' ');
};

export default createTagsValues;
