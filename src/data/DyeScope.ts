export class DyeScope {
  protected classes: any = {}; // styles
  public tokens: any = {}; // variables
  protected links: any = {}; // style's target
  protected stack: DyeScope[] = [];
  protected finals: string[] = [];

  extends(store: DyeScope) {
    this.stack.push(store);
  }

  global(stores: DyeScope[]) {
    this.stack = [...stores];
  }

  hasLocal(key: string): boolean {
    return this.tokens.hasOwnProperty(key);
  }

  isFinal(key: string): boolean {
    return this.finals.includes(key);
  }

  get(key: string) {
    return this.tokens[key];
  }

  set(key: string, value: any) {
    if (!this.isFinal(key)) {
      this.tokens[key] = value;
    }
  }

};
