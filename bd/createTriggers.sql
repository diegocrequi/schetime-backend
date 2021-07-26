CREATE OR REPLACE FUNCTION assing_color_to_task() RETURNS TRIGGER
AS $assing_color_to_task$
    DECLARE
        list_color COLOR_ENUM;
        list_checkable BOOLEAN;
        list_datable BOOLEAN;
    BEGIN
        IF (NEW.id_list IS NOT NULL) THEN
            SELECT color INTO list_color FROM lists WHERE id=NEW.id_list;
            SELECT checkable INTO list_checkable FROM lists WHERE id=NEW.id_list;
            SELECT datable INTO list_datable FROM lists WHERE id=NEW.id_list;
            
            NEW.color := list_color;
            IF (list_checkable IS false) THEN
                NEW.is_checked := NULL;
            END IF;
            IF (list_datable IS false) THEN
                NEW.date := NULL;
            END IF;
        END IF;
        RETURN NEW;
    END;
$assing_color_to_task$ LANGUAGE plpgsql;

CREATE TRIGGER assing_color_to_task
BEFORE INSERT OR UPDATE ON tasks
    FOR EACH ROW EXECUTE PROCEDURE assing_color_to_task();
