const checkPassword = (password: string) => {
  const pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#^$!%*?&_-])[A-Za-z\d@#^$!%*?&_-]{8,}$/g;
  return pattern.test(password);
};
export default checkPassword;
