import axios, { AxiosResponse } from "axios";
import Task from "../classes/Task";

const url: string = "http://localhost:3000/tasks";
const task: Task = new Task("Test API", false, "blue", "2021-07-31", 2, 1);
const newTask: Task = new Task("Renamed task", true, "blue", "2021-08-15", 2, 1);

describe("GET TASKS", () => {
    test("Correct call", async () => {
        const result: AxiosResponse = await axios.get(url);
        expect(result.status).toBe(200);
    });
});

describe("GET TASKS BY ID", () => {
    test("Correct call", async () => {
        const result: AxiosResponse = await axios.get(`${url}/1`);        
        expect(result.status).toBe(200);
    });
    
    test("Wrong id type", async () => {
        try {
            await axios.get(`${url}/a`);
        } catch(e) {
            expect(e.response.status).toBe(400);
        }
    });
    
    test("Not existing id", async () => {
        try {
            await axios.get(`${url}/-1`);
        } catch(e){
            expect(e.response.status).toBe(404);
        }        
    });
});

describe("GET TASKS BY USER ID", () => {
    test("Correct call", async () => {
        const result: AxiosResponse = await axios.get(`${url}/user/1`);        
        expect(result.status).toBe(200);
    });
    
    test("Wrong id type", async () => {
        try {
            await axios.get(`${url}/user/a`);
        } catch(e) {
            expect(e.response.status).toBe(400);
        }
    });
    
    test("Not existing id", async () => {
        const result: AxiosResponse = await axios.get(`${url}/user/-1`);
        expect(result.status).toBe(200);   
    });
});

describe("GET TASKS BY LIST ID", () => {
    test("Correct call", async () => {
        const result: AxiosResponse = await axios.get(`${url}/list/1`);        
        expect(result.status).toBe(200);
    });
    
    test("Wrong id type", async () => {
        try {
            await axios.get(`${url}/list/a`);
        } catch(e) {
            expect(e.response.status).toBe(400);
        }
    });
    
    test("Not existing id", async () => {
        const result: AxiosResponse = await axios.get(`${url}/list/-1`);
        expect(result.status).toBe(200);   
    });
});

describe("CREATE TASK", () => {
    test("Correct call", async () => {
        const result: AxiosResponse = await axios.post(url, task);  
        newTask.id = result.data.id;      
        expect(result.status).toBe(201);
    });
    
    test("Wrong id type", async () => {
        try {
            await axios.post(url, {...task, id_user: "a"});
        } catch(e) {
            expect(e.response.status).toBe(400);
        }
    });
    
    test("Wrong date format", async () => {
        try {
            await axios.post(url, {...task, date: "error"});
        } catch(e){
            expect(e.response.status).toBe(400);
        }        
    });
});

describe("UPDATE TASK", () => {
    test("Correct call", async () => {
        const result: AxiosResponse = await axios.put(`${url}/${newTask.id}`, newTask);
        expect(result.status).toBe(200);
    });

    test("Wrong id type", async () => {
        try {
            await axios.put(`${url}/a`, {...newTask});
        } catch(e) {
            expect(e.response.status).toBe(400);
        }
    });

    test("Wrong date format", async () => {
        try {
            await axios.put(`${url}/${newTask.id}`, {...newTask, date: "error"});
        } catch(e) {
            expect(e.response.status).toBe(400);
        }
    });
});

describe("DELETE TASK", () => {
    test("Correct call", async () => {
        const result: AxiosResponse = await axios.delete(`${url}/${newTask.id}`);
        expect(result.status).toBe(200);
    });

    test("Wrong id type", async () => {
        try {
            await axios.delete(`${url}/a`);
        } catch(e) {
            expect(e.response.status).toBe(400);
        }
    });
});