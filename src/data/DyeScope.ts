export class DyeScope {

  public name: string;
  protected classes: any = {}; // styles
  public tokens: any = {}; // variables
  protected links: any = {}; // style's target
  protected stack: DyeScope[] = [];
  protected finals: string[] = [];

  constructor(name: string = 'a scope') {
    this.name = name;
  }

  extends(store: DyeScope) {
    this.stack.push(store);
  }

  global(stores: DyeScope[]) {
    this.stack = [...stores];
  }

  public hasLocal(key: string): boolean {
    return this.tokens.hasOwnProperty(key) || key in this.tokens;
  }

  private isFinal(key: string): boolean {
    return this.finals.includes(key);
  }

  public get(key: string) {
    return this.tokens[key];
  }

  public set(key: string, value: any) {
    if (!this.isFinal(key)) {
      this.tokens[key] = value;
    }
  }

};
