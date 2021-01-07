/* eslint-disable @typescript-eslint/prefer-regexp-exec */
interface CreateMomentInputErrors {
  title: string
  body: string
  momentDate: string
  location: string
}

export const validateCreateMomentInput = (
  title: string,
  body: string,
  momentDate: string,
  location: string
): { errors: CreateMomentInputErrors; valid: boolean } => {
  const errors = {} as CreateMomentInputErrors

  if (title.trim() === "") {
    errors.title = "Title must not be empty"
  }

  if (body.trim() === "") {
    errors.body = "Body must not be empty"
  }

  if (momentDate.trim() === "") {
    errors.momentDate = "Date of the Moment must not be empty"
  }

  if (location.trim() === "") {
    errors.location = "Location must not be empty"
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  }
}
