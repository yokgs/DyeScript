export class DyeStore {
  protected classes: any = {}; // styles
  public tokens: any = {}; // variables
  protected links: any = {}; // style's target
  protected stack: DyeStore[] = [];
  protected finals: string[] = [];

  $extends(store: DyeStore) {
    this.stack.push(store);
  }

  $global(stores: DyeStore[]) {
    this.stack = [...stores];
  }


  $hasLocal(key: string): boolean {
    return this.tokens.hasOwnProperty(key);
  }

  $isFinal(key: string): boolean {
    return this.finals.includes(key);
  }

  $get(key: string) {

  }

  $set(key: string, value: any) {
    if (!this.$isFinal(key)) {
      this.tokens[key] = value;
    }
  }

  $put(key: string, value: any) {

  }

  $pop(key: string) {

  }





};
