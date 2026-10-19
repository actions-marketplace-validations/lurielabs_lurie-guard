-- from: db-skills/skills/pg-keys-and-types/examples/good/test.sql@c6eb44e
CREATE TABLE customers (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email text NOT NULL UNIQUE,
  nickname varchar,
  CONSTRAINT customers_email_len CHECK (char_length(email) BETWEEN 3 AND 254)
);
