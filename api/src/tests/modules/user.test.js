const axios = require("axios");

const url = "http://localhost:3000";

const user = {
    username: "test1",
    email: "test1@gmail.com",
    password: "1234"
};

const newUser = {
    username: "testRenamed",
    email: "testRenamed@gmail.com",
};

let header;

const initUser = async () => {
    const response = await axios.post(`${url}/signup`, user);
    header = {
        headers: {
            Authorization: `Bearer ${response.data.token}`
        }
    };
    return response;
}

beforeAll(() => initUser());

describe("LOGIN TEST", () => {
    test("Correct call", async () => {
        
    });
});