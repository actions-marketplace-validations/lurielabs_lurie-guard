-- Dogfooding: the action reviews this folder on every PR of this repository.
-- Everything here is the good form; a PR that adds a bad statement gets a review comment.
SET lock_timeout = '2s';
CREATE TABLE orders (
  id         bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  account_id bigint NOT NULL,
  amount     numeric(12, 2) NOT NULL CHECK (amount >= 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  attributes jsonb NOT NULL DEFAULT '{}'
);
CREATE INDEX orders_account_id_idx ON orders (account_id);
