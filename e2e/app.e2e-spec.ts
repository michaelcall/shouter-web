import { ShouterWebPage } from './app.po';

describe('shouter-web App', () => {
  let page: ShouterWebPage;

  beforeEach(() => {
    page = new ShouterWebPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
