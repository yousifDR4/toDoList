const users = [
  {
    email: "email@email.com",
    password: "12345678",
    name: "yousif mazin",
  },
];
export const login = (email, password) => {
  const user = users.filter((user) => {
    if (user.email === email) {
      return true;
    }
    return false;
  });
  if (user.length === 0) {
    return { message: "User not found", status: 404 };
  } else if (user[0].password === password) {
    return { message: "Login successful", status: 200, data: user[0] };
  }
  return { message: "Password incorrect", status: 401 };
};
