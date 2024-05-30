/* tslint:disable */
/* eslint-disable */
/**
*/
export class GameWrapper {
  free(): void;
/**
* @param {number} width
* @param {number} height
* @param {boolean} is_torus
*/
  constructor(width: number, height: number, is_torus: boolean);
/**
*/
  step(): void;
/**
* @returns {Uint8Array}
*/
  board(): Uint8Array;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_gamewrapper_free: (a: number) => void;
  readonly gamewrapper_new: (a: number, b: number, c: number) => number;
  readonly gamewrapper_step: (a: number) => void;
  readonly gamewrapper_board: (a: number, b: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
