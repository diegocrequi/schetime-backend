const axios = require("axios");

const url = "http://localhost:3000";

const user = {
    username: "test1",
    email: "test1@gmail.com",
    password: "1234"
};

const userTest = {
    username: "test3",
    email: "test3@gmail.com",
    password: "1234"
}

const newUser = {
    username: "testRenamed",
    email: "testRenamed@gmail.com",
};

const password = {
    password: "12345"
}

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

describe("SIGN UP", () => {
    let headerTest;

    test("Correct call", async () => {
        const response = await axios.post(`${url}/signup`, userTest);
        headerTest = {
            headers: {
                Authorization: `Bearer ${response.data.token}`
            }
        };
        expect(response.status).toBe(201);
    });

    test("Data with whitespaces", async () => {
        try {
            await axios.post(`${url}/signup`, {...userTest, username: "wrongUser    "});
        } catch(e) {
            expect(e.response.status).toBe(400);
        }
    });

    test("Duplicated user", async () => {
        try {
            await axios.post(`${url}/signup`, userTest);
        } catch(e) {
            expect(e.response.status).toBe(409);
        }
    });

    test("Check active uniqueness", async () => {
        await axios.delete(`${url}/users`, headerTest);
        const response = await axios.post(`${url}/signup`, userTest);
        expect(response.status).toBe(201);
    });
});

describe("LOGIN", () => {
    test("Correct call", async () => {
        const response = await axios.post(`${url}/login`, user);
        expect(response.status).toBe(200);
    });

    test("Username with whitespaces", async () => {
        try {
            const response = await axios.post(`${url}/login`, {...user, username: "wrongUser   "});
        } catch(e) {
            expect(e.response.status).toBe(400);
        }
    });

    test("Wrong data", async () => {
        try {
            const response = await axios.post(`${url}/login`, {...user, username: "wrongUser"});
        } catch(e) {
            expect(e.response.status).toBe(401);
        }
    });
});

describe("UPDATE USER DATA", () => {
    test("Correct call", async () => {
        const response = await axios.put(`${url}/users/data`, newUser, header);
        expect(response.status).toBe(200);
    });

    test("Data with whitespaces", async () => {
        try {
            const response = await axios.put(`${url}/users/data`, {...newUser, username: "WrongUser    "}, header);
        } catch(e) {
            expect(e.response.status).toBe(400);
        }
    });

    test("Duplicated data", async () => {
        try {
            const response = await axios.put(`${url}/users/data`, newUser, header);
        } catch(e) {
            expect(e.response.status).toBe(409);
        }
    });
});

describe("UPDATE USER PASSWORD", () => {
    test("Correct call", async () => {
        const response = await axios.put(`${url}/users/password`, password, header);
        expect(response.status).toBe(200);
    });
});

describe("DELETE USER", () => {
    test("Correct call", async () => {
        const response = await axios.delete(`${url}/users`, header);
        expect(response.status).toBe(200);
    });
});