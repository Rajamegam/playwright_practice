const { test, expect } = require('@playwright/test');

let token;
let refresh_token;
let user_id;
let user_companyId;
let user_email;
let roles;

test.beforeAll(async ({ request }) => {
    const response = await request.post("https://iassistant.ideas2it.com/api/auth/authenticate", {
        form: {
            username: "rajamegam.govindaraj@ideas2it.com",
            password: "I22257"
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    expect(response.ok()).toBeTruthy();

    const login_response = await response.json();
    token = login_response.entity.accessToken;
    refresh_token = login_response.entity.refreshToken;
    user_id = 1157; // Replace with dynamic key if available
    user_companyId = "I22257"; // Replace with dynamic key if available
    user_email = "rajamegam.govindaraj@ideas2it.com"; // Replace with dynamic key if available
    roles = ["ROLE_EMPLOYEE"]; // Replace with dynamic key if available

    console.log("Auth Token:", token);
    console.log("Refresh Token:", refresh_token);
    console.log("User ID:", user_id);
    console.log("User Company ID:", user_companyId);
    console.log("User Email:", user_email);
    console.log("Roles:", roles);
});

test("bypass login using tokens", async ({ page }) => {
    // Pass all required data to the browser
    page.addInitScript(({ authToken, refreshToken, userId, userCompanyId, userEmail, userRoles }) => {
        window.localStorage.setItem("token", authToken);
        window.localStorage.setItem("refresh_token", refreshToken);
        window.localStorage.setItem("user_id", userId);
        window.localStorage.setItem("user_companyId", userCompanyId);
        window.localStorage.setItem("user_email", userEmail);
        window.localStorage.setItem("roles", JSON.stringify(userRoles)); // Convert roles array to JSON string
    }, {
        authToken: token,
        refreshToken: refresh_token,
        userId: user_id,
        userCompanyId: user_companyId,
        userEmail: user_email,
        userRoles: roles,
    });

    // Navigate to the main page
    await page.goto("https://iassistant.ideas2it.com/");

    // Debugging: Check if data was properly stored in localStorage
    const storedAuthToken = await page.evaluate(() => window.localStorage.getItem("authToken"));
    const storedRefreshToken = await page.evaluate(() => window.localStorage.getItem("refresh_token"));
    const storedUserId = await page.evaluate(() => window.localStorage.getItem("user_id"));
    const storedUserCompanyId = await page.evaluate(() => window.localStorage.getItem("user_companyId"));
    const storedUserEmail = await page.evaluate(() => window.localStorage.getItem("user_email"));
    const storedRoles = await page.evaluate(() => window.localStorage.getItem("roles"));

    console.log("Stored Auth Token:", storedAuthToken);
    console.log("Stored Refresh Token:", storedRefreshToken);
    console.log("Stored User ID:", storedUserId);
    console.log("Stored User Company ID:", storedUserCompanyId);
    console.log("Stored User Email:", storedUserEmail);
    console.log("Stored Roles:", JSON.parse(storedRoles)); // Parse back from JSON

    // Assert the app doesn't redirect to login
    expect(page.url()).not.toContain("login");
    const headercontent = page.locator("h2").textContent()
    console.log(headercontent)
});
