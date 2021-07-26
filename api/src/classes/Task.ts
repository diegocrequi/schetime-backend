class Task {
    id?: number;
    content: string;
    is_checked: boolean;
    color: string;
    date: string;
    id_user: number;
    id_list: number;

    
    constructor(content: string, is_checked: boolean, color: string, date: string, id_user: number, id_list: number, id?: number) {
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