import * as yup from "yup";
import ValidationException from "../exceptions/validationException.js";

const validDate = (moodtime) => {
  const now = new Date();

  if (!moodtime) {
    return now.toISOString();
  }

  const moodtimeBody = new Date(moodtime);

  if (moodtimeBody.getTime() > now.getTime()) {
    throw new ValidationException("Isn't possible insert a future mood");
  }

  return moodtime;
}

const schema = yup.object().shape({
  mood: yup.string().min(3).required(),
  context: yup.string().min(3).required(),
  goods: yup.array().of(yup.string()).notRequired(),
  bads: yup.array().of(yup.string()).notRequired(),
  moodtime: yup.string().default(new Date().toISOString())
});

export const validate = (mood) => {
  try {
    const validatedMood = schema.validateSync(mood);
    validatedMood.moodtime = validDate(validatedMood.moodtime)

    return validatedMood;
  }
  catch (e) {
    throw new ValidationException(e.message);
  }
};
