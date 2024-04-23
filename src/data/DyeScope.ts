import { IStyle } from "../common/style.interface";

export class DyeScope {

  public name: string;
  public classes: Map<string, IStyle> = new Map(); // classes
  public tokens: any = {}; // variables
  public links: Map<string, string[]> = new Map(); // style's target
  protected stack: DyeScope[] = [];
  protected finals: string[] = [];

  private type: VariableType = 'implicit';

  
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

  public setType(type: VariableType) {
    this.type = type;
  }
  
};


export type VariableType = 'implicit' | 'color' | 'string' | 'number';