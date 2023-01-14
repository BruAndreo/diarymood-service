
export const correctBodyWithoutMoodDate = {
  "mood": "Good",
  "context": "Good day for testing",
  "goods": ["test"],
  "bads": ["job"]
};

export const correctBodyWithMoodDate = {
  "mood": "Good",
  "context": "Good day for testing",
  "goods": ["test"],
  "bads": ["job"],
  "moodtime": "2022-12-31T03:00:00-03:00"
};

export const bodyPastDate = {
  "mood": "Good",
  "context": "Good day for testing",
  "goods": ["test"],
  "bads": ["job"],
  "moodtime": "2022-12-31T03:00:00-03:00"
};

export const bodyFutureDate = {
  "mood": "Good",
  "context": "Good day for testing",
  "goods": ["test"],
  "bads": ["job"],
  "moodtime": "2030-12-31T03:00:00-03:00"
};

export const bodyWithoutContext = {
  "mood": "Good",
  "goods": ["test"],
  "bads": ["job"],
  "moodtime": "2030-12-31T03:00:00-03:00"
};

export const bodyContextLessTree = {
  "mood": "Good",
  "goods": ["test"],
  "bads": ["job"],
  "moodtime": "2030-12-31T03:00:00-03:00"
};
