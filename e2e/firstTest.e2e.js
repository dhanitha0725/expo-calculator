describe('First Test Suite', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should have a welcome screen', async () => {
    await expect(element(by.id('welcomeScreen'))).toBeVisible();
  });

  it('should navigate to the next screen', async () => {
    await element(by.id('nextButton')).tap();
    await expect(element(by.id('nextScreen'))).toBeVisible();
  });
});