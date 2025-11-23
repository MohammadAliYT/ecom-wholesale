export const roleQueries = {
  insertRoles: `
    INSERT INTO roles (name, description)
    VALUES
      ('super_admin', 'Full access to the system'),
      ('vendor', 'Can manage their products and view orders'),
      ('customer', 'Can browse and purchase products')
    ON CONFLICT (name) DO NOTHING;
  `,

  getAllRoles: `SELECT * FROM roles;`,
};
