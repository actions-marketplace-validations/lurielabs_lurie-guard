CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), -- expect: PG018
  customer_id bigint
);
