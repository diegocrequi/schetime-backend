class Task {
    constructor(content, is_checked, color, date, id_user, id_list, id) {
        this.content = content;
        this.is_checked = is_checked;
        this.color = color;
        this.date = date;
        this.id_user = id_user;
        this.id_list = id_list;
        this.id = id;
    }
}

export default Task;