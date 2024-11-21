import {test, expect, request} from "@playwright/test"
import { UsersClient } from "../../main/api/contactListApp/clients/usersClient";
import { UserDTO } from "../../main/api/contactListApp/dtos/userDTO";

test.describe(('Add User Api tests'), () => {

    let usersClient: UsersClient;

    test.beforeAll(async ({}) => {
        const requestContext = await request.newContext();
        usersClient = new UsersClient(requestContext); // TODO: create a ClientManager
    });

    test('POST add user with correct fields should create the user @api @smoke @addUser', async() => {
        const addUserResponse = await usersClient.postAddUser(UserDTO.getDefault());
        expect(addUserResponse.ok()).toBeTruthy();
        const addUserData = await addUserResponse.json();
        console.log('User Created:', addUserResponse); // TODO: Check about loggers in Playwright    
    
        // Delete the previously created user // TODO: Create a UserHandler for these operations

        // Authenticate and delete the user for clean up
        const authToken = addUserData.token; // Assuming the response includes a token
        const deleteResponse = await usersClient.deleteUser(authToken);
        expect(deleteResponse.ok()).toBeTruthy();
        console.log('User Deleted');
    });

});