CREATE TABLE order_events (id bigint, email text);
ALTER TABLE order_events ADD CONSTRAINT order_events_email_key UNIQUE (email);
ALTER TABLE order_events ADD PRIMARY KEY (id);
