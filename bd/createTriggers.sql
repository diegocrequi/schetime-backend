CREATE OR REPLACE FUNCTION assing_color_to_task() RETURNS TRIGGER
AS $assing_color_to_task$
    DECLARE
        list_color COLOR_ENUM;
        list_checkable BOOLEAN;
        list_datable BOOLEAN;
    BEGIN
        IF (NEW.id_list IS NOT NULL) THEN
            SELECT color INTO list_color FROM lists WHERE id=NEW.id_list AND active=true;
            SELECT checkable INTO list_checkable FROM lists WHERE id=NEW.id_list AND active=true;
            SELECT datable INTO list_datable FROM lists WHERE id=NEW.id_list AND active=true;
            
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

CREATE OR REPLACE FUNCTION user_uniqueness() RETURNS TRIGGER
AS $user_uniqueness$
    DECLARE
        user_count INTEGER;
    BEGIN
        IF NEW.id IS NOT NULL THEN
            SELECT COUNT(id) INTO user_count FROM users WHERE (username=NEW.username OR email=NEW.email) AND id!=NEW.id AND active=true;
        ELSE 
            SELECT COUNT(id) INTO user_count FROM users WHERE (username=NEW.username OR email=NEW.email) AND active=true;
        END IF;
            IF (user_count > 0) THEN
                RAISE EXCEPTION 'User data duplicated';
            END IF;
        RETURN NEW;
    END;
$user_uniqueness$ LANGUAGE plpgsql;

CREATE TRIGGER user_uniqueness
BEFORE INSERT OR UPDATE ON users
    FOR EACH ROW EXECUTE PROCEDURE user_uniqueness();