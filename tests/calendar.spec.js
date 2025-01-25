const { test, expect } = require('@playwright/test')

test("Calendar validation", async ({ page }) => {

    const monthNumber = "6";
    const date = "15";
    const year = "2027";
    const expected_list = [monthNumber, date, year]

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup__year").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    const calendarYears = await page.locator(".react-calendar__tile.react-calendar__decade-view__years__year")
    const calendar_count = await calendarYears.count()
    for (let i = 0; i < calendar_count; i++) {
        const yearText = await calendarYears.nth(i).textContent()
        if (yearText.trim() === year) {
            await calendarYears.nth(i).click()
            break;
        }

    }

    await page.locator(".react-calendar__tile.react-calendar__year-view__months__month").nth(Number(monthNumber) - 1).click()
    await page.locator("//abbr[text()='" + date + "']").click();
    const value = await page.locator(".react-date-picker__inputGroup input")
    for (let i = 0; i < value.length; i++) {

        const actual_list=await value[i].getAttribute("value")
        expect(actual_list).toEqual(expected_list[i])
    }
})