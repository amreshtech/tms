import { TmsPage } from './app.po';

describe('tms App', () => {
  let page: TmsPage;

  beforeEach(() => {
    page = new TmsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
