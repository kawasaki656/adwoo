import { AdwooPage } from './app.po';

describe('adwoo App', () => {
  let page: AdwooPage;

  beforeEach(() => {
    page = new AdwooPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
