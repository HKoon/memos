DO $$
BEGIN
  IF EXISTS(SELECT * FROM information_schema.tables WHERE table_schema = current_schema() AND table_name = 'resource') 
  AND NOT EXISTS(SELECT * FROM information_schema.tables WHERE table_schema = current_schema() AND table_name = 'attachment') THEN
    ALTER TABLE resource RENAME TO attachment;
  END IF;
END $$;
