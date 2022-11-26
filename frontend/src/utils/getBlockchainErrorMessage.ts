/* eslint-disable @typescript-eslint/no-explicit-any */
export const getBlockchainErrorMessage = (
  error: any,
  generalError = "Something went wrong"
) => {
  if (error?.data?.message) {
    return error.data.message;
  }

  if (error?.reason) {
    return error.reason;
  }

  if (error?.message) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return generalError;
};
