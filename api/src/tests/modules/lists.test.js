const axios = require("axios");
const header = require("../setUpTests");

const url = "http://localhost:3000/lists";

const list = {
    name: "Festivals", 
    datable: true, 
    checkable: false, 
    color: "red", 
    id_user: 1
};

const newList = {
    name: "Parties", 
    datable: true, 
    checkable: false, 
    color: "blue", 
    id_user: 1
};

describe("GET LISTS", () => {
    test("Correct call", async () => {
        const result = await axios.get(`${url}`, header);        
        expect(result.status).toBe(200);
    });
});

describe("GET LIST BY ID", () => {
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

describe("CREATE LIST", () => {
    test("Correct call", async () => {
        const result = await axios.post(`${url}`, list, header);
        newList.id = result.data.id;
        expect(result.status).toBe(201);
    });
});

describe("UPDATE LIST", () => {
    test("Correct call", async () => {
        const result = await axios.put(`${url}/${newList.id}`, newList, header);
        expect(result.status).toBe(200);
    });
    
    test("Wrong id type", async () => {
        try {
            await axios.put(`${url}/${newList.id}`, {...newList, id_user: 'a'}, header);
        } catch(e) {
            expect(e.response.status).toBe(400);
        }
    });
});

describe("DELETE LIST", () => {
    test("Correct call", async () => {
        const result = await axios.delete(`${url}/${newList.id}`, header);
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