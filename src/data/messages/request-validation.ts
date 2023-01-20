export const requestValidationMessages = {
  invalidTime: "The time must be in the format 'YYYY-MM-DDTHH:mm:ss.sssZ'",
  requiredPageQuery: 'The query /page/ must be passed if query /limit/ is used',
  requiredLimitQuery:
    'The query /limit/ must be passed if query /page/ is used',
};

export const JoiValidationsPatterns = {
  stringPatternBase: 'string.pattern.base',
};
