import axios, { AxiosResponse } from 'axios';
import List from '../classes/List';

const url: string = "http://localhost:3000/lists";
const list: List = new List("Festivals", true, false, "red", 1);
const newList: List = new List("Parties", true, false, "blue", 1);

describe("GET LIST BY ID", () => {
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

describe("GET LISTS BY USER ID", () => {
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

describe("CREATE LIST", () => {
    test("Correct call", async () => {
        const result: AxiosResponse = await axios.post(`${url}`, list);
        newList.id = result.data.id;
        expect(result.status).toBe(201);
    });
    
    test("Wrong id type", async () => {
        try {
            await axios.post(`${url}`, {...list, id_user: 'a'});
        } catch(e) {
            expect(e.response.status).toBe(400);
        }
    });
});

describe("UPDATE LIST", () => {
    test("Correct call", async () => {
        const result: AxiosResponse = await axios.put(`${url}/${newList.id}`, newList);
        expect(result.status).toBe(200);
    });
    
    test("Wrong id type", async () => {
        try {
            await axios.put(`${url}/${newList.id}`, {...newList, id_user: 'a'});
        } catch(e) {
            expect(e.response.status).toBe(400);
        }
    });
});

describe("DELETE LIST", () => {
    test("Correct call", async () => {
        const result: AxiosResponse = await axios.delete(`${url}/${newList.id}`);
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