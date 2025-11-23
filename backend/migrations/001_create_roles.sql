CREATE TABLE IF NOT EXISTS roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  description TEXT
);

-- INSERT INTO roles (name, description)
-- VALUES
--   ('super_admin', 'Full access to the system'),
--   ('vendor', 'Can manage their products and view orders'),
--   ('customer', 'Can browse and purchase products')
-- ON CONFLICT (name) DO NOTHING;
