const axios = require("axios");
const header = require("../setUpTests");

const url = "http://localhost:3000/tasks";

const task = {
    content: "Test API", 
    is_checked: false, 
    color: "blue", 
    date: "2021-07-31", 
    id_list: 1
};

const newTask = {
    content: "Renamed task", 
    is_checked: true, 
    color:"blue", 
    date: "2021-08-15", 
    id_list: 1
};

describe("GET TASKS", () => {
    test("Correct call", async () => {
        const result = await axios.get(`${url}`, header);        
        expect(result.status).toBe(200);
    });
});

describe("GET TASKS BY ID", () => {
    test("Correct call", async () => {
        const result = await axios.get(`${url}/1`, header);        
        expect(result.status).toBe(200);
    });
    
    test("Wrong id type", async () => {
        try {
            await axios.get(`${url}/a`, header);
        } catch(e) {
            expect(e.response.status).toBe(400);
        }
    });
    
    test("Not existing id", async () => {
        try {
            await axios.get(`${url}/-1`, header);
        } catch(e){
            expect(e.response.status).toBe(404);
        }        
    });
});

describe("GET TASKS BY LIST ID", () => {
    test("Correct call", async () => {
        const result = await axios.get(`${url}/list/1`, header);        
        expect(result.status).toBe(200);
    });
    
    test("Wrong id type", async () => {
        try {
            await axios.get(`${url}/list/a`, header);
        } catch(e) {
            expect(e.response.status).toBe(400);
        }
    });
    
    test("Not existing id", async () => {
        const result = await axios.get(`${url}/list/-1`, header);
        expect(result.status).toBe(200);   
    });
});

describe("CREATE TASK", () => {
    test("Correct call", async () => {
        const result = await axios.post(url, task, header);  
        newTask.id = result.data.id;      
        expect(result.status).toBe(201);
    });
    
    test("Wrong date format", async () => {
        try {
            await axios.post(url, {...task, date: "error"}, header);
        } catch(e){
            expect(e.response.status).toBe(400);
        }        
    });
});

describe("UPDATE TASK", () => {
    test("Correct call", async () => {
        const result = await axios.put(`${url}/${newTask.id}`, newTask, header);
        expect(result.status).toBe(200);
    });

    test("Wrong id type", async () => {
        try {
            await axios.put(`${url}/a`, {...newTask}, header);
        } catch(e) {
            expect(e.response.status).toBe(400);
        }
    });

    test("Wrong date format", async () => {
        try {
            await axios.put(`${url}/${newTask.id}`, {...newTask, date: "error"}, header);
        } catch(e) {
            expect(e.response.status).toBe(400);
        }
    });
});

describe("DELETE TASK", () => {
    test("Correct call", async () => {
        const result = await axios.delete(`${url}/${newTask.id}`, header);
        expect(result.status).toBe(200);
    });

    test("Wrong id type", async () => {
        try {
            await axios.delete(`${url}/a`, header);
        } catch(e) {
            expect(e.response.status).toBe(400);
        }
    });
});