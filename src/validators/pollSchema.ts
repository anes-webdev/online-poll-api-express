import z from "zod";

export const POLL_TITLE_MAX_LENGTH = 40;
export const POLL_TITLE_MIN_LENGTH = 3;
export const POLL_DESCRIPTION_MAX_LENGTH = 255;
export const POLL_DESCRIPTION_MIN_LENGTH = 3;
export const POLL_OPTION_MAX_LENGTH = 20;
export const POLL_OPTION_MIN_LENGTH = 3;

const TITLE_LENGTH_ERROR_MESSAGE = `Title must be between ${POLL_TITLE_MIN_LENGTH} and ${POLL_TITLE_MAX_LENGTH} characters long.`;
const DESCRIPTION_LENGTH_ERROR_MESSAGE = `Description must be between ${POLL_DESCRIPTION_MIN_LENGTH} and ${POLL_DESCRIPTION_MAX_LENGTH} characters long.`;
const NOT_EMPTY_ERROR_MESSAGE = 'The field can not be empty';

const pollSchemaCommonFields = {
  title: z
    .string()
    .nonempty(NOT_EMPTY_ERROR_MESSAGE)
    .min(POLL_TITLE_MIN_LENGTH, TITLE_LENGTH_ERROR_MESSAGE)
    .max(POLL_TITLE_MAX_LENGTH, TITLE_LENGTH_ERROR_MESSAGE),
  description: z
    .string()
    .nonempty(NOT_EMPTY_ERROR_MESSAGE)
    .min(POLL_DESCRIPTION_MIN_LENGTH, DESCRIPTION_LENGTH_ERROR_MESSAGE)
    .max(POLL_DESCRIPTION_MAX_LENGTH, DESCRIPTION_LENGTH_ERROR_MESSAGE),
};

const pollOptionsSchema = z.array(
  z.object({
    optionName: z.string(),
  }),
);

export const editPollSchema = z.object({
  ...pollSchemaCommonFields,
  options: pollOptionsSchema.optional(),
});

export const createPollSchema = z.object({
  ...pollSchemaCommonFields,
  options: pollOptionsSchema.min(2, 'At least two options are needed'),
});