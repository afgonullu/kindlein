/* eslint-disable @typescript-eslint/prefer-regexp-exec */
interface CreateChildInputErrors {
  name: string
  birthDate: string
}

export const validateCreateChildInput = (
  name: string,
  birthDate: string
): { errors: CreateChildInputErrors; valid: boolean } => {
  const errors = {} as CreateChildInputErrors

  if (name.trim() === "") {
    errors.name = "Name must not be empty"
  }

  if (birthDate.trim() === "") {
    errors.birthDate = "Birth Date of the Child must not be empty"
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  }
}
