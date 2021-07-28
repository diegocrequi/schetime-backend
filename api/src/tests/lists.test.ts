import axios, { AxiosResponse } from 'axios';

const url:string = "http://localhost:3000/lists";

describe("GET LISTS BY ID", () => {
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