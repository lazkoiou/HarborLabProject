import {test, expect, request} from "@playwright/test"
import { UserDTO } from "../../main/api/contactListApp/dtos/userDTO";
import { ClientManager } from "../../main/api/contactListApp/clients/clientManager";
import { fail } from "assert";

test.describe(('Users Api tests'), () => {

    let clientManager: ClientManager;

    test.beforeAll(async ({}) => {
        const requestContext = await request.newContext();
        clientManager = new ClientManager(requestContext);
    });

    test('POST add user with correct fields should create the user @api @smoke @users', async() => {
        let bearerToken: string | null = null;
        try { // Create user
            const userDTO = UserDTO.getRandomDefaultUser();
            const response = await clientManager.usersClient.postAddUser(userDTO);
            expect(response.ok()).toBeTruthy();
            console.log('User ' + userDTO.email + ' created.')
            const responseData = await response.json();
            bearerToken = responseData.token;
            expect(responseData.user.firstName).toBe(userDTO.firstName);
            expect(responseData.user.lastName).toBe(userDTO.lastName);
            expect(responseData.user.email).toBe(userDTO.email);
            expect(responseData.user.__v).toBe(1);
        }
        finally {
            if (bearerToken != null) {
                // Delete the previously created user for clean up
                const response = await clientManager.usersClient.deleteUser(bearerToken);
                expect(response.ok()).toBeTruthy();
                console.log('User deleted.');
            }
        }
    });

    test('POST add user with empty firstName should have response 400 Bad Request @api @regression @users', async() => {
        const userDTO = UserDTO.getRandomDefaultUser();
        userDTO.firstName = "";
        const response = await clientManager.usersClient.postAddUser(userDTO);
        expect(response.ok()).toBeFalsy();
        expect(response.status()).toBe(400);
    });
    // Similar to this, we can write tests with any of the other fields empty and assert the 400 Bad Request
    //  - lastName = ""
    //  - email = ""
    //  - password = ""
    // Also, any other validations can be tested like this e.g. not allowed Greek characters

    test('GET user profile should return the created user if existing @api @smoke @users', async() => {
        let bearerToken: string | null = null;
        try { // Create user
            const userDTO = UserDTO.getRandomDefaultUser();
            const response = await clientManager.usersClient.postAddUser(userDTO);
            expect(response.ok()).toBeTruthy();
            console.log('User ' + userDTO.email + ' created.')
            const responseData = await response.json();
            bearerToken = responseData.token;

            // Get user using the bearer token
            if (bearerToken != null) {
                const response = await clientManager.usersClient.getUserProfile(bearerToken);
                expect(response.ok()).toBeTruthy();
                const responseData = await response.json();
                expect(responseData._id).not.toBe("");
                expect(responseData.firstName).toBe(userDTO.firstName);
                expect(responseData.lastName).toBe(userDTO.lastName);
                expect(responseData.email).toBe(userDTO.email);
                expect(responseData.__v).toBe(1);
            }
            else {
                fail('Test should fail if the user has not been created!');
            }
        }
        finally {
            if (bearerToken != null) {
                // Delete the previously created user for clean up
                const response = await clientManager.usersClient.deleteUser(bearerToken);
                expect(response.ok()).toBeTruthy();
                console.log('User deleted.');
            }
        }
    }); 

    test('GET user profile with no bearer token should return 401 Unauthorized @api @regression @users', async() => {
        const response = await clientManager.usersClient.getUserProfile('');
        expect(response.ok()).toBeFalsy();
        expect(response.status()).toBe(401);
    });

});