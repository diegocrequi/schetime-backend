class List {
    id?: number;
    name: string;
    datable: boolean;
    checkable: boolean;
    color: string;
    id_user: number;
    
    constructor(name: string, datable: boolean, checkable: boolean, color: string, id_user: number, id?: number) {
        this.name = name;
        this.datable = datable;
        this.checkable = checkable;
        this.color = color;
        this.id_user = id_user;
        this.id = id;
    }
}

export default List;