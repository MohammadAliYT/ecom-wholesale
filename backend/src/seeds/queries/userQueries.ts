export const userQueries = {
  checkUserExists: `SELECT * FROM users WHERE email = $1;`,

  insertUser: `
    INSERT INTO users (name, email, password, role_id)
    VALUES ($1, $2, $3, $4);
  `,
};
